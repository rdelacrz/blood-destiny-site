/* =====================================================================
   BLOOD DESTINY — useUpdates
   Reactive devlog feed: fetches the updates JSON (api/updates) on mount,
   exposes async status + backend-ordered (newest-first) entries, and pages
   client-side in PAGE_SIZE batches behind a "Load more" affordance — mirroring
   `master`, whose Telefunc query returns the full ordered list and pages it in
   the component. Falls back to the bundled seed entries when no endpoint is
   configured (offline / local dev).
   ===================================================================== */
import { computed, onMounted, onUnmounted, ref } from 'vue';
import type { Update } from '@/data/updates';
import { updates as UPDATES } from '@/data/updates';
import { fetchUpdates, hasUpdatesEndpoint } from '@/api/updates';

export type UpdatesStatus = 'loading' | 'success' | 'empty' | 'error';

/** Entries revealed per page / appended per "Load more". */
export const UPDATES_PAGE_SIZE = 3;

export function useUpdates() {
  const all = ref<Update[]>([]);
  const status = ref<UpdatesStatus>('loading');
  const error = ref<string | null>(null);
  const visibleCount = ref(UPDATES_PAGE_SIZE);

  let controller: AbortController | null = null;

  const displayed = computed(() => all.value.slice(0, visibleCount.value));
  const total = computed(() => all.value.length);
  const hasMore = computed(() => visibleCount.value < all.value.length);

  const load = async (): Promise<void> => {
    controller?.abort();
    controller = new AbortController();
    status.value = 'loading';
    error.value = null;
    visibleCount.value = UPDATES_PAGE_SIZE;
    try {
      const data = hasUpdatesEndpoint ? await fetchUpdates(controller.signal) : UPDATES;
      all.value = data;
      status.value = data.length > 0 ? 'success' : 'empty';
    } catch (e) {
      if ((e as Error)?.name === 'AbortError') return;
      error.value = e instanceof Error ? e.message : 'Unable to load updates.';
      status.value = 'error';
    }
  };

  /** Reveal the next PAGE_SIZE entries (backend already returns the full list). */
  const loadMore = (): void => {
    visibleCount.value = Math.min(visibleCount.value + UPDATES_PAGE_SIZE, all.value.length);
  };

  onMounted(load);
  onUnmounted(() => controller?.abort());

  return {
    displayed,
    total,
    visibleCount,
    status,
    error,
    hasMore,
    pageSize: UPDATES_PAGE_SIZE,
    load,
    retry: load,
    loadMore,
  };
}

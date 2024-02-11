// Hook `useData()` to make `pageContext.data` available from any Vue component.
// See
// * https://vike.dev/data
// * https://vike.dev/pageContext-anywhere

import { type ComputedRef, computed } from 'vue'
import { usePageContext } from './page-context';

function useData<Data>(): ComputedRef<Data> {
  const data = computed(() => (usePageContext() as any).data);
  return data;
}

export { useData };
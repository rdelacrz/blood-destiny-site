<template>
  <v-dialog width="500" v-model="model">
    <v-card class="bg-[#424242] p-3" :title="dialogTitle">
      <AppIconButton class="absolute top-0 right-0" size="2.2rem" @click="handleClose">
        <FontAwesomeIcon :icon="faXmark" size="lg" />
      </AppIconButton>
      <v-card-text>
        {{ dialogText }}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const AppIconButton = defineAsyncComponent(() => import("@/components/clickable-elements/AppIconButton.vue"));

defineProps<{
  dialogTitle: string;
  dialogText: string;
}>();

const model = defineModel({ type: Boolean });

const handleClose = () => {
  model.value = false;
}
</script>
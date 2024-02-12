import { defineStore } from "pinia";
import { ref } from "vue";

export const useDialogStore = defineStore("dialog", () => {
  const isActive = ref(false);
  const dialogTitle = ref("");
  const dialogBody = ref("");

  function openDialog(title: string, body: string) {
    isActive.value = true;
    dialogTitle.value = title;
    dialogBody.value = body;
  }

  return { isActive, dialogTitle, dialogBody, openDialog };
});

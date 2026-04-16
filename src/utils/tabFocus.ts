import { nextTick } from "vue";
export function tabFocus(taArray:Array<any>, index: number): any {
  nextTick(() => {
    const activePanel = taArray[index];
    if (activePanel) {
      const focusable = activePanel.querySelector('a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable) {
        focusable.focus();
      }
    }
  });
}
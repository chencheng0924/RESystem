import { PopoverPassThroughOptions } from "primevue/popover";
import { ref, Ref } from "vue";

export class STButtonConfig {
  id?: string
  label: string;
  severity: STButtonType;
  icon: string;
  isText: boolean = false;
  isDisabled: boolean = false;
  event: (event?: Event) => void;

  constructor(init?: Partial<STButtonConfig>) {
    Object.assign(this, init);
  }
}

export enum STButtonType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  INFO = 'info',
  SUCCESS = 'success',
  WARN = 'warn',
  OUTLINED = 'outlined',
  DANGER = 'danger'
}



export class STButtonStyle {
  public popoverStyleOption: Ref<PopoverPassThroughOptions>

  constructor() {
    this.popoverStyleOption = ref(this.getPopoverStyleOption())
  }

  public getPopoverStyleOption() {
    return {
      root: {
        class: [
          'before:!hidden after:!hidden'
        ]
      },
      content: {
        class: 'p-0'
      },
      transition: {
        enterFromClass: 'opacity-0 scale-y-[0.8]',
        enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
        leaveActiveClass: 'transition-opacity duration-100 ease-linear',
        leaveToClass: 'opacity-0'
      }
    }
  }
  public getConfirmDeletePopoverStyleOption() {
    return {
      root: {
        class: ['w-[230px] h-[96px']
      }
    }
  }
}
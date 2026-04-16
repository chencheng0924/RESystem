import { ref, Ref, computed } from 'vue'

export class UseSTSlider {
  public modelValue: Ref<number | number[]> = ref(0)
  private emit: any

  constructor(emit: any, defaultVal: number | number[]) {
    this.emit = emit
    this.setValue(defaultVal)
  }

  public setValue(defaultVal: number | number[]) {
    this.modelValue.value = defaultVal
  }

  public updateValue(val) {
    this.emit('update:modelValue', val)
  }
}
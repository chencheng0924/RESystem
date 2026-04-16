import { computed, ref, Ref } from 'vue';
import { CardData, SelectionMode } from './STCardSelect.model';

export class CardSelectController {
    public options: Ref<CardData[]>;
    public selectedValue: Ref<string | string[]>;
    public mode: Ref<SelectionMode>;
    private emit: any;

    constructor(
        options: CardData[],
        // initialValue: string | string[] = [],
        mode: SelectionMode = SelectionMode.SINGLE,
        emit: any
    ) {
        this.options = ref(options || []);
        this.mode = ref(mode);
        this.emit = emit;

        // 從 options 中找出 selected: true 的項目來初始化 selectedValue
        const selectedItems = (options || []).filter(opt => opt.selected);

        if (mode === SelectionMode.MULTIPLE) {
            this.selectedValue = ref(selectedItems.map(item => item.id || ''));
        } else {
            this.selectedValue = ref(selectedItems.length > 0 ? (selectedItems[0].id || '') : '');
        }
    }


    public isSelected(cardId: string): boolean {
        if (this.mode.value === SelectionMode.SINGLE) {
            return this.selectedValue.value === cardId;
        } else {
            return Array.isArray(this.selectedValue.value) && this.selectedValue.value.includes(cardId);
        }
    }

    public handleCardClick(cardId: string): void {
        let newValue: string | string[];

        if (this.mode.value === SelectionMode.SINGLE) {

            newValue = this.selectedValue.value === cardId ? '' : cardId;
        } else {
            const currentValue = Array.isArray(this.selectedValue.value) ? this.selectedValue.value : [];

            if (currentValue.includes(cardId)) {
                newValue = currentValue.filter(id => id !== cardId);
            } else {
                newValue = [...currentValue, cardId];
            }
        }

        this.selectedValue.value = newValue;
        const selectedData = this.getSelectedData();
        const count = this.selectedCount;
        this.emit('change', { data: selectedData, count });
        // this.emit('selected', { data: selectedData, count });
        // console.log('selected:', { data: selectedData, count });
    }

    public getSelectedData(): CardData | CardData[] {
        if (this.mode.value === SelectionMode.SINGLE) {
            const selectedId = this.selectedValue.value as string;
            return this.options.value.find(option => option.id === selectedId) || {} as CardData;
        } else {
            const selectedIds = Array.isArray(this.selectedValue.value) ? this.selectedValue.value : [];
            return this.options.value.filter(option => selectedIds.includes(option.id));
        }
    }

    public get selectedCount(): number {
        if (!this.selectedValue.value) return 0;

        if (this.mode.value === SelectionMode.SINGLE) {
            return this.selectedValue.value ? 1 : 0;
        } else {
            return Array.isArray(this.selectedValue.value) ? this.selectedValue.value.length : 0;
        }
    }

}

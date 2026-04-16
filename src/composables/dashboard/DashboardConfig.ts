import { BlockCard } from "./DashboardBlock";

import { DashboardStyleType } from "@/composables/enum/DashboardType";

// 儀表板網格項目
export class DashboardGridItem {
    Row?: number = 1;        // 行位置
    Column?: number;         // 列位置
    RowSpan?: number = 1;    // 佔用的行數
    ColumnSpan?: number = 1; // 佔用的列數
    Height?: number;
    Width?: number;

    Content: BlockCard = new BlockCard(); // 內容區塊

    constructor(init?) {
        Object.assign(this, init);
    }

    // 設置區塊內容
    public setBlock(block) {
        this.Content = block;
        return this;
    }
}

// 儀表板配置
export class DashboardConfig {
    StyleType: DashboardStyleType = DashboardStyleType.VERTICAL; // 樣式類型
    Style: DashboardStyleVertical | DashboardStyleHorizontal; // 樣式
    MaxAllowedRows: number | null = null; // 最大允許行數，null 表示不限制
    MaxAllowedCols: number | null = null; // 最大允許列數，null 表示不限制
    RowGap?: number = 5;
    ColumnGap?: number = 5; // 5px
    Items?: DashboardGridItem[] = []; // 儀表板項目

    constructor(init?: Partial<DashboardConfig>) {
        Object.assign(this, init);
        if (!this.Style) {
            this.Style = this.createStyle(this.StyleType);
        }
    }

    // 樣式表
    private styleMap: Record<DashboardStyleType, new (config: DashboardConfig) => DashboardStyleVertical | DashboardStyleHorizontal> = {
        [DashboardStyleType.VERTICAL]: DashboardStyleVertical,
        [DashboardStyleType.HORIZONTAL]: DashboardStyleHorizontal
    }

    // 依據樣式表生成對應的樣式
    private createStyle(styleType: DashboardStyleType): DashboardStyleVertical | DashboardStyleHorizontal {
        const StyleClass = this.styleMap[styleType] || DashboardStyleVertical;
        return new StyleClass(this);
    }

    // 設置儀表板樣式
    public setStyle(styleType: DashboardStyleType, customStyle?: DashboardStyleVertical | DashboardStyleHorizontal) {
        this.StyleType = styleType;
        this.Style = customStyle || this.createStyle(styleType);
        return this;
    }

    // 設置儀表板項目
    public setItems(item: DashboardGridItem[]) {
        this.Items = item;
        return this;
    }

    // 取最大行數
    public get maxRow(): number {
        if (this.Items.length === 0) {
            return 0;
        }
        const maxItemRow = Math.max(...this.Items.map(item => item.Row + (item.RowSpan || 1) - 1));
        return this.MaxAllowedRows !== null ? Math.min(this.MaxAllowedRows, maxItemRow) : maxItemRow;
    }

    // 取最大列數
    public get maxCol(): number {
        if (this.Items.length === 0) {
            return 0;
        }
        const maxItemCol = Math.max(...this.Items.map(item => item.Column + (item.ColumnSpan || 1) - 1));
        return this.MaxAllowedCols !== null ? Math.min(this.MaxAllowedCols, maxItemCol) : maxItemCol;
    }

    // 取排序後的項目
    public get sortedItems(): DashboardGridItem[] {
        return this.Items
            .filter(item =>
                (this.MaxAllowedRows === null || item.Row <= this.MaxAllowedRows) &&
                (this.MaxAllowedCols === null || item.Column <= this.MaxAllowedCols)
            )
            .sort((a, b) => {
                if (a.Row === b.Row) {
                    return a.Column - b.Column;
                }
                return a.Row - b.Row;
            });
    }
}



// 儀表板樣式_垂直布局
export class DashboardStyleVertical {
    constructor(private config: DashboardConfig) { }

    public get containerClass(): string[] {
        return [
            'h-full',
            'w-full',
            'overflow-auto',  // 容器保留滾動功能
        ];
    }

    public get gridClass(): string[] {
        const Class = [
            'grid',
            'mx-0 mt-0',
            'gap-5',
            'w-full',
            'min-w-fit',
            'auto-rows-min',  // 使行高自動適應內容
        ];

        if (this.config.MaxAllowedCols !== null) {
            Class.push(`grid-cols-[repeat(${this.config.maxCol},minmax(0,1fr))]`);
        } else {
            Class.push('grid-cols-[repeat(auto-fill,minmax(400,1fr))]'); // 最小寬度
        }

        return Class;
    }

    public getCellClass(item: DashboardGridItem): string[] {
        const Class = [
            'min-h-[80px]',
            'overflow-hidden',  // 防止內容溢出
        ];

        if (item.Width) {
            Class.push(`w-[${item.Width}px]`);
        } else {
            Class.push('w-full');
        }

        if (item.Height) {
            Class.push(`h-[${item.Height}px]`);
        } else {
            Class.push('h-full');
        }

        return Class;
    }

    public getMergedCellStyles(item: DashboardGridItem): Record<string, string> {
        const column = item.Column;
        const row = item.Row;
        const columnSpan = this.config.MaxAllowedCols !== null
            ? Math.min(item.ColumnSpan || 1, this.config.MaxAllowedCols - column + 1)
            : (item.ColumnSpan || 1);
        const rowSpan = this.config.MaxAllowedRows !== null
            ? Math.min(item.RowSpan || 1, this.config.MaxAllowedRows - row + 1)
            : (item.RowSpan || 1);

        return {
            gridColumn: `${column} / span ${columnSpan}`,
            gridRow: `${row} / span ${rowSpan}`,
        };
    }

    public getContentClass(): string[] {
        return [
            'w-full',
            'h-full',
            'overflow-auto',
        ];
    }
}

// 儀表板樣式_水平布局
export class DashboardStyleHorizontal {
    constructor(private config: DashboardConfig) { }

    public get containerClass(): string[] {
        return [
            'h-full',
            'w-full',
            'overflow-x-auto',  // 允許水平滾動
            'overflow-y-hidden', // 防止垂直滾動
        ];
    }

    public get gridClass(): string[] {
        const Class = [
            'grid',
            'mx-0 mt-0',
            'gap-5',
            'h-full',
            'grid-flow-col',  // 設置為列流佈局
            'auto-cols-min',  // 列寬自動適應內容
        ];

        if (this.config.MaxAllowedRows !== null) {
            Class.push(`grid-rows-[repeat(${this.config.maxRow},minmax(0,1fr))]`);
        } else {
            Class.push(`grid-rows-${this.config.maxRow}`);
        }

        return Class;
    }

    public getCellClass(item: DashboardGridItem): string[] {
        const Class = [
            'min-h-[80px]',
            'overflow-hidden',  // 防止內容溢出
        ];

        if (item.Width) {
            Class.push(`w-[${item.Width}px]`);
        } else {
            Class.push('w-auto');  // 使用自動寬度
        }

        if (item.Height) {
            Class.push(`h-[${item.Height}px]`);
        } else {
            Class.push('h-full');
        }

        return Class;
    }

    public getMergedCellStyles(item: DashboardGridItem): Record<string, string> {
        const column = item.Column;
        const row = item.Row;
        const columnSpan = this.config.MaxAllowedCols !== null
            ? Math.min(item.ColumnSpan || 1, this.config.MaxAllowedCols - column + 1)
            : (item.ColumnSpan || 1);
        const rowSpan = this.config.MaxAllowedRows !== null
            ? Math.min(item.RowSpan || 1, this.config.MaxAllowedRows - row + 1)
            : (item.RowSpan || 1);

        return {
            gridColumn: `${column} / span ${columnSpan}`,
            gridRow: `${row} / span ${rowSpan}`,
            order: `${(row - 1) * this.config.maxCol + column}` // 使用 order 確保正確的水平順序
        };
    }

    public getContentClass(): string[] {
        return [
            'w-full',
            'h-full',
            'overflow-auto',
        ];
    }
}

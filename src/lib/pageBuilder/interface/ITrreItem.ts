import { PageTreeItem } from '../core/PageTreeItem';
export interface ITreeItem {
    labelId?: string;
    parentLabelId?: string;
    topic?: string;
    sequence?: number;
    isRequest?: boolean;
}

export class ITreeFactory {
    static levelLimit?: 4;//最多5階
    static levelToNumber(label: string) {
        let initNumber = 6;
        let levels = label.split('.');
        let seq = 0;
        let num = initNumber;
        for (let i = 0; i < levels.length; i++) {

            let zeroNum = initNumber - i;
            let level: string = levels[i] as string;
            let l = level.padEnd(zeroNum, '0');
            seq += l.toNumber();
        }

        console.log(`${label} : ${seq}`);
        return seq;
    }
    static levelNext(currentLevel?: string) {
        if (currentLevel == null || currentLevel == "")
            return "1";
        let levels = currentLevel.split('.');
        if (levels.length == 1)
            return `${levels[0].toNumber() + 1}`;

        let seq = levels[levels.length - 1].toNumber();
        levels[levels.length - 1] = `${seq + 1}`;
        return levels.join(".");
    }

    static toTree(datas?: Array<ITreeItem>): Array<PageTreeItem> {
        if (datas == null || datas.length == 0)
            return [];
        datas = datas.orderBy(x => x.sequence);

        let roots = datas.filter(x => (x.parentLabelId == null || x.parentLabelId == ""));
        if (roots.length == 0)
            return [];

        let trees = [];
        for (let i = 0; i < roots.length; i++) {
            let root = roots[i];
            let rootTreeItem = new PageTreeItem({
                Pkid: root.labelId,
                Label: root.topic,
                Data: root,
                IsRequest: root.isRequest
            });

            this.toTreeRecursion(datas, rootTreeItem);


            trees.push(rootTreeItem);
        }

        return trees;
    }
    static toTreeRecursion(datas?: Array<ITreeItem>, targetTreeItem?: PageTreeItem) {
        let childs = datas.filter(x => x.parentLabelId == targetTreeItem.Pkid);
        if (childs.length == 0)
            return;

        for (let i = 0; i < childs.length; i++) {
            let one = childs[i];
            let chTreeItem = new PageTreeItem({
                Pkid: one.labelId,
                Label: one.topic,
                Data: one,
                IsRequest: one.isRequest
            });
            this.toTreeRecursion(datas, chTreeItem);
            targetTreeItem.addChildren(chTreeItem);
        }
    }

    static getNextRootItem(datas?: Array<ITreeItem>): ITreeItem {
        if (datas == null || datas.length == 0)
            return { labelId: "1", sequence: this.levelToNumber("1") } as ITreeItem
        let currentSeq = datas
            .filter(x => x.parentLabelId == null || x.parentLabelId == "")
            .orderByDesc(x => x.sequence)
            .firstOrDefault()?.labelId;

        let nextlabel = this.levelNext(currentSeq);
        return { labelId: nextlabel, sequence: this.levelToNumber(nextlabel) } as ITreeItem

    }
    static getNextChildItem(datas?: Array<ITreeItem>, currentLabel?: string): ITreeItem {
        if (datas == null || datas.length == 0)
            return null;
        if (currentLabel == null || currentLabel == "")
            return null;

        let currentSeq = datas
            .filter(x => x.parentLabelId == currentLabel)
            .orderByDesc(x => x.sequence)
            .firstOrDefault()?.labelId;

        if (currentSeq == undefined || currentSeq == null)
            currentSeq = `${currentLabel}.0`;

        let nextlabel = this.levelNext(currentSeq);
        return { labelId: nextlabel, sequence: this.levelToNumber(nextlabel), parentLabelId: currentLabel } as ITreeItem

    }
}
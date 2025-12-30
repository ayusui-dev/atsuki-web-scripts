import { Objects } from '@compFW/javalike/javalang';
import { AbstractDbModel } from '@compFW/model/AbstractDbModel';

export class KarteDailyModel extends AbstractDbModel {
    public getStoreName(): string {
        return "KarteDaily";
    }

    /** カルテ基本情報のID（必須） */
    standardId!: number;

    /** 診察日（必須） */
    treatmentDate!: Date;

    /**
     * メモID
     */
    memoId?: MEMO_ID;

    /**
     * メモ内容
     */
    memoStr?: string;

    /**
     * 写真
     */
    photo: File | null = null;


    constructor(init?: Partial<KarteDailyModel>) {
        super();
        Object.assign(this, init);
    }

}

export enum MEMO_ID {
    NAIL = "1",
    MAKE = "2",
    ESTE = "3",
    UNKNOWN = "999"
}

export class MemoIdManager {
    private static map: Map<MEMO_ID, string>;
    static {
        MemoIdManager.map = new Map<MEMO_ID, string>();
        MemoIdManager.map.set(MEMO_ID.NAIL, "ネイル");
        MemoIdManager.map.set(MEMO_ID.MAKE, "メイク");
        MemoIdManager.map.set(MEMO_ID.ESTE, "エステ");
    }

    public static getMap(): Map<MEMO_ID, string> {
        return MemoIdManager.map;
    }

    public static getMapIterator(): MapIterator<[MEMO_ID, string]> {
        return MemoIdManager.map.entries();
    }

    public static getDisplayValue(id: string): string {
        let str: string | undefined = MemoIdManager.map.get(id as MEMO_ID);

        if (Objects.notNull(str)) {
            return str;
        } else {
            return "";
        }
    }

    public static convertMemoId(id: string): MEMO_ID {
        let str = MemoIdManager.getDisplayValue(id);
        if(str != ""){
            return id as MEMO_ID;
        } else {
            return MEMO_ID.UNKNOWN;
        }
    }
}
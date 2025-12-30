import { AbstractDbModel } from "@compFW/model/AbstractDbModel";

export class KarteStdModel extends AbstractDbModel {
    public getStoreName(): string {
        return "KarteStd";
    }
    /** 利用者名（必須） */
    userName!: string;

    /** 郵便番号 */
    userPostNo!:number;

    /** 利用者連絡先（電話番号など） */
    userContact?: number;

    /** 利用者住所 */
    userAddress?: string;

    /** 利用者所属（チーム名など） */
    userTeam?: string;

    /** 顔写真（BLOB） */
    userPhoto?: File;

    /** 肖像利用：SNS（0=許可しない, 1=許可する） */
    allowUserPhotoOnSNS?: boolean;

    /** 肖像利用：プロモーション（0=許可しない, 1=許可する） */
    allowUserPhotoOnPromotion?: boolean;

    /** 施術リクエスト：強さ（1〜10、標準=5） */
    treatmentRequestStrongLevel?: number;

    /** 施術リクエスト：その他の要望 */
    treatmentRequestOther?: string;

    remarkText?:string;
    
    constructor(init?: Partial<KarteStdModel>) {
        super();
        Object.assign(this, init);
    }

}
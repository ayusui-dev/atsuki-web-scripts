import { DbManager } from "@compFW/db/DbManager";
import { AbstractDbModel } from "@compFW/model/AbstractDbModel";
import { KarteStdModel } from "./KarteStdModel";
import { KarteDailyModel } from "./KarteDailyModel";

export class AtsukiDbManager<T extends AbstractDbModel> extends DbManager<T> {
    protected getDbName(): string {
        return "KarteDb";
    }
    protected getDbVersion(): number {
        return 1;
    }
    protected getStores(): Array<string> {
        let storeNames:string[] = []
        storeNames.push(new KarteStdModel().getStoreName());
        storeNames.push(new KarteDailyModel().getStoreName());
        
        return storeNames;
    }
}
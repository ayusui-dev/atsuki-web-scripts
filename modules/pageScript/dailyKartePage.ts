import { BoxLayoutPanel, FlowLayoutPanel, Panel, ToggleOpenPanel } from "@compFW/components/Panel";
import { AbstractContetntsAdapter } from "./AbstractContetntsAdapter";
import { DbManagerProcessWrapper } from "@compFW/db/DbManagerProcessWrapper";
import { AtsukiDbManager } from "./AtsukiDbManager";
import { KarteStdModel } from "./KarteStdModel";
import { DbManager } from "@compFW/db/DbManager";
import { CameraShotField, DropDownList, FileChooserField, LabelPairInputField, SearchTextField, TextAreaField } from "@compFW/components/InputComponents";
import { CompareModel, CompareType } from "@compFW/model/CompareModel";
import { KarteDailyModel, MEMO_ID, MemoIdManager } from "./KarteDailyModel";
import { SIZE_UNIT } from "@compFW/components/Component";
import { StyleUtil } from "./StyleScripts";
import { Dimension, Objects } from "@compFW/javalike/javalang";
import { Button, Label } from "@compFW/components/ReadOnlyCompoents";

export class dailyKartePage extends AbstractContetntsAdapter<BoxLayoutPanel> {
    private dbMan: AtsukiDbManager<KarteStdModel> = new AtsukiDbManager<KarteStdModel>(new SearchParentProcesses(this));
    private searchText!: SearchTextField;
    private drawPanel!: BoxLayoutPanel;
    private searchResultPanel: BoxLayoutPanel = new BoxLayoutPanel();
    private compModel!: CompareModel<SearchTextField, KarteStdModel>;

    public createPanel(): BoxLayoutPanel {
        this.drawPanel = new BoxLayoutPanel();
        this.drawPanel.setComponentPadding(15, 5, 0, 0);

        return this.drawPanel;
    }
    protected drawContents(): void {
        this.addContents(
            this.searchText,
            this.searchResultPanel
        );

        this.searchResultPanel.setWidth(100, SIZE_UNIT.PERCENT);

        this.searchText.addClickEventListener(e => {
            this.dbMan.ExecuteSelect(new KarteStdModel(), this.compModel);
        });
    }
    protected initializeComponents(): void {
        this.dbMan.dbOpen();
        this.searchText = new SearchTextField();
        this.compModel = new CompareModel<SearchTextField, KarteStdModel>(this.searchText);
        // 患者名を部分一致で検索する
        this.compModel.addCondition(t => t.getText(), model => model.userName, CompareType.LIKE_PART_MATCH);

    }

    public getDrawPanel(): BoxLayoutPanel {
        return this.drawPanel;
    }

    public getSearchResultPanel(): BoxLayoutPanel {
        return this.searchResultPanel;
    }

}

export class SearchParentProcesses extends DbManagerProcessWrapper<KarteStdModel> {
    private pageObj: dailyKartePage;
    private inputDataMap: Map<number, Array<DailyEntryItems>>;
    private dailyDbMan: AtsukiDbManager<KarteDailyModel>;
    private dailyDbProc: SearchDetailProcess = new SearchDetailProcess();

    constructor(pageObj: dailyKartePage) {
        super();
        this.pageObj = pageObj;
        this.inputDataMap = new Map<number, Array<DailyEntryItems>>();
        this.dailyDbMan = new AtsukiDbManager<KarteDailyModel>(this.dailyDbProc);
        this.dailyDbMan.dbOpen();
    }

    public dbOpenAfterProcess(dbMan: DbManager<KarteStdModel>, obj: IDBDatabase): void {
        dbMan.ExecuteSelect(new KarteStdModel());
    }

    public dbSelectAfterProcess(dbMan: DbManager<KarteStdModel>, result: KarteStdModel[]): void {
        let resultPanel: BoxLayoutPanel = this.pageObj.getSearchResultPanel();
        resultPanel.removeAll();

        result.forEach(v => {
            let toggleItem: ToggleOpenPanel<BoxLayoutPanel> = new ToggleOpenPanel<BoxLayoutPanel>(v.userName);
            let itemBox: BoxLayoutPanel = new BoxLayoutPanel();
            this.inputDataMap.set(v.id, []);
            itemBox.setHeight(500, SIZE_UNIT.PIXEL);
            toggleItem.setContentPanel(itemBox);

            let addButton: Button = new Button("施術内容追加");
            let entryBttuon: Button = new Button("登録");
            let inputAreaPanel: Panel = new BoxLayoutPanel();
            inputAreaPanel.setComponentMargin(0, 5, 0, 0);
            itemBox.addComponents(addButton, inputAreaPanel, entryBttuon);
            itemBox.getCssObject().overflowY = "auto";

            // 施術追加ボタン
            addButton.addClickEventListener(e => {

                let baseInArea: FlowLayoutPanel = new FlowLayoutPanel();
                baseInArea.setComponentPadding(8, 8, 12, 12);
                let ddl: DropDownList = DailyEntryItems.createMemoIdDropDown();
                let photoCtl: CameraShotField = new CameraShotField();
                photoCtl.setIconSize(new Dimension(30, SIZE_UNIT.PIXEL, 30, SIZE_UNIT.PIXEL));
                baseInArea.addComponents(ddl, photoCtl);
                let memoLabel: Label = new Label();
                memoLabel.setText("施術メモ");
                let memoStr: TextAreaField = new TextAreaField();
                memoStr.setHeight(100, SIZE_UNIT.PIXEL);

                inputAreaPanel.addComponents(baseInArea, memoLabel, memoStr);
                let entryItem: DailyEntryItems = new DailyEntryItems();
                entryItem.standardId = v.id;
                entryItem.memoIdCtl = ddl;
                entryItem.memoStrCtl = memoStr;
                entryItem.photoCtl = photoCtl;
                this.inputDataMap.get(v.id)?.push(entryItem);

                // スタイルの適用
                StyleUtil.applyStyle(ddl);
            });

            entryBttuon.addClickEventListener(e => {
                let data: DailyEntryItems[] | undefined = this.inputDataMap.get(v.id);
                

                if (Objects.null(data) || data.length == 0) {
                    // 未入力の場合はエラー
                    alert("施術情報を入力してください");
                    return;
                }

                this.dailyDbProc.clearCount();
                this.dailyDbProc.userName = v.userName;
                this.dailyDbProc.entryCount = data.length;

                data.forEach(v => {
                    this.dailyDbMan.ExecuteEntry(v.createDbData());
                });
            });


            // スタイルを適用する
            StyleUtil.applyStyle(inputAreaPanel);
            StyleUtil.applyStyle(toggleItem);

            // 日々の情報を検索する
            resultPanel.addComponent(toggleItem);
        });

    }
}

export class DailyEntryItems extends KarteDailyModel {
    memoIdCtl!: DropDownList;

    memoStrCtl!: TextAreaField;

    photoCtl!: CameraShotField;

    public createDbData(): KarteDailyModel {
        this.treatmentDate = new Date();

        if (Objects.notNull(this.memoIdCtl)) {
            let memoIdVal: MEMO_ID = MemoIdManager.convertMemoId(this.memoIdCtl.getSelectedValue());
            if (memoIdVal != MEMO_ID.UNKNOWN) {
                this.memoId = memoIdVal;
            }
        }

        if (Objects.notNull(this.memoStrCtl) && this.memoStrCtl.getText().trim().length > 0) {
            this.memoStr = this.memoStrCtl.getText().trim();
        }

        if (Objects.notNull(this.photoCtl)) {
            this.photo = this.photoCtl.getFirstFile();
        }

        return this.cloneModel();
    }

    public static createMemoIdDropDown(): DropDownList {
        let ddl: DropDownList = new DropDownList();
        MemoIdManager.getMap().forEach((v, k) => {
            ddl.addItem(k, v);
        });

        return ddl;
    }
}

export class SearchDetailProcess extends DbManagerProcessWrapper<KarteDailyModel> {
    userName!: string;

    entryCount!: number;

    private nowCount: number = 0;

    public clearCount(): void {
        this.nowCount = 0;
    }

    public dbEntryAfterProcess(dbMan: DbManager<KarteDailyModel>): void {
        if(++this.nowCount === this.entryCount){
            alert("施術情報を記録しました。 患者名：" + this.userName);
        }
    }

    public dbEntryErrorProcess(dbMan: DbManager<KarteDailyModel>, ex: DOMException | null): void {
        alert("施術情報記録中にエラーが発生しました。" + ex?.message);
        throw ex;
    }
}
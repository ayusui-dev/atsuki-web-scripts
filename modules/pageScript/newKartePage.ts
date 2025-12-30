import { BoxLayoutPanel, FlowLayoutPanel, LayoutTable, LayoutType, Panel } from "@compFW/components/Panel";
import { AbstractContetntsAdapter } from "./AbstractContetntsAdapter";
import { CameraShotField, IOSCheckboxField, LabelPairInputField, NumberField, PostNoText, TextAreaField, TextField } from "@compFW/components/InputComponents";
import { DbManagerProcessWrapper } from "@compFW/db/DbManagerProcessWrapper";
import { KarteStdModel } from "./KarteStdModel";
import { Component, SIZE_UNIT } from "@compFW/components/Component";
import { Button, Label } from "@compFW/components/ReadOnlyCompoents";
import { Dimension, Objects } from "@compFW/javalike/javalang";
import { AtsukiDbManager } from "./AtsukiDbManager";
import { DbManager } from "@compFW/db/DbManager";

export class newKartePage extends AbstractContetntsAdapter<BoxLayoutPanel> {

    private lblUserPostNo!: Label;
    private lblUserAddress!: Label;
    private lblAllowUserPhotoOnSNS!: Label;
    private lblAllowUserPhotoOnPromotion!: Label;
    private lblRemark!:Label;
    private userPhoto!: CameraShotField;
    private userName!: LabelPairInputField<TextField>;
    private userPostNo!: PostNoText;
    private userAddressText!: TextField;
    private userTeam!:LabelPairInputField<TextField>;
    private userContact!:LabelPairInputField<NumberField>;
    private lblUserPhoto!:Label;
    private allowUserPhotoOnSNSCheck!: IOSCheckboxField;
    private allowUserPhotoOnPromotionCheck!: IOSCheckboxField;
    private addKarteButton!: Button;
    private remarkText!:TextAreaField;
    private dbManager: AtsukiDbManager<KarteStdModel> = new AtsukiDbManager<KarteStdModel>(new karteDbProcesses());

    protected initializeComponents(): void {
        this.userAddressText = new TextField();
        this.userPhoto = new CameraShotField();
        this.userName = new LabelPairInputField("利用者様", new TextField(), LayoutType.BOX_LAYOUR);
        this.userTeam = new LabelPairInputField("所属など", new TextField(), LayoutType.BOX_LAYOUR);
        this.userContact = new LabelPairInputField("連絡先", new NumberField(), LayoutType.BOX_LAYOUR);
        this.userPostNo = new PostNoText(this.userAddressText);
        this.remarkText = new TextAreaField();
        this.lblUserPostNo = new Label();
        this.lblUserPhoto = new Label();
        this.lblUserAddress = new Label();
        this.lblRemark = new Label();
        this.lblRemark.setText("備考");
        this.lblUserPhoto.setText("写真撮影");
        this.userPhoto = new CameraShotField();
        this.lblAllowUserPhotoOnSNS = new Label();
        this.lblAllowUserPhotoOnPromotion = new Label();
        this.allowUserPhotoOnSNSCheck = new IOSCheckboxField();
        this.allowUserPhotoOnPromotionCheck = new IOSCheckboxField();
        this.addKarteButton = new Button("カルテ作成");
        this.dbManager.dbOpen();
    }

    protected drawContents(): void {
        this.lblAllowUserPhotoOnSNS.setText("写真のSNS利用を許可");
        this.lblAllowUserPhotoOnPromotion.setText("写真のプロモーション資料への使用を許可");
        this.lblAllowUserPhotoOnSNS.setForInputComponent(this.allowUserPhotoOnSNSCheck.getCheckBoxObject());
        this.lblAllowUserPhotoOnPromotion.setForInputComponent(this.allowUserPhotoOnPromotionCheck.getCheckBoxObject());
        this.lblUserPostNo.setText("〒郵便番号");
        this.lblUserAddress.setText("住所");
        let spacer:Panel = new Panel();

        this.addContents(
            this.userName,
            this.createItem(this.lblUserPostNo, this.userPostNo), 
            this.createItem(this.lblUserAddress, this.userAddressText),
            this.userTeam,
            this.createItem(this.lblUserPhoto,this.userPhoto),
            this.createItem(this.lblAllowUserPhotoOnSNS, this.allowUserPhotoOnSNSCheck),
            this.createItem(this.lblAllowUserPhotoOnPromotion, this.allowUserPhotoOnPromotionCheck),
            this.createItem(this.lblRemark,this.remarkText),
            this.addKarteButton,
            spacer
        );


        this.userPostNo.setWidth(70, SIZE_UNIT.PIXEL);
        this.userPhoto.setIconSize(new Dimension(30, SIZE_UNIT.PIXEL, 30, SIZE_UNIT.PIXEL));
        this.remarkText.setHeight(100, SIZE_UNIT.PIXEL);
        spacer.setHeight(200, SIZE_UNIT.PIXEL);
        // イベント追加
        this.addKarteButton.addClickEventListener(e => this.karteCreate());
    }

    private createItem(...components: Component<HTMLElement>[]): BoxLayoutPanel {
        let panel: BoxLayoutPanel = new BoxLayoutPanel();
        panel.addComponents(...components);

        return panel;
    }
    public createPanel(): BoxLayoutPanel {
        let panel: BoxLayoutPanel = new BoxLayoutPanel();
        panel.setComponentPadding(15, 5, 0, 0);

        return panel;
    }


    /**
     * カルテ作成の処理
     */
    private karteCreate(): void {
        let insModel: KarteStdModel = new KarteStdModel();
        insModel.userName = this.userName.getInputText();
        insModel.userAddress = this.userAddressText.getText();
        insModel.userPostNo = Number(this.userPostNo.getText());
        let photoFile: File | null = this.userPhoto.getFirstFile();
        if (Objects.notNull(photoFile)) {
            insModel.userPhoto = photoFile;
        }
        insModel.allowUserPhotoOnPromotion = this.allowUserPhotoOnPromotionCheck.isChecked();
        insModel.allowUserPhotoOnSNS = this.allowUserPhotoOnSNSCheck.isChecked();
        insModel.userTeam = this.userTeam.getInputText();
        insModel.userContact = Number(this.userContact.getInputText());
        insModel.remarkText = this.remarkText.getText();

        this.dbManager.ExecuteEntry(insModel);
    }
}

export class karteDbProcesses extends DbManagerProcessWrapper<KarteStdModel> {
    public dbEntryAfterProcess(dbMan: DbManager<KarteStdModel>): void {
        alert("カルテが作成されました。");
    }

    public dbEntryErrorProcess(dbMan: DbManager<KarteStdModel>, ex: DOMException | null): void {
        alert("カルテ作成時にエラーが発生しました。" + ex?.message);
    }
}
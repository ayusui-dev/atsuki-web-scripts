import { POSITION_STAT, SIZE_UNIT } from "@compFW/components/Component";
import { FlowLayoutPanel, LayoutType, MenuBarPanel, Panel } from "@compFW/components/Panel";
import { HyperLinkText, ImageArea } from "@compFW/components/ReadOnlyCompoents";
import { Dimension, Directions, Entry } from "@compFW/javalike/javalang";
import { AbstractScreen } from "@compFW/page/AbstractScreen";
import { AbstractContetntsAdapter } from "./AbstractContetntsAdapter";
import { LabelPairInputField, PostNoText, TextField } from "@compFW/components/InputComponents";
import { StyleUtil } from "./StyleScripts";

export abstract class AtsukiBaseScreen extends AbstractScreen {
    private menuMap: Map<string, AbstractContetntsAdapter<Panel>>;
    private contentsContainer: Panel = new Panel();

    constructor(...menuEntry: Entry<string, AbstractContetntsAdapter<Panel>>[]) {
        super();
        this.menuMap = new Map<string, AbstractContetntsAdapter<Panel>>();
        menuEntry.forEach(entry => {
            this.menuMap.set(entry.key, entry.value);
        })
    }

    protected onDomLoad(): void {
        const MENU_POS: number = 20;
        const CLOSE_SIZE: number = 80;
        let menu: MenuBarPanel = new MenuBarPanel(MENU_POS, MENU_POS);
        let imgObj: ImageArea = new ImageArea();

        imgObj.setPicturePath("pic/logo_192.png");
        imgObj.setWidth(64, SIZE_UNIT.PIXEL);
        imgObj.setHeightAdjust();

        // タイトルに指定するアイテム設定
        menu.setCloseShowItem(imgObj);
        menu.setCloseShowSizeDim(new Dimension(CLOSE_SIZE, SIZE_UNIT.PIXEL, CLOSE_SIZE, SIZE_UNIT.PIXEL));

        this.menuMap.forEach((v, k) => {
            let link: HyperLinkText = new HyperLinkText();
            StyleUtil.applyHyperLinkStyle(link);
            link.setText(k);
            link.addClickEventListener(e => {
                this.drawBackGround(v);
                menu.menuClose();
            });
            menu.addMenuItem(link);
        });

        StyleUtil.applyMenuStyle(menu.getMenuContentPanel());
        StyleUtil.applyMenuStyle(menu.getMenuTitlePanel());

        this.drawPage(this.contentsContainer);
        this.drawPage(menu);

        let pos: Directions = new Directions(CLOSE_SIZE + 15, undefined, undefined, MENU_POS);
        this.contentsContainer.setPosition(POSITION_STAT.RELATIVE, pos);
        this.contentsContainer.setSizeCalc(
            "100vw - " + (MENU_POS * 2).toString() + "px",
            "100vh - " + (CLOSE_SIZE + 30).toString() + "px"
        );

    }

    /**
     * バックグラウンドのパネルに設定したコンテンツを適用する
     * @param p 
     */
    public drawBackGround(adapter: AbstractContetntsAdapter<Panel>): void {
        this.contentsContainer.getDomObject().innerHTML = "";
        this.contentsContainer.addComponent(adapter.getContents());
    }

}
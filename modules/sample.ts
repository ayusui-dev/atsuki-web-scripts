import { AbstractScreen } from "@compFW/page/AbstractScreen";
import { SIZE_UNIT } from "@compFW/components/Component";
import { CameraShotField, DateField, NumberField } from "@compFW/components/InputComponents";
import { BoxLayoutPanel, FlowLayoutPanel, MenuBarPanel, Panel } from "@compFW/components/Panel";
import { ImageArea } from "@compFW/components/ReadOnlyCompoents";
import { Dimension } from "@compFW/javalike/javalang";

export class sample extends AbstractScreen {
    protected onDomLoad(): void {
        let tBox: DateField = new DateField();
        let tBox2: NumberField = new NumberField();
        let camera: CameraShotField = new CameraShotField();
        let imgObj: ImageArea = new ImageArea();
        let menuBar: MenuBarPanel = new MenuBarPanel(20, 20);
        imgObj.setPicturePath("pic/logo_192.png");
        imgObj.setWidth(64, SIZE_UNIT.PIXEL);
        imgObj.setHeightAdjust();

        menuBar.setCloseShowItem(imgObj);
        menuBar.setCloseShowSizeDim(new Dimension(64, SIZE_UNIT.PIXEL, 64, SIZE_UNIT.PIXEL));
        menuBar.setComponentMargin(20, 0, 10, 0);

        menuBar.addMenuItem(tBox);
        menuBar.addMenuItem(tBox2);
        menuBar.addMenuItem(camera);

        this.drawPage(menuBar);
    }
}
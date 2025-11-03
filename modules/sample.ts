import { AbstractScreen } from "@compFW/page/AbstractScreen";
import { SIZE_UNIT } from "@compFW/components/Component";
import { CameraShotField, DateField, NumberField } from "@compFW/components/InputComponents";
import { BoxLayoutPanel, FlowLayoutPanel, Panel } from "@compFW/components/Panel";
import { Image } from "@compFW/components/ReadOnlyCompoents";

export class sample extends AbstractScreen {
    protected onDomLoad(): void {
        let outerPanel: BoxLayoutPanel = new BoxLayoutPanel();
        let tBox: DateField = new DateField();
        let tBox2: NumberField = new NumberField();
        let camera:CameraShotField = new CameraShotField();
        let imgObj:Image = new Image();
        imgObj.setPicturePath("pic/logo_192.png");
        imgObj.setWidth(32, SIZE_UNIT.PIXEL);
        imgObj.setHeightAdjust();

        let innerPanel:FlowLayoutPanel = new FlowLayoutPanel();
        innerPanel.addComponent(imgObj);
        
        outerPanel.addComponent(tBox);
        outerPanel.addComponent(tBox2);
        outerPanel.addComponent(camera);
        outerPanel.addComponent(innerPanel);

        this.drawPage(outerPanel);
    }
}
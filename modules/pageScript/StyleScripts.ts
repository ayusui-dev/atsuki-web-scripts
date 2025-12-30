import { AbstractInputBox } from "@compFW/components/AbstractInputBox";
import { Component } from "@compFW/components/Component";
import { DropDownList, FileChooserField, LabelPairInputField } from "@compFW/components/InputComponents";
import { Panel, ToggleOpenPanel } from "@compFW/components/Panel";
import { Button, HyperLinkText } from "@compFW/components/ReadOnlyCompoents";

export enum StyleType {
    TITLE = "title",
    HYPER_LINK = "hyperLink"
}

export class StyleUtil {
    public static applyStyle(...c: Component<HTMLElement>[]): void {
        c.forEach(comp => {
            if (comp instanceof LabelPairInputField) {
                let nc: LabelPairInputField<AbstractInputBox> = comp as LabelPairInputField<AbstractInputBox>;
                this.applyInputBoxStyle(nc.getInputComponent());
            }

            if (comp instanceof AbstractInputBox) {
                if (comp instanceof Button) {
                    StyleUtil.applyButtonStyle(comp);
                } else if (comp instanceof FileChooserField) {

                } else {
                    StyleUtil.applyInputBoxStyle(comp);
                }
            }

            if (comp instanceof DropDownList) {
                StyleUtil.applyDropDownListStyle(comp);
            }

            if (comp instanceof ToggleOpenPanel) {
                StyleUtil.applyToggleOpenPanelTitle(comp.getTitlePanel());
                StyleUtil.applyToggleOpenPanelContent(comp.getContentsPanel());
                comp.getTitlePanel().getChildComponents().forEach(childComp => { StyleUtil.applyStyle(childComp) });
                comp.getContentsPanel().getChildComponents().forEach(childComp => { StyleUtil.applyStyle(childComp) });
            } else if (comp instanceof Panel) {
                comp.getChildComponents().forEach(childComp => { StyleUtil.applyStyle(childComp) });
            }
        });
    }

    private static applyInputBoxStyle(c: AbstractInputBox): void {
        if (!(c instanceof FileChooserField)) {
            // ファイル選択以外の場合は適用する
            let elem: HTMLInputElement = c.getDomObject();
            elem.style.border = "2px solid #ccc";
            elem.style.borderRadius = "8px";
            elem.style.padding = "8px 12px";
            elem.style.background = "linear-gradient( #fefefe, #e0e0e0)";
            elem.style.boxShadow = "inset 0 1px 2px #fff, 0 2px 5px rgba(0, 0, 0, 0.2)";
            elem.style.transition = "all 0.2s ease-in-out";
            elem.style.width = "calc(" + elem.style.width + " - " + elem.style.paddingLeft + " - " + elem.style.paddingRight + ")";
        }
    }

    private static applyDropDownListStyle(c: DropDownList): void {
        // ファイル選択以外の場合は適用する
        let elem: HTMLSelectElement = c.getDomObject();
        elem.style.border = "2px solid #ccc";
        elem.style.borderRadius = "8px";
        elem.style.padding = "8px 12px";
        elem.style.background = "linear-gradient( #fefefe, #e0e0e0)";
        elem.style.boxShadow = "inset 0 1px 2px #fff, 0 2px 5px rgba(0, 0, 0, 0.2)";
        elem.style.transition = "all 0.2s ease-in-out";
        elem.style.width = "calc(" + elem.style.width + " - " + elem.style.paddingLeft + " - " + elem.style.paddingRight + ")";
    }

    private static applyButtonStyle(c: Button): void {
        let elem: HTMLInputElement = c.getDomObject();

        elem.style.background = "#73d5ff";
        elem.style.color = "#000";
        elem.style.fontWeight = "bold";
        elem.style.fontSize = "16px";
        elem.style.padding = "12px 20px";
        elem.style.border = "none";
        elem.style.borderRadius = "12px";
        elem.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        elem.style.transition = "all 0.3s ease";
    }

    public static applyMenuStyle(p: Panel): void {
        let c: HTMLDivElement = p.getDomObject();
        c.style.borderRadius = "12px";
        c.style.border = "2px solid #4A90E2";
        c.style.backgroundColor = "#E6F0FA";
        c.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)";
        c.style.padding = "8px";
        c.style.boxSizing = "border-box";
        c.style.transition = "width 0.4s ease, height 0.4s ease";
    }

    public static applyToggleOpenPanelTitle(p: Panel): void {
        let c: HTMLDivElement = p.getDomObject();
        c.style.borderRadius = "6px";
        c.style.border = "2px solid #5588FF";
        c.style.backgroundColor = "#6699FF";
        c.style.padding = "4px";
        c.style.boxSizing = "border-box";
    }

    public static applyToggleOpenPanelContent(p: Panel): void {
        let c: HTMLDivElement = p.getDomObject();
        c.style.borderRadius = "6px";
        c.style.border = "2px solid #5588FF";
        c.style.backgroundColor = "#CCEEFF";
        c.style.padding = "4px";
        c.style.boxSizing = "border-box";
        c.style.transition = "height 0.4s ease";
    }

    public static applyHyperLinkStyle(linkObj: HyperLinkText): void {
        let elem: HTMLAnchorElement = linkObj.getDomObject();
        elem.style.padding = "10px";
        elem.style.fontSize = "24px";
        elem.style.textDecoration = "underline";
        elem.style.color = "#3377FF";
    }

}

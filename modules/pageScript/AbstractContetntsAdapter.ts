import { AbstractInputBox } from "@compFW/components/AbstractInputBox";
import { Component } from "@compFW/components/Component";
import { FileChooserField, LabelPairInputField, TextField } from "@compFW/components/InputComponents";
import { Panel } from "@compFW/components/Panel";
import { Button } from "@compFW/components/ReadOnlyCompoents";
import { StyleUtil } from "./StyleScripts";

/**
 * 蒼月のページコンテンツエリアを描画するための抽象クラス
 */
export abstract class AbstractContetntsAdapter<T extends Panel> {
    private contentsArea: T;

    constructor() {
        this.contentsArea = this.createPanel();
    }

    /**
     * コンテンツエリアのパネルを作成する。
     */
    public abstract createPanel(): T;

    public getContentPanel(): T {
        return this.contentsArea;
    }

    public getContents(): T {
        this.contentsArea.removeAll();
        this.initializeComponents();
        Component.resetLoadComponentCount();
        this.drawContents();
        Component.initializeComponentFixed();
        return this.contentsArea;
    }

    protected abstract drawContents(): void;

    protected addContents(...c: Component<HTMLElement>[]): void {
        this.contentsArea.addComponents(...c)
        StyleUtil.applyStyle(...c);
    }


    protected abstract initializeComponents(): void;
}
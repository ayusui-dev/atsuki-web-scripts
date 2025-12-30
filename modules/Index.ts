import { AbstractEntry } from "@compFW/javalike/javalang";
import { AtsukiBaseScreen } from "./pageScript/AtsukiBaseScreen";
import { newKartePage } from "./pageScript/newKartePage";
import { dailyKartePage } from "./pageScript/dailyKartePage";

export class Index extends AtsukiBaseScreen {
    constructor() {
        super(
            AbstractEntry.makeEntry("カルテ作成", new newKartePage()),
            AbstractEntry.makeEntry("施術記録", new dailyKartePage())
        );
    }
}
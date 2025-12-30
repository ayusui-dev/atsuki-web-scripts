import { outputHtml, setVariableNames } from '@compFW/releaseScripts/generateHtmlScript';
import './outputHtmlCommonSettting';

setVariableNames("{#title}", "{#script_name}");

outputHtml("index", undefined, "蒼月施術管理システム", "index");

import { setInputScriptPath, setInputScriptRootPath, setOutputScriptPath, setOutputScriptRootPath, setTemplateHtmlPath } from '@compFW/releaseScripts/generateHtmlScript';
const tscon = require('../tsconfig.json');

setInputScriptRootPath("./");
setInputScriptPath("./modules/css");
setOutputScriptRootPath("../atsuki-web-system");
setOutputScriptPath(tscon.compilerOptions.outDir, "site/css");
setTemplateHtmlPath("./modules/template/template.html");
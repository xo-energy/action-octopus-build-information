require('./sourcemap-register.js');module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 7351:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__webpack_require__(2087));
const utils_1 = __webpack_require__(5278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 2186:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __webpack_require__(7351);
const file_command_1 = __webpack_require__(717);
const utils_1 = __webpack_require__(5278);
const os = __importStar(__webpack_require__(2087));
const path = __importStar(__webpack_require__(5622));
const oidc_utils_1 = __webpack_require__(8041);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    return inputs;
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
/**
 * Markdown summary exports
 */
var markdown_summary_1 = __webpack_require__(8042);
Object.defineProperty(exports, "markdownSummary", ({ enumerable: true, get: function () { return markdown_summary_1.markdownSummary; } }));
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issueCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__webpack_require__(5747));
const os = __importStar(__webpack_require__(2087));
const utils_1 = __webpack_require__(5278);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 8042:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __webpack_require__(2087);
const fs_1 = __webpack_require__(5747);
const { access, appendFile, writeFile } = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-markdown-summary';
class MarkdownSummary {
    constructor() {
        this._buffer = '';
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */
    filePath() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._filePath) {
                return this._filePath;
            }
            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) {
                throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports markdown summaries.`);
            }
            try {
                yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
            }
            catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */
    wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
        if (!content) {
            return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<MarkdownSummary>} markdown summary instance
     */
    write(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {MarkdownSummary} markdown summary instance
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */
    stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */
    isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {MarkdownSummary} markdown summary instance
     */
    emptyBuffer() {
        this._buffer = '';
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {MarkdownSummary} markdown summary instance
     */
    addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {MarkdownSummary} markdown summary instance
     */
    addEOL() {
        return this.addRaw(os_1.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {MarkdownSummary} markdown summary instance
     */
    addCodeBlock(code, lang) {
        const attrs = Object.assign({}, (lang && { lang }));
        const element = this.wrap('pre', this.wrap('code', code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {MarkdownSummary} markdown summary instance
     */
    addList(items, ordered = false) {
        const tag = ordered ? 'ol' : 'ul';
        const listItems = items.map(item => this.wrap('li', item)).join('');
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {MarkdownSummary} markdown summary instance
     */
    addTable(rows) {
        const tableBody = rows
            .map(row => {
            const cells = row
                .map(cell => {
                if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? 'th' : 'td';
                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
                return this.wrap(tag, data, attrs);
            })
                .join('');
            return this.wrap('tr', cells);
        })
            .join('');
        const element = this.wrap('table', tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {MarkdownSummary} markdown summary instance
     */
    addDetails(label, content) {
        const element = this.wrap('details', this.wrap('summary', label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {MarkdownSummary} markdown summary instance
     */
    addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {MarkdownSummary} markdown summary instance
     */
    addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {MarkdownSummary} markdown summary instance
     */
    addSeparator() {
        const element = this.wrap('hr', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {MarkdownSummary} markdown summary instance
     */
    addBreak() {
        const element = this.wrap('br', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {MarkdownSummary} markdown summary instance
     */
    addQuote(text, cite) {
        const attrs = Object.assign({}, (cite && { cite }));
        const element = this.wrap('blockquote', text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {MarkdownSummary} markdown summary instance
     */
    addLink(text, href) {
        const element = this.wrap('a', text, { href });
        return this.addRaw(element).addEOL();
    }
}
// singleton export
exports.markdownSummary = new MarkdownSummary();
//# sourceMappingURL=markdown-summary.js.map

/***/ }),

/***/ 8041:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __webpack_require__(9925);
const auth_1 = __webpack_require__(3702);
const core_1 = __webpack_require__(2186);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 4087:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Context = void 0;
const fs_1 = __webpack_require__(5747);
const os_1 = __webpack_require__(2087);
class Context {
    /**
     * Hydrate the context from the environment
     */
    constructor() {
        this.payload = {};
        if (process.env.GITHUB_EVENT_PATH) {
            if (fs_1.existsSync(process.env.GITHUB_EVENT_PATH)) {
                this.payload = JSON.parse(fs_1.readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: 'utf8' }));
            }
            else {
                const path = process.env.GITHUB_EVENT_PATH;
                process.stdout.write(`GITHUB_EVENT_PATH ${path} does not exist${os_1.EOL}`);
            }
        }
        this.eventName = process.env.GITHUB_EVENT_NAME;
        this.sha = process.env.GITHUB_SHA;
        this.ref = process.env.GITHUB_REF;
        this.workflow = process.env.GITHUB_WORKFLOW;
        this.action = process.env.GITHUB_ACTION;
        this.actor = process.env.GITHUB_ACTOR;
        this.job = process.env.GITHUB_JOB;
        this.runNumber = parseInt(process.env.GITHUB_RUN_NUMBER, 10);
        this.runId = parseInt(process.env.GITHUB_RUN_ID, 10);
    }
    get issue() {
        const payload = this.payload;
        return Object.assign(Object.assign({}, this.repo), { number: (payload.issue || payload.pull_request || payload).number });
    }
    get repo() {
        if (process.env.GITHUB_REPOSITORY) {
            const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');
            return { owner, repo };
        }
        if (this.payload.repository) {
            return {
                owner: this.payload.repository.owner.login,
                repo: this.payload.repository.name
            };
        }
        throw new Error("context.repo requires a GITHUB_REPOSITORY environment variable like 'owner/repo'");
    }
}
exports.Context = Context;
//# sourceMappingURL=context.js.map

/***/ }),

/***/ 5438:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOctokit = exports.context = void 0;
const Context = __importStar(__webpack_require__(4087));
const utils_1 = __webpack_require__(3030);
exports.context = new Context.Context();
/**
 * Returns a hydrated octokit ready to use for GitHub Actions
 *
 * @param     token    the repo PAT or GITHUB_TOKEN
 * @param     options  other options to set
 */
function getOctokit(token, options) {
    return new utils_1.GitHub(utils_1.getOctokitOptions(token, options));
}
exports.getOctokit = getOctokit;
//# sourceMappingURL=github.js.map

/***/ }),

/***/ 7914:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getApiBaseUrl = exports.getProxyAgent = exports.getAuthString = void 0;
const httpClient = __importStar(__webpack_require__(9925));
function getAuthString(token, options) {
    if (!token && !options.auth) {
        throw new Error('Parameter token or opts.auth is required');
    }
    else if (token && options.auth) {
        throw new Error('Parameters token and opts.auth may not both be specified');
    }
    return typeof options.auth === 'string' ? options.auth : `token ${token}`;
}
exports.getAuthString = getAuthString;
function getProxyAgent(destinationUrl) {
    const hc = new httpClient.HttpClient();
    return hc.getAgent(destinationUrl);
}
exports.getProxyAgent = getProxyAgent;
function getApiBaseUrl() {
    return process.env['GITHUB_API_URL'] || 'https://api.github.com';
}
exports.getApiBaseUrl = getApiBaseUrl;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 3030:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getOctokitOptions = exports.GitHub = exports.context = void 0;
const Context = __importStar(__webpack_require__(4087));
const Utils = __importStar(__webpack_require__(7914));
// octokit + plugins
const core_1 = __webpack_require__(6762);
const plugin_rest_endpoint_methods_1 = __webpack_require__(3044);
const plugin_paginate_rest_1 = __webpack_require__(4193);
exports.context = new Context.Context();
const baseUrl = Utils.getApiBaseUrl();
const defaults = {
    baseUrl,
    request: {
        agent: Utils.getProxyAgent(baseUrl)
    }
};
exports.GitHub = core_1.Octokit.plugin(plugin_rest_endpoint_methods_1.restEndpointMethods, plugin_paginate_rest_1.paginateRest).defaults(defaults);
/**
 * Convience function to correctly format Octokit Options to pass into the constructor.
 *
 * @param     token    the repo PAT or GITHUB_TOKEN
 * @param     options  other options to set
 */
function getOctokitOptions(token, options) {
    const opts = Object.assign({}, options || {}); // Shallow clone - don't mutate the object provided by the caller
    // Auth
    const auth = Utils.getAuthString(token, opts);
    if (auth) {
        opts.auth = auth;
    }
    return opts;
}
exports.getOctokitOptions = getOctokitOptions;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 3702:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' +
                Buffer.from(this.username + ':' + this.password).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] = 'Bearer ' + this.token;
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        options.headers['Authorization'] =
            'Basic ' + Buffer.from('PAT:' + this.token).toString('base64');
    }
    // This handler cannot handle 401
    canHandleAuthentication(response) {
        return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
        return null;
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;


/***/ }),

/***/ 9925:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const http = __webpack_require__(8605);
const https = __webpack_require__(7211);
const pm = __webpack_require__(6443);
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise(async (resolve, reject) => {
            let output = Buffer.alloc(0);
            this.message.on('data', (chunk) => {
                output = Buffer.concat([output, chunk]);
            });
            this.message.on('end', () => {
                resolve(output.toString());
            });
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    async getJson(requestUrl, additionalHeaders = {}) {
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        let res = await this.get(requestUrl, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.post(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.put(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
        let data = JSON.stringify(obj, null, 2);
        additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
        additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
        let res = await this.patch(requestUrl, data, additionalHeaders);
        return this._processResponse(res, this.requestOptions);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    async request(verb, requestUrl, data, headers) {
        if (this._disposed) {
            throw new Error('Client has already been disposed.');
        }
        let parsedUrl = new URL(requestUrl);
        let info = this._prepareRequest(verb, parsedUrl, headers);
        // Only perform retries on reads since writes may not be idempotent.
        let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1
            ? this._maxRetries + 1
            : 1;
        let numTries = 0;
        let response;
        while (numTries < maxTries) {
            response = await this.requestRaw(info, data);
            // Check if it's an authentication challenge
            if (response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized) {
                let authenticationHandler;
                for (let i = 0; i < this.handlers.length; i++) {
                    if (this.handlers[i].canHandleAuthentication(response)) {
                        authenticationHandler = this.handlers[i];
                        break;
                    }
                }
                if (authenticationHandler) {
                    return authenticationHandler.handleAuthentication(this, info, data);
                }
                else {
                    // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
            }
            let redirectsRemaining = this._maxRedirects;
            while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 &&
                this._allowRedirects &&
                redirectsRemaining > 0) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                    // if there's no location to redirect to, we won't
                    break;
                }
                let parsedRedirectUrl = new URL(redirectUrl);
                if (parsedUrl.protocol == 'https:' &&
                    parsedUrl.protocol != parsedRedirectUrl.protocol &&
                    !this._allowRedirectDowngrade) {
                    throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                await response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                    for (let header in headers) {
                        // header names are case insensitive
                        if (header.toLowerCase() === 'authorization') {
                            delete headers[header];
                        }
                    }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = await this.requestRaw(info, data);
                redirectsRemaining--;
            }
            if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                // If not a retry code, return immediately instead of retrying
                return response;
            }
            numTries += 1;
            if (numTries < maxTries) {
                await response.readBody();
                await this._performExponentialBackoff(numTries);
            }
        }
        return response;
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        if (typeof data === 'string') {
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        let parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            this.handlers.forEach(handler => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        let proxyUrl = pm.getProxyUrl(parsedUrl);
        let useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __webpack_require__(4294);
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    ...((proxyUrl.username || proxyUrl.password) && {
                        proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                    }),
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                }
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
    static dateTimeDeserializer(key, value) {
        if (typeof value === 'string') {
            let a = new Date(value);
            if (!isNaN(a.valueOf())) {
                return a;
            }
        }
        return value;
    }
    async _processResponse(res, options) {
        return new Promise(async (resolve, reject) => {
            const statusCode = res.message.statusCode;
            const response = {
                statusCode: statusCode,
                result: null,
                headers: {}
            };
            // not found leads to null obj returned
            if (statusCode == HttpCodes.NotFound) {
                resolve(response);
            }
            let obj;
            let contents;
            // get the result from the body
            try {
                contents = await res.readBody();
                if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                        obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
                    }
                    else {
                        obj = JSON.parse(contents);
                    }
                    response.result = obj;
                }
                response.headers = res.message.headers;
            }
            catch (err) {
                // Invalid resource (contents not json);  leaving result obj null
            }
            // note that 3xx redirects are handled by the http layer.
            if (statusCode > 299) {
                let msg;
                // if exception/error in body, attempt to get better error
                if (obj && obj.message) {
                    msg = obj.message;
                }
                else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                }
                else {
                    msg = 'Failed request: (' + statusCode + ')';
                }
                let err = new HttpClientError(msg, statusCode);
                err.result = response.result;
                reject(err);
            }
            else {
                resolve(response);
            }
        });
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ 6443:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === 'https:';
    let proxyUrl;
    if (checkBypass(reqUrl)) {
        return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
        proxyVar = process.env['https_proxy'] || process.env['HTTPS_PROXY'];
    }
    else {
        proxyVar = process.env['http_proxy'] || process.env['HTTP_PROXY'];
    }
    if (proxyVar) {
        proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    let noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (let upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;


/***/ }),

/***/ 334:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

const REGEX_IS_INSTALLATION_LEGACY = /^v1\./;
const REGEX_IS_INSTALLATION = /^ghs_/;
const REGEX_IS_USER_TO_SERVER = /^ghu_/;
async function auth(token) {
  const isApp = token.split(/\./).length === 3;
  const isInstallation = REGEX_IS_INSTALLATION_LEGACY.test(token) || REGEX_IS_INSTALLATION.test(token);
  const isUserToServer = REGEX_IS_USER_TO_SERVER.test(token);
  const tokenType = isApp ? "app" : isInstallation ? "installation" : isUserToServer ? "user-to-server" : "oauth";
  return {
    type: "token",
    token: token,
    tokenType
  };
}

/**
 * Prefix token for usage in the Authorization header
 *
 * @param token OAuth token or JSON Web Token
 */
function withAuthorizationPrefix(token) {
  if (token.split(/\./).length === 3) {
    return `bearer ${token}`;
  }

  return `token ${token}`;
}

async function hook(token, request, route, parameters) {
  const endpoint = request.endpoint.merge(route, parameters);
  endpoint.headers.authorization = withAuthorizationPrefix(token);
  return request(endpoint);
}

const createTokenAuth = function createTokenAuth(token) {
  if (!token) {
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  }

  if (typeof token !== "string") {
    throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");
  }

  token = token.replace(/^(token|bearer) +/i, "");
  return Object.assign(auth.bind(null, token), {
    hook: hook.bind(null, token)
  });
};

exports.createTokenAuth = createTokenAuth;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 6762:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var universalUserAgent = __webpack_require__(5030);
var beforeAfterHook = __webpack_require__(3682);
var request = __webpack_require__(6234);
var graphql = __webpack_require__(8467);
var authToken = __webpack_require__(334);

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

const VERSION = "3.6.0";

const _excluded = ["authStrategy"];
class Octokit {
  constructor(options = {}) {
    const hook = new beforeAfterHook.Collection();
    const requestDefaults = {
      baseUrl: request.request.endpoint.DEFAULTS.baseUrl,
      headers: {},
      request: Object.assign({}, options.request, {
        // @ts-ignore internal usage only, no need to type
        hook: hook.bind(null, "request")
      }),
      mediaType: {
        previews: [],
        format: ""
      }
    }; // prepend default user agent with `options.userAgent` if set

    requestDefaults.headers["user-agent"] = [options.userAgent, `octokit-core.js/${VERSION} ${universalUserAgent.getUserAgent()}`].filter(Boolean).join(" ");

    if (options.baseUrl) {
      requestDefaults.baseUrl = options.baseUrl;
    }

    if (options.previews) {
      requestDefaults.mediaType.previews = options.previews;
    }

    if (options.timeZone) {
      requestDefaults.headers["time-zone"] = options.timeZone;
    }

    this.request = request.request.defaults(requestDefaults);
    this.graphql = graphql.withCustomRequest(this.request).defaults(requestDefaults);
    this.log = Object.assign({
      debug: () => {},
      info: () => {},
      warn: console.warn.bind(console),
      error: console.error.bind(console)
    }, options.log);
    this.hook = hook; // (1) If neither `options.authStrategy` nor `options.auth` are set, the `octokit` instance
    //     is unauthenticated. The `this.auth()` method is a no-op and no request hook is registered.
    // (2) If only `options.auth` is set, use the default token authentication strategy.
    // (3) If `options.authStrategy` is set then use it and pass in `options.auth`. Always pass own request as many strategies accept a custom request instance.
    // TODO: type `options.auth` based on `options.authStrategy`.

    if (!options.authStrategy) {
      if (!options.auth) {
        // (1)
        this.auth = async () => ({
          type: "unauthenticated"
        });
      } else {
        // (2)
        const auth = authToken.createTokenAuth(options.auth); // @ts-ignore  ¯\_(ツ)_/¯

        hook.wrap("request", auth.hook);
        this.auth = auth;
      }
    } else {
      const {
        authStrategy
      } = options,
            otherOptions = _objectWithoutProperties(options, _excluded);

      const auth = authStrategy(Object.assign({
        request: this.request,
        log: this.log,
        // we pass the current octokit instance as well as its constructor options
        // to allow for authentication strategies that return a new octokit instance
        // that shares the same internal state as the current one. The original
        // requirement for this was the "event-octokit" authentication strategy
        // of https://github.com/probot/octokit-auth-probot.
        octokit: this,
        octokitOptions: otherOptions
      }, options.auth)); // @ts-ignore  ¯\_(ツ)_/¯

      hook.wrap("request", auth.hook);
      this.auth = auth;
    } // apply plugins
    // https://stackoverflow.com/a/16345172


    const classConstructor = this.constructor;
    classConstructor.plugins.forEach(plugin => {
      Object.assign(this, plugin(this, options));
    });
  }

  static defaults(defaults) {
    const OctokitWithDefaults = class extends this {
      constructor(...args) {
        const options = args[0] || {};

        if (typeof defaults === "function") {
          super(defaults(options));
          return;
        }

        super(Object.assign({}, defaults, options, options.userAgent && defaults.userAgent ? {
          userAgent: `${options.userAgent} ${defaults.userAgent}`
        } : null));
      }

    };
    return OctokitWithDefaults;
  }
  /**
   * Attach a plugin (or many) to your Octokit instance.
   *
   * @example
   * const API = Octokit.plugin(plugin1, plugin2, plugin3, ...)
   */


  static plugin(...newPlugins) {
    var _a;

    const currentPlugins = this.plugins;
    const NewOctokit = (_a = class extends this {}, _a.plugins = currentPlugins.concat(newPlugins.filter(plugin => !currentPlugins.includes(plugin))), _a);
    return NewOctokit;
  }

}
Octokit.VERSION = VERSION;
Octokit.plugins = [];

exports.Octokit = Octokit;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 9440:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var isPlainObject = __webpack_require__(3287);
var universalUserAgent = __webpack_require__(5030);

function lowercaseKeys(object) {
  if (!object) {
    return {};
  }

  return Object.keys(object).reduce((newObj, key) => {
    newObj[key.toLowerCase()] = object[key];
    return newObj;
  }, {});
}

function mergeDeep(defaults, options) {
  const result = Object.assign({}, defaults);
  Object.keys(options).forEach(key => {
    if (isPlainObject.isPlainObject(options[key])) {
      if (!(key in defaults)) Object.assign(result, {
        [key]: options[key]
      });else result[key] = mergeDeep(defaults[key], options[key]);
    } else {
      Object.assign(result, {
        [key]: options[key]
      });
    }
  });
  return result;
}

function removeUndefinedProperties(obj) {
  for (const key in obj) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }

  return obj;
}

function merge(defaults, route, options) {
  if (typeof route === "string") {
    let [method, url] = route.split(" ");
    options = Object.assign(url ? {
      method,
      url
    } : {
      url: method
    }, options);
  } else {
    options = Object.assign({}, route);
  } // lowercase header names before merging with defaults to avoid duplicates


  options.headers = lowercaseKeys(options.headers); // remove properties with undefined values before merging

  removeUndefinedProperties(options);
  removeUndefinedProperties(options.headers);
  const mergedOptions = mergeDeep(defaults || {}, options); // mediaType.previews arrays are merged, instead of overwritten

  if (defaults && defaults.mediaType.previews.length) {
    mergedOptions.mediaType.previews = defaults.mediaType.previews.filter(preview => !mergedOptions.mediaType.previews.includes(preview)).concat(mergedOptions.mediaType.previews);
  }

  mergedOptions.mediaType.previews = mergedOptions.mediaType.previews.map(preview => preview.replace(/-preview/, ""));
  return mergedOptions;
}

function addQueryParameters(url, parameters) {
  const separator = /\?/.test(url) ? "&" : "?";
  const names = Object.keys(parameters);

  if (names.length === 0) {
    return url;
  }

  return url + separator + names.map(name => {
    if (name === "q") {
      return "q=" + parameters.q.split("+").map(encodeURIComponent).join("+");
    }

    return `${name}=${encodeURIComponent(parameters[name])}`;
  }).join("&");
}

const urlVariableRegex = /\{[^}]+\}/g;

function removeNonChars(variableName) {
  return variableName.replace(/^\W+|\W+$/g, "").split(/,/);
}

function extractUrlVariableNames(url) {
  const matches = url.match(urlVariableRegex);

  if (!matches) {
    return [];
  }

  return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
}

function omit(object, keysToOmit) {
  return Object.keys(object).filter(option => !keysToOmit.includes(option)).reduce((obj, key) => {
    obj[key] = object[key];
    return obj;
  }, {});
}

// Based on https://github.com/bramstein/url-template, licensed under BSD
// TODO: create separate package.
//
// Copyright (c) 2012-2014, Bram Stein
// All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//  1. Redistributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in the
//     documentation and/or other materials provided with the distribution.
//  3. The name of the author may not be used to endorse or promote products
//     derived from this software without specific prior written permission.
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

/* istanbul ignore file */
function encodeReserved(str) {
  return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
    if (!/%[0-9A-Fa-f]/.test(part)) {
      part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
    }

    return part;
  }).join("");
}

function encodeUnreserved(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}

function encodeValue(operator, value, key) {
  value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);

  if (key) {
    return encodeUnreserved(key) + "=" + value;
  } else {
    return value;
  }
}

function isDefined(value) {
  return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
  return operator === ";" || operator === "&" || operator === "?";
}

function getValues(context, operator, key, modifier) {
  var value = context[key],
      result = [];

  if (isDefined(value) && value !== "") {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      value = value.toString();

      if (modifier && modifier !== "*") {
        value = value.substring(0, parseInt(modifier, 10));
      }

      result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
    } else {
      if (modifier === "*") {
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value) {
            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
          });
        } else {
          Object.keys(value).forEach(function (k) {
            if (isDefined(value[k])) {
              result.push(encodeValue(operator, value[k], k));
            }
          });
        }
      } else {
        const tmp = [];

        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function (value) {
            tmp.push(encodeValue(operator, value));
          });
        } else {
          Object.keys(value).forEach(function (k) {
            if (isDefined(value[k])) {
              tmp.push(encodeUnreserved(k));
              tmp.push(encodeValue(operator, value[k].toString()));
            }
          });
        }

        if (isKeyOperator(operator)) {
          result.push(encodeUnreserved(key) + "=" + tmp.join(","));
        } else if (tmp.length !== 0) {
          result.push(tmp.join(","));
        }
      }
    }
  } else {
    if (operator === ";") {
      if (isDefined(value)) {
        result.push(encodeUnreserved(key));
      }
    } else if (value === "" && (operator === "&" || operator === "?")) {
      result.push(encodeUnreserved(key) + "=");
    } else if (value === "") {
      result.push("");
    }
  }

  return result;
}

function parseUrl(template) {
  return {
    expand: expand.bind(null, template)
  };
}

function expand(template, context) {
  var operators = ["+", "#", ".", "/", ";", "?", "&"];
  return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
    if (expression) {
      let operator = "";
      const values = [];

      if (operators.indexOf(expression.charAt(0)) !== -1) {
        operator = expression.charAt(0);
        expression = expression.substr(1);
      }

      expression.split(/,/g).forEach(function (variable) {
        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
        values.push(getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
      });

      if (operator && operator !== "+") {
        var separator = ",";

        if (operator === "?") {
          separator = "&";
        } else if (operator !== "#") {
          separator = operator;
        }

        return (values.length !== 0 ? operator : "") + values.join(separator);
      } else {
        return values.join(",");
      }
    } else {
      return encodeReserved(literal);
    }
  });
}

function parse(options) {
  // https://fetch.spec.whatwg.org/#methods
  let method = options.method.toUpperCase(); // replace :varname with {varname} to make it RFC 6570 compatible

  let url = (options.url || "/").replace(/:([a-z]\w+)/g, "{$1}");
  let headers = Object.assign({}, options.headers);
  let body;
  let parameters = omit(options, ["method", "baseUrl", "url", "headers", "request", "mediaType"]); // extract variable names from URL to calculate remaining variables later

  const urlVariableNames = extractUrlVariableNames(url);
  url = parseUrl(url).expand(parameters);

  if (!/^http/.test(url)) {
    url = options.baseUrl + url;
  }

  const omittedParameters = Object.keys(options).filter(option => urlVariableNames.includes(option)).concat("baseUrl");
  const remainingParameters = omit(parameters, omittedParameters);
  const isBinaryRequest = /application\/octet-stream/i.test(headers.accept);

  if (!isBinaryRequest) {
    if (options.mediaType.format) {
      // e.g. application/vnd.github.v3+json => application/vnd.github.v3.raw
      headers.accept = headers.accept.split(/,/).map(preview => preview.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/, `application/vnd$1$2.${options.mediaType.format}`)).join(",");
    }

    if (options.mediaType.previews.length) {
      const previewsFromAcceptHeader = headers.accept.match(/[\w-]+(?=-preview)/g) || [];
      headers.accept = previewsFromAcceptHeader.concat(options.mediaType.previews).map(preview => {
        const format = options.mediaType.format ? `.${options.mediaType.format}` : "+json";
        return `application/vnd.github.${preview}-preview${format}`;
      }).join(",");
    }
  } // for GET/HEAD requests, set URL query parameters from remaining parameters
  // for PATCH/POST/PUT/DELETE requests, set request body from remaining parameters


  if (["GET", "HEAD"].includes(method)) {
    url = addQueryParameters(url, remainingParameters);
  } else {
    if ("data" in remainingParameters) {
      body = remainingParameters.data;
    } else {
      if (Object.keys(remainingParameters).length) {
        body = remainingParameters;
      } else {
        headers["content-length"] = 0;
      }
    }
  } // default content-type for JSON if body is set


  if (!headers["content-type"] && typeof body !== "undefined") {
    headers["content-type"] = "application/json; charset=utf-8";
  } // GitHub expects 'content-length: 0' header for PUT/PATCH requests without body.
  // fetch does not allow to set `content-length` header, but we can set body to an empty string


  if (["PATCH", "PUT"].includes(method) && typeof body === "undefined") {
    body = "";
  } // Only return body/request keys if present


  return Object.assign({
    method,
    url,
    headers
  }, typeof body !== "undefined" ? {
    body
  } : null, options.request ? {
    request: options.request
  } : null);
}

function endpointWithDefaults(defaults, route, options) {
  return parse(merge(defaults, route, options));
}

function withDefaults(oldDefaults, newDefaults) {
  const DEFAULTS = merge(oldDefaults, newDefaults);
  const endpoint = endpointWithDefaults.bind(null, DEFAULTS);
  return Object.assign(endpoint, {
    DEFAULTS,
    defaults: withDefaults.bind(null, DEFAULTS),
    merge: merge.bind(null, DEFAULTS),
    parse
  });
}

const VERSION = "6.0.12";

const userAgent = `octokit-endpoint.js/${VERSION} ${universalUserAgent.getUserAgent()}`; // DEFAULTS has all properties set that EndpointOptions has, except url.
// So we use RequestParameters and add method as additional required property.

const DEFAULTS = {
  method: "GET",
  baseUrl: "https://api.github.com",
  headers: {
    accept: "application/vnd.github.v3+json",
    "user-agent": userAgent
  },
  mediaType: {
    format: "",
    previews: []
  }
};

const endpoint = withDefaults(null, DEFAULTS);

exports.endpoint = endpoint;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 8467:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

var request = __webpack_require__(6234);
var universalUserAgent = __webpack_require__(5030);

const VERSION = "4.8.0";

function _buildMessageForResponseErrors(data) {
  return `Request failed due to following response errors:\n` + data.errors.map(e => ` - ${e.message}`).join("\n");
}

class GraphqlResponseError extends Error {
  constructor(request, headers, response) {
    super(_buildMessageForResponseErrors(response));
    this.request = request;
    this.headers = headers;
    this.response = response;
    this.name = "GraphqlResponseError"; // Expose the errors and response data in their shorthand properties.

    this.errors = response.errors;
    this.data = response.data; // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

}

const NON_VARIABLE_OPTIONS = ["method", "baseUrl", "url", "headers", "request", "query", "mediaType"];
const FORBIDDEN_VARIABLE_OPTIONS = ["query", "method", "url"];
const GHES_V3_SUFFIX_REGEX = /\/api\/v3\/?$/;
function graphql(request, query, options) {
  if (options) {
    if (typeof query === "string" && "query" in options) {
      return Promise.reject(new Error(`[@octokit/graphql] "query" cannot be used as variable name`));
    }

    for (const key in options) {
      if (!FORBIDDEN_VARIABLE_OPTIONS.includes(key)) continue;
      return Promise.reject(new Error(`[@octokit/graphql] "${key}" cannot be used as variable name`));
    }
  }

  const parsedOptions = typeof query === "string" ? Object.assign({
    query
  }, options) : query;
  const requestOptions = Object.keys(parsedOptions).reduce((result, key) => {
    if (NON_VARIABLE_OPTIONS.includes(key)) {
      result[key] = parsedOptions[key];
      return result;
    }

    if (!result.variables) {
      result.variables = {};
    }

    result.variables[key] = parsedOptions[key];
    return result;
  }, {}); // workaround for GitHub Enterprise baseUrl set with /api/v3 suffix
  // https://github.com/octokit/auth-app.js/issues/111#issuecomment-657610451

  const baseUrl = parsedOptions.baseUrl || request.endpoint.DEFAULTS.baseUrl;

  if (GHES_V3_SUFFIX_REGEX.test(baseUrl)) {
    requestOptions.url = baseUrl.replace(GHES_V3_SUFFIX_REGEX, "/api/graphql");
  }

  return request(requestOptions).then(response => {
    if (response.data.errors) {
      const headers = {};

      for (const key of Object.keys(response.headers)) {
        headers[key] = response.headers[key];
      }

      throw new GraphqlResponseError(requestOptions, headers, response.data);
    }

    return response.data.data;
  });
}

function withDefaults(request$1, newDefaults) {
  const newRequest = request$1.defaults(newDefaults);

  const newApi = (query, options) => {
    return graphql(newRequest, query, options);
  };

  return Object.assign(newApi, {
    defaults: withDefaults.bind(null, newRequest),
    endpoint: request.request.endpoint
  });
}

const graphql$1 = withDefaults(request.request, {
  headers: {
    "user-agent": `octokit-graphql.js/${VERSION} ${universalUserAgent.getUserAgent()}`
  },
  method: "POST",
  url: "/graphql"
});
function withCustomRequest(customRequest) {
  return withDefaults(customRequest, {
    method: "POST",
    url: "/graphql"
  });
}

exports.GraphqlResponseError = GraphqlResponseError;
exports.graphql = graphql$1;
exports.withCustomRequest = withCustomRequest;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 4193:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

const VERSION = "2.17.0";

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/**
 * Some “list” response that can be paginated have a different response structure
 *
 * They have a `total_count` key in the response (search also has `incomplete_results`,
 * /installation/repositories also has `repository_selection`), as well as a key with
 * the list of the items which name varies from endpoint to endpoint.
 *
 * Octokit normalizes these responses so that paginated results are always returned following
 * the same structure. One challenge is that if the list response has only one page, no Link
 * header is provided, so this header alone is not sufficient to check wether a response is
 * paginated or not.
 *
 * We check if a "total_count" key is present in the response data, but also make sure that
 * a "url" property is not, as the "Get the combined status for a specific ref" endpoint would
 * otherwise match: https://developer.github.com/v3/repos/statuses/#get-the-combined-status-for-a-specific-ref
 */
function normalizePaginatedListResponse(response) {
  // endpoints can respond with 204 if repository is empty
  if (!response.data) {
    return _objectSpread2(_objectSpread2({}, response), {}, {
      data: []
    });
  }

  const responseNeedsNormalization = "total_count" in response.data && !("url" in response.data);
  if (!responseNeedsNormalization) return response; // keep the additional properties intact as there is currently no other way
  // to retrieve the same information.

  const incompleteResults = response.data.incomplete_results;
  const repositorySelection = response.data.repository_selection;
  const totalCount = response.data.total_count;
  delete response.data.incomplete_results;
  delete response.data.repository_selection;
  delete response.data.total_count;
  const namespaceKey = Object.keys(response.data)[0];
  const data = response.data[namespaceKey];
  response.data = data;

  if (typeof incompleteResults !== "undefined") {
    response.data.incomplete_results = incompleteResults;
  }

  if (typeof repositorySelection !== "undefined") {
    response.data.repository_selection = repositorySelection;
  }

  response.data.total_count = totalCount;
  return response;
}

function iterator(octokit, route, parameters) {
  const options = typeof route === "function" ? route.endpoint(parameters) : octokit.request.endpoint(route, parameters);
  const requestMethod = typeof route === "function" ? route : octokit.request;
  const method = options.method;
  const headers = options.headers;
  let url = options.url;
  return {
    [Symbol.asyncIterator]: () => ({
      async next() {
        if (!url) return {
          done: true
        };

        try {
          const response = await requestMethod({
            method,
            url,
            headers
          });
          const normalizedResponse = normalizePaginatedListResponse(response); // `response.headers.link` format:
          // '<https://api.github.com/users/aseemk/followers?page=2>; rel="next", <https://api.github.com/users/aseemk/followers?page=2>; rel="last"'
          // sets `url` to undefined if "next" URL is not present or `link` header is not set

          url = ((normalizedResponse.headers.link || "").match(/<([^>]+)>;\s*rel="next"/) || [])[1];
          return {
            value: normalizedResponse
          };
        } catch (error) {
          if (error.status !== 409) throw error;
          url = "";
          return {
            value: {
              status: 200,
              headers: {},
              data: []
            }
          };
        }
      }

    })
  };
}

function paginate(octokit, route, parameters, mapFn) {
  if (typeof parameters === "function") {
    mapFn = parameters;
    parameters = undefined;
  }

  return gather(octokit, [], iterator(octokit, route, parameters)[Symbol.asyncIterator](), mapFn);
}

function gather(octokit, results, iterator, mapFn) {
  return iterator.next().then(result => {
    if (result.done) {
      return results;
    }

    let earlyExit = false;

    function done() {
      earlyExit = true;
    }

    results = results.concat(mapFn ? mapFn(result.value, done) : result.value.data);

    if (earlyExit) {
      return results;
    }

    return gather(octokit, results, iterator, mapFn);
  });
}

const composePaginateRest = Object.assign(paginate, {
  iterator
});

const paginatingEndpoints = ["GET /app/hook/deliveries", "GET /app/installations", "GET /applications/grants", "GET /authorizations", "GET /enterprises/{enterprise}/actions/permissions/organizations", "GET /enterprises/{enterprise}/actions/runner-groups", "GET /enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/organizations", "GET /enterprises/{enterprise}/actions/runner-groups/{runner_group_id}/runners", "GET /enterprises/{enterprise}/actions/runners", "GET /enterprises/{enterprise}/actions/runners/downloads", "GET /events", "GET /gists", "GET /gists/public", "GET /gists/starred", "GET /gists/{gist_id}/comments", "GET /gists/{gist_id}/commits", "GET /gists/{gist_id}/forks", "GET /installation/repositories", "GET /issues", "GET /marketplace_listing/plans", "GET /marketplace_listing/plans/{plan_id}/accounts", "GET /marketplace_listing/stubbed/plans", "GET /marketplace_listing/stubbed/plans/{plan_id}/accounts", "GET /networks/{owner}/{repo}/events", "GET /notifications", "GET /organizations", "GET /orgs/{org}/actions/permissions/repositories", "GET /orgs/{org}/actions/runner-groups", "GET /orgs/{org}/actions/runner-groups/{runner_group_id}/repositories", "GET /orgs/{org}/actions/runner-groups/{runner_group_id}/runners", "GET /orgs/{org}/actions/runners", "GET /orgs/{org}/actions/runners/downloads", "GET /orgs/{org}/actions/secrets", "GET /orgs/{org}/actions/secrets/{secret_name}/repositories", "GET /orgs/{org}/blocks", "GET /orgs/{org}/credential-authorizations", "GET /orgs/{org}/events", "GET /orgs/{org}/failed_invitations", "GET /orgs/{org}/hooks", "GET /orgs/{org}/hooks/{hook_id}/deliveries", "GET /orgs/{org}/installations", "GET /orgs/{org}/invitations", "GET /orgs/{org}/invitations/{invitation_id}/teams", "GET /orgs/{org}/issues", "GET /orgs/{org}/members", "GET /orgs/{org}/migrations", "GET /orgs/{org}/migrations/{migration_id}/repositories", "GET /orgs/{org}/outside_collaborators", "GET /orgs/{org}/packages", "GET /orgs/{org}/projects", "GET /orgs/{org}/public_members", "GET /orgs/{org}/repos", "GET /orgs/{org}/secret-scanning/alerts", "GET /orgs/{org}/team-sync/groups", "GET /orgs/{org}/teams", "GET /orgs/{org}/teams/{team_slug}/discussions", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", "GET /orgs/{org}/teams/{team_slug}/invitations", "GET /orgs/{org}/teams/{team_slug}/members", "GET /orgs/{org}/teams/{team_slug}/projects", "GET /orgs/{org}/teams/{team_slug}/repos", "GET /orgs/{org}/teams/{team_slug}/team-sync/group-mappings", "GET /orgs/{org}/teams/{team_slug}/teams", "GET /projects/columns/{column_id}/cards", "GET /projects/{project_id}/collaborators", "GET /projects/{project_id}/columns", "GET /repos/{owner}/{repo}/actions/artifacts", "GET /repos/{owner}/{repo}/actions/runners", "GET /repos/{owner}/{repo}/actions/runners/downloads", "GET /repos/{owner}/{repo}/actions/runs", "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts", "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs", "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs", "GET /repos/{owner}/{repo}/actions/secrets", "GET /repos/{owner}/{repo}/actions/workflows", "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs", "GET /repos/{owner}/{repo}/assignees", "GET /repos/{owner}/{repo}/autolinks", "GET /repos/{owner}/{repo}/branches", "GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations", "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs", "GET /repos/{owner}/{repo}/code-scanning/alerts", "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances", "GET /repos/{owner}/{repo}/code-scanning/analyses", "GET /repos/{owner}/{repo}/collaborators", "GET /repos/{owner}/{repo}/comments", "GET /repos/{owner}/{repo}/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/commits", "GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head", "GET /repos/{owner}/{repo}/commits/{commit_sha}/comments", "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", "GET /repos/{owner}/{repo}/commits/{ref}/check-runs", "GET /repos/{owner}/{repo}/commits/{ref}/check-suites", "GET /repos/{owner}/{repo}/commits/{ref}/statuses", "GET /repos/{owner}/{repo}/contributors", "GET /repos/{owner}/{repo}/deployments", "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses", "GET /repos/{owner}/{repo}/events", "GET /repos/{owner}/{repo}/forks", "GET /repos/{owner}/{repo}/git/matching-refs/{ref}", "GET /repos/{owner}/{repo}/hooks", "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries", "GET /repos/{owner}/{repo}/invitations", "GET /repos/{owner}/{repo}/issues", "GET /repos/{owner}/{repo}/issues/comments", "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/issues/events", "GET /repos/{owner}/{repo}/issues/{issue_number}/comments", "GET /repos/{owner}/{repo}/issues/{issue_number}/events", "GET /repos/{owner}/{repo}/issues/{issue_number}/labels", "GET /repos/{owner}/{repo}/issues/{issue_number}/reactions", "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline", "GET /repos/{owner}/{repo}/keys", "GET /repos/{owner}/{repo}/labels", "GET /repos/{owner}/{repo}/milestones", "GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels", "GET /repos/{owner}/{repo}/notifications", "GET /repos/{owner}/{repo}/pages/builds", "GET /repos/{owner}/{repo}/projects", "GET /repos/{owner}/{repo}/pulls", "GET /repos/{owner}/{repo}/pulls/comments", "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments", "GET /repos/{owner}/{repo}/pulls/{pull_number}/commits", "GET /repos/{owner}/{repo}/pulls/{pull_number}/files", "GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers", "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews", "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments", "GET /repos/{owner}/{repo}/releases", "GET /repos/{owner}/{repo}/releases/{release_id}/assets", "GET /repos/{owner}/{repo}/secret-scanning/alerts", "GET /repos/{owner}/{repo}/stargazers", "GET /repos/{owner}/{repo}/subscribers", "GET /repos/{owner}/{repo}/tags", "GET /repos/{owner}/{repo}/teams", "GET /repositories", "GET /repositories/{repository_id}/environments/{environment_name}/secrets", "GET /scim/v2/enterprises/{enterprise}/Groups", "GET /scim/v2/enterprises/{enterprise}/Users", "GET /scim/v2/organizations/{org}/Users", "GET /search/code", "GET /search/commits", "GET /search/issues", "GET /search/labels", "GET /search/repositories", "GET /search/topics", "GET /search/users", "GET /teams/{team_id}/discussions", "GET /teams/{team_id}/discussions/{discussion_number}/comments", "GET /teams/{team_id}/discussions/{discussion_number}/comments/{comment_number}/reactions", "GET /teams/{team_id}/discussions/{discussion_number}/reactions", "GET /teams/{team_id}/invitations", "GET /teams/{team_id}/members", "GET /teams/{team_id}/projects", "GET /teams/{team_id}/repos", "GET /teams/{team_id}/team-sync/group-mappings", "GET /teams/{team_id}/teams", "GET /user/blocks", "GET /user/emails", "GET /user/followers", "GET /user/following", "GET /user/gpg_keys", "GET /user/installations", "GET /user/installations/{installation_id}/repositories", "GET /user/issues", "GET /user/keys", "GET /user/marketplace_purchases", "GET /user/marketplace_purchases/stubbed", "GET /user/memberships/orgs", "GET /user/migrations", "GET /user/migrations/{migration_id}/repositories", "GET /user/orgs", "GET /user/packages", "GET /user/public_emails", "GET /user/repos", "GET /user/repository_invitations", "GET /user/starred", "GET /user/subscriptions", "GET /user/teams", "GET /users", "GET /users/{username}/events", "GET /users/{username}/events/orgs/{org}", "GET /users/{username}/events/public", "GET /users/{username}/followers", "GET /users/{username}/following", "GET /users/{username}/gists", "GET /users/{username}/gpg_keys", "GET /users/{username}/keys", "GET /users/{username}/orgs", "GET /users/{username}/packages", "GET /users/{username}/projects", "GET /users/{username}/received_events", "GET /users/{username}/received_events/public", "GET /users/{username}/repos", "GET /users/{username}/starred", "GET /users/{username}/subscriptions"];

function isPaginatingEndpoint(arg) {
  if (typeof arg === "string") {
    return paginatingEndpoints.includes(arg);
  } else {
    return false;
  }
}

/**
 * @param octokit Octokit instance
 * @param options Options passed to Octokit constructor
 */

function paginateRest(octokit) {
  return {
    paginate: Object.assign(paginate.bind(null, octokit), {
      iterator: iterator.bind(null, octokit)
    })
  };
}
paginateRest.VERSION = VERSION;

exports.composePaginateRest = composePaginateRest;
exports.isPaginatingEndpoint = isPaginatingEndpoint;
exports.paginateRest = paginateRest;
exports.paginatingEndpoints = paginatingEndpoints;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 3044:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

const Endpoints = {
  actions: {
    addSelectedRepoToOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
    cancelWorkflowRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel"],
    createOrUpdateEnvironmentSecret: ["PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    createOrUpdateOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}"],
    createOrUpdateRepoSecret: ["PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    createRegistrationTokenForOrg: ["POST /orgs/{org}/actions/runners/registration-token"],
    createRegistrationTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/registration-token"],
    createRemoveTokenForOrg: ["POST /orgs/{org}/actions/runners/remove-token"],
    createRemoveTokenForRepo: ["POST /repos/{owner}/{repo}/actions/runners/remove-token"],
    createWorkflowDispatch: ["POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches"],
    deleteArtifact: ["DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    deleteEnvironmentSecret: ["DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    deleteOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}"],
    deleteRepoSecret: ["DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    deleteSelfHostedRunnerFromOrg: ["DELETE /orgs/{org}/actions/runners/{runner_id}"],
    deleteSelfHostedRunnerFromRepo: ["DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}"],
    deleteWorkflowRun: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}"],
    deleteWorkflowRunLogs: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
    disableSelectedRepositoryGithubActionsOrganization: ["DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}"],
    disableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable"],
    downloadArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}"],
    downloadJobLogsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs"],
    downloadWorkflowRunLogs: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs"],
    enableSelectedRepositoryGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories/{repository_id}"],
    enableWorkflow: ["PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable"],
    getAllowedActionsOrganization: ["GET /orgs/{org}/actions/permissions/selected-actions"],
    getAllowedActionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions/selected-actions"],
    getArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    getEnvironmentPublicKey: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key"],
    getEnvironmentSecret: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"],
    getGithubActionsPermissionsOrganization: ["GET /orgs/{org}/actions/permissions"],
    getGithubActionsPermissionsRepository: ["GET /repos/{owner}/{repo}/actions/permissions"],
    getJobForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}"],
    getOrgPublicKey: ["GET /orgs/{org}/actions/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}"],
    getPendingDeploymentsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
    getRepoPermissions: ["GET /repos/{owner}/{repo}/actions/permissions", {}, {
      renamed: ["actions", "getGithubActionsPermissionsRepository"]
    }],
    getRepoPublicKey: ["GET /repos/{owner}/{repo}/actions/secrets/public-key"],
    getRepoSecret: ["GET /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    getReviewsForRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals"],
    getSelfHostedRunnerForOrg: ["GET /orgs/{org}/actions/runners/{runner_id}"],
    getSelfHostedRunnerForRepo: ["GET /repos/{owner}/{repo}/actions/runners/{runner_id}"],
    getWorkflow: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}"],
    getWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}"],
    getWorkflowRunUsage: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing"],
    getWorkflowUsage: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing"],
    listArtifactsForRepo: ["GET /repos/{owner}/{repo}/actions/artifacts"],
    listEnvironmentSecrets: ["GET /repositories/{repository_id}/environments/{environment_name}/secrets"],
    listJobsForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs"],
    listOrgSecrets: ["GET /orgs/{org}/actions/secrets"],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/actions/secrets"],
    listRepoWorkflows: ["GET /repos/{owner}/{repo}/actions/workflows"],
    listRunnerApplicationsForOrg: ["GET /orgs/{org}/actions/runners/downloads"],
    listRunnerApplicationsForRepo: ["GET /repos/{owner}/{repo}/actions/runners/downloads"],
    listSelectedReposForOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}/repositories"],
    listSelectedRepositoriesEnabledGithubActionsOrganization: ["GET /orgs/{org}/actions/permissions/repositories"],
    listSelfHostedRunnersForOrg: ["GET /orgs/{org}/actions/runners"],
    listSelfHostedRunnersForRepo: ["GET /repos/{owner}/{repo}/actions/runners"],
    listWorkflowRunArtifacts: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts"],
    listWorkflowRuns: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs"],
    listWorkflowRunsForRepo: ["GET /repos/{owner}/{repo}/actions/runs"],
    reRunWorkflow: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun"],
    removeSelectedRepoFromOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"],
    reviewPendingDeploymentsForRun: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"],
    setAllowedActionsOrganization: ["PUT /orgs/{org}/actions/permissions/selected-actions"],
    setAllowedActionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions/selected-actions"],
    setGithubActionsPermissionsOrganization: ["PUT /orgs/{org}/actions/permissions"],
    setGithubActionsPermissionsRepository: ["PUT /repos/{owner}/{repo}/actions/permissions"],
    setSelectedReposForOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}/repositories"],
    setSelectedRepositoriesEnabledGithubActionsOrganization: ["PUT /orgs/{org}/actions/permissions/repositories"]
  },
  activity: {
    checkRepoIsStarredByAuthenticatedUser: ["GET /user/starred/{owner}/{repo}"],
    deleteRepoSubscription: ["DELETE /repos/{owner}/{repo}/subscription"],
    deleteThreadSubscription: ["DELETE /notifications/threads/{thread_id}/subscription"],
    getFeeds: ["GET /feeds"],
    getRepoSubscription: ["GET /repos/{owner}/{repo}/subscription"],
    getThread: ["GET /notifications/threads/{thread_id}"],
    getThreadSubscriptionForAuthenticatedUser: ["GET /notifications/threads/{thread_id}/subscription"],
    listEventsForAuthenticatedUser: ["GET /users/{username}/events"],
    listNotificationsForAuthenticatedUser: ["GET /notifications"],
    listOrgEventsForAuthenticatedUser: ["GET /users/{username}/events/orgs/{org}"],
    listPublicEvents: ["GET /events"],
    listPublicEventsForRepoNetwork: ["GET /networks/{owner}/{repo}/events"],
    listPublicEventsForUser: ["GET /users/{username}/events/public"],
    listPublicOrgEvents: ["GET /orgs/{org}/events"],
    listReceivedEventsForUser: ["GET /users/{username}/received_events"],
    listReceivedPublicEventsForUser: ["GET /users/{username}/received_events/public"],
    listRepoEvents: ["GET /repos/{owner}/{repo}/events"],
    listRepoNotificationsForAuthenticatedUser: ["GET /repos/{owner}/{repo}/notifications"],
    listReposStarredByAuthenticatedUser: ["GET /user/starred"],
    listReposStarredByUser: ["GET /users/{username}/starred"],
    listReposWatchedByUser: ["GET /users/{username}/subscriptions"],
    listStargazersForRepo: ["GET /repos/{owner}/{repo}/stargazers"],
    listWatchedReposForAuthenticatedUser: ["GET /user/subscriptions"],
    listWatchersForRepo: ["GET /repos/{owner}/{repo}/subscribers"],
    markNotificationsAsRead: ["PUT /notifications"],
    markRepoNotificationsAsRead: ["PUT /repos/{owner}/{repo}/notifications"],
    markThreadAsRead: ["PATCH /notifications/threads/{thread_id}"],
    setRepoSubscription: ["PUT /repos/{owner}/{repo}/subscription"],
    setThreadSubscription: ["PUT /notifications/threads/{thread_id}/subscription"],
    starRepoForAuthenticatedUser: ["PUT /user/starred/{owner}/{repo}"],
    unstarRepoForAuthenticatedUser: ["DELETE /user/starred/{owner}/{repo}"]
  },
  apps: {
    addRepoToInstallation: ["PUT /user/installations/{installation_id}/repositories/{repository_id}"],
    checkToken: ["POST /applications/{client_id}/token"],
    createContentAttachment: ["POST /content_references/{content_reference_id}/attachments", {
      mediaType: {
        previews: ["corsair"]
      }
    }],
    createFromManifest: ["POST /app-manifests/{code}/conversions"],
    createInstallationAccessToken: ["POST /app/installations/{installation_id}/access_tokens"],
    deleteAuthorization: ["DELETE /applications/{client_id}/grant"],
    deleteInstallation: ["DELETE /app/installations/{installation_id}"],
    deleteToken: ["DELETE /applications/{client_id}/token"],
    getAuthenticated: ["GET /app"],
    getBySlug: ["GET /apps/{app_slug}"],
    getInstallation: ["GET /app/installations/{installation_id}"],
    getOrgInstallation: ["GET /orgs/{org}/installation"],
    getRepoInstallation: ["GET /repos/{owner}/{repo}/installation"],
    getSubscriptionPlanForAccount: ["GET /marketplace_listing/accounts/{account_id}"],
    getSubscriptionPlanForAccountStubbed: ["GET /marketplace_listing/stubbed/accounts/{account_id}"],
    getUserInstallation: ["GET /users/{username}/installation"],
    getWebhookConfigForApp: ["GET /app/hook/config"],
    listAccountsForPlan: ["GET /marketplace_listing/plans/{plan_id}/accounts"],
    listAccountsForPlanStubbed: ["GET /marketplace_listing/stubbed/plans/{plan_id}/accounts"],
    listInstallationReposForAuthenticatedUser: ["GET /user/installations/{installation_id}/repositories"],
    listInstallations: ["GET /app/installations"],
    listInstallationsForAuthenticatedUser: ["GET /user/installations"],
    listPlans: ["GET /marketplace_listing/plans"],
    listPlansStubbed: ["GET /marketplace_listing/stubbed/plans"],
    listReposAccessibleToInstallation: ["GET /installation/repositories"],
    listSubscriptionsForAuthenticatedUser: ["GET /user/marketplace_purchases"],
    listSubscriptionsForAuthenticatedUserStubbed: ["GET /user/marketplace_purchases/stubbed"],
    removeRepoFromInstallation: ["DELETE /user/installations/{installation_id}/repositories/{repository_id}"],
    resetToken: ["PATCH /applications/{client_id}/token"],
    revokeInstallationAccessToken: ["DELETE /installation/token"],
    scopeToken: ["POST /applications/{client_id}/token/scoped"],
    suspendInstallation: ["PUT /app/installations/{installation_id}/suspended"],
    unsuspendInstallation: ["DELETE /app/installations/{installation_id}/suspended"],
    updateWebhookConfigForApp: ["PATCH /app/hook/config"]
  },
  billing: {
    getGithubActionsBillingOrg: ["GET /orgs/{org}/settings/billing/actions"],
    getGithubActionsBillingUser: ["GET /users/{username}/settings/billing/actions"],
    getGithubPackagesBillingOrg: ["GET /orgs/{org}/settings/billing/packages"],
    getGithubPackagesBillingUser: ["GET /users/{username}/settings/billing/packages"],
    getSharedStorageBillingOrg: ["GET /orgs/{org}/settings/billing/shared-storage"],
    getSharedStorageBillingUser: ["GET /users/{username}/settings/billing/shared-storage"]
  },
  checks: {
    create: ["POST /repos/{owner}/{repo}/check-runs"],
    createSuite: ["POST /repos/{owner}/{repo}/check-suites"],
    get: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}"],
    getSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}"],
    listAnnotations: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations"],
    listForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-runs"],
    listForSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs"],
    listSuitesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-suites"],
    rerequestSuite: ["POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest"],
    setSuitesPreferences: ["PATCH /repos/{owner}/{repo}/check-suites/preferences"],
    update: ["PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}"]
  },
  codeScanning: {
    deleteAnalysis: ["DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}"],
    getAlert: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}", {}, {
      renamedParameters: {
        alert_id: "alert_number"
      }
    }],
    getAnalysis: ["GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}"],
    getSarif: ["GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/code-scanning/alerts"],
    listAlertsInstances: ["GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances"],
    listRecentAnalyses: ["GET /repos/{owner}/{repo}/code-scanning/analyses"],
    updateAlert: ["PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}"],
    uploadSarif: ["POST /repos/{owner}/{repo}/code-scanning/sarifs"]
  },
  codesOfConduct: {
    getAllCodesOfConduct: ["GET /codes_of_conduct", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }],
    getConductCode: ["GET /codes_of_conduct/{key}", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }],
    getForRepo: ["GET /repos/{owner}/{repo}/community/code_of_conduct", {
      mediaType: {
        previews: ["scarlet-witch"]
      }
    }]
  },
  emojis: {
    get: ["GET /emojis"]
  },
  enterpriseAdmin: {
    disableSelectedOrganizationGithubActionsEnterprise: ["DELETE /enterprises/{enterprise}/actions/permissions/organizations/{org_id}"],
    enableSelectedOrganizationGithubActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/organizations/{org_id}"],
    getAllowedActionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions/selected-actions"],
    getGithubActionsPermissionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions"],
    listSelectedOrganizationsEnabledGithubActionsEnterprise: ["GET /enterprises/{enterprise}/actions/permissions/organizations"],
    setAllowedActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/selected-actions"],
    setGithubActionsPermissionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions"],
    setSelectedOrganizationsEnabledGithubActionsEnterprise: ["PUT /enterprises/{enterprise}/actions/permissions/organizations"]
  },
  gists: {
    checkIsStarred: ["GET /gists/{gist_id}/star"],
    create: ["POST /gists"],
    createComment: ["POST /gists/{gist_id}/comments"],
    delete: ["DELETE /gists/{gist_id}"],
    deleteComment: ["DELETE /gists/{gist_id}/comments/{comment_id}"],
    fork: ["POST /gists/{gist_id}/forks"],
    get: ["GET /gists/{gist_id}"],
    getComment: ["GET /gists/{gist_id}/comments/{comment_id}"],
    getRevision: ["GET /gists/{gist_id}/{sha}"],
    list: ["GET /gists"],
    listComments: ["GET /gists/{gist_id}/comments"],
    listCommits: ["GET /gists/{gist_id}/commits"],
    listForUser: ["GET /users/{username}/gists"],
    listForks: ["GET /gists/{gist_id}/forks"],
    listPublic: ["GET /gists/public"],
    listStarred: ["GET /gists/starred"],
    star: ["PUT /gists/{gist_id}/star"],
    unstar: ["DELETE /gists/{gist_id}/star"],
    update: ["PATCH /gists/{gist_id}"],
    updateComment: ["PATCH /gists/{gist_id}/comments/{comment_id}"]
  },
  git: {
    createBlob: ["POST /repos/{owner}/{repo}/git/blobs"],
    createCommit: ["POST /repos/{owner}/{repo}/git/commits"],
    createRef: ["POST /repos/{owner}/{repo}/git/refs"],
    createTag: ["POST /repos/{owner}/{repo}/git/tags"],
    createTree: ["POST /repos/{owner}/{repo}/git/trees"],
    deleteRef: ["DELETE /repos/{owner}/{repo}/git/refs/{ref}"],
    getBlob: ["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"],
    getCommit: ["GET /repos/{owner}/{repo}/git/commits/{commit_sha}"],
    getRef: ["GET /repos/{owner}/{repo}/git/ref/{ref}"],
    getTag: ["GET /repos/{owner}/{repo}/git/tags/{tag_sha}"],
    getTree: ["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"],
    listMatchingRefs: ["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"],
    updateRef: ["PATCH /repos/{owner}/{repo}/git/refs/{ref}"]
  },
  gitignore: {
    getAllTemplates: ["GET /gitignore/templates"],
    getTemplate: ["GET /gitignore/templates/{name}"]
  },
  interactions: {
    getRestrictionsForAuthenticatedUser: ["GET /user/interaction-limits"],
    getRestrictionsForOrg: ["GET /orgs/{org}/interaction-limits"],
    getRestrictionsForRepo: ["GET /repos/{owner}/{repo}/interaction-limits"],
    getRestrictionsForYourPublicRepos: ["GET /user/interaction-limits", {}, {
      renamed: ["interactions", "getRestrictionsForAuthenticatedUser"]
    }],
    removeRestrictionsForAuthenticatedUser: ["DELETE /user/interaction-limits"],
    removeRestrictionsForOrg: ["DELETE /orgs/{org}/interaction-limits"],
    removeRestrictionsForRepo: ["DELETE /repos/{owner}/{repo}/interaction-limits"],
    removeRestrictionsForYourPublicRepos: ["DELETE /user/interaction-limits", {}, {
      renamed: ["interactions", "removeRestrictionsForAuthenticatedUser"]
    }],
    setRestrictionsForAuthenticatedUser: ["PUT /user/interaction-limits"],
    setRestrictionsForOrg: ["PUT /orgs/{org}/interaction-limits"],
    setRestrictionsForRepo: ["PUT /repos/{owner}/{repo}/interaction-limits"],
    setRestrictionsForYourPublicRepos: ["PUT /user/interaction-limits", {}, {
      renamed: ["interactions", "setRestrictionsForAuthenticatedUser"]
    }]
  },
  issues: {
    addAssignees: ["POST /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
    addLabels: ["POST /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    checkUserCanBeAssigned: ["GET /repos/{owner}/{repo}/assignees/{assignee}"],
    create: ["POST /repos/{owner}/{repo}/issues"],
    createComment: ["POST /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    createLabel: ["POST /repos/{owner}/{repo}/labels"],
    createMilestone: ["POST /repos/{owner}/{repo}/milestones"],
    deleteComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    deleteLabel: ["DELETE /repos/{owner}/{repo}/labels/{name}"],
    deleteMilestone: ["DELETE /repos/{owner}/{repo}/milestones/{milestone_number}"],
    get: ["GET /repos/{owner}/{repo}/issues/{issue_number}"],
    getComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    getEvent: ["GET /repos/{owner}/{repo}/issues/events/{event_id}"],
    getLabel: ["GET /repos/{owner}/{repo}/labels/{name}"],
    getMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}"],
    list: ["GET /issues"],
    listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
    listComments: ["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    listCommentsForRepo: ["GET /repos/{owner}/{repo}/issues/comments"],
    listEvents: ["GET /repos/{owner}/{repo}/issues/{issue_number}/events"],
    listEventsForRepo: ["GET /repos/{owner}/{repo}/issues/events"],
    listEventsForTimeline: ["GET /repos/{owner}/{repo}/issues/{issue_number}/timeline", {
      mediaType: {
        previews: ["mockingbird"]
      }
    }],
    listForAuthenticatedUser: ["GET /user/issues"],
    listForOrg: ["GET /orgs/{org}/issues"],
    listForRepo: ["GET /repos/{owner}/{repo}/issues"],
    listLabelsForMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels"],
    listLabelsForRepo: ["GET /repos/{owner}/{repo}/labels"],
    listLabelsOnIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    listMilestones: ["GET /repos/{owner}/{repo}/milestones"],
    lock: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    removeAllLabels: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    removeAssignees: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees"],
    removeLabel: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}"],
    setLabels: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    unlock: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    update: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}"],
    updateComment: ["PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    updateLabel: ["PATCH /repos/{owner}/{repo}/labels/{name}"],
    updateMilestone: ["PATCH /repos/{owner}/{repo}/milestones/{milestone_number}"]
  },
  licenses: {
    get: ["GET /licenses/{license}"],
    getAllCommonlyUsed: ["GET /licenses"],
    getForRepo: ["GET /repos/{owner}/{repo}/license"]
  },
  markdown: {
    render: ["POST /markdown"],
    renderRaw: ["POST /markdown/raw", {
      headers: {
        "content-type": "text/plain; charset=utf-8"
      }
    }]
  },
  meta: {
    get: ["GET /meta"],
    getOctocat: ["GET /octocat"],
    getZen: ["GET /zen"],
    root: ["GET /"]
  },
  migrations: {
    cancelImport: ["DELETE /repos/{owner}/{repo}/import"],
    deleteArchiveForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    deleteArchiveForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    downloadArchiveForOrg: ["GET /orgs/{org}/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getArchiveForAuthenticatedUser: ["GET /user/migrations/{migration_id}/archive", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getCommitAuthors: ["GET /repos/{owner}/{repo}/import/authors"],
    getImportStatus: ["GET /repos/{owner}/{repo}/import"],
    getLargeFiles: ["GET /repos/{owner}/{repo}/import/large_files"],
    getStatusForAuthenticatedUser: ["GET /user/migrations/{migration_id}", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    getStatusForOrg: ["GET /orgs/{org}/migrations/{migration_id}", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listForAuthenticatedUser: ["GET /user/migrations", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listForOrg: ["GET /orgs/{org}/migrations", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listReposForOrg: ["GET /orgs/{org}/migrations/{migration_id}/repositories", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    listReposForUser: ["GET /user/migrations/{migration_id}/repositories", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    mapCommitAuthor: ["PATCH /repos/{owner}/{repo}/import/authors/{author_id}"],
    setLfsPreference: ["PATCH /repos/{owner}/{repo}/import/lfs"],
    startForAuthenticatedUser: ["POST /user/migrations"],
    startForOrg: ["POST /orgs/{org}/migrations"],
    startImport: ["PUT /repos/{owner}/{repo}/import"],
    unlockRepoForAuthenticatedUser: ["DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    unlockRepoForOrg: ["DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock", {
      mediaType: {
        previews: ["wyandotte"]
      }
    }],
    updateImport: ["PATCH /repos/{owner}/{repo}/import"]
  },
  orgs: {
    blockUser: ["PUT /orgs/{org}/blocks/{username}"],
    cancelInvitation: ["DELETE /orgs/{org}/invitations/{invitation_id}"],
    checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
    checkMembershipForUser: ["GET /orgs/{org}/members/{username}"],
    checkPublicMembershipForUser: ["GET /orgs/{org}/public_members/{username}"],
    convertMemberToOutsideCollaborator: ["PUT /orgs/{org}/outside_collaborators/{username}"],
    createInvitation: ["POST /orgs/{org}/invitations"],
    createWebhook: ["POST /orgs/{org}/hooks"],
    deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
    get: ["GET /orgs/{org}"],
    getMembershipForAuthenticatedUser: ["GET /user/memberships/orgs/{org}"],
    getMembershipForUser: ["GET /orgs/{org}/memberships/{username}"],
    getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
    getWebhookConfigForOrg: ["GET /orgs/{org}/hooks/{hook_id}/config"],
    list: ["GET /organizations"],
    listAppInstallations: ["GET /orgs/{org}/installations"],
    listBlockedUsers: ["GET /orgs/{org}/blocks"],
    listFailedInvitations: ["GET /orgs/{org}/failed_invitations"],
    listForAuthenticatedUser: ["GET /user/orgs"],
    listForUser: ["GET /users/{username}/orgs"],
    listInvitationTeams: ["GET /orgs/{org}/invitations/{invitation_id}/teams"],
    listMembers: ["GET /orgs/{org}/members"],
    listMembershipsForAuthenticatedUser: ["GET /user/memberships/orgs"],
    listOutsideCollaborators: ["GET /orgs/{org}/outside_collaborators"],
    listPendingInvitations: ["GET /orgs/{org}/invitations"],
    listPublicMembers: ["GET /orgs/{org}/public_members"],
    listWebhooks: ["GET /orgs/{org}/hooks"],
    pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
    removeMember: ["DELETE /orgs/{org}/members/{username}"],
    removeMembershipForUser: ["DELETE /orgs/{org}/memberships/{username}"],
    removeOutsideCollaborator: ["DELETE /orgs/{org}/outside_collaborators/{username}"],
    removePublicMembershipForAuthenticatedUser: ["DELETE /orgs/{org}/public_members/{username}"],
    setMembershipForUser: ["PUT /orgs/{org}/memberships/{username}"],
    setPublicMembershipForAuthenticatedUser: ["PUT /orgs/{org}/public_members/{username}"],
    unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
    update: ["PATCH /orgs/{org}"],
    updateMembershipForAuthenticatedUser: ["PATCH /user/memberships/orgs/{org}"],
    updateWebhook: ["PATCH /orgs/{org}/hooks/{hook_id}"],
    updateWebhookConfigForOrg: ["PATCH /orgs/{org}/hooks/{hook_id}/config"]
  },
  packages: {
    deletePackageForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}"],
    deletePackageForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}"],
    deletePackageVersionForAuthenticatedUser: ["DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    deletePackageVersionForOrg: ["DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getAllPackageVersionsForAPackageOwnedByAnOrg: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions", {}, {
      renamed: ["packages", "getAllPackageVersionsForPackageOwnedByOrg"]
    }],
    getAllPackageVersionsForAPackageOwnedByTheAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions", {}, {
      renamed: ["packages", "getAllPackageVersionsForPackageOwnedByAuthenticatedUser"]
    }],
    getAllPackageVersionsForPackageOwnedByAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions"],
    getAllPackageVersionsForPackageOwnedByOrg: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions"],
    getAllPackageVersionsForPackageOwnedByUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions"],
    getPackageForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}"],
    getPackageForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}"],
    getPackageForUser: ["GET /users/{username}/packages/{package_type}/{package_name}"],
    getPackageVersionForAuthenticatedUser: ["GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getPackageVersionForOrganization: ["GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    getPackageVersionForUser: ["GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"],
    restorePackageForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/restore{?token}"],
    restorePackageForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/restore{?token}"],
    restorePackageVersionForAuthenticatedUser: ["POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"],
    restorePackageVersionForOrg: ["POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"]
  },
  projects: {
    addCollaborator: ["PUT /projects/{project_id}/collaborators/{username}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createCard: ["POST /projects/columns/{column_id}/cards", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createColumn: ["POST /projects/{project_id}/columns", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForAuthenticatedUser: ["POST /user/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForOrg: ["POST /orgs/{org}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    createForRepo: ["POST /repos/{owner}/{repo}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    delete: ["DELETE /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    deleteCard: ["DELETE /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    deleteColumn: ["DELETE /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    get: ["GET /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getCard: ["GET /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getColumn: ["GET /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    getPermissionForUser: ["GET /projects/{project_id}/collaborators/{username}/permission", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listCards: ["GET /projects/columns/{column_id}/cards", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listCollaborators: ["GET /projects/{project_id}/collaborators", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listColumns: ["GET /projects/{project_id}/columns", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForOrg: ["GET /orgs/{org}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForRepo: ["GET /repos/{owner}/{repo}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listForUser: ["GET /users/{username}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    moveCard: ["POST /projects/columns/cards/{card_id}/moves", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    moveColumn: ["POST /projects/columns/{column_id}/moves", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    removeCollaborator: ["DELETE /projects/{project_id}/collaborators/{username}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    update: ["PATCH /projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    updateCard: ["PATCH /projects/columns/cards/{card_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    updateColumn: ["PATCH /projects/columns/{column_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }]
  },
  pulls: {
    checkIfMerged: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    create: ["POST /repos/{owner}/{repo}/pulls"],
    createReplyForReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies"],
    createReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    createReviewComment: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
    deletePendingReview: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    deleteReviewComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    dismissReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals"],
    get: ["GET /repos/{owner}/{repo}/pulls/{pull_number}"],
    getReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    getReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    list: ["GET /repos/{owner}/{repo}/pulls"],
    listCommentsForReview: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments"],
    listCommits: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"],
    listFiles: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/files"],
    listRequestedReviewers: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    listReviewComments: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/comments"],
    listReviewCommentsForRepo: ["GET /repos/{owner}/{repo}/pulls/comments"],
    listReviews: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    merge: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    removeRequestedReviewers: ["DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    requestReviewers: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"],
    submitReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events"],
    update: ["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"],
    updateBranch: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch", {
      mediaType: {
        previews: ["lydian"]
      }
    }],
    updateReview: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"],
    updateReviewComment: ["PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}"]
  },
  rateLimit: {
    get: ["GET /rate_limit"]
  },
  reactions: {
    createForCommitComment: ["POST /repos/{owner}/{repo}/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForIssue: ["POST /repos/{owner}/{repo}/issues/{issue_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForIssueComment: ["POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForPullRequestReviewComment: ["POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForTeamDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    createForTeamDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForIssue: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForIssueComment: ["DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForPullRequestComment: ["DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForTeamDiscussion: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteForTeamDiscussionComment: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    deleteLegacy: ["DELETE /reactions/{reaction_id}", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }, {
      deprecated: "octokit.rest.reactions.deleteLegacy() is deprecated, see https://docs.github.com/rest/reference/reactions/#delete-a-reaction-legacy"
    }],
    listForCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForIssueComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForPullRequestReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForTeamDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }],
    listForTeamDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions", {
      mediaType: {
        previews: ["squirrel-girl"]
      }
    }]
  },
  repos: {
    acceptInvitation: ["PATCH /user/repository_invitations/{invitation_id}"],
    addAppAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    addCollaborator: ["PUT /repos/{owner}/{repo}/collaborators/{username}"],
    addStatusCheckContexts: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    addTeamAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    addUserAccessRestrictions: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    checkCollaborator: ["GET /repos/{owner}/{repo}/collaborators/{username}"],
    checkVulnerabilityAlerts: ["GET /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    compareCommits: ["GET /repos/{owner}/{repo}/compare/{base}...{head}"],
    createCommitComment: ["POST /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
    createCommitSignatureProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    createCommitStatus: ["POST /repos/{owner}/{repo}/statuses/{sha}"],
    createDeployKey: ["POST /repos/{owner}/{repo}/keys"],
    createDeployment: ["POST /repos/{owner}/{repo}/deployments"],
    createDeploymentStatus: ["POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
    createDispatchEvent: ["POST /repos/{owner}/{repo}/dispatches"],
    createForAuthenticatedUser: ["POST /user/repos"],
    createFork: ["POST /repos/{owner}/{repo}/forks"],
    createInOrg: ["POST /orgs/{org}/repos"],
    createOrUpdateEnvironment: ["PUT /repos/{owner}/{repo}/environments/{environment_name}"],
    createOrUpdateFileContents: ["PUT /repos/{owner}/{repo}/contents/{path}"],
    createPagesSite: ["POST /repos/{owner}/{repo}/pages", {
      mediaType: {
        previews: ["switcheroo"]
      }
    }],
    createRelease: ["POST /repos/{owner}/{repo}/releases"],
    createUsingTemplate: ["POST /repos/{template_owner}/{template_repo}/generate", {
      mediaType: {
        previews: ["baptiste"]
      }
    }],
    createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
    declineInvitation: ["DELETE /user/repository_invitations/{invitation_id}"],
    delete: ["DELETE /repos/{owner}/{repo}"],
    deleteAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
    deleteAdminBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    deleteAnEnvironment: ["DELETE /repos/{owner}/{repo}/environments/{environment_name}"],
    deleteBranchProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection"],
    deleteCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}"],
    deleteCommitSignatureProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    deleteDeployKey: ["DELETE /repos/{owner}/{repo}/keys/{key_id}"],
    deleteDeployment: ["DELETE /repos/{owner}/{repo}/deployments/{deployment_id}"],
    deleteFile: ["DELETE /repos/{owner}/{repo}/contents/{path}"],
    deleteInvitation: ["DELETE /repos/{owner}/{repo}/invitations/{invitation_id}"],
    deletePagesSite: ["DELETE /repos/{owner}/{repo}/pages", {
      mediaType: {
        previews: ["switcheroo"]
      }
    }],
    deletePullRequestReviewProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    deleteRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}"],
    deleteReleaseAsset: ["DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    deleteWebhook: ["DELETE /repos/{owner}/{repo}/hooks/{hook_id}"],
    disableAutomatedSecurityFixes: ["DELETE /repos/{owner}/{repo}/automated-security-fixes", {
      mediaType: {
        previews: ["london"]
      }
    }],
    disableVulnerabilityAlerts: ["DELETE /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    downloadArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}", {}, {
      renamed: ["repos", "downloadZipballArchive"]
    }],
    downloadTarballArchive: ["GET /repos/{owner}/{repo}/tarball/{ref}"],
    downloadZipballArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}"],
    enableAutomatedSecurityFixes: ["PUT /repos/{owner}/{repo}/automated-security-fixes", {
      mediaType: {
        previews: ["london"]
      }
    }],
    enableVulnerabilityAlerts: ["PUT /repos/{owner}/{repo}/vulnerability-alerts", {
      mediaType: {
        previews: ["dorian"]
      }
    }],
    get: ["GET /repos/{owner}/{repo}"],
    getAccessRestrictions: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"],
    getAdminBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    getAllEnvironments: ["GET /repos/{owner}/{repo}/environments"],
    getAllStatusCheckContexts: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts"],
    getAllTopics: ["GET /repos/{owner}/{repo}/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    getAppsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps"],
    getBranch: ["GET /repos/{owner}/{repo}/branches/{branch}"],
    getBranchProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection"],
    getClones: ["GET /repos/{owner}/{repo}/traffic/clones"],
    getCodeFrequencyStats: ["GET /repos/{owner}/{repo}/stats/code_frequency"],
    getCollaboratorPermissionLevel: ["GET /repos/{owner}/{repo}/collaborators/{username}/permission"],
    getCombinedStatusForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/status"],
    getCommit: ["GET /repos/{owner}/{repo}/commits/{ref}"],
    getCommitActivityStats: ["GET /repos/{owner}/{repo}/stats/commit_activity"],
    getCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}"],
    getCommitSignatureProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures", {
      mediaType: {
        previews: ["zzzax"]
      }
    }],
    getCommunityProfileMetrics: ["GET /repos/{owner}/{repo}/community/profile"],
    getContent: ["GET /repos/{owner}/{repo}/contents/{path}"],
    getContributorsStats: ["GET /repos/{owner}/{repo}/stats/contributors"],
    getDeployKey: ["GET /repos/{owner}/{repo}/keys/{key_id}"],
    getDeployment: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}"],
    getDeploymentStatus: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}"],
    getEnvironment: ["GET /repos/{owner}/{repo}/environments/{environment_name}"],
    getLatestPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/latest"],
    getLatestRelease: ["GET /repos/{owner}/{repo}/releases/latest"],
    getPages: ["GET /repos/{owner}/{repo}/pages"],
    getPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/{build_id}"],
    getParticipationStats: ["GET /repos/{owner}/{repo}/stats/participation"],
    getPullRequestReviewProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    getPunchCardStats: ["GET /repos/{owner}/{repo}/stats/punch_card"],
    getReadme: ["GET /repos/{owner}/{repo}/readme"],
    getReadmeInDirectory: ["GET /repos/{owner}/{repo}/readme/{dir}"],
    getRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}"],
    getReleaseAsset: ["GET /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    getReleaseByTag: ["GET /repos/{owner}/{repo}/releases/tags/{tag}"],
    getStatusChecksProtection: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    getTeamsWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams"],
    getTopPaths: ["GET /repos/{owner}/{repo}/traffic/popular/paths"],
    getTopReferrers: ["GET /repos/{owner}/{repo}/traffic/popular/referrers"],
    getUsersWithAccessToProtectedBranch: ["GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users"],
    getViews: ["GET /repos/{owner}/{repo}/traffic/views"],
    getWebhook: ["GET /repos/{owner}/{repo}/hooks/{hook_id}"],
    getWebhookConfigForRepo: ["GET /repos/{owner}/{repo}/hooks/{hook_id}/config"],
    listBranches: ["GET /repos/{owner}/{repo}/branches"],
    listBranchesForHeadCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head", {
      mediaType: {
        previews: ["groot"]
      }
    }],
    listCollaborators: ["GET /repos/{owner}/{repo}/collaborators"],
    listCommentsForCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/comments"],
    listCommitCommentsForRepo: ["GET /repos/{owner}/{repo}/comments"],
    listCommitStatusesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/statuses"],
    listCommits: ["GET /repos/{owner}/{repo}/commits"],
    listContributors: ["GET /repos/{owner}/{repo}/contributors"],
    listDeployKeys: ["GET /repos/{owner}/{repo}/keys"],
    listDeploymentStatuses: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"],
    listDeployments: ["GET /repos/{owner}/{repo}/deployments"],
    listForAuthenticatedUser: ["GET /user/repos"],
    listForOrg: ["GET /orgs/{org}/repos"],
    listForUser: ["GET /users/{username}/repos"],
    listForks: ["GET /repos/{owner}/{repo}/forks"],
    listInvitations: ["GET /repos/{owner}/{repo}/invitations"],
    listInvitationsForAuthenticatedUser: ["GET /user/repository_invitations"],
    listLanguages: ["GET /repos/{owner}/{repo}/languages"],
    listPagesBuilds: ["GET /repos/{owner}/{repo}/pages/builds"],
    listPublic: ["GET /repositories"],
    listPullRequestsAssociatedWithCommit: ["GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls", {
      mediaType: {
        previews: ["groot"]
      }
    }],
    listReleaseAssets: ["GET /repos/{owner}/{repo}/releases/{release_id}/assets"],
    listReleases: ["GET /repos/{owner}/{repo}/releases"],
    listTags: ["GET /repos/{owner}/{repo}/tags"],
    listTeams: ["GET /repos/{owner}/{repo}/teams"],
    listWebhooks: ["GET /repos/{owner}/{repo}/hooks"],
    merge: ["POST /repos/{owner}/{repo}/merges"],
    pingWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/pings"],
    removeAppAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    removeCollaborator: ["DELETE /repos/{owner}/{repo}/collaborators/{username}"],
    removeStatusCheckContexts: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    removeStatusCheckProtection: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    removeTeamAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    removeUserAccessRestrictions: ["DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    renameBranch: ["POST /repos/{owner}/{repo}/branches/{branch}/rename"],
    replaceAllTopics: ["PUT /repos/{owner}/{repo}/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    requestPagesBuild: ["POST /repos/{owner}/{repo}/pages/builds"],
    setAdminBranchProtection: ["POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"],
    setAppAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps", {}, {
      mapToData: "apps"
    }],
    setStatusCheckContexts: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts", {}, {
      mapToData: "contexts"
    }],
    setTeamAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams", {}, {
      mapToData: "teams"
    }],
    setUserAccessRestrictions: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users", {}, {
      mapToData: "users"
    }],
    testPushWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/tests"],
    transfer: ["POST /repos/{owner}/{repo}/transfer"],
    update: ["PATCH /repos/{owner}/{repo}"],
    updateBranchProtection: ["PUT /repos/{owner}/{repo}/branches/{branch}/protection"],
    updateCommitComment: ["PATCH /repos/{owner}/{repo}/comments/{comment_id}"],
    updateInformationAboutPagesSite: ["PUT /repos/{owner}/{repo}/pages"],
    updateInvitation: ["PATCH /repos/{owner}/{repo}/invitations/{invitation_id}"],
    updatePullRequestReviewProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"],
    updateRelease: ["PATCH /repos/{owner}/{repo}/releases/{release_id}"],
    updateReleaseAsset: ["PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    updateStatusCheckPotection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks", {}, {
      renamed: ["repos", "updateStatusCheckProtection"]
    }],
    updateStatusCheckProtection: ["PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"],
    updateWebhook: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}"],
    updateWebhookConfigForRepo: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config"],
    uploadReleaseAsset: ["POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}", {
      baseUrl: "https://uploads.github.com"
    }]
  },
  search: {
    code: ["GET /search/code"],
    commits: ["GET /search/commits", {
      mediaType: {
        previews: ["cloak"]
      }
    }],
    issuesAndPullRequests: ["GET /search/issues"],
    labels: ["GET /search/labels"],
    repos: ["GET /search/repositories"],
    topics: ["GET /search/topics", {
      mediaType: {
        previews: ["mercy"]
      }
    }],
    users: ["GET /search/users"]
  },
  secretScanning: {
    getAlert: ["GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/secret-scanning/alerts"],
    updateAlert: ["PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"]
  },
  teams: {
    addOrUpdateMembershipForUserInOrg: ["PUT /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    addOrUpdateProjectPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    addOrUpdateRepoPermissionsInOrg: ["PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    checkPermissionsForProjectInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects/{project_id}", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    checkPermissionsForRepoInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    create: ["POST /orgs/{org}/teams"],
    createDiscussionCommentInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
    createDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions"],
    deleteDiscussionCommentInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    deleteDiscussionInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    deleteInOrg: ["DELETE /orgs/{org}/teams/{team_slug}"],
    getByName: ["GET /orgs/{org}/teams/{team_slug}"],
    getDiscussionCommentInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    getDiscussionInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    getMembershipForUserInOrg: ["GET /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    list: ["GET /orgs/{org}/teams"],
    listChildInOrg: ["GET /orgs/{org}/teams/{team_slug}/teams"],
    listDiscussionCommentsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"],
    listDiscussionsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions"],
    listForAuthenticatedUser: ["GET /user/teams"],
    listMembersInOrg: ["GET /orgs/{org}/teams/{team_slug}/members"],
    listPendingInvitationsInOrg: ["GET /orgs/{org}/teams/{team_slug}/invitations"],
    listProjectsInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects", {
      mediaType: {
        previews: ["inertia"]
      }
    }],
    listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
    removeMembershipForUserInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}"],
    removeProjectInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}"],
    removeRepoInOrg: ["DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"],
    updateDiscussionCommentInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"],
    updateDiscussionInOrg: ["PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"],
    updateInOrg: ["PATCH /orgs/{org}/teams/{team_slug}"]
  },
  users: {
    addEmailForAuthenticated: ["POST /user/emails"],
    block: ["PUT /user/blocks/{username}"],
    checkBlocked: ["GET /user/blocks/{username}"],
    checkFollowingForUser: ["GET /users/{username}/following/{target_user}"],
    checkPersonIsFollowedByAuthenticated: ["GET /user/following/{username}"],
    createGpgKeyForAuthenticated: ["POST /user/gpg_keys"],
    createPublicSshKeyForAuthenticated: ["POST /user/keys"],
    deleteEmailForAuthenticated: ["DELETE /user/emails"],
    deleteGpgKeyForAuthenticated: ["DELETE /user/gpg_keys/{gpg_key_id}"],
    deletePublicSshKeyForAuthenticated: ["DELETE /user/keys/{key_id}"],
    follow: ["PUT /user/following/{username}"],
    getAuthenticated: ["GET /user"],
    getByUsername: ["GET /users/{username}"],
    getContextForUser: ["GET /users/{username}/hovercard"],
    getGpgKeyForAuthenticated: ["GET /user/gpg_keys/{gpg_key_id}"],
    getPublicSshKeyForAuthenticated: ["GET /user/keys/{key_id}"],
    list: ["GET /users"],
    listBlockedByAuthenticated: ["GET /user/blocks"],
    listEmailsForAuthenticated: ["GET /user/emails"],
    listFollowedByAuthenticated: ["GET /user/following"],
    listFollowersForAuthenticatedUser: ["GET /user/followers"],
    listFollowersForUser: ["GET /users/{username}/followers"],
    listFollowingForUser: ["GET /users/{username}/following"],
    listGpgKeysForAuthenticated: ["GET /user/gpg_keys"],
    listGpgKeysForUser: ["GET /users/{username}/gpg_keys"],
    listPublicEmailsForAuthenticated: ["GET /user/public_emails"],
    listPublicKeysForUser: ["GET /users/{username}/keys"],
    listPublicSshKeysForAuthenticated: ["GET /user/keys"],
    setPrimaryEmailVisibilityForAuthenticated: ["PATCH /user/email/visibility"],
    unblock: ["DELETE /user/blocks/{username}"],
    unfollow: ["DELETE /user/following/{username}"],
    updateAuthenticated: ["PATCH /user"]
  }
};

const VERSION = "4.15.1";

function endpointsToMethods(octokit, endpointsMap) {
  const newMethods = {};

  for (const [scope, endpoints] of Object.entries(endpointsMap)) {
    for (const [methodName, endpoint] of Object.entries(endpoints)) {
      const [route, defaults, decorations] = endpoint;
      const [method, url] = route.split(/ /);
      const endpointDefaults = Object.assign({
        method,
        url
      }, defaults);

      if (!newMethods[scope]) {
        newMethods[scope] = {};
      }

      const scopeMethods = newMethods[scope];

      if (decorations) {
        scopeMethods[methodName] = decorate(octokit, scope, methodName, endpointDefaults, decorations);
        continue;
      }

      scopeMethods[methodName] = octokit.request.defaults(endpointDefaults);
    }
  }

  return newMethods;
}

function decorate(octokit, scope, methodName, defaults, decorations) {
  const requestWithDefaults = octokit.request.defaults(defaults);
  /* istanbul ignore next */

  function withDecorations(...args) {
    // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
    let options = requestWithDefaults.endpoint.merge(...args); // There are currently no other decorations than `.mapToData`

    if (decorations.mapToData) {
      options = Object.assign({}, options, {
        data: options[decorations.mapToData],
        [decorations.mapToData]: undefined
      });
      return requestWithDefaults(options);
    }

    if (decorations.renamed) {
      const [newScope, newMethodName] = decorations.renamed;
      octokit.log.warn(`octokit.${scope}.${methodName}() has been renamed to octokit.${newScope}.${newMethodName}()`);
    }

    if (decorations.deprecated) {
      octokit.log.warn(decorations.deprecated);
    }

    if (decorations.renamedParameters) {
      // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488
      const options = requestWithDefaults.endpoint.merge(...args);

      for (const [name, alias] of Object.entries(decorations.renamedParameters)) {
        if (name in options) {
          octokit.log.warn(`"${name}" parameter is deprecated for "octokit.${scope}.${methodName}()". Use "${alias}" instead`);

          if (!(alias in options)) {
            options[alias] = options[name];
          }

          delete options[name];
        }
      }

      return requestWithDefaults(options);
    } // @ts-ignore https://github.com/microsoft/TypeScript/issues/25488


    return requestWithDefaults(...args);
  }

  return Object.assign(withDecorations, requestWithDefaults);
}

function restEndpointMethods(octokit) {
  const api = endpointsToMethods(octokit, Endpoints);
  return _objectSpread2(_objectSpread2({}, api), {}, {
    rest: api
  });
}
restEndpointMethods.VERSION = VERSION;

exports.restEndpointMethods = restEndpointMethods;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 537:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var deprecation = __webpack_require__(8932);
var once = _interopDefault(__webpack_require__(1223));

const logOnceCode = once(deprecation => console.warn(deprecation));
const logOnceHeaders = once(deprecation => console.warn(deprecation));
/**
 * Error with extra properties to help with debugging
 */

class RequestError extends Error {
  constructor(message, statusCode, options) {
    super(message); // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = "HttpError";
    this.status = statusCode;
    let headers;

    if ("headers" in options && typeof options.headers !== "undefined") {
      headers = options.headers;
    }

    if ("response" in options) {
      this.response = options.response;
      headers = options.response.headers;
    } // redact request credentials without mutating original request options


    const requestCopy = Object.assign({}, options.request);

    if (options.request.headers.authorization) {
      requestCopy.headers = Object.assign({}, options.request.headers, {
        authorization: options.request.headers.authorization.replace(/ .*$/, " [REDACTED]")
      });
    }

    requestCopy.url = requestCopy.url // client_id & client_secret can be passed as URL query parameters to increase rate limit
    // see https://developer.github.com/v3/#increasing-the-unauthenticated-rate-limit-for-oauth-applications
    .replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]") // OAuth tokens can be passed as URL query parameters, although it is not recommended
    // see https://developer.github.com/v3/#oauth2-token-sent-in-a-header
    .replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
    this.request = requestCopy; // deprecations

    Object.defineProperty(this, "code", {
      get() {
        logOnceCode(new deprecation.Deprecation("[@octokit/request-error] `error.code` is deprecated, use `error.status`."));
        return statusCode;
      }

    });
    Object.defineProperty(this, "headers", {
      get() {
        logOnceHeaders(new deprecation.Deprecation("[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`."));
        return headers || {};
      }

    });
  }

}

exports.RequestError = RequestError;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 6234:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var endpoint = __webpack_require__(9440);
var universalUserAgent = __webpack_require__(5030);
var isPlainObject = __webpack_require__(3287);
var nodeFetch = _interopDefault(__webpack_require__(467));
var requestError = __webpack_require__(537);

const VERSION = "5.6.3";

function getBufferResponse(response) {
  return response.arrayBuffer();
}

function fetchWrapper(requestOptions) {
  const log = requestOptions.request && requestOptions.request.log ? requestOptions.request.log : console;

  if (isPlainObject.isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body)) {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }

  let headers = {};
  let status;
  let url;
  const fetch = requestOptions.request && requestOptions.request.fetch || nodeFetch;
  return fetch(requestOptions.url, Object.assign({
    method: requestOptions.method,
    body: requestOptions.body,
    headers: requestOptions.headers,
    redirect: requestOptions.redirect
  }, // `requestOptions.request.agent` type is incompatible
  // see https://github.com/octokit/types.ts/pull/264
  requestOptions.request)).then(async response => {
    url = response.url;
    status = response.status;

    for (const keyAndValue of response.headers) {
      headers[keyAndValue[0]] = keyAndValue[1];
    }

    if ("deprecation" in headers) {
      const matches = headers.link && headers.link.match(/<([^>]+)>; rel="deprecation"/);
      const deprecationLink = matches && matches.pop();
      log.warn(`[@octokit/request] "${requestOptions.method} ${requestOptions.url}" is deprecated. It is scheduled to be removed on ${headers.sunset}${deprecationLink ? `. See ${deprecationLink}` : ""}`);
    }

    if (status === 204 || status === 205) {
      return;
    } // GitHub API returns 200 for HEAD requests


    if (requestOptions.method === "HEAD") {
      if (status < 400) {
        return;
      }

      throw new requestError.RequestError(response.statusText, status, {
        response: {
          url,
          status,
          headers,
          data: undefined
        },
        request: requestOptions
      });
    }

    if (status === 304) {
      throw new requestError.RequestError("Not modified", status, {
        response: {
          url,
          status,
          headers,
          data: await getResponseData(response)
        },
        request: requestOptions
      });
    }

    if (status >= 400) {
      const data = await getResponseData(response);
      const error = new requestError.RequestError(toErrorMessage(data), status, {
        response: {
          url,
          status,
          headers,
          data
        },
        request: requestOptions
      });
      throw error;
    }

    return getResponseData(response);
  }).then(data => {
    return {
      status,
      url,
      headers,
      data
    };
  }).catch(error => {
    if (error instanceof requestError.RequestError) throw error;
    throw new requestError.RequestError(error.message, 500, {
      request: requestOptions
    });
  });
}

async function getResponseData(response) {
  const contentType = response.headers.get("content-type");

  if (/application\/json/.test(contentType)) {
    return response.json();
  }

  if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) {
    return response.text();
  }

  return getBufferResponse(response);
}

function toErrorMessage(data) {
  if (typeof data === "string") return data; // istanbul ignore else - just in case

  if ("message" in data) {
    if (Array.isArray(data.errors)) {
      return `${data.message}: ${data.errors.map(JSON.stringify).join(", ")}`;
    }

    return data.message;
  } // istanbul ignore next - just in case


  return `Unknown error: ${JSON.stringify(data)}`;
}

function withDefaults(oldEndpoint, newDefaults) {
  const endpoint = oldEndpoint.defaults(newDefaults);

  const newApi = function (route, parameters) {
    const endpointOptions = endpoint.merge(route, parameters);

    if (!endpointOptions.request || !endpointOptions.request.hook) {
      return fetchWrapper(endpoint.parse(endpointOptions));
    }

    const request = (route, parameters) => {
      return fetchWrapper(endpoint.parse(endpoint.merge(route, parameters)));
    };

    Object.assign(request, {
      endpoint,
      defaults: withDefaults.bind(null, endpoint)
    });
    return endpointOptions.request.hook(request, endpointOptions);
  };

  return Object.assign(newApi, {
    endpoint,
    defaults: withDefaults.bind(null, endpoint)
  });
}

const request = withDefaults(endpoint.endpoint, {
  headers: {
    "user-agent": `octokit-request.js/${VERSION} ${universalUserAgent.getUserAgent()}`
  }
});

exports.request = request;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 3682:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var register = __webpack_require__(4670)
var addHook = __webpack_require__(5549)
var removeHook = __webpack_require__(6819)

// bind with array of arguments: https://stackoverflow.com/a/21792913
var bind = Function.bind
var bindable = bind.bind(bind)

function bindApi (hook, state, name) {
  var removeHookRef = bindable(removeHook, null).apply(null, name ? [state, name] : [state])
  hook.api = { remove: removeHookRef }
  hook.remove = removeHookRef

  ;['before', 'error', 'after', 'wrap'].forEach(function (kind) {
    var args = name ? [state, kind, name] : [state, kind]
    hook[kind] = hook.api[kind] = bindable(addHook, null).apply(null, args)
  })
}

function HookSingular () {
  var singularHookName = 'h'
  var singularHookState = {
    registry: {}
  }
  var singularHook = register.bind(null, singularHookState, singularHookName)
  bindApi(singularHook, singularHookState, singularHookName)
  return singularHook
}

function HookCollection () {
  var state = {
    registry: {}
  }

  var hook = register.bind(null, state)
  bindApi(hook, state)

  return hook
}

var collectionHookDeprecationMessageDisplayed = false
function Hook () {
  if (!collectionHookDeprecationMessageDisplayed) {
    console.warn('[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4')
    collectionHookDeprecationMessageDisplayed = true
  }
  return HookCollection()
}

Hook.Singular = HookSingular.bind()
Hook.Collection = HookCollection.bind()

module.exports = Hook
// expose constructors as a named property for TypeScript
module.exports.Hook = Hook
module.exports.Singular = Hook.Singular
module.exports.Collection = Hook.Collection


/***/ }),

/***/ 5549:
/***/ ((module) => {

module.exports = addHook;

function addHook(state, kind, name, hook) {
  var orig = hook;
  if (!state.registry[name]) {
    state.registry[name] = [];
  }

  if (kind === "before") {
    hook = function (method, options) {
      return Promise.resolve()
        .then(orig.bind(null, options))
        .then(method.bind(null, options));
    };
  }

  if (kind === "after") {
    hook = function (method, options) {
      var result;
      return Promise.resolve()
        .then(method.bind(null, options))
        .then(function (result_) {
          result = result_;
          return orig(result, options);
        })
        .then(function () {
          return result;
        });
    };
  }

  if (kind === "error") {
    hook = function (method, options) {
      return Promise.resolve()
        .then(method.bind(null, options))
        .catch(function (error) {
          return orig(error, options);
        });
    };
  }

  state.registry[name].push({
    hook: hook,
    orig: orig,
  });
}


/***/ }),

/***/ 4670:
/***/ ((module) => {

module.exports = register;

function register(state, name, method, options) {
  if (typeof method !== "function") {
    throw new Error("method for before hook must be a function");
  }

  if (!options) {
    options = {};
  }

  if (Array.isArray(name)) {
    return name.reverse().reduce(function (callback, name) {
      return register.bind(null, state, name, callback, options);
    }, method)();
  }

  return Promise.resolve().then(function () {
    if (!state.registry[name]) {
      return method(options);
    }

    return state.registry[name].reduce(function (method, registered) {
      return registered.hook.bind(null, method, options);
    }, method)();
  });
}


/***/ }),

/***/ 6819:
/***/ ((module) => {

module.exports = removeHook;

function removeHook(state, name, method) {
  if (!state.registry[name]) {
    return;
  }

  var index = state.registry[name]
    .map(function (registered) {
      return registered.orig;
    })
    .indexOf(method);

  if (index === -1) {
    return;
  }

  state.registry[name].splice(index, 1);
}


/***/ }),

/***/ 8932:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

class Deprecation extends Error {
  constructor(message) {
    super(message); // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'Deprecation';
  }

}

exports.Deprecation = Deprecation;


/***/ }),

/***/ 3287:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

exports.isPlainObject = isPlainObject;


/***/ }),

/***/ 4542:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _ = __webpack_require__(7063).runInContext();
module.exports = __webpack_require__(477)(_, _);


/***/ }),

/***/ 477:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var mapping = __webpack_require__(6114),
    fallbackHolder = __webpack_require__(1817);

/** Built-in value reference. */
var push = Array.prototype.push;

/**
 * Creates a function, with an arity of `n`, that invokes `func` with the
 * arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} n The arity of the new function.
 * @returns {Function} Returns the new function.
 */
function baseArity(func, n) {
  return n == 2
    ? function(a, b) { return func.apply(undefined, arguments); }
    : function(a) { return func.apply(undefined, arguments); };
}

/**
 * Creates a function that invokes `func`, with up to `n` arguments, ignoring
 * any additional arguments.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @param {number} n The arity cap.
 * @returns {Function} Returns the new function.
 */
function baseAry(func, n) {
  return n == 2
    ? function(a, b) { return func(a, b); }
    : function(a) { return func(a); };
}

/**
 * Creates a clone of `array`.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the cloned array.
 */
function cloneArray(array) {
  var length = array ? array.length : 0,
      result = Array(length);

  while (length--) {
    result[length] = array[length];
  }
  return result;
}

/**
 * Creates a function that clones a given object using the assignment `func`.
 *
 * @private
 * @param {Function} func The assignment function.
 * @returns {Function} Returns the new cloner function.
 */
function createCloner(func) {
  return function(object) {
    return func({}, object);
  };
}

/**
 * A specialized version of `_.spread` which flattens the spread array into
 * the arguments of the invoked `func`.
 *
 * @private
 * @param {Function} func The function to spread arguments over.
 * @param {number} start The start position of the spread.
 * @returns {Function} Returns the new function.
 */
function flatSpread(func, start) {
  return function() {
    var length = arguments.length,
        lastIndex = length - 1,
        args = Array(length);

    while (length--) {
      args[length] = arguments[length];
    }
    var array = args[start],
        otherArgs = args.slice(0, start);

    if (array) {
      push.apply(otherArgs, array);
    }
    if (start != lastIndex) {
      push.apply(otherArgs, args.slice(start + 1));
    }
    return func.apply(this, otherArgs);
  };
}

/**
 * Creates a function that wraps `func` and uses `cloner` to clone the first
 * argument it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} cloner The function to clone arguments.
 * @returns {Function} Returns the new immutable function.
 */
function wrapImmutable(func, cloner) {
  return function() {
    var length = arguments.length;
    if (!length) {
      return;
    }
    var args = Array(length);
    while (length--) {
      args[length] = arguments[length];
    }
    var result = args[0] = cloner.apply(undefined, args);
    func.apply(undefined, args);
    return result;
  };
}

/**
 * The base implementation of `convert` which accepts a `util` object of methods
 * required to perform conversions.
 *
 * @param {Object} util The util object.
 * @param {string} name The name of the function to convert.
 * @param {Function} func The function to convert.
 * @param {Object} [options] The options object.
 * @param {boolean} [options.cap=true] Specify capping iteratee arguments.
 * @param {boolean} [options.curry=true] Specify currying.
 * @param {boolean} [options.fixed=true] Specify fixed arity.
 * @param {boolean} [options.immutable=true] Specify immutable operations.
 * @param {boolean} [options.rearg=true] Specify rearranging arguments.
 * @returns {Function|Object} Returns the converted function or object.
 */
function baseConvert(util, name, func, options) {
  var isLib = typeof name == 'function',
      isObj = name === Object(name);

  if (isObj) {
    options = func;
    func = name;
    name = undefined;
  }
  if (func == null) {
    throw new TypeError;
  }
  options || (options = {});

  var config = {
    'cap': 'cap' in options ? options.cap : true,
    'curry': 'curry' in options ? options.curry : true,
    'fixed': 'fixed' in options ? options.fixed : true,
    'immutable': 'immutable' in options ? options.immutable : true,
    'rearg': 'rearg' in options ? options.rearg : true
  };

  var defaultHolder = isLib ? func : fallbackHolder,
      forceCurry = ('curry' in options) && options.curry,
      forceFixed = ('fixed' in options) && options.fixed,
      forceRearg = ('rearg' in options) && options.rearg,
      pristine = isLib ? func.runInContext() : undefined;

  var helpers = isLib ? func : {
    'ary': util.ary,
    'assign': util.assign,
    'clone': util.clone,
    'curry': util.curry,
    'forEach': util.forEach,
    'isArray': util.isArray,
    'isError': util.isError,
    'isFunction': util.isFunction,
    'isWeakMap': util.isWeakMap,
    'iteratee': util.iteratee,
    'keys': util.keys,
    'rearg': util.rearg,
    'toInteger': util.toInteger,
    'toPath': util.toPath
  };

  var ary = helpers.ary,
      assign = helpers.assign,
      clone = helpers.clone,
      curry = helpers.curry,
      each = helpers.forEach,
      isArray = helpers.isArray,
      isError = helpers.isError,
      isFunction = helpers.isFunction,
      isWeakMap = helpers.isWeakMap,
      keys = helpers.keys,
      rearg = helpers.rearg,
      toInteger = helpers.toInteger,
      toPath = helpers.toPath;

  var aryMethodKeys = keys(mapping.aryMethod);

  var wrappers = {
    'castArray': function(castArray) {
      return function() {
        var value = arguments[0];
        return isArray(value)
          ? castArray(cloneArray(value))
          : castArray.apply(undefined, arguments);
      };
    },
    'iteratee': function(iteratee) {
      return function() {
        var func = arguments[0],
            arity = arguments[1],
            result = iteratee(func, arity),
            length = result.length;

        if (config.cap && typeof arity == 'number') {
          arity = arity > 2 ? (arity - 2) : 1;
          return (length && length <= arity) ? result : baseAry(result, arity);
        }
        return result;
      };
    },
    'mixin': function(mixin) {
      return function(source) {
        var func = this;
        if (!isFunction(func)) {
          return mixin(func, Object(source));
        }
        var pairs = [];
        each(keys(source), function(key) {
          if (isFunction(source[key])) {
            pairs.push([key, func.prototype[key]]);
          }
        });

        mixin(func, Object(source));

        each(pairs, function(pair) {
          var value = pair[1];
          if (isFunction(value)) {
            func.prototype[pair[0]] = value;
          } else {
            delete func.prototype[pair[0]];
          }
        });
        return func;
      };
    },
    'nthArg': function(nthArg) {
      return function(n) {
        var arity = n < 0 ? 1 : (toInteger(n) + 1);
        return curry(nthArg(n), arity);
      };
    },
    'rearg': function(rearg) {
      return function(func, indexes) {
        var arity = indexes ? indexes.length : 0;
        return curry(rearg(func, indexes), arity);
      };
    },
    'runInContext': function(runInContext) {
      return function(context) {
        return baseConvert(util, runInContext(context), options);
      };
    }
  };

  /*--------------------------------------------------------------------------*/

  /**
   * Casts `func` to a function with an arity capped iteratee if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @returns {Function} Returns the cast function.
   */
  function castCap(name, func) {
    if (config.cap) {
      var indexes = mapping.iterateeRearg[name];
      if (indexes) {
        return iterateeRearg(func, indexes);
      }
      var n = !isLib && mapping.iterateeAry[name];
      if (n) {
        return iterateeAry(func, n);
      }
    }
    return func;
  }

  /**
   * Casts `func` to a curried function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castCurry(name, func, n) {
    return (forceCurry || (config.curry && n > 1))
      ? curry(func, n)
      : func;
  }

  /**
   * Casts `func` to a fixed arity function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the cast function.
   */
  function castFixed(name, func, n) {
    if (config.fixed && (forceFixed || !mapping.skipFixed[name])) {
      var data = mapping.methodSpread[name],
          start = data && data.start;

      return start  === undefined ? ary(func, n) : flatSpread(func, start);
    }
    return func;
  }

  /**
   * Casts `func` to an rearged function if needed.
   *
   * @private
   * @param {string} name The name of the function to inspect.
   * @param {Function} func The function to inspect.
   * @param {number} n The arity of `func`.
   * @returns {Function} Returns the cast function.
   */
  function castRearg(name, func, n) {
    return (config.rearg && n > 1 && (forceRearg || !mapping.skipRearg[name]))
      ? rearg(func, mapping.methodRearg[name] || mapping.aryRearg[n])
      : func;
  }

  /**
   * Creates a clone of `object` by `path`.
   *
   * @private
   * @param {Object} object The object to clone.
   * @param {Array|string} path The path to clone by.
   * @returns {Object} Returns the cloned object.
   */
  function cloneByPath(object, path) {
    path = toPath(path);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        result = clone(Object(object)),
        nested = result;

    while (nested != null && ++index < length) {
      var key = path[index],
          value = nested[key];

      if (value != null &&
          !(isFunction(value) || isError(value) || isWeakMap(value))) {
        nested[key] = clone(index == lastIndex ? value : Object(value));
      }
      nested = nested[key];
    }
    return result;
  }

  /**
   * Converts `lodash` to an immutable auto-curried iteratee-first data-last
   * version with conversion `options` applied.
   *
   * @param {Object} [options] The options object. See `baseConvert` for more details.
   * @returns {Function} Returns the converted `lodash`.
   */
  function convertLib(options) {
    return _.runInContext.convert(options)(undefined);
  }

  /**
   * Create a converter function for `func` of `name`.
   *
   * @param {string} name The name of the function to convert.
   * @param {Function} func The function to convert.
   * @returns {Function} Returns the new converter function.
   */
  function createConverter(name, func) {
    var realName = mapping.aliasToReal[name] || name,
        methodName = mapping.remap[realName] || realName,
        oldOptions = options;

    return function(options) {
      var newUtil = isLib ? pristine : helpers,
          newFunc = isLib ? pristine[methodName] : func,
          newOptions = assign(assign({}, oldOptions), options);

      return baseConvert(newUtil, realName, newFunc, newOptions);
    };
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee, with up to `n`
   * arguments, ignoring any additional arguments.
   *
   * @private
   * @param {Function} func The function to cap iteratee arguments for.
   * @param {number} n The arity cap.
   * @returns {Function} Returns the new function.
   */
  function iterateeAry(func, n) {
    return overArg(func, function(func) {
      return typeof func == 'function' ? baseAry(func, n) : func;
    });
  }

  /**
   * Creates a function that wraps `func` to invoke its iteratee with arguments
   * arranged according to the specified `indexes` where the argument value at
   * the first index is provided as the first argument, the argument value at
   * the second index is provided as the second argument, and so on.
   *
   * @private
   * @param {Function} func The function to rearrange iteratee arguments for.
   * @param {number[]} indexes The arranged argument indexes.
   * @returns {Function} Returns the new function.
   */
  function iterateeRearg(func, indexes) {
    return overArg(func, function(func) {
      var n = indexes.length;
      return baseArity(rearg(baseAry(func, n), indexes), n);
    });
  }

  /**
   * Creates a function that invokes `func` with its first argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function() {
      var length = arguments.length;
      if (!length) {
        return func();
      }
      var args = Array(length);
      while (length--) {
        args[length] = arguments[length];
      }
      var index = config.rearg ? 0 : (length - 1);
      args[index] = transform(args[index]);
      return func.apply(undefined, args);
    };
  }

  /**
   * Creates a function that wraps `func` and applys the conversions
   * rules by `name`.
   *
   * @private
   * @param {string} name The name of the function to wrap.
   * @param {Function} func The function to wrap.
   * @returns {Function} Returns the converted function.
   */
  function wrap(name, func, placeholder) {
    var result,
        realName = mapping.aliasToReal[name] || name,
        wrapped = func,
        wrapper = wrappers[realName];

    if (wrapper) {
      wrapped = wrapper(func);
    }
    else if (config.immutable) {
      if (mapping.mutate.array[realName]) {
        wrapped = wrapImmutable(func, cloneArray);
      }
      else if (mapping.mutate.object[realName]) {
        wrapped = wrapImmutable(func, createCloner(func));
      }
      else if (mapping.mutate.set[realName]) {
        wrapped = wrapImmutable(func, cloneByPath);
      }
    }
    each(aryMethodKeys, function(aryKey) {
      each(mapping.aryMethod[aryKey], function(otherName) {
        if (realName == otherName) {
          var data = mapping.methodSpread[realName],
              afterRearg = data && data.afterRearg;

          result = afterRearg
            ? castFixed(realName, castRearg(realName, wrapped, aryKey), aryKey)
            : castRearg(realName, castFixed(realName, wrapped, aryKey), aryKey);

          result = castCap(realName, result);
          result = castCurry(realName, result, aryKey);
          return false;
        }
      });
      return !result;
    });

    result || (result = wrapped);
    if (result == func) {
      result = forceCurry ? curry(result, 1) : function() {
        return func.apply(this, arguments);
      };
    }
    result.convert = createConverter(realName, func);
    result.placeholder = func.placeholder = placeholder;

    return result;
  }

  /*--------------------------------------------------------------------------*/

  if (!isObj) {
    return wrap(name, func, defaultHolder);
  }
  var _ = func;

  // Convert methods by ary cap.
  var pairs = [];
  each(aryMethodKeys, function(aryKey) {
    each(mapping.aryMethod[aryKey], function(key) {
      var func = _[mapping.remap[key] || key];
      if (func) {
        pairs.push([key, wrap(key, func, _)]);
      }
    });
  });

  // Convert remaining methods.
  each(keys(_), function(key) {
    var func = _[key];
    if (typeof func == 'function') {
      var length = pairs.length;
      while (length--) {
        if (pairs[length][0] == key) {
          return;
        }
      }
      func.convert = createConverter(key, func);
      pairs.push([key, func]);
    }
  });

  // Assign to `_` leaving `_.prototype` unchanged to allow chaining.
  each(pairs, function(pair) {
    _[pair[0]] = pair[1];
  });

  _.convert = convertLib;
  _.placeholder = _;

  // Assign aliases.
  each(keys(_), function(key) {
    each(mapping.realToAlias[key] || [], function(alias) {
      _[alias] = _[key];
    });
  });

  return _;
}

module.exports = baseConvert;


/***/ }),

/***/ 6114:
/***/ ((__unused_webpack_module, exports) => {

/** Used to map aliases to their real names. */
exports.aliasToReal = {

  // Lodash aliases.
  'each': 'forEach',
  'eachRight': 'forEachRight',
  'entries': 'toPairs',
  'entriesIn': 'toPairsIn',
  'extend': 'assignIn',
  'extendAll': 'assignInAll',
  'extendAllWith': 'assignInAllWith',
  'extendWith': 'assignInWith',
  'first': 'head',

  // Methods that are curried variants of others.
  'conforms': 'conformsTo',
  'matches': 'isMatch',
  'property': 'get',

  // Ramda aliases.
  '__': 'placeholder',
  'F': 'stubFalse',
  'T': 'stubTrue',
  'all': 'every',
  'allPass': 'overEvery',
  'always': 'constant',
  'any': 'some',
  'anyPass': 'overSome',
  'apply': 'spread',
  'assoc': 'set',
  'assocPath': 'set',
  'complement': 'negate',
  'compose': 'flowRight',
  'contains': 'includes',
  'dissoc': 'unset',
  'dissocPath': 'unset',
  'dropLast': 'dropRight',
  'dropLastWhile': 'dropRightWhile',
  'equals': 'isEqual',
  'identical': 'eq',
  'indexBy': 'keyBy',
  'init': 'initial',
  'invertObj': 'invert',
  'juxt': 'over',
  'omitAll': 'omit',
  'nAry': 'ary',
  'path': 'get',
  'pathEq': 'matchesProperty',
  'pathOr': 'getOr',
  'paths': 'at',
  'pickAll': 'pick',
  'pipe': 'flow',
  'pluck': 'map',
  'prop': 'get',
  'propEq': 'matchesProperty',
  'propOr': 'getOr',
  'props': 'at',
  'symmetricDifference': 'xor',
  'symmetricDifferenceBy': 'xorBy',
  'symmetricDifferenceWith': 'xorWith',
  'takeLast': 'takeRight',
  'takeLastWhile': 'takeRightWhile',
  'unapply': 'rest',
  'unnest': 'flatten',
  'useWith': 'overArgs',
  'where': 'conformsTo',
  'whereEq': 'isMatch',
  'zipObj': 'zipObject'
};

/** Used to map ary to method names. */
exports.aryMethod = {
  '1': [
    'assignAll', 'assignInAll', 'attempt', 'castArray', 'ceil', 'create',
    'curry', 'curryRight', 'defaultsAll', 'defaultsDeepAll', 'floor', 'flow',
    'flowRight', 'fromPairs', 'invert', 'iteratee', 'memoize', 'method', 'mergeAll',
    'methodOf', 'mixin', 'nthArg', 'over', 'overEvery', 'overSome','rest', 'reverse',
    'round', 'runInContext', 'spread', 'template', 'trim', 'trimEnd', 'trimStart',
    'uniqueId', 'words', 'zipAll'
  ],
  '2': [
    'add', 'after', 'ary', 'assign', 'assignAllWith', 'assignIn', 'assignInAllWith',
    'at', 'before', 'bind', 'bindAll', 'bindKey', 'chunk', 'cloneDeepWith',
    'cloneWith', 'concat', 'conformsTo', 'countBy', 'curryN', 'curryRightN',
    'debounce', 'defaults', 'defaultsDeep', 'defaultTo', 'delay', 'difference',
    'divide', 'drop', 'dropRight', 'dropRightWhile', 'dropWhile', 'endsWith', 'eq',
    'every', 'filter', 'find', 'findIndex', 'findKey', 'findLast', 'findLastIndex',
    'findLastKey', 'flatMap', 'flatMapDeep', 'flattenDepth', 'forEach',
    'forEachRight', 'forIn', 'forInRight', 'forOwn', 'forOwnRight', 'get',
    'groupBy', 'gt', 'gte', 'has', 'hasIn', 'includes', 'indexOf', 'intersection',
    'invertBy', 'invoke', 'invokeMap', 'isEqual', 'isMatch', 'join', 'keyBy',
    'lastIndexOf', 'lt', 'lte', 'map', 'mapKeys', 'mapValues', 'matchesProperty',
    'maxBy', 'meanBy', 'merge', 'mergeAllWith', 'minBy', 'multiply', 'nth', 'omit',
    'omitBy', 'overArgs', 'pad', 'padEnd', 'padStart', 'parseInt', 'partial',
    'partialRight', 'partition', 'pick', 'pickBy', 'propertyOf', 'pull', 'pullAll',
    'pullAt', 'random', 'range', 'rangeRight', 'rearg', 'reject', 'remove',
    'repeat', 'restFrom', 'result', 'sampleSize', 'some', 'sortBy', 'sortedIndex',
    'sortedIndexOf', 'sortedLastIndex', 'sortedLastIndexOf', 'sortedUniqBy',
    'split', 'spreadFrom', 'startsWith', 'subtract', 'sumBy', 'take', 'takeRight',
    'takeRightWhile', 'takeWhile', 'tap', 'throttle', 'thru', 'times', 'trimChars',
    'trimCharsEnd', 'trimCharsStart', 'truncate', 'union', 'uniqBy', 'uniqWith',
    'unset', 'unzipWith', 'without', 'wrap', 'xor', 'zip', 'zipObject',
    'zipObjectDeep'
  ],
  '3': [
    'assignInWith', 'assignWith', 'clamp', 'differenceBy', 'differenceWith',
    'findFrom', 'findIndexFrom', 'findLastFrom', 'findLastIndexFrom', 'getOr',
    'includesFrom', 'indexOfFrom', 'inRange', 'intersectionBy', 'intersectionWith',
    'invokeArgs', 'invokeArgsMap', 'isEqualWith', 'isMatchWith', 'flatMapDepth',
    'lastIndexOfFrom', 'mergeWith', 'orderBy', 'padChars', 'padCharsEnd',
    'padCharsStart', 'pullAllBy', 'pullAllWith', 'rangeStep', 'rangeStepRight',
    'reduce', 'reduceRight', 'replace', 'set', 'slice', 'sortedIndexBy',
    'sortedLastIndexBy', 'transform', 'unionBy', 'unionWith', 'update', 'xorBy',
    'xorWith', 'zipWith'
  ],
  '4': [
    'fill', 'setWith', 'updateWith'
  ]
};

/** Used to map ary to rearg configs. */
exports.aryRearg = {
  '2': [1, 0],
  '3': [2, 0, 1],
  '4': [3, 2, 0, 1]
};

/** Used to map method names to their iteratee ary. */
exports.iterateeAry = {
  'dropRightWhile': 1,
  'dropWhile': 1,
  'every': 1,
  'filter': 1,
  'find': 1,
  'findFrom': 1,
  'findIndex': 1,
  'findIndexFrom': 1,
  'findKey': 1,
  'findLast': 1,
  'findLastFrom': 1,
  'findLastIndex': 1,
  'findLastIndexFrom': 1,
  'findLastKey': 1,
  'flatMap': 1,
  'flatMapDeep': 1,
  'flatMapDepth': 1,
  'forEach': 1,
  'forEachRight': 1,
  'forIn': 1,
  'forInRight': 1,
  'forOwn': 1,
  'forOwnRight': 1,
  'map': 1,
  'mapKeys': 1,
  'mapValues': 1,
  'partition': 1,
  'reduce': 2,
  'reduceRight': 2,
  'reject': 1,
  'remove': 1,
  'some': 1,
  'takeRightWhile': 1,
  'takeWhile': 1,
  'times': 1,
  'transform': 2
};

/** Used to map method names to iteratee rearg configs. */
exports.iterateeRearg = {
  'mapKeys': [1],
  'reduceRight': [1, 0]
};

/** Used to map method names to rearg configs. */
exports.methodRearg = {
  'assignInAllWith': [1, 0],
  'assignInWith': [1, 2, 0],
  'assignAllWith': [1, 0],
  'assignWith': [1, 2, 0],
  'differenceBy': [1, 2, 0],
  'differenceWith': [1, 2, 0],
  'getOr': [2, 1, 0],
  'intersectionBy': [1, 2, 0],
  'intersectionWith': [1, 2, 0],
  'isEqualWith': [1, 2, 0],
  'isMatchWith': [2, 1, 0],
  'mergeAllWith': [1, 0],
  'mergeWith': [1, 2, 0],
  'padChars': [2, 1, 0],
  'padCharsEnd': [2, 1, 0],
  'padCharsStart': [2, 1, 0],
  'pullAllBy': [2, 1, 0],
  'pullAllWith': [2, 1, 0],
  'rangeStep': [1, 2, 0],
  'rangeStepRight': [1, 2, 0],
  'setWith': [3, 1, 2, 0],
  'sortedIndexBy': [2, 1, 0],
  'sortedLastIndexBy': [2, 1, 0],
  'unionBy': [1, 2, 0],
  'unionWith': [1, 2, 0],
  'updateWith': [3, 1, 2, 0],
  'xorBy': [1, 2, 0],
  'xorWith': [1, 2, 0],
  'zipWith': [1, 2, 0]
};

/** Used to map method names to spread configs. */
exports.methodSpread = {
  'assignAll': { 'start': 0 },
  'assignAllWith': { 'start': 0 },
  'assignInAll': { 'start': 0 },
  'assignInAllWith': { 'start': 0 },
  'defaultsAll': { 'start': 0 },
  'defaultsDeepAll': { 'start': 0 },
  'invokeArgs': { 'start': 2 },
  'invokeArgsMap': { 'start': 2 },
  'mergeAll': { 'start': 0 },
  'mergeAllWith': { 'start': 0 },
  'partial': { 'start': 1 },
  'partialRight': { 'start': 1 },
  'without': { 'start': 1 },
  'zipAll': { 'start': 0 }
};

/** Used to identify methods which mutate arrays or objects. */
exports.mutate = {
  'array': {
    'fill': true,
    'pull': true,
    'pullAll': true,
    'pullAllBy': true,
    'pullAllWith': true,
    'pullAt': true,
    'remove': true,
    'reverse': true
  },
  'object': {
    'assign': true,
    'assignAll': true,
    'assignAllWith': true,
    'assignIn': true,
    'assignInAll': true,
    'assignInAllWith': true,
    'assignInWith': true,
    'assignWith': true,
    'defaults': true,
    'defaultsAll': true,
    'defaultsDeep': true,
    'defaultsDeepAll': true,
    'merge': true,
    'mergeAll': true,
    'mergeAllWith': true,
    'mergeWith': true,
  },
  'set': {
    'set': true,
    'setWith': true,
    'unset': true,
    'update': true,
    'updateWith': true
  }
};

/** Used to map real names to their aliases. */
exports.realToAlias = (function() {
  var hasOwnProperty = Object.prototype.hasOwnProperty,
      object = exports.aliasToReal,
      result = {};

  for (var key in object) {
    var value = object[key];
    if (hasOwnProperty.call(result, value)) {
      result[value].push(key);
    } else {
      result[value] = [key];
    }
  }
  return result;
}());

/** Used to map method names to other names. */
exports.remap = {
  'assignAll': 'assign',
  'assignAllWith': 'assignWith',
  'assignInAll': 'assignIn',
  'assignInAllWith': 'assignInWith',
  'curryN': 'curry',
  'curryRightN': 'curryRight',
  'defaultsAll': 'defaults',
  'defaultsDeepAll': 'defaultsDeep',
  'findFrom': 'find',
  'findIndexFrom': 'findIndex',
  'findLastFrom': 'findLast',
  'findLastIndexFrom': 'findLastIndex',
  'getOr': 'get',
  'includesFrom': 'includes',
  'indexOfFrom': 'indexOf',
  'invokeArgs': 'invoke',
  'invokeArgsMap': 'invokeMap',
  'lastIndexOfFrom': 'lastIndexOf',
  'mergeAll': 'merge',
  'mergeAllWith': 'mergeWith',
  'padChars': 'pad',
  'padCharsEnd': 'padEnd',
  'padCharsStart': 'padStart',
  'propertyOf': 'get',
  'rangeStep': 'range',
  'rangeStepRight': 'rangeRight',
  'restFrom': 'rest',
  'spreadFrom': 'spread',
  'trimChars': 'trim',
  'trimCharsEnd': 'trimEnd',
  'trimCharsStart': 'trimStart',
  'zipAll': 'zip'
};

/** Used to track methods that skip fixing their arity. */
exports.skipFixed = {
  'castArray': true,
  'flow': true,
  'flowRight': true,
  'iteratee': true,
  'mixin': true,
  'rearg': true,
  'runInContext': true
};

/** Used to track methods that skip rearranging arguments. */
exports.skipRearg = {
  'add': true,
  'assign': true,
  'assignIn': true,
  'bind': true,
  'bindKey': true,
  'concat': true,
  'difference': true,
  'divide': true,
  'eq': true,
  'gt': true,
  'gte': true,
  'isEqual': true,
  'lt': true,
  'lte': true,
  'matchesProperty': true,
  'merge': true,
  'multiply': true,
  'overArgs': true,
  'partial': true,
  'partialRight': true,
  'propertyOf': true,
  'random': true,
  'range': true,
  'rangeRight': true,
  'subtract': true,
  'zip': true,
  'zipObject': true,
  'zipObjectDeep': true
};


/***/ }),

/***/ 1817:
/***/ ((module) => {

/**
 * The default argument placeholder value for methods.
 *
 * @type {Object}
 */
module.exports = {};


/***/ }),

/***/ 7063:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
(function(){function n(n,t,r){switch(r.length){case 0:return n.call(t);case 1:return n.call(t,r[0]);case 2:return n.call(t,r[0],r[1]);case 3:return n.call(t,r[0],r[1],r[2])}return n.apply(t,r)}function t(n,t,r,e){for(var u=-1,i=null==n?0:n.length;++u<i;){var o=n[u];t(e,o,r(o),n)}return e}function r(n,t){for(var r=-1,e=null==n?0:n.length;++r<e&&t(n[r],r,n)!==!1;);return n}function e(n,t){for(var r=null==n?0:n.length;r--&&t(n[r],r,n)!==!1;);return n}function u(n,t){for(var r=-1,e=null==n?0:n.length;++r<e;)if(!t(n[r],r,n))return!1;
return!0}function i(n,t){for(var r=-1,e=null==n?0:n.length,u=0,i=[];++r<e;){var o=n[r];t(o,r,n)&&(i[u++]=o)}return i}function o(n,t){return!!(null==n?0:n.length)&&y(n,t,0)>-1}function f(n,t,r){for(var e=-1,u=null==n?0:n.length;++e<u;)if(r(t,n[e]))return!0;return!1}function c(n,t){for(var r=-1,e=null==n?0:n.length,u=Array(e);++r<e;)u[r]=t(n[r],r,n);return u}function a(n,t){for(var r=-1,e=t.length,u=n.length;++r<e;)n[u+r]=t[r];return n}function l(n,t,r,e){var u=-1,i=null==n?0:n.length;for(e&&i&&(r=n[++u]);++u<i;)r=t(r,n[u],u,n);
return r}function s(n,t,r,e){var u=null==n?0:n.length;for(e&&u&&(r=n[--u]);u--;)r=t(r,n[u],u,n);return r}function h(n,t){for(var r=-1,e=null==n?0:n.length;++r<e;)if(t(n[r],r,n))return!0;return!1}function p(n){return n.split("")}function _(n){return n.match($t)||[]}function v(n,t,r){var e;return r(n,function(n,r,u){if(t(n,r,u))return e=r,!1}),e}function g(n,t,r,e){for(var u=n.length,i=r+(e?1:-1);e?i--:++i<u;)if(t(n[i],i,n))return i;return-1}function y(n,t,r){return t===t?Z(n,t,r):g(n,b,r)}function d(n,t,r,e){
for(var u=r-1,i=n.length;++u<i;)if(e(n[u],t))return u;return-1}function b(n){return n!==n}function w(n,t){var r=null==n?0:n.length;return r?k(n,t)/r:Cn}function m(n){return function(t){return null==t?X:t[n]}}function x(n){return function(t){return null==n?X:n[t]}}function j(n,t,r,e,u){return u(n,function(n,u,i){r=e?(e=!1,n):t(r,n,u,i)}),r}function A(n,t){var r=n.length;for(n.sort(t);r--;)n[r]=n[r].value;return n}function k(n,t){for(var r,e=-1,u=n.length;++e<u;){var i=t(n[e]);i!==X&&(r=r===X?i:r+i);
}return r}function O(n,t){for(var r=-1,e=Array(n);++r<n;)e[r]=t(r);return e}function I(n,t){return c(t,function(t){return[t,n[t]]})}function R(n){return n?n.slice(0,H(n)+1).replace(Lt,""):n}function z(n){return function(t){return n(t)}}function E(n,t){return c(t,function(t){return n[t]})}function S(n,t){return n.has(t)}function W(n,t){for(var r=-1,e=n.length;++r<e&&y(t,n[r],0)>-1;);return r}function L(n,t){for(var r=n.length;r--&&y(t,n[r],0)>-1;);return r}function C(n,t){for(var r=n.length,e=0;r--;)n[r]===t&&++e;
return e}function U(n){return"\\"+Yr[n]}function B(n,t){return null==n?X:n[t]}function T(n){return Nr.test(n)}function $(n){return Pr.test(n)}function D(n){for(var t,r=[];!(t=n.next()).done;)r.push(t.value);return r}function M(n){var t=-1,r=Array(n.size);return n.forEach(function(n,e){r[++t]=[e,n]}),r}function F(n,t){return function(r){return n(t(r))}}function N(n,t){for(var r=-1,e=n.length,u=0,i=[];++r<e;){var o=n[r];o!==t&&o!==cn||(n[r]=cn,i[u++]=r)}return i}function P(n){var t=-1,r=Array(n.size);
return n.forEach(function(n){r[++t]=n}),r}function q(n){var t=-1,r=Array(n.size);return n.forEach(function(n){r[++t]=[n,n]}),r}function Z(n,t,r){for(var e=r-1,u=n.length;++e<u;)if(n[e]===t)return e;return-1}function K(n,t,r){for(var e=r+1;e--;)if(n[e]===t)return e;return e}function V(n){return T(n)?J(n):_e(n)}function G(n){return T(n)?Y(n):p(n)}function H(n){for(var t=n.length;t--&&Ct.test(n.charAt(t)););return t}function J(n){for(var t=Mr.lastIndex=0;Mr.test(n);)++t;return t}function Y(n){return n.match(Mr)||[];
}function Q(n){return n.match(Fr)||[]}var X,nn="4.17.21",tn=200,rn="Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",en="Expected a function",un="Invalid `variable` option passed into `_.template`",on="__lodash_hash_undefined__",fn=500,cn="__lodash_placeholder__",an=1,ln=2,sn=4,hn=1,pn=2,_n=1,vn=2,gn=4,yn=8,dn=16,bn=32,wn=64,mn=128,xn=256,jn=512,An=30,kn="...",On=800,In=16,Rn=1,zn=2,En=3,Sn=1/0,Wn=9007199254740991,Ln=1.7976931348623157e308,Cn=NaN,Un=4294967295,Bn=Un-1,Tn=Un>>>1,$n=[["ary",mn],["bind",_n],["bindKey",vn],["curry",yn],["curryRight",dn],["flip",jn],["partial",bn],["partialRight",wn],["rearg",xn]],Dn="[object Arguments]",Mn="[object Array]",Fn="[object AsyncFunction]",Nn="[object Boolean]",Pn="[object Date]",qn="[object DOMException]",Zn="[object Error]",Kn="[object Function]",Vn="[object GeneratorFunction]",Gn="[object Map]",Hn="[object Number]",Jn="[object Null]",Yn="[object Object]",Qn="[object Promise]",Xn="[object Proxy]",nt="[object RegExp]",tt="[object Set]",rt="[object String]",et="[object Symbol]",ut="[object Undefined]",it="[object WeakMap]",ot="[object WeakSet]",ft="[object ArrayBuffer]",ct="[object DataView]",at="[object Float32Array]",lt="[object Float64Array]",st="[object Int8Array]",ht="[object Int16Array]",pt="[object Int32Array]",_t="[object Uint8Array]",vt="[object Uint8ClampedArray]",gt="[object Uint16Array]",yt="[object Uint32Array]",dt=/\b__p \+= '';/g,bt=/\b(__p \+=) '' \+/g,wt=/(__e\(.*?\)|\b__t\)) \+\n'';/g,mt=/&(?:amp|lt|gt|quot|#39);/g,xt=/[&<>"']/g,jt=RegExp(mt.source),At=RegExp(xt.source),kt=/<%-([\s\S]+?)%>/g,Ot=/<%([\s\S]+?)%>/g,It=/<%=([\s\S]+?)%>/g,Rt=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,zt=/^\w*$/,Et=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,St=/[\\^$.*+?()[\]{}|]/g,Wt=RegExp(St.source),Lt=/^\s+/,Ct=/\s/,Ut=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,Bt=/\{\n\/\* \[wrapped with (.+)\] \*/,Tt=/,? & /,$t=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,Dt=/[()=,{}\[\]\/\s]/,Mt=/\\(\\)?/g,Ft=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,Nt=/\w*$/,Pt=/^[-+]0x[0-9a-f]+$/i,qt=/^0b[01]+$/i,Zt=/^\[object .+?Constructor\]$/,Kt=/^0o[0-7]+$/i,Vt=/^(?:0|[1-9]\d*)$/,Gt=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,Ht=/($^)/,Jt=/['\n\r\u2028\u2029\\]/g,Yt="\\ud800-\\udfff",Qt="\\u0300-\\u036f",Xt="\\ufe20-\\ufe2f",nr="\\u20d0-\\u20ff",tr=Qt+Xt+nr,rr="\\u2700-\\u27bf",er="a-z\\xdf-\\xf6\\xf8-\\xff",ur="\\xac\\xb1\\xd7\\xf7",ir="\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",or="\\u2000-\\u206f",fr=" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",cr="A-Z\\xc0-\\xd6\\xd8-\\xde",ar="\\ufe0e\\ufe0f",lr=ur+ir+or+fr,sr="['\u2019]",hr="["+Yt+"]",pr="["+lr+"]",_r="["+tr+"]",vr="\\d+",gr="["+rr+"]",yr="["+er+"]",dr="[^"+Yt+lr+vr+rr+er+cr+"]",br="\\ud83c[\\udffb-\\udfff]",wr="(?:"+_r+"|"+br+")",mr="[^"+Yt+"]",xr="(?:\\ud83c[\\udde6-\\uddff]){2}",jr="[\\ud800-\\udbff][\\udc00-\\udfff]",Ar="["+cr+"]",kr="\\u200d",Or="(?:"+yr+"|"+dr+")",Ir="(?:"+Ar+"|"+dr+")",Rr="(?:"+sr+"(?:d|ll|m|re|s|t|ve))?",zr="(?:"+sr+"(?:D|LL|M|RE|S|T|VE))?",Er=wr+"?",Sr="["+ar+"]?",Wr="(?:"+kr+"(?:"+[mr,xr,jr].join("|")+")"+Sr+Er+")*",Lr="\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",Cr="\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",Ur=Sr+Er+Wr,Br="(?:"+[gr,xr,jr].join("|")+")"+Ur,Tr="(?:"+[mr+_r+"?",_r,xr,jr,hr].join("|")+")",$r=RegExp(sr,"g"),Dr=RegExp(_r,"g"),Mr=RegExp(br+"(?="+br+")|"+Tr+Ur,"g"),Fr=RegExp([Ar+"?"+yr+"+"+Rr+"(?="+[pr,Ar,"$"].join("|")+")",Ir+"+"+zr+"(?="+[pr,Ar+Or,"$"].join("|")+")",Ar+"?"+Or+"+"+Rr,Ar+"+"+zr,Cr,Lr,vr,Br].join("|"),"g"),Nr=RegExp("["+kr+Yt+tr+ar+"]"),Pr=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,qr=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],Zr=-1,Kr={};
Kr[at]=Kr[lt]=Kr[st]=Kr[ht]=Kr[pt]=Kr[_t]=Kr[vt]=Kr[gt]=Kr[yt]=!0,Kr[Dn]=Kr[Mn]=Kr[ft]=Kr[Nn]=Kr[ct]=Kr[Pn]=Kr[Zn]=Kr[Kn]=Kr[Gn]=Kr[Hn]=Kr[Yn]=Kr[nt]=Kr[tt]=Kr[rt]=Kr[it]=!1;var Vr={};Vr[Dn]=Vr[Mn]=Vr[ft]=Vr[ct]=Vr[Nn]=Vr[Pn]=Vr[at]=Vr[lt]=Vr[st]=Vr[ht]=Vr[pt]=Vr[Gn]=Vr[Hn]=Vr[Yn]=Vr[nt]=Vr[tt]=Vr[rt]=Vr[et]=Vr[_t]=Vr[vt]=Vr[gt]=Vr[yt]=!0,Vr[Zn]=Vr[Kn]=Vr[it]=!1;var Gr={"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A","\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a",
"\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u","\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae",
"\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss","\u0100":"A","\u0102":"A","\u0104":"A","\u0101":"a","\u0103":"a","\u0105":"a","\u0106":"C","\u0108":"C","\u010a":"C","\u010c":"C","\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\u010e":"D","\u0110":"D","\u010f":"d","\u0111":"d","\u0112":"E","\u0114":"E","\u0116":"E","\u0118":"E","\u011a":"E","\u0113":"e","\u0115":"e","\u0117":"e","\u0119":"e","\u011b":"e","\u011c":"G","\u011e":"G","\u0120":"G","\u0122":"G","\u011d":"g","\u011f":"g","\u0121":"g",
"\u0123":"g","\u0124":"H","\u0126":"H","\u0125":"h","\u0127":"h","\u0128":"I","\u012a":"I","\u012c":"I","\u012e":"I","\u0130":"I","\u0129":"i","\u012b":"i","\u012d":"i","\u012f":"i","\u0131":"i","\u0134":"J","\u0135":"j","\u0136":"K","\u0137":"k","\u0138":"k","\u0139":"L","\u013b":"L","\u013d":"L","\u013f":"L","\u0141":"L","\u013a":"l","\u013c":"l","\u013e":"l","\u0140":"l","\u0142":"l","\u0143":"N","\u0145":"N","\u0147":"N","\u014a":"N","\u0144":"n","\u0146":"n","\u0148":"n","\u014b":"n","\u014c":"O",
"\u014e":"O","\u0150":"O","\u014d":"o","\u014f":"o","\u0151":"o","\u0154":"R","\u0156":"R","\u0158":"R","\u0155":"r","\u0157":"r","\u0159":"r","\u015a":"S","\u015c":"S","\u015e":"S","\u0160":"S","\u015b":"s","\u015d":"s","\u015f":"s","\u0161":"s","\u0162":"T","\u0164":"T","\u0166":"T","\u0163":"t","\u0165":"t","\u0167":"t","\u0168":"U","\u016a":"U","\u016c":"U","\u016e":"U","\u0170":"U","\u0172":"U","\u0169":"u","\u016b":"u","\u016d":"u","\u016f":"u","\u0171":"u","\u0173":"u","\u0174":"W","\u0175":"w",
"\u0176":"Y","\u0177":"y","\u0178":"Y","\u0179":"Z","\u017b":"Z","\u017d":"Z","\u017a":"z","\u017c":"z","\u017e":"z","\u0132":"IJ","\u0133":"ij","\u0152":"Oe","\u0153":"oe","\u0149":"'n","\u017f":"s"},Hr={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Jr={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},Yr={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Qr=parseFloat,Xr=parseInt,ne="object"==typeof global&&global&&global.Object===Object&&global,te="object"==typeof self&&self&&self.Object===Object&&self,re=ne||te||Function("return this")(),ee= true&&exports&&!exports.nodeType&&exports,ue=ee&&"object"=="object"&&module&&!module.nodeType&&module,ie=ue&&ue.exports===ee,oe=ie&&ne.process,fe=function(){
try{var n=ue&&ue.require&&ue.require("util").types;return n?n:oe&&oe.binding&&oe.binding("util")}catch(n){}}(),ce=fe&&fe.isArrayBuffer,ae=fe&&fe.isDate,le=fe&&fe.isMap,se=fe&&fe.isRegExp,he=fe&&fe.isSet,pe=fe&&fe.isTypedArray,_e=m("length"),ve=x(Gr),ge=x(Hr),ye=x(Jr),de=function p(x){function Z(n){if(cc(n)&&!bh(n)&&!(n instanceof Ct)){if(n instanceof Y)return n;if(bl.call(n,"__wrapped__"))return eo(n)}return new Y(n)}function J(){}function Y(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t,
this.__index__=0,this.__values__=X}function Ct(n){this.__wrapped__=n,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=Un,this.__views__=[]}function $t(){var n=new Ct(this.__wrapped__);return n.__actions__=Tu(this.__actions__),n.__dir__=this.__dir__,n.__filtered__=this.__filtered__,n.__iteratees__=Tu(this.__iteratees__),n.__takeCount__=this.__takeCount__,n.__views__=Tu(this.__views__),n}function Yt(){if(this.__filtered__){var n=new Ct(this);n.__dir__=-1,
n.__filtered__=!0}else n=this.clone(),n.__dir__*=-1;return n}function Qt(){var n=this.__wrapped__.value(),t=this.__dir__,r=bh(n),e=t<0,u=r?n.length:0,i=Oi(0,u,this.__views__),o=i.start,f=i.end,c=f-o,a=e?f:o-1,l=this.__iteratees__,s=l.length,h=0,p=Hl(c,this.__takeCount__);if(!r||!e&&u==c&&p==c)return wu(n,this.__actions__);var _=[];n:for(;c--&&h<p;){a+=t;for(var v=-1,g=n[a];++v<s;){var y=l[v],d=y.iteratee,b=y.type,w=d(g);if(b==zn)g=w;else if(!w){if(b==Rn)continue n;break n}}_[h++]=g}return _}function Xt(n){
var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function nr(){this.__data__=is?is(null):{},this.size=0}function tr(n){var t=this.has(n)&&delete this.__data__[n];return this.size-=t?1:0,t}function rr(n){var t=this.__data__;if(is){var r=t[n];return r===on?X:r}return bl.call(t,n)?t[n]:X}function er(n){var t=this.__data__;return is?t[n]!==X:bl.call(t,n)}function ur(n,t){var r=this.__data__;return this.size+=this.has(n)?0:1,r[n]=is&&t===X?on:t,this}function ir(n){
var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){var e=n[t];this.set(e[0],e[1])}}function or(){this.__data__=[],this.size=0}function fr(n){var t=this.__data__,r=Wr(t,n);return!(r<0)&&(r==t.length-1?t.pop():Ll.call(t,r,1),--this.size,!0)}function cr(n){var t=this.__data__,r=Wr(t,n);return r<0?X:t[r][1]}function ar(n){return Wr(this.__data__,n)>-1}function lr(n,t){var r=this.__data__,e=Wr(r,n);return e<0?(++this.size,r.push([n,t])):r[e][1]=t,this}function sr(n){var t=-1,r=null==n?0:n.length;for(this.clear();++t<r;){
var e=n[t];this.set(e[0],e[1])}}function hr(){this.size=0,this.__data__={hash:new Xt,map:new(ts||ir),string:new Xt}}function pr(n){var t=xi(this,n).delete(n);return this.size-=t?1:0,t}function _r(n){return xi(this,n).get(n)}function vr(n){return xi(this,n).has(n)}function gr(n,t){var r=xi(this,n),e=r.size;return r.set(n,t),this.size+=r.size==e?0:1,this}function yr(n){var t=-1,r=null==n?0:n.length;for(this.__data__=new sr;++t<r;)this.add(n[t])}function dr(n){return this.__data__.set(n,on),this}function br(n){
return this.__data__.has(n)}function wr(n){this.size=(this.__data__=new ir(n)).size}function mr(){this.__data__=new ir,this.size=0}function xr(n){var t=this.__data__,r=t.delete(n);return this.size=t.size,r}function jr(n){return this.__data__.get(n)}function Ar(n){return this.__data__.has(n)}function kr(n,t){var r=this.__data__;if(r instanceof ir){var e=r.__data__;if(!ts||e.length<tn-1)return e.push([n,t]),this.size=++r.size,this;r=this.__data__=new sr(e)}return r.set(n,t),this.size=r.size,this}function Or(n,t){
var r=bh(n),e=!r&&dh(n),u=!r&&!e&&mh(n),i=!r&&!e&&!u&&Oh(n),o=r||e||u||i,f=o?O(n.length,hl):[],c=f.length;for(var a in n)!t&&!bl.call(n,a)||o&&("length"==a||u&&("offset"==a||"parent"==a)||i&&("buffer"==a||"byteLength"==a||"byteOffset"==a)||Ci(a,c))||f.push(a);return f}function Ir(n){var t=n.length;return t?n[tu(0,t-1)]:X}function Rr(n,t){return Xi(Tu(n),Mr(t,0,n.length))}function zr(n){return Xi(Tu(n))}function Er(n,t,r){(r===X||Gf(n[t],r))&&(r!==X||t in n)||Br(n,t,r)}function Sr(n,t,r){var e=n[t];
bl.call(n,t)&&Gf(e,r)&&(r!==X||t in n)||Br(n,t,r)}function Wr(n,t){for(var r=n.length;r--;)if(Gf(n[r][0],t))return r;return-1}function Lr(n,t,r,e){return ys(n,function(n,u,i){t(e,n,r(n),i)}),e}function Cr(n,t){return n&&$u(t,Pc(t),n)}function Ur(n,t){return n&&$u(t,qc(t),n)}function Br(n,t,r){"__proto__"==t&&Tl?Tl(n,t,{configurable:!0,enumerable:!0,value:r,writable:!0}):n[t]=r}function Tr(n,t){for(var r=-1,e=t.length,u=il(e),i=null==n;++r<e;)u[r]=i?X:Mc(n,t[r]);return u}function Mr(n,t,r){return n===n&&(r!==X&&(n=n<=r?n:r),
t!==X&&(n=n>=t?n:t)),n}function Fr(n,t,e,u,i,o){var f,c=t&an,a=t&ln,l=t&sn;if(e&&(f=i?e(n,u,i,o):e(n)),f!==X)return f;if(!fc(n))return n;var s=bh(n);if(s){if(f=zi(n),!c)return Tu(n,f)}else{var h=zs(n),p=h==Kn||h==Vn;if(mh(n))return Iu(n,c);if(h==Yn||h==Dn||p&&!i){if(f=a||p?{}:Ei(n),!c)return a?Mu(n,Ur(f,n)):Du(n,Cr(f,n))}else{if(!Vr[h])return i?n:{};f=Si(n,h,c)}}o||(o=new wr);var _=o.get(n);if(_)return _;o.set(n,f),kh(n)?n.forEach(function(r){f.add(Fr(r,t,e,r,n,o))}):jh(n)&&n.forEach(function(r,u){
f.set(u,Fr(r,t,e,u,n,o))});var v=l?a?di:yi:a?qc:Pc,g=s?X:v(n);return r(g||n,function(r,u){g&&(u=r,r=n[u]),Sr(f,u,Fr(r,t,e,u,n,o))}),f}function Nr(n){var t=Pc(n);return function(r){return Pr(r,n,t)}}function Pr(n,t,r){var e=r.length;if(null==n)return!e;for(n=ll(n);e--;){var u=r[e],i=t[u],o=n[u];if(o===X&&!(u in n)||!i(o))return!1}return!0}function Gr(n,t,r){if("function"!=typeof n)throw new pl(en);return Ws(function(){n.apply(X,r)},t)}function Hr(n,t,r,e){var u=-1,i=o,a=!0,l=n.length,s=[],h=t.length;
if(!l)return s;r&&(t=c(t,z(r))),e?(i=f,a=!1):t.length>=tn&&(i=S,a=!1,t=new yr(t));n:for(;++u<l;){var p=n[u],_=null==r?p:r(p);if(p=e||0!==p?p:0,a&&_===_){for(var v=h;v--;)if(t[v]===_)continue n;s.push(p)}else i(t,_,e)||s.push(p)}return s}function Jr(n,t){var r=!0;return ys(n,function(n,e,u){return r=!!t(n,e,u)}),r}function Yr(n,t,r){for(var e=-1,u=n.length;++e<u;){var i=n[e],o=t(i);if(null!=o&&(f===X?o===o&&!bc(o):r(o,f)))var f=o,c=i}return c}function ne(n,t,r,e){var u=n.length;for(r=kc(r),r<0&&(r=-r>u?0:u+r),
e=e===X||e>u?u:kc(e),e<0&&(e+=u),e=r>e?0:Oc(e);r<e;)n[r++]=t;return n}function te(n,t){var r=[];return ys(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function ee(n,t,r,e,u){var i=-1,o=n.length;for(r||(r=Li),u||(u=[]);++i<o;){var f=n[i];t>0&&r(f)?t>1?ee(f,t-1,r,e,u):a(u,f):e||(u[u.length]=f)}return u}function ue(n,t){return n&&bs(n,t,Pc)}function oe(n,t){return n&&ws(n,t,Pc)}function fe(n,t){return i(t,function(t){return uc(n[t])})}function _e(n,t){t=ku(t,n);for(var r=0,e=t.length;null!=n&&r<e;)n=n[no(t[r++])];
return r&&r==e?n:X}function de(n,t,r){var e=t(n);return bh(n)?e:a(e,r(n))}function we(n){return null==n?n===X?ut:Jn:Bl&&Bl in ll(n)?ki(n):Ki(n)}function me(n,t){return n>t}function xe(n,t){return null!=n&&bl.call(n,t)}function je(n,t){return null!=n&&t in ll(n)}function Ae(n,t,r){return n>=Hl(t,r)&&n<Gl(t,r)}function ke(n,t,r){for(var e=r?f:o,u=n[0].length,i=n.length,a=i,l=il(i),s=1/0,h=[];a--;){var p=n[a];a&&t&&(p=c(p,z(t))),s=Hl(p.length,s),l[a]=!r&&(t||u>=120&&p.length>=120)?new yr(a&&p):X}p=n[0];
var _=-1,v=l[0];n:for(;++_<u&&h.length<s;){var g=p[_],y=t?t(g):g;if(g=r||0!==g?g:0,!(v?S(v,y):e(h,y,r))){for(a=i;--a;){var d=l[a];if(!(d?S(d,y):e(n[a],y,r)))continue n}v&&v.push(y),h.push(g)}}return h}function Oe(n,t,r,e){return ue(n,function(n,u,i){t(e,r(n),u,i)}),e}function Ie(t,r,e){r=ku(r,t),t=Gi(t,r);var u=null==t?t:t[no(jo(r))];return null==u?X:n(u,t,e)}function Re(n){return cc(n)&&we(n)==Dn}function ze(n){return cc(n)&&we(n)==ft}function Ee(n){return cc(n)&&we(n)==Pn}function Se(n,t,r,e,u){
return n===t||(null==n||null==t||!cc(n)&&!cc(t)?n!==n&&t!==t:We(n,t,r,e,Se,u))}function We(n,t,r,e,u,i){var o=bh(n),f=bh(t),c=o?Mn:zs(n),a=f?Mn:zs(t);c=c==Dn?Yn:c,a=a==Dn?Yn:a;var l=c==Yn,s=a==Yn,h=c==a;if(h&&mh(n)){if(!mh(t))return!1;o=!0,l=!1}if(h&&!l)return i||(i=new wr),o||Oh(n)?pi(n,t,r,e,u,i):_i(n,t,c,r,e,u,i);if(!(r&hn)){var p=l&&bl.call(n,"__wrapped__"),_=s&&bl.call(t,"__wrapped__");if(p||_){var v=p?n.value():n,g=_?t.value():t;return i||(i=new wr),u(v,g,r,e,i)}}return!!h&&(i||(i=new wr),vi(n,t,r,e,u,i));
}function Le(n){return cc(n)&&zs(n)==Gn}function Ce(n,t,r,e){var u=r.length,i=u,o=!e;if(null==n)return!i;for(n=ll(n);u--;){var f=r[u];if(o&&f[2]?f[1]!==n[f[0]]:!(f[0]in n))return!1}for(;++u<i;){f=r[u];var c=f[0],a=n[c],l=f[1];if(o&&f[2]){if(a===X&&!(c in n))return!1}else{var s=new wr;if(e)var h=e(a,l,c,n,t,s);if(!(h===X?Se(l,a,hn|pn,e,s):h))return!1}}return!0}function Ue(n){return!(!fc(n)||Di(n))&&(uc(n)?kl:Zt).test(to(n))}function Be(n){return cc(n)&&we(n)==nt}function Te(n){return cc(n)&&zs(n)==tt;
}function $e(n){return cc(n)&&oc(n.length)&&!!Kr[we(n)]}function De(n){return"function"==typeof n?n:null==n?La:"object"==typeof n?bh(n)?Ze(n[0],n[1]):qe(n):Fa(n)}function Me(n){if(!Mi(n))return Vl(n);var t=[];for(var r in ll(n))bl.call(n,r)&&"constructor"!=r&&t.push(r);return t}function Fe(n){if(!fc(n))return Zi(n);var t=Mi(n),r=[];for(var e in n)("constructor"!=e||!t&&bl.call(n,e))&&r.push(e);return r}function Ne(n,t){return n<t}function Pe(n,t){var r=-1,e=Hf(n)?il(n.length):[];return ys(n,function(n,u,i){
e[++r]=t(n,u,i)}),e}function qe(n){var t=ji(n);return 1==t.length&&t[0][2]?Ni(t[0][0],t[0][1]):function(r){return r===n||Ce(r,n,t)}}function Ze(n,t){return Bi(n)&&Fi(t)?Ni(no(n),t):function(r){var e=Mc(r,n);return e===X&&e===t?Nc(r,n):Se(t,e,hn|pn)}}function Ke(n,t,r,e,u){n!==t&&bs(t,function(i,o){if(u||(u=new wr),fc(i))Ve(n,t,o,r,Ke,e,u);else{var f=e?e(Ji(n,o),i,o+"",n,t,u):X;f===X&&(f=i),Er(n,o,f)}},qc)}function Ve(n,t,r,e,u,i,o){var f=Ji(n,r),c=Ji(t,r),a=o.get(c);if(a)return Er(n,r,a),X;var l=i?i(f,c,r+"",n,t,o):X,s=l===X;
if(s){var h=bh(c),p=!h&&mh(c),_=!h&&!p&&Oh(c);l=c,h||p||_?bh(f)?l=f:Jf(f)?l=Tu(f):p?(s=!1,l=Iu(c,!0)):_?(s=!1,l=Wu(c,!0)):l=[]:gc(c)||dh(c)?(l=f,dh(f)?l=Rc(f):fc(f)&&!uc(f)||(l=Ei(c))):s=!1}s&&(o.set(c,l),u(l,c,e,i,o),o.delete(c)),Er(n,r,l)}function Ge(n,t){var r=n.length;if(r)return t+=t<0?r:0,Ci(t,r)?n[t]:X}function He(n,t,r){t=t.length?c(t,function(n){return bh(n)?function(t){return _e(t,1===n.length?n[0]:n)}:n}):[La];var e=-1;return t=c(t,z(mi())),A(Pe(n,function(n,r,u){return{criteria:c(t,function(t){
return t(n)}),index:++e,value:n}}),function(n,t){return Cu(n,t,r)})}function Je(n,t){return Ye(n,t,function(t,r){return Nc(n,r)})}function Ye(n,t,r){for(var e=-1,u=t.length,i={};++e<u;){var o=t[e],f=_e(n,o);r(f,o)&&fu(i,ku(o,n),f)}return i}function Qe(n){return function(t){return _e(t,n)}}function Xe(n,t,r,e){var u=e?d:y,i=-1,o=t.length,f=n;for(n===t&&(t=Tu(t)),r&&(f=c(n,z(r)));++i<o;)for(var a=0,l=t[i],s=r?r(l):l;(a=u(f,s,a,e))>-1;)f!==n&&Ll.call(f,a,1),Ll.call(n,a,1);return n}function nu(n,t){for(var r=n?t.length:0,e=r-1;r--;){
var u=t[r];if(r==e||u!==i){var i=u;Ci(u)?Ll.call(n,u,1):yu(n,u)}}return n}function tu(n,t){return n+Nl(Ql()*(t-n+1))}function ru(n,t,r,e){for(var u=-1,i=Gl(Fl((t-n)/(r||1)),0),o=il(i);i--;)o[e?i:++u]=n,n+=r;return o}function eu(n,t){var r="";if(!n||t<1||t>Wn)return r;do t%2&&(r+=n),t=Nl(t/2),t&&(n+=n);while(t);return r}function uu(n,t){return Ls(Vi(n,t,La),n+"")}function iu(n){return Ir(ra(n))}function ou(n,t){var r=ra(n);return Xi(r,Mr(t,0,r.length))}function fu(n,t,r,e){if(!fc(n))return n;t=ku(t,n);
for(var u=-1,i=t.length,o=i-1,f=n;null!=f&&++u<i;){var c=no(t[u]),a=r;if("__proto__"===c||"constructor"===c||"prototype"===c)return n;if(u!=o){var l=f[c];a=e?e(l,c,f):X,a===X&&(a=fc(l)?l:Ci(t[u+1])?[]:{})}Sr(f,c,a),f=f[c]}return n}function cu(n){return Xi(ra(n))}function au(n,t,r){var e=-1,u=n.length;t<0&&(t=-t>u?0:u+t),r=r>u?u:r,r<0&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0;for(var i=il(u);++e<u;)i[e]=n[e+t];return i}function lu(n,t){var r;return ys(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function su(n,t,r){
var e=0,u=null==n?e:n.length;if("number"==typeof t&&t===t&&u<=Tn){for(;e<u;){var i=e+u>>>1,o=n[i];null!==o&&!bc(o)&&(r?o<=t:o<t)?e=i+1:u=i}return u}return hu(n,t,La,r)}function hu(n,t,r,e){var u=0,i=null==n?0:n.length;if(0===i)return 0;t=r(t);for(var o=t!==t,f=null===t,c=bc(t),a=t===X;u<i;){var l=Nl((u+i)/2),s=r(n[l]),h=s!==X,p=null===s,_=s===s,v=bc(s);if(o)var g=e||_;else g=a?_&&(e||h):f?_&&h&&(e||!p):c?_&&h&&!p&&(e||!v):!p&&!v&&(e?s<=t:s<t);g?u=l+1:i=l}return Hl(i,Bn)}function pu(n,t){for(var r=-1,e=n.length,u=0,i=[];++r<e;){
var o=n[r],f=t?t(o):o;if(!r||!Gf(f,c)){var c=f;i[u++]=0===o?0:o}}return i}function _u(n){return"number"==typeof n?n:bc(n)?Cn:+n}function vu(n){if("string"==typeof n)return n;if(bh(n))return c(n,vu)+"";if(bc(n))return vs?vs.call(n):"";var t=n+"";return"0"==t&&1/n==-Sn?"-0":t}function gu(n,t,r){var e=-1,u=o,i=n.length,c=!0,a=[],l=a;if(r)c=!1,u=f;else if(i>=tn){var s=t?null:ks(n);if(s)return P(s);c=!1,u=S,l=new yr}else l=t?[]:a;n:for(;++e<i;){var h=n[e],p=t?t(h):h;if(h=r||0!==h?h:0,c&&p===p){for(var _=l.length;_--;)if(l[_]===p)continue n;
t&&l.push(p),a.push(h)}else u(l,p,r)||(l!==a&&l.push(p),a.push(h))}return a}function yu(n,t){return t=ku(t,n),n=Gi(n,t),null==n||delete n[no(jo(t))]}function du(n,t,r,e){return fu(n,t,r(_e(n,t)),e)}function bu(n,t,r,e){for(var u=n.length,i=e?u:-1;(e?i--:++i<u)&&t(n[i],i,n););return r?au(n,e?0:i,e?i+1:u):au(n,e?i+1:0,e?u:i)}function wu(n,t){var r=n;return r instanceof Ct&&(r=r.value()),l(t,function(n,t){return t.func.apply(t.thisArg,a([n],t.args))},r)}function mu(n,t,r){var e=n.length;if(e<2)return e?gu(n[0]):[];
for(var u=-1,i=il(e);++u<e;)for(var o=n[u],f=-1;++f<e;)f!=u&&(i[u]=Hr(i[u]||o,n[f],t,r));return gu(ee(i,1),t,r)}function xu(n,t,r){for(var e=-1,u=n.length,i=t.length,o={};++e<u;){r(o,n[e],e<i?t[e]:X)}return o}function ju(n){return Jf(n)?n:[]}function Au(n){return"function"==typeof n?n:La}function ku(n,t){return bh(n)?n:Bi(n,t)?[n]:Cs(Ec(n))}function Ou(n,t,r){var e=n.length;return r=r===X?e:r,!t&&r>=e?n:au(n,t,r)}function Iu(n,t){if(t)return n.slice();var r=n.length,e=zl?zl(r):new n.constructor(r);
return n.copy(e),e}function Ru(n){var t=new n.constructor(n.byteLength);return new Rl(t).set(new Rl(n)),t}function zu(n,t){return new n.constructor(t?Ru(n.buffer):n.buffer,n.byteOffset,n.byteLength)}function Eu(n){var t=new n.constructor(n.source,Nt.exec(n));return t.lastIndex=n.lastIndex,t}function Su(n){return _s?ll(_s.call(n)):{}}function Wu(n,t){return new n.constructor(t?Ru(n.buffer):n.buffer,n.byteOffset,n.length)}function Lu(n,t){if(n!==t){var r=n!==X,e=null===n,u=n===n,i=bc(n),o=t!==X,f=null===t,c=t===t,a=bc(t);
if(!f&&!a&&!i&&n>t||i&&o&&c&&!f&&!a||e&&o&&c||!r&&c||!u)return 1;if(!e&&!i&&!a&&n<t||a&&r&&u&&!e&&!i||f&&r&&u||!o&&u||!c)return-1}return 0}function Cu(n,t,r){for(var e=-1,u=n.criteria,i=t.criteria,o=u.length,f=r.length;++e<o;){var c=Lu(u[e],i[e]);if(c){if(e>=f)return c;return c*("desc"==r[e]?-1:1)}}return n.index-t.index}function Uu(n,t,r,e){for(var u=-1,i=n.length,o=r.length,f=-1,c=t.length,a=Gl(i-o,0),l=il(c+a),s=!e;++f<c;)l[f]=t[f];for(;++u<o;)(s||u<i)&&(l[r[u]]=n[u]);for(;a--;)l[f++]=n[u++];return l;
}function Bu(n,t,r,e){for(var u=-1,i=n.length,o=-1,f=r.length,c=-1,a=t.length,l=Gl(i-f,0),s=il(l+a),h=!e;++u<l;)s[u]=n[u];for(var p=u;++c<a;)s[p+c]=t[c];for(;++o<f;)(h||u<i)&&(s[p+r[o]]=n[u++]);return s}function Tu(n,t){var r=-1,e=n.length;for(t||(t=il(e));++r<e;)t[r]=n[r];return t}function $u(n,t,r,e){var u=!r;r||(r={});for(var i=-1,o=t.length;++i<o;){var f=t[i],c=e?e(r[f],n[f],f,r,n):X;c===X&&(c=n[f]),u?Br(r,f,c):Sr(r,f,c)}return r}function Du(n,t){return $u(n,Is(n),t)}function Mu(n,t){return $u(n,Rs(n),t);
}function Fu(n,r){return function(e,u){var i=bh(e)?t:Lr,o=r?r():{};return i(e,n,mi(u,2),o)}}function Nu(n){return uu(function(t,r){var e=-1,u=r.length,i=u>1?r[u-1]:X,o=u>2?r[2]:X;for(i=n.length>3&&"function"==typeof i?(u--,i):X,o&&Ui(r[0],r[1],o)&&(i=u<3?X:i,u=1),t=ll(t);++e<u;){var f=r[e];f&&n(t,f,e,i)}return t})}function Pu(n,t){return function(r,e){if(null==r)return r;if(!Hf(r))return n(r,e);for(var u=r.length,i=t?u:-1,o=ll(r);(t?i--:++i<u)&&e(o[i],i,o)!==!1;);return r}}function qu(n){return function(t,r,e){
for(var u=-1,i=ll(t),o=e(t),f=o.length;f--;){var c=o[n?f:++u];if(r(i[c],c,i)===!1)break}return t}}function Zu(n,t,r){function e(){return(this&&this!==re&&this instanceof e?i:n).apply(u?r:this,arguments)}var u=t&_n,i=Gu(n);return e}function Ku(n){return function(t){t=Ec(t);var r=T(t)?G(t):X,e=r?r[0]:t.charAt(0),u=r?Ou(r,1).join(""):t.slice(1);return e[n]()+u}}function Vu(n){return function(t){return l(Ra(ca(t).replace($r,"")),n,"")}}function Gu(n){return function(){var t=arguments;switch(t.length){
case 0:return new n;case 1:return new n(t[0]);case 2:return new n(t[0],t[1]);case 3:return new n(t[0],t[1],t[2]);case 4:return new n(t[0],t[1],t[2],t[3]);case 5:return new n(t[0],t[1],t[2],t[3],t[4]);case 6:return new n(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new n(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var r=gs(n.prototype),e=n.apply(r,t);return fc(e)?e:r}}function Hu(t,r,e){function u(){for(var o=arguments.length,f=il(o),c=o,a=wi(u);c--;)f[c]=arguments[c];var l=o<3&&f[0]!==a&&f[o-1]!==a?[]:N(f,a);
return o-=l.length,o<e?oi(t,r,Qu,u.placeholder,X,f,l,X,X,e-o):n(this&&this!==re&&this instanceof u?i:t,this,f)}var i=Gu(t);return u}function Ju(n){return function(t,r,e){var u=ll(t);if(!Hf(t)){var i=mi(r,3);t=Pc(t),r=function(n){return i(u[n],n,u)}}var o=n(t,r,e);return o>-1?u[i?t[o]:o]:X}}function Yu(n){return gi(function(t){var r=t.length,e=r,u=Y.prototype.thru;for(n&&t.reverse();e--;){var i=t[e];if("function"!=typeof i)throw new pl(en);if(u&&!o&&"wrapper"==bi(i))var o=new Y([],!0)}for(e=o?e:r;++e<r;){
i=t[e];var f=bi(i),c="wrapper"==f?Os(i):X;o=c&&$i(c[0])&&c[1]==(mn|yn|bn|xn)&&!c[4].length&&1==c[9]?o[bi(c[0])].apply(o,c[3]):1==i.length&&$i(i)?o[f]():o.thru(i)}return function(){var n=arguments,e=n[0];if(o&&1==n.length&&bh(e))return o.plant(e).value();for(var u=0,i=r?t[u].apply(this,n):e;++u<r;)i=t[u].call(this,i);return i}})}function Qu(n,t,r,e,u,i,o,f,c,a){function l(){for(var y=arguments.length,d=il(y),b=y;b--;)d[b]=arguments[b];if(_)var w=wi(l),m=C(d,w);if(e&&(d=Uu(d,e,u,_)),i&&(d=Bu(d,i,o,_)),
y-=m,_&&y<a){return oi(n,t,Qu,l.placeholder,r,d,N(d,w),f,c,a-y)}var x=h?r:this,j=p?x[n]:n;return y=d.length,f?d=Hi(d,f):v&&y>1&&d.reverse(),s&&c<y&&(d.length=c),this&&this!==re&&this instanceof l&&(j=g||Gu(j)),j.apply(x,d)}var s=t&mn,h=t&_n,p=t&vn,_=t&(yn|dn),v=t&jn,g=p?X:Gu(n);return l}function Xu(n,t){return function(r,e){return Oe(r,n,t(e),{})}}function ni(n,t){return function(r,e){var u;if(r===X&&e===X)return t;if(r!==X&&(u=r),e!==X){if(u===X)return e;"string"==typeof r||"string"==typeof e?(r=vu(r),
e=vu(e)):(r=_u(r),e=_u(e)),u=n(r,e)}return u}}function ti(t){return gi(function(r){return r=c(r,z(mi())),uu(function(e){var u=this;return t(r,function(t){return n(t,u,e)})})})}function ri(n,t){t=t===X?" ":vu(t);var r=t.length;if(r<2)return r?eu(t,n):t;var e=eu(t,Fl(n/V(t)));return T(t)?Ou(G(e),0,n).join(""):e.slice(0,n)}function ei(t,r,e,u){function i(){for(var r=-1,c=arguments.length,a=-1,l=u.length,s=il(l+c),h=this&&this!==re&&this instanceof i?f:t;++a<l;)s[a]=u[a];for(;c--;)s[a++]=arguments[++r];
return n(h,o?e:this,s)}var o=r&_n,f=Gu(t);return i}function ui(n){return function(t,r,e){return e&&"number"!=typeof e&&Ui(t,r,e)&&(r=e=X),t=Ac(t),r===X?(r=t,t=0):r=Ac(r),e=e===X?t<r?1:-1:Ac(e),ru(t,r,e,n)}}function ii(n){return function(t,r){return"string"==typeof t&&"string"==typeof r||(t=Ic(t),r=Ic(r)),n(t,r)}}function oi(n,t,r,e,u,i,o,f,c,a){var l=t&yn,s=l?o:X,h=l?X:o,p=l?i:X,_=l?X:i;t|=l?bn:wn,t&=~(l?wn:bn),t&gn||(t&=~(_n|vn));var v=[n,t,u,p,s,_,h,f,c,a],g=r.apply(X,v);return $i(n)&&Ss(g,v),g.placeholder=e,
Yi(g,n,t)}function fi(n){var t=al[n];return function(n,r){if(n=Ic(n),r=null==r?0:Hl(kc(r),292),r&&Zl(n)){var e=(Ec(n)+"e").split("e");return e=(Ec(t(e[0]+"e"+(+e[1]+r)))+"e").split("e"),+(e[0]+"e"+(+e[1]-r))}return t(n)}}function ci(n){return function(t){var r=zs(t);return r==Gn?M(t):r==tt?q(t):I(t,n(t))}}function ai(n,t,r,e,u,i,o,f){var c=t&vn;if(!c&&"function"!=typeof n)throw new pl(en);var a=e?e.length:0;if(a||(t&=~(bn|wn),e=u=X),o=o===X?o:Gl(kc(o),0),f=f===X?f:kc(f),a-=u?u.length:0,t&wn){var l=e,s=u;
e=u=X}var h=c?X:Os(n),p=[n,t,r,e,u,l,s,i,o,f];if(h&&qi(p,h),n=p[0],t=p[1],r=p[2],e=p[3],u=p[4],f=p[9]=p[9]===X?c?0:n.length:Gl(p[9]-a,0),!f&&t&(yn|dn)&&(t&=~(yn|dn)),t&&t!=_n)_=t==yn||t==dn?Hu(n,t,f):t!=bn&&t!=(_n|bn)||u.length?Qu.apply(X,p):ei(n,t,r,e);else var _=Zu(n,t,r);return Yi((h?ms:Ss)(_,p),n,t)}function li(n,t,r,e){return n===X||Gf(n,gl[r])&&!bl.call(e,r)?t:n}function si(n,t,r,e,u,i){return fc(n)&&fc(t)&&(i.set(t,n),Ke(n,t,X,si,i),i.delete(t)),n}function hi(n){return gc(n)?X:n}function pi(n,t,r,e,u,i){
var o=r&hn,f=n.length,c=t.length;if(f!=c&&!(o&&c>f))return!1;var a=i.get(n),l=i.get(t);if(a&&l)return a==t&&l==n;var s=-1,p=!0,_=r&pn?new yr:X;for(i.set(n,t),i.set(t,n);++s<f;){var v=n[s],g=t[s];if(e)var y=o?e(g,v,s,t,n,i):e(v,g,s,n,t,i);if(y!==X){if(y)continue;p=!1;break}if(_){if(!h(t,function(n,t){if(!S(_,t)&&(v===n||u(v,n,r,e,i)))return _.push(t)})){p=!1;break}}else if(v!==g&&!u(v,g,r,e,i)){p=!1;break}}return i.delete(n),i.delete(t),p}function _i(n,t,r,e,u,i,o){switch(r){case ct:if(n.byteLength!=t.byteLength||n.byteOffset!=t.byteOffset)return!1;
n=n.buffer,t=t.buffer;case ft:return!(n.byteLength!=t.byteLength||!i(new Rl(n),new Rl(t)));case Nn:case Pn:case Hn:return Gf(+n,+t);case Zn:return n.name==t.name&&n.message==t.message;case nt:case rt:return n==t+"";case Gn:var f=M;case tt:var c=e&hn;if(f||(f=P),n.size!=t.size&&!c)return!1;var a=o.get(n);if(a)return a==t;e|=pn,o.set(n,t);var l=pi(f(n),f(t),e,u,i,o);return o.delete(n),l;case et:if(_s)return _s.call(n)==_s.call(t)}return!1}function vi(n,t,r,e,u,i){var o=r&hn,f=yi(n),c=f.length;if(c!=yi(t).length&&!o)return!1;
for(var a=c;a--;){var l=f[a];if(!(o?l in t:bl.call(t,l)))return!1}var s=i.get(n),h=i.get(t);if(s&&h)return s==t&&h==n;var p=!0;i.set(n,t),i.set(t,n);for(var _=o;++a<c;){l=f[a];var v=n[l],g=t[l];if(e)var y=o?e(g,v,l,t,n,i):e(v,g,l,n,t,i);if(!(y===X?v===g||u(v,g,r,e,i):y)){p=!1;break}_||(_="constructor"==l)}if(p&&!_){var d=n.constructor,b=t.constructor;d!=b&&"constructor"in n&&"constructor"in t&&!("function"==typeof d&&d instanceof d&&"function"==typeof b&&b instanceof b)&&(p=!1)}return i.delete(n),
i.delete(t),p}function gi(n){return Ls(Vi(n,X,_o),n+"")}function yi(n){return de(n,Pc,Is)}function di(n){return de(n,qc,Rs)}function bi(n){for(var t=n.name+"",r=fs[t],e=bl.call(fs,t)?r.length:0;e--;){var u=r[e],i=u.func;if(null==i||i==n)return u.name}return t}function wi(n){return(bl.call(Z,"placeholder")?Z:n).placeholder}function mi(){var n=Z.iteratee||Ca;return n=n===Ca?De:n,arguments.length?n(arguments[0],arguments[1]):n}function xi(n,t){var r=n.__data__;return Ti(t)?r["string"==typeof t?"string":"hash"]:r.map;
}function ji(n){for(var t=Pc(n),r=t.length;r--;){var e=t[r],u=n[e];t[r]=[e,u,Fi(u)]}return t}function Ai(n,t){var r=B(n,t);return Ue(r)?r:X}function ki(n){var t=bl.call(n,Bl),r=n[Bl];try{n[Bl]=X;var e=!0}catch(n){}var u=xl.call(n);return e&&(t?n[Bl]=r:delete n[Bl]),u}function Oi(n,t,r){for(var e=-1,u=r.length;++e<u;){var i=r[e],o=i.size;switch(i.type){case"drop":n+=o;break;case"dropRight":t-=o;break;case"take":t=Hl(t,n+o);break;case"takeRight":n=Gl(n,t-o)}}return{start:n,end:t}}function Ii(n){var t=n.match(Bt);
return t?t[1].split(Tt):[]}function Ri(n,t,r){t=ku(t,n);for(var e=-1,u=t.length,i=!1;++e<u;){var o=no(t[e]);if(!(i=null!=n&&r(n,o)))break;n=n[o]}return i||++e!=u?i:(u=null==n?0:n.length,!!u&&oc(u)&&Ci(o,u)&&(bh(n)||dh(n)))}function zi(n){var t=n.length,r=new n.constructor(t);return t&&"string"==typeof n[0]&&bl.call(n,"index")&&(r.index=n.index,r.input=n.input),r}function Ei(n){return"function"!=typeof n.constructor||Mi(n)?{}:gs(El(n))}function Si(n,t,r){var e=n.constructor;switch(t){case ft:return Ru(n);
case Nn:case Pn:return new e(+n);case ct:return zu(n,r);case at:case lt:case st:case ht:case pt:case _t:case vt:case gt:case yt:return Wu(n,r);case Gn:return new e;case Hn:case rt:return new e(n);case nt:return Eu(n);case tt:return new e;case et:return Su(n)}}function Wi(n,t){var r=t.length;if(!r)return n;var e=r-1;return t[e]=(r>1?"& ":"")+t[e],t=t.join(r>2?", ":" "),n.replace(Ut,"{\n/* [wrapped with "+t+"] */\n")}function Li(n){return bh(n)||dh(n)||!!(Cl&&n&&n[Cl])}function Ci(n,t){var r=typeof n;
return t=null==t?Wn:t,!!t&&("number"==r||"symbol"!=r&&Vt.test(n))&&n>-1&&n%1==0&&n<t}function Ui(n,t,r){if(!fc(r))return!1;var e=typeof t;return!!("number"==e?Hf(r)&&Ci(t,r.length):"string"==e&&t in r)&&Gf(r[t],n)}function Bi(n,t){if(bh(n))return!1;var r=typeof n;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=n&&!bc(n))||(zt.test(n)||!Rt.test(n)||null!=t&&n in ll(t))}function Ti(n){var t=typeof n;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==n:null===n}function $i(n){
var t=bi(n),r=Z[t];if("function"!=typeof r||!(t in Ct.prototype))return!1;if(n===r)return!0;var e=Os(r);return!!e&&n===e[0]}function Di(n){return!!ml&&ml in n}function Mi(n){var t=n&&n.constructor;return n===("function"==typeof t&&t.prototype||gl)}function Fi(n){return n===n&&!fc(n)}function Ni(n,t){return function(r){return null!=r&&(r[n]===t&&(t!==X||n in ll(r)))}}function Pi(n){var t=Cf(n,function(n){return r.size===fn&&r.clear(),n}),r=t.cache;return t}function qi(n,t){var r=n[1],e=t[1],u=r|e,i=u<(_n|vn|mn),o=e==mn&&r==yn||e==mn&&r==xn&&n[7].length<=t[8]||e==(mn|xn)&&t[7].length<=t[8]&&r==yn;
if(!i&&!o)return n;e&_n&&(n[2]=t[2],u|=r&_n?0:gn);var f=t[3];if(f){var c=n[3];n[3]=c?Uu(c,f,t[4]):f,n[4]=c?N(n[3],cn):t[4]}return f=t[5],f&&(c=n[5],n[5]=c?Bu(c,f,t[6]):f,n[6]=c?N(n[5],cn):t[6]),f=t[7],f&&(n[7]=f),e&mn&&(n[8]=null==n[8]?t[8]:Hl(n[8],t[8])),null==n[9]&&(n[9]=t[9]),n[0]=t[0],n[1]=u,n}function Zi(n){var t=[];if(null!=n)for(var r in ll(n))t.push(r);return t}function Ki(n){return xl.call(n)}function Vi(t,r,e){return r=Gl(r===X?t.length-1:r,0),function(){for(var u=arguments,i=-1,o=Gl(u.length-r,0),f=il(o);++i<o;)f[i]=u[r+i];
i=-1;for(var c=il(r+1);++i<r;)c[i]=u[i];return c[r]=e(f),n(t,this,c)}}function Gi(n,t){return t.length<2?n:_e(n,au(t,0,-1))}function Hi(n,t){for(var r=n.length,e=Hl(t.length,r),u=Tu(n);e--;){var i=t[e];n[e]=Ci(i,r)?u[i]:X}return n}function Ji(n,t){if(("constructor"!==t||"function"!=typeof n[t])&&"__proto__"!=t)return n[t]}function Yi(n,t,r){var e=t+"";return Ls(n,Wi(e,ro(Ii(e),r)))}function Qi(n){var t=0,r=0;return function(){var e=Jl(),u=In-(e-r);if(r=e,u>0){if(++t>=On)return arguments[0]}else t=0;
return n.apply(X,arguments)}}function Xi(n,t){var r=-1,e=n.length,u=e-1;for(t=t===X?e:t;++r<t;){var i=tu(r,u),o=n[i];n[i]=n[r],n[r]=o}return n.length=t,n}function no(n){if("string"==typeof n||bc(n))return n;var t=n+"";return"0"==t&&1/n==-Sn?"-0":t}function to(n){if(null!=n){try{return dl.call(n)}catch(n){}try{return n+""}catch(n){}}return""}function ro(n,t){return r($n,function(r){var e="_."+r[0];t&r[1]&&!o(n,e)&&n.push(e)}),n.sort()}function eo(n){if(n instanceof Ct)return n.clone();var t=new Y(n.__wrapped__,n.__chain__);
return t.__actions__=Tu(n.__actions__),t.__index__=n.__index__,t.__values__=n.__values__,t}function uo(n,t,r){t=(r?Ui(n,t,r):t===X)?1:Gl(kc(t),0);var e=null==n?0:n.length;if(!e||t<1)return[];for(var u=0,i=0,o=il(Fl(e/t));u<e;)o[i++]=au(n,u,u+=t);return o}function io(n){for(var t=-1,r=null==n?0:n.length,e=0,u=[];++t<r;){var i=n[t];i&&(u[e++]=i)}return u}function oo(){var n=arguments.length;if(!n)return[];for(var t=il(n-1),r=arguments[0],e=n;e--;)t[e-1]=arguments[e];return a(bh(r)?Tu(r):[r],ee(t,1));
}function fo(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===X?1:kc(t),au(n,t<0?0:t,e)):[]}function co(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===X?1:kc(t),t=e-t,au(n,0,t<0?0:t)):[]}function ao(n,t){return n&&n.length?bu(n,mi(t,3),!0,!0):[]}function lo(n,t){return n&&n.length?bu(n,mi(t,3),!0):[]}function so(n,t,r,e){var u=null==n?0:n.length;return u?(r&&"number"!=typeof r&&Ui(n,t,r)&&(r=0,e=u),ne(n,t,r,e)):[]}function ho(n,t,r){var e=null==n?0:n.length;if(!e)return-1;var u=null==r?0:kc(r);
return u<0&&(u=Gl(e+u,0)),g(n,mi(t,3),u)}function po(n,t,r){var e=null==n?0:n.length;if(!e)return-1;var u=e-1;return r!==X&&(u=kc(r),u=r<0?Gl(e+u,0):Hl(u,e-1)),g(n,mi(t,3),u,!0)}function _o(n){return(null==n?0:n.length)?ee(n,1):[]}function vo(n){return(null==n?0:n.length)?ee(n,Sn):[]}function go(n,t){return(null==n?0:n.length)?(t=t===X?1:kc(t),ee(n,t)):[]}function yo(n){for(var t=-1,r=null==n?0:n.length,e={};++t<r;){var u=n[t];e[u[0]]=u[1]}return e}function bo(n){return n&&n.length?n[0]:X}function wo(n,t,r){
var e=null==n?0:n.length;if(!e)return-1;var u=null==r?0:kc(r);return u<0&&(u=Gl(e+u,0)),y(n,t,u)}function mo(n){return(null==n?0:n.length)?au(n,0,-1):[]}function xo(n,t){return null==n?"":Kl.call(n,t)}function jo(n){var t=null==n?0:n.length;return t?n[t-1]:X}function Ao(n,t,r){var e=null==n?0:n.length;if(!e)return-1;var u=e;return r!==X&&(u=kc(r),u=u<0?Gl(e+u,0):Hl(u,e-1)),t===t?K(n,t,u):g(n,b,u,!0)}function ko(n,t){return n&&n.length?Ge(n,kc(t)):X}function Oo(n,t){return n&&n.length&&t&&t.length?Xe(n,t):n;
}function Io(n,t,r){return n&&n.length&&t&&t.length?Xe(n,t,mi(r,2)):n}function Ro(n,t,r){return n&&n.length&&t&&t.length?Xe(n,t,X,r):n}function zo(n,t){var r=[];if(!n||!n.length)return r;var e=-1,u=[],i=n.length;for(t=mi(t,3);++e<i;){var o=n[e];t(o,e,n)&&(r.push(o),u.push(e))}return nu(n,u),r}function Eo(n){return null==n?n:Xl.call(n)}function So(n,t,r){var e=null==n?0:n.length;return e?(r&&"number"!=typeof r&&Ui(n,t,r)?(t=0,r=e):(t=null==t?0:kc(t),r=r===X?e:kc(r)),au(n,t,r)):[]}function Wo(n,t){
return su(n,t)}function Lo(n,t,r){return hu(n,t,mi(r,2))}function Co(n,t){var r=null==n?0:n.length;if(r){var e=su(n,t);if(e<r&&Gf(n[e],t))return e}return-1}function Uo(n,t){return su(n,t,!0)}function Bo(n,t,r){return hu(n,t,mi(r,2),!0)}function To(n,t){if(null==n?0:n.length){var r=su(n,t,!0)-1;if(Gf(n[r],t))return r}return-1}function $o(n){return n&&n.length?pu(n):[]}function Do(n,t){return n&&n.length?pu(n,mi(t,2)):[]}function Mo(n){var t=null==n?0:n.length;return t?au(n,1,t):[]}function Fo(n,t,r){
return n&&n.length?(t=r||t===X?1:kc(t),au(n,0,t<0?0:t)):[]}function No(n,t,r){var e=null==n?0:n.length;return e?(t=r||t===X?1:kc(t),t=e-t,au(n,t<0?0:t,e)):[]}function Po(n,t){return n&&n.length?bu(n,mi(t,3),!1,!0):[]}function qo(n,t){return n&&n.length?bu(n,mi(t,3)):[]}function Zo(n){return n&&n.length?gu(n):[]}function Ko(n,t){return n&&n.length?gu(n,mi(t,2)):[]}function Vo(n,t){return t="function"==typeof t?t:X,n&&n.length?gu(n,X,t):[]}function Go(n){if(!n||!n.length)return[];var t=0;return n=i(n,function(n){
if(Jf(n))return t=Gl(n.length,t),!0}),O(t,function(t){return c(n,m(t))})}function Ho(t,r){if(!t||!t.length)return[];var e=Go(t);return null==r?e:c(e,function(t){return n(r,X,t)})}function Jo(n,t){return xu(n||[],t||[],Sr)}function Yo(n,t){return xu(n||[],t||[],fu)}function Qo(n){var t=Z(n);return t.__chain__=!0,t}function Xo(n,t){return t(n),n}function nf(n,t){return t(n)}function tf(){return Qo(this)}function rf(){return new Y(this.value(),this.__chain__)}function ef(){this.__values__===X&&(this.__values__=jc(this.value()));
var n=this.__index__>=this.__values__.length;return{done:n,value:n?X:this.__values__[this.__index__++]}}function uf(){return this}function of(n){for(var t,r=this;r instanceof J;){var e=eo(r);e.__index__=0,e.__values__=X,t?u.__wrapped__=e:t=e;var u=e;r=r.__wrapped__}return u.__wrapped__=n,t}function ff(){var n=this.__wrapped__;if(n instanceof Ct){var t=n;return this.__actions__.length&&(t=new Ct(this)),t=t.reverse(),t.__actions__.push({func:nf,args:[Eo],thisArg:X}),new Y(t,this.__chain__)}return this.thru(Eo);
}function cf(){return wu(this.__wrapped__,this.__actions__)}function af(n,t,r){var e=bh(n)?u:Jr;return r&&Ui(n,t,r)&&(t=X),e(n,mi(t,3))}function lf(n,t){return(bh(n)?i:te)(n,mi(t,3))}function sf(n,t){return ee(yf(n,t),1)}function hf(n,t){return ee(yf(n,t),Sn)}function pf(n,t,r){return r=r===X?1:kc(r),ee(yf(n,t),r)}function _f(n,t){return(bh(n)?r:ys)(n,mi(t,3))}function vf(n,t){return(bh(n)?e:ds)(n,mi(t,3))}function gf(n,t,r,e){n=Hf(n)?n:ra(n),r=r&&!e?kc(r):0;var u=n.length;return r<0&&(r=Gl(u+r,0)),
dc(n)?r<=u&&n.indexOf(t,r)>-1:!!u&&y(n,t,r)>-1}function yf(n,t){return(bh(n)?c:Pe)(n,mi(t,3))}function df(n,t,r,e){return null==n?[]:(bh(t)||(t=null==t?[]:[t]),r=e?X:r,bh(r)||(r=null==r?[]:[r]),He(n,t,r))}function bf(n,t,r){var e=bh(n)?l:j,u=arguments.length<3;return e(n,mi(t,4),r,u,ys)}function wf(n,t,r){var e=bh(n)?s:j,u=arguments.length<3;return e(n,mi(t,4),r,u,ds)}function mf(n,t){return(bh(n)?i:te)(n,Uf(mi(t,3)))}function xf(n){return(bh(n)?Ir:iu)(n)}function jf(n,t,r){return t=(r?Ui(n,t,r):t===X)?1:kc(t),
(bh(n)?Rr:ou)(n,t)}function Af(n){return(bh(n)?zr:cu)(n)}function kf(n){if(null==n)return 0;if(Hf(n))return dc(n)?V(n):n.length;var t=zs(n);return t==Gn||t==tt?n.size:Me(n).length}function Of(n,t,r){var e=bh(n)?h:lu;return r&&Ui(n,t,r)&&(t=X),e(n,mi(t,3))}function If(n,t){if("function"!=typeof t)throw new pl(en);return n=kc(n),function(){if(--n<1)return t.apply(this,arguments)}}function Rf(n,t,r){return t=r?X:t,t=n&&null==t?n.length:t,ai(n,mn,X,X,X,X,t)}function zf(n,t){var r;if("function"!=typeof t)throw new pl(en);
return n=kc(n),function(){return--n>0&&(r=t.apply(this,arguments)),n<=1&&(t=X),r}}function Ef(n,t,r){t=r?X:t;var e=ai(n,yn,X,X,X,X,X,t);return e.placeholder=Ef.placeholder,e}function Sf(n,t,r){t=r?X:t;var e=ai(n,dn,X,X,X,X,X,t);return e.placeholder=Sf.placeholder,e}function Wf(n,t,r){function e(t){var r=h,e=p;return h=p=X,d=t,v=n.apply(e,r)}function u(n){return d=n,g=Ws(f,t),b?e(n):v}function i(n){var r=n-y,e=n-d,u=t-r;return w?Hl(u,_-e):u}function o(n){var r=n-y,e=n-d;return y===X||r>=t||r<0||w&&e>=_;
}function f(){var n=fh();return o(n)?c(n):(g=Ws(f,i(n)),X)}function c(n){return g=X,m&&h?e(n):(h=p=X,v)}function a(){g!==X&&As(g),d=0,h=y=p=g=X}function l(){return g===X?v:c(fh())}function s(){var n=fh(),r=o(n);if(h=arguments,p=this,y=n,r){if(g===X)return u(y);if(w)return As(g),g=Ws(f,t),e(y)}return g===X&&(g=Ws(f,t)),v}var h,p,_,v,g,y,d=0,b=!1,w=!1,m=!0;if("function"!=typeof n)throw new pl(en);return t=Ic(t)||0,fc(r)&&(b=!!r.leading,w="maxWait"in r,_=w?Gl(Ic(r.maxWait)||0,t):_,m="trailing"in r?!!r.trailing:m),
s.cancel=a,s.flush=l,s}function Lf(n){return ai(n,jn)}function Cf(n,t){if("function"!=typeof n||null!=t&&"function"!=typeof t)throw new pl(en);var r=function(){var e=arguments,u=t?t.apply(this,e):e[0],i=r.cache;if(i.has(u))return i.get(u);var o=n.apply(this,e);return r.cache=i.set(u,o)||i,o};return r.cache=new(Cf.Cache||sr),r}function Uf(n){if("function"!=typeof n)throw new pl(en);return function(){var t=arguments;switch(t.length){case 0:return!n.call(this);case 1:return!n.call(this,t[0]);case 2:
return!n.call(this,t[0],t[1]);case 3:return!n.call(this,t[0],t[1],t[2])}return!n.apply(this,t)}}function Bf(n){return zf(2,n)}function Tf(n,t){if("function"!=typeof n)throw new pl(en);return t=t===X?t:kc(t),uu(n,t)}function $f(t,r){if("function"!=typeof t)throw new pl(en);return r=null==r?0:Gl(kc(r),0),uu(function(e){var u=e[r],i=Ou(e,0,r);return u&&a(i,u),n(t,this,i)})}function Df(n,t,r){var e=!0,u=!0;if("function"!=typeof n)throw new pl(en);return fc(r)&&(e="leading"in r?!!r.leading:e,u="trailing"in r?!!r.trailing:u),
Wf(n,t,{leading:e,maxWait:t,trailing:u})}function Mf(n){return Rf(n,1)}function Ff(n,t){return ph(Au(t),n)}function Nf(){if(!arguments.length)return[];var n=arguments[0];return bh(n)?n:[n]}function Pf(n){return Fr(n,sn)}function qf(n,t){return t="function"==typeof t?t:X,Fr(n,sn,t)}function Zf(n){return Fr(n,an|sn)}function Kf(n,t){return t="function"==typeof t?t:X,Fr(n,an|sn,t)}function Vf(n,t){return null==t||Pr(n,t,Pc(t))}function Gf(n,t){return n===t||n!==n&&t!==t}function Hf(n){return null!=n&&oc(n.length)&&!uc(n);
}function Jf(n){return cc(n)&&Hf(n)}function Yf(n){return n===!0||n===!1||cc(n)&&we(n)==Nn}function Qf(n){return cc(n)&&1===n.nodeType&&!gc(n)}function Xf(n){if(null==n)return!0;if(Hf(n)&&(bh(n)||"string"==typeof n||"function"==typeof n.splice||mh(n)||Oh(n)||dh(n)))return!n.length;var t=zs(n);if(t==Gn||t==tt)return!n.size;if(Mi(n))return!Me(n).length;for(var r in n)if(bl.call(n,r))return!1;return!0}function nc(n,t){return Se(n,t)}function tc(n,t,r){r="function"==typeof r?r:X;var e=r?r(n,t):X;return e===X?Se(n,t,X,r):!!e;
}function rc(n){if(!cc(n))return!1;var t=we(n);return t==Zn||t==qn||"string"==typeof n.message&&"string"==typeof n.name&&!gc(n)}function ec(n){return"number"==typeof n&&Zl(n)}function uc(n){if(!fc(n))return!1;var t=we(n);return t==Kn||t==Vn||t==Fn||t==Xn}function ic(n){return"number"==typeof n&&n==kc(n)}function oc(n){return"number"==typeof n&&n>-1&&n%1==0&&n<=Wn}function fc(n){var t=typeof n;return null!=n&&("object"==t||"function"==t)}function cc(n){return null!=n&&"object"==typeof n}function ac(n,t){
return n===t||Ce(n,t,ji(t))}function lc(n,t,r){return r="function"==typeof r?r:X,Ce(n,t,ji(t),r)}function sc(n){return vc(n)&&n!=+n}function hc(n){if(Es(n))throw new fl(rn);return Ue(n)}function pc(n){return null===n}function _c(n){return null==n}function vc(n){return"number"==typeof n||cc(n)&&we(n)==Hn}function gc(n){if(!cc(n)||we(n)!=Yn)return!1;var t=El(n);if(null===t)return!0;var r=bl.call(t,"constructor")&&t.constructor;return"function"==typeof r&&r instanceof r&&dl.call(r)==jl}function yc(n){
return ic(n)&&n>=-Wn&&n<=Wn}function dc(n){return"string"==typeof n||!bh(n)&&cc(n)&&we(n)==rt}function bc(n){return"symbol"==typeof n||cc(n)&&we(n)==et}function wc(n){return n===X}function mc(n){return cc(n)&&zs(n)==it}function xc(n){return cc(n)&&we(n)==ot}function jc(n){if(!n)return[];if(Hf(n))return dc(n)?G(n):Tu(n);if(Ul&&n[Ul])return D(n[Ul]());var t=zs(n);return(t==Gn?M:t==tt?P:ra)(n)}function Ac(n){if(!n)return 0===n?n:0;if(n=Ic(n),n===Sn||n===-Sn){return(n<0?-1:1)*Ln}return n===n?n:0}function kc(n){
var t=Ac(n),r=t%1;return t===t?r?t-r:t:0}function Oc(n){return n?Mr(kc(n),0,Un):0}function Ic(n){if("number"==typeof n)return n;if(bc(n))return Cn;if(fc(n)){var t="function"==typeof n.valueOf?n.valueOf():n;n=fc(t)?t+"":t}if("string"!=typeof n)return 0===n?n:+n;n=R(n);var r=qt.test(n);return r||Kt.test(n)?Xr(n.slice(2),r?2:8):Pt.test(n)?Cn:+n}function Rc(n){return $u(n,qc(n))}function zc(n){return n?Mr(kc(n),-Wn,Wn):0===n?n:0}function Ec(n){return null==n?"":vu(n)}function Sc(n,t){var r=gs(n);return null==t?r:Cr(r,t);
}function Wc(n,t){return v(n,mi(t,3),ue)}function Lc(n,t){return v(n,mi(t,3),oe)}function Cc(n,t){return null==n?n:bs(n,mi(t,3),qc)}function Uc(n,t){return null==n?n:ws(n,mi(t,3),qc)}function Bc(n,t){return n&&ue(n,mi(t,3))}function Tc(n,t){return n&&oe(n,mi(t,3))}function $c(n){return null==n?[]:fe(n,Pc(n))}function Dc(n){return null==n?[]:fe(n,qc(n))}function Mc(n,t,r){var e=null==n?X:_e(n,t);return e===X?r:e}function Fc(n,t){return null!=n&&Ri(n,t,xe)}function Nc(n,t){return null!=n&&Ri(n,t,je);
}function Pc(n){return Hf(n)?Or(n):Me(n)}function qc(n){return Hf(n)?Or(n,!0):Fe(n)}function Zc(n,t){var r={};return t=mi(t,3),ue(n,function(n,e,u){Br(r,t(n,e,u),n)}),r}function Kc(n,t){var r={};return t=mi(t,3),ue(n,function(n,e,u){Br(r,e,t(n,e,u))}),r}function Vc(n,t){return Gc(n,Uf(mi(t)))}function Gc(n,t){if(null==n)return{};var r=c(di(n),function(n){return[n]});return t=mi(t),Ye(n,r,function(n,r){return t(n,r[0])})}function Hc(n,t,r){t=ku(t,n);var e=-1,u=t.length;for(u||(u=1,n=X);++e<u;){var i=null==n?X:n[no(t[e])];
i===X&&(e=u,i=r),n=uc(i)?i.call(n):i}return n}function Jc(n,t,r){return null==n?n:fu(n,t,r)}function Yc(n,t,r,e){return e="function"==typeof e?e:X,null==n?n:fu(n,t,r,e)}function Qc(n,t,e){var u=bh(n),i=u||mh(n)||Oh(n);if(t=mi(t,4),null==e){var o=n&&n.constructor;e=i?u?new o:[]:fc(n)&&uc(o)?gs(El(n)):{}}return(i?r:ue)(n,function(n,r,u){return t(e,n,r,u)}),e}function Xc(n,t){return null==n||yu(n,t)}function na(n,t,r){return null==n?n:du(n,t,Au(r))}function ta(n,t,r,e){return e="function"==typeof e?e:X,
null==n?n:du(n,t,Au(r),e)}function ra(n){return null==n?[]:E(n,Pc(n))}function ea(n){return null==n?[]:E(n,qc(n))}function ua(n,t,r){return r===X&&(r=t,t=X),r!==X&&(r=Ic(r),r=r===r?r:0),t!==X&&(t=Ic(t),t=t===t?t:0),Mr(Ic(n),t,r)}function ia(n,t,r){return t=Ac(t),r===X?(r=t,t=0):r=Ac(r),n=Ic(n),Ae(n,t,r)}function oa(n,t,r){if(r&&"boolean"!=typeof r&&Ui(n,t,r)&&(t=r=X),r===X&&("boolean"==typeof t?(r=t,t=X):"boolean"==typeof n&&(r=n,n=X)),n===X&&t===X?(n=0,t=1):(n=Ac(n),t===X?(t=n,n=0):t=Ac(t)),n>t){
var e=n;n=t,t=e}if(r||n%1||t%1){var u=Ql();return Hl(n+u*(t-n+Qr("1e-"+((u+"").length-1))),t)}return tu(n,t)}function fa(n){return Qh(Ec(n).toLowerCase())}function ca(n){return n=Ec(n),n&&n.replace(Gt,ve).replace(Dr,"")}function aa(n,t,r){n=Ec(n),t=vu(t);var e=n.length;r=r===X?e:Mr(kc(r),0,e);var u=r;return r-=t.length,r>=0&&n.slice(r,u)==t}function la(n){return n=Ec(n),n&&At.test(n)?n.replace(xt,ge):n}function sa(n){return n=Ec(n),n&&Wt.test(n)?n.replace(St,"\\$&"):n}function ha(n,t,r){n=Ec(n),t=kc(t);
var e=t?V(n):0;if(!t||e>=t)return n;var u=(t-e)/2;return ri(Nl(u),r)+n+ri(Fl(u),r)}function pa(n,t,r){n=Ec(n),t=kc(t);var e=t?V(n):0;return t&&e<t?n+ri(t-e,r):n}function _a(n,t,r){n=Ec(n),t=kc(t);var e=t?V(n):0;return t&&e<t?ri(t-e,r)+n:n}function va(n,t,r){return r||null==t?t=0:t&&(t=+t),Yl(Ec(n).replace(Lt,""),t||0)}function ga(n,t,r){return t=(r?Ui(n,t,r):t===X)?1:kc(t),eu(Ec(n),t)}function ya(){var n=arguments,t=Ec(n[0]);return n.length<3?t:t.replace(n[1],n[2])}function da(n,t,r){return r&&"number"!=typeof r&&Ui(n,t,r)&&(t=r=X),
(r=r===X?Un:r>>>0)?(n=Ec(n),n&&("string"==typeof t||null!=t&&!Ah(t))&&(t=vu(t),!t&&T(n))?Ou(G(n),0,r):n.split(t,r)):[]}function ba(n,t,r){return n=Ec(n),r=null==r?0:Mr(kc(r),0,n.length),t=vu(t),n.slice(r,r+t.length)==t}function wa(n,t,r){var e=Z.templateSettings;r&&Ui(n,t,r)&&(t=X),n=Ec(n),t=Sh({},t,e,li);var u,i,o=Sh({},t.imports,e.imports,li),f=Pc(o),c=E(o,f),a=0,l=t.interpolate||Ht,s="__p += '",h=sl((t.escape||Ht).source+"|"+l.source+"|"+(l===It?Ft:Ht).source+"|"+(t.evaluate||Ht).source+"|$","g"),p="//# sourceURL="+(bl.call(t,"sourceURL")?(t.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++Zr+"]")+"\n";
n.replace(h,function(t,r,e,o,f,c){return e||(e=o),s+=n.slice(a,c).replace(Jt,U),r&&(u=!0,s+="' +\n__e("+r+") +\n'"),f&&(i=!0,s+="';\n"+f+";\n__p += '"),e&&(s+="' +\n((__t = ("+e+")) == null ? '' : __t) +\n'"),a=c+t.length,t}),s+="';\n";var _=bl.call(t,"variable")&&t.variable;if(_){if(Dt.test(_))throw new fl(un)}else s="with (obj) {\n"+s+"\n}\n";s=(i?s.replace(dt,""):s).replace(bt,"$1").replace(wt,"$1;"),s="function("+(_||"obj")+") {\n"+(_?"":"obj || (obj = {});\n")+"var __t, __p = ''"+(u?", __e = _.escape":"")+(i?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+s+"return __p\n}";
var v=Xh(function(){return cl(f,p+"return "+s).apply(X,c)});if(v.source=s,rc(v))throw v;return v}function ma(n){return Ec(n).toLowerCase()}function xa(n){return Ec(n).toUpperCase()}function ja(n,t,r){if(n=Ec(n),n&&(r||t===X))return R(n);if(!n||!(t=vu(t)))return n;var e=G(n),u=G(t);return Ou(e,W(e,u),L(e,u)+1).join("")}function Aa(n,t,r){if(n=Ec(n),n&&(r||t===X))return n.slice(0,H(n)+1);if(!n||!(t=vu(t)))return n;var e=G(n);return Ou(e,0,L(e,G(t))+1).join("")}function ka(n,t,r){if(n=Ec(n),n&&(r||t===X))return n.replace(Lt,"");
if(!n||!(t=vu(t)))return n;var e=G(n);return Ou(e,W(e,G(t))).join("")}function Oa(n,t){var r=An,e=kn;if(fc(t)){var u="separator"in t?t.separator:u;r="length"in t?kc(t.length):r,e="omission"in t?vu(t.omission):e}n=Ec(n);var i=n.length;if(T(n)){var o=G(n);i=o.length}if(r>=i)return n;var f=r-V(e);if(f<1)return e;var c=o?Ou(o,0,f).join(""):n.slice(0,f);if(u===X)return c+e;if(o&&(f+=c.length-f),Ah(u)){if(n.slice(f).search(u)){var a,l=c;for(u.global||(u=sl(u.source,Ec(Nt.exec(u))+"g")),u.lastIndex=0;a=u.exec(l);)var s=a.index;
c=c.slice(0,s===X?f:s)}}else if(n.indexOf(vu(u),f)!=f){var h=c.lastIndexOf(u);h>-1&&(c=c.slice(0,h))}return c+e}function Ia(n){return n=Ec(n),n&&jt.test(n)?n.replace(mt,ye):n}function Ra(n,t,r){return n=Ec(n),t=r?X:t,t===X?$(n)?Q(n):_(n):n.match(t)||[]}function za(t){var r=null==t?0:t.length,e=mi();return t=r?c(t,function(n){if("function"!=typeof n[1])throw new pl(en);return[e(n[0]),n[1]]}):[],uu(function(e){for(var u=-1;++u<r;){var i=t[u];if(n(i[0],this,e))return n(i[1],this,e)}})}function Ea(n){
return Nr(Fr(n,an))}function Sa(n){return function(){return n}}function Wa(n,t){return null==n||n!==n?t:n}function La(n){return n}function Ca(n){return De("function"==typeof n?n:Fr(n,an))}function Ua(n){return qe(Fr(n,an))}function Ba(n,t){return Ze(n,Fr(t,an))}function Ta(n,t,e){var u=Pc(t),i=fe(t,u);null!=e||fc(t)&&(i.length||!u.length)||(e=t,t=n,n=this,i=fe(t,Pc(t)));var o=!(fc(e)&&"chain"in e&&!e.chain),f=uc(n);return r(i,function(r){var e=t[r];n[r]=e,f&&(n.prototype[r]=function(){var t=this.__chain__;
if(o||t){var r=n(this.__wrapped__);return(r.__actions__=Tu(this.__actions__)).push({func:e,args:arguments,thisArg:n}),r.__chain__=t,r}return e.apply(n,a([this.value()],arguments))})}),n}function $a(){return re._===this&&(re._=Al),this}function Da(){}function Ma(n){return n=kc(n),uu(function(t){return Ge(t,n)})}function Fa(n){return Bi(n)?m(no(n)):Qe(n)}function Na(n){return function(t){return null==n?X:_e(n,t)}}function Pa(){return[]}function qa(){return!1}function Za(){return{}}function Ka(){return"";
}function Va(){return!0}function Ga(n,t){if(n=kc(n),n<1||n>Wn)return[];var r=Un,e=Hl(n,Un);t=mi(t),n-=Un;for(var u=O(e,t);++r<n;)t(r);return u}function Ha(n){return bh(n)?c(n,no):bc(n)?[n]:Tu(Cs(Ec(n)))}function Ja(n){var t=++wl;return Ec(n)+t}function Ya(n){return n&&n.length?Yr(n,La,me):X}function Qa(n,t){return n&&n.length?Yr(n,mi(t,2),me):X}function Xa(n){return w(n,La)}function nl(n,t){return w(n,mi(t,2))}function tl(n){return n&&n.length?Yr(n,La,Ne):X}function rl(n,t){return n&&n.length?Yr(n,mi(t,2),Ne):X;
}function el(n){return n&&n.length?k(n,La):0}function ul(n,t){return n&&n.length?k(n,mi(t,2)):0}x=null==x?re:be.defaults(re.Object(),x,be.pick(re,qr));var il=x.Array,ol=x.Date,fl=x.Error,cl=x.Function,al=x.Math,ll=x.Object,sl=x.RegExp,hl=x.String,pl=x.TypeError,_l=il.prototype,vl=cl.prototype,gl=ll.prototype,yl=x["__core-js_shared__"],dl=vl.toString,bl=gl.hasOwnProperty,wl=0,ml=function(){var n=/[^.]+$/.exec(yl&&yl.keys&&yl.keys.IE_PROTO||"");return n?"Symbol(src)_1."+n:""}(),xl=gl.toString,jl=dl.call(ll),Al=re._,kl=sl("^"+dl.call(bl).replace(St,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Ol=ie?x.Buffer:X,Il=x.Symbol,Rl=x.Uint8Array,zl=Ol?Ol.allocUnsafe:X,El=F(ll.getPrototypeOf,ll),Sl=ll.create,Wl=gl.propertyIsEnumerable,Ll=_l.splice,Cl=Il?Il.isConcatSpreadable:X,Ul=Il?Il.iterator:X,Bl=Il?Il.toStringTag:X,Tl=function(){
try{var n=Ai(ll,"defineProperty");return n({},"",{}),n}catch(n){}}(),$l=x.clearTimeout!==re.clearTimeout&&x.clearTimeout,Dl=ol&&ol.now!==re.Date.now&&ol.now,Ml=x.setTimeout!==re.setTimeout&&x.setTimeout,Fl=al.ceil,Nl=al.floor,Pl=ll.getOwnPropertySymbols,ql=Ol?Ol.isBuffer:X,Zl=x.isFinite,Kl=_l.join,Vl=F(ll.keys,ll),Gl=al.max,Hl=al.min,Jl=ol.now,Yl=x.parseInt,Ql=al.random,Xl=_l.reverse,ns=Ai(x,"DataView"),ts=Ai(x,"Map"),rs=Ai(x,"Promise"),es=Ai(x,"Set"),us=Ai(x,"WeakMap"),is=Ai(ll,"create"),os=us&&new us,fs={},cs=to(ns),as=to(ts),ls=to(rs),ss=to(es),hs=to(us),ps=Il?Il.prototype:X,_s=ps?ps.valueOf:X,vs=ps?ps.toString:X,gs=function(){
function n(){}return function(t){if(!fc(t))return{};if(Sl)return Sl(t);n.prototype=t;var r=new n;return n.prototype=X,r}}();Z.templateSettings={escape:kt,evaluate:Ot,interpolate:It,variable:"",imports:{_:Z}},Z.prototype=J.prototype,Z.prototype.constructor=Z,Y.prototype=gs(J.prototype),Y.prototype.constructor=Y,Ct.prototype=gs(J.prototype),Ct.prototype.constructor=Ct,Xt.prototype.clear=nr,Xt.prototype.delete=tr,Xt.prototype.get=rr,Xt.prototype.has=er,Xt.prototype.set=ur,ir.prototype.clear=or,ir.prototype.delete=fr,
ir.prototype.get=cr,ir.prototype.has=ar,ir.prototype.set=lr,sr.prototype.clear=hr,sr.prototype.delete=pr,sr.prototype.get=_r,sr.prototype.has=vr,sr.prototype.set=gr,yr.prototype.add=yr.prototype.push=dr,yr.prototype.has=br,wr.prototype.clear=mr,wr.prototype.delete=xr,wr.prototype.get=jr,wr.prototype.has=Ar,wr.prototype.set=kr;var ys=Pu(ue),ds=Pu(oe,!0),bs=qu(),ws=qu(!0),ms=os?function(n,t){return os.set(n,t),n}:La,xs=Tl?function(n,t){return Tl(n,"toString",{configurable:!0,enumerable:!1,value:Sa(t),
writable:!0})}:La,js=uu,As=$l||function(n){return re.clearTimeout(n)},ks=es&&1/P(new es([,-0]))[1]==Sn?function(n){return new es(n)}:Da,Os=os?function(n){return os.get(n)}:Da,Is=Pl?function(n){return null==n?[]:(n=ll(n),i(Pl(n),function(t){return Wl.call(n,t)}))}:Pa,Rs=Pl?function(n){for(var t=[];n;)a(t,Is(n)),n=El(n);return t}:Pa,zs=we;(ns&&zs(new ns(new ArrayBuffer(1)))!=ct||ts&&zs(new ts)!=Gn||rs&&zs(rs.resolve())!=Qn||es&&zs(new es)!=tt||us&&zs(new us)!=it)&&(zs=function(n){var t=we(n),r=t==Yn?n.constructor:X,e=r?to(r):"";
if(e)switch(e){case cs:return ct;case as:return Gn;case ls:return Qn;case ss:return tt;case hs:return it}return t});var Es=yl?uc:qa,Ss=Qi(ms),Ws=Ml||function(n,t){return re.setTimeout(n,t)},Ls=Qi(xs),Cs=Pi(function(n){var t=[];return 46===n.charCodeAt(0)&&t.push(""),n.replace(Et,function(n,r,e,u){t.push(e?u.replace(Mt,"$1"):r||n)}),t}),Us=uu(function(n,t){return Jf(n)?Hr(n,ee(t,1,Jf,!0)):[]}),Bs=uu(function(n,t){var r=jo(t);return Jf(r)&&(r=X),Jf(n)?Hr(n,ee(t,1,Jf,!0),mi(r,2)):[]}),Ts=uu(function(n,t){
var r=jo(t);return Jf(r)&&(r=X),Jf(n)?Hr(n,ee(t,1,Jf,!0),X,r):[]}),$s=uu(function(n){var t=c(n,ju);return t.length&&t[0]===n[0]?ke(t):[]}),Ds=uu(function(n){var t=jo(n),r=c(n,ju);return t===jo(r)?t=X:r.pop(),r.length&&r[0]===n[0]?ke(r,mi(t,2)):[]}),Ms=uu(function(n){var t=jo(n),r=c(n,ju);return t="function"==typeof t?t:X,t&&r.pop(),r.length&&r[0]===n[0]?ke(r,X,t):[]}),Fs=uu(Oo),Ns=gi(function(n,t){var r=null==n?0:n.length,e=Tr(n,t);return nu(n,c(t,function(n){return Ci(n,r)?+n:n}).sort(Lu)),e}),Ps=uu(function(n){
return gu(ee(n,1,Jf,!0))}),qs=uu(function(n){var t=jo(n);return Jf(t)&&(t=X),gu(ee(n,1,Jf,!0),mi(t,2))}),Zs=uu(function(n){var t=jo(n);return t="function"==typeof t?t:X,gu(ee(n,1,Jf,!0),X,t)}),Ks=uu(function(n,t){return Jf(n)?Hr(n,t):[]}),Vs=uu(function(n){return mu(i(n,Jf))}),Gs=uu(function(n){var t=jo(n);return Jf(t)&&(t=X),mu(i(n,Jf),mi(t,2))}),Hs=uu(function(n){var t=jo(n);return t="function"==typeof t?t:X,mu(i(n,Jf),X,t)}),Js=uu(Go),Ys=uu(function(n){var t=n.length,r=t>1?n[t-1]:X;return r="function"==typeof r?(n.pop(),
r):X,Ho(n,r)}),Qs=gi(function(n){var t=n.length,r=t?n[0]:0,e=this.__wrapped__,u=function(t){return Tr(t,n)};return!(t>1||this.__actions__.length)&&e instanceof Ct&&Ci(r)?(e=e.slice(r,+r+(t?1:0)),e.__actions__.push({func:nf,args:[u],thisArg:X}),new Y(e,this.__chain__).thru(function(n){return t&&!n.length&&n.push(X),n})):this.thru(u)}),Xs=Fu(function(n,t,r){bl.call(n,r)?++n[r]:Br(n,r,1)}),nh=Ju(ho),th=Ju(po),rh=Fu(function(n,t,r){bl.call(n,r)?n[r].push(t):Br(n,r,[t])}),eh=uu(function(t,r,e){var u=-1,i="function"==typeof r,o=Hf(t)?il(t.length):[];
return ys(t,function(t){o[++u]=i?n(r,t,e):Ie(t,r,e)}),o}),uh=Fu(function(n,t,r){Br(n,r,t)}),ih=Fu(function(n,t,r){n[r?0:1].push(t)},function(){return[[],[]]}),oh=uu(function(n,t){if(null==n)return[];var r=t.length;return r>1&&Ui(n,t[0],t[1])?t=[]:r>2&&Ui(t[0],t[1],t[2])&&(t=[t[0]]),He(n,ee(t,1),[])}),fh=Dl||function(){return re.Date.now()},ch=uu(function(n,t,r){var e=_n;if(r.length){var u=N(r,wi(ch));e|=bn}return ai(n,e,t,r,u)}),ah=uu(function(n,t,r){var e=_n|vn;if(r.length){var u=N(r,wi(ah));e|=bn;
}return ai(t,e,n,r,u)}),lh=uu(function(n,t){return Gr(n,1,t)}),sh=uu(function(n,t,r){return Gr(n,Ic(t)||0,r)});Cf.Cache=sr;var hh=js(function(t,r){r=1==r.length&&bh(r[0])?c(r[0],z(mi())):c(ee(r,1),z(mi()));var e=r.length;return uu(function(u){for(var i=-1,o=Hl(u.length,e);++i<o;)u[i]=r[i].call(this,u[i]);return n(t,this,u)})}),ph=uu(function(n,t){return ai(n,bn,X,t,N(t,wi(ph)))}),_h=uu(function(n,t){return ai(n,wn,X,t,N(t,wi(_h)))}),vh=gi(function(n,t){return ai(n,xn,X,X,X,t)}),gh=ii(me),yh=ii(function(n,t){
return n>=t}),dh=Re(function(){return arguments}())?Re:function(n){return cc(n)&&bl.call(n,"callee")&&!Wl.call(n,"callee")},bh=il.isArray,wh=ce?z(ce):ze,mh=ql||qa,xh=ae?z(ae):Ee,jh=le?z(le):Le,Ah=se?z(se):Be,kh=he?z(he):Te,Oh=pe?z(pe):$e,Ih=ii(Ne),Rh=ii(function(n,t){return n<=t}),zh=Nu(function(n,t){if(Mi(t)||Hf(t))return $u(t,Pc(t),n),X;for(var r in t)bl.call(t,r)&&Sr(n,r,t[r])}),Eh=Nu(function(n,t){$u(t,qc(t),n)}),Sh=Nu(function(n,t,r,e){$u(t,qc(t),n,e)}),Wh=Nu(function(n,t,r,e){$u(t,Pc(t),n,e);
}),Lh=gi(Tr),Ch=uu(function(n,t){n=ll(n);var r=-1,e=t.length,u=e>2?t[2]:X;for(u&&Ui(t[0],t[1],u)&&(e=1);++r<e;)for(var i=t[r],o=qc(i),f=-1,c=o.length;++f<c;){var a=o[f],l=n[a];(l===X||Gf(l,gl[a])&&!bl.call(n,a))&&(n[a]=i[a])}return n}),Uh=uu(function(t){return t.push(X,si),n(Mh,X,t)}),Bh=Xu(function(n,t,r){null!=t&&"function"!=typeof t.toString&&(t=xl.call(t)),n[t]=r},Sa(La)),Th=Xu(function(n,t,r){null!=t&&"function"!=typeof t.toString&&(t=xl.call(t)),bl.call(n,t)?n[t].push(r):n[t]=[r]},mi),$h=uu(Ie),Dh=Nu(function(n,t,r){
Ke(n,t,r)}),Mh=Nu(function(n,t,r,e){Ke(n,t,r,e)}),Fh=gi(function(n,t){var r={};if(null==n)return r;var e=!1;t=c(t,function(t){return t=ku(t,n),e||(e=t.length>1),t}),$u(n,di(n),r),e&&(r=Fr(r,an|ln|sn,hi));for(var u=t.length;u--;)yu(r,t[u]);return r}),Nh=gi(function(n,t){return null==n?{}:Je(n,t)}),Ph=ci(Pc),qh=ci(qc),Zh=Vu(function(n,t,r){return t=t.toLowerCase(),n+(r?fa(t):t)}),Kh=Vu(function(n,t,r){return n+(r?"-":"")+t.toLowerCase()}),Vh=Vu(function(n,t,r){return n+(r?" ":"")+t.toLowerCase()}),Gh=Ku("toLowerCase"),Hh=Vu(function(n,t,r){
return n+(r?"_":"")+t.toLowerCase()}),Jh=Vu(function(n,t,r){return n+(r?" ":"")+Qh(t)}),Yh=Vu(function(n,t,r){return n+(r?" ":"")+t.toUpperCase()}),Qh=Ku("toUpperCase"),Xh=uu(function(t,r){try{return n(t,X,r)}catch(n){return rc(n)?n:new fl(n)}}),np=gi(function(n,t){return r(t,function(t){t=no(t),Br(n,t,ch(n[t],n))}),n}),tp=Yu(),rp=Yu(!0),ep=uu(function(n,t){return function(r){return Ie(r,n,t)}}),up=uu(function(n,t){return function(r){return Ie(n,r,t)}}),ip=ti(c),op=ti(u),fp=ti(h),cp=ui(),ap=ui(!0),lp=ni(function(n,t){
return n+t},0),sp=fi("ceil"),hp=ni(function(n,t){return n/t},1),pp=fi("floor"),_p=ni(function(n,t){return n*t},1),vp=fi("round"),gp=ni(function(n,t){return n-t},0);return Z.after=If,Z.ary=Rf,Z.assign=zh,Z.assignIn=Eh,Z.assignInWith=Sh,Z.assignWith=Wh,Z.at=Lh,Z.before=zf,Z.bind=ch,Z.bindAll=np,Z.bindKey=ah,Z.castArray=Nf,Z.chain=Qo,Z.chunk=uo,Z.compact=io,Z.concat=oo,Z.cond=za,Z.conforms=Ea,Z.constant=Sa,Z.countBy=Xs,Z.create=Sc,Z.curry=Ef,Z.curryRight=Sf,Z.debounce=Wf,Z.defaults=Ch,Z.defaultsDeep=Uh,
Z.defer=lh,Z.delay=sh,Z.difference=Us,Z.differenceBy=Bs,Z.differenceWith=Ts,Z.drop=fo,Z.dropRight=co,Z.dropRightWhile=ao,Z.dropWhile=lo,Z.fill=so,Z.filter=lf,Z.flatMap=sf,Z.flatMapDeep=hf,Z.flatMapDepth=pf,Z.flatten=_o,Z.flattenDeep=vo,Z.flattenDepth=go,Z.flip=Lf,Z.flow=tp,Z.flowRight=rp,Z.fromPairs=yo,Z.functions=$c,Z.functionsIn=Dc,Z.groupBy=rh,Z.initial=mo,Z.intersection=$s,Z.intersectionBy=Ds,Z.intersectionWith=Ms,Z.invert=Bh,Z.invertBy=Th,Z.invokeMap=eh,Z.iteratee=Ca,Z.keyBy=uh,Z.keys=Pc,Z.keysIn=qc,
Z.map=yf,Z.mapKeys=Zc,Z.mapValues=Kc,Z.matches=Ua,Z.matchesProperty=Ba,Z.memoize=Cf,Z.merge=Dh,Z.mergeWith=Mh,Z.method=ep,Z.methodOf=up,Z.mixin=Ta,Z.negate=Uf,Z.nthArg=Ma,Z.omit=Fh,Z.omitBy=Vc,Z.once=Bf,Z.orderBy=df,Z.over=ip,Z.overArgs=hh,Z.overEvery=op,Z.overSome=fp,Z.partial=ph,Z.partialRight=_h,Z.partition=ih,Z.pick=Nh,Z.pickBy=Gc,Z.property=Fa,Z.propertyOf=Na,Z.pull=Fs,Z.pullAll=Oo,Z.pullAllBy=Io,Z.pullAllWith=Ro,Z.pullAt=Ns,Z.range=cp,Z.rangeRight=ap,Z.rearg=vh,Z.reject=mf,Z.remove=zo,Z.rest=Tf,
Z.reverse=Eo,Z.sampleSize=jf,Z.set=Jc,Z.setWith=Yc,Z.shuffle=Af,Z.slice=So,Z.sortBy=oh,Z.sortedUniq=$o,Z.sortedUniqBy=Do,Z.split=da,Z.spread=$f,Z.tail=Mo,Z.take=Fo,Z.takeRight=No,Z.takeRightWhile=Po,Z.takeWhile=qo,Z.tap=Xo,Z.throttle=Df,Z.thru=nf,Z.toArray=jc,Z.toPairs=Ph,Z.toPairsIn=qh,Z.toPath=Ha,Z.toPlainObject=Rc,Z.transform=Qc,Z.unary=Mf,Z.union=Ps,Z.unionBy=qs,Z.unionWith=Zs,Z.uniq=Zo,Z.uniqBy=Ko,Z.uniqWith=Vo,Z.unset=Xc,Z.unzip=Go,Z.unzipWith=Ho,Z.update=na,Z.updateWith=ta,Z.values=ra,Z.valuesIn=ea,
Z.without=Ks,Z.words=Ra,Z.wrap=Ff,Z.xor=Vs,Z.xorBy=Gs,Z.xorWith=Hs,Z.zip=Js,Z.zipObject=Jo,Z.zipObjectDeep=Yo,Z.zipWith=Ys,Z.entries=Ph,Z.entriesIn=qh,Z.extend=Eh,Z.extendWith=Sh,Ta(Z,Z),Z.add=lp,Z.attempt=Xh,Z.camelCase=Zh,Z.capitalize=fa,Z.ceil=sp,Z.clamp=ua,Z.clone=Pf,Z.cloneDeep=Zf,Z.cloneDeepWith=Kf,Z.cloneWith=qf,Z.conformsTo=Vf,Z.deburr=ca,Z.defaultTo=Wa,Z.divide=hp,Z.endsWith=aa,Z.eq=Gf,Z.escape=la,Z.escapeRegExp=sa,Z.every=af,Z.find=nh,Z.findIndex=ho,Z.findKey=Wc,Z.findLast=th,Z.findLastIndex=po,
Z.findLastKey=Lc,Z.floor=pp,Z.forEach=_f,Z.forEachRight=vf,Z.forIn=Cc,Z.forInRight=Uc,Z.forOwn=Bc,Z.forOwnRight=Tc,Z.get=Mc,Z.gt=gh,Z.gte=yh,Z.has=Fc,Z.hasIn=Nc,Z.head=bo,Z.identity=La,Z.includes=gf,Z.indexOf=wo,Z.inRange=ia,Z.invoke=$h,Z.isArguments=dh,Z.isArray=bh,Z.isArrayBuffer=wh,Z.isArrayLike=Hf,Z.isArrayLikeObject=Jf,Z.isBoolean=Yf,Z.isBuffer=mh,Z.isDate=xh,Z.isElement=Qf,Z.isEmpty=Xf,Z.isEqual=nc,Z.isEqualWith=tc,Z.isError=rc,Z.isFinite=ec,Z.isFunction=uc,Z.isInteger=ic,Z.isLength=oc,Z.isMap=jh,
Z.isMatch=ac,Z.isMatchWith=lc,Z.isNaN=sc,Z.isNative=hc,Z.isNil=_c,Z.isNull=pc,Z.isNumber=vc,Z.isObject=fc,Z.isObjectLike=cc,Z.isPlainObject=gc,Z.isRegExp=Ah,Z.isSafeInteger=yc,Z.isSet=kh,Z.isString=dc,Z.isSymbol=bc,Z.isTypedArray=Oh,Z.isUndefined=wc,Z.isWeakMap=mc,Z.isWeakSet=xc,Z.join=xo,Z.kebabCase=Kh,Z.last=jo,Z.lastIndexOf=Ao,Z.lowerCase=Vh,Z.lowerFirst=Gh,Z.lt=Ih,Z.lte=Rh,Z.max=Ya,Z.maxBy=Qa,Z.mean=Xa,Z.meanBy=nl,Z.min=tl,Z.minBy=rl,Z.stubArray=Pa,Z.stubFalse=qa,Z.stubObject=Za,Z.stubString=Ka,
Z.stubTrue=Va,Z.multiply=_p,Z.nth=ko,Z.noConflict=$a,Z.noop=Da,Z.now=fh,Z.pad=ha,Z.padEnd=pa,Z.padStart=_a,Z.parseInt=va,Z.random=oa,Z.reduce=bf,Z.reduceRight=wf,Z.repeat=ga,Z.replace=ya,Z.result=Hc,Z.round=vp,Z.runInContext=p,Z.sample=xf,Z.size=kf,Z.snakeCase=Hh,Z.some=Of,Z.sortedIndex=Wo,Z.sortedIndexBy=Lo,Z.sortedIndexOf=Co,Z.sortedLastIndex=Uo,Z.sortedLastIndexBy=Bo,Z.sortedLastIndexOf=To,Z.startCase=Jh,Z.startsWith=ba,Z.subtract=gp,Z.sum=el,Z.sumBy=ul,Z.template=wa,Z.times=Ga,Z.toFinite=Ac,Z.toInteger=kc,
Z.toLength=Oc,Z.toLower=ma,Z.toNumber=Ic,Z.toSafeInteger=zc,Z.toString=Ec,Z.toUpper=xa,Z.trim=ja,Z.trimEnd=Aa,Z.trimStart=ka,Z.truncate=Oa,Z.unescape=Ia,Z.uniqueId=Ja,Z.upperCase=Yh,Z.upperFirst=Qh,Z.each=_f,Z.eachRight=vf,Z.first=bo,Ta(Z,function(){var n={};return ue(Z,function(t,r){bl.call(Z.prototype,r)||(n[r]=t)}),n}(),{chain:!1}),Z.VERSION=nn,r(["bind","bindKey","curry","curryRight","partial","partialRight"],function(n){Z[n].placeholder=Z}),r(["drop","take"],function(n,t){Ct.prototype[n]=function(r){
r=r===X?1:Gl(kc(r),0);var e=this.__filtered__&&!t?new Ct(this):this.clone();return e.__filtered__?e.__takeCount__=Hl(r,e.__takeCount__):e.__views__.push({size:Hl(r,Un),type:n+(e.__dir__<0?"Right":"")}),e},Ct.prototype[n+"Right"]=function(t){return this.reverse()[n](t).reverse()}}),r(["filter","map","takeWhile"],function(n,t){var r=t+1,e=r==Rn||r==En;Ct.prototype[n]=function(n){var t=this.clone();return t.__iteratees__.push({iteratee:mi(n,3),type:r}),t.__filtered__=t.__filtered__||e,t}}),r(["head","last"],function(n,t){
var r="take"+(t?"Right":"");Ct.prototype[n]=function(){return this[r](1).value()[0]}}),r(["initial","tail"],function(n,t){var r="drop"+(t?"":"Right");Ct.prototype[n]=function(){return this.__filtered__?new Ct(this):this[r](1)}}),Ct.prototype.compact=function(){return this.filter(La)},Ct.prototype.find=function(n){return this.filter(n).head()},Ct.prototype.findLast=function(n){return this.reverse().find(n)},Ct.prototype.invokeMap=uu(function(n,t){return"function"==typeof n?new Ct(this):this.map(function(r){
return Ie(r,n,t)})}),Ct.prototype.reject=function(n){return this.filter(Uf(mi(n)))},Ct.prototype.slice=function(n,t){n=kc(n);var r=this;return r.__filtered__&&(n>0||t<0)?new Ct(r):(n<0?r=r.takeRight(-n):n&&(r=r.drop(n)),t!==X&&(t=kc(t),r=t<0?r.dropRight(-t):r.take(t-n)),r)},Ct.prototype.takeRightWhile=function(n){return this.reverse().takeWhile(n).reverse()},Ct.prototype.toArray=function(){return this.take(Un)},ue(Ct.prototype,function(n,t){var r=/^(?:filter|find|map|reject)|While$/.test(t),e=/^(?:head|last)$/.test(t),u=Z[e?"take"+("last"==t?"Right":""):t],i=e||/^find/.test(t);
u&&(Z.prototype[t]=function(){var t=this.__wrapped__,o=e?[1]:arguments,f=t instanceof Ct,c=o[0],l=f||bh(t),s=function(n){var t=u.apply(Z,a([n],o));return e&&h?t[0]:t};l&&r&&"function"==typeof c&&1!=c.length&&(f=l=!1);var h=this.__chain__,p=!!this.__actions__.length,_=i&&!h,v=f&&!p;if(!i&&l){t=v?t:new Ct(this);var g=n.apply(t,o);return g.__actions__.push({func:nf,args:[s],thisArg:X}),new Y(g,h)}return _&&v?n.apply(this,o):(g=this.thru(s),_?e?g.value()[0]:g.value():g)})}),r(["pop","push","shift","sort","splice","unshift"],function(n){
var t=_l[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|shift)$/.test(n);Z.prototype[n]=function(){var n=arguments;if(e&&!this.__chain__){var u=this.value();return t.apply(bh(u)?u:[],n)}return this[r](function(r){return t.apply(bh(r)?r:[],n)})}}),ue(Ct.prototype,function(n,t){var r=Z[t];if(r){var e=r.name+"";bl.call(fs,e)||(fs[e]=[]),fs[e].push({name:t,func:r})}}),fs[Qu(X,vn).name]=[{name:"wrapper",func:X}],Ct.prototype.clone=$t,Ct.prototype.reverse=Yt,Ct.prototype.value=Qt,Z.prototype.at=Qs,
Z.prototype.chain=tf,Z.prototype.commit=rf,Z.prototype.next=ef,Z.prototype.plant=of,Z.prototype.reverse=ff,Z.prototype.toJSON=Z.prototype.valueOf=Z.prototype.value=cf,Z.prototype.first=Z.prototype.head,Ul&&(Z.prototype[Ul]=uf),Z},be=de();"function"==typeof define&&"object"==typeof define.amd&&define.amd?(re._=be,define(function(){return be})):ue?((ue.exports=be)._=be,ee._=be):re._=be}).call(this);

/***/ }),

/***/ 467:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Stream = _interopDefault(__webpack_require__(2413));
var http = _interopDefault(__webpack_require__(8605));
var Url = _interopDefault(__webpack_require__(8835));
var whatwgUrl = _interopDefault(__webpack_require__(3323));
var https = _interopDefault(__webpack_require__(7211));
var zlib = _interopDefault(__webpack_require__(8761));

// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js

// fix for "Readable" isn't a named export issue
const Readable = Stream.Readable;

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];
		let size = 0;

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				size += buffer.length;
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	text() {
		return Promise.resolve(this[BUFFER].toString());
	}
	arrayBuffer() {
		const buf = this[BUFFER];
		const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		return Promise.resolve(ab);
	}
	stream() {
		const readable = new Readable();
		readable._read = function () {};
		readable.push(this[BUFFER]);
		readable.push(null);
		return readable;
	}
	toString() {
		return '[object Blob]';
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

let convert;
try {
	convert = __webpack_require__(2877).convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

// fix an issue where "PassThrough" isn't a named export for node <10
const PassThrough = Stream.PassThrough;

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		body = Buffer.from(body.toString());
	} else if (isBlob(body)) ; else if (Buffer.isBuffer(body)) ; else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		body = Buffer.from(body);
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
	} else if (body instanceof Stream) ; else {
		// none of the above
		// coerce to string then buffer
		body = Buffer.from(String(body));
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			const error = err.name === 'AbortError' ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
			_this[INTERNALS].error = error;
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}
};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	let body = this.body;

	// body is null
	if (body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is blob
	if (isBlob(body)) {
		body = body.stream();
	}

	// body is buffer
	if (Buffer.isBuffer(body)) {
		return Body.Promise.resolve(body);
	}

	// istanbul ignore if: should never happen
	if (!(body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream errors
		body.on('error', function (err) {
			if (err.name === 'AbortError') {
				// if the request was aborted, reject with this Error
				abort = true;
				reject(err);
			} else {
				// other errors, such as incorrect content-encoding
				reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
			}
		});

		body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum, accumBytes));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
		if (!res) {
			res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
			if (res) {
				res.pop(); // drop last quote
			}
		}

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Check if `obj` is a W3C `Blob` object (which `File` inherits from)
 * @param  {*} obj
 * @return {boolean}
 */
function isBlob(obj) {
	return typeof obj === 'object' && typeof obj.arrayBuffer === 'function' && typeof obj.type === 'string' && typeof obj.stream === 'function' && typeof obj.constructor === 'function' && typeof obj.constructor.name === 'string' && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Any options.body input
 */
function extractContentType(body) {
	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (isBlob(body)) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is ArrayBuffer
		return null;
	} else if (ArrayBuffer.isView(body)) {
		// body is ArrayBufferView
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else if (body instanceof Stream) {
		// body is stream
		// can't really do much about this
		return null;
	} else {
		// Body constructor defaults other things to string
		return 'text/plain;charset=UTF-8';
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		return 0;
	} else if (isBlob(body)) {
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (isBlob(body)) {
		body.stream().pipe(dest);
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name) || name === '') {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) ; else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

const INTERNALS$1 = Symbol('Response internals');

// fix an issue where "STATUS_CODES" aren't a named export for node <10
const STATUS_CODES = http.STATUS_CODES;

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;
		const headers = new Headers(opts.headers);

		if (body != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(body);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers,
			counter: opts.counter
		};
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok,
			redirected: this.redirected
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	redirected: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

const INTERNALS$2 = Symbol('Request internals');
const URL = Url.URL || whatwgUrl.URL;

// fix an issue where "format", "parse" aren't a named export for node <10
const parse_url = Url.parse;
const format_url = Url.format;

/**
 * Wrapper around `new URL` to handle arbitrary URLs
 *
 * @param  {string} urlStr
 * @return {void}
 */
function parseURL(urlStr) {
	/*
 	Check whether the URL is absolute or not
 		Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
 	Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
 */
	if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.exec(urlStr)) {
		urlStr = new URL(urlStr).toString();
	}

	// Fallback to old implementation for arbitrary URLs
	return parse_url(urlStr);
}

const streamDestructionSupported = 'destroy' in Stream.Readable.prototype;

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

function isAbortSignal(signal) {
	const proto = signal && typeof signal === 'object' && Object.getPrototypeOf(signal);
	return !!(proto && proto.constructor.name === 'AbortSignal');
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parseURL(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parseURL(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parseURL(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (inputBody != null && !headers.has('Content-Type')) {
			const contentType = extractContentType(inputBody);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = isRequest(input) ? input.signal : null;
		if ('signal' in init) signal = init.signal;

		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal');
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL,
			signal
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	get signal() {
		return this[INTERNALS$2].signal;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true },
	signal: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
		throw new Error('Cancellation of streamed requests with AbortSignal is not supported in node < 8');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}

	let agent = request.agent;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent
	});
}

/**
 * abort-error.js
 *
 * AbortError interface for cancelled requests
 */

/**
 * Create AbortError instance
 *
 * @param   String      message      Error message for human
 * @return  AbortError
 */
function AbortError(message) {
  Error.call(this, message);

  this.type = 'aborted';
  this.message = message;

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

AbortError.prototype = Object.create(Error.prototype);
AbortError.prototype.constructor = AbortError;
AbortError.prototype.name = 'AbortError';

const URL$1 = Url.URL || whatwgUrl.URL;

// fix an issue where "PassThrough", "resolve" aren't a named export for node <10
const PassThrough$1 = Stream.PassThrough;

const isDomainOrSubdomain = function isDomainOrSubdomain(destination, original) {
	const orig = new URL$1(original).hostname;
	const dest = new URL$1(destination).hostname;

	return orig === dest || orig[orig.length - dest.length - 1] === '.' && orig.endsWith(dest);
};

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;
		const signal = request.signal;

		let response = null;

		const abort = function abort() {
			let error = new AbortError('The user aborted a request.');
			reject(error);
			if (request.body && request.body instanceof Stream.Readable) {
				request.body.destroy(error);
			}
			if (!response || !response.body) return;
			response.body.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = function abortAndFinalize() {
			abort();
			finalize();
		};

		// send request
		const req = send(options);
		let reqTimeout;

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		function finalize() {
			req.abort();
			if (signal) signal.removeEventListener('abort', abortAndFinalize);
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				let locationURL = null;
				try {
					locationURL = location === null ? null : new URL$1(location, request.url).toString();
				} catch (err) {
					// error here can only be invalid URL in Location: header
					// do not throw when options.redirect == manual
					// let the user extract the errorneous redirect URL
					if (request.redirect !== 'manual') {
						reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, 'invalid-redirect'));
						finalize();
						return;
					}
				}

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							// handle corrupted header
							try {
								headers.set('Location', locationURL);
							} catch (err) {
								// istanbul ignore next: nodejs server prevent invalid response headers, we can't test this through normal request
								reject(err);
							}
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body,
							signal: request.signal,
							timeout: request.timeout,
							size: request.size
						};

						if (!isDomainOrSubdomain(request.url, locationURL)) {
							for (const name of ['authorization', 'www-authenticate', 'cookie', 'cookie2']) {
								requestOpts.headers.delete(name);
							}
						}

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			res.once('end', function () {
				if (signal) signal.removeEventListener('abort', abortAndFinalize);
			});
			let body = res.pipe(new PassThrough$1());

			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout,
				counter: request.counter
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					response = new Response(body, response_options);
					resolve(response);
				});
				return;
			}

			// for br
			if (codings == 'br' && typeof zlib.createBrotliDecompress === 'function') {
				body = body.pipe(zlib.createBrotliDecompress());
				response = new Response(body, response_options);
				resolve(response);
				return;
			}

			// otherwise, use response as-is
			response = new Response(body, response_options);
			resolve(response);
		});

		writeToStream(req, request);
	});
}
/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// expose Promise
fetch.Promise = global.Promise;

module.exports = exports = fetch;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = exports;
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.FetchError = FetchError;


/***/ }),

/***/ 2299:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var punycode = __webpack_require__(4213);
var mappingTable = __webpack_require__(8661);

var PROCESSING_OPTIONS = {
  TRANSITIONAL: 0,
  NONTRANSITIONAL: 1
};

function normalize(str) { // fix bug in v8
  return str.split('\u0000').map(function (s) { return s.normalize('NFC'); }).join('\u0000');
}

function findStatus(val) {
  var start = 0;
  var end = mappingTable.length - 1;

  while (start <= end) {
    var mid = Math.floor((start + end) / 2);

    var target = mappingTable[mid];
    if (target[0][0] <= val && target[0][1] >= val) {
      return target;
    } else if (target[0][0] > val) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return null;
}

var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function countSymbols(string) {
  return string
    // replace every surrogate pair with a BMP symbol
    .replace(regexAstralSymbols, '_')
    // then get the length
    .length;
}

function mapChars(domain_name, useSTD3, processing_option) {
  var hasError = false;
  var processed = "";

  var len = countSymbols(domain_name);
  for (var i = 0; i < len; ++i) {
    var codePoint = domain_name.codePointAt(i);
    var status = findStatus(codePoint);

    switch (status[1]) {
      case "disallowed":
        hasError = true;
        processed += String.fromCodePoint(codePoint);
        break;
      case "ignored":
        break;
      case "mapped":
        processed += String.fromCodePoint.apply(String, status[2]);
        break;
      case "deviation":
        if (processing_option === PROCESSING_OPTIONS.TRANSITIONAL) {
          processed += String.fromCodePoint.apply(String, status[2]);
        } else {
          processed += String.fromCodePoint(codePoint);
        }
        break;
      case "valid":
        processed += String.fromCodePoint(codePoint);
        break;
      case "disallowed_STD3_mapped":
        if (useSTD3) {
          hasError = true;
          processed += String.fromCodePoint(codePoint);
        } else {
          processed += String.fromCodePoint.apply(String, status[2]);
        }
        break;
      case "disallowed_STD3_valid":
        if (useSTD3) {
          hasError = true;
        }

        processed += String.fromCodePoint(codePoint);
        break;
    }
  }

  return {
    string: processed,
    error: hasError
  };
}

var combiningMarksRegex = /[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2D]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC00-\uDC02\uDC38-\uDC46\uDC7F-\uDC82\uDCB0-\uDCBA\uDD00-\uDD02\uDD27-\uDD34\uDD73\uDD80-\uDD82\uDDB3-\uDDC0\uDE2C-\uDE37\uDEDF-\uDEEA\uDF01-\uDF03\uDF3C\uDF3E-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF62\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDCB0-\uDCC3\uDDAF-\uDDB5\uDDB8-\uDDC0\uDE30-\uDE40\uDEAB-\uDEB7]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF51-\uDF7E\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD83A[\uDCD0-\uDCD6]|\uDB40[\uDD00-\uDDEF]/;

function validateLabel(label, processing_option) {
  if (label.substr(0, 4) === "xn--") {
    label = punycode.toUnicode(label);
    processing_option = PROCESSING_OPTIONS.NONTRANSITIONAL;
  }

  var error = false;

  if (normalize(label) !== label ||
      (label[3] === "-" && label[4] === "-") ||
      label[0] === "-" || label[label.length - 1] === "-" ||
      label.indexOf(".") !== -1 ||
      label.search(combiningMarksRegex) === 0) {
    error = true;
  }

  var len = countSymbols(label);
  for (var i = 0; i < len; ++i) {
    var status = findStatus(label.codePointAt(i));
    if ((processing === PROCESSING_OPTIONS.TRANSITIONAL && status[1] !== "valid") ||
        (processing === PROCESSING_OPTIONS.NONTRANSITIONAL &&
         status[1] !== "valid" && status[1] !== "deviation")) {
      error = true;
      break;
    }
  }

  return {
    label: label,
    error: error
  };
}

function processing(domain_name, useSTD3, processing_option) {
  var result = mapChars(domain_name, useSTD3, processing_option);
  result.string = normalize(result.string);

  var labels = result.string.split(".");
  for (var i = 0; i < labels.length; ++i) {
    try {
      var validation = validateLabel(labels[i]);
      labels[i] = validation.label;
      result.error = result.error || validation.error;
    } catch(e) {
      result.error = true;
    }
  }

  return {
    string: labels.join("."),
    error: result.error
  };
}

module.exports.toASCII = function(domain_name, useSTD3, processing_option, verifyDnsLength) {
  var result = processing(domain_name, useSTD3, processing_option);
  var labels = result.string.split(".");
  labels = labels.map(function(l) {
    try {
      return punycode.toASCII(l);
    } catch(e) {
      result.error = true;
      return l;
    }
  });

  if (verifyDnsLength) {
    var total = labels.slice(0, labels.length - 1).join(".").length;
    if (total.length > 253 || total.length === 0) {
      result.error = true;
    }

    for (var i=0; i < labels.length; ++i) {
      if (labels.length > 63 || labels.length === 0) {
        result.error = true;
        break;
      }
    }
  }

  if (result.error) return null;
  return labels.join(".");
};

module.exports.toUnicode = function(domain_name, useSTD3) {
  var result = processing(domain_name, useSTD3, PROCESSING_OPTIONS.NONTRANSITIONAL);

  return {
    domain: result.string,
    error: result.error
  };
};

module.exports.PROCESSING_OPTIONS = PROCESSING_OPTIONS;


/***/ }),

/***/ 5871:
/***/ ((module) => {

"use strict";


var conversions = {};
module.exports = conversions;

function sign(x) {
    return x < 0 ? -1 : 1;
}

function evenRound(x) {
    // Round x to the nearest integer, choosing the even integer if it lies halfway between two.
    if ((x % 1) === 0.5 && (x & 1) === 0) { // [even number].5; round down (i.e. floor)
        return Math.floor(x);
    } else {
        return Math.round(x);
    }
}

function createNumberConversion(bitLength, typeOpts) {
    if (!typeOpts.unsigned) {
        --bitLength;
    }
    const lowerBound = typeOpts.unsigned ? 0 : -Math.pow(2, bitLength);
    const upperBound = Math.pow(2, bitLength) - 1;

    const moduloVal = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength) : Math.pow(2, bitLength);
    const moduloBound = typeOpts.moduloBitLength ? Math.pow(2, typeOpts.moduloBitLength - 1) : Math.pow(2, bitLength - 1);

    return function(V, opts) {
        if (!opts) opts = {};

        let x = +V;

        if (opts.enforceRange) {
            if (!Number.isFinite(x)) {
                throw new TypeError("Argument is not a finite number");
            }

            x = sign(x) * Math.floor(Math.abs(x));
            if (x < lowerBound || x > upperBound) {
                throw new TypeError("Argument is not in byte range");
            }

            return x;
        }

        if (!isNaN(x) && opts.clamp) {
            x = evenRound(x);

            if (x < lowerBound) x = lowerBound;
            if (x > upperBound) x = upperBound;
            return x;
        }

        if (!Number.isFinite(x) || x === 0) {
            return 0;
        }

        x = sign(x) * Math.floor(Math.abs(x));
        x = x % moduloVal;

        if (!typeOpts.unsigned && x >= moduloBound) {
            return x - moduloVal;
        } else if (typeOpts.unsigned) {
            if (x < 0) {
              x += moduloVal;
            } else if (x === -0) { // don't return negative zero
              return 0;
            }
        }

        return x;
    }
}

conversions["void"] = function () {
    return undefined;
};

conversions["boolean"] = function (val) {
    return !!val;
};

conversions["byte"] = createNumberConversion(8, { unsigned: false });
conversions["octet"] = createNumberConversion(8, { unsigned: true });

conversions["short"] = createNumberConversion(16, { unsigned: false });
conversions["unsigned short"] = createNumberConversion(16, { unsigned: true });

conversions["long"] = createNumberConversion(32, { unsigned: false });
conversions["unsigned long"] = createNumberConversion(32, { unsigned: true });

conversions["long long"] = createNumberConversion(32, { unsigned: false, moduloBitLength: 64 });
conversions["unsigned long long"] = createNumberConversion(32, { unsigned: true, moduloBitLength: 64 });

conversions["double"] = function (V) {
    const x = +V;

    if (!Number.isFinite(x)) {
        throw new TypeError("Argument is not a finite floating-point value");
    }

    return x;
};

conversions["unrestricted double"] = function (V) {
    const x = +V;

    if (isNaN(x)) {
        throw new TypeError("Argument is NaN");
    }

    return x;
};

// not quite valid, but good enough for JS
conversions["float"] = conversions["double"];
conversions["unrestricted float"] = conversions["unrestricted double"];

conversions["DOMString"] = function (V, opts) {
    if (!opts) opts = {};

    if (opts.treatNullAsEmptyString && V === null) {
        return "";
    }

    return String(V);
};

conversions["ByteString"] = function (V, opts) {
    const x = String(V);
    let c = undefined;
    for (let i = 0; (c = x.codePointAt(i)) !== undefined; ++i) {
        if (c > 255) {
            throw new TypeError("Argument is not a valid bytestring");
        }
    }

    return x;
};

conversions["USVString"] = function (V) {
    const S = String(V);
    const n = S.length;
    const U = [];
    for (let i = 0; i < n; ++i) {
        const c = S.charCodeAt(i);
        if (c < 0xD800 || c > 0xDFFF) {
            U.push(String.fromCodePoint(c));
        } else if (0xDC00 <= c && c <= 0xDFFF) {
            U.push(String.fromCodePoint(0xFFFD));
        } else {
            if (i === n - 1) {
                U.push(String.fromCodePoint(0xFFFD));
            } else {
                const d = S.charCodeAt(i + 1);
                if (0xDC00 <= d && d <= 0xDFFF) {
                    const a = c & 0x3FF;
                    const b = d & 0x3FF;
                    U.push(String.fromCodePoint((2 << 15) + (2 << 9) * a + b));
                    ++i;
                } else {
                    U.push(String.fromCodePoint(0xFFFD));
                }
            }
        }
    }

    return U.join('');
};

conversions["Date"] = function (V, opts) {
    if (!(V instanceof Date)) {
        throw new TypeError("Argument is not a Date object");
    }
    if (isNaN(V)) {
        return undefined;
    }

    return V;
};

conversions["RegExp"] = function (V, opts) {
    if (!(V instanceof RegExp)) {
        V = new RegExp(V);
    }

    return V;
};


/***/ }),

/***/ 8262:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const usm = __webpack_require__(33);

exports.implementation = class URLImpl {
  constructor(constructorArgs) {
    const url = constructorArgs[0];
    const base = constructorArgs[1];

    let parsedBase = null;
    if (base !== undefined) {
      parsedBase = usm.basicURLParse(base);
      if (parsedBase === "failure") {
        throw new TypeError("Invalid base URL");
      }
    }

    const parsedURL = usm.basicURLParse(url, { baseURL: parsedBase });
    if (parsedURL === "failure") {
      throw new TypeError("Invalid URL");
    }

    this._url = parsedURL;

    // TODO: query stuff
  }

  get href() {
    return usm.serializeURL(this._url);
  }

  set href(v) {
    const parsedURL = usm.basicURLParse(v);
    if (parsedURL === "failure") {
      throw new TypeError("Invalid URL");
    }

    this._url = parsedURL;
  }

  get origin() {
    return usm.serializeURLOrigin(this._url);
  }

  get protocol() {
    return this._url.scheme + ":";
  }

  set protocol(v) {
    usm.basicURLParse(v + ":", { url: this._url, stateOverride: "scheme start" });
  }

  get username() {
    return this._url.username;
  }

  set username(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    usm.setTheUsername(this._url, v);
  }

  get password() {
    return this._url.password;
  }

  set password(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    usm.setThePassword(this._url, v);
  }

  get host() {
    const url = this._url;

    if (url.host === null) {
      return "";
    }

    if (url.port === null) {
      return usm.serializeHost(url.host);
    }

    return usm.serializeHost(url.host) + ":" + usm.serializeInteger(url.port);
  }

  set host(v) {
    if (this._url.cannotBeABaseURL) {
      return;
    }

    usm.basicURLParse(v, { url: this._url, stateOverride: "host" });
  }

  get hostname() {
    if (this._url.host === null) {
      return "";
    }

    return usm.serializeHost(this._url.host);
  }

  set hostname(v) {
    if (this._url.cannotBeABaseURL) {
      return;
    }

    usm.basicURLParse(v, { url: this._url, stateOverride: "hostname" });
  }

  get port() {
    if (this._url.port === null) {
      return "";
    }

    return usm.serializeInteger(this._url.port);
  }

  set port(v) {
    if (usm.cannotHaveAUsernamePasswordPort(this._url)) {
      return;
    }

    if (v === "") {
      this._url.port = null;
    } else {
      usm.basicURLParse(v, { url: this._url, stateOverride: "port" });
    }
  }

  get pathname() {
    if (this._url.cannotBeABaseURL) {
      return this._url.path[0];
    }

    if (this._url.path.length === 0) {
      return "";
    }

    return "/" + this._url.path.join("/");
  }

  set pathname(v) {
    if (this._url.cannotBeABaseURL) {
      return;
    }

    this._url.path = [];
    usm.basicURLParse(v, { url: this._url, stateOverride: "path start" });
  }

  get search() {
    if (this._url.query === null || this._url.query === "") {
      return "";
    }

    return "?" + this._url.query;
  }

  set search(v) {
    // TODO: query stuff

    const url = this._url;

    if (v === "") {
      url.query = null;
      return;
    }

    const input = v[0] === "?" ? v.substring(1) : v;
    url.query = "";
    usm.basicURLParse(input, { url, stateOverride: "query" });
  }

  get hash() {
    if (this._url.fragment === null || this._url.fragment === "") {
      return "";
    }

    return "#" + this._url.fragment;
  }

  set hash(v) {
    if (v === "") {
      this._url.fragment = null;
      return;
    }

    const input = v[0] === "#" ? v.substring(1) : v;
    this._url.fragment = "";
    usm.basicURLParse(input, { url: this._url, stateOverride: "fragment" });
  }

  toJSON() {
    return this.href;
  }
};


/***/ }),

/***/ 653:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const conversions = __webpack_require__(5871);
const utils = __webpack_require__(276);
const Impl = __webpack_require__(8262);

const impl = utils.implSymbol;

function URL(url) {
  if (!this || this[impl] || !(this instanceof URL)) {
    throw new TypeError("Failed to construct 'URL': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to construct 'URL': 1 argument required, but only " + arguments.length + " present.");
  }
  const args = [];
  for (let i = 0; i < arguments.length && i < 2; ++i) {
    args[i] = arguments[i];
  }
  args[0] = conversions["USVString"](args[0]);
  if (args[1] !== undefined) {
  args[1] = conversions["USVString"](args[1]);
  }

  module.exports.setup(this, args);
}

URL.prototype.toJSON = function toJSON() {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  const args = [];
  for (let i = 0; i < arguments.length && i < 0; ++i) {
    args[i] = arguments[i];
  }
  return this[impl].toJSON.apply(this[impl], args);
};
Object.defineProperty(URL.prototype, "href", {
  get() {
    return this[impl].href;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].href = V;
  },
  enumerable: true,
  configurable: true
});

URL.prototype.toString = function () {
  if (!this || !module.exports.is(this)) {
    throw new TypeError("Illegal invocation");
  }
  return this.href;
};

Object.defineProperty(URL.prototype, "origin", {
  get() {
    return this[impl].origin;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "protocol", {
  get() {
    return this[impl].protocol;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].protocol = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "username", {
  get() {
    return this[impl].username;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].username = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "password", {
  get() {
    return this[impl].password;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].password = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "host", {
  get() {
    return this[impl].host;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].host = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "hostname", {
  get() {
    return this[impl].hostname;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].hostname = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "port", {
  get() {
    return this[impl].port;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].port = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "pathname", {
  get() {
    return this[impl].pathname;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].pathname = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "search", {
  get() {
    return this[impl].search;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].search = V;
  },
  enumerable: true,
  configurable: true
});

Object.defineProperty(URL.prototype, "hash", {
  get() {
    return this[impl].hash;
  },
  set(V) {
    V = conversions["USVString"](V);
    this[impl].hash = V;
  },
  enumerable: true,
  configurable: true
});


module.exports = {
  is(obj) {
    return !!obj && obj[impl] instanceof Impl.implementation;
  },
  create(constructorArgs, privateData) {
    let obj = Object.create(URL.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};
    privateData.wrapper = obj;

    obj[impl] = new Impl.implementation(constructorArgs, privateData);
    obj[impl][utils.wrapperSymbol] = obj;
  },
  interface: URL,
  expose: {
    Window: { URL: URL },
    Worker: { URL: URL }
  }
};



/***/ }),

/***/ 3323:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.URL = __webpack_require__(653).interface;
exports.serializeURL = __webpack_require__(33).serializeURL;
exports.serializeURLOrigin = __webpack_require__(33).serializeURLOrigin;
exports.basicURLParse = __webpack_require__(33).basicURLParse;
exports.setTheUsername = __webpack_require__(33).setTheUsername;
exports.setThePassword = __webpack_require__(33).setThePassword;
exports.serializeHost = __webpack_require__(33).serializeHost;
exports.serializeInteger = __webpack_require__(33).serializeInteger;
exports.parseURL = __webpack_require__(33).parseURL;


/***/ }),

/***/ 33:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

const punycode = __webpack_require__(4213);
const tr46 = __webpack_require__(2299);

const specialSchemes = {
  ftp: 21,
  file: null,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

const failure = Symbol("failure");

function countSymbols(str) {
  return punycode.ucs2.decode(str).length;
}

function at(input, idx) {
  const c = input[idx];
  return isNaN(c) ? undefined : String.fromCodePoint(c);
}

function isASCIIDigit(c) {
  return c >= 0x30 && c <= 0x39;
}

function isASCIIAlpha(c) {
  return (c >= 0x41 && c <= 0x5A) || (c >= 0x61 && c <= 0x7A);
}

function isASCIIAlphanumeric(c) {
  return isASCIIAlpha(c) || isASCIIDigit(c);
}

function isASCIIHex(c) {
  return isASCIIDigit(c) || (c >= 0x41 && c <= 0x46) || (c >= 0x61 && c <= 0x66);
}

function isSingleDot(buffer) {
  return buffer === "." || buffer.toLowerCase() === "%2e";
}

function isDoubleDot(buffer) {
  buffer = buffer.toLowerCase();
  return buffer === ".." || buffer === "%2e." || buffer === ".%2e" || buffer === "%2e%2e";
}

function isWindowsDriveLetterCodePoints(cp1, cp2) {
  return isASCIIAlpha(cp1) && (cp2 === 58 || cp2 === 124);
}

function isWindowsDriveLetterString(string) {
  return string.length === 2 && isASCIIAlpha(string.codePointAt(0)) && (string[1] === ":" || string[1] === "|");
}

function isNormalizedWindowsDriveLetterString(string) {
  return string.length === 2 && isASCIIAlpha(string.codePointAt(0)) && string[1] === ":";
}

function containsForbiddenHostCodePoint(string) {
  return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|%|\/|:|\?|@|\[|\\|\]/) !== -1;
}

function containsForbiddenHostCodePointExcludingPercent(string) {
  return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|\/|:|\?|@|\[|\\|\]/) !== -1;
}

function isSpecialScheme(scheme) {
  return specialSchemes[scheme] !== undefined;
}

function isSpecial(url) {
  return isSpecialScheme(url.scheme);
}

function defaultPort(scheme) {
  return specialSchemes[scheme];
}

function percentEncode(c) {
  let hex = c.toString(16).toUpperCase();
  if (hex.length === 1) {
    hex = "0" + hex;
  }

  return "%" + hex;
}

function utf8PercentEncode(c) {
  const buf = new Buffer(c);

  let str = "";

  for (let i = 0; i < buf.length; ++i) {
    str += percentEncode(buf[i]);
  }

  return str;
}

function utf8PercentDecode(str) {
  const input = new Buffer(str);
  const output = [];
  for (let i = 0; i < input.length; ++i) {
    if (input[i] !== 37) {
      output.push(input[i]);
    } else if (input[i] === 37 && isASCIIHex(input[i + 1]) && isASCIIHex(input[i + 2])) {
      output.push(parseInt(input.slice(i + 1, i + 3).toString(), 16));
      i += 2;
    } else {
      output.push(input[i]);
    }
  }
  return new Buffer(output).toString();
}

function isC0ControlPercentEncode(c) {
  return c <= 0x1F || c > 0x7E;
}

const extraPathPercentEncodeSet = new Set([32, 34, 35, 60, 62, 63, 96, 123, 125]);
function isPathPercentEncode(c) {
  return isC0ControlPercentEncode(c) || extraPathPercentEncodeSet.has(c);
}

const extraUserinfoPercentEncodeSet =
  new Set([47, 58, 59, 61, 64, 91, 92, 93, 94, 124]);
function isUserinfoPercentEncode(c) {
  return isPathPercentEncode(c) || extraUserinfoPercentEncodeSet.has(c);
}

function percentEncodeChar(c, encodeSetPredicate) {
  const cStr = String.fromCodePoint(c);

  if (encodeSetPredicate(c)) {
    return utf8PercentEncode(cStr);
  }

  return cStr;
}

function parseIPv4Number(input) {
  let R = 10;

  if (input.length >= 2 && input.charAt(0) === "0" && input.charAt(1).toLowerCase() === "x") {
    input = input.substring(2);
    R = 16;
  } else if (input.length >= 2 && input.charAt(0) === "0") {
    input = input.substring(1);
    R = 8;
  }

  if (input === "") {
    return 0;
  }

  const regex = R === 10 ? /[^0-9]/ : (R === 16 ? /[^0-9A-Fa-f]/ : /[^0-7]/);
  if (regex.test(input)) {
    return failure;
  }

  return parseInt(input, R);
}

function parseIPv4(input) {
  const parts = input.split(".");
  if (parts[parts.length - 1] === "") {
    if (parts.length > 1) {
      parts.pop();
    }
  }

  if (parts.length > 4) {
    return input;
  }

  const numbers = [];
  for (const part of parts) {
    if (part === "") {
      return input;
    }
    const n = parseIPv4Number(part);
    if (n === failure) {
      return input;
    }

    numbers.push(n);
  }

  for (let i = 0; i < numbers.length - 1; ++i) {
    if (numbers[i] > 255) {
      return failure;
    }
  }
  if (numbers[numbers.length - 1] >= Math.pow(256, 5 - numbers.length)) {
    return failure;
  }

  let ipv4 = numbers.pop();
  let counter = 0;

  for (const n of numbers) {
    ipv4 += n * Math.pow(256, 3 - counter);
    ++counter;
  }

  return ipv4;
}

function serializeIPv4(address) {
  let output = "";
  let n = address;

  for (let i = 1; i <= 4; ++i) {
    output = String(n % 256) + output;
    if (i !== 4) {
      output = "." + output;
    }
    n = Math.floor(n / 256);
  }

  return output;
}

function parseIPv6(input) {
  const address = [0, 0, 0, 0, 0, 0, 0, 0];
  let pieceIndex = 0;
  let compress = null;
  let pointer = 0;

  input = punycode.ucs2.decode(input);

  if (input[pointer] === 58) {
    if (input[pointer + 1] !== 58) {
      return failure;
    }

    pointer += 2;
    ++pieceIndex;
    compress = pieceIndex;
  }

  while (pointer < input.length) {
    if (pieceIndex === 8) {
      return failure;
    }

    if (input[pointer] === 58) {
      if (compress !== null) {
        return failure;
      }
      ++pointer;
      ++pieceIndex;
      compress = pieceIndex;
      continue;
    }

    let value = 0;
    let length = 0;

    while (length < 4 && isASCIIHex(input[pointer])) {
      value = value * 0x10 + parseInt(at(input, pointer), 16);
      ++pointer;
      ++length;
    }

    if (input[pointer] === 46) {
      if (length === 0) {
        return failure;
      }

      pointer -= length;

      if (pieceIndex > 6) {
        return failure;
      }

      let numbersSeen = 0;

      while (input[pointer] !== undefined) {
        let ipv4Piece = null;

        if (numbersSeen > 0) {
          if (input[pointer] === 46 && numbersSeen < 4) {
            ++pointer;
          } else {
            return failure;
          }
        }

        if (!isASCIIDigit(input[pointer])) {
          return failure;
        }

        while (isASCIIDigit(input[pointer])) {
          const number = parseInt(at(input, pointer));
          if (ipv4Piece === null) {
            ipv4Piece = number;
          } else if (ipv4Piece === 0) {
            return failure;
          } else {
            ipv4Piece = ipv4Piece * 10 + number;
          }
          if (ipv4Piece > 255) {
            return failure;
          }
          ++pointer;
        }

        address[pieceIndex] = address[pieceIndex] * 0x100 + ipv4Piece;

        ++numbersSeen;

        if (numbersSeen === 2 || numbersSeen === 4) {
          ++pieceIndex;
        }
      }

      if (numbersSeen !== 4) {
        return failure;
      }

      break;
    } else if (input[pointer] === 58) {
      ++pointer;
      if (input[pointer] === undefined) {
        return failure;
      }
    } else if (input[pointer] !== undefined) {
      return failure;
    }

    address[pieceIndex] = value;
    ++pieceIndex;
  }

  if (compress !== null) {
    let swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex !== 0 && swaps > 0) {
      const temp = address[compress + swaps - 1];
      address[compress + swaps - 1] = address[pieceIndex];
      address[pieceIndex] = temp;
      --pieceIndex;
      --swaps;
    }
  } else if (compress === null && pieceIndex !== 8) {
    return failure;
  }

  return address;
}

function serializeIPv6(address) {
  let output = "";
  const seqResult = findLongestZeroSequence(address);
  const compress = seqResult.idx;
  let ignore0 = false;

  for (let pieceIndex = 0; pieceIndex <= 7; ++pieceIndex) {
    if (ignore0 && address[pieceIndex] === 0) {
      continue;
    } else if (ignore0) {
      ignore0 = false;
    }

    if (compress === pieceIndex) {
      const separator = pieceIndex === 0 ? "::" : ":";
      output += separator;
      ignore0 = true;
      continue;
    }

    output += address[pieceIndex].toString(16);

    if (pieceIndex !== 7) {
      output += ":";
    }
  }

  return output;
}

function parseHost(input, isSpecialArg) {
  if (input[0] === "[") {
    if (input[input.length - 1] !== "]") {
      return failure;
    }

    return parseIPv6(input.substring(1, input.length - 1));
  }

  if (!isSpecialArg) {
    return parseOpaqueHost(input);
  }

  const domain = utf8PercentDecode(input);
  const asciiDomain = tr46.toASCII(domain, false, tr46.PROCESSING_OPTIONS.NONTRANSITIONAL, false);
  if (asciiDomain === null) {
    return failure;
  }

  if (containsForbiddenHostCodePoint(asciiDomain)) {
    return failure;
  }

  const ipv4Host = parseIPv4(asciiDomain);
  if (typeof ipv4Host === "number" || ipv4Host === failure) {
    return ipv4Host;
  }

  return asciiDomain;
}

function parseOpaqueHost(input) {
  if (containsForbiddenHostCodePointExcludingPercent(input)) {
    return failure;
  }

  let output = "";
  const decoded = punycode.ucs2.decode(input);
  for (let i = 0; i < decoded.length; ++i) {
    output += percentEncodeChar(decoded[i], isC0ControlPercentEncode);
  }
  return output;
}

function findLongestZeroSequence(arr) {
  let maxIdx = null;
  let maxLen = 1; // only find elements > 1
  let currStart = null;
  let currLen = 0;

  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] !== 0) {
      if (currLen > maxLen) {
        maxIdx = currStart;
        maxLen = currLen;
      }

      currStart = null;
      currLen = 0;
    } else {
      if (currStart === null) {
        currStart = i;
      }
      ++currLen;
    }
  }

  // if trailing zeros
  if (currLen > maxLen) {
    maxIdx = currStart;
    maxLen = currLen;
  }

  return {
    idx: maxIdx,
    len: maxLen
  };
}

function serializeHost(host) {
  if (typeof host === "number") {
    return serializeIPv4(host);
  }

  // IPv6 serializer
  if (host instanceof Array) {
    return "[" + serializeIPv6(host) + "]";
  }

  return host;
}

function trimControlChars(url) {
  return url.replace(/^[\u0000-\u001F\u0020]+|[\u0000-\u001F\u0020]+$/g, "");
}

function trimTabAndNewline(url) {
  return url.replace(/\u0009|\u000A|\u000D/g, "");
}

function shortenPath(url) {
  const path = url.path;
  if (path.length === 0) {
    return;
  }
  if (url.scheme === "file" && path.length === 1 && isNormalizedWindowsDriveLetter(path[0])) {
    return;
  }

  path.pop();
}

function includesCredentials(url) {
  return url.username !== "" || url.password !== "";
}

function cannotHaveAUsernamePasswordPort(url) {
  return url.host === null || url.host === "" || url.cannotBeABaseURL || url.scheme === "file";
}

function isNormalizedWindowsDriveLetter(string) {
  return /^[A-Za-z]:$/.test(string);
}

function URLStateMachine(input, base, encodingOverride, url, stateOverride) {
  this.pointer = 0;
  this.input = input;
  this.base = base || null;
  this.encodingOverride = encodingOverride || "utf-8";
  this.stateOverride = stateOverride;
  this.url = url;
  this.failure = false;
  this.parseError = false;

  if (!this.url) {
    this.url = {
      scheme: "",
      username: "",
      password: "",
      host: null,
      port: null,
      path: [],
      query: null,
      fragment: null,

      cannotBeABaseURL: false
    };

    const res = trimControlChars(this.input);
    if (res !== this.input) {
      this.parseError = true;
    }
    this.input = res;
  }

  const res = trimTabAndNewline(this.input);
  if (res !== this.input) {
    this.parseError = true;
  }
  this.input = res;

  this.state = stateOverride || "scheme start";

  this.buffer = "";
  this.atFlag = false;
  this.arrFlag = false;
  this.passwordTokenSeenFlag = false;

  this.input = punycode.ucs2.decode(this.input);

  for (; this.pointer <= this.input.length; ++this.pointer) {
    const c = this.input[this.pointer];
    const cStr = isNaN(c) ? undefined : String.fromCodePoint(c);

    // exec state machine
    const ret = this["parse " + this.state](c, cStr);
    if (!ret) {
      break; // terminate algorithm
    } else if (ret === failure) {
      this.failure = true;
      break;
    }
  }
}

URLStateMachine.prototype["parse scheme start"] = function parseSchemeStart(c, cStr) {
  if (isASCIIAlpha(c)) {
    this.buffer += cStr.toLowerCase();
    this.state = "scheme";
  } else if (!this.stateOverride) {
    this.state = "no scheme";
    --this.pointer;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

URLStateMachine.prototype["parse scheme"] = function parseScheme(c, cStr) {
  if (isASCIIAlphanumeric(c) || c === 43 || c === 45 || c === 46) {
    this.buffer += cStr.toLowerCase();
  } else if (c === 58) {
    if (this.stateOverride) {
      if (isSpecial(this.url) && !isSpecialScheme(this.buffer)) {
        return false;
      }

      if (!isSpecial(this.url) && isSpecialScheme(this.buffer)) {
        return false;
      }

      if ((includesCredentials(this.url) || this.url.port !== null) && this.buffer === "file") {
        return false;
      }

      if (this.url.scheme === "file" && (this.url.host === "" || this.url.host === null)) {
        return false;
      }
    }
    this.url.scheme = this.buffer;
    this.buffer = "";
    if (this.stateOverride) {
      return false;
    }
    if (this.url.scheme === "file") {
      if (this.input[this.pointer + 1] !== 47 || this.input[this.pointer + 2] !== 47) {
        this.parseError = true;
      }
      this.state = "file";
    } else if (isSpecial(this.url) && this.base !== null && this.base.scheme === this.url.scheme) {
      this.state = "special relative or authority";
    } else if (isSpecial(this.url)) {
      this.state = "special authority slashes";
    } else if (this.input[this.pointer + 1] === 47) {
      this.state = "path or authority";
      ++this.pointer;
    } else {
      this.url.cannotBeABaseURL = true;
      this.url.path.push("");
      this.state = "cannot-be-a-base-URL path";
    }
  } else if (!this.stateOverride) {
    this.buffer = "";
    this.state = "no scheme";
    this.pointer = -1;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

URLStateMachine.prototype["parse no scheme"] = function parseNoScheme(c) {
  if (this.base === null || (this.base.cannotBeABaseURL && c !== 35)) {
    return failure;
  } else if (this.base.cannotBeABaseURL && c === 35) {
    this.url.scheme = this.base.scheme;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
    this.url.fragment = "";
    this.url.cannotBeABaseURL = true;
    this.state = "fragment";
  } else if (this.base.scheme === "file") {
    this.state = "file";
    --this.pointer;
  } else {
    this.state = "relative";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special relative or authority"] = function parseSpecialRelativeOrAuthority(c) {
  if (c === 47 && this.input[this.pointer + 1] === 47) {
    this.state = "special authority ignore slashes";
    ++this.pointer;
  } else {
    this.parseError = true;
    this.state = "relative";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse path or authority"] = function parsePathOrAuthority(c) {
  if (c === 47) {
    this.state = "authority";
  } else {
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse relative"] = function parseRelative(c) {
  this.url.scheme = this.base.scheme;
  if (isNaN(c)) {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
  } else if (c === 47) {
    this.state = "relative slash";
  } else if (c === 63) {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice();
    this.url.query = "";
    this.state = "query";
  } else if (c === 35) {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
    this.url.fragment = "";
    this.state = "fragment";
  } else if (isSpecial(this.url) && c === 92) {
    this.parseError = true;
    this.state = "relative slash";
  } else {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice(0, this.base.path.length - 1);

    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse relative slash"] = function parseRelativeSlash(c) {
  if (isSpecial(this.url) && (c === 47 || c === 92)) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "special authority ignore slashes";
  } else if (c === 47) {
    this.state = "authority";
  } else {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special authority slashes"] = function parseSpecialAuthoritySlashes(c) {
  if (c === 47 && this.input[this.pointer + 1] === 47) {
    this.state = "special authority ignore slashes";
    ++this.pointer;
  } else {
    this.parseError = true;
    this.state = "special authority ignore slashes";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special authority ignore slashes"] = function parseSpecialAuthorityIgnoreSlashes(c) {
  if (c !== 47 && c !== 92) {
    this.state = "authority";
    --this.pointer;
  } else {
    this.parseError = true;
  }

  return true;
};

URLStateMachine.prototype["parse authority"] = function parseAuthority(c, cStr) {
  if (c === 64) {
    this.parseError = true;
    if (this.atFlag) {
      this.buffer = "%40" + this.buffer;
    }
    this.atFlag = true;

    // careful, this is based on buffer and has its own pointer (this.pointer != pointer) and inner chars
    const len = countSymbols(this.buffer);
    for (let pointer = 0; pointer < len; ++pointer) {
      const codePoint = this.buffer.codePointAt(pointer);

      if (codePoint === 58 && !this.passwordTokenSeenFlag) {
        this.passwordTokenSeenFlag = true;
        continue;
      }
      const encodedCodePoints = percentEncodeChar(codePoint, isUserinfoPercentEncode);
      if (this.passwordTokenSeenFlag) {
        this.url.password += encodedCodePoints;
      } else {
        this.url.username += encodedCodePoints;
      }
    }
    this.buffer = "";
  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
             (isSpecial(this.url) && c === 92)) {
    if (this.atFlag && this.buffer === "") {
      this.parseError = true;
      return failure;
    }
    this.pointer -= countSymbols(this.buffer) + 1;
    this.buffer = "";
    this.state = "host";
  } else {
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse hostname"] =
URLStateMachine.prototype["parse host"] = function parseHostName(c, cStr) {
  if (this.stateOverride && this.url.scheme === "file") {
    --this.pointer;
    this.state = "file host";
  } else if (c === 58 && !this.arrFlag) {
    if (this.buffer === "") {
      this.parseError = true;
      return failure;
    }

    const host = parseHost(this.buffer, isSpecial(this.url));
    if (host === failure) {
      return failure;
    }

    this.url.host = host;
    this.buffer = "";
    this.state = "port";
    if (this.stateOverride === "hostname") {
      return false;
    }
  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
             (isSpecial(this.url) && c === 92)) {
    --this.pointer;
    if (isSpecial(this.url) && this.buffer === "") {
      this.parseError = true;
      return failure;
    } else if (this.stateOverride && this.buffer === "" &&
               (includesCredentials(this.url) || this.url.port !== null)) {
      this.parseError = true;
      return false;
    }

    const host = parseHost(this.buffer, isSpecial(this.url));
    if (host === failure) {
      return failure;
    }

    this.url.host = host;
    this.buffer = "";
    this.state = "path start";
    if (this.stateOverride) {
      return false;
    }
  } else {
    if (c === 91) {
      this.arrFlag = true;
    } else if (c === 93) {
      this.arrFlag = false;
    }
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse port"] = function parsePort(c, cStr) {
  if (isASCIIDigit(c)) {
    this.buffer += cStr;
  } else if (isNaN(c) || c === 47 || c === 63 || c === 35 ||
             (isSpecial(this.url) && c === 92) ||
             this.stateOverride) {
    if (this.buffer !== "") {
      const port = parseInt(this.buffer);
      if (port > Math.pow(2, 16) - 1) {
        this.parseError = true;
        return failure;
      }
      this.url.port = port === defaultPort(this.url.scheme) ? null : port;
      this.buffer = "";
    }
    if (this.stateOverride) {
      return false;
    }
    this.state = "path start";
    --this.pointer;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

const fileOtherwiseCodePoints = new Set([47, 92, 63, 35]);

URLStateMachine.prototype["parse file"] = function parseFile(c) {
  this.url.scheme = "file";

  if (c === 47 || c === 92) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "file slash";
  } else if (this.base !== null && this.base.scheme === "file") {
    if (isNaN(c)) {
      this.url.host = this.base.host;
      this.url.path = this.base.path.slice();
      this.url.query = this.base.query;
    } else if (c === 63) {
      this.url.host = this.base.host;
      this.url.path = this.base.path.slice();
      this.url.query = "";
      this.state = "query";
    } else if (c === 35) {
      this.url.host = this.base.host;
      this.url.path = this.base.path.slice();
      this.url.query = this.base.query;
      this.url.fragment = "";
      this.state = "fragment";
    } else {
      if (this.input.length - this.pointer - 1 === 0 || // remaining consists of 0 code points
          !isWindowsDriveLetterCodePoints(c, this.input[this.pointer + 1]) ||
          (this.input.length - this.pointer - 1 >= 2 && // remaining has at least 2 code points
           !fileOtherwiseCodePoints.has(this.input[this.pointer + 2]))) {
        this.url.host = this.base.host;
        this.url.path = this.base.path.slice();
        shortenPath(this.url);
      } else {
        this.parseError = true;
      }

      this.state = "path";
      --this.pointer;
    }
  } else {
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse file slash"] = function parseFileSlash(c) {
  if (c === 47 || c === 92) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "file host";
  } else {
    if (this.base !== null && this.base.scheme === "file") {
      if (isNormalizedWindowsDriveLetterString(this.base.path[0])) {
        this.url.path.push(this.base.path[0]);
      } else {
        this.url.host = this.base.host;
      }
    }
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse file host"] = function parseFileHost(c, cStr) {
  if (isNaN(c) || c === 47 || c === 92 || c === 63 || c === 35) {
    --this.pointer;
    if (!this.stateOverride && isWindowsDriveLetterString(this.buffer)) {
      this.parseError = true;
      this.state = "path";
    } else if (this.buffer === "") {
      this.url.host = "";
      if (this.stateOverride) {
        return false;
      }
      this.state = "path start";
    } else {
      let host = parseHost(this.buffer, isSpecial(this.url));
      if (host === failure) {
        return failure;
      }
      if (host === "localhost") {
        host = "";
      }
      this.url.host = host;

      if (this.stateOverride) {
        return false;
      }

      this.buffer = "";
      this.state = "path start";
    }
  } else {
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse path start"] = function parsePathStart(c) {
  if (isSpecial(this.url)) {
    if (c === 92) {
      this.parseError = true;
    }
    this.state = "path";

    if (c !== 47 && c !== 92) {
      --this.pointer;
    }
  } else if (!this.stateOverride && c === 63) {
    this.url.query = "";
    this.state = "query";
  } else if (!this.stateOverride && c === 35) {
    this.url.fragment = "";
    this.state = "fragment";
  } else if (c !== undefined) {
    this.state = "path";
    if (c !== 47) {
      --this.pointer;
    }
  }

  return true;
};

URLStateMachine.prototype["parse path"] = function parsePath(c) {
  if (isNaN(c) || c === 47 || (isSpecial(this.url) && c === 92) ||
      (!this.stateOverride && (c === 63 || c === 35))) {
    if (isSpecial(this.url) && c === 92) {
      this.parseError = true;
    }

    if (isDoubleDot(this.buffer)) {
      shortenPath(this.url);
      if (c !== 47 && !(isSpecial(this.url) && c === 92)) {
        this.url.path.push("");
      }
    } else if (isSingleDot(this.buffer) && c !== 47 &&
               !(isSpecial(this.url) && c === 92)) {
      this.url.path.push("");
    } else if (!isSingleDot(this.buffer)) {
      if (this.url.scheme === "file" && this.url.path.length === 0 && isWindowsDriveLetterString(this.buffer)) {
        if (this.url.host !== "" && this.url.host !== null) {
          this.parseError = true;
          this.url.host = "";
        }
        this.buffer = this.buffer[0] + ":";
      }
      this.url.path.push(this.buffer);
    }
    this.buffer = "";
    if (this.url.scheme === "file" && (c === undefined || c === 63 || c === 35)) {
      while (this.url.path.length > 1 && this.url.path[0] === "") {
        this.parseError = true;
        this.url.path.shift();
      }
    }
    if (c === 63) {
      this.url.query = "";
      this.state = "query";
    }
    if (c === 35) {
      this.url.fragment = "";
      this.state = "fragment";
    }
  } else {
    // TODO: If c is not a URL code point and not "%", parse error.

    if (c === 37 &&
      (!isASCIIHex(this.input[this.pointer + 1]) ||
        !isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.buffer += percentEncodeChar(c, isPathPercentEncode);
  }

  return true;
};

URLStateMachine.prototype["parse cannot-be-a-base-URL path"] = function parseCannotBeABaseURLPath(c) {
  if (c === 63) {
    this.url.query = "";
    this.state = "query";
  } else if (c === 35) {
    this.url.fragment = "";
    this.state = "fragment";
  } else {
    // TODO: Add: not a URL code point
    if (!isNaN(c) && c !== 37) {
      this.parseError = true;
    }

    if (c === 37 &&
        (!isASCIIHex(this.input[this.pointer + 1]) ||
         !isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    if (!isNaN(c)) {
      this.url.path[0] = this.url.path[0] + percentEncodeChar(c, isC0ControlPercentEncode);
    }
  }

  return true;
};

URLStateMachine.prototype["parse query"] = function parseQuery(c, cStr) {
  if (isNaN(c) || (!this.stateOverride && c === 35)) {
    if (!isSpecial(this.url) || this.url.scheme === "ws" || this.url.scheme === "wss") {
      this.encodingOverride = "utf-8";
    }

    const buffer = new Buffer(this.buffer); // TODO: Use encoding override instead
    for (let i = 0; i < buffer.length; ++i) {
      if (buffer[i] < 0x21 || buffer[i] > 0x7E || buffer[i] === 0x22 || buffer[i] === 0x23 ||
          buffer[i] === 0x3C || buffer[i] === 0x3E) {
        this.url.query += percentEncode(buffer[i]);
      } else {
        this.url.query += String.fromCodePoint(buffer[i]);
      }
    }

    this.buffer = "";
    if (c === 35) {
      this.url.fragment = "";
      this.state = "fragment";
    }
  } else {
    // TODO: If c is not a URL code point and not "%", parse error.
    if (c === 37 &&
      (!isASCIIHex(this.input[this.pointer + 1]) ||
        !isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse fragment"] = function parseFragment(c) {
  if (isNaN(c)) { // do nothing
  } else if (c === 0x0) {
    this.parseError = true;
  } else {
    // TODO: If c is not a URL code point and not "%", parse error.
    if (c === 37 &&
      (!isASCIIHex(this.input[this.pointer + 1]) ||
        !isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.url.fragment += percentEncodeChar(c, isC0ControlPercentEncode);
  }

  return true;
};

function serializeURL(url, excludeFragment) {
  let output = url.scheme + ":";
  if (url.host !== null) {
    output += "//";

    if (url.username !== "" || url.password !== "") {
      output += url.username;
      if (url.password !== "") {
        output += ":" + url.password;
      }
      output += "@";
    }

    output += serializeHost(url.host);

    if (url.port !== null) {
      output += ":" + url.port;
    }
  } else if (url.host === null && url.scheme === "file") {
    output += "//";
  }

  if (url.cannotBeABaseURL) {
    output += url.path[0];
  } else {
    for (const string of url.path) {
      output += "/" + string;
    }
  }

  if (url.query !== null) {
    output += "?" + url.query;
  }

  if (!excludeFragment && url.fragment !== null) {
    output += "#" + url.fragment;
  }

  return output;
}

function serializeOrigin(tuple) {
  let result = tuple.scheme + "://";
  result += serializeHost(tuple.host);

  if (tuple.port !== null) {
    result += ":" + tuple.port;
  }

  return result;
}

module.exports.serializeURL = serializeURL;

module.exports.serializeURLOrigin = function (url) {
  // https://url.spec.whatwg.org/#concept-url-origin
  switch (url.scheme) {
    case "blob":
      try {
        return module.exports.serializeURLOrigin(module.exports.parseURL(url.path[0]));
      } catch (e) {
        // serializing an opaque origin returns "null"
        return "null";
      }
    case "ftp":
    case "gopher":
    case "http":
    case "https":
    case "ws":
    case "wss":
      return serializeOrigin({
        scheme: url.scheme,
        host: url.host,
        port: url.port
      });
    case "file":
      // spec says "exercise to the reader", chrome says "file://"
      return "file://";
    default:
      // serializing an opaque origin returns "null"
      return "null";
  }
};

module.exports.basicURLParse = function (input, options) {
  if (options === undefined) {
    options = {};
  }

  const usm = new URLStateMachine(input, options.baseURL, options.encodingOverride, options.url, options.stateOverride);
  if (usm.failure) {
    return "failure";
  }

  return usm.url;
};

module.exports.setTheUsername = function (url, username) {
  url.username = "";
  const decoded = punycode.ucs2.decode(username);
  for (let i = 0; i < decoded.length; ++i) {
    url.username += percentEncodeChar(decoded[i], isUserinfoPercentEncode);
  }
};

module.exports.setThePassword = function (url, password) {
  url.password = "";
  const decoded = punycode.ucs2.decode(password);
  for (let i = 0; i < decoded.length; ++i) {
    url.password += percentEncodeChar(decoded[i], isUserinfoPercentEncode);
  }
};

module.exports.serializeHost = serializeHost;

module.exports.cannotHaveAUsernamePasswordPort = cannotHaveAUsernamePasswordPort;

module.exports.serializeInteger = function (integer) {
  return String(integer);
};

module.exports.parseURL = function (input, options) {
  if (options === undefined) {
    options = {};
  }

  // We don't handle blobs, so this just delegates:
  return module.exports.basicURLParse(input, { baseURL: options.baseURL, encodingOverride: options.encodingOverride });
};


/***/ }),

/***/ 276:
/***/ ((module) => {

"use strict";


module.exports.mixin = function mixin(target, source) {
  const keys = Object.getOwnPropertyNames(source);
  for (let i = 0; i < keys.length; ++i) {
    Object.defineProperty(target, keys[i], Object.getOwnPropertyDescriptor(source, keys[i]));
  }
};

module.exports.wrapperSymbol = Symbol("wrapper");
module.exports.implSymbol = Symbol("impl");

module.exports.wrapperForImpl = function (impl) {
  return impl[module.exports.wrapperSymbol];
};

module.exports.implForWrapper = function (wrapper) {
  return wrapper[module.exports.implSymbol];
};



/***/ }),

/***/ 1223:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var wrappy = __webpack_require__(2940)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),

/***/ 4294:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(4219);


/***/ }),

/***/ 4219:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var net = __webpack_require__(1631);
var tls = __webpack_require__(4016);
var http = __webpack_require__(8605);
var https = __webpack_require__(7211);
var events = __webpack_require__(8614);
var assert = __webpack_require__(2357);
var util = __webpack_require__(1669);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 5030:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({ value: true }));

function getUserAgent() {
  if (typeof navigator === "object" && "userAgent" in navigator) {
    return navigator.userAgent;
  }

  if (typeof process === "object" && "version" in process) {
    return `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`;
  }

  return "<environment undetectable>";
}

exports.getUserAgent = getUserAgent;
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 2940:
/***/ ((module) => {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),

/***/ 7229:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const core = __webpack_require__(2186);
const { defaultsAll, filter, identity, pickBy } = __webpack_require__(4542);

const inputs = defaultsAll([
  // use specific inputs when set
  pickBy(identity, {
    githubToken: core.getInput("github_token", { required: true }),
    octopusApiKey: core.getInput("octopus_api_key"),
    octopusServer: core.getInput("octopus_server"),
    octopusEnvironment: core.getInput("octopus_environment"),
    octopusProject: core.getInput("octopus_project"),
    octopusSpace: core.getInput("octopus_space"),
    outputPath: core.getInput("output_path"),
    pushOverwriteMode: core.getInput("push_overwrite_mode", { required: true }),
    pushPackageIds: filter(identity, (core.getInput("push_package_ids") || "").trim().split(/\s+/)),
    pushVersion: core.getInput("push_version"),
    versionTagPrefix: core.getInput("version_tag_prefix", { required: true }),
  }),
  // use environment variables as a fallback
  pickBy(identity, {
    octopusApiKey: process.env.OCTOPUS_CLI_API_KEY,
    octopusServer: process.env.OCTOPUS_CLI_SERVER,
    octopusEnvironment: process.env.OCTOPUS_ENVIRONMENT,
    octopusProject: process.env.OCTOPUS_PROJECT,
    octopusSpace: process.env.OCTOPUS_SPACE,
  }),
  // use these explicit defaults
  {
    octopusEnvironment: "Production",
  },
]);

module.exports = inputs;


/***/ }),

/***/ 1713:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const core = __webpack_require__(2186);
const { context, getOctokit } = __webpack_require__(5438);
const fp = __webpack_require__(4542);
const fs = __webpack_require__(5747).promises;
const nodeFetch = __webpack_require__(467);
const { join: joinPath } = __webpack_require__(5622);
const { URL } = __webpack_require__(8835);

const inputs = __webpack_require__(7229);
const { memoizeAsync } = __webpack_require__(6254);

/**
 * Make an HTTP request to the Octopus Deploy API.
 * @param {?string} spaceId the Octopus ID of the space (e.g. 'Spaces-1')
 * @param {string} resource the API resource path
 * @param {object} options request options
 * @param {string} options.method HTTP request method
 * @param {object} options.headers HTTP request headers
 * @param {object} [params={}] HTTP query parameters
 * @returns {Promise<object>} de-serialized response JSON
 */
async function octopusRequest(spaceId, resource, options, params = {}) {
  if (!inputs.octopusApiKey) throw new Error("Missing required input: octopus_api_key");
  if (!inputs.octopusServer) throw new Error("Missing required input: octopus_server");

  const url = spaceId
    ? new URL(`/api/${spaceId}/${resource}`, inputs.octopusServer)
    : new URL(`/api/${resource}`, inputs.octopusServer);
  url.search = new URLSearchParams(params);

  // deep-merge defaults with passed-in options
  const merged = fp.merge(
    {
      method: "GET",
      headers: {
        "X-Octopus-ApiKey": inputs.octopusApiKey,
      },
    },
    options
  );
  core.debug(`Octopus Deploy API request ${merged.method} ${url}`);

  // send the request
  const response = await nodeFetch(url, merged);
  core.debug(
    // eslint-disable-next-line prettier/prettier
    `Octopus Deploy API response ${response.status} ${response.statusText} ${response.headers.get("content-type")}`
  );
  if (response.ok) return response.json();
  throw new Error(response.statusText);
}

/**
 * Make an HTTP GET request to the Octopus Deploy API.
 * @param {?string} spaceId the Octopus ID of the space (e.g. 'Spaces-1')
 * @param {string} resource the API resource path
 * @param {object} [params={}] HTTP query parameters
 * @returns {Promise<object>} de-serialized response JSON
 */
async function octopusGet(spaceId, resource, params = {}) {
  return octopusRequest(spaceId, resource, { method: "GET" }, params);
}

/**
 * Tests whether any of item.Name, item.Id, or item.Slug matches search.
 * @param {object} item an Octopus Deploy API response item
 * @param {string} search search term
 */
function octopusFuzzyMatch(item, search) {
  return item.Name === search || item.Id === search || item.Slug === search;
}

/**
 * Queries the Octopus Deploy API for a space.
 * @param {?string} spaceName the name, id, or slug of the space, or null to find the default space
 * @returns {Promise<object>} de-serialized response JSON
 */
const getOctopusSpace = memoizeAsync(async (spaceName) => {
  const payload = await octopusGet(null, "spaces/all");

  const space = spaceName
    ? payload.find((item) => octopusFuzzyMatch(item, spaceName))
    : payload.find((item) => item.IsDefault);
  if (!space) {
    throw new Error(`No space named '${spaceName || "Default"}' was found`);
  }

  return space;
});

/**
 * Discover the previous release's SHA by querying the Octopus Deploy API.
 * @param {Octokit} github an authenticated octokit REST client
 * @returns {Promise<string>} the SHA of the previous release, or undefined
 */
async function getPreviousRef(github) {
  let space;
  let project;
  let environment;
  let deployment;

  // without a project name, give up immediately
  if (!inputs.octopusProject) {
    core.info("Octopus project name undefined; skipping commits detection");
    return undefined;
  }

  // fetch the space
  try {
    space = await getOctopusSpace(inputs.octopusSpace);
    core.info(`Detected Octopus space ${space.Name} (${space.Id})`);
  } catch (e) {
    core.warning(`Failed to fetch Octopus space: ${e.message}`);
    return undefined;
  }

  // fetch the Octopus project
  try {
    const payload = await octopusGet(space.Id, `projects/all`);

    // allow project to match name, slug, or id
    project = payload.find((item) => octopusFuzzyMatch(item, inputs.octopusProject));
    if (!project) {
      throw new Error(`No project named '${inputs.octopusProject}' was found`);
    }
    core.info(`Detected Octopus project ${project.Name} (${project.Id})`);
  } catch (e) {
    core.warning(`Failed to fetch Octopus project: ${e.message}`);
    return undefined;
  }

  // fetch the Octopus environments and find ours
  try {
    const payload = await octopusGet(space.Id, "environments/all");

    // fall back to the last environment in the sort order
    environment =
      payload.find((item) => octopusFuzzyMatch(item, inputs.octopusEnvironment)) ||
      payload[payload.length - 1];
    core.info(`Detected Octopus environment ${environment.Name} (${environment.Id})`);
  } catch (e) {
    core.warning(`Failed to fetch Octopus environments: ${e.message}`);
    return undefined;
  }

  // fetch the most recent Octopus deployment for this project and environment
  try {
    const payload = await octopusGet(space.Id, "deployments", {
      take: 1,
      projects: project.Id,
      environments: environment.Id,
      taskState: "Success",
    });

    // there should be 0 or 1 deployments in the payload
    if (payload.TotalResults < 1) {
      core.info("No previous Octopus deployment found");
      return undefined;
    }
    deployment = payload.Items[0];
    core.info(`Detected latest Octopus deployment ${deployment.Id} @ ${deployment.Created}`);
  } catch (e) {
    core.warning(`Failed to fetch previous Octopus deployment: ${e.message}`);
    return undefined;
  }

  // we're looking for the "Changes" in this deployment
  if (deployment.Changes.length < 1) {
    core.warning("Deployment does not contain any changes");
    return undefined;
  }

  // find a BuildInformation object matching one of our push packages
  const buildInformationSequence = fp.flatMap(
    (x) => x.BuildInformation,
    fp.reverse(deployment.Changes)
  );
  const buildInformationForPackage = fp.head(
    fp.filter(
      (x) => x.VcsCommitNumber && inputs.pushPackageIds.includes(x.PackageId),
      buildInformationSequence
    )
  );

  // use that one, if we found one, or if not look for any
  const buildInformation =
    buildInformationForPackage ||
    fp.head(fp.filter((x) => x.VcsCommitNumber, buildInformationSequence));

  // success! use this commit as the previous version
  if (buildInformation) {
    core.info(`Detected previous build @ ${buildInformation.VcsCommitNumber}`);
    return buildInformation.VcsCommitNumber;
  }

  // try using the last version number (changes appear to be in sequential order)
  const version = fp.last(
    fp.filter(
      fp.identity,
      fp.map((x) => x.Version, deployment.Changes)
    )
  );
  if (!version) {
    core.warning("Deployment does not contain any build information");
    return undefined;
  }

  // we found a version, see if there is a matching tag on GitHub
  core.info(`Detected previous version ${version}, looking for a matching tag...`);
  try {
    const tag = `${inputs.versionTagPrefix}${version}`;
    const response = await github.git.getRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: `tags/${tag}`,
    });
    core.info(`Mapped tag ${tag} to ${response.data.object.sha}`);
    return response.data.object.sha;
  } catch (e) {
    core.warning(`Failed to fetch ref: ${e.message}`);
    return undefined;
  }
}

/**
 * Get the commits since a base commit.
 * @param {Octokit} github an authenticated octokit REST client
 * @param {string} base the SHA of the base commit
 * @returns {Promise<array>} an array of commit objects
 */
async function getCommits(github, base) {
  if (!base) return [];

  // compare commits with pagination
  let commits = [];
  try {
    const request = github.repos.compareCommits.endpoint.merge({
      owner: context.repo.owner,
      repo: context.repo.repo,
      base,
      head: context.sha,
    });
    // eslint-disable-next-line no-restricted-syntax
    for await (const response of github.paginate.iterator(request)) {
      commits = commits.concat(response.data.commits);
    }
  } catch (e) {
    core.warning(`Failed to compare commits: ${e.message}`);
  }

  return commits;
}

/**
 * Push build information to the Octopus Deploy API.
 * @param {string} spaceId the Octopus ID of the space (e.g. 'Spaces-1')
 * @param {string} packageId the package ID
 * @param {string} version the package version
 * @param {object} buildInformation the build information
 * @param {string} overwriteMode action to take when the build information already exists
 * @returns {Promise<object>} the de-serialized response JSON
 */
async function pushBuildInformation(spaceId, packageId, version, buildInformation, overwriteMode) {
  const payload = {
    PackageId: packageId,
    Version: version,
    OctopusBuildInformation: buildInformation,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };
  core.info(`Pushing build information for ${packageId} version ${version}`);
  return octopusRequest(spaceId, "build-information", options, { overwriteMode });
}

async function run() {
  try {
    const github = getOctokit(inputs.githubToken);
    const previousRef = await getPreviousRef(github);

    // compare the previous release to the current tag
    const commits = await getCommits(github, previousRef);
    core.info(`Collected ${commits.length} commits`);

    // construct build information
    const repoUri = `https://github.com/${context.repo.owner}/${context.repo.repo}`;
    const runId = process.env.GITHUB_RUN_ID;
    const build = {
      BuildEnvironment: "GitHub Actions",
      BuildNumber: runId.toString(),
      BuildUrl: `${repoUri}/actions/runs/${runId}`,
      VcsType: "Git",
      VcsRoot: `${repoUri}.git`,
      VcsCommitNumber: context.sha,
      Commits: commits.map((item) => ({
        Id: item.sha,
        Comment: item.commit.message,
      })),
    };

    // create the output directory
    let outputFile;
    if (inputs.outputPath) {
      core.debug(`Creating output directory '${inputs.outputPath}'`);
      await fs.mkdir(inputs.outputPath, { recursive: true });

      outputFile = joinPath(inputs.outputPath, "buildInformation.json");
    }

    // write to a file
    if (outputFile) {
      core.info(`Writing build information to ${outputFile}`);
      await fs.writeFile(outputFile, JSON.stringify(build));
    }

    // push build information to the server
    if (inputs.pushPackageIds.length > 0) {
      if (!inputs.pushVersion) throw new Error("Missing required input push_version");
      const versionRefPattern = new RegExp(`^refs/tags/(?:${inputs.versionTagPrefix})?`);
      const version = inputs.pushVersion.trim().replace(versionRefPattern, "");
      const writes = [];

      // get the Octopus space
      const { Id: spaceId } = await getOctopusSpace(inputs.octopusSpace);

      // push build information for each package in sequence, pipeline the response writes
      for (let i = 0; i < inputs.pushPackageIds.length; ++i) {
        const packageId = inputs.pushPackageIds[i];

        // eslint-disable-next-line no-await-in-loop
        const response = await pushBuildInformation(
          spaceId,
          packageId,
          version,
          build,
          inputs.pushOverwriteMode
        );

        // write response to a file
        if (inputs.outputPath) {
          const packageIdSanitized = packageId.replace(/[^\w.-]+/g, "_");
          const responsePath = joinPath(
            inputs.outputPath,
            `buildInformationMapped-${packageIdSanitized}.json`
          );

          core.info(`Writing mapped build information response to ${responsePath}`);
          writes.push(fs.writeFile(responsePath, JSON.stringify(response)));
        }
      }

      await Promise.all(writes);
    }

    // outputs
    if (outputFile) core.setOutput("output_file", outputFile);
    if (previousRef) core.setOutput("previous_release_sha", previousRef);
  } catch (e) {
    core.setFailed(e.message);
  }
}

run();


/***/ }),

/***/ 6254:
/***/ ((module) => {

/**
 * Wraps an async function with a simple cache keyed by its first argument.
 * @param {function} func the async function to memoize
 * @returns {function} the async memoized wrapper
 */
function memoizeAsync(func) {
  // eslint-disable-next-line func-names
  const wrapper = async function (...args) {
    let [key] = args;
    let value;

    if (!key) key = false;
    if (!wrapper.cache.has(key)) {
      value = await func.apply(this, args);
      wrapper.cache.set(key, value);
    } else {
      value = wrapper.cache.get(key);
    }

    return value;
  };
  wrapper.cache = new Map();
  return wrapper;
}

module.exports = { memoizeAsync };


/***/ }),

/***/ 2877:
/***/ ((module) => {

module.exports = eval("require")("encoding");


/***/ }),

/***/ 8661:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("[[[0,44],\"disallowed_STD3_valid\"],[[45,46],\"valid\"],[[47,47],\"disallowed_STD3_valid\"],[[48,57],\"valid\"],[[58,64],\"disallowed_STD3_valid\"],[[65,65],\"mapped\",[97]],[[66,66],\"mapped\",[98]],[[67,67],\"mapped\",[99]],[[68,68],\"mapped\",[100]],[[69,69],\"mapped\",[101]],[[70,70],\"mapped\",[102]],[[71,71],\"mapped\",[103]],[[72,72],\"mapped\",[104]],[[73,73],\"mapped\",[105]],[[74,74],\"mapped\",[106]],[[75,75],\"mapped\",[107]],[[76,76],\"mapped\",[108]],[[77,77],\"mapped\",[109]],[[78,78],\"mapped\",[110]],[[79,79],\"mapped\",[111]],[[80,80],\"mapped\",[112]],[[81,81],\"mapped\",[113]],[[82,82],\"mapped\",[114]],[[83,83],\"mapped\",[115]],[[84,84],\"mapped\",[116]],[[85,85],\"mapped\",[117]],[[86,86],\"mapped\",[118]],[[87,87],\"mapped\",[119]],[[88,88],\"mapped\",[120]],[[89,89],\"mapped\",[121]],[[90,90],\"mapped\",[122]],[[91,96],\"disallowed_STD3_valid\"],[[97,122],\"valid\"],[[123,127],\"disallowed_STD3_valid\"],[[128,159],\"disallowed\"],[[160,160],\"disallowed_STD3_mapped\",[32]],[[161,167],\"valid\",[],\"NV8\"],[[168,168],\"disallowed_STD3_mapped\",[32,776]],[[169,169],\"valid\",[],\"NV8\"],[[170,170],\"mapped\",[97]],[[171,172],\"valid\",[],\"NV8\"],[[173,173],\"ignored\"],[[174,174],\"valid\",[],\"NV8\"],[[175,175],\"disallowed_STD3_mapped\",[32,772]],[[176,177],\"valid\",[],\"NV8\"],[[178,178],\"mapped\",[50]],[[179,179],\"mapped\",[51]],[[180,180],\"disallowed_STD3_mapped\",[32,769]],[[181,181],\"mapped\",[956]],[[182,182],\"valid\",[],\"NV8\"],[[183,183],\"valid\"],[[184,184],\"disallowed_STD3_mapped\",[32,807]],[[185,185],\"mapped\",[49]],[[186,186],\"mapped\",[111]],[[187,187],\"valid\",[],\"NV8\"],[[188,188],\"mapped\",[49,8260,52]],[[189,189],\"mapped\",[49,8260,50]],[[190,190],\"mapped\",[51,8260,52]],[[191,191],\"valid\",[],\"NV8\"],[[192,192],\"mapped\",[224]],[[193,193],\"mapped\",[225]],[[194,194],\"mapped\",[226]],[[195,195],\"mapped\",[227]],[[196,196],\"mapped\",[228]],[[197,197],\"mapped\",[229]],[[198,198],\"mapped\",[230]],[[199,199],\"mapped\",[231]],[[200,200],\"mapped\",[232]],[[201,201],\"mapped\",[233]],[[202,202],\"mapped\",[234]],[[203,203],\"mapped\",[235]],[[204,204],\"mapped\",[236]],[[205,205],\"mapped\",[237]],[[206,206],\"mapped\",[238]],[[207,207],\"mapped\",[239]],[[208,208],\"mapped\",[240]],[[209,209],\"mapped\",[241]],[[210,210],\"mapped\",[242]],[[211,211],\"mapped\",[243]],[[212,212],\"mapped\",[244]],[[213,213],\"mapped\",[245]],[[214,214],\"mapped\",[246]],[[215,215],\"valid\",[],\"NV8\"],[[216,216],\"mapped\",[248]],[[217,217],\"mapped\",[249]],[[218,218],\"mapped\",[250]],[[219,219],\"mapped\",[251]],[[220,220],\"mapped\",[252]],[[221,221],\"mapped\",[253]],[[222,222],\"mapped\",[254]],[[223,223],\"deviation\",[115,115]],[[224,246],\"valid\"],[[247,247],\"valid\",[],\"NV8\"],[[248,255],\"valid\"],[[256,256],\"mapped\",[257]],[[257,257],\"valid\"],[[258,258],\"mapped\",[259]],[[259,259],\"valid\"],[[260,260],\"mapped\",[261]],[[261,261],\"valid\"],[[262,262],\"mapped\",[263]],[[263,263],\"valid\"],[[264,264],\"mapped\",[265]],[[265,265],\"valid\"],[[266,266],\"mapped\",[267]],[[267,267],\"valid\"],[[268,268],\"mapped\",[269]],[[269,269],\"valid\"],[[270,270],\"mapped\",[271]],[[271,271],\"valid\"],[[272,272],\"mapped\",[273]],[[273,273],\"valid\"],[[274,274],\"mapped\",[275]],[[275,275],\"valid\"],[[276,276],\"mapped\",[277]],[[277,277],\"valid\"],[[278,278],\"mapped\",[279]],[[279,279],\"valid\"],[[280,280],\"mapped\",[281]],[[281,281],\"valid\"],[[282,282],\"mapped\",[283]],[[283,283],\"valid\"],[[284,284],\"mapped\",[285]],[[285,285],\"valid\"],[[286,286],\"mapped\",[287]],[[287,287],\"valid\"],[[288,288],\"mapped\",[289]],[[289,289],\"valid\"],[[290,290],\"mapped\",[291]],[[291,291],\"valid\"],[[292,292],\"mapped\",[293]],[[293,293],\"valid\"],[[294,294],\"mapped\",[295]],[[295,295],\"valid\"],[[296,296],\"mapped\",[297]],[[297,297],\"valid\"],[[298,298],\"mapped\",[299]],[[299,299],\"valid\"],[[300,300],\"mapped\",[301]],[[301,301],\"valid\"],[[302,302],\"mapped\",[303]],[[303,303],\"valid\"],[[304,304],\"mapped\",[105,775]],[[305,305],\"valid\"],[[306,307],\"mapped\",[105,106]],[[308,308],\"mapped\",[309]],[[309,309],\"valid\"],[[310,310],\"mapped\",[311]],[[311,312],\"valid\"],[[313,313],\"mapped\",[314]],[[314,314],\"valid\"],[[315,315],\"mapped\",[316]],[[316,316],\"valid\"],[[317,317],\"mapped\",[318]],[[318,318],\"valid\"],[[319,320],\"mapped\",[108,183]],[[321,321],\"mapped\",[322]],[[322,322],\"valid\"],[[323,323],\"mapped\",[324]],[[324,324],\"valid\"],[[325,325],\"mapped\",[326]],[[326,326],\"valid\"],[[327,327],\"mapped\",[328]],[[328,328],\"valid\"],[[329,329],\"mapped\",[700,110]],[[330,330],\"mapped\",[331]],[[331,331],\"valid\"],[[332,332],\"mapped\",[333]],[[333,333],\"valid\"],[[334,334],\"mapped\",[335]],[[335,335],\"valid\"],[[336,336],\"mapped\",[337]],[[337,337],\"valid\"],[[338,338],\"mapped\",[339]],[[339,339],\"valid\"],[[340,340],\"mapped\",[341]],[[341,341],\"valid\"],[[342,342],\"mapped\",[343]],[[343,343],\"valid\"],[[344,344],\"mapped\",[345]],[[345,345],\"valid\"],[[346,346],\"mapped\",[347]],[[347,347],\"valid\"],[[348,348],\"mapped\",[349]],[[349,349],\"valid\"],[[350,350],\"mapped\",[351]],[[351,351],\"valid\"],[[352,352],\"mapped\",[353]],[[353,353],\"valid\"],[[354,354],\"mapped\",[355]],[[355,355],\"valid\"],[[356,356],\"mapped\",[357]],[[357,357],\"valid\"],[[358,358],\"mapped\",[359]],[[359,359],\"valid\"],[[360,360],\"mapped\",[361]],[[361,361],\"valid\"],[[362,362],\"mapped\",[363]],[[363,363],\"valid\"],[[364,364],\"mapped\",[365]],[[365,365],\"valid\"],[[366,366],\"mapped\",[367]],[[367,367],\"valid\"],[[368,368],\"mapped\",[369]],[[369,369],\"valid\"],[[370,370],\"mapped\",[371]],[[371,371],\"valid\"],[[372,372],\"mapped\",[373]],[[373,373],\"valid\"],[[374,374],\"mapped\",[375]],[[375,375],\"valid\"],[[376,376],\"mapped\",[255]],[[377,377],\"mapped\",[378]],[[378,378],\"valid\"],[[379,379],\"mapped\",[380]],[[380,380],\"valid\"],[[381,381],\"mapped\",[382]],[[382,382],\"valid\"],[[383,383],\"mapped\",[115]],[[384,384],\"valid\"],[[385,385],\"mapped\",[595]],[[386,386],\"mapped\",[387]],[[387,387],\"valid\"],[[388,388],\"mapped\",[389]],[[389,389],\"valid\"],[[390,390],\"mapped\",[596]],[[391,391],\"mapped\",[392]],[[392,392],\"valid\"],[[393,393],\"mapped\",[598]],[[394,394],\"mapped\",[599]],[[395,395],\"mapped\",[396]],[[396,397],\"valid\"],[[398,398],\"mapped\",[477]],[[399,399],\"mapped\",[601]],[[400,400],\"mapped\",[603]],[[401,401],\"mapped\",[402]],[[402,402],\"valid\"],[[403,403],\"mapped\",[608]],[[404,404],\"mapped\",[611]],[[405,405],\"valid\"],[[406,406],\"mapped\",[617]],[[407,407],\"mapped\",[616]],[[408,408],\"mapped\",[409]],[[409,411],\"valid\"],[[412,412],\"mapped\",[623]],[[413,413],\"mapped\",[626]],[[414,414],\"valid\"],[[415,415],\"mapped\",[629]],[[416,416],\"mapped\",[417]],[[417,417],\"valid\"],[[418,418],\"mapped\",[419]],[[419,419],\"valid\"],[[420,420],\"mapped\",[421]],[[421,421],\"valid\"],[[422,422],\"mapped\",[640]],[[423,423],\"mapped\",[424]],[[424,424],\"valid\"],[[425,425],\"mapped\",[643]],[[426,427],\"valid\"],[[428,428],\"mapped\",[429]],[[429,429],\"valid\"],[[430,430],\"mapped\",[648]],[[431,431],\"mapped\",[432]],[[432,432],\"valid\"],[[433,433],\"mapped\",[650]],[[434,434],\"mapped\",[651]],[[435,435],\"mapped\",[436]],[[436,436],\"valid\"],[[437,437],\"mapped\",[438]],[[438,438],\"valid\"],[[439,439],\"mapped\",[658]],[[440,440],\"mapped\",[441]],[[441,443],\"valid\"],[[444,444],\"mapped\",[445]],[[445,451],\"valid\"],[[452,454],\"mapped\",[100,382]],[[455,457],\"mapped\",[108,106]],[[458,460],\"mapped\",[110,106]],[[461,461],\"mapped\",[462]],[[462,462],\"valid\"],[[463,463],\"mapped\",[464]],[[464,464],\"valid\"],[[465,465],\"mapped\",[466]],[[466,466],\"valid\"],[[467,467],\"mapped\",[468]],[[468,468],\"valid\"],[[469,469],\"mapped\",[470]],[[470,470],\"valid\"],[[471,471],\"mapped\",[472]],[[472,472],\"valid\"],[[473,473],\"mapped\",[474]],[[474,474],\"valid\"],[[475,475],\"mapped\",[476]],[[476,477],\"valid\"],[[478,478],\"mapped\",[479]],[[479,479],\"valid\"],[[480,480],\"mapped\",[481]],[[481,481],\"valid\"],[[482,482],\"mapped\",[483]],[[483,483],\"valid\"],[[484,484],\"mapped\",[485]],[[485,485],\"valid\"],[[486,486],\"mapped\",[487]],[[487,487],\"valid\"],[[488,488],\"mapped\",[489]],[[489,489],\"valid\"],[[490,490],\"mapped\",[491]],[[491,491],\"valid\"],[[492,492],\"mapped\",[493]],[[493,493],\"valid\"],[[494,494],\"mapped\",[495]],[[495,496],\"valid\"],[[497,499],\"mapped\",[100,122]],[[500,500],\"mapped\",[501]],[[501,501],\"valid\"],[[502,502],\"mapped\",[405]],[[503,503],\"mapped\",[447]],[[504,504],\"mapped\",[505]],[[505,505],\"valid\"],[[506,506],\"mapped\",[507]],[[507,507],\"valid\"],[[508,508],\"mapped\",[509]],[[509,509],\"valid\"],[[510,510],\"mapped\",[511]],[[511,511],\"valid\"],[[512,512],\"mapped\",[513]],[[513,513],\"valid\"],[[514,514],\"mapped\",[515]],[[515,515],\"valid\"],[[516,516],\"mapped\",[517]],[[517,517],\"valid\"],[[518,518],\"mapped\",[519]],[[519,519],\"valid\"],[[520,520],\"mapped\",[521]],[[521,521],\"valid\"],[[522,522],\"mapped\",[523]],[[523,523],\"valid\"],[[524,524],\"mapped\",[525]],[[525,525],\"valid\"],[[526,526],\"mapped\",[527]],[[527,527],\"valid\"],[[528,528],\"mapped\",[529]],[[529,529],\"valid\"],[[530,530],\"mapped\",[531]],[[531,531],\"valid\"],[[532,532],\"mapped\",[533]],[[533,533],\"valid\"],[[534,534],\"mapped\",[535]],[[535,535],\"valid\"],[[536,536],\"mapped\",[537]],[[537,537],\"valid\"],[[538,538],\"mapped\",[539]],[[539,539],\"valid\"],[[540,540],\"mapped\",[541]],[[541,541],\"valid\"],[[542,542],\"mapped\",[543]],[[543,543],\"valid\"],[[544,544],\"mapped\",[414]],[[545,545],\"valid\"],[[546,546],\"mapped\",[547]],[[547,547],\"valid\"],[[548,548],\"mapped\",[549]],[[549,549],\"valid\"],[[550,550],\"mapped\",[551]],[[551,551],\"valid\"],[[552,552],\"mapped\",[553]],[[553,553],\"valid\"],[[554,554],\"mapped\",[555]],[[555,555],\"valid\"],[[556,556],\"mapped\",[557]],[[557,557],\"valid\"],[[558,558],\"mapped\",[559]],[[559,559],\"valid\"],[[560,560],\"mapped\",[561]],[[561,561],\"valid\"],[[562,562],\"mapped\",[563]],[[563,563],\"valid\"],[[564,566],\"valid\"],[[567,569],\"valid\"],[[570,570],\"mapped\",[11365]],[[571,571],\"mapped\",[572]],[[572,572],\"valid\"],[[573,573],\"mapped\",[410]],[[574,574],\"mapped\",[11366]],[[575,576],\"valid\"],[[577,577],\"mapped\",[578]],[[578,578],\"valid\"],[[579,579],\"mapped\",[384]],[[580,580],\"mapped\",[649]],[[581,581],\"mapped\",[652]],[[582,582],\"mapped\",[583]],[[583,583],\"valid\"],[[584,584],\"mapped\",[585]],[[585,585],\"valid\"],[[586,586],\"mapped\",[587]],[[587,587],\"valid\"],[[588,588],\"mapped\",[589]],[[589,589],\"valid\"],[[590,590],\"mapped\",[591]],[[591,591],\"valid\"],[[592,680],\"valid\"],[[681,685],\"valid\"],[[686,687],\"valid\"],[[688,688],\"mapped\",[104]],[[689,689],\"mapped\",[614]],[[690,690],\"mapped\",[106]],[[691,691],\"mapped\",[114]],[[692,692],\"mapped\",[633]],[[693,693],\"mapped\",[635]],[[694,694],\"mapped\",[641]],[[695,695],\"mapped\",[119]],[[696,696],\"mapped\",[121]],[[697,705],\"valid\"],[[706,709],\"valid\",[],\"NV8\"],[[710,721],\"valid\"],[[722,727],\"valid\",[],\"NV8\"],[[728,728],\"disallowed_STD3_mapped\",[32,774]],[[729,729],\"disallowed_STD3_mapped\",[32,775]],[[730,730],\"disallowed_STD3_mapped\",[32,778]],[[731,731],\"disallowed_STD3_mapped\",[32,808]],[[732,732],\"disallowed_STD3_mapped\",[32,771]],[[733,733],\"disallowed_STD3_mapped\",[32,779]],[[734,734],\"valid\",[],\"NV8\"],[[735,735],\"valid\",[],\"NV8\"],[[736,736],\"mapped\",[611]],[[737,737],\"mapped\",[108]],[[738,738],\"mapped\",[115]],[[739,739],\"mapped\",[120]],[[740,740],\"mapped\",[661]],[[741,745],\"valid\",[],\"NV8\"],[[746,747],\"valid\",[],\"NV8\"],[[748,748],\"valid\"],[[749,749],\"valid\",[],\"NV8\"],[[750,750],\"valid\"],[[751,767],\"valid\",[],\"NV8\"],[[768,831],\"valid\"],[[832,832],\"mapped\",[768]],[[833,833],\"mapped\",[769]],[[834,834],\"valid\"],[[835,835],\"mapped\",[787]],[[836,836],\"mapped\",[776,769]],[[837,837],\"mapped\",[953]],[[838,846],\"valid\"],[[847,847],\"ignored\"],[[848,855],\"valid\"],[[856,860],\"valid\"],[[861,863],\"valid\"],[[864,865],\"valid\"],[[866,866],\"valid\"],[[867,879],\"valid\"],[[880,880],\"mapped\",[881]],[[881,881],\"valid\"],[[882,882],\"mapped\",[883]],[[883,883],\"valid\"],[[884,884],\"mapped\",[697]],[[885,885],\"valid\"],[[886,886],\"mapped\",[887]],[[887,887],\"valid\"],[[888,889],\"disallowed\"],[[890,890],\"disallowed_STD3_mapped\",[32,953]],[[891,893],\"valid\"],[[894,894],\"disallowed_STD3_mapped\",[59]],[[895,895],\"mapped\",[1011]],[[896,899],\"disallowed\"],[[900,900],\"disallowed_STD3_mapped\",[32,769]],[[901,901],\"disallowed_STD3_mapped\",[32,776,769]],[[902,902],\"mapped\",[940]],[[903,903],\"mapped\",[183]],[[904,904],\"mapped\",[941]],[[905,905],\"mapped\",[942]],[[906,906],\"mapped\",[943]],[[907,907],\"disallowed\"],[[908,908],\"mapped\",[972]],[[909,909],\"disallowed\"],[[910,910],\"mapped\",[973]],[[911,911],\"mapped\",[974]],[[912,912],\"valid\"],[[913,913],\"mapped\",[945]],[[914,914],\"mapped\",[946]],[[915,915],\"mapped\",[947]],[[916,916],\"mapped\",[948]],[[917,917],\"mapped\",[949]],[[918,918],\"mapped\",[950]],[[919,919],\"mapped\",[951]],[[920,920],\"mapped\",[952]],[[921,921],\"mapped\",[953]],[[922,922],\"mapped\",[954]],[[923,923],\"mapped\",[955]],[[924,924],\"mapped\",[956]],[[925,925],\"mapped\",[957]],[[926,926],\"mapped\",[958]],[[927,927],\"mapped\",[959]],[[928,928],\"mapped\",[960]],[[929,929],\"mapped\",[961]],[[930,930],\"disallowed\"],[[931,931],\"mapped\",[963]],[[932,932],\"mapped\",[964]],[[933,933],\"mapped\",[965]],[[934,934],\"mapped\",[966]],[[935,935],\"mapped\",[967]],[[936,936],\"mapped\",[968]],[[937,937],\"mapped\",[969]],[[938,938],\"mapped\",[970]],[[939,939],\"mapped\",[971]],[[940,961],\"valid\"],[[962,962],\"deviation\",[963]],[[963,974],\"valid\"],[[975,975],\"mapped\",[983]],[[976,976],\"mapped\",[946]],[[977,977],\"mapped\",[952]],[[978,978],\"mapped\",[965]],[[979,979],\"mapped\",[973]],[[980,980],\"mapped\",[971]],[[981,981],\"mapped\",[966]],[[982,982],\"mapped\",[960]],[[983,983],\"valid\"],[[984,984],\"mapped\",[985]],[[985,985],\"valid\"],[[986,986],\"mapped\",[987]],[[987,987],\"valid\"],[[988,988],\"mapped\",[989]],[[989,989],\"valid\"],[[990,990],\"mapped\",[991]],[[991,991],\"valid\"],[[992,992],\"mapped\",[993]],[[993,993],\"valid\"],[[994,994],\"mapped\",[995]],[[995,995],\"valid\"],[[996,996],\"mapped\",[997]],[[997,997],\"valid\"],[[998,998],\"mapped\",[999]],[[999,999],\"valid\"],[[1000,1000],\"mapped\",[1001]],[[1001,1001],\"valid\"],[[1002,1002],\"mapped\",[1003]],[[1003,1003],\"valid\"],[[1004,1004],\"mapped\",[1005]],[[1005,1005],\"valid\"],[[1006,1006],\"mapped\",[1007]],[[1007,1007],\"valid\"],[[1008,1008],\"mapped\",[954]],[[1009,1009],\"mapped\",[961]],[[1010,1010],\"mapped\",[963]],[[1011,1011],\"valid\"],[[1012,1012],\"mapped\",[952]],[[1013,1013],\"mapped\",[949]],[[1014,1014],\"valid\",[],\"NV8\"],[[1015,1015],\"mapped\",[1016]],[[1016,1016],\"valid\"],[[1017,1017],\"mapped\",[963]],[[1018,1018],\"mapped\",[1019]],[[1019,1019],\"valid\"],[[1020,1020],\"valid\"],[[1021,1021],\"mapped\",[891]],[[1022,1022],\"mapped\",[892]],[[1023,1023],\"mapped\",[893]],[[1024,1024],\"mapped\",[1104]],[[1025,1025],\"mapped\",[1105]],[[1026,1026],\"mapped\",[1106]],[[1027,1027],\"mapped\",[1107]],[[1028,1028],\"mapped\",[1108]],[[1029,1029],\"mapped\",[1109]],[[1030,1030],\"mapped\",[1110]],[[1031,1031],\"mapped\",[1111]],[[1032,1032],\"mapped\",[1112]],[[1033,1033],\"mapped\",[1113]],[[1034,1034],\"mapped\",[1114]],[[1035,1035],\"mapped\",[1115]],[[1036,1036],\"mapped\",[1116]],[[1037,1037],\"mapped\",[1117]],[[1038,1038],\"mapped\",[1118]],[[1039,1039],\"mapped\",[1119]],[[1040,1040],\"mapped\",[1072]],[[1041,1041],\"mapped\",[1073]],[[1042,1042],\"mapped\",[1074]],[[1043,1043],\"mapped\",[1075]],[[1044,1044],\"mapped\",[1076]],[[1045,1045],\"mapped\",[1077]],[[1046,1046],\"mapped\",[1078]],[[1047,1047],\"mapped\",[1079]],[[1048,1048],\"mapped\",[1080]],[[1049,1049],\"mapped\",[1081]],[[1050,1050],\"mapped\",[1082]],[[1051,1051],\"mapped\",[1083]],[[1052,1052],\"mapped\",[1084]],[[1053,1053],\"mapped\",[1085]],[[1054,1054],\"mapped\",[1086]],[[1055,1055],\"mapped\",[1087]],[[1056,1056],\"mapped\",[1088]],[[1057,1057],\"mapped\",[1089]],[[1058,1058],\"mapped\",[1090]],[[1059,1059],\"mapped\",[1091]],[[1060,1060],\"mapped\",[1092]],[[1061,1061],\"mapped\",[1093]],[[1062,1062],\"mapped\",[1094]],[[1063,1063],\"mapped\",[1095]],[[1064,1064],\"mapped\",[1096]],[[1065,1065],\"mapped\",[1097]],[[1066,1066],\"mapped\",[1098]],[[1067,1067],\"mapped\",[1099]],[[1068,1068],\"mapped\",[1100]],[[1069,1069],\"mapped\",[1101]],[[1070,1070],\"mapped\",[1102]],[[1071,1071],\"mapped\",[1103]],[[1072,1103],\"valid\"],[[1104,1104],\"valid\"],[[1105,1116],\"valid\"],[[1117,1117],\"valid\"],[[1118,1119],\"valid\"],[[1120,1120],\"mapped\",[1121]],[[1121,1121],\"valid\"],[[1122,1122],\"mapped\",[1123]],[[1123,1123],\"valid\"],[[1124,1124],\"mapped\",[1125]],[[1125,1125],\"valid\"],[[1126,1126],\"mapped\",[1127]],[[1127,1127],\"valid\"],[[1128,1128],\"mapped\",[1129]],[[1129,1129],\"valid\"],[[1130,1130],\"mapped\",[1131]],[[1131,1131],\"valid\"],[[1132,1132],\"mapped\",[1133]],[[1133,1133],\"valid\"],[[1134,1134],\"mapped\",[1135]],[[1135,1135],\"valid\"],[[1136,1136],\"mapped\",[1137]],[[1137,1137],\"valid\"],[[1138,1138],\"mapped\",[1139]],[[1139,1139],\"valid\"],[[1140,1140],\"mapped\",[1141]],[[1141,1141],\"valid\"],[[1142,1142],\"mapped\",[1143]],[[1143,1143],\"valid\"],[[1144,1144],\"mapped\",[1145]],[[1145,1145],\"valid\"],[[1146,1146],\"mapped\",[1147]],[[1147,1147],\"valid\"],[[1148,1148],\"mapped\",[1149]],[[1149,1149],\"valid\"],[[1150,1150],\"mapped\",[1151]],[[1151,1151],\"valid\"],[[1152,1152],\"mapped\",[1153]],[[1153,1153],\"valid\"],[[1154,1154],\"valid\",[],\"NV8\"],[[1155,1158],\"valid\"],[[1159,1159],\"valid\"],[[1160,1161],\"valid\",[],\"NV8\"],[[1162,1162],\"mapped\",[1163]],[[1163,1163],\"valid\"],[[1164,1164],\"mapped\",[1165]],[[1165,1165],\"valid\"],[[1166,1166],\"mapped\",[1167]],[[1167,1167],\"valid\"],[[1168,1168],\"mapped\",[1169]],[[1169,1169],\"valid\"],[[1170,1170],\"mapped\",[1171]],[[1171,1171],\"valid\"],[[1172,1172],\"mapped\",[1173]],[[1173,1173],\"valid\"],[[1174,1174],\"mapped\",[1175]],[[1175,1175],\"valid\"],[[1176,1176],\"mapped\",[1177]],[[1177,1177],\"valid\"],[[1178,1178],\"mapped\",[1179]],[[1179,1179],\"valid\"],[[1180,1180],\"mapped\",[1181]],[[1181,1181],\"valid\"],[[1182,1182],\"mapped\",[1183]],[[1183,1183],\"valid\"],[[1184,1184],\"mapped\",[1185]],[[1185,1185],\"valid\"],[[1186,1186],\"mapped\",[1187]],[[1187,1187],\"valid\"],[[1188,1188],\"mapped\",[1189]],[[1189,1189],\"valid\"],[[1190,1190],\"mapped\",[1191]],[[1191,1191],\"valid\"],[[1192,1192],\"mapped\",[1193]],[[1193,1193],\"valid\"],[[1194,1194],\"mapped\",[1195]],[[1195,1195],\"valid\"],[[1196,1196],\"mapped\",[1197]],[[1197,1197],\"valid\"],[[1198,1198],\"mapped\",[1199]],[[1199,1199],\"valid\"],[[1200,1200],\"mapped\",[1201]],[[1201,1201],\"valid\"],[[1202,1202],\"mapped\",[1203]],[[1203,1203],\"valid\"],[[1204,1204],\"mapped\",[1205]],[[1205,1205],\"valid\"],[[1206,1206],\"mapped\",[1207]],[[1207,1207],\"valid\"],[[1208,1208],\"mapped\",[1209]],[[1209,1209],\"valid\"],[[1210,1210],\"mapped\",[1211]],[[1211,1211],\"valid\"],[[1212,1212],\"mapped\",[1213]],[[1213,1213],\"valid\"],[[1214,1214],\"mapped\",[1215]],[[1215,1215],\"valid\"],[[1216,1216],\"disallowed\"],[[1217,1217],\"mapped\",[1218]],[[1218,1218],\"valid\"],[[1219,1219],\"mapped\",[1220]],[[1220,1220],\"valid\"],[[1221,1221],\"mapped\",[1222]],[[1222,1222],\"valid\"],[[1223,1223],\"mapped\",[1224]],[[1224,1224],\"valid\"],[[1225,1225],\"mapped\",[1226]],[[1226,1226],\"valid\"],[[1227,1227],\"mapped\",[1228]],[[1228,1228],\"valid\"],[[1229,1229],\"mapped\",[1230]],[[1230,1230],\"valid\"],[[1231,1231],\"valid\"],[[1232,1232],\"mapped\",[1233]],[[1233,1233],\"valid\"],[[1234,1234],\"mapped\",[1235]],[[1235,1235],\"valid\"],[[1236,1236],\"mapped\",[1237]],[[1237,1237],\"valid\"],[[1238,1238],\"mapped\",[1239]],[[1239,1239],\"valid\"],[[1240,1240],\"mapped\",[1241]],[[1241,1241],\"valid\"],[[1242,1242],\"mapped\",[1243]],[[1243,1243],\"valid\"],[[1244,1244],\"mapped\",[1245]],[[1245,1245],\"valid\"],[[1246,1246],\"mapped\",[1247]],[[1247,1247],\"valid\"],[[1248,1248],\"mapped\",[1249]],[[1249,1249],\"valid\"],[[1250,1250],\"mapped\",[1251]],[[1251,1251],\"valid\"],[[1252,1252],\"mapped\",[1253]],[[1253,1253],\"valid\"],[[1254,1254],\"mapped\",[1255]],[[1255,1255],\"valid\"],[[1256,1256],\"mapped\",[1257]],[[1257,1257],\"valid\"],[[1258,1258],\"mapped\",[1259]],[[1259,1259],\"valid\"],[[1260,1260],\"mapped\",[1261]],[[1261,1261],\"valid\"],[[1262,1262],\"mapped\",[1263]],[[1263,1263],\"valid\"],[[1264,1264],\"mapped\",[1265]],[[1265,1265],\"valid\"],[[1266,1266],\"mapped\",[1267]],[[1267,1267],\"valid\"],[[1268,1268],\"mapped\",[1269]],[[1269,1269],\"valid\"],[[1270,1270],\"mapped\",[1271]],[[1271,1271],\"valid\"],[[1272,1272],\"mapped\",[1273]],[[1273,1273],\"valid\"],[[1274,1274],\"mapped\",[1275]],[[1275,1275],\"valid\"],[[1276,1276],\"mapped\",[1277]],[[1277,1277],\"valid\"],[[1278,1278],\"mapped\",[1279]],[[1279,1279],\"valid\"],[[1280,1280],\"mapped\",[1281]],[[1281,1281],\"valid\"],[[1282,1282],\"mapped\",[1283]],[[1283,1283],\"valid\"],[[1284,1284],\"mapped\",[1285]],[[1285,1285],\"valid\"],[[1286,1286],\"mapped\",[1287]],[[1287,1287],\"valid\"],[[1288,1288],\"mapped\",[1289]],[[1289,1289],\"valid\"],[[1290,1290],\"mapped\",[1291]],[[1291,1291],\"valid\"],[[1292,1292],\"mapped\",[1293]],[[1293,1293],\"valid\"],[[1294,1294],\"mapped\",[1295]],[[1295,1295],\"valid\"],[[1296,1296],\"mapped\",[1297]],[[1297,1297],\"valid\"],[[1298,1298],\"mapped\",[1299]],[[1299,1299],\"valid\"],[[1300,1300],\"mapped\",[1301]],[[1301,1301],\"valid\"],[[1302,1302],\"mapped\",[1303]],[[1303,1303],\"valid\"],[[1304,1304],\"mapped\",[1305]],[[1305,1305],\"valid\"],[[1306,1306],\"mapped\",[1307]],[[1307,1307],\"valid\"],[[1308,1308],\"mapped\",[1309]],[[1309,1309],\"valid\"],[[1310,1310],\"mapped\",[1311]],[[1311,1311],\"valid\"],[[1312,1312],\"mapped\",[1313]],[[1313,1313],\"valid\"],[[1314,1314],\"mapped\",[1315]],[[1315,1315],\"valid\"],[[1316,1316],\"mapped\",[1317]],[[1317,1317],\"valid\"],[[1318,1318],\"mapped\",[1319]],[[1319,1319],\"valid\"],[[1320,1320],\"mapped\",[1321]],[[1321,1321],\"valid\"],[[1322,1322],\"mapped\",[1323]],[[1323,1323],\"valid\"],[[1324,1324],\"mapped\",[1325]],[[1325,1325],\"valid\"],[[1326,1326],\"mapped\",[1327]],[[1327,1327],\"valid\"],[[1328,1328],\"disallowed\"],[[1329,1329],\"mapped\",[1377]],[[1330,1330],\"mapped\",[1378]],[[1331,1331],\"mapped\",[1379]],[[1332,1332],\"mapped\",[1380]],[[1333,1333],\"mapped\",[1381]],[[1334,1334],\"mapped\",[1382]],[[1335,1335],\"mapped\",[1383]],[[1336,1336],\"mapped\",[1384]],[[1337,1337],\"mapped\",[1385]],[[1338,1338],\"mapped\",[1386]],[[1339,1339],\"mapped\",[1387]],[[1340,1340],\"mapped\",[1388]],[[1341,1341],\"mapped\",[1389]],[[1342,1342],\"mapped\",[1390]],[[1343,1343],\"mapped\",[1391]],[[1344,1344],\"mapped\",[1392]],[[1345,1345],\"mapped\",[1393]],[[1346,1346],\"mapped\",[1394]],[[1347,1347],\"mapped\",[1395]],[[1348,1348],\"mapped\",[1396]],[[1349,1349],\"mapped\",[1397]],[[1350,1350],\"mapped\",[1398]],[[1351,1351],\"mapped\",[1399]],[[1352,1352],\"mapped\",[1400]],[[1353,1353],\"mapped\",[1401]],[[1354,1354],\"mapped\",[1402]],[[1355,1355],\"mapped\",[1403]],[[1356,1356],\"mapped\",[1404]],[[1357,1357],\"mapped\",[1405]],[[1358,1358],\"mapped\",[1406]],[[1359,1359],\"mapped\",[1407]],[[1360,1360],\"mapped\",[1408]],[[1361,1361],\"mapped\",[1409]],[[1362,1362],\"mapped\",[1410]],[[1363,1363],\"mapped\",[1411]],[[1364,1364],\"mapped\",[1412]],[[1365,1365],\"mapped\",[1413]],[[1366,1366],\"mapped\",[1414]],[[1367,1368],\"disallowed\"],[[1369,1369],\"valid\"],[[1370,1375],\"valid\",[],\"NV8\"],[[1376,1376],\"disallowed\"],[[1377,1414],\"valid\"],[[1415,1415],\"mapped\",[1381,1410]],[[1416,1416],\"disallowed\"],[[1417,1417],\"valid\",[],\"NV8\"],[[1418,1418],\"valid\",[],\"NV8\"],[[1419,1420],\"disallowed\"],[[1421,1422],\"valid\",[],\"NV8\"],[[1423,1423],\"valid\",[],\"NV8\"],[[1424,1424],\"disallowed\"],[[1425,1441],\"valid\"],[[1442,1442],\"valid\"],[[1443,1455],\"valid\"],[[1456,1465],\"valid\"],[[1466,1466],\"valid\"],[[1467,1469],\"valid\"],[[1470,1470],\"valid\",[],\"NV8\"],[[1471,1471],\"valid\"],[[1472,1472],\"valid\",[],\"NV8\"],[[1473,1474],\"valid\"],[[1475,1475],\"valid\",[],\"NV8\"],[[1476,1476],\"valid\"],[[1477,1477],\"valid\"],[[1478,1478],\"valid\",[],\"NV8\"],[[1479,1479],\"valid\"],[[1480,1487],\"disallowed\"],[[1488,1514],\"valid\"],[[1515,1519],\"disallowed\"],[[1520,1524],\"valid\"],[[1525,1535],\"disallowed\"],[[1536,1539],\"disallowed\"],[[1540,1540],\"disallowed\"],[[1541,1541],\"disallowed\"],[[1542,1546],\"valid\",[],\"NV8\"],[[1547,1547],\"valid\",[],\"NV8\"],[[1548,1548],\"valid\",[],\"NV8\"],[[1549,1551],\"valid\",[],\"NV8\"],[[1552,1557],\"valid\"],[[1558,1562],\"valid\"],[[1563,1563],\"valid\",[],\"NV8\"],[[1564,1564],\"disallowed\"],[[1565,1565],\"disallowed\"],[[1566,1566],\"valid\",[],\"NV8\"],[[1567,1567],\"valid\",[],\"NV8\"],[[1568,1568],\"valid\"],[[1569,1594],\"valid\"],[[1595,1599],\"valid\"],[[1600,1600],\"valid\",[],\"NV8\"],[[1601,1618],\"valid\"],[[1619,1621],\"valid\"],[[1622,1624],\"valid\"],[[1625,1630],\"valid\"],[[1631,1631],\"valid\"],[[1632,1641],\"valid\"],[[1642,1645],\"valid\",[],\"NV8\"],[[1646,1647],\"valid\"],[[1648,1652],\"valid\"],[[1653,1653],\"mapped\",[1575,1652]],[[1654,1654],\"mapped\",[1608,1652]],[[1655,1655],\"mapped\",[1735,1652]],[[1656,1656],\"mapped\",[1610,1652]],[[1657,1719],\"valid\"],[[1720,1721],\"valid\"],[[1722,1726],\"valid\"],[[1727,1727],\"valid\"],[[1728,1742],\"valid\"],[[1743,1743],\"valid\"],[[1744,1747],\"valid\"],[[1748,1748],\"valid\",[],\"NV8\"],[[1749,1756],\"valid\"],[[1757,1757],\"disallowed\"],[[1758,1758],\"valid\",[],\"NV8\"],[[1759,1768],\"valid\"],[[1769,1769],\"valid\",[],\"NV8\"],[[1770,1773],\"valid\"],[[1774,1775],\"valid\"],[[1776,1785],\"valid\"],[[1786,1790],\"valid\"],[[1791,1791],\"valid\"],[[1792,1805],\"valid\",[],\"NV8\"],[[1806,1806],\"disallowed\"],[[1807,1807],\"disallowed\"],[[1808,1836],\"valid\"],[[1837,1839],\"valid\"],[[1840,1866],\"valid\"],[[1867,1868],\"disallowed\"],[[1869,1871],\"valid\"],[[1872,1901],\"valid\"],[[1902,1919],\"valid\"],[[1920,1968],\"valid\"],[[1969,1969],\"valid\"],[[1970,1983],\"disallowed\"],[[1984,2037],\"valid\"],[[2038,2042],\"valid\",[],\"NV8\"],[[2043,2047],\"disallowed\"],[[2048,2093],\"valid\"],[[2094,2095],\"disallowed\"],[[2096,2110],\"valid\",[],\"NV8\"],[[2111,2111],\"disallowed\"],[[2112,2139],\"valid\"],[[2140,2141],\"disallowed\"],[[2142,2142],\"valid\",[],\"NV8\"],[[2143,2207],\"disallowed\"],[[2208,2208],\"valid\"],[[2209,2209],\"valid\"],[[2210,2220],\"valid\"],[[2221,2226],\"valid\"],[[2227,2228],\"valid\"],[[2229,2274],\"disallowed\"],[[2275,2275],\"valid\"],[[2276,2302],\"valid\"],[[2303,2303],\"valid\"],[[2304,2304],\"valid\"],[[2305,2307],\"valid\"],[[2308,2308],\"valid\"],[[2309,2361],\"valid\"],[[2362,2363],\"valid\"],[[2364,2381],\"valid\"],[[2382,2382],\"valid\"],[[2383,2383],\"valid\"],[[2384,2388],\"valid\"],[[2389,2389],\"valid\"],[[2390,2391],\"valid\"],[[2392,2392],\"mapped\",[2325,2364]],[[2393,2393],\"mapped\",[2326,2364]],[[2394,2394],\"mapped\",[2327,2364]],[[2395,2395],\"mapped\",[2332,2364]],[[2396,2396],\"mapped\",[2337,2364]],[[2397,2397],\"mapped\",[2338,2364]],[[2398,2398],\"mapped\",[2347,2364]],[[2399,2399],\"mapped\",[2351,2364]],[[2400,2403],\"valid\"],[[2404,2405],\"valid\",[],\"NV8\"],[[2406,2415],\"valid\"],[[2416,2416],\"valid\",[],\"NV8\"],[[2417,2418],\"valid\"],[[2419,2423],\"valid\"],[[2424,2424],\"valid\"],[[2425,2426],\"valid\"],[[2427,2428],\"valid\"],[[2429,2429],\"valid\"],[[2430,2431],\"valid\"],[[2432,2432],\"valid\"],[[2433,2435],\"valid\"],[[2436,2436],\"disallowed\"],[[2437,2444],\"valid\"],[[2445,2446],\"disallowed\"],[[2447,2448],\"valid\"],[[2449,2450],\"disallowed\"],[[2451,2472],\"valid\"],[[2473,2473],\"disallowed\"],[[2474,2480],\"valid\"],[[2481,2481],\"disallowed\"],[[2482,2482],\"valid\"],[[2483,2485],\"disallowed\"],[[2486,2489],\"valid\"],[[2490,2491],\"disallowed\"],[[2492,2492],\"valid\"],[[2493,2493],\"valid\"],[[2494,2500],\"valid\"],[[2501,2502],\"disallowed\"],[[2503,2504],\"valid\"],[[2505,2506],\"disallowed\"],[[2507,2509],\"valid\"],[[2510,2510],\"valid\"],[[2511,2518],\"disallowed\"],[[2519,2519],\"valid\"],[[2520,2523],\"disallowed\"],[[2524,2524],\"mapped\",[2465,2492]],[[2525,2525],\"mapped\",[2466,2492]],[[2526,2526],\"disallowed\"],[[2527,2527],\"mapped\",[2479,2492]],[[2528,2531],\"valid\"],[[2532,2533],\"disallowed\"],[[2534,2545],\"valid\"],[[2546,2554],\"valid\",[],\"NV8\"],[[2555,2555],\"valid\",[],\"NV8\"],[[2556,2560],\"disallowed\"],[[2561,2561],\"valid\"],[[2562,2562],\"valid\"],[[2563,2563],\"valid\"],[[2564,2564],\"disallowed\"],[[2565,2570],\"valid\"],[[2571,2574],\"disallowed\"],[[2575,2576],\"valid\"],[[2577,2578],\"disallowed\"],[[2579,2600],\"valid\"],[[2601,2601],\"disallowed\"],[[2602,2608],\"valid\"],[[2609,2609],\"disallowed\"],[[2610,2610],\"valid\"],[[2611,2611],\"mapped\",[2610,2620]],[[2612,2612],\"disallowed\"],[[2613,2613],\"valid\"],[[2614,2614],\"mapped\",[2616,2620]],[[2615,2615],\"disallowed\"],[[2616,2617],\"valid\"],[[2618,2619],\"disallowed\"],[[2620,2620],\"valid\"],[[2621,2621],\"disallowed\"],[[2622,2626],\"valid\"],[[2627,2630],\"disallowed\"],[[2631,2632],\"valid\"],[[2633,2634],\"disallowed\"],[[2635,2637],\"valid\"],[[2638,2640],\"disallowed\"],[[2641,2641],\"valid\"],[[2642,2648],\"disallowed\"],[[2649,2649],\"mapped\",[2582,2620]],[[2650,2650],\"mapped\",[2583,2620]],[[2651,2651],\"mapped\",[2588,2620]],[[2652,2652],\"valid\"],[[2653,2653],\"disallowed\"],[[2654,2654],\"mapped\",[2603,2620]],[[2655,2661],\"disallowed\"],[[2662,2676],\"valid\"],[[2677,2677],\"valid\"],[[2678,2688],\"disallowed\"],[[2689,2691],\"valid\"],[[2692,2692],\"disallowed\"],[[2693,2699],\"valid\"],[[2700,2700],\"valid\"],[[2701,2701],\"valid\"],[[2702,2702],\"disallowed\"],[[2703,2705],\"valid\"],[[2706,2706],\"disallowed\"],[[2707,2728],\"valid\"],[[2729,2729],\"disallowed\"],[[2730,2736],\"valid\"],[[2737,2737],\"disallowed\"],[[2738,2739],\"valid\"],[[2740,2740],\"disallowed\"],[[2741,2745],\"valid\"],[[2746,2747],\"disallowed\"],[[2748,2757],\"valid\"],[[2758,2758],\"disallowed\"],[[2759,2761],\"valid\"],[[2762,2762],\"disallowed\"],[[2763,2765],\"valid\"],[[2766,2767],\"disallowed\"],[[2768,2768],\"valid\"],[[2769,2783],\"disallowed\"],[[2784,2784],\"valid\"],[[2785,2787],\"valid\"],[[2788,2789],\"disallowed\"],[[2790,2799],\"valid\"],[[2800,2800],\"valid\",[],\"NV8\"],[[2801,2801],\"valid\",[],\"NV8\"],[[2802,2808],\"disallowed\"],[[2809,2809],\"valid\"],[[2810,2816],\"disallowed\"],[[2817,2819],\"valid\"],[[2820,2820],\"disallowed\"],[[2821,2828],\"valid\"],[[2829,2830],\"disallowed\"],[[2831,2832],\"valid\"],[[2833,2834],\"disallowed\"],[[2835,2856],\"valid\"],[[2857,2857],\"disallowed\"],[[2858,2864],\"valid\"],[[2865,2865],\"disallowed\"],[[2866,2867],\"valid\"],[[2868,2868],\"disallowed\"],[[2869,2869],\"valid\"],[[2870,2873],\"valid\"],[[2874,2875],\"disallowed\"],[[2876,2883],\"valid\"],[[2884,2884],\"valid\"],[[2885,2886],\"disallowed\"],[[2887,2888],\"valid\"],[[2889,2890],\"disallowed\"],[[2891,2893],\"valid\"],[[2894,2901],\"disallowed\"],[[2902,2903],\"valid\"],[[2904,2907],\"disallowed\"],[[2908,2908],\"mapped\",[2849,2876]],[[2909,2909],\"mapped\",[2850,2876]],[[2910,2910],\"disallowed\"],[[2911,2913],\"valid\"],[[2914,2915],\"valid\"],[[2916,2917],\"disallowed\"],[[2918,2927],\"valid\"],[[2928,2928],\"valid\",[],\"NV8\"],[[2929,2929],\"valid\"],[[2930,2935],\"valid\",[],\"NV8\"],[[2936,2945],\"disallowed\"],[[2946,2947],\"valid\"],[[2948,2948],\"disallowed\"],[[2949,2954],\"valid\"],[[2955,2957],\"disallowed\"],[[2958,2960],\"valid\"],[[2961,2961],\"disallowed\"],[[2962,2965],\"valid\"],[[2966,2968],\"disallowed\"],[[2969,2970],\"valid\"],[[2971,2971],\"disallowed\"],[[2972,2972],\"valid\"],[[2973,2973],\"disallowed\"],[[2974,2975],\"valid\"],[[2976,2978],\"disallowed\"],[[2979,2980],\"valid\"],[[2981,2983],\"disallowed\"],[[2984,2986],\"valid\"],[[2987,2989],\"disallowed\"],[[2990,2997],\"valid\"],[[2998,2998],\"valid\"],[[2999,3001],\"valid\"],[[3002,3005],\"disallowed\"],[[3006,3010],\"valid\"],[[3011,3013],\"disallowed\"],[[3014,3016],\"valid\"],[[3017,3017],\"disallowed\"],[[3018,3021],\"valid\"],[[3022,3023],\"disallowed\"],[[3024,3024],\"valid\"],[[3025,3030],\"disallowed\"],[[3031,3031],\"valid\"],[[3032,3045],\"disallowed\"],[[3046,3046],\"valid\"],[[3047,3055],\"valid\"],[[3056,3058],\"valid\",[],\"NV8\"],[[3059,3066],\"valid\",[],\"NV8\"],[[3067,3071],\"disallowed\"],[[3072,3072],\"valid\"],[[3073,3075],\"valid\"],[[3076,3076],\"disallowed\"],[[3077,3084],\"valid\"],[[3085,3085],\"disallowed\"],[[3086,3088],\"valid\"],[[3089,3089],\"disallowed\"],[[3090,3112],\"valid\"],[[3113,3113],\"disallowed\"],[[3114,3123],\"valid\"],[[3124,3124],\"valid\"],[[3125,3129],\"valid\"],[[3130,3132],\"disallowed\"],[[3133,3133],\"valid\"],[[3134,3140],\"valid\"],[[3141,3141],\"disallowed\"],[[3142,3144],\"valid\"],[[3145,3145],\"disallowed\"],[[3146,3149],\"valid\"],[[3150,3156],\"disallowed\"],[[3157,3158],\"valid\"],[[3159,3159],\"disallowed\"],[[3160,3161],\"valid\"],[[3162,3162],\"valid\"],[[3163,3167],\"disallowed\"],[[3168,3169],\"valid\"],[[3170,3171],\"valid\"],[[3172,3173],\"disallowed\"],[[3174,3183],\"valid\"],[[3184,3191],\"disallowed\"],[[3192,3199],\"valid\",[],\"NV8\"],[[3200,3200],\"disallowed\"],[[3201,3201],\"valid\"],[[3202,3203],\"valid\"],[[3204,3204],\"disallowed\"],[[3205,3212],\"valid\"],[[3213,3213],\"disallowed\"],[[3214,3216],\"valid\"],[[3217,3217],\"disallowed\"],[[3218,3240],\"valid\"],[[3241,3241],\"disallowed\"],[[3242,3251],\"valid\"],[[3252,3252],\"disallowed\"],[[3253,3257],\"valid\"],[[3258,3259],\"disallowed\"],[[3260,3261],\"valid\"],[[3262,3268],\"valid\"],[[3269,3269],\"disallowed\"],[[3270,3272],\"valid\"],[[3273,3273],\"disallowed\"],[[3274,3277],\"valid\"],[[3278,3284],\"disallowed\"],[[3285,3286],\"valid\"],[[3287,3293],\"disallowed\"],[[3294,3294],\"valid\"],[[3295,3295],\"disallowed\"],[[3296,3297],\"valid\"],[[3298,3299],\"valid\"],[[3300,3301],\"disallowed\"],[[3302,3311],\"valid\"],[[3312,3312],\"disallowed\"],[[3313,3314],\"valid\"],[[3315,3328],\"disallowed\"],[[3329,3329],\"valid\"],[[3330,3331],\"valid\"],[[3332,3332],\"disallowed\"],[[3333,3340],\"valid\"],[[3341,3341],\"disallowed\"],[[3342,3344],\"valid\"],[[3345,3345],\"disallowed\"],[[3346,3368],\"valid\"],[[3369,3369],\"valid\"],[[3370,3385],\"valid\"],[[3386,3386],\"valid\"],[[3387,3388],\"disallowed\"],[[3389,3389],\"valid\"],[[3390,3395],\"valid\"],[[3396,3396],\"valid\"],[[3397,3397],\"disallowed\"],[[3398,3400],\"valid\"],[[3401,3401],\"disallowed\"],[[3402,3405],\"valid\"],[[3406,3406],\"valid\"],[[3407,3414],\"disallowed\"],[[3415,3415],\"valid\"],[[3416,3422],\"disallowed\"],[[3423,3423],\"valid\"],[[3424,3425],\"valid\"],[[3426,3427],\"valid\"],[[3428,3429],\"disallowed\"],[[3430,3439],\"valid\"],[[3440,3445],\"valid\",[],\"NV8\"],[[3446,3448],\"disallowed\"],[[3449,3449],\"valid\",[],\"NV8\"],[[3450,3455],\"valid\"],[[3456,3457],\"disallowed\"],[[3458,3459],\"valid\"],[[3460,3460],\"disallowed\"],[[3461,3478],\"valid\"],[[3479,3481],\"disallowed\"],[[3482,3505],\"valid\"],[[3506,3506],\"disallowed\"],[[3507,3515],\"valid\"],[[3516,3516],\"disallowed\"],[[3517,3517],\"valid\"],[[3518,3519],\"disallowed\"],[[3520,3526],\"valid\"],[[3527,3529],\"disallowed\"],[[3530,3530],\"valid\"],[[3531,3534],\"disallowed\"],[[3535,3540],\"valid\"],[[3541,3541],\"disallowed\"],[[3542,3542],\"valid\"],[[3543,3543],\"disallowed\"],[[3544,3551],\"valid\"],[[3552,3557],\"disallowed\"],[[3558,3567],\"valid\"],[[3568,3569],\"disallowed\"],[[3570,3571],\"valid\"],[[3572,3572],\"valid\",[],\"NV8\"],[[3573,3584],\"disallowed\"],[[3585,3634],\"valid\"],[[3635,3635],\"mapped\",[3661,3634]],[[3636,3642],\"valid\"],[[3643,3646],\"disallowed\"],[[3647,3647],\"valid\",[],\"NV8\"],[[3648,3662],\"valid\"],[[3663,3663],\"valid\",[],\"NV8\"],[[3664,3673],\"valid\"],[[3674,3675],\"valid\",[],\"NV8\"],[[3676,3712],\"disallowed\"],[[3713,3714],\"valid\"],[[3715,3715],\"disallowed\"],[[3716,3716],\"valid\"],[[3717,3718],\"disallowed\"],[[3719,3720],\"valid\"],[[3721,3721],\"disallowed\"],[[3722,3722],\"valid\"],[[3723,3724],\"disallowed\"],[[3725,3725],\"valid\"],[[3726,3731],\"disallowed\"],[[3732,3735],\"valid\"],[[3736,3736],\"disallowed\"],[[3737,3743],\"valid\"],[[3744,3744],\"disallowed\"],[[3745,3747],\"valid\"],[[3748,3748],\"disallowed\"],[[3749,3749],\"valid\"],[[3750,3750],\"disallowed\"],[[3751,3751],\"valid\"],[[3752,3753],\"disallowed\"],[[3754,3755],\"valid\"],[[3756,3756],\"disallowed\"],[[3757,3762],\"valid\"],[[3763,3763],\"mapped\",[3789,3762]],[[3764,3769],\"valid\"],[[3770,3770],\"disallowed\"],[[3771,3773],\"valid\"],[[3774,3775],\"disallowed\"],[[3776,3780],\"valid\"],[[3781,3781],\"disallowed\"],[[3782,3782],\"valid\"],[[3783,3783],\"disallowed\"],[[3784,3789],\"valid\"],[[3790,3791],\"disallowed\"],[[3792,3801],\"valid\"],[[3802,3803],\"disallowed\"],[[3804,3804],\"mapped\",[3755,3737]],[[3805,3805],\"mapped\",[3755,3745]],[[3806,3807],\"valid\"],[[3808,3839],\"disallowed\"],[[3840,3840],\"valid\"],[[3841,3850],\"valid\",[],\"NV8\"],[[3851,3851],\"valid\"],[[3852,3852],\"mapped\",[3851]],[[3853,3863],\"valid\",[],\"NV8\"],[[3864,3865],\"valid\"],[[3866,3871],\"valid\",[],\"NV8\"],[[3872,3881],\"valid\"],[[3882,3892],\"valid\",[],\"NV8\"],[[3893,3893],\"valid\"],[[3894,3894],\"valid\",[],\"NV8\"],[[3895,3895],\"valid\"],[[3896,3896],\"valid\",[],\"NV8\"],[[3897,3897],\"valid\"],[[3898,3901],\"valid\",[],\"NV8\"],[[3902,3906],\"valid\"],[[3907,3907],\"mapped\",[3906,4023]],[[3908,3911],\"valid\"],[[3912,3912],\"disallowed\"],[[3913,3916],\"valid\"],[[3917,3917],\"mapped\",[3916,4023]],[[3918,3921],\"valid\"],[[3922,3922],\"mapped\",[3921,4023]],[[3923,3926],\"valid\"],[[3927,3927],\"mapped\",[3926,4023]],[[3928,3931],\"valid\"],[[3932,3932],\"mapped\",[3931,4023]],[[3933,3944],\"valid\"],[[3945,3945],\"mapped\",[3904,4021]],[[3946,3946],\"valid\"],[[3947,3948],\"valid\"],[[3949,3952],\"disallowed\"],[[3953,3954],\"valid\"],[[3955,3955],\"mapped\",[3953,3954]],[[3956,3956],\"valid\"],[[3957,3957],\"mapped\",[3953,3956]],[[3958,3958],\"mapped\",[4018,3968]],[[3959,3959],\"mapped\",[4018,3953,3968]],[[3960,3960],\"mapped\",[4019,3968]],[[3961,3961],\"mapped\",[4019,3953,3968]],[[3962,3968],\"valid\"],[[3969,3969],\"mapped\",[3953,3968]],[[3970,3972],\"valid\"],[[3973,3973],\"valid\",[],\"NV8\"],[[3974,3979],\"valid\"],[[3980,3983],\"valid\"],[[3984,3986],\"valid\"],[[3987,3987],\"mapped\",[3986,4023]],[[3988,3989],\"valid\"],[[3990,3990],\"valid\"],[[3991,3991],\"valid\"],[[3992,3992],\"disallowed\"],[[3993,3996],\"valid\"],[[3997,3997],\"mapped\",[3996,4023]],[[3998,4001],\"valid\"],[[4002,4002],\"mapped\",[4001,4023]],[[4003,4006],\"valid\"],[[4007,4007],\"mapped\",[4006,4023]],[[4008,4011],\"valid\"],[[4012,4012],\"mapped\",[4011,4023]],[[4013,4013],\"valid\"],[[4014,4016],\"valid\"],[[4017,4023],\"valid\"],[[4024,4024],\"valid\"],[[4025,4025],\"mapped\",[3984,4021]],[[4026,4028],\"valid\"],[[4029,4029],\"disallowed\"],[[4030,4037],\"valid\",[],\"NV8\"],[[4038,4038],\"valid\"],[[4039,4044],\"valid\",[],\"NV8\"],[[4045,4045],\"disallowed\"],[[4046,4046],\"valid\",[],\"NV8\"],[[4047,4047],\"valid\",[],\"NV8\"],[[4048,4049],\"valid\",[],\"NV8\"],[[4050,4052],\"valid\",[],\"NV8\"],[[4053,4056],\"valid\",[],\"NV8\"],[[4057,4058],\"valid\",[],\"NV8\"],[[4059,4095],\"disallowed\"],[[4096,4129],\"valid\"],[[4130,4130],\"valid\"],[[4131,4135],\"valid\"],[[4136,4136],\"valid\"],[[4137,4138],\"valid\"],[[4139,4139],\"valid\"],[[4140,4146],\"valid\"],[[4147,4149],\"valid\"],[[4150,4153],\"valid\"],[[4154,4159],\"valid\"],[[4160,4169],\"valid\"],[[4170,4175],\"valid\",[],\"NV8\"],[[4176,4185],\"valid\"],[[4186,4249],\"valid\"],[[4250,4253],\"valid\"],[[4254,4255],\"valid\",[],\"NV8\"],[[4256,4293],\"disallowed\"],[[4294,4294],\"disallowed\"],[[4295,4295],\"mapped\",[11559]],[[4296,4300],\"disallowed\"],[[4301,4301],\"mapped\",[11565]],[[4302,4303],\"disallowed\"],[[4304,4342],\"valid\"],[[4343,4344],\"valid\"],[[4345,4346],\"valid\"],[[4347,4347],\"valid\",[],\"NV8\"],[[4348,4348],\"mapped\",[4316]],[[4349,4351],\"valid\"],[[4352,4441],\"valid\",[],\"NV8\"],[[4442,4446],\"valid\",[],\"NV8\"],[[4447,4448],\"disallowed\"],[[4449,4514],\"valid\",[],\"NV8\"],[[4515,4519],\"valid\",[],\"NV8\"],[[4520,4601],\"valid\",[],\"NV8\"],[[4602,4607],\"valid\",[],\"NV8\"],[[4608,4614],\"valid\"],[[4615,4615],\"valid\"],[[4616,4678],\"valid\"],[[4679,4679],\"valid\"],[[4680,4680],\"valid\"],[[4681,4681],\"disallowed\"],[[4682,4685],\"valid\"],[[4686,4687],\"disallowed\"],[[4688,4694],\"valid\"],[[4695,4695],\"disallowed\"],[[4696,4696],\"valid\"],[[4697,4697],\"disallowed\"],[[4698,4701],\"valid\"],[[4702,4703],\"disallowed\"],[[4704,4742],\"valid\"],[[4743,4743],\"valid\"],[[4744,4744],\"valid\"],[[4745,4745],\"disallowed\"],[[4746,4749],\"valid\"],[[4750,4751],\"disallowed\"],[[4752,4782],\"valid\"],[[4783,4783],\"valid\"],[[4784,4784],\"valid\"],[[4785,4785],\"disallowed\"],[[4786,4789],\"valid\"],[[4790,4791],\"disallowed\"],[[4792,4798],\"valid\"],[[4799,4799],\"disallowed\"],[[4800,4800],\"valid\"],[[4801,4801],\"disallowed\"],[[4802,4805],\"valid\"],[[4806,4807],\"disallowed\"],[[4808,4814],\"valid\"],[[4815,4815],\"valid\"],[[4816,4822],\"valid\"],[[4823,4823],\"disallowed\"],[[4824,4846],\"valid\"],[[4847,4847],\"valid\"],[[4848,4878],\"valid\"],[[4879,4879],\"valid\"],[[4880,4880],\"valid\"],[[4881,4881],\"disallowed\"],[[4882,4885],\"valid\"],[[4886,4887],\"disallowed\"],[[4888,4894],\"valid\"],[[4895,4895],\"valid\"],[[4896,4934],\"valid\"],[[4935,4935],\"valid\"],[[4936,4954],\"valid\"],[[4955,4956],\"disallowed\"],[[4957,4958],\"valid\"],[[4959,4959],\"valid\"],[[4960,4960],\"valid\",[],\"NV8\"],[[4961,4988],\"valid\",[],\"NV8\"],[[4989,4991],\"disallowed\"],[[4992,5007],\"valid\"],[[5008,5017],\"valid\",[],\"NV8\"],[[5018,5023],\"disallowed\"],[[5024,5108],\"valid\"],[[5109,5109],\"valid\"],[[5110,5111],\"disallowed\"],[[5112,5112],\"mapped\",[5104]],[[5113,5113],\"mapped\",[5105]],[[5114,5114],\"mapped\",[5106]],[[5115,5115],\"mapped\",[5107]],[[5116,5116],\"mapped\",[5108]],[[5117,5117],\"mapped\",[5109]],[[5118,5119],\"disallowed\"],[[5120,5120],\"valid\",[],\"NV8\"],[[5121,5740],\"valid\"],[[5741,5742],\"valid\",[],\"NV8\"],[[5743,5750],\"valid\"],[[5751,5759],\"valid\"],[[5760,5760],\"disallowed\"],[[5761,5786],\"valid\"],[[5787,5788],\"valid\",[],\"NV8\"],[[5789,5791],\"disallowed\"],[[5792,5866],\"valid\"],[[5867,5872],\"valid\",[],\"NV8\"],[[5873,5880],\"valid\"],[[5881,5887],\"disallowed\"],[[5888,5900],\"valid\"],[[5901,5901],\"disallowed\"],[[5902,5908],\"valid\"],[[5909,5919],\"disallowed\"],[[5920,5940],\"valid\"],[[5941,5942],\"valid\",[],\"NV8\"],[[5943,5951],\"disallowed\"],[[5952,5971],\"valid\"],[[5972,5983],\"disallowed\"],[[5984,5996],\"valid\"],[[5997,5997],\"disallowed\"],[[5998,6000],\"valid\"],[[6001,6001],\"disallowed\"],[[6002,6003],\"valid\"],[[6004,6015],\"disallowed\"],[[6016,6067],\"valid\"],[[6068,6069],\"disallowed\"],[[6070,6099],\"valid\"],[[6100,6102],\"valid\",[],\"NV8\"],[[6103,6103],\"valid\"],[[6104,6107],\"valid\",[],\"NV8\"],[[6108,6108],\"valid\"],[[6109,6109],\"valid\"],[[6110,6111],\"disallowed\"],[[6112,6121],\"valid\"],[[6122,6127],\"disallowed\"],[[6128,6137],\"valid\",[],\"NV8\"],[[6138,6143],\"disallowed\"],[[6144,6149],\"valid\",[],\"NV8\"],[[6150,6150],\"disallowed\"],[[6151,6154],\"valid\",[],\"NV8\"],[[6155,6157],\"ignored\"],[[6158,6158],\"disallowed\"],[[6159,6159],\"disallowed\"],[[6160,6169],\"valid\"],[[6170,6175],\"disallowed\"],[[6176,6263],\"valid\"],[[6264,6271],\"disallowed\"],[[6272,6313],\"valid\"],[[6314,6314],\"valid\"],[[6315,6319],\"disallowed\"],[[6320,6389],\"valid\"],[[6390,6399],\"disallowed\"],[[6400,6428],\"valid\"],[[6429,6430],\"valid\"],[[6431,6431],\"disallowed\"],[[6432,6443],\"valid\"],[[6444,6447],\"disallowed\"],[[6448,6459],\"valid\"],[[6460,6463],\"disallowed\"],[[6464,6464],\"valid\",[],\"NV8\"],[[6465,6467],\"disallowed\"],[[6468,6469],\"valid\",[],\"NV8\"],[[6470,6509],\"valid\"],[[6510,6511],\"disallowed\"],[[6512,6516],\"valid\"],[[6517,6527],\"disallowed\"],[[6528,6569],\"valid\"],[[6570,6571],\"valid\"],[[6572,6575],\"disallowed\"],[[6576,6601],\"valid\"],[[6602,6607],\"disallowed\"],[[6608,6617],\"valid\"],[[6618,6618],\"valid\",[],\"XV8\"],[[6619,6621],\"disallowed\"],[[6622,6623],\"valid\",[],\"NV8\"],[[6624,6655],\"valid\",[],\"NV8\"],[[6656,6683],\"valid\"],[[6684,6685],\"disallowed\"],[[6686,6687],\"valid\",[],\"NV8\"],[[6688,6750],\"valid\"],[[6751,6751],\"disallowed\"],[[6752,6780],\"valid\"],[[6781,6782],\"disallowed\"],[[6783,6793],\"valid\"],[[6794,6799],\"disallowed\"],[[6800,6809],\"valid\"],[[6810,6815],\"disallowed\"],[[6816,6822],\"valid\",[],\"NV8\"],[[6823,6823],\"valid\"],[[6824,6829],\"valid\",[],\"NV8\"],[[6830,6831],\"disallowed\"],[[6832,6845],\"valid\"],[[6846,6846],\"valid\",[],\"NV8\"],[[6847,6911],\"disallowed\"],[[6912,6987],\"valid\"],[[6988,6991],\"disallowed\"],[[6992,7001],\"valid\"],[[7002,7018],\"valid\",[],\"NV8\"],[[7019,7027],\"valid\"],[[7028,7036],\"valid\",[],\"NV8\"],[[7037,7039],\"disallowed\"],[[7040,7082],\"valid\"],[[7083,7085],\"valid\"],[[7086,7097],\"valid\"],[[7098,7103],\"valid\"],[[7104,7155],\"valid\"],[[7156,7163],\"disallowed\"],[[7164,7167],\"valid\",[],\"NV8\"],[[7168,7223],\"valid\"],[[7224,7226],\"disallowed\"],[[7227,7231],\"valid\",[],\"NV8\"],[[7232,7241],\"valid\"],[[7242,7244],\"disallowed\"],[[7245,7293],\"valid\"],[[7294,7295],\"valid\",[],\"NV8\"],[[7296,7359],\"disallowed\"],[[7360,7367],\"valid\",[],\"NV8\"],[[7368,7375],\"disallowed\"],[[7376,7378],\"valid\"],[[7379,7379],\"valid\",[],\"NV8\"],[[7380,7410],\"valid\"],[[7411,7414],\"valid\"],[[7415,7415],\"disallowed\"],[[7416,7417],\"valid\"],[[7418,7423],\"disallowed\"],[[7424,7467],\"valid\"],[[7468,7468],\"mapped\",[97]],[[7469,7469],\"mapped\",[230]],[[7470,7470],\"mapped\",[98]],[[7471,7471],\"valid\"],[[7472,7472],\"mapped\",[100]],[[7473,7473],\"mapped\",[101]],[[7474,7474],\"mapped\",[477]],[[7475,7475],\"mapped\",[103]],[[7476,7476],\"mapped\",[104]],[[7477,7477],\"mapped\",[105]],[[7478,7478],\"mapped\",[106]],[[7479,7479],\"mapped\",[107]],[[7480,7480],\"mapped\",[108]],[[7481,7481],\"mapped\",[109]],[[7482,7482],\"mapped\",[110]],[[7483,7483],\"valid\"],[[7484,7484],\"mapped\",[111]],[[7485,7485],\"mapped\",[547]],[[7486,7486],\"mapped\",[112]],[[7487,7487],\"mapped\",[114]],[[7488,7488],\"mapped\",[116]],[[7489,7489],\"mapped\",[117]],[[7490,7490],\"mapped\",[119]],[[7491,7491],\"mapped\",[97]],[[7492,7492],\"mapped\",[592]],[[7493,7493],\"mapped\",[593]],[[7494,7494],\"mapped\",[7426]],[[7495,7495],\"mapped\",[98]],[[7496,7496],\"mapped\",[100]],[[7497,7497],\"mapped\",[101]],[[7498,7498],\"mapped\",[601]],[[7499,7499],\"mapped\",[603]],[[7500,7500],\"mapped\",[604]],[[7501,7501],\"mapped\",[103]],[[7502,7502],\"valid\"],[[7503,7503],\"mapped\",[107]],[[7504,7504],\"mapped\",[109]],[[7505,7505],\"mapped\",[331]],[[7506,7506],\"mapped\",[111]],[[7507,7507],\"mapped\",[596]],[[7508,7508],\"mapped\",[7446]],[[7509,7509],\"mapped\",[7447]],[[7510,7510],\"mapped\",[112]],[[7511,7511],\"mapped\",[116]],[[7512,7512],\"mapped\",[117]],[[7513,7513],\"mapped\",[7453]],[[7514,7514],\"mapped\",[623]],[[7515,7515],\"mapped\",[118]],[[7516,7516],\"mapped\",[7461]],[[7517,7517],\"mapped\",[946]],[[7518,7518],\"mapped\",[947]],[[7519,7519],\"mapped\",[948]],[[7520,7520],\"mapped\",[966]],[[7521,7521],\"mapped\",[967]],[[7522,7522],\"mapped\",[105]],[[7523,7523],\"mapped\",[114]],[[7524,7524],\"mapped\",[117]],[[7525,7525],\"mapped\",[118]],[[7526,7526],\"mapped\",[946]],[[7527,7527],\"mapped\",[947]],[[7528,7528],\"mapped\",[961]],[[7529,7529],\"mapped\",[966]],[[7530,7530],\"mapped\",[967]],[[7531,7531],\"valid\"],[[7532,7543],\"valid\"],[[7544,7544],\"mapped\",[1085]],[[7545,7578],\"valid\"],[[7579,7579],\"mapped\",[594]],[[7580,7580],\"mapped\",[99]],[[7581,7581],\"mapped\",[597]],[[7582,7582],\"mapped\",[240]],[[7583,7583],\"mapped\",[604]],[[7584,7584],\"mapped\",[102]],[[7585,7585],\"mapped\",[607]],[[7586,7586],\"mapped\",[609]],[[7587,7587],\"mapped\",[613]],[[7588,7588],\"mapped\",[616]],[[7589,7589],\"mapped\",[617]],[[7590,7590],\"mapped\",[618]],[[7591,7591],\"mapped\",[7547]],[[7592,7592],\"mapped\",[669]],[[7593,7593],\"mapped\",[621]],[[7594,7594],\"mapped\",[7557]],[[7595,7595],\"mapped\",[671]],[[7596,7596],\"mapped\",[625]],[[7597,7597],\"mapped\",[624]],[[7598,7598],\"mapped\",[626]],[[7599,7599],\"mapped\",[627]],[[7600,7600],\"mapped\",[628]],[[7601,7601],\"mapped\",[629]],[[7602,7602],\"mapped\",[632]],[[7603,7603],\"mapped\",[642]],[[7604,7604],\"mapped\",[643]],[[7605,7605],\"mapped\",[427]],[[7606,7606],\"mapped\",[649]],[[7607,7607],\"mapped\",[650]],[[7608,7608],\"mapped\",[7452]],[[7609,7609],\"mapped\",[651]],[[7610,7610],\"mapped\",[652]],[[7611,7611],\"mapped\",[122]],[[7612,7612],\"mapped\",[656]],[[7613,7613],\"mapped\",[657]],[[7614,7614],\"mapped\",[658]],[[7615,7615],\"mapped\",[952]],[[7616,7619],\"valid\"],[[7620,7626],\"valid\"],[[7627,7654],\"valid\"],[[7655,7669],\"valid\"],[[7670,7675],\"disallowed\"],[[7676,7676],\"valid\"],[[7677,7677],\"valid\"],[[7678,7679],\"valid\"],[[7680,7680],\"mapped\",[7681]],[[7681,7681],\"valid\"],[[7682,7682],\"mapped\",[7683]],[[7683,7683],\"valid\"],[[7684,7684],\"mapped\",[7685]],[[7685,7685],\"valid\"],[[7686,7686],\"mapped\",[7687]],[[7687,7687],\"valid\"],[[7688,7688],\"mapped\",[7689]],[[7689,7689],\"valid\"],[[7690,7690],\"mapped\",[7691]],[[7691,7691],\"valid\"],[[7692,7692],\"mapped\",[7693]],[[7693,7693],\"valid\"],[[7694,7694],\"mapped\",[7695]],[[7695,7695],\"valid\"],[[7696,7696],\"mapped\",[7697]],[[7697,7697],\"valid\"],[[7698,7698],\"mapped\",[7699]],[[7699,7699],\"valid\"],[[7700,7700],\"mapped\",[7701]],[[7701,7701],\"valid\"],[[7702,7702],\"mapped\",[7703]],[[7703,7703],\"valid\"],[[7704,7704],\"mapped\",[7705]],[[7705,7705],\"valid\"],[[7706,7706],\"mapped\",[7707]],[[7707,7707],\"valid\"],[[7708,7708],\"mapped\",[7709]],[[7709,7709],\"valid\"],[[7710,7710],\"mapped\",[7711]],[[7711,7711],\"valid\"],[[7712,7712],\"mapped\",[7713]],[[7713,7713],\"valid\"],[[7714,7714],\"mapped\",[7715]],[[7715,7715],\"valid\"],[[7716,7716],\"mapped\",[7717]],[[7717,7717],\"valid\"],[[7718,7718],\"mapped\",[7719]],[[7719,7719],\"valid\"],[[7720,7720],\"mapped\",[7721]],[[7721,7721],\"valid\"],[[7722,7722],\"mapped\",[7723]],[[7723,7723],\"valid\"],[[7724,7724],\"mapped\",[7725]],[[7725,7725],\"valid\"],[[7726,7726],\"mapped\",[7727]],[[7727,7727],\"valid\"],[[7728,7728],\"mapped\",[7729]],[[7729,7729],\"valid\"],[[7730,7730],\"mapped\",[7731]],[[7731,7731],\"valid\"],[[7732,7732],\"mapped\",[7733]],[[7733,7733],\"valid\"],[[7734,7734],\"mapped\",[7735]],[[7735,7735],\"valid\"],[[7736,7736],\"mapped\",[7737]],[[7737,7737],\"valid\"],[[7738,7738],\"mapped\",[7739]],[[7739,7739],\"valid\"],[[7740,7740],\"mapped\",[7741]],[[7741,7741],\"valid\"],[[7742,7742],\"mapped\",[7743]],[[7743,7743],\"valid\"],[[7744,7744],\"mapped\",[7745]],[[7745,7745],\"valid\"],[[7746,7746],\"mapped\",[7747]],[[7747,7747],\"valid\"],[[7748,7748],\"mapped\",[7749]],[[7749,7749],\"valid\"],[[7750,7750],\"mapped\",[7751]],[[7751,7751],\"valid\"],[[7752,7752],\"mapped\",[7753]],[[7753,7753],\"valid\"],[[7754,7754],\"mapped\",[7755]],[[7755,7755],\"valid\"],[[7756,7756],\"mapped\",[7757]],[[7757,7757],\"valid\"],[[7758,7758],\"mapped\",[7759]],[[7759,7759],\"valid\"],[[7760,7760],\"mapped\",[7761]],[[7761,7761],\"valid\"],[[7762,7762],\"mapped\",[7763]],[[7763,7763],\"valid\"],[[7764,7764],\"mapped\",[7765]],[[7765,7765],\"valid\"],[[7766,7766],\"mapped\",[7767]],[[7767,7767],\"valid\"],[[7768,7768],\"mapped\",[7769]],[[7769,7769],\"valid\"],[[7770,7770],\"mapped\",[7771]],[[7771,7771],\"valid\"],[[7772,7772],\"mapped\",[7773]],[[7773,7773],\"valid\"],[[7774,7774],\"mapped\",[7775]],[[7775,7775],\"valid\"],[[7776,7776],\"mapped\",[7777]],[[7777,7777],\"valid\"],[[7778,7778],\"mapped\",[7779]],[[7779,7779],\"valid\"],[[7780,7780],\"mapped\",[7781]],[[7781,7781],\"valid\"],[[7782,7782],\"mapped\",[7783]],[[7783,7783],\"valid\"],[[7784,7784],\"mapped\",[7785]],[[7785,7785],\"valid\"],[[7786,7786],\"mapped\",[7787]],[[7787,7787],\"valid\"],[[7788,7788],\"mapped\",[7789]],[[7789,7789],\"valid\"],[[7790,7790],\"mapped\",[7791]],[[7791,7791],\"valid\"],[[7792,7792],\"mapped\",[7793]],[[7793,7793],\"valid\"],[[7794,7794],\"mapped\",[7795]],[[7795,7795],\"valid\"],[[7796,7796],\"mapped\",[7797]],[[7797,7797],\"valid\"],[[7798,7798],\"mapped\",[7799]],[[7799,7799],\"valid\"],[[7800,7800],\"mapped\",[7801]],[[7801,7801],\"valid\"],[[7802,7802],\"mapped\",[7803]],[[7803,7803],\"valid\"],[[7804,7804],\"mapped\",[7805]],[[7805,7805],\"valid\"],[[7806,7806],\"mapped\",[7807]],[[7807,7807],\"valid\"],[[7808,7808],\"mapped\",[7809]],[[7809,7809],\"valid\"],[[7810,7810],\"mapped\",[7811]],[[7811,7811],\"valid\"],[[7812,7812],\"mapped\",[7813]],[[7813,7813],\"valid\"],[[7814,7814],\"mapped\",[7815]],[[7815,7815],\"valid\"],[[7816,7816],\"mapped\",[7817]],[[7817,7817],\"valid\"],[[7818,7818],\"mapped\",[7819]],[[7819,7819],\"valid\"],[[7820,7820],\"mapped\",[7821]],[[7821,7821],\"valid\"],[[7822,7822],\"mapped\",[7823]],[[7823,7823],\"valid\"],[[7824,7824],\"mapped\",[7825]],[[7825,7825],\"valid\"],[[7826,7826],\"mapped\",[7827]],[[7827,7827],\"valid\"],[[7828,7828],\"mapped\",[7829]],[[7829,7833],\"valid\"],[[7834,7834],\"mapped\",[97,702]],[[7835,7835],\"mapped\",[7777]],[[7836,7837],\"valid\"],[[7838,7838],\"mapped\",[115,115]],[[7839,7839],\"valid\"],[[7840,7840],\"mapped\",[7841]],[[7841,7841],\"valid\"],[[7842,7842],\"mapped\",[7843]],[[7843,7843],\"valid\"],[[7844,7844],\"mapped\",[7845]],[[7845,7845],\"valid\"],[[7846,7846],\"mapped\",[7847]],[[7847,7847],\"valid\"],[[7848,7848],\"mapped\",[7849]],[[7849,7849],\"valid\"],[[7850,7850],\"mapped\",[7851]],[[7851,7851],\"valid\"],[[7852,7852],\"mapped\",[7853]],[[7853,7853],\"valid\"],[[7854,7854],\"mapped\",[7855]],[[7855,7855],\"valid\"],[[7856,7856],\"mapped\",[7857]],[[7857,7857],\"valid\"],[[7858,7858],\"mapped\",[7859]],[[7859,7859],\"valid\"],[[7860,7860],\"mapped\",[7861]],[[7861,7861],\"valid\"],[[7862,7862],\"mapped\",[7863]],[[7863,7863],\"valid\"],[[7864,7864],\"mapped\",[7865]],[[7865,7865],\"valid\"],[[7866,7866],\"mapped\",[7867]],[[7867,7867],\"valid\"],[[7868,7868],\"mapped\",[7869]],[[7869,7869],\"valid\"],[[7870,7870],\"mapped\",[7871]],[[7871,7871],\"valid\"],[[7872,7872],\"mapped\",[7873]],[[7873,7873],\"valid\"],[[7874,7874],\"mapped\",[7875]],[[7875,7875],\"valid\"],[[7876,7876],\"mapped\",[7877]],[[7877,7877],\"valid\"],[[7878,7878],\"mapped\",[7879]],[[7879,7879],\"valid\"],[[7880,7880],\"mapped\",[7881]],[[7881,7881],\"valid\"],[[7882,7882],\"mapped\",[7883]],[[7883,7883],\"valid\"],[[7884,7884],\"mapped\",[7885]],[[7885,7885],\"valid\"],[[7886,7886],\"mapped\",[7887]],[[7887,7887],\"valid\"],[[7888,7888],\"mapped\",[7889]],[[7889,7889],\"valid\"],[[7890,7890],\"mapped\",[7891]],[[7891,7891],\"valid\"],[[7892,7892],\"mapped\",[7893]],[[7893,7893],\"valid\"],[[7894,7894],\"mapped\",[7895]],[[7895,7895],\"valid\"],[[7896,7896],\"mapped\",[7897]],[[7897,7897],\"valid\"],[[7898,7898],\"mapped\",[7899]],[[7899,7899],\"valid\"],[[7900,7900],\"mapped\",[7901]],[[7901,7901],\"valid\"],[[7902,7902],\"mapped\",[7903]],[[7903,7903],\"valid\"],[[7904,7904],\"mapped\",[7905]],[[7905,7905],\"valid\"],[[7906,7906],\"mapped\",[7907]],[[7907,7907],\"valid\"],[[7908,7908],\"mapped\",[7909]],[[7909,7909],\"valid\"],[[7910,7910],\"mapped\",[7911]],[[7911,7911],\"valid\"],[[7912,7912],\"mapped\",[7913]],[[7913,7913],\"valid\"],[[7914,7914],\"mapped\",[7915]],[[7915,7915],\"valid\"],[[7916,7916],\"mapped\",[7917]],[[7917,7917],\"valid\"],[[7918,7918],\"mapped\",[7919]],[[7919,7919],\"valid\"],[[7920,7920],\"mapped\",[7921]],[[7921,7921],\"valid\"],[[7922,7922],\"mapped\",[7923]],[[7923,7923],\"valid\"],[[7924,7924],\"mapped\",[7925]],[[7925,7925],\"valid\"],[[7926,7926],\"mapped\",[7927]],[[7927,7927],\"valid\"],[[7928,7928],\"mapped\",[7929]],[[7929,7929],\"valid\"],[[7930,7930],\"mapped\",[7931]],[[7931,7931],\"valid\"],[[7932,7932],\"mapped\",[7933]],[[7933,7933],\"valid\"],[[7934,7934],\"mapped\",[7935]],[[7935,7935],\"valid\"],[[7936,7943],\"valid\"],[[7944,7944],\"mapped\",[7936]],[[7945,7945],\"mapped\",[7937]],[[7946,7946],\"mapped\",[7938]],[[7947,7947],\"mapped\",[7939]],[[7948,7948],\"mapped\",[7940]],[[7949,7949],\"mapped\",[7941]],[[7950,7950],\"mapped\",[7942]],[[7951,7951],\"mapped\",[7943]],[[7952,7957],\"valid\"],[[7958,7959],\"disallowed\"],[[7960,7960],\"mapped\",[7952]],[[7961,7961],\"mapped\",[7953]],[[7962,7962],\"mapped\",[7954]],[[7963,7963],\"mapped\",[7955]],[[7964,7964],\"mapped\",[7956]],[[7965,7965],\"mapped\",[7957]],[[7966,7967],\"disallowed\"],[[7968,7975],\"valid\"],[[7976,7976],\"mapped\",[7968]],[[7977,7977],\"mapped\",[7969]],[[7978,7978],\"mapped\",[7970]],[[7979,7979],\"mapped\",[7971]],[[7980,7980],\"mapped\",[7972]],[[7981,7981],\"mapped\",[7973]],[[7982,7982],\"mapped\",[7974]],[[7983,7983],\"mapped\",[7975]],[[7984,7991],\"valid\"],[[7992,7992],\"mapped\",[7984]],[[7993,7993],\"mapped\",[7985]],[[7994,7994],\"mapped\",[7986]],[[7995,7995],\"mapped\",[7987]],[[7996,7996],\"mapped\",[7988]],[[7997,7997],\"mapped\",[7989]],[[7998,7998],\"mapped\",[7990]],[[7999,7999],\"mapped\",[7991]],[[8000,8005],\"valid\"],[[8006,8007],\"disallowed\"],[[8008,8008],\"mapped\",[8000]],[[8009,8009],\"mapped\",[8001]],[[8010,8010],\"mapped\",[8002]],[[8011,8011],\"mapped\",[8003]],[[8012,8012],\"mapped\",[8004]],[[8013,8013],\"mapped\",[8005]],[[8014,8015],\"disallowed\"],[[8016,8023],\"valid\"],[[8024,8024],\"disallowed\"],[[8025,8025],\"mapped\",[8017]],[[8026,8026],\"disallowed\"],[[8027,8027],\"mapped\",[8019]],[[8028,8028],\"disallowed\"],[[8029,8029],\"mapped\",[8021]],[[8030,8030],\"disallowed\"],[[8031,8031],\"mapped\",[8023]],[[8032,8039],\"valid\"],[[8040,8040],\"mapped\",[8032]],[[8041,8041],\"mapped\",[8033]],[[8042,8042],\"mapped\",[8034]],[[8043,8043],\"mapped\",[8035]],[[8044,8044],\"mapped\",[8036]],[[8045,8045],\"mapped\",[8037]],[[8046,8046],\"mapped\",[8038]],[[8047,8047],\"mapped\",[8039]],[[8048,8048],\"valid\"],[[8049,8049],\"mapped\",[940]],[[8050,8050],\"valid\"],[[8051,8051],\"mapped\",[941]],[[8052,8052],\"valid\"],[[8053,8053],\"mapped\",[942]],[[8054,8054],\"valid\"],[[8055,8055],\"mapped\",[943]],[[8056,8056],\"valid\"],[[8057,8057],\"mapped\",[972]],[[8058,8058],\"valid\"],[[8059,8059],\"mapped\",[973]],[[8060,8060],\"valid\"],[[8061,8061],\"mapped\",[974]],[[8062,8063],\"disallowed\"],[[8064,8064],\"mapped\",[7936,953]],[[8065,8065],\"mapped\",[7937,953]],[[8066,8066],\"mapped\",[7938,953]],[[8067,8067],\"mapped\",[7939,953]],[[8068,8068],\"mapped\",[7940,953]],[[8069,8069],\"mapped\",[7941,953]],[[8070,8070],\"mapped\",[7942,953]],[[8071,8071],\"mapped\",[7943,953]],[[8072,8072],\"mapped\",[7936,953]],[[8073,8073],\"mapped\",[7937,953]],[[8074,8074],\"mapped\",[7938,953]],[[8075,8075],\"mapped\",[7939,953]],[[8076,8076],\"mapped\",[7940,953]],[[8077,8077],\"mapped\",[7941,953]],[[8078,8078],\"mapped\",[7942,953]],[[8079,8079],\"mapped\",[7943,953]],[[8080,8080],\"mapped\",[7968,953]],[[8081,8081],\"mapped\",[7969,953]],[[8082,8082],\"mapped\",[7970,953]],[[8083,8083],\"mapped\",[7971,953]],[[8084,8084],\"mapped\",[7972,953]],[[8085,8085],\"mapped\",[7973,953]],[[8086,8086],\"mapped\",[7974,953]],[[8087,8087],\"mapped\",[7975,953]],[[8088,8088],\"mapped\",[7968,953]],[[8089,8089],\"mapped\",[7969,953]],[[8090,8090],\"mapped\",[7970,953]],[[8091,8091],\"mapped\",[7971,953]],[[8092,8092],\"mapped\",[7972,953]],[[8093,8093],\"mapped\",[7973,953]],[[8094,8094],\"mapped\",[7974,953]],[[8095,8095],\"mapped\",[7975,953]],[[8096,8096],\"mapped\",[8032,953]],[[8097,8097],\"mapped\",[8033,953]],[[8098,8098],\"mapped\",[8034,953]],[[8099,8099],\"mapped\",[8035,953]],[[8100,8100],\"mapped\",[8036,953]],[[8101,8101],\"mapped\",[8037,953]],[[8102,8102],\"mapped\",[8038,953]],[[8103,8103],\"mapped\",[8039,953]],[[8104,8104],\"mapped\",[8032,953]],[[8105,8105],\"mapped\",[8033,953]],[[8106,8106],\"mapped\",[8034,953]],[[8107,8107],\"mapped\",[8035,953]],[[8108,8108],\"mapped\",[8036,953]],[[8109,8109],\"mapped\",[8037,953]],[[8110,8110],\"mapped\",[8038,953]],[[8111,8111],\"mapped\",[8039,953]],[[8112,8113],\"valid\"],[[8114,8114],\"mapped\",[8048,953]],[[8115,8115],\"mapped\",[945,953]],[[8116,8116],\"mapped\",[940,953]],[[8117,8117],\"disallowed\"],[[8118,8118],\"valid\"],[[8119,8119],\"mapped\",[8118,953]],[[8120,8120],\"mapped\",[8112]],[[8121,8121],\"mapped\",[8113]],[[8122,8122],\"mapped\",[8048]],[[8123,8123],\"mapped\",[940]],[[8124,8124],\"mapped\",[945,953]],[[8125,8125],\"disallowed_STD3_mapped\",[32,787]],[[8126,8126],\"mapped\",[953]],[[8127,8127],\"disallowed_STD3_mapped\",[32,787]],[[8128,8128],\"disallowed_STD3_mapped\",[32,834]],[[8129,8129],\"disallowed_STD3_mapped\",[32,776,834]],[[8130,8130],\"mapped\",[8052,953]],[[8131,8131],\"mapped\",[951,953]],[[8132,8132],\"mapped\",[942,953]],[[8133,8133],\"disallowed\"],[[8134,8134],\"valid\"],[[8135,8135],\"mapped\",[8134,953]],[[8136,8136],\"mapped\",[8050]],[[8137,8137],\"mapped\",[941]],[[8138,8138],\"mapped\",[8052]],[[8139,8139],\"mapped\",[942]],[[8140,8140],\"mapped\",[951,953]],[[8141,8141],\"disallowed_STD3_mapped\",[32,787,768]],[[8142,8142],\"disallowed_STD3_mapped\",[32,787,769]],[[8143,8143],\"disallowed_STD3_mapped\",[32,787,834]],[[8144,8146],\"valid\"],[[8147,8147],\"mapped\",[912]],[[8148,8149],\"disallowed\"],[[8150,8151],\"valid\"],[[8152,8152],\"mapped\",[8144]],[[8153,8153],\"mapped\",[8145]],[[8154,8154],\"mapped\",[8054]],[[8155,8155],\"mapped\",[943]],[[8156,8156],\"disallowed\"],[[8157,8157],\"disallowed_STD3_mapped\",[32,788,768]],[[8158,8158],\"disallowed_STD3_mapped\",[32,788,769]],[[8159,8159],\"disallowed_STD3_mapped\",[32,788,834]],[[8160,8162],\"valid\"],[[8163,8163],\"mapped\",[944]],[[8164,8167],\"valid\"],[[8168,8168],\"mapped\",[8160]],[[8169,8169],\"mapped\",[8161]],[[8170,8170],\"mapped\",[8058]],[[8171,8171],\"mapped\",[973]],[[8172,8172],\"mapped\",[8165]],[[8173,8173],\"disallowed_STD3_mapped\",[32,776,768]],[[8174,8174],\"disallowed_STD3_mapped\",[32,776,769]],[[8175,8175],\"disallowed_STD3_mapped\",[96]],[[8176,8177],\"disallowed\"],[[8178,8178],\"mapped\",[8060,953]],[[8179,8179],\"mapped\",[969,953]],[[8180,8180],\"mapped\",[974,953]],[[8181,8181],\"disallowed\"],[[8182,8182],\"valid\"],[[8183,8183],\"mapped\",[8182,953]],[[8184,8184],\"mapped\",[8056]],[[8185,8185],\"mapped\",[972]],[[8186,8186],\"mapped\",[8060]],[[8187,8187],\"mapped\",[974]],[[8188,8188],\"mapped\",[969,953]],[[8189,8189],\"disallowed_STD3_mapped\",[32,769]],[[8190,8190],\"disallowed_STD3_mapped\",[32,788]],[[8191,8191],\"disallowed\"],[[8192,8202],\"disallowed_STD3_mapped\",[32]],[[8203,8203],\"ignored\"],[[8204,8205],\"deviation\",[]],[[8206,8207],\"disallowed\"],[[8208,8208],\"valid\",[],\"NV8\"],[[8209,8209],\"mapped\",[8208]],[[8210,8214],\"valid\",[],\"NV8\"],[[8215,8215],\"disallowed_STD3_mapped\",[32,819]],[[8216,8227],\"valid\",[],\"NV8\"],[[8228,8230],\"disallowed\"],[[8231,8231],\"valid\",[],\"NV8\"],[[8232,8238],\"disallowed\"],[[8239,8239],\"disallowed_STD3_mapped\",[32]],[[8240,8242],\"valid\",[],\"NV8\"],[[8243,8243],\"mapped\",[8242,8242]],[[8244,8244],\"mapped\",[8242,8242,8242]],[[8245,8245],\"valid\",[],\"NV8\"],[[8246,8246],\"mapped\",[8245,8245]],[[8247,8247],\"mapped\",[8245,8245,8245]],[[8248,8251],\"valid\",[],\"NV8\"],[[8252,8252],\"disallowed_STD3_mapped\",[33,33]],[[8253,8253],\"valid\",[],\"NV8\"],[[8254,8254],\"disallowed_STD3_mapped\",[32,773]],[[8255,8262],\"valid\",[],\"NV8\"],[[8263,8263],\"disallowed_STD3_mapped\",[63,63]],[[8264,8264],\"disallowed_STD3_mapped\",[63,33]],[[8265,8265],\"disallowed_STD3_mapped\",[33,63]],[[8266,8269],\"valid\",[],\"NV8\"],[[8270,8274],\"valid\",[],\"NV8\"],[[8275,8276],\"valid\",[],\"NV8\"],[[8277,8278],\"valid\",[],\"NV8\"],[[8279,8279],\"mapped\",[8242,8242,8242,8242]],[[8280,8286],\"valid\",[],\"NV8\"],[[8287,8287],\"disallowed_STD3_mapped\",[32]],[[8288,8288],\"ignored\"],[[8289,8291],\"disallowed\"],[[8292,8292],\"ignored\"],[[8293,8293],\"disallowed\"],[[8294,8297],\"disallowed\"],[[8298,8303],\"disallowed\"],[[8304,8304],\"mapped\",[48]],[[8305,8305],\"mapped\",[105]],[[8306,8307],\"disallowed\"],[[8308,8308],\"mapped\",[52]],[[8309,8309],\"mapped\",[53]],[[8310,8310],\"mapped\",[54]],[[8311,8311],\"mapped\",[55]],[[8312,8312],\"mapped\",[56]],[[8313,8313],\"mapped\",[57]],[[8314,8314],\"disallowed_STD3_mapped\",[43]],[[8315,8315],\"mapped\",[8722]],[[8316,8316],\"disallowed_STD3_mapped\",[61]],[[8317,8317],\"disallowed_STD3_mapped\",[40]],[[8318,8318],\"disallowed_STD3_mapped\",[41]],[[8319,8319],\"mapped\",[110]],[[8320,8320],\"mapped\",[48]],[[8321,8321],\"mapped\",[49]],[[8322,8322],\"mapped\",[50]],[[8323,8323],\"mapped\",[51]],[[8324,8324],\"mapped\",[52]],[[8325,8325],\"mapped\",[53]],[[8326,8326],\"mapped\",[54]],[[8327,8327],\"mapped\",[55]],[[8328,8328],\"mapped\",[56]],[[8329,8329],\"mapped\",[57]],[[8330,8330],\"disallowed_STD3_mapped\",[43]],[[8331,8331],\"mapped\",[8722]],[[8332,8332],\"disallowed_STD3_mapped\",[61]],[[8333,8333],\"disallowed_STD3_mapped\",[40]],[[8334,8334],\"disallowed_STD3_mapped\",[41]],[[8335,8335],\"disallowed\"],[[8336,8336],\"mapped\",[97]],[[8337,8337],\"mapped\",[101]],[[8338,8338],\"mapped\",[111]],[[8339,8339],\"mapped\",[120]],[[8340,8340],\"mapped\",[601]],[[8341,8341],\"mapped\",[104]],[[8342,8342],\"mapped\",[107]],[[8343,8343],\"mapped\",[108]],[[8344,8344],\"mapped\",[109]],[[8345,8345],\"mapped\",[110]],[[8346,8346],\"mapped\",[112]],[[8347,8347],\"mapped\",[115]],[[8348,8348],\"mapped\",[116]],[[8349,8351],\"disallowed\"],[[8352,8359],\"valid\",[],\"NV8\"],[[8360,8360],\"mapped\",[114,115]],[[8361,8362],\"valid\",[],\"NV8\"],[[8363,8363],\"valid\",[],\"NV8\"],[[8364,8364],\"valid\",[],\"NV8\"],[[8365,8367],\"valid\",[],\"NV8\"],[[8368,8369],\"valid\",[],\"NV8\"],[[8370,8373],\"valid\",[],\"NV8\"],[[8374,8376],\"valid\",[],\"NV8\"],[[8377,8377],\"valid\",[],\"NV8\"],[[8378,8378],\"valid\",[],\"NV8\"],[[8379,8381],\"valid\",[],\"NV8\"],[[8382,8382],\"valid\",[],\"NV8\"],[[8383,8399],\"disallowed\"],[[8400,8417],\"valid\",[],\"NV8\"],[[8418,8419],\"valid\",[],\"NV8\"],[[8420,8426],\"valid\",[],\"NV8\"],[[8427,8427],\"valid\",[],\"NV8\"],[[8428,8431],\"valid\",[],\"NV8\"],[[8432,8432],\"valid\",[],\"NV8\"],[[8433,8447],\"disallowed\"],[[8448,8448],\"disallowed_STD3_mapped\",[97,47,99]],[[8449,8449],\"disallowed_STD3_mapped\",[97,47,115]],[[8450,8450],\"mapped\",[99]],[[8451,8451],\"mapped\",[176,99]],[[8452,8452],\"valid\",[],\"NV8\"],[[8453,8453],\"disallowed_STD3_mapped\",[99,47,111]],[[8454,8454],\"disallowed_STD3_mapped\",[99,47,117]],[[8455,8455],\"mapped\",[603]],[[8456,8456],\"valid\",[],\"NV8\"],[[8457,8457],\"mapped\",[176,102]],[[8458,8458],\"mapped\",[103]],[[8459,8462],\"mapped\",[104]],[[8463,8463],\"mapped\",[295]],[[8464,8465],\"mapped\",[105]],[[8466,8467],\"mapped\",[108]],[[8468,8468],\"valid\",[],\"NV8\"],[[8469,8469],\"mapped\",[110]],[[8470,8470],\"mapped\",[110,111]],[[8471,8472],\"valid\",[],\"NV8\"],[[8473,8473],\"mapped\",[112]],[[8474,8474],\"mapped\",[113]],[[8475,8477],\"mapped\",[114]],[[8478,8479],\"valid\",[],\"NV8\"],[[8480,8480],\"mapped\",[115,109]],[[8481,8481],\"mapped\",[116,101,108]],[[8482,8482],\"mapped\",[116,109]],[[8483,8483],\"valid\",[],\"NV8\"],[[8484,8484],\"mapped\",[122]],[[8485,8485],\"valid\",[],\"NV8\"],[[8486,8486],\"mapped\",[969]],[[8487,8487],\"valid\",[],\"NV8\"],[[8488,8488],\"mapped\",[122]],[[8489,8489],\"valid\",[],\"NV8\"],[[8490,8490],\"mapped\",[107]],[[8491,8491],\"mapped\",[229]],[[8492,8492],\"mapped\",[98]],[[8493,8493],\"mapped\",[99]],[[8494,8494],\"valid\",[],\"NV8\"],[[8495,8496],\"mapped\",[101]],[[8497,8497],\"mapped\",[102]],[[8498,8498],\"disallowed\"],[[8499,8499],\"mapped\",[109]],[[8500,8500],\"mapped\",[111]],[[8501,8501],\"mapped\",[1488]],[[8502,8502],\"mapped\",[1489]],[[8503,8503],\"mapped\",[1490]],[[8504,8504],\"mapped\",[1491]],[[8505,8505],\"mapped\",[105]],[[8506,8506],\"valid\",[],\"NV8\"],[[8507,8507],\"mapped\",[102,97,120]],[[8508,8508],\"mapped\",[960]],[[8509,8510],\"mapped\",[947]],[[8511,8511],\"mapped\",[960]],[[8512,8512],\"mapped\",[8721]],[[8513,8516],\"valid\",[],\"NV8\"],[[8517,8518],\"mapped\",[100]],[[8519,8519],\"mapped\",[101]],[[8520,8520],\"mapped\",[105]],[[8521,8521],\"mapped\",[106]],[[8522,8523],\"valid\",[],\"NV8\"],[[8524,8524],\"valid\",[],\"NV8\"],[[8525,8525],\"valid\",[],\"NV8\"],[[8526,8526],\"valid\"],[[8527,8527],\"valid\",[],\"NV8\"],[[8528,8528],\"mapped\",[49,8260,55]],[[8529,8529],\"mapped\",[49,8260,57]],[[8530,8530],\"mapped\",[49,8260,49,48]],[[8531,8531],\"mapped\",[49,8260,51]],[[8532,8532],\"mapped\",[50,8260,51]],[[8533,8533],\"mapped\",[49,8260,53]],[[8534,8534],\"mapped\",[50,8260,53]],[[8535,8535],\"mapped\",[51,8260,53]],[[8536,8536],\"mapped\",[52,8260,53]],[[8537,8537],\"mapped\",[49,8260,54]],[[8538,8538],\"mapped\",[53,8260,54]],[[8539,8539],\"mapped\",[49,8260,56]],[[8540,8540],\"mapped\",[51,8260,56]],[[8541,8541],\"mapped\",[53,8260,56]],[[8542,8542],\"mapped\",[55,8260,56]],[[8543,8543],\"mapped\",[49,8260]],[[8544,8544],\"mapped\",[105]],[[8545,8545],\"mapped\",[105,105]],[[8546,8546],\"mapped\",[105,105,105]],[[8547,8547],\"mapped\",[105,118]],[[8548,8548],\"mapped\",[118]],[[8549,8549],\"mapped\",[118,105]],[[8550,8550],\"mapped\",[118,105,105]],[[8551,8551],\"mapped\",[118,105,105,105]],[[8552,8552],\"mapped\",[105,120]],[[8553,8553],\"mapped\",[120]],[[8554,8554],\"mapped\",[120,105]],[[8555,8555],\"mapped\",[120,105,105]],[[8556,8556],\"mapped\",[108]],[[8557,8557],\"mapped\",[99]],[[8558,8558],\"mapped\",[100]],[[8559,8559],\"mapped\",[109]],[[8560,8560],\"mapped\",[105]],[[8561,8561],\"mapped\",[105,105]],[[8562,8562],\"mapped\",[105,105,105]],[[8563,8563],\"mapped\",[105,118]],[[8564,8564],\"mapped\",[118]],[[8565,8565],\"mapped\",[118,105]],[[8566,8566],\"mapped\",[118,105,105]],[[8567,8567],\"mapped\",[118,105,105,105]],[[8568,8568],\"mapped\",[105,120]],[[8569,8569],\"mapped\",[120]],[[8570,8570],\"mapped\",[120,105]],[[8571,8571],\"mapped\",[120,105,105]],[[8572,8572],\"mapped\",[108]],[[8573,8573],\"mapped\",[99]],[[8574,8574],\"mapped\",[100]],[[8575,8575],\"mapped\",[109]],[[8576,8578],\"valid\",[],\"NV8\"],[[8579,8579],\"disallowed\"],[[8580,8580],\"valid\"],[[8581,8584],\"valid\",[],\"NV8\"],[[8585,8585],\"mapped\",[48,8260,51]],[[8586,8587],\"valid\",[],\"NV8\"],[[8588,8591],\"disallowed\"],[[8592,8682],\"valid\",[],\"NV8\"],[[8683,8691],\"valid\",[],\"NV8\"],[[8692,8703],\"valid\",[],\"NV8\"],[[8704,8747],\"valid\",[],\"NV8\"],[[8748,8748],\"mapped\",[8747,8747]],[[8749,8749],\"mapped\",[8747,8747,8747]],[[8750,8750],\"valid\",[],\"NV8\"],[[8751,8751],\"mapped\",[8750,8750]],[[8752,8752],\"mapped\",[8750,8750,8750]],[[8753,8799],\"valid\",[],\"NV8\"],[[8800,8800],\"disallowed_STD3_valid\"],[[8801,8813],\"valid\",[],\"NV8\"],[[8814,8815],\"disallowed_STD3_valid\"],[[8816,8945],\"valid\",[],\"NV8\"],[[8946,8959],\"valid\",[],\"NV8\"],[[8960,8960],\"valid\",[],\"NV8\"],[[8961,8961],\"valid\",[],\"NV8\"],[[8962,9000],\"valid\",[],\"NV8\"],[[9001,9001],\"mapped\",[12296]],[[9002,9002],\"mapped\",[12297]],[[9003,9082],\"valid\",[],\"NV8\"],[[9083,9083],\"valid\",[],\"NV8\"],[[9084,9084],\"valid\",[],\"NV8\"],[[9085,9114],\"valid\",[],\"NV8\"],[[9115,9166],\"valid\",[],\"NV8\"],[[9167,9168],\"valid\",[],\"NV8\"],[[9169,9179],\"valid\",[],\"NV8\"],[[9180,9191],\"valid\",[],\"NV8\"],[[9192,9192],\"valid\",[],\"NV8\"],[[9193,9203],\"valid\",[],\"NV8\"],[[9204,9210],\"valid\",[],\"NV8\"],[[9211,9215],\"disallowed\"],[[9216,9252],\"valid\",[],\"NV8\"],[[9253,9254],\"valid\",[],\"NV8\"],[[9255,9279],\"disallowed\"],[[9280,9290],\"valid\",[],\"NV8\"],[[9291,9311],\"disallowed\"],[[9312,9312],\"mapped\",[49]],[[9313,9313],\"mapped\",[50]],[[9314,9314],\"mapped\",[51]],[[9315,9315],\"mapped\",[52]],[[9316,9316],\"mapped\",[53]],[[9317,9317],\"mapped\",[54]],[[9318,9318],\"mapped\",[55]],[[9319,9319],\"mapped\",[56]],[[9320,9320],\"mapped\",[57]],[[9321,9321],\"mapped\",[49,48]],[[9322,9322],\"mapped\",[49,49]],[[9323,9323],\"mapped\",[49,50]],[[9324,9324],\"mapped\",[49,51]],[[9325,9325],\"mapped\",[49,52]],[[9326,9326],\"mapped\",[49,53]],[[9327,9327],\"mapped\",[49,54]],[[9328,9328],\"mapped\",[49,55]],[[9329,9329],\"mapped\",[49,56]],[[9330,9330],\"mapped\",[49,57]],[[9331,9331],\"mapped\",[50,48]],[[9332,9332],\"disallowed_STD3_mapped\",[40,49,41]],[[9333,9333],\"disallowed_STD3_mapped\",[40,50,41]],[[9334,9334],\"disallowed_STD3_mapped\",[40,51,41]],[[9335,9335],\"disallowed_STD3_mapped\",[40,52,41]],[[9336,9336],\"disallowed_STD3_mapped\",[40,53,41]],[[9337,9337],\"disallowed_STD3_mapped\",[40,54,41]],[[9338,9338],\"disallowed_STD3_mapped\",[40,55,41]],[[9339,9339],\"disallowed_STD3_mapped\",[40,56,41]],[[9340,9340],\"disallowed_STD3_mapped\",[40,57,41]],[[9341,9341],\"disallowed_STD3_mapped\",[40,49,48,41]],[[9342,9342],\"disallowed_STD3_mapped\",[40,49,49,41]],[[9343,9343],\"disallowed_STD3_mapped\",[40,49,50,41]],[[9344,9344],\"disallowed_STD3_mapped\",[40,49,51,41]],[[9345,9345],\"disallowed_STD3_mapped\",[40,49,52,41]],[[9346,9346],\"disallowed_STD3_mapped\",[40,49,53,41]],[[9347,9347],\"disallowed_STD3_mapped\",[40,49,54,41]],[[9348,9348],\"disallowed_STD3_mapped\",[40,49,55,41]],[[9349,9349],\"disallowed_STD3_mapped\",[40,49,56,41]],[[9350,9350],\"disallowed_STD3_mapped\",[40,49,57,41]],[[9351,9351],\"disallowed_STD3_mapped\",[40,50,48,41]],[[9352,9371],\"disallowed\"],[[9372,9372],\"disallowed_STD3_mapped\",[40,97,41]],[[9373,9373],\"disallowed_STD3_mapped\",[40,98,41]],[[9374,9374],\"disallowed_STD3_mapped\",[40,99,41]],[[9375,9375],\"disallowed_STD3_mapped\",[40,100,41]],[[9376,9376],\"disallowed_STD3_mapped\",[40,101,41]],[[9377,9377],\"disallowed_STD3_mapped\",[40,102,41]],[[9378,9378],\"disallowed_STD3_mapped\",[40,103,41]],[[9379,9379],\"disallowed_STD3_mapped\",[40,104,41]],[[9380,9380],\"disallowed_STD3_mapped\",[40,105,41]],[[9381,9381],\"disallowed_STD3_mapped\",[40,106,41]],[[9382,9382],\"disallowed_STD3_mapped\",[40,107,41]],[[9383,9383],\"disallowed_STD3_mapped\",[40,108,41]],[[9384,9384],\"disallowed_STD3_mapped\",[40,109,41]],[[9385,9385],\"disallowed_STD3_mapped\",[40,110,41]],[[9386,9386],\"disallowed_STD3_mapped\",[40,111,41]],[[9387,9387],\"disallowed_STD3_mapped\",[40,112,41]],[[9388,9388],\"disallowed_STD3_mapped\",[40,113,41]],[[9389,9389],\"disallowed_STD3_mapped\",[40,114,41]],[[9390,9390],\"disallowed_STD3_mapped\",[40,115,41]],[[9391,9391],\"disallowed_STD3_mapped\",[40,116,41]],[[9392,9392],\"disallowed_STD3_mapped\",[40,117,41]],[[9393,9393],\"disallowed_STD3_mapped\",[40,118,41]],[[9394,9394],\"disallowed_STD3_mapped\",[40,119,41]],[[9395,9395],\"disallowed_STD3_mapped\",[40,120,41]],[[9396,9396],\"disallowed_STD3_mapped\",[40,121,41]],[[9397,9397],\"disallowed_STD3_mapped\",[40,122,41]],[[9398,9398],\"mapped\",[97]],[[9399,9399],\"mapped\",[98]],[[9400,9400],\"mapped\",[99]],[[9401,9401],\"mapped\",[100]],[[9402,9402],\"mapped\",[101]],[[9403,9403],\"mapped\",[102]],[[9404,9404],\"mapped\",[103]],[[9405,9405],\"mapped\",[104]],[[9406,9406],\"mapped\",[105]],[[9407,9407],\"mapped\",[106]],[[9408,9408],\"mapped\",[107]],[[9409,9409],\"mapped\",[108]],[[9410,9410],\"mapped\",[109]],[[9411,9411],\"mapped\",[110]],[[9412,9412],\"mapped\",[111]],[[9413,9413],\"mapped\",[112]],[[9414,9414],\"mapped\",[113]],[[9415,9415],\"mapped\",[114]],[[9416,9416],\"mapped\",[115]],[[9417,9417],\"mapped\",[116]],[[9418,9418],\"mapped\",[117]],[[9419,9419],\"mapped\",[118]],[[9420,9420],\"mapped\",[119]],[[9421,9421],\"mapped\",[120]],[[9422,9422],\"mapped\",[121]],[[9423,9423],\"mapped\",[122]],[[9424,9424],\"mapped\",[97]],[[9425,9425],\"mapped\",[98]],[[9426,9426],\"mapped\",[99]],[[9427,9427],\"mapped\",[100]],[[9428,9428],\"mapped\",[101]],[[9429,9429],\"mapped\",[102]],[[9430,9430],\"mapped\",[103]],[[9431,9431],\"mapped\",[104]],[[9432,9432],\"mapped\",[105]],[[9433,9433],\"mapped\",[106]],[[9434,9434],\"mapped\",[107]],[[9435,9435],\"mapped\",[108]],[[9436,9436],\"mapped\",[109]],[[9437,9437],\"mapped\",[110]],[[9438,9438],\"mapped\",[111]],[[9439,9439],\"mapped\",[112]],[[9440,9440],\"mapped\",[113]],[[9441,9441],\"mapped\",[114]],[[9442,9442],\"mapped\",[115]],[[9443,9443],\"mapped\",[116]],[[9444,9444],\"mapped\",[117]],[[9445,9445],\"mapped\",[118]],[[9446,9446],\"mapped\",[119]],[[9447,9447],\"mapped\",[120]],[[9448,9448],\"mapped\",[121]],[[9449,9449],\"mapped\",[122]],[[9450,9450],\"mapped\",[48]],[[9451,9470],\"valid\",[],\"NV8\"],[[9471,9471],\"valid\",[],\"NV8\"],[[9472,9621],\"valid\",[],\"NV8\"],[[9622,9631],\"valid\",[],\"NV8\"],[[9632,9711],\"valid\",[],\"NV8\"],[[9712,9719],\"valid\",[],\"NV8\"],[[9720,9727],\"valid\",[],\"NV8\"],[[9728,9747],\"valid\",[],\"NV8\"],[[9748,9749],\"valid\",[],\"NV8\"],[[9750,9751],\"valid\",[],\"NV8\"],[[9752,9752],\"valid\",[],\"NV8\"],[[9753,9753],\"valid\",[],\"NV8\"],[[9754,9839],\"valid\",[],\"NV8\"],[[9840,9841],\"valid\",[],\"NV8\"],[[9842,9853],\"valid\",[],\"NV8\"],[[9854,9855],\"valid\",[],\"NV8\"],[[9856,9865],\"valid\",[],\"NV8\"],[[9866,9873],\"valid\",[],\"NV8\"],[[9874,9884],\"valid\",[],\"NV8\"],[[9885,9885],\"valid\",[],\"NV8\"],[[9886,9887],\"valid\",[],\"NV8\"],[[9888,9889],\"valid\",[],\"NV8\"],[[9890,9905],\"valid\",[],\"NV8\"],[[9906,9906],\"valid\",[],\"NV8\"],[[9907,9916],\"valid\",[],\"NV8\"],[[9917,9919],\"valid\",[],\"NV8\"],[[9920,9923],\"valid\",[],\"NV8\"],[[9924,9933],\"valid\",[],\"NV8\"],[[9934,9934],\"valid\",[],\"NV8\"],[[9935,9953],\"valid\",[],\"NV8\"],[[9954,9954],\"valid\",[],\"NV8\"],[[9955,9955],\"valid\",[],\"NV8\"],[[9956,9959],\"valid\",[],\"NV8\"],[[9960,9983],\"valid\",[],\"NV8\"],[[9984,9984],\"valid\",[],\"NV8\"],[[9985,9988],\"valid\",[],\"NV8\"],[[9989,9989],\"valid\",[],\"NV8\"],[[9990,9993],\"valid\",[],\"NV8\"],[[9994,9995],\"valid\",[],\"NV8\"],[[9996,10023],\"valid\",[],\"NV8\"],[[10024,10024],\"valid\",[],\"NV8\"],[[10025,10059],\"valid\",[],\"NV8\"],[[10060,10060],\"valid\",[],\"NV8\"],[[10061,10061],\"valid\",[],\"NV8\"],[[10062,10062],\"valid\",[],\"NV8\"],[[10063,10066],\"valid\",[],\"NV8\"],[[10067,10069],\"valid\",[],\"NV8\"],[[10070,10070],\"valid\",[],\"NV8\"],[[10071,10071],\"valid\",[],\"NV8\"],[[10072,10078],\"valid\",[],\"NV8\"],[[10079,10080],\"valid\",[],\"NV8\"],[[10081,10087],\"valid\",[],\"NV8\"],[[10088,10101],\"valid\",[],\"NV8\"],[[10102,10132],\"valid\",[],\"NV8\"],[[10133,10135],\"valid\",[],\"NV8\"],[[10136,10159],\"valid\",[],\"NV8\"],[[10160,10160],\"valid\",[],\"NV8\"],[[10161,10174],\"valid\",[],\"NV8\"],[[10175,10175],\"valid\",[],\"NV8\"],[[10176,10182],\"valid\",[],\"NV8\"],[[10183,10186],\"valid\",[],\"NV8\"],[[10187,10187],\"valid\",[],\"NV8\"],[[10188,10188],\"valid\",[],\"NV8\"],[[10189,10189],\"valid\",[],\"NV8\"],[[10190,10191],\"valid\",[],\"NV8\"],[[10192,10219],\"valid\",[],\"NV8\"],[[10220,10223],\"valid\",[],\"NV8\"],[[10224,10239],\"valid\",[],\"NV8\"],[[10240,10495],\"valid\",[],\"NV8\"],[[10496,10763],\"valid\",[],\"NV8\"],[[10764,10764],\"mapped\",[8747,8747,8747,8747]],[[10765,10867],\"valid\",[],\"NV8\"],[[10868,10868],\"disallowed_STD3_mapped\",[58,58,61]],[[10869,10869],\"disallowed_STD3_mapped\",[61,61]],[[10870,10870],\"disallowed_STD3_mapped\",[61,61,61]],[[10871,10971],\"valid\",[],\"NV8\"],[[10972,10972],\"mapped\",[10973,824]],[[10973,11007],\"valid\",[],\"NV8\"],[[11008,11021],\"valid\",[],\"NV8\"],[[11022,11027],\"valid\",[],\"NV8\"],[[11028,11034],\"valid\",[],\"NV8\"],[[11035,11039],\"valid\",[],\"NV8\"],[[11040,11043],\"valid\",[],\"NV8\"],[[11044,11084],\"valid\",[],\"NV8\"],[[11085,11087],\"valid\",[],\"NV8\"],[[11088,11092],\"valid\",[],\"NV8\"],[[11093,11097],\"valid\",[],\"NV8\"],[[11098,11123],\"valid\",[],\"NV8\"],[[11124,11125],\"disallowed\"],[[11126,11157],\"valid\",[],\"NV8\"],[[11158,11159],\"disallowed\"],[[11160,11193],\"valid\",[],\"NV8\"],[[11194,11196],\"disallowed\"],[[11197,11208],\"valid\",[],\"NV8\"],[[11209,11209],\"disallowed\"],[[11210,11217],\"valid\",[],\"NV8\"],[[11218,11243],\"disallowed\"],[[11244,11247],\"valid\",[],\"NV8\"],[[11248,11263],\"disallowed\"],[[11264,11264],\"mapped\",[11312]],[[11265,11265],\"mapped\",[11313]],[[11266,11266],\"mapped\",[11314]],[[11267,11267],\"mapped\",[11315]],[[11268,11268],\"mapped\",[11316]],[[11269,11269],\"mapped\",[11317]],[[11270,11270],\"mapped\",[11318]],[[11271,11271],\"mapped\",[11319]],[[11272,11272],\"mapped\",[11320]],[[11273,11273],\"mapped\",[11321]],[[11274,11274],\"mapped\",[11322]],[[11275,11275],\"mapped\",[11323]],[[11276,11276],\"mapped\",[11324]],[[11277,11277],\"mapped\",[11325]],[[11278,11278],\"mapped\",[11326]],[[11279,11279],\"mapped\",[11327]],[[11280,11280],\"mapped\",[11328]],[[11281,11281],\"mapped\",[11329]],[[11282,11282],\"mapped\",[11330]],[[11283,11283],\"mapped\",[11331]],[[11284,11284],\"mapped\",[11332]],[[11285,11285],\"mapped\",[11333]],[[11286,11286],\"mapped\",[11334]],[[11287,11287],\"mapped\",[11335]],[[11288,11288],\"mapped\",[11336]],[[11289,11289],\"mapped\",[11337]],[[11290,11290],\"mapped\",[11338]],[[11291,11291],\"mapped\",[11339]],[[11292,11292],\"mapped\",[11340]],[[11293,11293],\"mapped\",[11341]],[[11294,11294],\"mapped\",[11342]],[[11295,11295],\"mapped\",[11343]],[[11296,11296],\"mapped\",[11344]],[[11297,11297],\"mapped\",[11345]],[[11298,11298],\"mapped\",[11346]],[[11299,11299],\"mapped\",[11347]],[[11300,11300],\"mapped\",[11348]],[[11301,11301],\"mapped\",[11349]],[[11302,11302],\"mapped\",[11350]],[[11303,11303],\"mapped\",[11351]],[[11304,11304],\"mapped\",[11352]],[[11305,11305],\"mapped\",[11353]],[[11306,11306],\"mapped\",[11354]],[[11307,11307],\"mapped\",[11355]],[[11308,11308],\"mapped\",[11356]],[[11309,11309],\"mapped\",[11357]],[[11310,11310],\"mapped\",[11358]],[[11311,11311],\"disallowed\"],[[11312,11358],\"valid\"],[[11359,11359],\"disallowed\"],[[11360,11360],\"mapped\",[11361]],[[11361,11361],\"valid\"],[[11362,11362],\"mapped\",[619]],[[11363,11363],\"mapped\",[7549]],[[11364,11364],\"mapped\",[637]],[[11365,11366],\"valid\"],[[11367,11367],\"mapped\",[11368]],[[11368,11368],\"valid\"],[[11369,11369],\"mapped\",[11370]],[[11370,11370],\"valid\"],[[11371,11371],\"mapped\",[11372]],[[11372,11372],\"valid\"],[[11373,11373],\"mapped\",[593]],[[11374,11374],\"mapped\",[625]],[[11375,11375],\"mapped\",[592]],[[11376,11376],\"mapped\",[594]],[[11377,11377],\"valid\"],[[11378,11378],\"mapped\",[11379]],[[11379,11379],\"valid\"],[[11380,11380],\"valid\"],[[11381,11381],\"mapped\",[11382]],[[11382,11383],\"valid\"],[[11384,11387],\"valid\"],[[11388,11388],\"mapped\",[106]],[[11389,11389],\"mapped\",[118]],[[11390,11390],\"mapped\",[575]],[[11391,11391],\"mapped\",[576]],[[11392,11392],\"mapped\",[11393]],[[11393,11393],\"valid\"],[[11394,11394],\"mapped\",[11395]],[[11395,11395],\"valid\"],[[11396,11396],\"mapped\",[11397]],[[11397,11397],\"valid\"],[[11398,11398],\"mapped\",[11399]],[[11399,11399],\"valid\"],[[11400,11400],\"mapped\",[11401]],[[11401,11401],\"valid\"],[[11402,11402],\"mapped\",[11403]],[[11403,11403],\"valid\"],[[11404,11404],\"mapped\",[11405]],[[11405,11405],\"valid\"],[[11406,11406],\"mapped\",[11407]],[[11407,11407],\"valid\"],[[11408,11408],\"mapped\",[11409]],[[11409,11409],\"valid\"],[[11410,11410],\"mapped\",[11411]],[[11411,11411],\"valid\"],[[11412,11412],\"mapped\",[11413]],[[11413,11413],\"valid\"],[[11414,11414],\"mapped\",[11415]],[[11415,11415],\"valid\"],[[11416,11416],\"mapped\",[11417]],[[11417,11417],\"valid\"],[[11418,11418],\"mapped\",[11419]],[[11419,11419],\"valid\"],[[11420,11420],\"mapped\",[11421]],[[11421,11421],\"valid\"],[[11422,11422],\"mapped\",[11423]],[[11423,11423],\"valid\"],[[11424,11424],\"mapped\",[11425]],[[11425,11425],\"valid\"],[[11426,11426],\"mapped\",[11427]],[[11427,11427],\"valid\"],[[11428,11428],\"mapped\",[11429]],[[11429,11429],\"valid\"],[[11430,11430],\"mapped\",[11431]],[[11431,11431],\"valid\"],[[11432,11432],\"mapped\",[11433]],[[11433,11433],\"valid\"],[[11434,11434],\"mapped\",[11435]],[[11435,11435],\"valid\"],[[11436,11436],\"mapped\",[11437]],[[11437,11437],\"valid\"],[[11438,11438],\"mapped\",[11439]],[[11439,11439],\"valid\"],[[11440,11440],\"mapped\",[11441]],[[11441,11441],\"valid\"],[[11442,11442],\"mapped\",[11443]],[[11443,11443],\"valid\"],[[11444,11444],\"mapped\",[11445]],[[11445,11445],\"valid\"],[[11446,11446],\"mapped\",[11447]],[[11447,11447],\"valid\"],[[11448,11448],\"mapped\",[11449]],[[11449,11449],\"valid\"],[[11450,11450],\"mapped\",[11451]],[[11451,11451],\"valid\"],[[11452,11452],\"mapped\",[11453]],[[11453,11453],\"valid\"],[[11454,11454],\"mapped\",[11455]],[[11455,11455],\"valid\"],[[11456,11456],\"mapped\",[11457]],[[11457,11457],\"valid\"],[[11458,11458],\"mapped\",[11459]],[[11459,11459],\"valid\"],[[11460,11460],\"mapped\",[11461]],[[11461,11461],\"valid\"],[[11462,11462],\"mapped\",[11463]],[[11463,11463],\"valid\"],[[11464,11464],\"mapped\",[11465]],[[11465,11465],\"valid\"],[[11466,11466],\"mapped\",[11467]],[[11467,11467],\"valid\"],[[11468,11468],\"mapped\",[11469]],[[11469,11469],\"valid\"],[[11470,11470],\"mapped\",[11471]],[[11471,11471],\"valid\"],[[11472,11472],\"mapped\",[11473]],[[11473,11473],\"valid\"],[[11474,11474],\"mapped\",[11475]],[[11475,11475],\"valid\"],[[11476,11476],\"mapped\",[11477]],[[11477,11477],\"valid\"],[[11478,11478],\"mapped\",[11479]],[[11479,11479],\"valid\"],[[11480,11480],\"mapped\",[11481]],[[11481,11481],\"valid\"],[[11482,11482],\"mapped\",[11483]],[[11483,11483],\"valid\"],[[11484,11484],\"mapped\",[11485]],[[11485,11485],\"valid\"],[[11486,11486],\"mapped\",[11487]],[[11487,11487],\"valid\"],[[11488,11488],\"mapped\",[11489]],[[11489,11489],\"valid\"],[[11490,11490],\"mapped\",[11491]],[[11491,11492],\"valid\"],[[11493,11498],\"valid\",[],\"NV8\"],[[11499,11499],\"mapped\",[11500]],[[11500,11500],\"valid\"],[[11501,11501],\"mapped\",[11502]],[[11502,11505],\"valid\"],[[11506,11506],\"mapped\",[11507]],[[11507,11507],\"valid\"],[[11508,11512],\"disallowed\"],[[11513,11519],\"valid\",[],\"NV8\"],[[11520,11557],\"valid\"],[[11558,11558],\"disallowed\"],[[11559,11559],\"valid\"],[[11560,11564],\"disallowed\"],[[11565,11565],\"valid\"],[[11566,11567],\"disallowed\"],[[11568,11621],\"valid\"],[[11622,11623],\"valid\"],[[11624,11630],\"disallowed\"],[[11631,11631],\"mapped\",[11617]],[[11632,11632],\"valid\",[],\"NV8\"],[[11633,11646],\"disallowed\"],[[11647,11647],\"valid\"],[[11648,11670],\"valid\"],[[11671,11679],\"disallowed\"],[[11680,11686],\"valid\"],[[11687,11687],\"disallowed\"],[[11688,11694],\"valid\"],[[11695,11695],\"disallowed\"],[[11696,11702],\"valid\"],[[11703,11703],\"disallowed\"],[[11704,11710],\"valid\"],[[11711,11711],\"disallowed\"],[[11712,11718],\"valid\"],[[11719,11719],\"disallowed\"],[[11720,11726],\"valid\"],[[11727,11727],\"disallowed\"],[[11728,11734],\"valid\"],[[11735,11735],\"disallowed\"],[[11736,11742],\"valid\"],[[11743,11743],\"disallowed\"],[[11744,11775],\"valid\"],[[11776,11799],\"valid\",[],\"NV8\"],[[11800,11803],\"valid\",[],\"NV8\"],[[11804,11805],\"valid\",[],\"NV8\"],[[11806,11822],\"valid\",[],\"NV8\"],[[11823,11823],\"valid\"],[[11824,11824],\"valid\",[],\"NV8\"],[[11825,11825],\"valid\",[],\"NV8\"],[[11826,11835],\"valid\",[],\"NV8\"],[[11836,11842],\"valid\",[],\"NV8\"],[[11843,11903],\"disallowed\"],[[11904,11929],\"valid\",[],\"NV8\"],[[11930,11930],\"disallowed\"],[[11931,11934],\"valid\",[],\"NV8\"],[[11935,11935],\"mapped\",[27597]],[[11936,12018],\"valid\",[],\"NV8\"],[[12019,12019],\"mapped\",[40863]],[[12020,12031],\"disallowed\"],[[12032,12032],\"mapped\",[19968]],[[12033,12033],\"mapped\",[20008]],[[12034,12034],\"mapped\",[20022]],[[12035,12035],\"mapped\",[20031]],[[12036,12036],\"mapped\",[20057]],[[12037,12037],\"mapped\",[20101]],[[12038,12038],\"mapped\",[20108]],[[12039,12039],\"mapped\",[20128]],[[12040,12040],\"mapped\",[20154]],[[12041,12041],\"mapped\",[20799]],[[12042,12042],\"mapped\",[20837]],[[12043,12043],\"mapped\",[20843]],[[12044,12044],\"mapped\",[20866]],[[12045,12045],\"mapped\",[20886]],[[12046,12046],\"mapped\",[20907]],[[12047,12047],\"mapped\",[20960]],[[12048,12048],\"mapped\",[20981]],[[12049,12049],\"mapped\",[20992]],[[12050,12050],\"mapped\",[21147]],[[12051,12051],\"mapped\",[21241]],[[12052,12052],\"mapped\",[21269]],[[12053,12053],\"mapped\",[21274]],[[12054,12054],\"mapped\",[21304]],[[12055,12055],\"mapped\",[21313]],[[12056,12056],\"mapped\",[21340]],[[12057,12057],\"mapped\",[21353]],[[12058,12058],\"mapped\",[21378]],[[12059,12059],\"mapped\",[21430]],[[12060,12060],\"mapped\",[21448]],[[12061,12061],\"mapped\",[21475]],[[12062,12062],\"mapped\",[22231]],[[12063,12063],\"mapped\",[22303]],[[12064,12064],\"mapped\",[22763]],[[12065,12065],\"mapped\",[22786]],[[12066,12066],\"mapped\",[22794]],[[12067,12067],\"mapped\",[22805]],[[12068,12068],\"mapped\",[22823]],[[12069,12069],\"mapped\",[22899]],[[12070,12070],\"mapped\",[23376]],[[12071,12071],\"mapped\",[23424]],[[12072,12072],\"mapped\",[23544]],[[12073,12073],\"mapped\",[23567]],[[12074,12074],\"mapped\",[23586]],[[12075,12075],\"mapped\",[23608]],[[12076,12076],\"mapped\",[23662]],[[12077,12077],\"mapped\",[23665]],[[12078,12078],\"mapped\",[24027]],[[12079,12079],\"mapped\",[24037]],[[12080,12080],\"mapped\",[24049]],[[12081,12081],\"mapped\",[24062]],[[12082,12082],\"mapped\",[24178]],[[12083,12083],\"mapped\",[24186]],[[12084,12084],\"mapped\",[24191]],[[12085,12085],\"mapped\",[24308]],[[12086,12086],\"mapped\",[24318]],[[12087,12087],\"mapped\",[24331]],[[12088,12088],\"mapped\",[24339]],[[12089,12089],\"mapped\",[24400]],[[12090,12090],\"mapped\",[24417]],[[12091,12091],\"mapped\",[24435]],[[12092,12092],\"mapped\",[24515]],[[12093,12093],\"mapped\",[25096]],[[12094,12094],\"mapped\",[25142]],[[12095,12095],\"mapped\",[25163]],[[12096,12096],\"mapped\",[25903]],[[12097,12097],\"mapped\",[25908]],[[12098,12098],\"mapped\",[25991]],[[12099,12099],\"mapped\",[26007]],[[12100,12100],\"mapped\",[26020]],[[12101,12101],\"mapped\",[26041]],[[12102,12102],\"mapped\",[26080]],[[12103,12103],\"mapped\",[26085]],[[12104,12104],\"mapped\",[26352]],[[12105,12105],\"mapped\",[26376]],[[12106,12106],\"mapped\",[26408]],[[12107,12107],\"mapped\",[27424]],[[12108,12108],\"mapped\",[27490]],[[12109,12109],\"mapped\",[27513]],[[12110,12110],\"mapped\",[27571]],[[12111,12111],\"mapped\",[27595]],[[12112,12112],\"mapped\",[27604]],[[12113,12113],\"mapped\",[27611]],[[12114,12114],\"mapped\",[27663]],[[12115,12115],\"mapped\",[27668]],[[12116,12116],\"mapped\",[27700]],[[12117,12117],\"mapped\",[28779]],[[12118,12118],\"mapped\",[29226]],[[12119,12119],\"mapped\",[29238]],[[12120,12120],\"mapped\",[29243]],[[12121,12121],\"mapped\",[29247]],[[12122,12122],\"mapped\",[29255]],[[12123,12123],\"mapped\",[29273]],[[12124,12124],\"mapped\",[29275]],[[12125,12125],\"mapped\",[29356]],[[12126,12126],\"mapped\",[29572]],[[12127,12127],\"mapped\",[29577]],[[12128,12128],\"mapped\",[29916]],[[12129,12129],\"mapped\",[29926]],[[12130,12130],\"mapped\",[29976]],[[12131,12131],\"mapped\",[29983]],[[12132,12132],\"mapped\",[29992]],[[12133,12133],\"mapped\",[30000]],[[12134,12134],\"mapped\",[30091]],[[12135,12135],\"mapped\",[30098]],[[12136,12136],\"mapped\",[30326]],[[12137,12137],\"mapped\",[30333]],[[12138,12138],\"mapped\",[30382]],[[12139,12139],\"mapped\",[30399]],[[12140,12140],\"mapped\",[30446]],[[12141,12141],\"mapped\",[30683]],[[12142,12142],\"mapped\",[30690]],[[12143,12143],\"mapped\",[30707]],[[12144,12144],\"mapped\",[31034]],[[12145,12145],\"mapped\",[31160]],[[12146,12146],\"mapped\",[31166]],[[12147,12147],\"mapped\",[31348]],[[12148,12148],\"mapped\",[31435]],[[12149,12149],\"mapped\",[31481]],[[12150,12150],\"mapped\",[31859]],[[12151,12151],\"mapped\",[31992]],[[12152,12152],\"mapped\",[32566]],[[12153,12153],\"mapped\",[32593]],[[12154,12154],\"mapped\",[32650]],[[12155,12155],\"mapped\",[32701]],[[12156,12156],\"mapped\",[32769]],[[12157,12157],\"mapped\",[32780]],[[12158,12158],\"mapped\",[32786]],[[12159,12159],\"mapped\",[32819]],[[12160,12160],\"mapped\",[32895]],[[12161,12161],\"mapped\",[32905]],[[12162,12162],\"mapped\",[33251]],[[12163,12163],\"mapped\",[33258]],[[12164,12164],\"mapped\",[33267]],[[12165,12165],\"mapped\",[33276]],[[12166,12166],\"mapped\",[33292]],[[12167,12167],\"mapped\",[33307]],[[12168,12168],\"mapped\",[33311]],[[12169,12169],\"mapped\",[33390]],[[12170,12170],\"mapped\",[33394]],[[12171,12171],\"mapped\",[33400]],[[12172,12172],\"mapped\",[34381]],[[12173,12173],\"mapped\",[34411]],[[12174,12174],\"mapped\",[34880]],[[12175,12175],\"mapped\",[34892]],[[12176,12176],\"mapped\",[34915]],[[12177,12177],\"mapped\",[35198]],[[12178,12178],\"mapped\",[35211]],[[12179,12179],\"mapped\",[35282]],[[12180,12180],\"mapped\",[35328]],[[12181,12181],\"mapped\",[35895]],[[12182,12182],\"mapped\",[35910]],[[12183,12183],\"mapped\",[35925]],[[12184,12184],\"mapped\",[35960]],[[12185,12185],\"mapped\",[35997]],[[12186,12186],\"mapped\",[36196]],[[12187,12187],\"mapped\",[36208]],[[12188,12188],\"mapped\",[36275]],[[12189,12189],\"mapped\",[36523]],[[12190,12190],\"mapped\",[36554]],[[12191,12191],\"mapped\",[36763]],[[12192,12192],\"mapped\",[36784]],[[12193,12193],\"mapped\",[36789]],[[12194,12194],\"mapped\",[37009]],[[12195,12195],\"mapped\",[37193]],[[12196,12196],\"mapped\",[37318]],[[12197,12197],\"mapped\",[37324]],[[12198,12198],\"mapped\",[37329]],[[12199,12199],\"mapped\",[38263]],[[12200,12200],\"mapped\",[38272]],[[12201,12201],\"mapped\",[38428]],[[12202,12202],\"mapped\",[38582]],[[12203,12203],\"mapped\",[38585]],[[12204,12204],\"mapped\",[38632]],[[12205,12205],\"mapped\",[38737]],[[12206,12206],\"mapped\",[38750]],[[12207,12207],\"mapped\",[38754]],[[12208,12208],\"mapped\",[38761]],[[12209,12209],\"mapped\",[38859]],[[12210,12210],\"mapped\",[38893]],[[12211,12211],\"mapped\",[38899]],[[12212,12212],\"mapped\",[38913]],[[12213,12213],\"mapped\",[39080]],[[12214,12214],\"mapped\",[39131]],[[12215,12215],\"mapped\",[39135]],[[12216,12216],\"mapped\",[39318]],[[12217,12217],\"mapped\",[39321]],[[12218,12218],\"mapped\",[39340]],[[12219,12219],\"mapped\",[39592]],[[12220,12220],\"mapped\",[39640]],[[12221,12221],\"mapped\",[39647]],[[12222,12222],\"mapped\",[39717]],[[12223,12223],\"mapped\",[39727]],[[12224,12224],\"mapped\",[39730]],[[12225,12225],\"mapped\",[39740]],[[12226,12226],\"mapped\",[39770]],[[12227,12227],\"mapped\",[40165]],[[12228,12228],\"mapped\",[40565]],[[12229,12229],\"mapped\",[40575]],[[12230,12230],\"mapped\",[40613]],[[12231,12231],\"mapped\",[40635]],[[12232,12232],\"mapped\",[40643]],[[12233,12233],\"mapped\",[40653]],[[12234,12234],\"mapped\",[40657]],[[12235,12235],\"mapped\",[40697]],[[12236,12236],\"mapped\",[40701]],[[12237,12237],\"mapped\",[40718]],[[12238,12238],\"mapped\",[40723]],[[12239,12239],\"mapped\",[40736]],[[12240,12240],\"mapped\",[40763]],[[12241,12241],\"mapped\",[40778]],[[12242,12242],\"mapped\",[40786]],[[12243,12243],\"mapped\",[40845]],[[12244,12244],\"mapped\",[40860]],[[12245,12245],\"mapped\",[40864]],[[12246,12271],\"disallowed\"],[[12272,12283],\"disallowed\"],[[12284,12287],\"disallowed\"],[[12288,12288],\"disallowed_STD3_mapped\",[32]],[[12289,12289],\"valid\",[],\"NV8\"],[[12290,12290],\"mapped\",[46]],[[12291,12292],\"valid\",[],\"NV8\"],[[12293,12295],\"valid\"],[[12296,12329],\"valid\",[],\"NV8\"],[[12330,12333],\"valid\"],[[12334,12341],\"valid\",[],\"NV8\"],[[12342,12342],\"mapped\",[12306]],[[12343,12343],\"valid\",[],\"NV8\"],[[12344,12344],\"mapped\",[21313]],[[12345,12345],\"mapped\",[21316]],[[12346,12346],\"mapped\",[21317]],[[12347,12347],\"valid\",[],\"NV8\"],[[12348,12348],\"valid\"],[[12349,12349],\"valid\",[],\"NV8\"],[[12350,12350],\"valid\",[],\"NV8\"],[[12351,12351],\"valid\",[],\"NV8\"],[[12352,12352],\"disallowed\"],[[12353,12436],\"valid\"],[[12437,12438],\"valid\"],[[12439,12440],\"disallowed\"],[[12441,12442],\"valid\"],[[12443,12443],\"disallowed_STD3_mapped\",[32,12441]],[[12444,12444],\"disallowed_STD3_mapped\",[32,12442]],[[12445,12446],\"valid\"],[[12447,12447],\"mapped\",[12424,12426]],[[12448,12448],\"valid\",[],\"NV8\"],[[12449,12542],\"valid\"],[[12543,12543],\"mapped\",[12467,12488]],[[12544,12548],\"disallowed\"],[[12549,12588],\"valid\"],[[12589,12589],\"valid\"],[[12590,12592],\"disallowed\"],[[12593,12593],\"mapped\",[4352]],[[12594,12594],\"mapped\",[4353]],[[12595,12595],\"mapped\",[4522]],[[12596,12596],\"mapped\",[4354]],[[12597,12597],\"mapped\",[4524]],[[12598,12598],\"mapped\",[4525]],[[12599,12599],\"mapped\",[4355]],[[12600,12600],\"mapped\",[4356]],[[12601,12601],\"mapped\",[4357]],[[12602,12602],\"mapped\",[4528]],[[12603,12603],\"mapped\",[4529]],[[12604,12604],\"mapped\",[4530]],[[12605,12605],\"mapped\",[4531]],[[12606,12606],\"mapped\",[4532]],[[12607,12607],\"mapped\",[4533]],[[12608,12608],\"mapped\",[4378]],[[12609,12609],\"mapped\",[4358]],[[12610,12610],\"mapped\",[4359]],[[12611,12611],\"mapped\",[4360]],[[12612,12612],\"mapped\",[4385]],[[12613,12613],\"mapped\",[4361]],[[12614,12614],\"mapped\",[4362]],[[12615,12615],\"mapped\",[4363]],[[12616,12616],\"mapped\",[4364]],[[12617,12617],\"mapped\",[4365]],[[12618,12618],\"mapped\",[4366]],[[12619,12619],\"mapped\",[4367]],[[12620,12620],\"mapped\",[4368]],[[12621,12621],\"mapped\",[4369]],[[12622,12622],\"mapped\",[4370]],[[12623,12623],\"mapped\",[4449]],[[12624,12624],\"mapped\",[4450]],[[12625,12625],\"mapped\",[4451]],[[12626,12626],\"mapped\",[4452]],[[12627,12627],\"mapped\",[4453]],[[12628,12628],\"mapped\",[4454]],[[12629,12629],\"mapped\",[4455]],[[12630,12630],\"mapped\",[4456]],[[12631,12631],\"mapped\",[4457]],[[12632,12632],\"mapped\",[4458]],[[12633,12633],\"mapped\",[4459]],[[12634,12634],\"mapped\",[4460]],[[12635,12635],\"mapped\",[4461]],[[12636,12636],\"mapped\",[4462]],[[12637,12637],\"mapped\",[4463]],[[12638,12638],\"mapped\",[4464]],[[12639,12639],\"mapped\",[4465]],[[12640,12640],\"mapped\",[4466]],[[12641,12641],\"mapped\",[4467]],[[12642,12642],\"mapped\",[4468]],[[12643,12643],\"mapped\",[4469]],[[12644,12644],\"disallowed\"],[[12645,12645],\"mapped\",[4372]],[[12646,12646],\"mapped\",[4373]],[[12647,12647],\"mapped\",[4551]],[[12648,12648],\"mapped\",[4552]],[[12649,12649],\"mapped\",[4556]],[[12650,12650],\"mapped\",[4558]],[[12651,12651],\"mapped\",[4563]],[[12652,12652],\"mapped\",[4567]],[[12653,12653],\"mapped\",[4569]],[[12654,12654],\"mapped\",[4380]],[[12655,12655],\"mapped\",[4573]],[[12656,12656],\"mapped\",[4575]],[[12657,12657],\"mapped\",[4381]],[[12658,12658],\"mapped\",[4382]],[[12659,12659],\"mapped\",[4384]],[[12660,12660],\"mapped\",[4386]],[[12661,12661],\"mapped\",[4387]],[[12662,12662],\"mapped\",[4391]],[[12663,12663],\"mapped\",[4393]],[[12664,12664],\"mapped\",[4395]],[[12665,12665],\"mapped\",[4396]],[[12666,12666],\"mapped\",[4397]],[[12667,12667],\"mapped\",[4398]],[[12668,12668],\"mapped\",[4399]],[[12669,12669],\"mapped\",[4402]],[[12670,12670],\"mapped\",[4406]],[[12671,12671],\"mapped\",[4416]],[[12672,12672],\"mapped\",[4423]],[[12673,12673],\"mapped\",[4428]],[[12674,12674],\"mapped\",[4593]],[[12675,12675],\"mapped\",[4594]],[[12676,12676],\"mapped\",[4439]],[[12677,12677],\"mapped\",[4440]],[[12678,12678],\"mapped\",[4441]],[[12679,12679],\"mapped\",[4484]],[[12680,12680],\"mapped\",[4485]],[[12681,12681],\"mapped\",[4488]],[[12682,12682],\"mapped\",[4497]],[[12683,12683],\"mapped\",[4498]],[[12684,12684],\"mapped\",[4500]],[[12685,12685],\"mapped\",[4510]],[[12686,12686],\"mapped\",[4513]],[[12687,12687],\"disallowed\"],[[12688,12689],\"valid\",[],\"NV8\"],[[12690,12690],\"mapped\",[19968]],[[12691,12691],\"mapped\",[20108]],[[12692,12692],\"mapped\",[19977]],[[12693,12693],\"mapped\",[22235]],[[12694,12694],\"mapped\",[19978]],[[12695,12695],\"mapped\",[20013]],[[12696,12696],\"mapped\",[19979]],[[12697,12697],\"mapped\",[30002]],[[12698,12698],\"mapped\",[20057]],[[12699,12699],\"mapped\",[19993]],[[12700,12700],\"mapped\",[19969]],[[12701,12701],\"mapped\",[22825]],[[12702,12702],\"mapped\",[22320]],[[12703,12703],\"mapped\",[20154]],[[12704,12727],\"valid\"],[[12728,12730],\"valid\"],[[12731,12735],\"disallowed\"],[[12736,12751],\"valid\",[],\"NV8\"],[[12752,12771],\"valid\",[],\"NV8\"],[[12772,12783],\"disallowed\"],[[12784,12799],\"valid\"],[[12800,12800],\"disallowed_STD3_mapped\",[40,4352,41]],[[12801,12801],\"disallowed_STD3_mapped\",[40,4354,41]],[[12802,12802],\"disallowed_STD3_mapped\",[40,4355,41]],[[12803,12803],\"disallowed_STD3_mapped\",[40,4357,41]],[[12804,12804],\"disallowed_STD3_mapped\",[40,4358,41]],[[12805,12805],\"disallowed_STD3_mapped\",[40,4359,41]],[[12806,12806],\"disallowed_STD3_mapped\",[40,4361,41]],[[12807,12807],\"disallowed_STD3_mapped\",[40,4363,41]],[[12808,12808],\"disallowed_STD3_mapped\",[40,4364,41]],[[12809,12809],\"disallowed_STD3_mapped\",[40,4366,41]],[[12810,12810],\"disallowed_STD3_mapped\",[40,4367,41]],[[12811,12811],\"disallowed_STD3_mapped\",[40,4368,41]],[[12812,12812],\"disallowed_STD3_mapped\",[40,4369,41]],[[12813,12813],\"disallowed_STD3_mapped\",[40,4370,41]],[[12814,12814],\"disallowed_STD3_mapped\",[40,44032,41]],[[12815,12815],\"disallowed_STD3_mapped\",[40,45208,41]],[[12816,12816],\"disallowed_STD3_mapped\",[40,45796,41]],[[12817,12817],\"disallowed_STD3_mapped\",[40,46972,41]],[[12818,12818],\"disallowed_STD3_mapped\",[40,47560,41]],[[12819,12819],\"disallowed_STD3_mapped\",[40,48148,41]],[[12820,12820],\"disallowed_STD3_mapped\",[40,49324,41]],[[12821,12821],\"disallowed_STD3_mapped\",[40,50500,41]],[[12822,12822],\"disallowed_STD3_mapped\",[40,51088,41]],[[12823,12823],\"disallowed_STD3_mapped\",[40,52264,41]],[[12824,12824],\"disallowed_STD3_mapped\",[40,52852,41]],[[12825,12825],\"disallowed_STD3_mapped\",[40,53440,41]],[[12826,12826],\"disallowed_STD3_mapped\",[40,54028,41]],[[12827,12827],\"disallowed_STD3_mapped\",[40,54616,41]],[[12828,12828],\"disallowed_STD3_mapped\",[40,51452,41]],[[12829,12829],\"disallowed_STD3_mapped\",[40,50724,51204,41]],[[12830,12830],\"disallowed_STD3_mapped\",[40,50724,54980,41]],[[12831,12831],\"disallowed\"],[[12832,12832],\"disallowed_STD3_mapped\",[40,19968,41]],[[12833,12833],\"disallowed_STD3_mapped\",[40,20108,41]],[[12834,12834],\"disallowed_STD3_mapped\",[40,19977,41]],[[12835,12835],\"disallowed_STD3_mapped\",[40,22235,41]],[[12836,12836],\"disallowed_STD3_mapped\",[40,20116,41]],[[12837,12837],\"disallowed_STD3_mapped\",[40,20845,41]],[[12838,12838],\"disallowed_STD3_mapped\",[40,19971,41]],[[12839,12839],\"disallowed_STD3_mapped\",[40,20843,41]],[[12840,12840],\"disallowed_STD3_mapped\",[40,20061,41]],[[12841,12841],\"disallowed_STD3_mapped\",[40,21313,41]],[[12842,12842],\"disallowed_STD3_mapped\",[40,26376,41]],[[12843,12843],\"disallowed_STD3_mapped\",[40,28779,41]],[[12844,12844],\"disallowed_STD3_mapped\",[40,27700,41]],[[12845,12845],\"disallowed_STD3_mapped\",[40,26408,41]],[[12846,12846],\"disallowed_STD3_mapped\",[40,37329,41]],[[12847,12847],\"disallowed_STD3_mapped\",[40,22303,41]],[[12848,12848],\"disallowed_STD3_mapped\",[40,26085,41]],[[12849,12849],\"disallowed_STD3_mapped\",[40,26666,41]],[[12850,12850],\"disallowed_STD3_mapped\",[40,26377,41]],[[12851,12851],\"disallowed_STD3_mapped\",[40,31038,41]],[[12852,12852],\"disallowed_STD3_mapped\",[40,21517,41]],[[12853,12853],\"disallowed_STD3_mapped\",[40,29305,41]],[[12854,12854],\"disallowed_STD3_mapped\",[40,36001,41]],[[12855,12855],\"disallowed_STD3_mapped\",[40,31069,41]],[[12856,12856],\"disallowed_STD3_mapped\",[40,21172,41]],[[12857,12857],\"disallowed_STD3_mapped\",[40,20195,41]],[[12858,12858],\"disallowed_STD3_mapped\",[40,21628,41]],[[12859,12859],\"disallowed_STD3_mapped\",[40,23398,41]],[[12860,12860],\"disallowed_STD3_mapped\",[40,30435,41]],[[12861,12861],\"disallowed_STD3_mapped\",[40,20225,41]],[[12862,12862],\"disallowed_STD3_mapped\",[40,36039,41]],[[12863,12863],\"disallowed_STD3_mapped\",[40,21332,41]],[[12864,12864],\"disallowed_STD3_mapped\",[40,31085,41]],[[12865,12865],\"disallowed_STD3_mapped\",[40,20241,41]],[[12866,12866],\"disallowed_STD3_mapped\",[40,33258,41]],[[12867,12867],\"disallowed_STD3_mapped\",[40,33267,41]],[[12868,12868],\"mapped\",[21839]],[[12869,12869],\"mapped\",[24188]],[[12870,12870],\"mapped\",[25991]],[[12871,12871],\"mapped\",[31631]],[[12872,12879],\"valid\",[],\"NV8\"],[[12880,12880],\"mapped\",[112,116,101]],[[12881,12881],\"mapped\",[50,49]],[[12882,12882],\"mapped\",[50,50]],[[12883,12883],\"mapped\",[50,51]],[[12884,12884],\"mapped\",[50,52]],[[12885,12885],\"mapped\",[50,53]],[[12886,12886],\"mapped\",[50,54]],[[12887,12887],\"mapped\",[50,55]],[[12888,12888],\"mapped\",[50,56]],[[12889,12889],\"mapped\",[50,57]],[[12890,12890],\"mapped\",[51,48]],[[12891,12891],\"mapped\",[51,49]],[[12892,12892],\"mapped\",[51,50]],[[12893,12893],\"mapped\",[51,51]],[[12894,12894],\"mapped\",[51,52]],[[12895,12895],\"mapped\",[51,53]],[[12896,12896],\"mapped\",[4352]],[[12897,12897],\"mapped\",[4354]],[[12898,12898],\"mapped\",[4355]],[[12899,12899],\"mapped\",[4357]],[[12900,12900],\"mapped\",[4358]],[[12901,12901],\"mapped\",[4359]],[[12902,12902],\"mapped\",[4361]],[[12903,12903],\"mapped\",[4363]],[[12904,12904],\"mapped\",[4364]],[[12905,12905],\"mapped\",[4366]],[[12906,12906],\"mapped\",[4367]],[[12907,12907],\"mapped\",[4368]],[[12908,12908],\"mapped\",[4369]],[[12909,12909],\"mapped\",[4370]],[[12910,12910],\"mapped\",[44032]],[[12911,12911],\"mapped\",[45208]],[[12912,12912],\"mapped\",[45796]],[[12913,12913],\"mapped\",[46972]],[[12914,12914],\"mapped\",[47560]],[[12915,12915],\"mapped\",[48148]],[[12916,12916],\"mapped\",[49324]],[[12917,12917],\"mapped\",[50500]],[[12918,12918],\"mapped\",[51088]],[[12919,12919],\"mapped\",[52264]],[[12920,12920],\"mapped\",[52852]],[[12921,12921],\"mapped\",[53440]],[[12922,12922],\"mapped\",[54028]],[[12923,12923],\"mapped\",[54616]],[[12924,12924],\"mapped\",[52280,44256]],[[12925,12925],\"mapped\",[51452,51032]],[[12926,12926],\"mapped\",[50864]],[[12927,12927],\"valid\",[],\"NV8\"],[[12928,12928],\"mapped\",[19968]],[[12929,12929],\"mapped\",[20108]],[[12930,12930],\"mapped\",[19977]],[[12931,12931],\"mapped\",[22235]],[[12932,12932],\"mapped\",[20116]],[[12933,12933],\"mapped\",[20845]],[[12934,12934],\"mapped\",[19971]],[[12935,12935],\"mapped\",[20843]],[[12936,12936],\"mapped\",[20061]],[[12937,12937],\"mapped\",[21313]],[[12938,12938],\"mapped\",[26376]],[[12939,12939],\"mapped\",[28779]],[[12940,12940],\"mapped\",[27700]],[[12941,12941],\"mapped\",[26408]],[[12942,12942],\"mapped\",[37329]],[[12943,12943],\"mapped\",[22303]],[[12944,12944],\"mapped\",[26085]],[[12945,12945],\"mapped\",[26666]],[[12946,12946],\"mapped\",[26377]],[[12947,12947],\"mapped\",[31038]],[[12948,12948],\"mapped\",[21517]],[[12949,12949],\"mapped\",[29305]],[[12950,12950],\"mapped\",[36001]],[[12951,12951],\"mapped\",[31069]],[[12952,12952],\"mapped\",[21172]],[[12953,12953],\"mapped\",[31192]],[[12954,12954],\"mapped\",[30007]],[[12955,12955],\"mapped\",[22899]],[[12956,12956],\"mapped\",[36969]],[[12957,12957],\"mapped\",[20778]],[[12958,12958],\"mapped\",[21360]],[[12959,12959],\"mapped\",[27880]],[[12960,12960],\"mapped\",[38917]],[[12961,12961],\"mapped\",[20241]],[[12962,12962],\"mapped\",[20889]],[[12963,12963],\"mapped\",[27491]],[[12964,12964],\"mapped\",[19978]],[[12965,12965],\"mapped\",[20013]],[[12966,12966],\"mapped\",[19979]],[[12967,12967],\"mapped\",[24038]],[[12968,12968],\"mapped\",[21491]],[[12969,12969],\"mapped\",[21307]],[[12970,12970],\"mapped\",[23447]],[[12971,12971],\"mapped\",[23398]],[[12972,12972],\"mapped\",[30435]],[[12973,12973],\"mapped\",[20225]],[[12974,12974],\"mapped\",[36039]],[[12975,12975],\"mapped\",[21332]],[[12976,12976],\"mapped\",[22812]],[[12977,12977],\"mapped\",[51,54]],[[12978,12978],\"mapped\",[51,55]],[[12979,12979],\"mapped\",[51,56]],[[12980,12980],\"mapped\",[51,57]],[[12981,12981],\"mapped\",[52,48]],[[12982,12982],\"mapped\",[52,49]],[[12983,12983],\"mapped\",[52,50]],[[12984,12984],\"mapped\",[52,51]],[[12985,12985],\"mapped\",[52,52]],[[12986,12986],\"mapped\",[52,53]],[[12987,12987],\"mapped\",[52,54]],[[12988,12988],\"mapped\",[52,55]],[[12989,12989],\"mapped\",[52,56]],[[12990,12990],\"mapped\",[52,57]],[[12991,12991],\"mapped\",[53,48]],[[12992,12992],\"mapped\",[49,26376]],[[12993,12993],\"mapped\",[50,26376]],[[12994,12994],\"mapped\",[51,26376]],[[12995,12995],\"mapped\",[52,26376]],[[12996,12996],\"mapped\",[53,26376]],[[12997,12997],\"mapped\",[54,26376]],[[12998,12998],\"mapped\",[55,26376]],[[12999,12999],\"mapped\",[56,26376]],[[13000,13000],\"mapped\",[57,26376]],[[13001,13001],\"mapped\",[49,48,26376]],[[13002,13002],\"mapped\",[49,49,26376]],[[13003,13003],\"mapped\",[49,50,26376]],[[13004,13004],\"mapped\",[104,103]],[[13005,13005],\"mapped\",[101,114,103]],[[13006,13006],\"mapped\",[101,118]],[[13007,13007],\"mapped\",[108,116,100]],[[13008,13008],\"mapped\",[12450]],[[13009,13009],\"mapped\",[12452]],[[13010,13010],\"mapped\",[12454]],[[13011,13011],\"mapped\",[12456]],[[13012,13012],\"mapped\",[12458]],[[13013,13013],\"mapped\",[12459]],[[13014,13014],\"mapped\",[12461]],[[13015,13015],\"mapped\",[12463]],[[13016,13016],\"mapped\",[12465]],[[13017,13017],\"mapped\",[12467]],[[13018,13018],\"mapped\",[12469]],[[13019,13019],\"mapped\",[12471]],[[13020,13020],\"mapped\",[12473]],[[13021,13021],\"mapped\",[12475]],[[13022,13022],\"mapped\",[12477]],[[13023,13023],\"mapped\",[12479]],[[13024,13024],\"mapped\",[12481]],[[13025,13025],\"mapped\",[12484]],[[13026,13026],\"mapped\",[12486]],[[13027,13027],\"mapped\",[12488]],[[13028,13028],\"mapped\",[12490]],[[13029,13029],\"mapped\",[12491]],[[13030,13030],\"mapped\",[12492]],[[13031,13031],\"mapped\",[12493]],[[13032,13032],\"mapped\",[12494]],[[13033,13033],\"mapped\",[12495]],[[13034,13034],\"mapped\",[12498]],[[13035,13035],\"mapped\",[12501]],[[13036,13036],\"mapped\",[12504]],[[13037,13037],\"mapped\",[12507]],[[13038,13038],\"mapped\",[12510]],[[13039,13039],\"mapped\",[12511]],[[13040,13040],\"mapped\",[12512]],[[13041,13041],\"mapped\",[12513]],[[13042,13042],\"mapped\",[12514]],[[13043,13043],\"mapped\",[12516]],[[13044,13044],\"mapped\",[12518]],[[13045,13045],\"mapped\",[12520]],[[13046,13046],\"mapped\",[12521]],[[13047,13047],\"mapped\",[12522]],[[13048,13048],\"mapped\",[12523]],[[13049,13049],\"mapped\",[12524]],[[13050,13050],\"mapped\",[12525]],[[13051,13051],\"mapped\",[12527]],[[13052,13052],\"mapped\",[12528]],[[13053,13053],\"mapped\",[12529]],[[13054,13054],\"mapped\",[12530]],[[13055,13055],\"disallowed\"],[[13056,13056],\"mapped\",[12450,12497,12540,12488]],[[13057,13057],\"mapped\",[12450,12523,12501,12449]],[[13058,13058],\"mapped\",[12450,12531,12506,12450]],[[13059,13059],\"mapped\",[12450,12540,12523]],[[13060,13060],\"mapped\",[12452,12491,12531,12464]],[[13061,13061],\"mapped\",[12452,12531,12481]],[[13062,13062],\"mapped\",[12454,12457,12531]],[[13063,13063],\"mapped\",[12456,12473,12463,12540,12489]],[[13064,13064],\"mapped\",[12456,12540,12459,12540]],[[13065,13065],\"mapped\",[12458,12531,12473]],[[13066,13066],\"mapped\",[12458,12540,12512]],[[13067,13067],\"mapped\",[12459,12452,12522]],[[13068,13068],\"mapped\",[12459,12521,12483,12488]],[[13069,13069],\"mapped\",[12459,12525,12522,12540]],[[13070,13070],\"mapped\",[12460,12525,12531]],[[13071,13071],\"mapped\",[12460,12531,12510]],[[13072,13072],\"mapped\",[12462,12460]],[[13073,13073],\"mapped\",[12462,12491,12540]],[[13074,13074],\"mapped\",[12461,12517,12522,12540]],[[13075,13075],\"mapped\",[12462,12523,12480,12540]],[[13076,13076],\"mapped\",[12461,12525]],[[13077,13077],\"mapped\",[12461,12525,12464,12521,12512]],[[13078,13078],\"mapped\",[12461,12525,12513,12540,12488,12523]],[[13079,13079],\"mapped\",[12461,12525,12527,12483,12488]],[[13080,13080],\"mapped\",[12464,12521,12512]],[[13081,13081],\"mapped\",[12464,12521,12512,12488,12531]],[[13082,13082],\"mapped\",[12463,12523,12476,12452,12525]],[[13083,13083],\"mapped\",[12463,12525,12540,12493]],[[13084,13084],\"mapped\",[12465,12540,12473]],[[13085,13085],\"mapped\",[12467,12523,12490]],[[13086,13086],\"mapped\",[12467,12540,12509]],[[13087,13087],\"mapped\",[12469,12452,12463,12523]],[[13088,13088],\"mapped\",[12469,12531,12481,12540,12512]],[[13089,13089],\"mapped\",[12471,12522,12531,12464]],[[13090,13090],\"mapped\",[12475,12531,12481]],[[13091,13091],\"mapped\",[12475,12531,12488]],[[13092,13092],\"mapped\",[12480,12540,12473]],[[13093,13093],\"mapped\",[12487,12471]],[[13094,13094],\"mapped\",[12489,12523]],[[13095,13095],\"mapped\",[12488,12531]],[[13096,13096],\"mapped\",[12490,12494]],[[13097,13097],\"mapped\",[12494,12483,12488]],[[13098,13098],\"mapped\",[12495,12452,12484]],[[13099,13099],\"mapped\",[12497,12540,12475,12531,12488]],[[13100,13100],\"mapped\",[12497,12540,12484]],[[13101,13101],\"mapped\",[12496,12540,12524,12523]],[[13102,13102],\"mapped\",[12500,12450,12473,12488,12523]],[[13103,13103],\"mapped\",[12500,12463,12523]],[[13104,13104],\"mapped\",[12500,12467]],[[13105,13105],\"mapped\",[12499,12523]],[[13106,13106],\"mapped\",[12501,12449,12521,12483,12489]],[[13107,13107],\"mapped\",[12501,12451,12540,12488]],[[13108,13108],\"mapped\",[12502,12483,12471,12455,12523]],[[13109,13109],\"mapped\",[12501,12521,12531]],[[13110,13110],\"mapped\",[12504,12463,12479,12540,12523]],[[13111,13111],\"mapped\",[12506,12477]],[[13112,13112],\"mapped\",[12506,12491,12498]],[[13113,13113],\"mapped\",[12504,12523,12484]],[[13114,13114],\"mapped\",[12506,12531,12473]],[[13115,13115],\"mapped\",[12506,12540,12472]],[[13116,13116],\"mapped\",[12505,12540,12479]],[[13117,13117],\"mapped\",[12509,12452,12531,12488]],[[13118,13118],\"mapped\",[12508,12523,12488]],[[13119,13119],\"mapped\",[12507,12531]],[[13120,13120],\"mapped\",[12509,12531,12489]],[[13121,13121],\"mapped\",[12507,12540,12523]],[[13122,13122],\"mapped\",[12507,12540,12531]],[[13123,13123],\"mapped\",[12510,12452,12463,12525]],[[13124,13124],\"mapped\",[12510,12452,12523]],[[13125,13125],\"mapped\",[12510,12483,12495]],[[13126,13126],\"mapped\",[12510,12523,12463]],[[13127,13127],\"mapped\",[12510,12531,12471,12519,12531]],[[13128,13128],\"mapped\",[12511,12463,12525,12531]],[[13129,13129],\"mapped\",[12511,12522]],[[13130,13130],\"mapped\",[12511,12522,12496,12540,12523]],[[13131,13131],\"mapped\",[12513,12460]],[[13132,13132],\"mapped\",[12513,12460,12488,12531]],[[13133,13133],\"mapped\",[12513,12540,12488,12523]],[[13134,13134],\"mapped\",[12516,12540,12489]],[[13135,13135],\"mapped\",[12516,12540,12523]],[[13136,13136],\"mapped\",[12518,12450,12531]],[[13137,13137],\"mapped\",[12522,12483,12488,12523]],[[13138,13138],\"mapped\",[12522,12521]],[[13139,13139],\"mapped\",[12523,12500,12540]],[[13140,13140],\"mapped\",[12523,12540,12502,12523]],[[13141,13141],\"mapped\",[12524,12512]],[[13142,13142],\"mapped\",[12524,12531,12488,12466,12531]],[[13143,13143],\"mapped\",[12527,12483,12488]],[[13144,13144],\"mapped\",[48,28857]],[[13145,13145],\"mapped\",[49,28857]],[[13146,13146],\"mapped\",[50,28857]],[[13147,13147],\"mapped\",[51,28857]],[[13148,13148],\"mapped\",[52,28857]],[[13149,13149],\"mapped\",[53,28857]],[[13150,13150],\"mapped\",[54,28857]],[[13151,13151],\"mapped\",[55,28857]],[[13152,13152],\"mapped\",[56,28857]],[[13153,13153],\"mapped\",[57,28857]],[[13154,13154],\"mapped\",[49,48,28857]],[[13155,13155],\"mapped\",[49,49,28857]],[[13156,13156],\"mapped\",[49,50,28857]],[[13157,13157],\"mapped\",[49,51,28857]],[[13158,13158],\"mapped\",[49,52,28857]],[[13159,13159],\"mapped\",[49,53,28857]],[[13160,13160],\"mapped\",[49,54,28857]],[[13161,13161],\"mapped\",[49,55,28857]],[[13162,13162],\"mapped\",[49,56,28857]],[[13163,13163],\"mapped\",[49,57,28857]],[[13164,13164],\"mapped\",[50,48,28857]],[[13165,13165],\"mapped\",[50,49,28857]],[[13166,13166],\"mapped\",[50,50,28857]],[[13167,13167],\"mapped\",[50,51,28857]],[[13168,13168],\"mapped\",[50,52,28857]],[[13169,13169],\"mapped\",[104,112,97]],[[13170,13170],\"mapped\",[100,97]],[[13171,13171],\"mapped\",[97,117]],[[13172,13172],\"mapped\",[98,97,114]],[[13173,13173],\"mapped\",[111,118]],[[13174,13174],\"mapped\",[112,99]],[[13175,13175],\"mapped\",[100,109]],[[13176,13176],\"mapped\",[100,109,50]],[[13177,13177],\"mapped\",[100,109,51]],[[13178,13178],\"mapped\",[105,117]],[[13179,13179],\"mapped\",[24179,25104]],[[13180,13180],\"mapped\",[26157,21644]],[[13181,13181],\"mapped\",[22823,27491]],[[13182,13182],\"mapped\",[26126,27835]],[[13183,13183],\"mapped\",[26666,24335,20250,31038]],[[13184,13184],\"mapped\",[112,97]],[[13185,13185],\"mapped\",[110,97]],[[13186,13186],\"mapped\",[956,97]],[[13187,13187],\"mapped\",[109,97]],[[13188,13188],\"mapped\",[107,97]],[[13189,13189],\"mapped\",[107,98]],[[13190,13190],\"mapped\",[109,98]],[[13191,13191],\"mapped\",[103,98]],[[13192,13192],\"mapped\",[99,97,108]],[[13193,13193],\"mapped\",[107,99,97,108]],[[13194,13194],\"mapped\",[112,102]],[[13195,13195],\"mapped\",[110,102]],[[13196,13196],\"mapped\",[956,102]],[[13197,13197],\"mapped\",[956,103]],[[13198,13198],\"mapped\",[109,103]],[[13199,13199],\"mapped\",[107,103]],[[13200,13200],\"mapped\",[104,122]],[[13201,13201],\"mapped\",[107,104,122]],[[13202,13202],\"mapped\",[109,104,122]],[[13203,13203],\"mapped\",[103,104,122]],[[13204,13204],\"mapped\",[116,104,122]],[[13205,13205],\"mapped\",[956,108]],[[13206,13206],\"mapped\",[109,108]],[[13207,13207],\"mapped\",[100,108]],[[13208,13208],\"mapped\",[107,108]],[[13209,13209],\"mapped\",[102,109]],[[13210,13210],\"mapped\",[110,109]],[[13211,13211],\"mapped\",[956,109]],[[13212,13212],\"mapped\",[109,109]],[[13213,13213],\"mapped\",[99,109]],[[13214,13214],\"mapped\",[107,109]],[[13215,13215],\"mapped\",[109,109,50]],[[13216,13216],\"mapped\",[99,109,50]],[[13217,13217],\"mapped\",[109,50]],[[13218,13218],\"mapped\",[107,109,50]],[[13219,13219],\"mapped\",[109,109,51]],[[13220,13220],\"mapped\",[99,109,51]],[[13221,13221],\"mapped\",[109,51]],[[13222,13222],\"mapped\",[107,109,51]],[[13223,13223],\"mapped\",[109,8725,115]],[[13224,13224],\"mapped\",[109,8725,115,50]],[[13225,13225],\"mapped\",[112,97]],[[13226,13226],\"mapped\",[107,112,97]],[[13227,13227],\"mapped\",[109,112,97]],[[13228,13228],\"mapped\",[103,112,97]],[[13229,13229],\"mapped\",[114,97,100]],[[13230,13230],\"mapped\",[114,97,100,8725,115]],[[13231,13231],\"mapped\",[114,97,100,8725,115,50]],[[13232,13232],\"mapped\",[112,115]],[[13233,13233],\"mapped\",[110,115]],[[13234,13234],\"mapped\",[956,115]],[[13235,13235],\"mapped\",[109,115]],[[13236,13236],\"mapped\",[112,118]],[[13237,13237],\"mapped\",[110,118]],[[13238,13238],\"mapped\",[956,118]],[[13239,13239],\"mapped\",[109,118]],[[13240,13240],\"mapped\",[107,118]],[[13241,13241],\"mapped\",[109,118]],[[13242,13242],\"mapped\",[112,119]],[[13243,13243],\"mapped\",[110,119]],[[13244,13244],\"mapped\",[956,119]],[[13245,13245],\"mapped\",[109,119]],[[13246,13246],\"mapped\",[107,119]],[[13247,13247],\"mapped\",[109,119]],[[13248,13248],\"mapped\",[107,969]],[[13249,13249],\"mapped\",[109,969]],[[13250,13250],\"disallowed\"],[[13251,13251],\"mapped\",[98,113]],[[13252,13252],\"mapped\",[99,99]],[[13253,13253],\"mapped\",[99,100]],[[13254,13254],\"mapped\",[99,8725,107,103]],[[13255,13255],\"disallowed\"],[[13256,13256],\"mapped\",[100,98]],[[13257,13257],\"mapped\",[103,121]],[[13258,13258],\"mapped\",[104,97]],[[13259,13259],\"mapped\",[104,112]],[[13260,13260],\"mapped\",[105,110]],[[13261,13261],\"mapped\",[107,107]],[[13262,13262],\"mapped\",[107,109]],[[13263,13263],\"mapped\",[107,116]],[[13264,13264],\"mapped\",[108,109]],[[13265,13265],\"mapped\",[108,110]],[[13266,13266],\"mapped\",[108,111,103]],[[13267,13267],\"mapped\",[108,120]],[[13268,13268],\"mapped\",[109,98]],[[13269,13269],\"mapped\",[109,105,108]],[[13270,13270],\"mapped\",[109,111,108]],[[13271,13271],\"mapped\",[112,104]],[[13272,13272],\"disallowed\"],[[13273,13273],\"mapped\",[112,112,109]],[[13274,13274],\"mapped\",[112,114]],[[13275,13275],\"mapped\",[115,114]],[[13276,13276],\"mapped\",[115,118]],[[13277,13277],\"mapped\",[119,98]],[[13278,13278],\"mapped\",[118,8725,109]],[[13279,13279],\"mapped\",[97,8725,109]],[[13280,13280],\"mapped\",[49,26085]],[[13281,13281],\"mapped\",[50,26085]],[[13282,13282],\"mapped\",[51,26085]],[[13283,13283],\"mapped\",[52,26085]],[[13284,13284],\"mapped\",[53,26085]],[[13285,13285],\"mapped\",[54,26085]],[[13286,13286],\"mapped\",[55,26085]],[[13287,13287],\"mapped\",[56,26085]],[[13288,13288],\"mapped\",[57,26085]],[[13289,13289],\"mapped\",[49,48,26085]],[[13290,13290],\"mapped\",[49,49,26085]],[[13291,13291],\"mapped\",[49,50,26085]],[[13292,13292],\"mapped\",[49,51,26085]],[[13293,13293],\"mapped\",[49,52,26085]],[[13294,13294],\"mapped\",[49,53,26085]],[[13295,13295],\"mapped\",[49,54,26085]],[[13296,13296],\"mapped\",[49,55,26085]],[[13297,13297],\"mapped\",[49,56,26085]],[[13298,13298],\"mapped\",[49,57,26085]],[[13299,13299],\"mapped\",[50,48,26085]],[[13300,13300],\"mapped\",[50,49,26085]],[[13301,13301],\"mapped\",[50,50,26085]],[[13302,13302],\"mapped\",[50,51,26085]],[[13303,13303],\"mapped\",[50,52,26085]],[[13304,13304],\"mapped\",[50,53,26085]],[[13305,13305],\"mapped\",[50,54,26085]],[[13306,13306],\"mapped\",[50,55,26085]],[[13307,13307],\"mapped\",[50,56,26085]],[[13308,13308],\"mapped\",[50,57,26085]],[[13309,13309],\"mapped\",[51,48,26085]],[[13310,13310],\"mapped\",[51,49,26085]],[[13311,13311],\"mapped\",[103,97,108]],[[13312,19893],\"valid\"],[[19894,19903],\"disallowed\"],[[19904,19967],\"valid\",[],\"NV8\"],[[19968,40869],\"valid\"],[[40870,40891],\"valid\"],[[40892,40899],\"valid\"],[[40900,40907],\"valid\"],[[40908,40908],\"valid\"],[[40909,40917],\"valid\"],[[40918,40959],\"disallowed\"],[[40960,42124],\"valid\"],[[42125,42127],\"disallowed\"],[[42128,42145],\"valid\",[],\"NV8\"],[[42146,42147],\"valid\",[],\"NV8\"],[[42148,42163],\"valid\",[],\"NV8\"],[[42164,42164],\"valid\",[],\"NV8\"],[[42165,42176],\"valid\",[],\"NV8\"],[[42177,42177],\"valid\",[],\"NV8\"],[[42178,42180],\"valid\",[],\"NV8\"],[[42181,42181],\"valid\",[],\"NV8\"],[[42182,42182],\"valid\",[],\"NV8\"],[[42183,42191],\"disallowed\"],[[42192,42237],\"valid\"],[[42238,42239],\"valid\",[],\"NV8\"],[[42240,42508],\"valid\"],[[42509,42511],\"valid\",[],\"NV8\"],[[42512,42539],\"valid\"],[[42540,42559],\"disallowed\"],[[42560,42560],\"mapped\",[42561]],[[42561,42561],\"valid\"],[[42562,42562],\"mapped\",[42563]],[[42563,42563],\"valid\"],[[42564,42564],\"mapped\",[42565]],[[42565,42565],\"valid\"],[[42566,42566],\"mapped\",[42567]],[[42567,42567],\"valid\"],[[42568,42568],\"mapped\",[42569]],[[42569,42569],\"valid\"],[[42570,42570],\"mapped\",[42571]],[[42571,42571],\"valid\"],[[42572,42572],\"mapped\",[42573]],[[42573,42573],\"valid\"],[[42574,42574],\"mapped\",[42575]],[[42575,42575],\"valid\"],[[42576,42576],\"mapped\",[42577]],[[42577,42577],\"valid\"],[[42578,42578],\"mapped\",[42579]],[[42579,42579],\"valid\"],[[42580,42580],\"mapped\",[42581]],[[42581,42581],\"valid\"],[[42582,42582],\"mapped\",[42583]],[[42583,42583],\"valid\"],[[42584,42584],\"mapped\",[42585]],[[42585,42585],\"valid\"],[[42586,42586],\"mapped\",[42587]],[[42587,42587],\"valid\"],[[42588,42588],\"mapped\",[42589]],[[42589,42589],\"valid\"],[[42590,42590],\"mapped\",[42591]],[[42591,42591],\"valid\"],[[42592,42592],\"mapped\",[42593]],[[42593,42593],\"valid\"],[[42594,42594],\"mapped\",[42595]],[[42595,42595],\"valid\"],[[42596,42596],\"mapped\",[42597]],[[42597,42597],\"valid\"],[[42598,42598],\"mapped\",[42599]],[[42599,42599],\"valid\"],[[42600,42600],\"mapped\",[42601]],[[42601,42601],\"valid\"],[[42602,42602],\"mapped\",[42603]],[[42603,42603],\"valid\"],[[42604,42604],\"mapped\",[42605]],[[42605,42607],\"valid\"],[[42608,42611],\"valid\",[],\"NV8\"],[[42612,42619],\"valid\"],[[42620,42621],\"valid\"],[[42622,42622],\"valid\",[],\"NV8\"],[[42623,42623],\"valid\"],[[42624,42624],\"mapped\",[42625]],[[42625,42625],\"valid\"],[[42626,42626],\"mapped\",[42627]],[[42627,42627],\"valid\"],[[42628,42628],\"mapped\",[42629]],[[42629,42629],\"valid\"],[[42630,42630],\"mapped\",[42631]],[[42631,42631],\"valid\"],[[42632,42632],\"mapped\",[42633]],[[42633,42633],\"valid\"],[[42634,42634],\"mapped\",[42635]],[[42635,42635],\"valid\"],[[42636,42636],\"mapped\",[42637]],[[42637,42637],\"valid\"],[[42638,42638],\"mapped\",[42639]],[[42639,42639],\"valid\"],[[42640,42640],\"mapped\",[42641]],[[42641,42641],\"valid\"],[[42642,42642],\"mapped\",[42643]],[[42643,42643],\"valid\"],[[42644,42644],\"mapped\",[42645]],[[42645,42645],\"valid\"],[[42646,42646],\"mapped\",[42647]],[[42647,42647],\"valid\"],[[42648,42648],\"mapped\",[42649]],[[42649,42649],\"valid\"],[[42650,42650],\"mapped\",[42651]],[[42651,42651],\"valid\"],[[42652,42652],\"mapped\",[1098]],[[42653,42653],\"mapped\",[1100]],[[42654,42654],\"valid\"],[[42655,42655],\"valid\"],[[42656,42725],\"valid\"],[[42726,42735],\"valid\",[],\"NV8\"],[[42736,42737],\"valid\"],[[42738,42743],\"valid\",[],\"NV8\"],[[42744,42751],\"disallowed\"],[[42752,42774],\"valid\",[],\"NV8\"],[[42775,42778],\"valid\"],[[42779,42783],\"valid\"],[[42784,42785],\"valid\",[],\"NV8\"],[[42786,42786],\"mapped\",[42787]],[[42787,42787],\"valid\"],[[42788,42788],\"mapped\",[42789]],[[42789,42789],\"valid\"],[[42790,42790],\"mapped\",[42791]],[[42791,42791],\"valid\"],[[42792,42792],\"mapped\",[42793]],[[42793,42793],\"valid\"],[[42794,42794],\"mapped\",[42795]],[[42795,42795],\"valid\"],[[42796,42796],\"mapped\",[42797]],[[42797,42797],\"valid\"],[[42798,42798],\"mapped\",[42799]],[[42799,42801],\"valid\"],[[42802,42802],\"mapped\",[42803]],[[42803,42803],\"valid\"],[[42804,42804],\"mapped\",[42805]],[[42805,42805],\"valid\"],[[42806,42806],\"mapped\",[42807]],[[42807,42807],\"valid\"],[[42808,42808],\"mapped\",[42809]],[[42809,42809],\"valid\"],[[42810,42810],\"mapped\",[42811]],[[42811,42811],\"valid\"],[[42812,42812],\"mapped\",[42813]],[[42813,42813],\"valid\"],[[42814,42814],\"mapped\",[42815]],[[42815,42815],\"valid\"],[[42816,42816],\"mapped\",[42817]],[[42817,42817],\"valid\"],[[42818,42818],\"mapped\",[42819]],[[42819,42819],\"valid\"],[[42820,42820],\"mapped\",[42821]],[[42821,42821],\"valid\"],[[42822,42822],\"mapped\",[42823]],[[42823,42823],\"valid\"],[[42824,42824],\"mapped\",[42825]],[[42825,42825],\"valid\"],[[42826,42826],\"mapped\",[42827]],[[42827,42827],\"valid\"],[[42828,42828],\"mapped\",[42829]],[[42829,42829],\"valid\"],[[42830,42830],\"mapped\",[42831]],[[42831,42831],\"valid\"],[[42832,42832],\"mapped\",[42833]],[[42833,42833],\"valid\"],[[42834,42834],\"mapped\",[42835]],[[42835,42835],\"valid\"],[[42836,42836],\"mapped\",[42837]],[[42837,42837],\"valid\"],[[42838,42838],\"mapped\",[42839]],[[42839,42839],\"valid\"],[[42840,42840],\"mapped\",[42841]],[[42841,42841],\"valid\"],[[42842,42842],\"mapped\",[42843]],[[42843,42843],\"valid\"],[[42844,42844],\"mapped\",[42845]],[[42845,42845],\"valid\"],[[42846,42846],\"mapped\",[42847]],[[42847,42847],\"valid\"],[[42848,42848],\"mapped\",[42849]],[[42849,42849],\"valid\"],[[42850,42850],\"mapped\",[42851]],[[42851,42851],\"valid\"],[[42852,42852],\"mapped\",[42853]],[[42853,42853],\"valid\"],[[42854,42854],\"mapped\",[42855]],[[42855,42855],\"valid\"],[[42856,42856],\"mapped\",[42857]],[[42857,42857],\"valid\"],[[42858,42858],\"mapped\",[42859]],[[42859,42859],\"valid\"],[[42860,42860],\"mapped\",[42861]],[[42861,42861],\"valid\"],[[42862,42862],\"mapped\",[42863]],[[42863,42863],\"valid\"],[[42864,42864],\"mapped\",[42863]],[[42865,42872],\"valid\"],[[42873,42873],\"mapped\",[42874]],[[42874,42874],\"valid\"],[[42875,42875],\"mapped\",[42876]],[[42876,42876],\"valid\"],[[42877,42877],\"mapped\",[7545]],[[42878,42878],\"mapped\",[42879]],[[42879,42879],\"valid\"],[[42880,42880],\"mapped\",[42881]],[[42881,42881],\"valid\"],[[42882,42882],\"mapped\",[42883]],[[42883,42883],\"valid\"],[[42884,42884],\"mapped\",[42885]],[[42885,42885],\"valid\"],[[42886,42886],\"mapped\",[42887]],[[42887,42888],\"valid\"],[[42889,42890],\"valid\",[],\"NV8\"],[[42891,42891],\"mapped\",[42892]],[[42892,42892],\"valid\"],[[42893,42893],\"mapped\",[613]],[[42894,42894],\"valid\"],[[42895,42895],\"valid\"],[[42896,42896],\"mapped\",[42897]],[[42897,42897],\"valid\"],[[42898,42898],\"mapped\",[42899]],[[42899,42899],\"valid\"],[[42900,42901],\"valid\"],[[42902,42902],\"mapped\",[42903]],[[42903,42903],\"valid\"],[[42904,42904],\"mapped\",[42905]],[[42905,42905],\"valid\"],[[42906,42906],\"mapped\",[42907]],[[42907,42907],\"valid\"],[[42908,42908],\"mapped\",[42909]],[[42909,42909],\"valid\"],[[42910,42910],\"mapped\",[42911]],[[42911,42911],\"valid\"],[[42912,42912],\"mapped\",[42913]],[[42913,42913],\"valid\"],[[42914,42914],\"mapped\",[42915]],[[42915,42915],\"valid\"],[[42916,42916],\"mapped\",[42917]],[[42917,42917],\"valid\"],[[42918,42918],\"mapped\",[42919]],[[42919,42919],\"valid\"],[[42920,42920],\"mapped\",[42921]],[[42921,42921],\"valid\"],[[42922,42922],\"mapped\",[614]],[[42923,42923],\"mapped\",[604]],[[42924,42924],\"mapped\",[609]],[[42925,42925],\"mapped\",[620]],[[42926,42927],\"disallowed\"],[[42928,42928],\"mapped\",[670]],[[42929,42929],\"mapped\",[647]],[[42930,42930],\"mapped\",[669]],[[42931,42931],\"mapped\",[43859]],[[42932,42932],\"mapped\",[42933]],[[42933,42933],\"valid\"],[[42934,42934],\"mapped\",[42935]],[[42935,42935],\"valid\"],[[42936,42998],\"disallowed\"],[[42999,42999],\"valid\"],[[43000,43000],\"mapped\",[295]],[[43001,43001],\"mapped\",[339]],[[43002,43002],\"valid\"],[[43003,43007],\"valid\"],[[43008,43047],\"valid\"],[[43048,43051],\"valid\",[],\"NV8\"],[[43052,43055],\"disallowed\"],[[43056,43065],\"valid\",[],\"NV8\"],[[43066,43071],\"disallowed\"],[[43072,43123],\"valid\"],[[43124,43127],\"valid\",[],\"NV8\"],[[43128,43135],\"disallowed\"],[[43136,43204],\"valid\"],[[43205,43213],\"disallowed\"],[[43214,43215],\"valid\",[],\"NV8\"],[[43216,43225],\"valid\"],[[43226,43231],\"disallowed\"],[[43232,43255],\"valid\"],[[43256,43258],\"valid\",[],\"NV8\"],[[43259,43259],\"valid\"],[[43260,43260],\"valid\",[],\"NV8\"],[[43261,43261],\"valid\"],[[43262,43263],\"disallowed\"],[[43264,43309],\"valid\"],[[43310,43311],\"valid\",[],\"NV8\"],[[43312,43347],\"valid\"],[[43348,43358],\"disallowed\"],[[43359,43359],\"valid\",[],\"NV8\"],[[43360,43388],\"valid\",[],\"NV8\"],[[43389,43391],\"disallowed\"],[[43392,43456],\"valid\"],[[43457,43469],\"valid\",[],\"NV8\"],[[43470,43470],\"disallowed\"],[[43471,43481],\"valid\"],[[43482,43485],\"disallowed\"],[[43486,43487],\"valid\",[],\"NV8\"],[[43488,43518],\"valid\"],[[43519,43519],\"disallowed\"],[[43520,43574],\"valid\"],[[43575,43583],\"disallowed\"],[[43584,43597],\"valid\"],[[43598,43599],\"disallowed\"],[[43600,43609],\"valid\"],[[43610,43611],\"disallowed\"],[[43612,43615],\"valid\",[],\"NV8\"],[[43616,43638],\"valid\"],[[43639,43641],\"valid\",[],\"NV8\"],[[43642,43643],\"valid\"],[[43644,43647],\"valid\"],[[43648,43714],\"valid\"],[[43715,43738],\"disallowed\"],[[43739,43741],\"valid\"],[[43742,43743],\"valid\",[],\"NV8\"],[[43744,43759],\"valid\"],[[43760,43761],\"valid\",[],\"NV8\"],[[43762,43766],\"valid\"],[[43767,43776],\"disallowed\"],[[43777,43782],\"valid\"],[[43783,43784],\"disallowed\"],[[43785,43790],\"valid\"],[[43791,43792],\"disallowed\"],[[43793,43798],\"valid\"],[[43799,43807],\"disallowed\"],[[43808,43814],\"valid\"],[[43815,43815],\"disallowed\"],[[43816,43822],\"valid\"],[[43823,43823],\"disallowed\"],[[43824,43866],\"valid\"],[[43867,43867],\"valid\",[],\"NV8\"],[[43868,43868],\"mapped\",[42791]],[[43869,43869],\"mapped\",[43831]],[[43870,43870],\"mapped\",[619]],[[43871,43871],\"mapped\",[43858]],[[43872,43875],\"valid\"],[[43876,43877],\"valid\"],[[43878,43887],\"disallowed\"],[[43888,43888],\"mapped\",[5024]],[[43889,43889],\"mapped\",[5025]],[[43890,43890],\"mapped\",[5026]],[[43891,43891],\"mapped\",[5027]],[[43892,43892],\"mapped\",[5028]],[[43893,43893],\"mapped\",[5029]],[[43894,43894],\"mapped\",[5030]],[[43895,43895],\"mapped\",[5031]],[[43896,43896],\"mapped\",[5032]],[[43897,43897],\"mapped\",[5033]],[[43898,43898],\"mapped\",[5034]],[[43899,43899],\"mapped\",[5035]],[[43900,43900],\"mapped\",[5036]],[[43901,43901],\"mapped\",[5037]],[[43902,43902],\"mapped\",[5038]],[[43903,43903],\"mapped\",[5039]],[[43904,43904],\"mapped\",[5040]],[[43905,43905],\"mapped\",[5041]],[[43906,43906],\"mapped\",[5042]],[[43907,43907],\"mapped\",[5043]],[[43908,43908],\"mapped\",[5044]],[[43909,43909],\"mapped\",[5045]],[[43910,43910],\"mapped\",[5046]],[[43911,43911],\"mapped\",[5047]],[[43912,43912],\"mapped\",[5048]],[[43913,43913],\"mapped\",[5049]],[[43914,43914],\"mapped\",[5050]],[[43915,43915],\"mapped\",[5051]],[[43916,43916],\"mapped\",[5052]],[[43917,43917],\"mapped\",[5053]],[[43918,43918],\"mapped\",[5054]],[[43919,43919],\"mapped\",[5055]],[[43920,43920],\"mapped\",[5056]],[[43921,43921],\"mapped\",[5057]],[[43922,43922],\"mapped\",[5058]],[[43923,43923],\"mapped\",[5059]],[[43924,43924],\"mapped\",[5060]],[[43925,43925],\"mapped\",[5061]],[[43926,43926],\"mapped\",[5062]],[[43927,43927],\"mapped\",[5063]],[[43928,43928],\"mapped\",[5064]],[[43929,43929],\"mapped\",[5065]],[[43930,43930],\"mapped\",[5066]],[[43931,43931],\"mapped\",[5067]],[[43932,43932],\"mapped\",[5068]],[[43933,43933],\"mapped\",[5069]],[[43934,43934],\"mapped\",[5070]],[[43935,43935],\"mapped\",[5071]],[[43936,43936],\"mapped\",[5072]],[[43937,43937],\"mapped\",[5073]],[[43938,43938],\"mapped\",[5074]],[[43939,43939],\"mapped\",[5075]],[[43940,43940],\"mapped\",[5076]],[[43941,43941],\"mapped\",[5077]],[[43942,43942],\"mapped\",[5078]],[[43943,43943],\"mapped\",[5079]],[[43944,43944],\"mapped\",[5080]],[[43945,43945],\"mapped\",[5081]],[[43946,43946],\"mapped\",[5082]],[[43947,43947],\"mapped\",[5083]],[[43948,43948],\"mapped\",[5084]],[[43949,43949],\"mapped\",[5085]],[[43950,43950],\"mapped\",[5086]],[[43951,43951],\"mapped\",[5087]],[[43952,43952],\"mapped\",[5088]],[[43953,43953],\"mapped\",[5089]],[[43954,43954],\"mapped\",[5090]],[[43955,43955],\"mapped\",[5091]],[[43956,43956],\"mapped\",[5092]],[[43957,43957],\"mapped\",[5093]],[[43958,43958],\"mapped\",[5094]],[[43959,43959],\"mapped\",[5095]],[[43960,43960],\"mapped\",[5096]],[[43961,43961],\"mapped\",[5097]],[[43962,43962],\"mapped\",[5098]],[[43963,43963],\"mapped\",[5099]],[[43964,43964],\"mapped\",[5100]],[[43965,43965],\"mapped\",[5101]],[[43966,43966],\"mapped\",[5102]],[[43967,43967],\"mapped\",[5103]],[[43968,44010],\"valid\"],[[44011,44011],\"valid\",[],\"NV8\"],[[44012,44013],\"valid\"],[[44014,44015],\"disallowed\"],[[44016,44025],\"valid\"],[[44026,44031],\"disallowed\"],[[44032,55203],\"valid\"],[[55204,55215],\"disallowed\"],[[55216,55238],\"valid\",[],\"NV8\"],[[55239,55242],\"disallowed\"],[[55243,55291],\"valid\",[],\"NV8\"],[[55292,55295],\"disallowed\"],[[55296,57343],\"disallowed\"],[[57344,63743],\"disallowed\"],[[63744,63744],\"mapped\",[35912]],[[63745,63745],\"mapped\",[26356]],[[63746,63746],\"mapped\",[36554]],[[63747,63747],\"mapped\",[36040]],[[63748,63748],\"mapped\",[28369]],[[63749,63749],\"mapped\",[20018]],[[63750,63750],\"mapped\",[21477]],[[63751,63752],\"mapped\",[40860]],[[63753,63753],\"mapped\",[22865]],[[63754,63754],\"mapped\",[37329]],[[63755,63755],\"mapped\",[21895]],[[63756,63756],\"mapped\",[22856]],[[63757,63757],\"mapped\",[25078]],[[63758,63758],\"mapped\",[30313]],[[63759,63759],\"mapped\",[32645]],[[63760,63760],\"mapped\",[34367]],[[63761,63761],\"mapped\",[34746]],[[63762,63762],\"mapped\",[35064]],[[63763,63763],\"mapped\",[37007]],[[63764,63764],\"mapped\",[27138]],[[63765,63765],\"mapped\",[27931]],[[63766,63766],\"mapped\",[28889]],[[63767,63767],\"mapped\",[29662]],[[63768,63768],\"mapped\",[33853]],[[63769,63769],\"mapped\",[37226]],[[63770,63770],\"mapped\",[39409]],[[63771,63771],\"mapped\",[20098]],[[63772,63772],\"mapped\",[21365]],[[63773,63773],\"mapped\",[27396]],[[63774,63774],\"mapped\",[29211]],[[63775,63775],\"mapped\",[34349]],[[63776,63776],\"mapped\",[40478]],[[63777,63777],\"mapped\",[23888]],[[63778,63778],\"mapped\",[28651]],[[63779,63779],\"mapped\",[34253]],[[63780,63780],\"mapped\",[35172]],[[63781,63781],\"mapped\",[25289]],[[63782,63782],\"mapped\",[33240]],[[63783,63783],\"mapped\",[34847]],[[63784,63784],\"mapped\",[24266]],[[63785,63785],\"mapped\",[26391]],[[63786,63786],\"mapped\",[28010]],[[63787,63787],\"mapped\",[29436]],[[63788,63788],\"mapped\",[37070]],[[63789,63789],\"mapped\",[20358]],[[63790,63790],\"mapped\",[20919]],[[63791,63791],\"mapped\",[21214]],[[63792,63792],\"mapped\",[25796]],[[63793,63793],\"mapped\",[27347]],[[63794,63794],\"mapped\",[29200]],[[63795,63795],\"mapped\",[30439]],[[63796,63796],\"mapped\",[32769]],[[63797,63797],\"mapped\",[34310]],[[63798,63798],\"mapped\",[34396]],[[63799,63799],\"mapped\",[36335]],[[63800,63800],\"mapped\",[38706]],[[63801,63801],\"mapped\",[39791]],[[63802,63802],\"mapped\",[40442]],[[63803,63803],\"mapped\",[30860]],[[63804,63804],\"mapped\",[31103]],[[63805,63805],\"mapped\",[32160]],[[63806,63806],\"mapped\",[33737]],[[63807,63807],\"mapped\",[37636]],[[63808,63808],\"mapped\",[40575]],[[63809,63809],\"mapped\",[35542]],[[63810,63810],\"mapped\",[22751]],[[63811,63811],\"mapped\",[24324]],[[63812,63812],\"mapped\",[31840]],[[63813,63813],\"mapped\",[32894]],[[63814,63814],\"mapped\",[29282]],[[63815,63815],\"mapped\",[30922]],[[63816,63816],\"mapped\",[36034]],[[63817,63817],\"mapped\",[38647]],[[63818,63818],\"mapped\",[22744]],[[63819,63819],\"mapped\",[23650]],[[63820,63820],\"mapped\",[27155]],[[63821,63821],\"mapped\",[28122]],[[63822,63822],\"mapped\",[28431]],[[63823,63823],\"mapped\",[32047]],[[63824,63824],\"mapped\",[32311]],[[63825,63825],\"mapped\",[38475]],[[63826,63826],\"mapped\",[21202]],[[63827,63827],\"mapped\",[32907]],[[63828,63828],\"mapped\",[20956]],[[63829,63829],\"mapped\",[20940]],[[63830,63830],\"mapped\",[31260]],[[63831,63831],\"mapped\",[32190]],[[63832,63832],\"mapped\",[33777]],[[63833,63833],\"mapped\",[38517]],[[63834,63834],\"mapped\",[35712]],[[63835,63835],\"mapped\",[25295]],[[63836,63836],\"mapped\",[27138]],[[63837,63837],\"mapped\",[35582]],[[63838,63838],\"mapped\",[20025]],[[63839,63839],\"mapped\",[23527]],[[63840,63840],\"mapped\",[24594]],[[63841,63841],\"mapped\",[29575]],[[63842,63842],\"mapped\",[30064]],[[63843,63843],\"mapped\",[21271]],[[63844,63844],\"mapped\",[30971]],[[63845,63845],\"mapped\",[20415]],[[63846,63846],\"mapped\",[24489]],[[63847,63847],\"mapped\",[19981]],[[63848,63848],\"mapped\",[27852]],[[63849,63849],\"mapped\",[25976]],[[63850,63850],\"mapped\",[32034]],[[63851,63851],\"mapped\",[21443]],[[63852,63852],\"mapped\",[22622]],[[63853,63853],\"mapped\",[30465]],[[63854,63854],\"mapped\",[33865]],[[63855,63855],\"mapped\",[35498]],[[63856,63856],\"mapped\",[27578]],[[63857,63857],\"mapped\",[36784]],[[63858,63858],\"mapped\",[27784]],[[63859,63859],\"mapped\",[25342]],[[63860,63860],\"mapped\",[33509]],[[63861,63861],\"mapped\",[25504]],[[63862,63862],\"mapped\",[30053]],[[63863,63863],\"mapped\",[20142]],[[63864,63864],\"mapped\",[20841]],[[63865,63865],\"mapped\",[20937]],[[63866,63866],\"mapped\",[26753]],[[63867,63867],\"mapped\",[31975]],[[63868,63868],\"mapped\",[33391]],[[63869,63869],\"mapped\",[35538]],[[63870,63870],\"mapped\",[37327]],[[63871,63871],\"mapped\",[21237]],[[63872,63872],\"mapped\",[21570]],[[63873,63873],\"mapped\",[22899]],[[63874,63874],\"mapped\",[24300]],[[63875,63875],\"mapped\",[26053]],[[63876,63876],\"mapped\",[28670]],[[63877,63877],\"mapped\",[31018]],[[63878,63878],\"mapped\",[38317]],[[63879,63879],\"mapped\",[39530]],[[63880,63880],\"mapped\",[40599]],[[63881,63881],\"mapped\",[40654]],[[63882,63882],\"mapped\",[21147]],[[63883,63883],\"mapped\",[26310]],[[63884,63884],\"mapped\",[27511]],[[63885,63885],\"mapped\",[36706]],[[63886,63886],\"mapped\",[24180]],[[63887,63887],\"mapped\",[24976]],[[63888,63888],\"mapped\",[25088]],[[63889,63889],\"mapped\",[25754]],[[63890,63890],\"mapped\",[28451]],[[63891,63891],\"mapped\",[29001]],[[63892,63892],\"mapped\",[29833]],[[63893,63893],\"mapped\",[31178]],[[63894,63894],\"mapped\",[32244]],[[63895,63895],\"mapped\",[32879]],[[63896,63896],\"mapped\",[36646]],[[63897,63897],\"mapped\",[34030]],[[63898,63898],\"mapped\",[36899]],[[63899,63899],\"mapped\",[37706]],[[63900,63900],\"mapped\",[21015]],[[63901,63901],\"mapped\",[21155]],[[63902,63902],\"mapped\",[21693]],[[63903,63903],\"mapped\",[28872]],[[63904,63904],\"mapped\",[35010]],[[63905,63905],\"mapped\",[35498]],[[63906,63906],\"mapped\",[24265]],[[63907,63907],\"mapped\",[24565]],[[63908,63908],\"mapped\",[25467]],[[63909,63909],\"mapped\",[27566]],[[63910,63910],\"mapped\",[31806]],[[63911,63911],\"mapped\",[29557]],[[63912,63912],\"mapped\",[20196]],[[63913,63913],\"mapped\",[22265]],[[63914,63914],\"mapped\",[23527]],[[63915,63915],\"mapped\",[23994]],[[63916,63916],\"mapped\",[24604]],[[63917,63917],\"mapped\",[29618]],[[63918,63918],\"mapped\",[29801]],[[63919,63919],\"mapped\",[32666]],[[63920,63920],\"mapped\",[32838]],[[63921,63921],\"mapped\",[37428]],[[63922,63922],\"mapped\",[38646]],[[63923,63923],\"mapped\",[38728]],[[63924,63924],\"mapped\",[38936]],[[63925,63925],\"mapped\",[20363]],[[63926,63926],\"mapped\",[31150]],[[63927,63927],\"mapped\",[37300]],[[63928,63928],\"mapped\",[38584]],[[63929,63929],\"mapped\",[24801]],[[63930,63930],\"mapped\",[20102]],[[63931,63931],\"mapped\",[20698]],[[63932,63932],\"mapped\",[23534]],[[63933,63933],\"mapped\",[23615]],[[63934,63934],\"mapped\",[26009]],[[63935,63935],\"mapped\",[27138]],[[63936,63936],\"mapped\",[29134]],[[63937,63937],\"mapped\",[30274]],[[63938,63938],\"mapped\",[34044]],[[63939,63939],\"mapped\",[36988]],[[63940,63940],\"mapped\",[40845]],[[63941,63941],\"mapped\",[26248]],[[63942,63942],\"mapped\",[38446]],[[63943,63943],\"mapped\",[21129]],[[63944,63944],\"mapped\",[26491]],[[63945,63945],\"mapped\",[26611]],[[63946,63946],\"mapped\",[27969]],[[63947,63947],\"mapped\",[28316]],[[63948,63948],\"mapped\",[29705]],[[63949,63949],\"mapped\",[30041]],[[63950,63950],\"mapped\",[30827]],[[63951,63951],\"mapped\",[32016]],[[63952,63952],\"mapped\",[39006]],[[63953,63953],\"mapped\",[20845]],[[63954,63954],\"mapped\",[25134]],[[63955,63955],\"mapped\",[38520]],[[63956,63956],\"mapped\",[20523]],[[63957,63957],\"mapped\",[23833]],[[63958,63958],\"mapped\",[28138]],[[63959,63959],\"mapped\",[36650]],[[63960,63960],\"mapped\",[24459]],[[63961,63961],\"mapped\",[24900]],[[63962,63962],\"mapped\",[26647]],[[63963,63963],\"mapped\",[29575]],[[63964,63964],\"mapped\",[38534]],[[63965,63965],\"mapped\",[21033]],[[63966,63966],\"mapped\",[21519]],[[63967,63967],\"mapped\",[23653]],[[63968,63968],\"mapped\",[26131]],[[63969,63969],\"mapped\",[26446]],[[63970,63970],\"mapped\",[26792]],[[63971,63971],\"mapped\",[27877]],[[63972,63972],\"mapped\",[29702]],[[63973,63973],\"mapped\",[30178]],[[63974,63974],\"mapped\",[32633]],[[63975,63975],\"mapped\",[35023]],[[63976,63976],\"mapped\",[35041]],[[63977,63977],\"mapped\",[37324]],[[63978,63978],\"mapped\",[38626]],[[63979,63979],\"mapped\",[21311]],[[63980,63980],\"mapped\",[28346]],[[63981,63981],\"mapped\",[21533]],[[63982,63982],\"mapped\",[29136]],[[63983,63983],\"mapped\",[29848]],[[63984,63984],\"mapped\",[34298]],[[63985,63985],\"mapped\",[38563]],[[63986,63986],\"mapped\",[40023]],[[63987,63987],\"mapped\",[40607]],[[63988,63988],\"mapped\",[26519]],[[63989,63989],\"mapped\",[28107]],[[63990,63990],\"mapped\",[33256]],[[63991,63991],\"mapped\",[31435]],[[63992,63992],\"mapped\",[31520]],[[63993,63993],\"mapped\",[31890]],[[63994,63994],\"mapped\",[29376]],[[63995,63995],\"mapped\",[28825]],[[63996,63996],\"mapped\",[35672]],[[63997,63997],\"mapped\",[20160]],[[63998,63998],\"mapped\",[33590]],[[63999,63999],\"mapped\",[21050]],[[64000,64000],\"mapped\",[20999]],[[64001,64001],\"mapped\",[24230]],[[64002,64002],\"mapped\",[25299]],[[64003,64003],\"mapped\",[31958]],[[64004,64004],\"mapped\",[23429]],[[64005,64005],\"mapped\",[27934]],[[64006,64006],\"mapped\",[26292]],[[64007,64007],\"mapped\",[36667]],[[64008,64008],\"mapped\",[34892]],[[64009,64009],\"mapped\",[38477]],[[64010,64010],\"mapped\",[35211]],[[64011,64011],\"mapped\",[24275]],[[64012,64012],\"mapped\",[20800]],[[64013,64013],\"mapped\",[21952]],[[64014,64015],\"valid\"],[[64016,64016],\"mapped\",[22618]],[[64017,64017],\"valid\"],[[64018,64018],\"mapped\",[26228]],[[64019,64020],\"valid\"],[[64021,64021],\"mapped\",[20958]],[[64022,64022],\"mapped\",[29482]],[[64023,64023],\"mapped\",[30410]],[[64024,64024],\"mapped\",[31036]],[[64025,64025],\"mapped\",[31070]],[[64026,64026],\"mapped\",[31077]],[[64027,64027],\"mapped\",[31119]],[[64028,64028],\"mapped\",[38742]],[[64029,64029],\"mapped\",[31934]],[[64030,64030],\"mapped\",[32701]],[[64031,64031],\"valid\"],[[64032,64032],\"mapped\",[34322]],[[64033,64033],\"valid\"],[[64034,64034],\"mapped\",[35576]],[[64035,64036],\"valid\"],[[64037,64037],\"mapped\",[36920]],[[64038,64038],\"mapped\",[37117]],[[64039,64041],\"valid\"],[[64042,64042],\"mapped\",[39151]],[[64043,64043],\"mapped\",[39164]],[[64044,64044],\"mapped\",[39208]],[[64045,64045],\"mapped\",[40372]],[[64046,64046],\"mapped\",[37086]],[[64047,64047],\"mapped\",[38583]],[[64048,64048],\"mapped\",[20398]],[[64049,64049],\"mapped\",[20711]],[[64050,64050],\"mapped\",[20813]],[[64051,64051],\"mapped\",[21193]],[[64052,64052],\"mapped\",[21220]],[[64053,64053],\"mapped\",[21329]],[[64054,64054],\"mapped\",[21917]],[[64055,64055],\"mapped\",[22022]],[[64056,64056],\"mapped\",[22120]],[[64057,64057],\"mapped\",[22592]],[[64058,64058],\"mapped\",[22696]],[[64059,64059],\"mapped\",[23652]],[[64060,64060],\"mapped\",[23662]],[[64061,64061],\"mapped\",[24724]],[[64062,64062],\"mapped\",[24936]],[[64063,64063],\"mapped\",[24974]],[[64064,64064],\"mapped\",[25074]],[[64065,64065],\"mapped\",[25935]],[[64066,64066],\"mapped\",[26082]],[[64067,64067],\"mapped\",[26257]],[[64068,64068],\"mapped\",[26757]],[[64069,64069],\"mapped\",[28023]],[[64070,64070],\"mapped\",[28186]],[[64071,64071],\"mapped\",[28450]],[[64072,64072],\"mapped\",[29038]],[[64073,64073],\"mapped\",[29227]],[[64074,64074],\"mapped\",[29730]],[[64075,64075],\"mapped\",[30865]],[[64076,64076],\"mapped\",[31038]],[[64077,64077],\"mapped\",[31049]],[[64078,64078],\"mapped\",[31048]],[[64079,64079],\"mapped\",[31056]],[[64080,64080],\"mapped\",[31062]],[[64081,64081],\"mapped\",[31069]],[[64082,64082],\"mapped\",[31117]],[[64083,64083],\"mapped\",[31118]],[[64084,64084],\"mapped\",[31296]],[[64085,64085],\"mapped\",[31361]],[[64086,64086],\"mapped\",[31680]],[[64087,64087],\"mapped\",[32244]],[[64088,64088],\"mapped\",[32265]],[[64089,64089],\"mapped\",[32321]],[[64090,64090],\"mapped\",[32626]],[[64091,64091],\"mapped\",[32773]],[[64092,64092],\"mapped\",[33261]],[[64093,64094],\"mapped\",[33401]],[[64095,64095],\"mapped\",[33879]],[[64096,64096],\"mapped\",[35088]],[[64097,64097],\"mapped\",[35222]],[[64098,64098],\"mapped\",[35585]],[[64099,64099],\"mapped\",[35641]],[[64100,64100],\"mapped\",[36051]],[[64101,64101],\"mapped\",[36104]],[[64102,64102],\"mapped\",[36790]],[[64103,64103],\"mapped\",[36920]],[[64104,64104],\"mapped\",[38627]],[[64105,64105],\"mapped\",[38911]],[[64106,64106],\"mapped\",[38971]],[[64107,64107],\"mapped\",[24693]],[[64108,64108],\"mapped\",[148206]],[[64109,64109],\"mapped\",[33304]],[[64110,64111],\"disallowed\"],[[64112,64112],\"mapped\",[20006]],[[64113,64113],\"mapped\",[20917]],[[64114,64114],\"mapped\",[20840]],[[64115,64115],\"mapped\",[20352]],[[64116,64116],\"mapped\",[20805]],[[64117,64117],\"mapped\",[20864]],[[64118,64118],\"mapped\",[21191]],[[64119,64119],\"mapped\",[21242]],[[64120,64120],\"mapped\",[21917]],[[64121,64121],\"mapped\",[21845]],[[64122,64122],\"mapped\",[21913]],[[64123,64123],\"mapped\",[21986]],[[64124,64124],\"mapped\",[22618]],[[64125,64125],\"mapped\",[22707]],[[64126,64126],\"mapped\",[22852]],[[64127,64127],\"mapped\",[22868]],[[64128,64128],\"mapped\",[23138]],[[64129,64129],\"mapped\",[23336]],[[64130,64130],\"mapped\",[24274]],[[64131,64131],\"mapped\",[24281]],[[64132,64132],\"mapped\",[24425]],[[64133,64133],\"mapped\",[24493]],[[64134,64134],\"mapped\",[24792]],[[64135,64135],\"mapped\",[24910]],[[64136,64136],\"mapped\",[24840]],[[64137,64137],\"mapped\",[24974]],[[64138,64138],\"mapped\",[24928]],[[64139,64139],\"mapped\",[25074]],[[64140,64140],\"mapped\",[25140]],[[64141,64141],\"mapped\",[25540]],[[64142,64142],\"mapped\",[25628]],[[64143,64143],\"mapped\",[25682]],[[64144,64144],\"mapped\",[25942]],[[64145,64145],\"mapped\",[26228]],[[64146,64146],\"mapped\",[26391]],[[64147,64147],\"mapped\",[26395]],[[64148,64148],\"mapped\",[26454]],[[64149,64149],\"mapped\",[27513]],[[64150,64150],\"mapped\",[27578]],[[64151,64151],\"mapped\",[27969]],[[64152,64152],\"mapped\",[28379]],[[64153,64153],\"mapped\",[28363]],[[64154,64154],\"mapped\",[28450]],[[64155,64155],\"mapped\",[28702]],[[64156,64156],\"mapped\",[29038]],[[64157,64157],\"mapped\",[30631]],[[64158,64158],\"mapped\",[29237]],[[64159,64159],\"mapped\",[29359]],[[64160,64160],\"mapped\",[29482]],[[64161,64161],\"mapped\",[29809]],[[64162,64162],\"mapped\",[29958]],[[64163,64163],\"mapped\",[30011]],[[64164,64164],\"mapped\",[30237]],[[64165,64165],\"mapped\",[30239]],[[64166,64166],\"mapped\",[30410]],[[64167,64167],\"mapped\",[30427]],[[64168,64168],\"mapped\",[30452]],[[64169,64169],\"mapped\",[30538]],[[64170,64170],\"mapped\",[30528]],[[64171,64171],\"mapped\",[30924]],[[64172,64172],\"mapped\",[31409]],[[64173,64173],\"mapped\",[31680]],[[64174,64174],\"mapped\",[31867]],[[64175,64175],\"mapped\",[32091]],[[64176,64176],\"mapped\",[32244]],[[64177,64177],\"mapped\",[32574]],[[64178,64178],\"mapped\",[32773]],[[64179,64179],\"mapped\",[33618]],[[64180,64180],\"mapped\",[33775]],[[64181,64181],\"mapped\",[34681]],[[64182,64182],\"mapped\",[35137]],[[64183,64183],\"mapped\",[35206]],[[64184,64184],\"mapped\",[35222]],[[64185,64185],\"mapped\",[35519]],[[64186,64186],\"mapped\",[35576]],[[64187,64187],\"mapped\",[35531]],[[64188,64188],\"mapped\",[35585]],[[64189,64189],\"mapped\",[35582]],[[64190,64190],\"mapped\",[35565]],[[64191,64191],\"mapped\",[35641]],[[64192,64192],\"mapped\",[35722]],[[64193,64193],\"mapped\",[36104]],[[64194,64194],\"mapped\",[36664]],[[64195,64195],\"mapped\",[36978]],[[64196,64196],\"mapped\",[37273]],[[64197,64197],\"mapped\",[37494]],[[64198,64198],\"mapped\",[38524]],[[64199,64199],\"mapped\",[38627]],[[64200,64200],\"mapped\",[38742]],[[64201,64201],\"mapped\",[38875]],[[64202,64202],\"mapped\",[38911]],[[64203,64203],\"mapped\",[38923]],[[64204,64204],\"mapped\",[38971]],[[64205,64205],\"mapped\",[39698]],[[64206,64206],\"mapped\",[40860]],[[64207,64207],\"mapped\",[141386]],[[64208,64208],\"mapped\",[141380]],[[64209,64209],\"mapped\",[144341]],[[64210,64210],\"mapped\",[15261]],[[64211,64211],\"mapped\",[16408]],[[64212,64212],\"mapped\",[16441]],[[64213,64213],\"mapped\",[152137]],[[64214,64214],\"mapped\",[154832]],[[64215,64215],\"mapped\",[163539]],[[64216,64216],\"mapped\",[40771]],[[64217,64217],\"mapped\",[40846]],[[64218,64255],\"disallowed\"],[[64256,64256],\"mapped\",[102,102]],[[64257,64257],\"mapped\",[102,105]],[[64258,64258],\"mapped\",[102,108]],[[64259,64259],\"mapped\",[102,102,105]],[[64260,64260],\"mapped\",[102,102,108]],[[64261,64262],\"mapped\",[115,116]],[[64263,64274],\"disallowed\"],[[64275,64275],\"mapped\",[1396,1398]],[[64276,64276],\"mapped\",[1396,1381]],[[64277,64277],\"mapped\",[1396,1387]],[[64278,64278],\"mapped\",[1406,1398]],[[64279,64279],\"mapped\",[1396,1389]],[[64280,64284],\"disallowed\"],[[64285,64285],\"mapped\",[1497,1460]],[[64286,64286],\"valid\"],[[64287,64287],\"mapped\",[1522,1463]],[[64288,64288],\"mapped\",[1506]],[[64289,64289],\"mapped\",[1488]],[[64290,64290],\"mapped\",[1491]],[[64291,64291],\"mapped\",[1492]],[[64292,64292],\"mapped\",[1499]],[[64293,64293],\"mapped\",[1500]],[[64294,64294],\"mapped\",[1501]],[[64295,64295],\"mapped\",[1512]],[[64296,64296],\"mapped\",[1514]],[[64297,64297],\"disallowed_STD3_mapped\",[43]],[[64298,64298],\"mapped\",[1513,1473]],[[64299,64299],\"mapped\",[1513,1474]],[[64300,64300],\"mapped\",[1513,1468,1473]],[[64301,64301],\"mapped\",[1513,1468,1474]],[[64302,64302],\"mapped\",[1488,1463]],[[64303,64303],\"mapped\",[1488,1464]],[[64304,64304],\"mapped\",[1488,1468]],[[64305,64305],\"mapped\",[1489,1468]],[[64306,64306],\"mapped\",[1490,1468]],[[64307,64307],\"mapped\",[1491,1468]],[[64308,64308],\"mapped\",[1492,1468]],[[64309,64309],\"mapped\",[1493,1468]],[[64310,64310],\"mapped\",[1494,1468]],[[64311,64311],\"disallowed\"],[[64312,64312],\"mapped\",[1496,1468]],[[64313,64313],\"mapped\",[1497,1468]],[[64314,64314],\"mapped\",[1498,1468]],[[64315,64315],\"mapped\",[1499,1468]],[[64316,64316],\"mapped\",[1500,1468]],[[64317,64317],\"disallowed\"],[[64318,64318],\"mapped\",[1502,1468]],[[64319,64319],\"disallowed\"],[[64320,64320],\"mapped\",[1504,1468]],[[64321,64321],\"mapped\",[1505,1468]],[[64322,64322],\"disallowed\"],[[64323,64323],\"mapped\",[1507,1468]],[[64324,64324],\"mapped\",[1508,1468]],[[64325,64325],\"disallowed\"],[[64326,64326],\"mapped\",[1510,1468]],[[64327,64327],\"mapped\",[1511,1468]],[[64328,64328],\"mapped\",[1512,1468]],[[64329,64329],\"mapped\",[1513,1468]],[[64330,64330],\"mapped\",[1514,1468]],[[64331,64331],\"mapped\",[1493,1465]],[[64332,64332],\"mapped\",[1489,1471]],[[64333,64333],\"mapped\",[1499,1471]],[[64334,64334],\"mapped\",[1508,1471]],[[64335,64335],\"mapped\",[1488,1500]],[[64336,64337],\"mapped\",[1649]],[[64338,64341],\"mapped\",[1659]],[[64342,64345],\"mapped\",[1662]],[[64346,64349],\"mapped\",[1664]],[[64350,64353],\"mapped\",[1658]],[[64354,64357],\"mapped\",[1663]],[[64358,64361],\"mapped\",[1657]],[[64362,64365],\"mapped\",[1700]],[[64366,64369],\"mapped\",[1702]],[[64370,64373],\"mapped\",[1668]],[[64374,64377],\"mapped\",[1667]],[[64378,64381],\"mapped\",[1670]],[[64382,64385],\"mapped\",[1671]],[[64386,64387],\"mapped\",[1677]],[[64388,64389],\"mapped\",[1676]],[[64390,64391],\"mapped\",[1678]],[[64392,64393],\"mapped\",[1672]],[[64394,64395],\"mapped\",[1688]],[[64396,64397],\"mapped\",[1681]],[[64398,64401],\"mapped\",[1705]],[[64402,64405],\"mapped\",[1711]],[[64406,64409],\"mapped\",[1715]],[[64410,64413],\"mapped\",[1713]],[[64414,64415],\"mapped\",[1722]],[[64416,64419],\"mapped\",[1723]],[[64420,64421],\"mapped\",[1728]],[[64422,64425],\"mapped\",[1729]],[[64426,64429],\"mapped\",[1726]],[[64430,64431],\"mapped\",[1746]],[[64432,64433],\"mapped\",[1747]],[[64434,64449],\"valid\",[],\"NV8\"],[[64450,64466],\"disallowed\"],[[64467,64470],\"mapped\",[1709]],[[64471,64472],\"mapped\",[1735]],[[64473,64474],\"mapped\",[1734]],[[64475,64476],\"mapped\",[1736]],[[64477,64477],\"mapped\",[1735,1652]],[[64478,64479],\"mapped\",[1739]],[[64480,64481],\"mapped\",[1733]],[[64482,64483],\"mapped\",[1737]],[[64484,64487],\"mapped\",[1744]],[[64488,64489],\"mapped\",[1609]],[[64490,64491],\"mapped\",[1574,1575]],[[64492,64493],\"mapped\",[1574,1749]],[[64494,64495],\"mapped\",[1574,1608]],[[64496,64497],\"mapped\",[1574,1735]],[[64498,64499],\"mapped\",[1574,1734]],[[64500,64501],\"mapped\",[1574,1736]],[[64502,64504],\"mapped\",[1574,1744]],[[64505,64507],\"mapped\",[1574,1609]],[[64508,64511],\"mapped\",[1740]],[[64512,64512],\"mapped\",[1574,1580]],[[64513,64513],\"mapped\",[1574,1581]],[[64514,64514],\"mapped\",[1574,1605]],[[64515,64515],\"mapped\",[1574,1609]],[[64516,64516],\"mapped\",[1574,1610]],[[64517,64517],\"mapped\",[1576,1580]],[[64518,64518],\"mapped\",[1576,1581]],[[64519,64519],\"mapped\",[1576,1582]],[[64520,64520],\"mapped\",[1576,1605]],[[64521,64521],\"mapped\",[1576,1609]],[[64522,64522],\"mapped\",[1576,1610]],[[64523,64523],\"mapped\",[1578,1580]],[[64524,64524],\"mapped\",[1578,1581]],[[64525,64525],\"mapped\",[1578,1582]],[[64526,64526],\"mapped\",[1578,1605]],[[64527,64527],\"mapped\",[1578,1609]],[[64528,64528],\"mapped\",[1578,1610]],[[64529,64529],\"mapped\",[1579,1580]],[[64530,64530],\"mapped\",[1579,1605]],[[64531,64531],\"mapped\",[1579,1609]],[[64532,64532],\"mapped\",[1579,1610]],[[64533,64533],\"mapped\",[1580,1581]],[[64534,64534],\"mapped\",[1580,1605]],[[64535,64535],\"mapped\",[1581,1580]],[[64536,64536],\"mapped\",[1581,1605]],[[64537,64537],\"mapped\",[1582,1580]],[[64538,64538],\"mapped\",[1582,1581]],[[64539,64539],\"mapped\",[1582,1605]],[[64540,64540],\"mapped\",[1587,1580]],[[64541,64541],\"mapped\",[1587,1581]],[[64542,64542],\"mapped\",[1587,1582]],[[64543,64543],\"mapped\",[1587,1605]],[[64544,64544],\"mapped\",[1589,1581]],[[64545,64545],\"mapped\",[1589,1605]],[[64546,64546],\"mapped\",[1590,1580]],[[64547,64547],\"mapped\",[1590,1581]],[[64548,64548],\"mapped\",[1590,1582]],[[64549,64549],\"mapped\",[1590,1605]],[[64550,64550],\"mapped\",[1591,1581]],[[64551,64551],\"mapped\",[1591,1605]],[[64552,64552],\"mapped\",[1592,1605]],[[64553,64553],\"mapped\",[1593,1580]],[[64554,64554],\"mapped\",[1593,1605]],[[64555,64555],\"mapped\",[1594,1580]],[[64556,64556],\"mapped\",[1594,1605]],[[64557,64557],\"mapped\",[1601,1580]],[[64558,64558],\"mapped\",[1601,1581]],[[64559,64559],\"mapped\",[1601,1582]],[[64560,64560],\"mapped\",[1601,1605]],[[64561,64561],\"mapped\",[1601,1609]],[[64562,64562],\"mapped\",[1601,1610]],[[64563,64563],\"mapped\",[1602,1581]],[[64564,64564],\"mapped\",[1602,1605]],[[64565,64565],\"mapped\",[1602,1609]],[[64566,64566],\"mapped\",[1602,1610]],[[64567,64567],\"mapped\",[1603,1575]],[[64568,64568],\"mapped\",[1603,1580]],[[64569,64569],\"mapped\",[1603,1581]],[[64570,64570],\"mapped\",[1603,1582]],[[64571,64571],\"mapped\",[1603,1604]],[[64572,64572],\"mapped\",[1603,1605]],[[64573,64573],\"mapped\",[1603,1609]],[[64574,64574],\"mapped\",[1603,1610]],[[64575,64575],\"mapped\",[1604,1580]],[[64576,64576],\"mapped\",[1604,1581]],[[64577,64577],\"mapped\",[1604,1582]],[[64578,64578],\"mapped\",[1604,1605]],[[64579,64579],\"mapped\",[1604,1609]],[[64580,64580],\"mapped\",[1604,1610]],[[64581,64581],\"mapped\",[1605,1580]],[[64582,64582],\"mapped\",[1605,1581]],[[64583,64583],\"mapped\",[1605,1582]],[[64584,64584],\"mapped\",[1605,1605]],[[64585,64585],\"mapped\",[1605,1609]],[[64586,64586],\"mapped\",[1605,1610]],[[64587,64587],\"mapped\",[1606,1580]],[[64588,64588],\"mapped\",[1606,1581]],[[64589,64589],\"mapped\",[1606,1582]],[[64590,64590],\"mapped\",[1606,1605]],[[64591,64591],\"mapped\",[1606,1609]],[[64592,64592],\"mapped\",[1606,1610]],[[64593,64593],\"mapped\",[1607,1580]],[[64594,64594],\"mapped\",[1607,1605]],[[64595,64595],\"mapped\",[1607,1609]],[[64596,64596],\"mapped\",[1607,1610]],[[64597,64597],\"mapped\",[1610,1580]],[[64598,64598],\"mapped\",[1610,1581]],[[64599,64599],\"mapped\",[1610,1582]],[[64600,64600],\"mapped\",[1610,1605]],[[64601,64601],\"mapped\",[1610,1609]],[[64602,64602],\"mapped\",[1610,1610]],[[64603,64603],\"mapped\",[1584,1648]],[[64604,64604],\"mapped\",[1585,1648]],[[64605,64605],\"mapped\",[1609,1648]],[[64606,64606],\"disallowed_STD3_mapped\",[32,1612,1617]],[[64607,64607],\"disallowed_STD3_mapped\",[32,1613,1617]],[[64608,64608],\"disallowed_STD3_mapped\",[32,1614,1617]],[[64609,64609],\"disallowed_STD3_mapped\",[32,1615,1617]],[[64610,64610],\"disallowed_STD3_mapped\",[32,1616,1617]],[[64611,64611],\"disallowed_STD3_mapped\",[32,1617,1648]],[[64612,64612],\"mapped\",[1574,1585]],[[64613,64613],\"mapped\",[1574,1586]],[[64614,64614],\"mapped\",[1574,1605]],[[64615,64615],\"mapped\",[1574,1606]],[[64616,64616],\"mapped\",[1574,1609]],[[64617,64617],\"mapped\",[1574,1610]],[[64618,64618],\"mapped\",[1576,1585]],[[64619,64619],\"mapped\",[1576,1586]],[[64620,64620],\"mapped\",[1576,1605]],[[64621,64621],\"mapped\",[1576,1606]],[[64622,64622],\"mapped\",[1576,1609]],[[64623,64623],\"mapped\",[1576,1610]],[[64624,64624],\"mapped\",[1578,1585]],[[64625,64625],\"mapped\",[1578,1586]],[[64626,64626],\"mapped\",[1578,1605]],[[64627,64627],\"mapped\",[1578,1606]],[[64628,64628],\"mapped\",[1578,1609]],[[64629,64629],\"mapped\",[1578,1610]],[[64630,64630],\"mapped\",[1579,1585]],[[64631,64631],\"mapped\",[1579,1586]],[[64632,64632],\"mapped\",[1579,1605]],[[64633,64633],\"mapped\",[1579,1606]],[[64634,64634],\"mapped\",[1579,1609]],[[64635,64635],\"mapped\",[1579,1610]],[[64636,64636],\"mapped\",[1601,1609]],[[64637,64637],\"mapped\",[1601,1610]],[[64638,64638],\"mapped\",[1602,1609]],[[64639,64639],\"mapped\",[1602,1610]],[[64640,64640],\"mapped\",[1603,1575]],[[64641,64641],\"mapped\",[1603,1604]],[[64642,64642],\"mapped\",[1603,1605]],[[64643,64643],\"mapped\",[1603,1609]],[[64644,64644],\"mapped\",[1603,1610]],[[64645,64645],\"mapped\",[1604,1605]],[[64646,64646],\"mapped\",[1604,1609]],[[64647,64647],\"mapped\",[1604,1610]],[[64648,64648],\"mapped\",[1605,1575]],[[64649,64649],\"mapped\",[1605,1605]],[[64650,64650],\"mapped\",[1606,1585]],[[64651,64651],\"mapped\",[1606,1586]],[[64652,64652],\"mapped\",[1606,1605]],[[64653,64653],\"mapped\",[1606,1606]],[[64654,64654],\"mapped\",[1606,1609]],[[64655,64655],\"mapped\",[1606,1610]],[[64656,64656],\"mapped\",[1609,1648]],[[64657,64657],\"mapped\",[1610,1585]],[[64658,64658],\"mapped\",[1610,1586]],[[64659,64659],\"mapped\",[1610,1605]],[[64660,64660],\"mapped\",[1610,1606]],[[64661,64661],\"mapped\",[1610,1609]],[[64662,64662],\"mapped\",[1610,1610]],[[64663,64663],\"mapped\",[1574,1580]],[[64664,64664],\"mapped\",[1574,1581]],[[64665,64665],\"mapped\",[1574,1582]],[[64666,64666],\"mapped\",[1574,1605]],[[64667,64667],\"mapped\",[1574,1607]],[[64668,64668],\"mapped\",[1576,1580]],[[64669,64669],\"mapped\",[1576,1581]],[[64670,64670],\"mapped\",[1576,1582]],[[64671,64671],\"mapped\",[1576,1605]],[[64672,64672],\"mapped\",[1576,1607]],[[64673,64673],\"mapped\",[1578,1580]],[[64674,64674],\"mapped\",[1578,1581]],[[64675,64675],\"mapped\",[1578,1582]],[[64676,64676],\"mapped\",[1578,1605]],[[64677,64677],\"mapped\",[1578,1607]],[[64678,64678],\"mapped\",[1579,1605]],[[64679,64679],\"mapped\",[1580,1581]],[[64680,64680],\"mapped\",[1580,1605]],[[64681,64681],\"mapped\",[1581,1580]],[[64682,64682],\"mapped\",[1581,1605]],[[64683,64683],\"mapped\",[1582,1580]],[[64684,64684],\"mapped\",[1582,1605]],[[64685,64685],\"mapped\",[1587,1580]],[[64686,64686],\"mapped\",[1587,1581]],[[64687,64687],\"mapped\",[1587,1582]],[[64688,64688],\"mapped\",[1587,1605]],[[64689,64689],\"mapped\",[1589,1581]],[[64690,64690],\"mapped\",[1589,1582]],[[64691,64691],\"mapped\",[1589,1605]],[[64692,64692],\"mapped\",[1590,1580]],[[64693,64693],\"mapped\",[1590,1581]],[[64694,64694],\"mapped\",[1590,1582]],[[64695,64695],\"mapped\",[1590,1605]],[[64696,64696],\"mapped\",[1591,1581]],[[64697,64697],\"mapped\",[1592,1605]],[[64698,64698],\"mapped\",[1593,1580]],[[64699,64699],\"mapped\",[1593,1605]],[[64700,64700],\"mapped\",[1594,1580]],[[64701,64701],\"mapped\",[1594,1605]],[[64702,64702],\"mapped\",[1601,1580]],[[64703,64703],\"mapped\",[1601,1581]],[[64704,64704],\"mapped\",[1601,1582]],[[64705,64705],\"mapped\",[1601,1605]],[[64706,64706],\"mapped\",[1602,1581]],[[64707,64707],\"mapped\",[1602,1605]],[[64708,64708],\"mapped\",[1603,1580]],[[64709,64709],\"mapped\",[1603,1581]],[[64710,64710],\"mapped\",[1603,1582]],[[64711,64711],\"mapped\",[1603,1604]],[[64712,64712],\"mapped\",[1603,1605]],[[64713,64713],\"mapped\",[1604,1580]],[[64714,64714],\"mapped\",[1604,1581]],[[64715,64715],\"mapped\",[1604,1582]],[[64716,64716],\"mapped\",[1604,1605]],[[64717,64717],\"mapped\",[1604,1607]],[[64718,64718],\"mapped\",[1605,1580]],[[64719,64719],\"mapped\",[1605,1581]],[[64720,64720],\"mapped\",[1605,1582]],[[64721,64721],\"mapped\",[1605,1605]],[[64722,64722],\"mapped\",[1606,1580]],[[64723,64723],\"mapped\",[1606,1581]],[[64724,64724],\"mapped\",[1606,1582]],[[64725,64725],\"mapped\",[1606,1605]],[[64726,64726],\"mapped\",[1606,1607]],[[64727,64727],\"mapped\",[1607,1580]],[[64728,64728],\"mapped\",[1607,1605]],[[64729,64729],\"mapped\",[1607,1648]],[[64730,64730],\"mapped\",[1610,1580]],[[64731,64731],\"mapped\",[1610,1581]],[[64732,64732],\"mapped\",[1610,1582]],[[64733,64733],\"mapped\",[1610,1605]],[[64734,64734],\"mapped\",[1610,1607]],[[64735,64735],\"mapped\",[1574,1605]],[[64736,64736],\"mapped\",[1574,1607]],[[64737,64737],\"mapped\",[1576,1605]],[[64738,64738],\"mapped\",[1576,1607]],[[64739,64739],\"mapped\",[1578,1605]],[[64740,64740],\"mapped\",[1578,1607]],[[64741,64741],\"mapped\",[1579,1605]],[[64742,64742],\"mapped\",[1579,1607]],[[64743,64743],\"mapped\",[1587,1605]],[[64744,64744],\"mapped\",[1587,1607]],[[64745,64745],\"mapped\",[1588,1605]],[[64746,64746],\"mapped\",[1588,1607]],[[64747,64747],\"mapped\",[1603,1604]],[[64748,64748],\"mapped\",[1603,1605]],[[64749,64749],\"mapped\",[1604,1605]],[[64750,64750],\"mapped\",[1606,1605]],[[64751,64751],\"mapped\",[1606,1607]],[[64752,64752],\"mapped\",[1610,1605]],[[64753,64753],\"mapped\",[1610,1607]],[[64754,64754],\"mapped\",[1600,1614,1617]],[[64755,64755],\"mapped\",[1600,1615,1617]],[[64756,64756],\"mapped\",[1600,1616,1617]],[[64757,64757],\"mapped\",[1591,1609]],[[64758,64758],\"mapped\",[1591,1610]],[[64759,64759],\"mapped\",[1593,1609]],[[64760,64760],\"mapped\",[1593,1610]],[[64761,64761],\"mapped\",[1594,1609]],[[64762,64762],\"mapped\",[1594,1610]],[[64763,64763],\"mapped\",[1587,1609]],[[64764,64764],\"mapped\",[1587,1610]],[[64765,64765],\"mapped\",[1588,1609]],[[64766,64766],\"mapped\",[1588,1610]],[[64767,64767],\"mapped\",[1581,1609]],[[64768,64768],\"mapped\",[1581,1610]],[[64769,64769],\"mapped\",[1580,1609]],[[64770,64770],\"mapped\",[1580,1610]],[[64771,64771],\"mapped\",[1582,1609]],[[64772,64772],\"mapped\",[1582,1610]],[[64773,64773],\"mapped\",[1589,1609]],[[64774,64774],\"mapped\",[1589,1610]],[[64775,64775],\"mapped\",[1590,1609]],[[64776,64776],\"mapped\",[1590,1610]],[[64777,64777],\"mapped\",[1588,1580]],[[64778,64778],\"mapped\",[1588,1581]],[[64779,64779],\"mapped\",[1588,1582]],[[64780,64780],\"mapped\",[1588,1605]],[[64781,64781],\"mapped\",[1588,1585]],[[64782,64782],\"mapped\",[1587,1585]],[[64783,64783],\"mapped\",[1589,1585]],[[64784,64784],\"mapped\",[1590,1585]],[[64785,64785],\"mapped\",[1591,1609]],[[64786,64786],\"mapped\",[1591,1610]],[[64787,64787],\"mapped\",[1593,1609]],[[64788,64788],\"mapped\",[1593,1610]],[[64789,64789],\"mapped\",[1594,1609]],[[64790,64790],\"mapped\",[1594,1610]],[[64791,64791],\"mapped\",[1587,1609]],[[64792,64792],\"mapped\",[1587,1610]],[[64793,64793],\"mapped\",[1588,1609]],[[64794,64794],\"mapped\",[1588,1610]],[[64795,64795],\"mapped\",[1581,1609]],[[64796,64796],\"mapped\",[1581,1610]],[[64797,64797],\"mapped\",[1580,1609]],[[64798,64798],\"mapped\",[1580,1610]],[[64799,64799],\"mapped\",[1582,1609]],[[64800,64800],\"mapped\",[1582,1610]],[[64801,64801],\"mapped\",[1589,1609]],[[64802,64802],\"mapped\",[1589,1610]],[[64803,64803],\"mapped\",[1590,1609]],[[64804,64804],\"mapped\",[1590,1610]],[[64805,64805],\"mapped\",[1588,1580]],[[64806,64806],\"mapped\",[1588,1581]],[[64807,64807],\"mapped\",[1588,1582]],[[64808,64808],\"mapped\",[1588,1605]],[[64809,64809],\"mapped\",[1588,1585]],[[64810,64810],\"mapped\",[1587,1585]],[[64811,64811],\"mapped\",[1589,1585]],[[64812,64812],\"mapped\",[1590,1585]],[[64813,64813],\"mapped\",[1588,1580]],[[64814,64814],\"mapped\",[1588,1581]],[[64815,64815],\"mapped\",[1588,1582]],[[64816,64816],\"mapped\",[1588,1605]],[[64817,64817],\"mapped\",[1587,1607]],[[64818,64818],\"mapped\",[1588,1607]],[[64819,64819],\"mapped\",[1591,1605]],[[64820,64820],\"mapped\",[1587,1580]],[[64821,64821],\"mapped\",[1587,1581]],[[64822,64822],\"mapped\",[1587,1582]],[[64823,64823],\"mapped\",[1588,1580]],[[64824,64824],\"mapped\",[1588,1581]],[[64825,64825],\"mapped\",[1588,1582]],[[64826,64826],\"mapped\",[1591,1605]],[[64827,64827],\"mapped\",[1592,1605]],[[64828,64829],\"mapped\",[1575,1611]],[[64830,64831],\"valid\",[],\"NV8\"],[[64832,64847],\"disallowed\"],[[64848,64848],\"mapped\",[1578,1580,1605]],[[64849,64850],\"mapped\",[1578,1581,1580]],[[64851,64851],\"mapped\",[1578,1581,1605]],[[64852,64852],\"mapped\",[1578,1582,1605]],[[64853,64853],\"mapped\",[1578,1605,1580]],[[64854,64854],\"mapped\",[1578,1605,1581]],[[64855,64855],\"mapped\",[1578,1605,1582]],[[64856,64857],\"mapped\",[1580,1605,1581]],[[64858,64858],\"mapped\",[1581,1605,1610]],[[64859,64859],\"mapped\",[1581,1605,1609]],[[64860,64860],\"mapped\",[1587,1581,1580]],[[64861,64861],\"mapped\",[1587,1580,1581]],[[64862,64862],\"mapped\",[1587,1580,1609]],[[64863,64864],\"mapped\",[1587,1605,1581]],[[64865,64865],\"mapped\",[1587,1605,1580]],[[64866,64867],\"mapped\",[1587,1605,1605]],[[64868,64869],\"mapped\",[1589,1581,1581]],[[64870,64870],\"mapped\",[1589,1605,1605]],[[64871,64872],\"mapped\",[1588,1581,1605]],[[64873,64873],\"mapped\",[1588,1580,1610]],[[64874,64875],\"mapped\",[1588,1605,1582]],[[64876,64877],\"mapped\",[1588,1605,1605]],[[64878,64878],\"mapped\",[1590,1581,1609]],[[64879,64880],\"mapped\",[1590,1582,1605]],[[64881,64882],\"mapped\",[1591,1605,1581]],[[64883,64883],\"mapped\",[1591,1605,1605]],[[64884,64884],\"mapped\",[1591,1605,1610]],[[64885,64885],\"mapped\",[1593,1580,1605]],[[64886,64887],\"mapped\",[1593,1605,1605]],[[64888,64888],\"mapped\",[1593,1605,1609]],[[64889,64889],\"mapped\",[1594,1605,1605]],[[64890,64890],\"mapped\",[1594,1605,1610]],[[64891,64891],\"mapped\",[1594,1605,1609]],[[64892,64893],\"mapped\",[1601,1582,1605]],[[64894,64894],\"mapped\",[1602,1605,1581]],[[64895,64895],\"mapped\",[1602,1605,1605]],[[64896,64896],\"mapped\",[1604,1581,1605]],[[64897,64897],\"mapped\",[1604,1581,1610]],[[64898,64898],\"mapped\",[1604,1581,1609]],[[64899,64900],\"mapped\",[1604,1580,1580]],[[64901,64902],\"mapped\",[1604,1582,1605]],[[64903,64904],\"mapped\",[1604,1605,1581]],[[64905,64905],\"mapped\",[1605,1581,1580]],[[64906,64906],\"mapped\",[1605,1581,1605]],[[64907,64907],\"mapped\",[1605,1581,1610]],[[64908,64908],\"mapped\",[1605,1580,1581]],[[64909,64909],\"mapped\",[1605,1580,1605]],[[64910,64910],\"mapped\",[1605,1582,1580]],[[64911,64911],\"mapped\",[1605,1582,1605]],[[64912,64913],\"disallowed\"],[[64914,64914],\"mapped\",[1605,1580,1582]],[[64915,64915],\"mapped\",[1607,1605,1580]],[[64916,64916],\"mapped\",[1607,1605,1605]],[[64917,64917],\"mapped\",[1606,1581,1605]],[[64918,64918],\"mapped\",[1606,1581,1609]],[[64919,64920],\"mapped\",[1606,1580,1605]],[[64921,64921],\"mapped\",[1606,1580,1609]],[[64922,64922],\"mapped\",[1606,1605,1610]],[[64923,64923],\"mapped\",[1606,1605,1609]],[[64924,64925],\"mapped\",[1610,1605,1605]],[[64926,64926],\"mapped\",[1576,1582,1610]],[[64927,64927],\"mapped\",[1578,1580,1610]],[[64928,64928],\"mapped\",[1578,1580,1609]],[[64929,64929],\"mapped\",[1578,1582,1610]],[[64930,64930],\"mapped\",[1578,1582,1609]],[[64931,64931],\"mapped\",[1578,1605,1610]],[[64932,64932],\"mapped\",[1578,1605,1609]],[[64933,64933],\"mapped\",[1580,1605,1610]],[[64934,64934],\"mapped\",[1580,1581,1609]],[[64935,64935],\"mapped\",[1580,1605,1609]],[[64936,64936],\"mapped\",[1587,1582,1609]],[[64937,64937],\"mapped\",[1589,1581,1610]],[[64938,64938],\"mapped\",[1588,1581,1610]],[[64939,64939],\"mapped\",[1590,1581,1610]],[[64940,64940],\"mapped\",[1604,1580,1610]],[[64941,64941],\"mapped\",[1604,1605,1610]],[[64942,64942],\"mapped\",[1610,1581,1610]],[[64943,64943],\"mapped\",[1610,1580,1610]],[[64944,64944],\"mapped\",[1610,1605,1610]],[[64945,64945],\"mapped\",[1605,1605,1610]],[[64946,64946],\"mapped\",[1602,1605,1610]],[[64947,64947],\"mapped\",[1606,1581,1610]],[[64948,64948],\"mapped\",[1602,1605,1581]],[[64949,64949],\"mapped\",[1604,1581,1605]],[[64950,64950],\"mapped\",[1593,1605,1610]],[[64951,64951],\"mapped\",[1603,1605,1610]],[[64952,64952],\"mapped\",[1606,1580,1581]],[[64953,64953],\"mapped\",[1605,1582,1610]],[[64954,64954],\"mapped\",[1604,1580,1605]],[[64955,64955],\"mapped\",[1603,1605,1605]],[[64956,64956],\"mapped\",[1604,1580,1605]],[[64957,64957],\"mapped\",[1606,1580,1581]],[[64958,64958],\"mapped\",[1580,1581,1610]],[[64959,64959],\"mapped\",[1581,1580,1610]],[[64960,64960],\"mapped\",[1605,1580,1610]],[[64961,64961],\"mapped\",[1601,1605,1610]],[[64962,64962],\"mapped\",[1576,1581,1610]],[[64963,64963],\"mapped\",[1603,1605,1605]],[[64964,64964],\"mapped\",[1593,1580,1605]],[[64965,64965],\"mapped\",[1589,1605,1605]],[[64966,64966],\"mapped\",[1587,1582,1610]],[[64967,64967],\"mapped\",[1606,1580,1610]],[[64968,64975],\"disallowed\"],[[64976,65007],\"disallowed\"],[[65008,65008],\"mapped\",[1589,1604,1746]],[[65009,65009],\"mapped\",[1602,1604,1746]],[[65010,65010],\"mapped\",[1575,1604,1604,1607]],[[65011,65011],\"mapped\",[1575,1603,1576,1585]],[[65012,65012],\"mapped\",[1605,1581,1605,1583]],[[65013,65013],\"mapped\",[1589,1604,1593,1605]],[[65014,65014],\"mapped\",[1585,1587,1608,1604]],[[65015,65015],\"mapped\",[1593,1604,1610,1607]],[[65016,65016],\"mapped\",[1608,1587,1604,1605]],[[65017,65017],\"mapped\",[1589,1604,1609]],[[65018,65018],\"disallowed_STD3_mapped\",[1589,1604,1609,32,1575,1604,1604,1607,32,1593,1604,1610,1607,32,1608,1587,1604,1605]],[[65019,65019],\"disallowed_STD3_mapped\",[1580,1604,32,1580,1604,1575,1604,1607]],[[65020,65020],\"mapped\",[1585,1740,1575,1604]],[[65021,65021],\"valid\",[],\"NV8\"],[[65022,65023],\"disallowed\"],[[65024,65039],\"ignored\"],[[65040,65040],\"disallowed_STD3_mapped\",[44]],[[65041,65041],\"mapped\",[12289]],[[65042,65042],\"disallowed\"],[[65043,65043],\"disallowed_STD3_mapped\",[58]],[[65044,65044],\"disallowed_STD3_mapped\",[59]],[[65045,65045],\"disallowed_STD3_mapped\",[33]],[[65046,65046],\"disallowed_STD3_mapped\",[63]],[[65047,65047],\"mapped\",[12310]],[[65048,65048],\"mapped\",[12311]],[[65049,65049],\"disallowed\"],[[65050,65055],\"disallowed\"],[[65056,65059],\"valid\"],[[65060,65062],\"valid\"],[[65063,65069],\"valid\"],[[65070,65071],\"valid\"],[[65072,65072],\"disallowed\"],[[65073,65073],\"mapped\",[8212]],[[65074,65074],\"mapped\",[8211]],[[65075,65076],\"disallowed_STD3_mapped\",[95]],[[65077,65077],\"disallowed_STD3_mapped\",[40]],[[65078,65078],\"disallowed_STD3_mapped\",[41]],[[65079,65079],\"disallowed_STD3_mapped\",[123]],[[65080,65080],\"disallowed_STD3_mapped\",[125]],[[65081,65081],\"mapped\",[12308]],[[65082,65082],\"mapped\",[12309]],[[65083,65083],\"mapped\",[12304]],[[65084,65084],\"mapped\",[12305]],[[65085,65085],\"mapped\",[12298]],[[65086,65086],\"mapped\",[12299]],[[65087,65087],\"mapped\",[12296]],[[65088,65088],\"mapped\",[12297]],[[65089,65089],\"mapped\",[12300]],[[65090,65090],\"mapped\",[12301]],[[65091,65091],\"mapped\",[12302]],[[65092,65092],\"mapped\",[12303]],[[65093,65094],\"valid\",[],\"NV8\"],[[65095,65095],\"disallowed_STD3_mapped\",[91]],[[65096,65096],\"disallowed_STD3_mapped\",[93]],[[65097,65100],\"disallowed_STD3_mapped\",[32,773]],[[65101,65103],\"disallowed_STD3_mapped\",[95]],[[65104,65104],\"disallowed_STD3_mapped\",[44]],[[65105,65105],\"mapped\",[12289]],[[65106,65106],\"disallowed\"],[[65107,65107],\"disallowed\"],[[65108,65108],\"disallowed_STD3_mapped\",[59]],[[65109,65109],\"disallowed_STD3_mapped\",[58]],[[65110,65110],\"disallowed_STD3_mapped\",[63]],[[65111,65111],\"disallowed_STD3_mapped\",[33]],[[65112,65112],\"mapped\",[8212]],[[65113,65113],\"disallowed_STD3_mapped\",[40]],[[65114,65114],\"disallowed_STD3_mapped\",[41]],[[65115,65115],\"disallowed_STD3_mapped\",[123]],[[65116,65116],\"disallowed_STD3_mapped\",[125]],[[65117,65117],\"mapped\",[12308]],[[65118,65118],\"mapped\",[12309]],[[65119,65119],\"disallowed_STD3_mapped\",[35]],[[65120,65120],\"disallowed_STD3_mapped\",[38]],[[65121,65121],\"disallowed_STD3_mapped\",[42]],[[65122,65122],\"disallowed_STD3_mapped\",[43]],[[65123,65123],\"mapped\",[45]],[[65124,65124],\"disallowed_STD3_mapped\",[60]],[[65125,65125],\"disallowed_STD3_mapped\",[62]],[[65126,65126],\"disallowed_STD3_mapped\",[61]],[[65127,65127],\"disallowed\"],[[65128,65128],\"disallowed_STD3_mapped\",[92]],[[65129,65129],\"disallowed_STD3_mapped\",[36]],[[65130,65130],\"disallowed_STD3_mapped\",[37]],[[65131,65131],\"disallowed_STD3_mapped\",[64]],[[65132,65135],\"disallowed\"],[[65136,65136],\"disallowed_STD3_mapped\",[32,1611]],[[65137,65137],\"mapped\",[1600,1611]],[[65138,65138],\"disallowed_STD3_mapped\",[32,1612]],[[65139,65139],\"valid\"],[[65140,65140],\"disallowed_STD3_mapped\",[32,1613]],[[65141,65141],\"disallowed\"],[[65142,65142],\"disallowed_STD3_mapped\",[32,1614]],[[65143,65143],\"mapped\",[1600,1614]],[[65144,65144],\"disallowed_STD3_mapped\",[32,1615]],[[65145,65145],\"mapped\",[1600,1615]],[[65146,65146],\"disallowed_STD3_mapped\",[32,1616]],[[65147,65147],\"mapped\",[1600,1616]],[[65148,65148],\"disallowed_STD3_mapped\",[32,1617]],[[65149,65149],\"mapped\",[1600,1617]],[[65150,65150],\"disallowed_STD3_mapped\",[32,1618]],[[65151,65151],\"mapped\",[1600,1618]],[[65152,65152],\"mapped\",[1569]],[[65153,65154],\"mapped\",[1570]],[[65155,65156],\"mapped\",[1571]],[[65157,65158],\"mapped\",[1572]],[[65159,65160],\"mapped\",[1573]],[[65161,65164],\"mapped\",[1574]],[[65165,65166],\"mapped\",[1575]],[[65167,65170],\"mapped\",[1576]],[[65171,65172],\"mapped\",[1577]],[[65173,65176],\"mapped\",[1578]],[[65177,65180],\"mapped\",[1579]],[[65181,65184],\"mapped\",[1580]],[[65185,65188],\"mapped\",[1581]],[[65189,65192],\"mapped\",[1582]],[[65193,65194],\"mapped\",[1583]],[[65195,65196],\"mapped\",[1584]],[[65197,65198],\"mapped\",[1585]],[[65199,65200],\"mapped\",[1586]],[[65201,65204],\"mapped\",[1587]],[[65205,65208],\"mapped\",[1588]],[[65209,65212],\"mapped\",[1589]],[[65213,65216],\"mapped\",[1590]],[[65217,65220],\"mapped\",[1591]],[[65221,65224],\"mapped\",[1592]],[[65225,65228],\"mapped\",[1593]],[[65229,65232],\"mapped\",[1594]],[[65233,65236],\"mapped\",[1601]],[[65237,65240],\"mapped\",[1602]],[[65241,65244],\"mapped\",[1603]],[[65245,65248],\"mapped\",[1604]],[[65249,65252],\"mapped\",[1605]],[[65253,65256],\"mapped\",[1606]],[[65257,65260],\"mapped\",[1607]],[[65261,65262],\"mapped\",[1608]],[[65263,65264],\"mapped\",[1609]],[[65265,65268],\"mapped\",[1610]],[[65269,65270],\"mapped\",[1604,1570]],[[65271,65272],\"mapped\",[1604,1571]],[[65273,65274],\"mapped\",[1604,1573]],[[65275,65276],\"mapped\",[1604,1575]],[[65277,65278],\"disallowed\"],[[65279,65279],\"ignored\"],[[65280,65280],\"disallowed\"],[[65281,65281],\"disallowed_STD3_mapped\",[33]],[[65282,65282],\"disallowed_STD3_mapped\",[34]],[[65283,65283],\"disallowed_STD3_mapped\",[35]],[[65284,65284],\"disallowed_STD3_mapped\",[36]],[[65285,65285],\"disallowed_STD3_mapped\",[37]],[[65286,65286],\"disallowed_STD3_mapped\",[38]],[[65287,65287],\"disallowed_STD3_mapped\",[39]],[[65288,65288],\"disallowed_STD3_mapped\",[40]],[[65289,65289],\"disallowed_STD3_mapped\",[41]],[[65290,65290],\"disallowed_STD3_mapped\",[42]],[[65291,65291],\"disallowed_STD3_mapped\",[43]],[[65292,65292],\"disallowed_STD3_mapped\",[44]],[[65293,65293],\"mapped\",[45]],[[65294,65294],\"mapped\",[46]],[[65295,65295],\"disallowed_STD3_mapped\",[47]],[[65296,65296],\"mapped\",[48]],[[65297,65297],\"mapped\",[49]],[[65298,65298],\"mapped\",[50]],[[65299,65299],\"mapped\",[51]],[[65300,65300],\"mapped\",[52]],[[65301,65301],\"mapped\",[53]],[[65302,65302],\"mapped\",[54]],[[65303,65303],\"mapped\",[55]],[[65304,65304],\"mapped\",[56]],[[65305,65305],\"mapped\",[57]],[[65306,65306],\"disallowed_STD3_mapped\",[58]],[[65307,65307],\"disallowed_STD3_mapped\",[59]],[[65308,65308],\"disallowed_STD3_mapped\",[60]],[[65309,65309],\"disallowed_STD3_mapped\",[61]],[[65310,65310],\"disallowed_STD3_mapped\",[62]],[[65311,65311],\"disallowed_STD3_mapped\",[63]],[[65312,65312],\"disallowed_STD3_mapped\",[64]],[[65313,65313],\"mapped\",[97]],[[65314,65314],\"mapped\",[98]],[[65315,65315],\"mapped\",[99]],[[65316,65316],\"mapped\",[100]],[[65317,65317],\"mapped\",[101]],[[65318,65318],\"mapped\",[102]],[[65319,65319],\"mapped\",[103]],[[65320,65320],\"mapped\",[104]],[[65321,65321],\"mapped\",[105]],[[65322,65322],\"mapped\",[106]],[[65323,65323],\"mapped\",[107]],[[65324,65324],\"mapped\",[108]],[[65325,65325],\"mapped\",[109]],[[65326,65326],\"mapped\",[110]],[[65327,65327],\"mapped\",[111]],[[65328,65328],\"mapped\",[112]],[[65329,65329],\"mapped\",[113]],[[65330,65330],\"mapped\",[114]],[[65331,65331],\"mapped\",[115]],[[65332,65332],\"mapped\",[116]],[[65333,65333],\"mapped\",[117]],[[65334,65334],\"mapped\",[118]],[[65335,65335],\"mapped\",[119]],[[65336,65336],\"mapped\",[120]],[[65337,65337],\"mapped\",[121]],[[65338,65338],\"mapped\",[122]],[[65339,65339],\"disallowed_STD3_mapped\",[91]],[[65340,65340],\"disallowed_STD3_mapped\",[92]],[[65341,65341],\"disallowed_STD3_mapped\",[93]],[[65342,65342],\"disallowed_STD3_mapped\",[94]],[[65343,65343],\"disallowed_STD3_mapped\",[95]],[[65344,65344],\"disallowed_STD3_mapped\",[96]],[[65345,65345],\"mapped\",[97]],[[65346,65346],\"mapped\",[98]],[[65347,65347],\"mapped\",[99]],[[65348,65348],\"mapped\",[100]],[[65349,65349],\"mapped\",[101]],[[65350,65350],\"mapped\",[102]],[[65351,65351],\"mapped\",[103]],[[65352,65352],\"mapped\",[104]],[[65353,65353],\"mapped\",[105]],[[65354,65354],\"mapped\",[106]],[[65355,65355],\"mapped\",[107]],[[65356,65356],\"mapped\",[108]],[[65357,65357],\"mapped\",[109]],[[65358,65358],\"mapped\",[110]],[[65359,65359],\"mapped\",[111]],[[65360,65360],\"mapped\",[112]],[[65361,65361],\"mapped\",[113]],[[65362,65362],\"mapped\",[114]],[[65363,65363],\"mapped\",[115]],[[65364,65364],\"mapped\",[116]],[[65365,65365],\"mapped\",[117]],[[65366,65366],\"mapped\",[118]],[[65367,65367],\"mapped\",[119]],[[65368,65368],\"mapped\",[120]],[[65369,65369],\"mapped\",[121]],[[65370,65370],\"mapped\",[122]],[[65371,65371],\"disallowed_STD3_mapped\",[123]],[[65372,65372],\"disallowed_STD3_mapped\",[124]],[[65373,65373],\"disallowed_STD3_mapped\",[125]],[[65374,65374],\"disallowed_STD3_mapped\",[126]],[[65375,65375],\"mapped\",[10629]],[[65376,65376],\"mapped\",[10630]],[[65377,65377],\"mapped\",[46]],[[65378,65378],\"mapped\",[12300]],[[65379,65379],\"mapped\",[12301]],[[65380,65380],\"mapped\",[12289]],[[65381,65381],\"mapped\",[12539]],[[65382,65382],\"mapped\",[12530]],[[65383,65383],\"mapped\",[12449]],[[65384,65384],\"mapped\",[12451]],[[65385,65385],\"mapped\",[12453]],[[65386,65386],\"mapped\",[12455]],[[65387,65387],\"mapped\",[12457]],[[65388,65388],\"mapped\",[12515]],[[65389,65389],\"mapped\",[12517]],[[65390,65390],\"mapped\",[12519]],[[65391,65391],\"mapped\",[12483]],[[65392,65392],\"mapped\",[12540]],[[65393,65393],\"mapped\",[12450]],[[65394,65394],\"mapped\",[12452]],[[65395,65395],\"mapped\",[12454]],[[65396,65396],\"mapped\",[12456]],[[65397,65397],\"mapped\",[12458]],[[65398,65398],\"mapped\",[12459]],[[65399,65399],\"mapped\",[12461]],[[65400,65400],\"mapped\",[12463]],[[65401,65401],\"mapped\",[12465]],[[65402,65402],\"mapped\",[12467]],[[65403,65403],\"mapped\",[12469]],[[65404,65404],\"mapped\",[12471]],[[65405,65405],\"mapped\",[12473]],[[65406,65406],\"mapped\",[12475]],[[65407,65407],\"mapped\",[12477]],[[65408,65408],\"mapped\",[12479]],[[65409,65409],\"mapped\",[12481]],[[65410,65410],\"mapped\",[12484]],[[65411,65411],\"mapped\",[12486]],[[65412,65412],\"mapped\",[12488]],[[65413,65413],\"mapped\",[12490]],[[65414,65414],\"mapped\",[12491]],[[65415,65415],\"mapped\",[12492]],[[65416,65416],\"mapped\",[12493]],[[65417,65417],\"mapped\",[12494]],[[65418,65418],\"mapped\",[12495]],[[65419,65419],\"mapped\",[12498]],[[65420,65420],\"mapped\",[12501]],[[65421,65421],\"mapped\",[12504]],[[65422,65422],\"mapped\",[12507]],[[65423,65423],\"mapped\",[12510]],[[65424,65424],\"mapped\",[12511]],[[65425,65425],\"mapped\",[12512]],[[65426,65426],\"mapped\",[12513]],[[65427,65427],\"mapped\",[12514]],[[65428,65428],\"mapped\",[12516]],[[65429,65429],\"mapped\",[12518]],[[65430,65430],\"mapped\",[12520]],[[65431,65431],\"mapped\",[12521]],[[65432,65432],\"mapped\",[12522]],[[65433,65433],\"mapped\",[12523]],[[65434,65434],\"mapped\",[12524]],[[65435,65435],\"mapped\",[12525]],[[65436,65436],\"mapped\",[12527]],[[65437,65437],\"mapped\",[12531]],[[65438,65438],\"mapped\",[12441]],[[65439,65439],\"mapped\",[12442]],[[65440,65440],\"disallowed\"],[[65441,65441],\"mapped\",[4352]],[[65442,65442],\"mapped\",[4353]],[[65443,65443],\"mapped\",[4522]],[[65444,65444],\"mapped\",[4354]],[[65445,65445],\"mapped\",[4524]],[[65446,65446],\"mapped\",[4525]],[[65447,65447],\"mapped\",[4355]],[[65448,65448],\"mapped\",[4356]],[[65449,65449],\"mapped\",[4357]],[[65450,65450],\"mapped\",[4528]],[[65451,65451],\"mapped\",[4529]],[[65452,65452],\"mapped\",[4530]],[[65453,65453],\"mapped\",[4531]],[[65454,65454],\"mapped\",[4532]],[[65455,65455],\"mapped\",[4533]],[[65456,65456],\"mapped\",[4378]],[[65457,65457],\"mapped\",[4358]],[[65458,65458],\"mapped\",[4359]],[[65459,65459],\"mapped\",[4360]],[[65460,65460],\"mapped\",[4385]],[[65461,65461],\"mapped\",[4361]],[[65462,65462],\"mapped\",[4362]],[[65463,65463],\"mapped\",[4363]],[[65464,65464],\"mapped\",[4364]],[[65465,65465],\"mapped\",[4365]],[[65466,65466],\"mapped\",[4366]],[[65467,65467],\"mapped\",[4367]],[[65468,65468],\"mapped\",[4368]],[[65469,65469],\"mapped\",[4369]],[[65470,65470],\"mapped\",[4370]],[[65471,65473],\"disallowed\"],[[65474,65474],\"mapped\",[4449]],[[65475,65475],\"mapped\",[4450]],[[65476,65476],\"mapped\",[4451]],[[65477,65477],\"mapped\",[4452]],[[65478,65478],\"mapped\",[4453]],[[65479,65479],\"mapped\",[4454]],[[65480,65481],\"disallowed\"],[[65482,65482],\"mapped\",[4455]],[[65483,65483],\"mapped\",[4456]],[[65484,65484],\"mapped\",[4457]],[[65485,65485],\"mapped\",[4458]],[[65486,65486],\"mapped\",[4459]],[[65487,65487],\"mapped\",[4460]],[[65488,65489],\"disallowed\"],[[65490,65490],\"mapped\",[4461]],[[65491,65491],\"mapped\",[4462]],[[65492,65492],\"mapped\",[4463]],[[65493,65493],\"mapped\",[4464]],[[65494,65494],\"mapped\",[4465]],[[65495,65495],\"mapped\",[4466]],[[65496,65497],\"disallowed\"],[[65498,65498],\"mapped\",[4467]],[[65499,65499],\"mapped\",[4468]],[[65500,65500],\"mapped\",[4469]],[[65501,65503],\"disallowed\"],[[65504,65504],\"mapped\",[162]],[[65505,65505],\"mapped\",[163]],[[65506,65506],\"mapped\",[172]],[[65507,65507],\"disallowed_STD3_mapped\",[32,772]],[[65508,65508],\"mapped\",[166]],[[65509,65509],\"mapped\",[165]],[[65510,65510],\"mapped\",[8361]],[[65511,65511],\"disallowed\"],[[65512,65512],\"mapped\",[9474]],[[65513,65513],\"mapped\",[8592]],[[65514,65514],\"mapped\",[8593]],[[65515,65515],\"mapped\",[8594]],[[65516,65516],\"mapped\",[8595]],[[65517,65517],\"mapped\",[9632]],[[65518,65518],\"mapped\",[9675]],[[65519,65528],\"disallowed\"],[[65529,65531],\"disallowed\"],[[65532,65532],\"disallowed\"],[[65533,65533],\"disallowed\"],[[65534,65535],\"disallowed\"],[[65536,65547],\"valid\"],[[65548,65548],\"disallowed\"],[[65549,65574],\"valid\"],[[65575,65575],\"disallowed\"],[[65576,65594],\"valid\"],[[65595,65595],\"disallowed\"],[[65596,65597],\"valid\"],[[65598,65598],\"disallowed\"],[[65599,65613],\"valid\"],[[65614,65615],\"disallowed\"],[[65616,65629],\"valid\"],[[65630,65663],\"disallowed\"],[[65664,65786],\"valid\"],[[65787,65791],\"disallowed\"],[[65792,65794],\"valid\",[],\"NV8\"],[[65795,65798],\"disallowed\"],[[65799,65843],\"valid\",[],\"NV8\"],[[65844,65846],\"disallowed\"],[[65847,65855],\"valid\",[],\"NV8\"],[[65856,65930],\"valid\",[],\"NV8\"],[[65931,65932],\"valid\",[],\"NV8\"],[[65933,65935],\"disallowed\"],[[65936,65947],\"valid\",[],\"NV8\"],[[65948,65951],\"disallowed\"],[[65952,65952],\"valid\",[],\"NV8\"],[[65953,65999],\"disallowed\"],[[66000,66044],\"valid\",[],\"NV8\"],[[66045,66045],\"valid\"],[[66046,66175],\"disallowed\"],[[66176,66204],\"valid\"],[[66205,66207],\"disallowed\"],[[66208,66256],\"valid\"],[[66257,66271],\"disallowed\"],[[66272,66272],\"valid\"],[[66273,66299],\"valid\",[],\"NV8\"],[[66300,66303],\"disallowed\"],[[66304,66334],\"valid\"],[[66335,66335],\"valid\"],[[66336,66339],\"valid\",[],\"NV8\"],[[66340,66351],\"disallowed\"],[[66352,66368],\"valid\"],[[66369,66369],\"valid\",[],\"NV8\"],[[66370,66377],\"valid\"],[[66378,66378],\"valid\",[],\"NV8\"],[[66379,66383],\"disallowed\"],[[66384,66426],\"valid\"],[[66427,66431],\"disallowed\"],[[66432,66461],\"valid\"],[[66462,66462],\"disallowed\"],[[66463,66463],\"valid\",[],\"NV8\"],[[66464,66499],\"valid\"],[[66500,66503],\"disallowed\"],[[66504,66511],\"valid\"],[[66512,66517],\"valid\",[],\"NV8\"],[[66518,66559],\"disallowed\"],[[66560,66560],\"mapped\",[66600]],[[66561,66561],\"mapped\",[66601]],[[66562,66562],\"mapped\",[66602]],[[66563,66563],\"mapped\",[66603]],[[66564,66564],\"mapped\",[66604]],[[66565,66565],\"mapped\",[66605]],[[66566,66566],\"mapped\",[66606]],[[66567,66567],\"mapped\",[66607]],[[66568,66568],\"mapped\",[66608]],[[66569,66569],\"mapped\",[66609]],[[66570,66570],\"mapped\",[66610]],[[66571,66571],\"mapped\",[66611]],[[66572,66572],\"mapped\",[66612]],[[66573,66573],\"mapped\",[66613]],[[66574,66574],\"mapped\",[66614]],[[66575,66575],\"mapped\",[66615]],[[66576,66576],\"mapped\",[66616]],[[66577,66577],\"mapped\",[66617]],[[66578,66578],\"mapped\",[66618]],[[66579,66579],\"mapped\",[66619]],[[66580,66580],\"mapped\",[66620]],[[66581,66581],\"mapped\",[66621]],[[66582,66582],\"mapped\",[66622]],[[66583,66583],\"mapped\",[66623]],[[66584,66584],\"mapped\",[66624]],[[66585,66585],\"mapped\",[66625]],[[66586,66586],\"mapped\",[66626]],[[66587,66587],\"mapped\",[66627]],[[66588,66588],\"mapped\",[66628]],[[66589,66589],\"mapped\",[66629]],[[66590,66590],\"mapped\",[66630]],[[66591,66591],\"mapped\",[66631]],[[66592,66592],\"mapped\",[66632]],[[66593,66593],\"mapped\",[66633]],[[66594,66594],\"mapped\",[66634]],[[66595,66595],\"mapped\",[66635]],[[66596,66596],\"mapped\",[66636]],[[66597,66597],\"mapped\",[66637]],[[66598,66598],\"mapped\",[66638]],[[66599,66599],\"mapped\",[66639]],[[66600,66637],\"valid\"],[[66638,66717],\"valid\"],[[66718,66719],\"disallowed\"],[[66720,66729],\"valid\"],[[66730,66815],\"disallowed\"],[[66816,66855],\"valid\"],[[66856,66863],\"disallowed\"],[[66864,66915],\"valid\"],[[66916,66926],\"disallowed\"],[[66927,66927],\"valid\",[],\"NV8\"],[[66928,67071],\"disallowed\"],[[67072,67382],\"valid\"],[[67383,67391],\"disallowed\"],[[67392,67413],\"valid\"],[[67414,67423],\"disallowed\"],[[67424,67431],\"valid\"],[[67432,67583],\"disallowed\"],[[67584,67589],\"valid\"],[[67590,67591],\"disallowed\"],[[67592,67592],\"valid\"],[[67593,67593],\"disallowed\"],[[67594,67637],\"valid\"],[[67638,67638],\"disallowed\"],[[67639,67640],\"valid\"],[[67641,67643],\"disallowed\"],[[67644,67644],\"valid\"],[[67645,67646],\"disallowed\"],[[67647,67647],\"valid\"],[[67648,67669],\"valid\"],[[67670,67670],\"disallowed\"],[[67671,67679],\"valid\",[],\"NV8\"],[[67680,67702],\"valid\"],[[67703,67711],\"valid\",[],\"NV8\"],[[67712,67742],\"valid\"],[[67743,67750],\"disallowed\"],[[67751,67759],\"valid\",[],\"NV8\"],[[67760,67807],\"disallowed\"],[[67808,67826],\"valid\"],[[67827,67827],\"disallowed\"],[[67828,67829],\"valid\"],[[67830,67834],\"disallowed\"],[[67835,67839],\"valid\",[],\"NV8\"],[[67840,67861],\"valid\"],[[67862,67865],\"valid\",[],\"NV8\"],[[67866,67867],\"valid\",[],\"NV8\"],[[67868,67870],\"disallowed\"],[[67871,67871],\"valid\",[],\"NV8\"],[[67872,67897],\"valid\"],[[67898,67902],\"disallowed\"],[[67903,67903],\"valid\",[],\"NV8\"],[[67904,67967],\"disallowed\"],[[67968,68023],\"valid\"],[[68024,68027],\"disallowed\"],[[68028,68029],\"valid\",[],\"NV8\"],[[68030,68031],\"valid\"],[[68032,68047],\"valid\",[],\"NV8\"],[[68048,68049],\"disallowed\"],[[68050,68095],\"valid\",[],\"NV8\"],[[68096,68099],\"valid\"],[[68100,68100],\"disallowed\"],[[68101,68102],\"valid\"],[[68103,68107],\"disallowed\"],[[68108,68115],\"valid\"],[[68116,68116],\"disallowed\"],[[68117,68119],\"valid\"],[[68120,68120],\"disallowed\"],[[68121,68147],\"valid\"],[[68148,68151],\"disallowed\"],[[68152,68154],\"valid\"],[[68155,68158],\"disallowed\"],[[68159,68159],\"valid\"],[[68160,68167],\"valid\",[],\"NV8\"],[[68168,68175],\"disallowed\"],[[68176,68184],\"valid\",[],\"NV8\"],[[68185,68191],\"disallowed\"],[[68192,68220],\"valid\"],[[68221,68223],\"valid\",[],\"NV8\"],[[68224,68252],\"valid\"],[[68253,68255],\"valid\",[],\"NV8\"],[[68256,68287],\"disallowed\"],[[68288,68295],\"valid\"],[[68296,68296],\"valid\",[],\"NV8\"],[[68297,68326],\"valid\"],[[68327,68330],\"disallowed\"],[[68331,68342],\"valid\",[],\"NV8\"],[[68343,68351],\"disallowed\"],[[68352,68405],\"valid\"],[[68406,68408],\"disallowed\"],[[68409,68415],\"valid\",[],\"NV8\"],[[68416,68437],\"valid\"],[[68438,68439],\"disallowed\"],[[68440,68447],\"valid\",[],\"NV8\"],[[68448,68466],\"valid\"],[[68467,68471],\"disallowed\"],[[68472,68479],\"valid\",[],\"NV8\"],[[68480,68497],\"valid\"],[[68498,68504],\"disallowed\"],[[68505,68508],\"valid\",[],\"NV8\"],[[68509,68520],\"disallowed\"],[[68521,68527],\"valid\",[],\"NV8\"],[[68528,68607],\"disallowed\"],[[68608,68680],\"valid\"],[[68681,68735],\"disallowed\"],[[68736,68736],\"mapped\",[68800]],[[68737,68737],\"mapped\",[68801]],[[68738,68738],\"mapped\",[68802]],[[68739,68739],\"mapped\",[68803]],[[68740,68740],\"mapped\",[68804]],[[68741,68741],\"mapped\",[68805]],[[68742,68742],\"mapped\",[68806]],[[68743,68743],\"mapped\",[68807]],[[68744,68744],\"mapped\",[68808]],[[68745,68745],\"mapped\",[68809]],[[68746,68746],\"mapped\",[68810]],[[68747,68747],\"mapped\",[68811]],[[68748,68748],\"mapped\",[68812]],[[68749,68749],\"mapped\",[68813]],[[68750,68750],\"mapped\",[68814]],[[68751,68751],\"mapped\",[68815]],[[68752,68752],\"mapped\",[68816]],[[68753,68753],\"mapped\",[68817]],[[68754,68754],\"mapped\",[68818]],[[68755,68755],\"mapped\",[68819]],[[68756,68756],\"mapped\",[68820]],[[68757,68757],\"mapped\",[68821]],[[68758,68758],\"mapped\",[68822]],[[68759,68759],\"mapped\",[68823]],[[68760,68760],\"mapped\",[68824]],[[68761,68761],\"mapped\",[68825]],[[68762,68762],\"mapped\",[68826]],[[68763,68763],\"mapped\",[68827]],[[68764,68764],\"mapped\",[68828]],[[68765,68765],\"mapped\",[68829]],[[68766,68766],\"mapped\",[68830]],[[68767,68767],\"mapped\",[68831]],[[68768,68768],\"mapped\",[68832]],[[68769,68769],\"mapped\",[68833]],[[68770,68770],\"mapped\",[68834]],[[68771,68771],\"mapped\",[68835]],[[68772,68772],\"mapped\",[68836]],[[68773,68773],\"mapped\",[68837]],[[68774,68774],\"mapped\",[68838]],[[68775,68775],\"mapped\",[68839]],[[68776,68776],\"mapped\",[68840]],[[68777,68777],\"mapped\",[68841]],[[68778,68778],\"mapped\",[68842]],[[68779,68779],\"mapped\",[68843]],[[68780,68780],\"mapped\",[68844]],[[68781,68781],\"mapped\",[68845]],[[68782,68782],\"mapped\",[68846]],[[68783,68783],\"mapped\",[68847]],[[68784,68784],\"mapped\",[68848]],[[68785,68785],\"mapped\",[68849]],[[68786,68786],\"mapped\",[68850]],[[68787,68799],\"disallowed\"],[[68800,68850],\"valid\"],[[68851,68857],\"disallowed\"],[[68858,68863],\"valid\",[],\"NV8\"],[[68864,69215],\"disallowed\"],[[69216,69246],\"valid\",[],\"NV8\"],[[69247,69631],\"disallowed\"],[[69632,69702],\"valid\"],[[69703,69709],\"valid\",[],\"NV8\"],[[69710,69713],\"disallowed\"],[[69714,69733],\"valid\",[],\"NV8\"],[[69734,69743],\"valid\"],[[69744,69758],\"disallowed\"],[[69759,69759],\"valid\"],[[69760,69818],\"valid\"],[[69819,69820],\"valid\",[],\"NV8\"],[[69821,69821],\"disallowed\"],[[69822,69825],\"valid\",[],\"NV8\"],[[69826,69839],\"disallowed\"],[[69840,69864],\"valid\"],[[69865,69871],\"disallowed\"],[[69872,69881],\"valid\"],[[69882,69887],\"disallowed\"],[[69888,69940],\"valid\"],[[69941,69941],\"disallowed\"],[[69942,69951],\"valid\"],[[69952,69955],\"valid\",[],\"NV8\"],[[69956,69967],\"disallowed\"],[[69968,70003],\"valid\"],[[70004,70005],\"valid\",[],\"NV8\"],[[70006,70006],\"valid\"],[[70007,70015],\"disallowed\"],[[70016,70084],\"valid\"],[[70085,70088],\"valid\",[],\"NV8\"],[[70089,70089],\"valid\",[],\"NV8\"],[[70090,70092],\"valid\"],[[70093,70093],\"valid\",[],\"NV8\"],[[70094,70095],\"disallowed\"],[[70096,70105],\"valid\"],[[70106,70106],\"valid\"],[[70107,70107],\"valid\",[],\"NV8\"],[[70108,70108],\"valid\"],[[70109,70111],\"valid\",[],\"NV8\"],[[70112,70112],\"disallowed\"],[[70113,70132],\"valid\",[],\"NV8\"],[[70133,70143],\"disallowed\"],[[70144,70161],\"valid\"],[[70162,70162],\"disallowed\"],[[70163,70199],\"valid\"],[[70200,70205],\"valid\",[],\"NV8\"],[[70206,70271],\"disallowed\"],[[70272,70278],\"valid\"],[[70279,70279],\"disallowed\"],[[70280,70280],\"valid\"],[[70281,70281],\"disallowed\"],[[70282,70285],\"valid\"],[[70286,70286],\"disallowed\"],[[70287,70301],\"valid\"],[[70302,70302],\"disallowed\"],[[70303,70312],\"valid\"],[[70313,70313],\"valid\",[],\"NV8\"],[[70314,70319],\"disallowed\"],[[70320,70378],\"valid\"],[[70379,70383],\"disallowed\"],[[70384,70393],\"valid\"],[[70394,70399],\"disallowed\"],[[70400,70400],\"valid\"],[[70401,70403],\"valid\"],[[70404,70404],\"disallowed\"],[[70405,70412],\"valid\"],[[70413,70414],\"disallowed\"],[[70415,70416],\"valid\"],[[70417,70418],\"disallowed\"],[[70419,70440],\"valid\"],[[70441,70441],\"disallowed\"],[[70442,70448],\"valid\"],[[70449,70449],\"disallowed\"],[[70450,70451],\"valid\"],[[70452,70452],\"disallowed\"],[[70453,70457],\"valid\"],[[70458,70459],\"disallowed\"],[[70460,70468],\"valid\"],[[70469,70470],\"disallowed\"],[[70471,70472],\"valid\"],[[70473,70474],\"disallowed\"],[[70475,70477],\"valid\"],[[70478,70479],\"disallowed\"],[[70480,70480],\"valid\"],[[70481,70486],\"disallowed\"],[[70487,70487],\"valid\"],[[70488,70492],\"disallowed\"],[[70493,70499],\"valid\"],[[70500,70501],\"disallowed\"],[[70502,70508],\"valid\"],[[70509,70511],\"disallowed\"],[[70512,70516],\"valid\"],[[70517,70783],\"disallowed\"],[[70784,70853],\"valid\"],[[70854,70854],\"valid\",[],\"NV8\"],[[70855,70855],\"valid\"],[[70856,70863],\"disallowed\"],[[70864,70873],\"valid\"],[[70874,71039],\"disallowed\"],[[71040,71093],\"valid\"],[[71094,71095],\"disallowed\"],[[71096,71104],\"valid\"],[[71105,71113],\"valid\",[],\"NV8\"],[[71114,71127],\"valid\",[],\"NV8\"],[[71128,71133],\"valid\"],[[71134,71167],\"disallowed\"],[[71168,71232],\"valid\"],[[71233,71235],\"valid\",[],\"NV8\"],[[71236,71236],\"valid\"],[[71237,71247],\"disallowed\"],[[71248,71257],\"valid\"],[[71258,71295],\"disallowed\"],[[71296,71351],\"valid\"],[[71352,71359],\"disallowed\"],[[71360,71369],\"valid\"],[[71370,71423],\"disallowed\"],[[71424,71449],\"valid\"],[[71450,71452],\"disallowed\"],[[71453,71467],\"valid\"],[[71468,71471],\"disallowed\"],[[71472,71481],\"valid\"],[[71482,71487],\"valid\",[],\"NV8\"],[[71488,71839],\"disallowed\"],[[71840,71840],\"mapped\",[71872]],[[71841,71841],\"mapped\",[71873]],[[71842,71842],\"mapped\",[71874]],[[71843,71843],\"mapped\",[71875]],[[71844,71844],\"mapped\",[71876]],[[71845,71845],\"mapped\",[71877]],[[71846,71846],\"mapped\",[71878]],[[71847,71847],\"mapped\",[71879]],[[71848,71848],\"mapped\",[71880]],[[71849,71849],\"mapped\",[71881]],[[71850,71850],\"mapped\",[71882]],[[71851,71851],\"mapped\",[71883]],[[71852,71852],\"mapped\",[71884]],[[71853,71853],\"mapped\",[71885]],[[71854,71854],\"mapped\",[71886]],[[71855,71855],\"mapped\",[71887]],[[71856,71856],\"mapped\",[71888]],[[71857,71857],\"mapped\",[71889]],[[71858,71858],\"mapped\",[71890]],[[71859,71859],\"mapped\",[71891]],[[71860,71860],\"mapped\",[71892]],[[71861,71861],\"mapped\",[71893]],[[71862,71862],\"mapped\",[71894]],[[71863,71863],\"mapped\",[71895]],[[71864,71864],\"mapped\",[71896]],[[71865,71865],\"mapped\",[71897]],[[71866,71866],\"mapped\",[71898]],[[71867,71867],\"mapped\",[71899]],[[71868,71868],\"mapped\",[71900]],[[71869,71869],\"mapped\",[71901]],[[71870,71870],\"mapped\",[71902]],[[71871,71871],\"mapped\",[71903]],[[71872,71913],\"valid\"],[[71914,71922],\"valid\",[],\"NV8\"],[[71923,71934],\"disallowed\"],[[71935,71935],\"valid\"],[[71936,72383],\"disallowed\"],[[72384,72440],\"valid\"],[[72441,73727],\"disallowed\"],[[73728,74606],\"valid\"],[[74607,74648],\"valid\"],[[74649,74649],\"valid\"],[[74650,74751],\"disallowed\"],[[74752,74850],\"valid\",[],\"NV8\"],[[74851,74862],\"valid\",[],\"NV8\"],[[74863,74863],\"disallowed\"],[[74864,74867],\"valid\",[],\"NV8\"],[[74868,74868],\"valid\",[],\"NV8\"],[[74869,74879],\"disallowed\"],[[74880,75075],\"valid\"],[[75076,77823],\"disallowed\"],[[77824,78894],\"valid\"],[[78895,82943],\"disallowed\"],[[82944,83526],\"valid\"],[[83527,92159],\"disallowed\"],[[92160,92728],\"valid\"],[[92729,92735],\"disallowed\"],[[92736,92766],\"valid\"],[[92767,92767],\"disallowed\"],[[92768,92777],\"valid\"],[[92778,92781],\"disallowed\"],[[92782,92783],\"valid\",[],\"NV8\"],[[92784,92879],\"disallowed\"],[[92880,92909],\"valid\"],[[92910,92911],\"disallowed\"],[[92912,92916],\"valid\"],[[92917,92917],\"valid\",[],\"NV8\"],[[92918,92927],\"disallowed\"],[[92928,92982],\"valid\"],[[92983,92991],\"valid\",[],\"NV8\"],[[92992,92995],\"valid\"],[[92996,92997],\"valid\",[],\"NV8\"],[[92998,93007],\"disallowed\"],[[93008,93017],\"valid\"],[[93018,93018],\"disallowed\"],[[93019,93025],\"valid\",[],\"NV8\"],[[93026,93026],\"disallowed\"],[[93027,93047],\"valid\"],[[93048,93052],\"disallowed\"],[[93053,93071],\"valid\"],[[93072,93951],\"disallowed\"],[[93952,94020],\"valid\"],[[94021,94031],\"disallowed\"],[[94032,94078],\"valid\"],[[94079,94094],\"disallowed\"],[[94095,94111],\"valid\"],[[94112,110591],\"disallowed\"],[[110592,110593],\"valid\"],[[110594,113663],\"disallowed\"],[[113664,113770],\"valid\"],[[113771,113775],\"disallowed\"],[[113776,113788],\"valid\"],[[113789,113791],\"disallowed\"],[[113792,113800],\"valid\"],[[113801,113807],\"disallowed\"],[[113808,113817],\"valid\"],[[113818,113819],\"disallowed\"],[[113820,113820],\"valid\",[],\"NV8\"],[[113821,113822],\"valid\"],[[113823,113823],\"valid\",[],\"NV8\"],[[113824,113827],\"ignored\"],[[113828,118783],\"disallowed\"],[[118784,119029],\"valid\",[],\"NV8\"],[[119030,119039],\"disallowed\"],[[119040,119078],\"valid\",[],\"NV8\"],[[119079,119080],\"disallowed\"],[[119081,119081],\"valid\",[],\"NV8\"],[[119082,119133],\"valid\",[],\"NV8\"],[[119134,119134],\"mapped\",[119127,119141]],[[119135,119135],\"mapped\",[119128,119141]],[[119136,119136],\"mapped\",[119128,119141,119150]],[[119137,119137],\"mapped\",[119128,119141,119151]],[[119138,119138],\"mapped\",[119128,119141,119152]],[[119139,119139],\"mapped\",[119128,119141,119153]],[[119140,119140],\"mapped\",[119128,119141,119154]],[[119141,119154],\"valid\",[],\"NV8\"],[[119155,119162],\"disallowed\"],[[119163,119226],\"valid\",[],\"NV8\"],[[119227,119227],\"mapped\",[119225,119141]],[[119228,119228],\"mapped\",[119226,119141]],[[119229,119229],\"mapped\",[119225,119141,119150]],[[119230,119230],\"mapped\",[119226,119141,119150]],[[119231,119231],\"mapped\",[119225,119141,119151]],[[119232,119232],\"mapped\",[119226,119141,119151]],[[119233,119261],\"valid\",[],\"NV8\"],[[119262,119272],\"valid\",[],\"NV8\"],[[119273,119295],\"disallowed\"],[[119296,119365],\"valid\",[],\"NV8\"],[[119366,119551],\"disallowed\"],[[119552,119638],\"valid\",[],\"NV8\"],[[119639,119647],\"disallowed\"],[[119648,119665],\"valid\",[],\"NV8\"],[[119666,119807],\"disallowed\"],[[119808,119808],\"mapped\",[97]],[[119809,119809],\"mapped\",[98]],[[119810,119810],\"mapped\",[99]],[[119811,119811],\"mapped\",[100]],[[119812,119812],\"mapped\",[101]],[[119813,119813],\"mapped\",[102]],[[119814,119814],\"mapped\",[103]],[[119815,119815],\"mapped\",[104]],[[119816,119816],\"mapped\",[105]],[[119817,119817],\"mapped\",[106]],[[119818,119818],\"mapped\",[107]],[[119819,119819],\"mapped\",[108]],[[119820,119820],\"mapped\",[109]],[[119821,119821],\"mapped\",[110]],[[119822,119822],\"mapped\",[111]],[[119823,119823],\"mapped\",[112]],[[119824,119824],\"mapped\",[113]],[[119825,119825],\"mapped\",[114]],[[119826,119826],\"mapped\",[115]],[[119827,119827],\"mapped\",[116]],[[119828,119828],\"mapped\",[117]],[[119829,119829],\"mapped\",[118]],[[119830,119830],\"mapped\",[119]],[[119831,119831],\"mapped\",[120]],[[119832,119832],\"mapped\",[121]],[[119833,119833],\"mapped\",[122]],[[119834,119834],\"mapped\",[97]],[[119835,119835],\"mapped\",[98]],[[119836,119836],\"mapped\",[99]],[[119837,119837],\"mapped\",[100]],[[119838,119838],\"mapped\",[101]],[[119839,119839],\"mapped\",[102]],[[119840,119840],\"mapped\",[103]],[[119841,119841],\"mapped\",[104]],[[119842,119842],\"mapped\",[105]],[[119843,119843],\"mapped\",[106]],[[119844,119844],\"mapped\",[107]],[[119845,119845],\"mapped\",[108]],[[119846,119846],\"mapped\",[109]],[[119847,119847],\"mapped\",[110]],[[119848,119848],\"mapped\",[111]],[[119849,119849],\"mapped\",[112]],[[119850,119850],\"mapped\",[113]],[[119851,119851],\"mapped\",[114]],[[119852,119852],\"mapped\",[115]],[[119853,119853],\"mapped\",[116]],[[119854,119854],\"mapped\",[117]],[[119855,119855],\"mapped\",[118]],[[119856,119856],\"mapped\",[119]],[[119857,119857],\"mapped\",[120]],[[119858,119858],\"mapped\",[121]],[[119859,119859],\"mapped\",[122]],[[119860,119860],\"mapped\",[97]],[[119861,119861],\"mapped\",[98]],[[119862,119862],\"mapped\",[99]],[[119863,119863],\"mapped\",[100]],[[119864,119864],\"mapped\",[101]],[[119865,119865],\"mapped\",[102]],[[119866,119866],\"mapped\",[103]],[[119867,119867],\"mapped\",[104]],[[119868,119868],\"mapped\",[105]],[[119869,119869],\"mapped\",[106]],[[119870,119870],\"mapped\",[107]],[[119871,119871],\"mapped\",[108]],[[119872,119872],\"mapped\",[109]],[[119873,119873],\"mapped\",[110]],[[119874,119874],\"mapped\",[111]],[[119875,119875],\"mapped\",[112]],[[119876,119876],\"mapped\",[113]],[[119877,119877],\"mapped\",[114]],[[119878,119878],\"mapped\",[115]],[[119879,119879],\"mapped\",[116]],[[119880,119880],\"mapped\",[117]],[[119881,119881],\"mapped\",[118]],[[119882,119882],\"mapped\",[119]],[[119883,119883],\"mapped\",[120]],[[119884,119884],\"mapped\",[121]],[[119885,119885],\"mapped\",[122]],[[119886,119886],\"mapped\",[97]],[[119887,119887],\"mapped\",[98]],[[119888,119888],\"mapped\",[99]],[[119889,119889],\"mapped\",[100]],[[119890,119890],\"mapped\",[101]],[[119891,119891],\"mapped\",[102]],[[119892,119892],\"mapped\",[103]],[[119893,119893],\"disallowed\"],[[119894,119894],\"mapped\",[105]],[[119895,119895],\"mapped\",[106]],[[119896,119896],\"mapped\",[107]],[[119897,119897],\"mapped\",[108]],[[119898,119898],\"mapped\",[109]],[[119899,119899],\"mapped\",[110]],[[119900,119900],\"mapped\",[111]],[[119901,119901],\"mapped\",[112]],[[119902,119902],\"mapped\",[113]],[[119903,119903],\"mapped\",[114]],[[119904,119904],\"mapped\",[115]],[[119905,119905],\"mapped\",[116]],[[119906,119906],\"mapped\",[117]],[[119907,119907],\"mapped\",[118]],[[119908,119908],\"mapped\",[119]],[[119909,119909],\"mapped\",[120]],[[119910,119910],\"mapped\",[121]],[[119911,119911],\"mapped\",[122]],[[119912,119912],\"mapped\",[97]],[[119913,119913],\"mapped\",[98]],[[119914,119914],\"mapped\",[99]],[[119915,119915],\"mapped\",[100]],[[119916,119916],\"mapped\",[101]],[[119917,119917],\"mapped\",[102]],[[119918,119918],\"mapped\",[103]],[[119919,119919],\"mapped\",[104]],[[119920,119920],\"mapped\",[105]],[[119921,119921],\"mapped\",[106]],[[119922,119922],\"mapped\",[107]],[[119923,119923],\"mapped\",[108]],[[119924,119924],\"mapped\",[109]],[[119925,119925],\"mapped\",[110]],[[119926,119926],\"mapped\",[111]],[[119927,119927],\"mapped\",[112]],[[119928,119928],\"mapped\",[113]],[[119929,119929],\"mapped\",[114]],[[119930,119930],\"mapped\",[115]],[[119931,119931],\"mapped\",[116]],[[119932,119932],\"mapped\",[117]],[[119933,119933],\"mapped\",[118]],[[119934,119934],\"mapped\",[119]],[[119935,119935],\"mapped\",[120]],[[119936,119936],\"mapped\",[121]],[[119937,119937],\"mapped\",[122]],[[119938,119938],\"mapped\",[97]],[[119939,119939],\"mapped\",[98]],[[119940,119940],\"mapped\",[99]],[[119941,119941],\"mapped\",[100]],[[119942,119942],\"mapped\",[101]],[[119943,119943],\"mapped\",[102]],[[119944,119944],\"mapped\",[103]],[[119945,119945],\"mapped\",[104]],[[119946,119946],\"mapped\",[105]],[[119947,119947],\"mapped\",[106]],[[119948,119948],\"mapped\",[107]],[[119949,119949],\"mapped\",[108]],[[119950,119950],\"mapped\",[109]],[[119951,119951],\"mapped\",[110]],[[119952,119952],\"mapped\",[111]],[[119953,119953],\"mapped\",[112]],[[119954,119954],\"mapped\",[113]],[[119955,119955],\"mapped\",[114]],[[119956,119956],\"mapped\",[115]],[[119957,119957],\"mapped\",[116]],[[119958,119958],\"mapped\",[117]],[[119959,119959],\"mapped\",[118]],[[119960,119960],\"mapped\",[119]],[[119961,119961],\"mapped\",[120]],[[119962,119962],\"mapped\",[121]],[[119963,119963],\"mapped\",[122]],[[119964,119964],\"mapped\",[97]],[[119965,119965],\"disallowed\"],[[119966,119966],\"mapped\",[99]],[[119967,119967],\"mapped\",[100]],[[119968,119969],\"disallowed\"],[[119970,119970],\"mapped\",[103]],[[119971,119972],\"disallowed\"],[[119973,119973],\"mapped\",[106]],[[119974,119974],\"mapped\",[107]],[[119975,119976],\"disallowed\"],[[119977,119977],\"mapped\",[110]],[[119978,119978],\"mapped\",[111]],[[119979,119979],\"mapped\",[112]],[[119980,119980],\"mapped\",[113]],[[119981,119981],\"disallowed\"],[[119982,119982],\"mapped\",[115]],[[119983,119983],\"mapped\",[116]],[[119984,119984],\"mapped\",[117]],[[119985,119985],\"mapped\",[118]],[[119986,119986],\"mapped\",[119]],[[119987,119987],\"mapped\",[120]],[[119988,119988],\"mapped\",[121]],[[119989,119989],\"mapped\",[122]],[[119990,119990],\"mapped\",[97]],[[119991,119991],\"mapped\",[98]],[[119992,119992],\"mapped\",[99]],[[119993,119993],\"mapped\",[100]],[[119994,119994],\"disallowed\"],[[119995,119995],\"mapped\",[102]],[[119996,119996],\"disallowed\"],[[119997,119997],\"mapped\",[104]],[[119998,119998],\"mapped\",[105]],[[119999,119999],\"mapped\",[106]],[[120000,120000],\"mapped\",[107]],[[120001,120001],\"mapped\",[108]],[[120002,120002],\"mapped\",[109]],[[120003,120003],\"mapped\",[110]],[[120004,120004],\"disallowed\"],[[120005,120005],\"mapped\",[112]],[[120006,120006],\"mapped\",[113]],[[120007,120007],\"mapped\",[114]],[[120008,120008],\"mapped\",[115]],[[120009,120009],\"mapped\",[116]],[[120010,120010],\"mapped\",[117]],[[120011,120011],\"mapped\",[118]],[[120012,120012],\"mapped\",[119]],[[120013,120013],\"mapped\",[120]],[[120014,120014],\"mapped\",[121]],[[120015,120015],\"mapped\",[122]],[[120016,120016],\"mapped\",[97]],[[120017,120017],\"mapped\",[98]],[[120018,120018],\"mapped\",[99]],[[120019,120019],\"mapped\",[100]],[[120020,120020],\"mapped\",[101]],[[120021,120021],\"mapped\",[102]],[[120022,120022],\"mapped\",[103]],[[120023,120023],\"mapped\",[104]],[[120024,120024],\"mapped\",[105]],[[120025,120025],\"mapped\",[106]],[[120026,120026],\"mapped\",[107]],[[120027,120027],\"mapped\",[108]],[[120028,120028],\"mapped\",[109]],[[120029,120029],\"mapped\",[110]],[[120030,120030],\"mapped\",[111]],[[120031,120031],\"mapped\",[112]],[[120032,120032],\"mapped\",[113]],[[120033,120033],\"mapped\",[114]],[[120034,120034],\"mapped\",[115]],[[120035,120035],\"mapped\",[116]],[[120036,120036],\"mapped\",[117]],[[120037,120037],\"mapped\",[118]],[[120038,120038],\"mapped\",[119]],[[120039,120039],\"mapped\",[120]],[[120040,120040],\"mapped\",[121]],[[120041,120041],\"mapped\",[122]],[[120042,120042],\"mapped\",[97]],[[120043,120043],\"mapped\",[98]],[[120044,120044],\"mapped\",[99]],[[120045,120045],\"mapped\",[100]],[[120046,120046],\"mapped\",[101]],[[120047,120047],\"mapped\",[102]],[[120048,120048],\"mapped\",[103]],[[120049,120049],\"mapped\",[104]],[[120050,120050],\"mapped\",[105]],[[120051,120051],\"mapped\",[106]],[[120052,120052],\"mapped\",[107]],[[120053,120053],\"mapped\",[108]],[[120054,120054],\"mapped\",[109]],[[120055,120055],\"mapped\",[110]],[[120056,120056],\"mapped\",[111]],[[120057,120057],\"mapped\",[112]],[[120058,120058],\"mapped\",[113]],[[120059,120059],\"mapped\",[114]],[[120060,120060],\"mapped\",[115]],[[120061,120061],\"mapped\",[116]],[[120062,120062],\"mapped\",[117]],[[120063,120063],\"mapped\",[118]],[[120064,120064],\"mapped\",[119]],[[120065,120065],\"mapped\",[120]],[[120066,120066],\"mapped\",[121]],[[120067,120067],\"mapped\",[122]],[[120068,120068],\"mapped\",[97]],[[120069,120069],\"mapped\",[98]],[[120070,120070],\"disallowed\"],[[120071,120071],\"mapped\",[100]],[[120072,120072],\"mapped\",[101]],[[120073,120073],\"mapped\",[102]],[[120074,120074],\"mapped\",[103]],[[120075,120076],\"disallowed\"],[[120077,120077],\"mapped\",[106]],[[120078,120078],\"mapped\",[107]],[[120079,120079],\"mapped\",[108]],[[120080,120080],\"mapped\",[109]],[[120081,120081],\"mapped\",[110]],[[120082,120082],\"mapped\",[111]],[[120083,120083],\"mapped\",[112]],[[120084,120084],\"mapped\",[113]],[[120085,120085],\"disallowed\"],[[120086,120086],\"mapped\",[115]],[[120087,120087],\"mapped\",[116]],[[120088,120088],\"mapped\",[117]],[[120089,120089],\"mapped\",[118]],[[120090,120090],\"mapped\",[119]],[[120091,120091],\"mapped\",[120]],[[120092,120092],\"mapped\",[121]],[[120093,120093],\"disallowed\"],[[120094,120094],\"mapped\",[97]],[[120095,120095],\"mapped\",[98]],[[120096,120096],\"mapped\",[99]],[[120097,120097],\"mapped\",[100]],[[120098,120098],\"mapped\",[101]],[[120099,120099],\"mapped\",[102]],[[120100,120100],\"mapped\",[103]],[[120101,120101],\"mapped\",[104]],[[120102,120102],\"mapped\",[105]],[[120103,120103],\"mapped\",[106]],[[120104,120104],\"mapped\",[107]],[[120105,120105],\"mapped\",[108]],[[120106,120106],\"mapped\",[109]],[[120107,120107],\"mapped\",[110]],[[120108,120108],\"mapped\",[111]],[[120109,120109],\"mapped\",[112]],[[120110,120110],\"mapped\",[113]],[[120111,120111],\"mapped\",[114]],[[120112,120112],\"mapped\",[115]],[[120113,120113],\"mapped\",[116]],[[120114,120114],\"mapped\",[117]],[[120115,120115],\"mapped\",[118]],[[120116,120116],\"mapped\",[119]],[[120117,120117],\"mapped\",[120]],[[120118,120118],\"mapped\",[121]],[[120119,120119],\"mapped\",[122]],[[120120,120120],\"mapped\",[97]],[[120121,120121],\"mapped\",[98]],[[120122,120122],\"disallowed\"],[[120123,120123],\"mapped\",[100]],[[120124,120124],\"mapped\",[101]],[[120125,120125],\"mapped\",[102]],[[120126,120126],\"mapped\",[103]],[[120127,120127],\"disallowed\"],[[120128,120128],\"mapped\",[105]],[[120129,120129],\"mapped\",[106]],[[120130,120130],\"mapped\",[107]],[[120131,120131],\"mapped\",[108]],[[120132,120132],\"mapped\",[109]],[[120133,120133],\"disallowed\"],[[120134,120134],\"mapped\",[111]],[[120135,120137],\"disallowed\"],[[120138,120138],\"mapped\",[115]],[[120139,120139],\"mapped\",[116]],[[120140,120140],\"mapped\",[117]],[[120141,120141],\"mapped\",[118]],[[120142,120142],\"mapped\",[119]],[[120143,120143],\"mapped\",[120]],[[120144,120144],\"mapped\",[121]],[[120145,120145],\"disallowed\"],[[120146,120146],\"mapped\",[97]],[[120147,120147],\"mapped\",[98]],[[120148,120148],\"mapped\",[99]],[[120149,120149],\"mapped\",[100]],[[120150,120150],\"mapped\",[101]],[[120151,120151],\"mapped\",[102]],[[120152,120152],\"mapped\",[103]],[[120153,120153],\"mapped\",[104]],[[120154,120154],\"mapped\",[105]],[[120155,120155],\"mapped\",[106]],[[120156,120156],\"mapped\",[107]],[[120157,120157],\"mapped\",[108]],[[120158,120158],\"mapped\",[109]],[[120159,120159],\"mapped\",[110]],[[120160,120160],\"mapped\",[111]],[[120161,120161],\"mapped\",[112]],[[120162,120162],\"mapped\",[113]],[[120163,120163],\"mapped\",[114]],[[120164,120164],\"mapped\",[115]],[[120165,120165],\"mapped\",[116]],[[120166,120166],\"mapped\",[117]],[[120167,120167],\"mapped\",[118]],[[120168,120168],\"mapped\",[119]],[[120169,120169],\"mapped\",[120]],[[120170,120170],\"mapped\",[121]],[[120171,120171],\"mapped\",[122]],[[120172,120172],\"mapped\",[97]],[[120173,120173],\"mapped\",[98]],[[120174,120174],\"mapped\",[99]],[[120175,120175],\"mapped\",[100]],[[120176,120176],\"mapped\",[101]],[[120177,120177],\"mapped\",[102]],[[120178,120178],\"mapped\",[103]],[[120179,120179],\"mapped\",[104]],[[120180,120180],\"mapped\",[105]],[[120181,120181],\"mapped\",[106]],[[120182,120182],\"mapped\",[107]],[[120183,120183],\"mapped\",[108]],[[120184,120184],\"mapped\",[109]],[[120185,120185],\"mapped\",[110]],[[120186,120186],\"mapped\",[111]],[[120187,120187],\"mapped\",[112]],[[120188,120188],\"mapped\",[113]],[[120189,120189],\"mapped\",[114]],[[120190,120190],\"mapped\",[115]],[[120191,120191],\"mapped\",[116]],[[120192,120192],\"mapped\",[117]],[[120193,120193],\"mapped\",[118]],[[120194,120194],\"mapped\",[119]],[[120195,120195],\"mapped\",[120]],[[120196,120196],\"mapped\",[121]],[[120197,120197],\"mapped\",[122]],[[120198,120198],\"mapped\",[97]],[[120199,120199],\"mapped\",[98]],[[120200,120200],\"mapped\",[99]],[[120201,120201],\"mapped\",[100]],[[120202,120202],\"mapped\",[101]],[[120203,120203],\"mapped\",[102]],[[120204,120204],\"mapped\",[103]],[[120205,120205],\"mapped\",[104]],[[120206,120206],\"mapped\",[105]],[[120207,120207],\"mapped\",[106]],[[120208,120208],\"mapped\",[107]],[[120209,120209],\"mapped\",[108]],[[120210,120210],\"mapped\",[109]],[[120211,120211],\"mapped\",[110]],[[120212,120212],\"mapped\",[111]],[[120213,120213],\"mapped\",[112]],[[120214,120214],\"mapped\",[113]],[[120215,120215],\"mapped\",[114]],[[120216,120216],\"mapped\",[115]],[[120217,120217],\"mapped\",[116]],[[120218,120218],\"mapped\",[117]],[[120219,120219],\"mapped\",[118]],[[120220,120220],\"mapped\",[119]],[[120221,120221],\"mapped\",[120]],[[120222,120222],\"mapped\",[121]],[[120223,120223],\"mapped\",[122]],[[120224,120224],\"mapped\",[97]],[[120225,120225],\"mapped\",[98]],[[120226,120226],\"mapped\",[99]],[[120227,120227],\"mapped\",[100]],[[120228,120228],\"mapped\",[101]],[[120229,120229],\"mapped\",[102]],[[120230,120230],\"mapped\",[103]],[[120231,120231],\"mapped\",[104]],[[120232,120232],\"mapped\",[105]],[[120233,120233],\"mapped\",[106]],[[120234,120234],\"mapped\",[107]],[[120235,120235],\"mapped\",[108]],[[120236,120236],\"mapped\",[109]],[[120237,120237],\"mapped\",[110]],[[120238,120238],\"mapped\",[111]],[[120239,120239],\"mapped\",[112]],[[120240,120240],\"mapped\",[113]],[[120241,120241],\"mapped\",[114]],[[120242,120242],\"mapped\",[115]],[[120243,120243],\"mapped\",[116]],[[120244,120244],\"mapped\",[117]],[[120245,120245],\"mapped\",[118]],[[120246,120246],\"mapped\",[119]],[[120247,120247],\"mapped\",[120]],[[120248,120248],\"mapped\",[121]],[[120249,120249],\"mapped\",[122]],[[120250,120250],\"mapped\",[97]],[[120251,120251],\"mapped\",[98]],[[120252,120252],\"mapped\",[99]],[[120253,120253],\"mapped\",[100]],[[120254,120254],\"mapped\",[101]],[[120255,120255],\"mapped\",[102]],[[120256,120256],\"mapped\",[103]],[[120257,120257],\"mapped\",[104]],[[120258,120258],\"mapped\",[105]],[[120259,120259],\"mapped\",[106]],[[120260,120260],\"mapped\",[107]],[[120261,120261],\"mapped\",[108]],[[120262,120262],\"mapped\",[109]],[[120263,120263],\"mapped\",[110]],[[120264,120264],\"mapped\",[111]],[[120265,120265],\"mapped\",[112]],[[120266,120266],\"mapped\",[113]],[[120267,120267],\"mapped\",[114]],[[120268,120268],\"mapped\",[115]],[[120269,120269],\"mapped\",[116]],[[120270,120270],\"mapped\",[117]],[[120271,120271],\"mapped\",[118]],[[120272,120272],\"mapped\",[119]],[[120273,120273],\"mapped\",[120]],[[120274,120274],\"mapped\",[121]],[[120275,120275],\"mapped\",[122]],[[120276,120276],\"mapped\",[97]],[[120277,120277],\"mapped\",[98]],[[120278,120278],\"mapped\",[99]],[[120279,120279],\"mapped\",[100]],[[120280,120280],\"mapped\",[101]],[[120281,120281],\"mapped\",[102]],[[120282,120282],\"mapped\",[103]],[[120283,120283],\"mapped\",[104]],[[120284,120284],\"mapped\",[105]],[[120285,120285],\"mapped\",[106]],[[120286,120286],\"mapped\",[107]],[[120287,120287],\"mapped\",[108]],[[120288,120288],\"mapped\",[109]],[[120289,120289],\"mapped\",[110]],[[120290,120290],\"mapped\",[111]],[[120291,120291],\"mapped\",[112]],[[120292,120292],\"mapped\",[113]],[[120293,120293],\"mapped\",[114]],[[120294,120294],\"mapped\",[115]],[[120295,120295],\"mapped\",[116]],[[120296,120296],\"mapped\",[117]],[[120297,120297],\"mapped\",[118]],[[120298,120298],\"mapped\",[119]],[[120299,120299],\"mapped\",[120]],[[120300,120300],\"mapped\",[121]],[[120301,120301],\"mapped\",[122]],[[120302,120302],\"mapped\",[97]],[[120303,120303],\"mapped\",[98]],[[120304,120304],\"mapped\",[99]],[[120305,120305],\"mapped\",[100]],[[120306,120306],\"mapped\",[101]],[[120307,120307],\"mapped\",[102]],[[120308,120308],\"mapped\",[103]],[[120309,120309],\"mapped\",[104]],[[120310,120310],\"mapped\",[105]],[[120311,120311],\"mapped\",[106]],[[120312,120312],\"mapped\",[107]],[[120313,120313],\"mapped\",[108]],[[120314,120314],\"mapped\",[109]],[[120315,120315],\"mapped\",[110]],[[120316,120316],\"mapped\",[111]],[[120317,120317],\"mapped\",[112]],[[120318,120318],\"mapped\",[113]],[[120319,120319],\"mapped\",[114]],[[120320,120320],\"mapped\",[115]],[[120321,120321],\"mapped\",[116]],[[120322,120322],\"mapped\",[117]],[[120323,120323],\"mapped\",[118]],[[120324,120324],\"mapped\",[119]],[[120325,120325],\"mapped\",[120]],[[120326,120326],\"mapped\",[121]],[[120327,120327],\"mapped\",[122]],[[120328,120328],\"mapped\",[97]],[[120329,120329],\"mapped\",[98]],[[120330,120330],\"mapped\",[99]],[[120331,120331],\"mapped\",[100]],[[120332,120332],\"mapped\",[101]],[[120333,120333],\"mapped\",[102]],[[120334,120334],\"mapped\",[103]],[[120335,120335],\"mapped\",[104]],[[120336,120336],\"mapped\",[105]],[[120337,120337],\"mapped\",[106]],[[120338,120338],\"mapped\",[107]],[[120339,120339],\"mapped\",[108]],[[120340,120340],\"mapped\",[109]],[[120341,120341],\"mapped\",[110]],[[120342,120342],\"mapped\",[111]],[[120343,120343],\"mapped\",[112]],[[120344,120344],\"mapped\",[113]],[[120345,120345],\"mapped\",[114]],[[120346,120346],\"mapped\",[115]],[[120347,120347],\"mapped\",[116]],[[120348,120348],\"mapped\",[117]],[[120349,120349],\"mapped\",[118]],[[120350,120350],\"mapped\",[119]],[[120351,120351],\"mapped\",[120]],[[120352,120352],\"mapped\",[121]],[[120353,120353],\"mapped\",[122]],[[120354,120354],\"mapped\",[97]],[[120355,120355],\"mapped\",[98]],[[120356,120356],\"mapped\",[99]],[[120357,120357],\"mapped\",[100]],[[120358,120358],\"mapped\",[101]],[[120359,120359],\"mapped\",[102]],[[120360,120360],\"mapped\",[103]],[[120361,120361],\"mapped\",[104]],[[120362,120362],\"mapped\",[105]],[[120363,120363],\"mapped\",[106]],[[120364,120364],\"mapped\",[107]],[[120365,120365],\"mapped\",[108]],[[120366,120366],\"mapped\",[109]],[[120367,120367],\"mapped\",[110]],[[120368,120368],\"mapped\",[111]],[[120369,120369],\"mapped\",[112]],[[120370,120370],\"mapped\",[113]],[[120371,120371],\"mapped\",[114]],[[120372,120372],\"mapped\",[115]],[[120373,120373],\"mapped\",[116]],[[120374,120374],\"mapped\",[117]],[[120375,120375],\"mapped\",[118]],[[120376,120376],\"mapped\",[119]],[[120377,120377],\"mapped\",[120]],[[120378,120378],\"mapped\",[121]],[[120379,120379],\"mapped\",[122]],[[120380,120380],\"mapped\",[97]],[[120381,120381],\"mapped\",[98]],[[120382,120382],\"mapped\",[99]],[[120383,120383],\"mapped\",[100]],[[120384,120384],\"mapped\",[101]],[[120385,120385],\"mapped\",[102]],[[120386,120386],\"mapped\",[103]],[[120387,120387],\"mapped\",[104]],[[120388,120388],\"mapped\",[105]],[[120389,120389],\"mapped\",[106]],[[120390,120390],\"mapped\",[107]],[[120391,120391],\"mapped\",[108]],[[120392,120392],\"mapped\",[109]],[[120393,120393],\"mapped\",[110]],[[120394,120394],\"mapped\",[111]],[[120395,120395],\"mapped\",[112]],[[120396,120396],\"mapped\",[113]],[[120397,120397],\"mapped\",[114]],[[120398,120398],\"mapped\",[115]],[[120399,120399],\"mapped\",[116]],[[120400,120400],\"mapped\",[117]],[[120401,120401],\"mapped\",[118]],[[120402,120402],\"mapped\",[119]],[[120403,120403],\"mapped\",[120]],[[120404,120404],\"mapped\",[121]],[[120405,120405],\"mapped\",[122]],[[120406,120406],\"mapped\",[97]],[[120407,120407],\"mapped\",[98]],[[120408,120408],\"mapped\",[99]],[[120409,120409],\"mapped\",[100]],[[120410,120410],\"mapped\",[101]],[[120411,120411],\"mapped\",[102]],[[120412,120412],\"mapped\",[103]],[[120413,120413],\"mapped\",[104]],[[120414,120414],\"mapped\",[105]],[[120415,120415],\"mapped\",[106]],[[120416,120416],\"mapped\",[107]],[[120417,120417],\"mapped\",[108]],[[120418,120418],\"mapped\",[109]],[[120419,120419],\"mapped\",[110]],[[120420,120420],\"mapped\",[111]],[[120421,120421],\"mapped\",[112]],[[120422,120422],\"mapped\",[113]],[[120423,120423],\"mapped\",[114]],[[120424,120424],\"mapped\",[115]],[[120425,120425],\"mapped\",[116]],[[120426,120426],\"mapped\",[117]],[[120427,120427],\"mapped\",[118]],[[120428,120428],\"mapped\",[119]],[[120429,120429],\"mapped\",[120]],[[120430,120430],\"mapped\",[121]],[[120431,120431],\"mapped\",[122]],[[120432,120432],\"mapped\",[97]],[[120433,120433],\"mapped\",[98]],[[120434,120434],\"mapped\",[99]],[[120435,120435],\"mapped\",[100]],[[120436,120436],\"mapped\",[101]],[[120437,120437],\"mapped\",[102]],[[120438,120438],\"mapped\",[103]],[[120439,120439],\"mapped\",[104]],[[120440,120440],\"mapped\",[105]],[[120441,120441],\"mapped\",[106]],[[120442,120442],\"mapped\",[107]],[[120443,120443],\"mapped\",[108]],[[120444,120444],\"mapped\",[109]],[[120445,120445],\"mapped\",[110]],[[120446,120446],\"mapped\",[111]],[[120447,120447],\"mapped\",[112]],[[120448,120448],\"mapped\",[113]],[[120449,120449],\"mapped\",[114]],[[120450,120450],\"mapped\",[115]],[[120451,120451],\"mapped\",[116]],[[120452,120452],\"mapped\",[117]],[[120453,120453],\"mapped\",[118]],[[120454,120454],\"mapped\",[119]],[[120455,120455],\"mapped\",[120]],[[120456,120456],\"mapped\",[121]],[[120457,120457],\"mapped\",[122]],[[120458,120458],\"mapped\",[97]],[[120459,120459],\"mapped\",[98]],[[120460,120460],\"mapped\",[99]],[[120461,120461],\"mapped\",[100]],[[120462,120462],\"mapped\",[101]],[[120463,120463],\"mapped\",[102]],[[120464,120464],\"mapped\",[103]],[[120465,120465],\"mapped\",[104]],[[120466,120466],\"mapped\",[105]],[[120467,120467],\"mapped\",[106]],[[120468,120468],\"mapped\",[107]],[[120469,120469],\"mapped\",[108]],[[120470,120470],\"mapped\",[109]],[[120471,120471],\"mapped\",[110]],[[120472,120472],\"mapped\",[111]],[[120473,120473],\"mapped\",[112]],[[120474,120474],\"mapped\",[113]],[[120475,120475],\"mapped\",[114]],[[120476,120476],\"mapped\",[115]],[[120477,120477],\"mapped\",[116]],[[120478,120478],\"mapped\",[117]],[[120479,120479],\"mapped\",[118]],[[120480,120480],\"mapped\",[119]],[[120481,120481],\"mapped\",[120]],[[120482,120482],\"mapped\",[121]],[[120483,120483],\"mapped\",[122]],[[120484,120484],\"mapped\",[305]],[[120485,120485],\"mapped\",[567]],[[120486,120487],\"disallowed\"],[[120488,120488],\"mapped\",[945]],[[120489,120489],\"mapped\",[946]],[[120490,120490],\"mapped\",[947]],[[120491,120491],\"mapped\",[948]],[[120492,120492],\"mapped\",[949]],[[120493,120493],\"mapped\",[950]],[[120494,120494],\"mapped\",[951]],[[120495,120495],\"mapped\",[952]],[[120496,120496],\"mapped\",[953]],[[120497,120497],\"mapped\",[954]],[[120498,120498],\"mapped\",[955]],[[120499,120499],\"mapped\",[956]],[[120500,120500],\"mapped\",[957]],[[120501,120501],\"mapped\",[958]],[[120502,120502],\"mapped\",[959]],[[120503,120503],\"mapped\",[960]],[[120504,120504],\"mapped\",[961]],[[120505,120505],\"mapped\",[952]],[[120506,120506],\"mapped\",[963]],[[120507,120507],\"mapped\",[964]],[[120508,120508],\"mapped\",[965]],[[120509,120509],\"mapped\",[966]],[[120510,120510],\"mapped\",[967]],[[120511,120511],\"mapped\",[968]],[[120512,120512],\"mapped\",[969]],[[120513,120513],\"mapped\",[8711]],[[120514,120514],\"mapped\",[945]],[[120515,120515],\"mapped\",[946]],[[120516,120516],\"mapped\",[947]],[[120517,120517],\"mapped\",[948]],[[120518,120518],\"mapped\",[949]],[[120519,120519],\"mapped\",[950]],[[120520,120520],\"mapped\",[951]],[[120521,120521],\"mapped\",[952]],[[120522,120522],\"mapped\",[953]],[[120523,120523],\"mapped\",[954]],[[120524,120524],\"mapped\",[955]],[[120525,120525],\"mapped\",[956]],[[120526,120526],\"mapped\",[957]],[[120527,120527],\"mapped\",[958]],[[120528,120528],\"mapped\",[959]],[[120529,120529],\"mapped\",[960]],[[120530,120530],\"mapped\",[961]],[[120531,120532],\"mapped\",[963]],[[120533,120533],\"mapped\",[964]],[[120534,120534],\"mapped\",[965]],[[120535,120535],\"mapped\",[966]],[[120536,120536],\"mapped\",[967]],[[120537,120537],\"mapped\",[968]],[[120538,120538],\"mapped\",[969]],[[120539,120539],\"mapped\",[8706]],[[120540,120540],\"mapped\",[949]],[[120541,120541],\"mapped\",[952]],[[120542,120542],\"mapped\",[954]],[[120543,120543],\"mapped\",[966]],[[120544,120544],\"mapped\",[961]],[[120545,120545],\"mapped\",[960]],[[120546,120546],\"mapped\",[945]],[[120547,120547],\"mapped\",[946]],[[120548,120548],\"mapped\",[947]],[[120549,120549],\"mapped\",[948]],[[120550,120550],\"mapped\",[949]],[[120551,120551],\"mapped\",[950]],[[120552,120552],\"mapped\",[951]],[[120553,120553],\"mapped\",[952]],[[120554,120554],\"mapped\",[953]],[[120555,120555],\"mapped\",[954]],[[120556,120556],\"mapped\",[955]],[[120557,120557],\"mapped\",[956]],[[120558,120558],\"mapped\",[957]],[[120559,120559],\"mapped\",[958]],[[120560,120560],\"mapped\",[959]],[[120561,120561],\"mapped\",[960]],[[120562,120562],\"mapped\",[961]],[[120563,120563],\"mapped\",[952]],[[120564,120564],\"mapped\",[963]],[[120565,120565],\"mapped\",[964]],[[120566,120566],\"mapped\",[965]],[[120567,120567],\"mapped\",[966]],[[120568,120568],\"mapped\",[967]],[[120569,120569],\"mapped\",[968]],[[120570,120570],\"mapped\",[969]],[[120571,120571],\"mapped\",[8711]],[[120572,120572],\"mapped\",[945]],[[120573,120573],\"mapped\",[946]],[[120574,120574],\"mapped\",[947]],[[120575,120575],\"mapped\",[948]],[[120576,120576],\"mapped\",[949]],[[120577,120577],\"mapped\",[950]],[[120578,120578],\"mapped\",[951]],[[120579,120579],\"mapped\",[952]],[[120580,120580],\"mapped\",[953]],[[120581,120581],\"mapped\",[954]],[[120582,120582],\"mapped\",[955]],[[120583,120583],\"mapped\",[956]],[[120584,120584],\"mapped\",[957]],[[120585,120585],\"mapped\",[958]],[[120586,120586],\"mapped\",[959]],[[120587,120587],\"mapped\",[960]],[[120588,120588],\"mapped\",[961]],[[120589,120590],\"mapped\",[963]],[[120591,120591],\"mapped\",[964]],[[120592,120592],\"mapped\",[965]],[[120593,120593],\"mapped\",[966]],[[120594,120594],\"mapped\",[967]],[[120595,120595],\"mapped\",[968]],[[120596,120596],\"mapped\",[969]],[[120597,120597],\"mapped\",[8706]],[[120598,120598],\"mapped\",[949]],[[120599,120599],\"mapped\",[952]],[[120600,120600],\"mapped\",[954]],[[120601,120601],\"mapped\",[966]],[[120602,120602],\"mapped\",[961]],[[120603,120603],\"mapped\",[960]],[[120604,120604],\"mapped\",[945]],[[120605,120605],\"mapped\",[946]],[[120606,120606],\"mapped\",[947]],[[120607,120607],\"mapped\",[948]],[[120608,120608],\"mapped\",[949]],[[120609,120609],\"mapped\",[950]],[[120610,120610],\"mapped\",[951]],[[120611,120611],\"mapped\",[952]],[[120612,120612],\"mapped\",[953]],[[120613,120613],\"mapped\",[954]],[[120614,120614],\"mapped\",[955]],[[120615,120615],\"mapped\",[956]],[[120616,120616],\"mapped\",[957]],[[120617,120617],\"mapped\",[958]],[[120618,120618],\"mapped\",[959]],[[120619,120619],\"mapped\",[960]],[[120620,120620],\"mapped\",[961]],[[120621,120621],\"mapped\",[952]],[[120622,120622],\"mapped\",[963]],[[120623,120623],\"mapped\",[964]],[[120624,120624],\"mapped\",[965]],[[120625,120625],\"mapped\",[966]],[[120626,120626],\"mapped\",[967]],[[120627,120627],\"mapped\",[968]],[[120628,120628],\"mapped\",[969]],[[120629,120629],\"mapped\",[8711]],[[120630,120630],\"mapped\",[945]],[[120631,120631],\"mapped\",[946]],[[120632,120632],\"mapped\",[947]],[[120633,120633],\"mapped\",[948]],[[120634,120634],\"mapped\",[949]],[[120635,120635],\"mapped\",[950]],[[120636,120636],\"mapped\",[951]],[[120637,120637],\"mapped\",[952]],[[120638,120638],\"mapped\",[953]],[[120639,120639],\"mapped\",[954]],[[120640,120640],\"mapped\",[955]],[[120641,120641],\"mapped\",[956]],[[120642,120642],\"mapped\",[957]],[[120643,120643],\"mapped\",[958]],[[120644,120644],\"mapped\",[959]],[[120645,120645],\"mapped\",[960]],[[120646,120646],\"mapped\",[961]],[[120647,120648],\"mapped\",[963]],[[120649,120649],\"mapped\",[964]],[[120650,120650],\"mapped\",[965]],[[120651,120651],\"mapped\",[966]],[[120652,120652],\"mapped\",[967]],[[120653,120653],\"mapped\",[968]],[[120654,120654],\"mapped\",[969]],[[120655,120655],\"mapped\",[8706]],[[120656,120656],\"mapped\",[949]],[[120657,120657],\"mapped\",[952]],[[120658,120658],\"mapped\",[954]],[[120659,120659],\"mapped\",[966]],[[120660,120660],\"mapped\",[961]],[[120661,120661],\"mapped\",[960]],[[120662,120662],\"mapped\",[945]],[[120663,120663],\"mapped\",[946]],[[120664,120664],\"mapped\",[947]],[[120665,120665],\"mapped\",[948]],[[120666,120666],\"mapped\",[949]],[[120667,120667],\"mapped\",[950]],[[120668,120668],\"mapped\",[951]],[[120669,120669],\"mapped\",[952]],[[120670,120670],\"mapped\",[953]],[[120671,120671],\"mapped\",[954]],[[120672,120672],\"mapped\",[955]],[[120673,120673],\"mapped\",[956]],[[120674,120674],\"mapped\",[957]],[[120675,120675],\"mapped\",[958]],[[120676,120676],\"mapped\",[959]],[[120677,120677],\"mapped\",[960]],[[120678,120678],\"mapped\",[961]],[[120679,120679],\"mapped\",[952]],[[120680,120680],\"mapped\",[963]],[[120681,120681],\"mapped\",[964]],[[120682,120682],\"mapped\",[965]],[[120683,120683],\"mapped\",[966]],[[120684,120684],\"mapped\",[967]],[[120685,120685],\"mapped\",[968]],[[120686,120686],\"mapped\",[969]],[[120687,120687],\"mapped\",[8711]],[[120688,120688],\"mapped\",[945]],[[120689,120689],\"mapped\",[946]],[[120690,120690],\"mapped\",[947]],[[120691,120691],\"mapped\",[948]],[[120692,120692],\"mapped\",[949]],[[120693,120693],\"mapped\",[950]],[[120694,120694],\"mapped\",[951]],[[120695,120695],\"mapped\",[952]],[[120696,120696],\"mapped\",[953]],[[120697,120697],\"mapped\",[954]],[[120698,120698],\"mapped\",[955]],[[120699,120699],\"mapped\",[956]],[[120700,120700],\"mapped\",[957]],[[120701,120701],\"mapped\",[958]],[[120702,120702],\"mapped\",[959]],[[120703,120703],\"mapped\",[960]],[[120704,120704],\"mapped\",[961]],[[120705,120706],\"mapped\",[963]],[[120707,120707],\"mapped\",[964]],[[120708,120708],\"mapped\",[965]],[[120709,120709],\"mapped\",[966]],[[120710,120710],\"mapped\",[967]],[[120711,120711],\"mapped\",[968]],[[120712,120712],\"mapped\",[969]],[[120713,120713],\"mapped\",[8706]],[[120714,120714],\"mapped\",[949]],[[120715,120715],\"mapped\",[952]],[[120716,120716],\"mapped\",[954]],[[120717,120717],\"mapped\",[966]],[[120718,120718],\"mapped\",[961]],[[120719,120719],\"mapped\",[960]],[[120720,120720],\"mapped\",[945]],[[120721,120721],\"mapped\",[946]],[[120722,120722],\"mapped\",[947]],[[120723,120723],\"mapped\",[948]],[[120724,120724],\"mapped\",[949]],[[120725,120725],\"mapped\",[950]],[[120726,120726],\"mapped\",[951]],[[120727,120727],\"mapped\",[952]],[[120728,120728],\"mapped\",[953]],[[120729,120729],\"mapped\",[954]],[[120730,120730],\"mapped\",[955]],[[120731,120731],\"mapped\",[956]],[[120732,120732],\"mapped\",[957]],[[120733,120733],\"mapped\",[958]],[[120734,120734],\"mapped\",[959]],[[120735,120735],\"mapped\",[960]],[[120736,120736],\"mapped\",[961]],[[120737,120737],\"mapped\",[952]],[[120738,120738],\"mapped\",[963]],[[120739,120739],\"mapped\",[964]],[[120740,120740],\"mapped\",[965]],[[120741,120741],\"mapped\",[966]],[[120742,120742],\"mapped\",[967]],[[120743,120743],\"mapped\",[968]],[[120744,120744],\"mapped\",[969]],[[120745,120745],\"mapped\",[8711]],[[120746,120746],\"mapped\",[945]],[[120747,120747],\"mapped\",[946]],[[120748,120748],\"mapped\",[947]],[[120749,120749],\"mapped\",[948]],[[120750,120750],\"mapped\",[949]],[[120751,120751],\"mapped\",[950]],[[120752,120752],\"mapped\",[951]],[[120753,120753],\"mapped\",[952]],[[120754,120754],\"mapped\",[953]],[[120755,120755],\"mapped\",[954]],[[120756,120756],\"mapped\",[955]],[[120757,120757],\"mapped\",[956]],[[120758,120758],\"mapped\",[957]],[[120759,120759],\"mapped\",[958]],[[120760,120760],\"mapped\",[959]],[[120761,120761],\"mapped\",[960]],[[120762,120762],\"mapped\",[961]],[[120763,120764],\"mapped\",[963]],[[120765,120765],\"mapped\",[964]],[[120766,120766],\"mapped\",[965]],[[120767,120767],\"mapped\",[966]],[[120768,120768],\"mapped\",[967]],[[120769,120769],\"mapped\",[968]],[[120770,120770],\"mapped\",[969]],[[120771,120771],\"mapped\",[8706]],[[120772,120772],\"mapped\",[949]],[[120773,120773],\"mapped\",[952]],[[120774,120774],\"mapped\",[954]],[[120775,120775],\"mapped\",[966]],[[120776,120776],\"mapped\",[961]],[[120777,120777],\"mapped\",[960]],[[120778,120779],\"mapped\",[989]],[[120780,120781],\"disallowed\"],[[120782,120782],\"mapped\",[48]],[[120783,120783],\"mapped\",[49]],[[120784,120784],\"mapped\",[50]],[[120785,120785],\"mapped\",[51]],[[120786,120786],\"mapped\",[52]],[[120787,120787],\"mapped\",[53]],[[120788,120788],\"mapped\",[54]],[[120789,120789],\"mapped\",[55]],[[120790,120790],\"mapped\",[56]],[[120791,120791],\"mapped\",[57]],[[120792,120792],\"mapped\",[48]],[[120793,120793],\"mapped\",[49]],[[120794,120794],\"mapped\",[50]],[[120795,120795],\"mapped\",[51]],[[120796,120796],\"mapped\",[52]],[[120797,120797],\"mapped\",[53]],[[120798,120798],\"mapped\",[54]],[[120799,120799],\"mapped\",[55]],[[120800,120800],\"mapped\",[56]],[[120801,120801],\"mapped\",[57]],[[120802,120802],\"mapped\",[48]],[[120803,120803],\"mapped\",[49]],[[120804,120804],\"mapped\",[50]],[[120805,120805],\"mapped\",[51]],[[120806,120806],\"mapped\",[52]],[[120807,120807],\"mapped\",[53]],[[120808,120808],\"mapped\",[54]],[[120809,120809],\"mapped\",[55]],[[120810,120810],\"mapped\",[56]],[[120811,120811],\"mapped\",[57]],[[120812,120812],\"mapped\",[48]],[[120813,120813],\"mapped\",[49]],[[120814,120814],\"mapped\",[50]],[[120815,120815],\"mapped\",[51]],[[120816,120816],\"mapped\",[52]],[[120817,120817],\"mapped\",[53]],[[120818,120818],\"mapped\",[54]],[[120819,120819],\"mapped\",[55]],[[120820,120820],\"mapped\",[56]],[[120821,120821],\"mapped\",[57]],[[120822,120822],\"mapped\",[48]],[[120823,120823],\"mapped\",[49]],[[120824,120824],\"mapped\",[50]],[[120825,120825],\"mapped\",[51]],[[120826,120826],\"mapped\",[52]],[[120827,120827],\"mapped\",[53]],[[120828,120828],\"mapped\",[54]],[[120829,120829],\"mapped\",[55]],[[120830,120830],\"mapped\",[56]],[[120831,120831],\"mapped\",[57]],[[120832,121343],\"valid\",[],\"NV8\"],[[121344,121398],\"valid\"],[[121399,121402],\"valid\",[],\"NV8\"],[[121403,121452],\"valid\"],[[121453,121460],\"valid\",[],\"NV8\"],[[121461,121461],\"valid\"],[[121462,121475],\"valid\",[],\"NV8\"],[[121476,121476],\"valid\"],[[121477,121483],\"valid\",[],\"NV8\"],[[121484,121498],\"disallowed\"],[[121499,121503],\"valid\"],[[121504,121504],\"disallowed\"],[[121505,121519],\"valid\"],[[121520,124927],\"disallowed\"],[[124928,125124],\"valid\"],[[125125,125126],\"disallowed\"],[[125127,125135],\"valid\",[],\"NV8\"],[[125136,125142],\"valid\"],[[125143,126463],\"disallowed\"],[[126464,126464],\"mapped\",[1575]],[[126465,126465],\"mapped\",[1576]],[[126466,126466],\"mapped\",[1580]],[[126467,126467],\"mapped\",[1583]],[[126468,126468],\"disallowed\"],[[126469,126469],\"mapped\",[1608]],[[126470,126470],\"mapped\",[1586]],[[126471,126471],\"mapped\",[1581]],[[126472,126472],\"mapped\",[1591]],[[126473,126473],\"mapped\",[1610]],[[126474,126474],\"mapped\",[1603]],[[126475,126475],\"mapped\",[1604]],[[126476,126476],\"mapped\",[1605]],[[126477,126477],\"mapped\",[1606]],[[126478,126478],\"mapped\",[1587]],[[126479,126479],\"mapped\",[1593]],[[126480,126480],\"mapped\",[1601]],[[126481,126481],\"mapped\",[1589]],[[126482,126482],\"mapped\",[1602]],[[126483,126483],\"mapped\",[1585]],[[126484,126484],\"mapped\",[1588]],[[126485,126485],\"mapped\",[1578]],[[126486,126486],\"mapped\",[1579]],[[126487,126487],\"mapped\",[1582]],[[126488,126488],\"mapped\",[1584]],[[126489,126489],\"mapped\",[1590]],[[126490,126490],\"mapped\",[1592]],[[126491,126491],\"mapped\",[1594]],[[126492,126492],\"mapped\",[1646]],[[126493,126493],\"mapped\",[1722]],[[126494,126494],\"mapped\",[1697]],[[126495,126495],\"mapped\",[1647]],[[126496,126496],\"disallowed\"],[[126497,126497],\"mapped\",[1576]],[[126498,126498],\"mapped\",[1580]],[[126499,126499],\"disallowed\"],[[126500,126500],\"mapped\",[1607]],[[126501,126502],\"disallowed\"],[[126503,126503],\"mapped\",[1581]],[[126504,126504],\"disallowed\"],[[126505,126505],\"mapped\",[1610]],[[126506,126506],\"mapped\",[1603]],[[126507,126507],\"mapped\",[1604]],[[126508,126508],\"mapped\",[1605]],[[126509,126509],\"mapped\",[1606]],[[126510,126510],\"mapped\",[1587]],[[126511,126511],\"mapped\",[1593]],[[126512,126512],\"mapped\",[1601]],[[126513,126513],\"mapped\",[1589]],[[126514,126514],\"mapped\",[1602]],[[126515,126515],\"disallowed\"],[[126516,126516],\"mapped\",[1588]],[[126517,126517],\"mapped\",[1578]],[[126518,126518],\"mapped\",[1579]],[[126519,126519],\"mapped\",[1582]],[[126520,126520],\"disallowed\"],[[126521,126521],\"mapped\",[1590]],[[126522,126522],\"disallowed\"],[[126523,126523],\"mapped\",[1594]],[[126524,126529],\"disallowed\"],[[126530,126530],\"mapped\",[1580]],[[126531,126534],\"disallowed\"],[[126535,126535],\"mapped\",[1581]],[[126536,126536],\"disallowed\"],[[126537,126537],\"mapped\",[1610]],[[126538,126538],\"disallowed\"],[[126539,126539],\"mapped\",[1604]],[[126540,126540],\"disallowed\"],[[126541,126541],\"mapped\",[1606]],[[126542,126542],\"mapped\",[1587]],[[126543,126543],\"mapped\",[1593]],[[126544,126544],\"disallowed\"],[[126545,126545],\"mapped\",[1589]],[[126546,126546],\"mapped\",[1602]],[[126547,126547],\"disallowed\"],[[126548,126548],\"mapped\",[1588]],[[126549,126550],\"disallowed\"],[[126551,126551],\"mapped\",[1582]],[[126552,126552],\"disallowed\"],[[126553,126553],\"mapped\",[1590]],[[126554,126554],\"disallowed\"],[[126555,126555],\"mapped\",[1594]],[[126556,126556],\"disallowed\"],[[126557,126557],\"mapped\",[1722]],[[126558,126558],\"disallowed\"],[[126559,126559],\"mapped\",[1647]],[[126560,126560],\"disallowed\"],[[126561,126561],\"mapped\",[1576]],[[126562,126562],\"mapped\",[1580]],[[126563,126563],\"disallowed\"],[[126564,126564],\"mapped\",[1607]],[[126565,126566],\"disallowed\"],[[126567,126567],\"mapped\",[1581]],[[126568,126568],\"mapped\",[1591]],[[126569,126569],\"mapped\",[1610]],[[126570,126570],\"mapped\",[1603]],[[126571,126571],\"disallowed\"],[[126572,126572],\"mapped\",[1605]],[[126573,126573],\"mapped\",[1606]],[[126574,126574],\"mapped\",[1587]],[[126575,126575],\"mapped\",[1593]],[[126576,126576],\"mapped\",[1601]],[[126577,126577],\"mapped\",[1589]],[[126578,126578],\"mapped\",[1602]],[[126579,126579],\"disallowed\"],[[126580,126580],\"mapped\",[1588]],[[126581,126581],\"mapped\",[1578]],[[126582,126582],\"mapped\",[1579]],[[126583,126583],\"mapped\",[1582]],[[126584,126584],\"disallowed\"],[[126585,126585],\"mapped\",[1590]],[[126586,126586],\"mapped\",[1592]],[[126587,126587],\"mapped\",[1594]],[[126588,126588],\"mapped\",[1646]],[[126589,126589],\"disallowed\"],[[126590,126590],\"mapped\",[1697]],[[126591,126591],\"disallowed\"],[[126592,126592],\"mapped\",[1575]],[[126593,126593],\"mapped\",[1576]],[[126594,126594],\"mapped\",[1580]],[[126595,126595],\"mapped\",[1583]],[[126596,126596],\"mapped\",[1607]],[[126597,126597],\"mapped\",[1608]],[[126598,126598],\"mapped\",[1586]],[[126599,126599],\"mapped\",[1581]],[[126600,126600],\"mapped\",[1591]],[[126601,126601],\"mapped\",[1610]],[[126602,126602],\"disallowed\"],[[126603,126603],\"mapped\",[1604]],[[126604,126604],\"mapped\",[1605]],[[126605,126605],\"mapped\",[1606]],[[126606,126606],\"mapped\",[1587]],[[126607,126607],\"mapped\",[1593]],[[126608,126608],\"mapped\",[1601]],[[126609,126609],\"mapped\",[1589]],[[126610,126610],\"mapped\",[1602]],[[126611,126611],\"mapped\",[1585]],[[126612,126612],\"mapped\",[1588]],[[126613,126613],\"mapped\",[1578]],[[126614,126614],\"mapped\",[1579]],[[126615,126615],\"mapped\",[1582]],[[126616,126616],\"mapped\",[1584]],[[126617,126617],\"mapped\",[1590]],[[126618,126618],\"mapped\",[1592]],[[126619,126619],\"mapped\",[1594]],[[126620,126624],\"disallowed\"],[[126625,126625],\"mapped\",[1576]],[[126626,126626],\"mapped\",[1580]],[[126627,126627],\"mapped\",[1583]],[[126628,126628],\"disallowed\"],[[126629,126629],\"mapped\",[1608]],[[126630,126630],\"mapped\",[1586]],[[126631,126631],\"mapped\",[1581]],[[126632,126632],\"mapped\",[1591]],[[126633,126633],\"mapped\",[1610]],[[126634,126634],\"disallowed\"],[[126635,126635],\"mapped\",[1604]],[[126636,126636],\"mapped\",[1605]],[[126637,126637],\"mapped\",[1606]],[[126638,126638],\"mapped\",[1587]],[[126639,126639],\"mapped\",[1593]],[[126640,126640],\"mapped\",[1601]],[[126641,126641],\"mapped\",[1589]],[[126642,126642],\"mapped\",[1602]],[[126643,126643],\"mapped\",[1585]],[[126644,126644],\"mapped\",[1588]],[[126645,126645],\"mapped\",[1578]],[[126646,126646],\"mapped\",[1579]],[[126647,126647],\"mapped\",[1582]],[[126648,126648],\"mapped\",[1584]],[[126649,126649],\"mapped\",[1590]],[[126650,126650],\"mapped\",[1592]],[[126651,126651],\"mapped\",[1594]],[[126652,126703],\"disallowed\"],[[126704,126705],\"valid\",[],\"NV8\"],[[126706,126975],\"disallowed\"],[[126976,127019],\"valid\",[],\"NV8\"],[[127020,127023],\"disallowed\"],[[127024,127123],\"valid\",[],\"NV8\"],[[127124,127135],\"disallowed\"],[[127136,127150],\"valid\",[],\"NV8\"],[[127151,127152],\"disallowed\"],[[127153,127166],\"valid\",[],\"NV8\"],[[127167,127167],\"valid\",[],\"NV8\"],[[127168,127168],\"disallowed\"],[[127169,127183],\"valid\",[],\"NV8\"],[[127184,127184],\"disallowed\"],[[127185,127199],\"valid\",[],\"NV8\"],[[127200,127221],\"valid\",[],\"NV8\"],[[127222,127231],\"disallowed\"],[[127232,127232],\"disallowed\"],[[127233,127233],\"disallowed_STD3_mapped\",[48,44]],[[127234,127234],\"disallowed_STD3_mapped\",[49,44]],[[127235,127235],\"disallowed_STD3_mapped\",[50,44]],[[127236,127236],\"disallowed_STD3_mapped\",[51,44]],[[127237,127237],\"disallowed_STD3_mapped\",[52,44]],[[127238,127238],\"disallowed_STD3_mapped\",[53,44]],[[127239,127239],\"disallowed_STD3_mapped\",[54,44]],[[127240,127240],\"disallowed_STD3_mapped\",[55,44]],[[127241,127241],\"disallowed_STD3_mapped\",[56,44]],[[127242,127242],\"disallowed_STD3_mapped\",[57,44]],[[127243,127244],\"valid\",[],\"NV8\"],[[127245,127247],\"disallowed\"],[[127248,127248],\"disallowed_STD3_mapped\",[40,97,41]],[[127249,127249],\"disallowed_STD3_mapped\",[40,98,41]],[[127250,127250],\"disallowed_STD3_mapped\",[40,99,41]],[[127251,127251],\"disallowed_STD3_mapped\",[40,100,41]],[[127252,127252],\"disallowed_STD3_mapped\",[40,101,41]],[[127253,127253],\"disallowed_STD3_mapped\",[40,102,41]],[[127254,127254],\"disallowed_STD3_mapped\",[40,103,41]],[[127255,127255],\"disallowed_STD3_mapped\",[40,104,41]],[[127256,127256],\"disallowed_STD3_mapped\",[40,105,41]],[[127257,127257],\"disallowed_STD3_mapped\",[40,106,41]],[[127258,127258],\"disallowed_STD3_mapped\",[40,107,41]],[[127259,127259],\"disallowed_STD3_mapped\",[40,108,41]],[[127260,127260],\"disallowed_STD3_mapped\",[40,109,41]],[[127261,127261],\"disallowed_STD3_mapped\",[40,110,41]],[[127262,127262],\"disallowed_STD3_mapped\",[40,111,41]],[[127263,127263],\"disallowed_STD3_mapped\",[40,112,41]],[[127264,127264],\"disallowed_STD3_mapped\",[40,113,41]],[[127265,127265],\"disallowed_STD3_mapped\",[40,114,41]],[[127266,127266],\"disallowed_STD3_mapped\",[40,115,41]],[[127267,127267],\"disallowed_STD3_mapped\",[40,116,41]],[[127268,127268],\"disallowed_STD3_mapped\",[40,117,41]],[[127269,127269],\"disallowed_STD3_mapped\",[40,118,41]],[[127270,127270],\"disallowed_STD3_mapped\",[40,119,41]],[[127271,127271],\"disallowed_STD3_mapped\",[40,120,41]],[[127272,127272],\"disallowed_STD3_mapped\",[40,121,41]],[[127273,127273],\"disallowed_STD3_mapped\",[40,122,41]],[[127274,127274],\"mapped\",[12308,115,12309]],[[127275,127275],\"mapped\",[99]],[[127276,127276],\"mapped\",[114]],[[127277,127277],\"mapped\",[99,100]],[[127278,127278],\"mapped\",[119,122]],[[127279,127279],\"disallowed\"],[[127280,127280],\"mapped\",[97]],[[127281,127281],\"mapped\",[98]],[[127282,127282],\"mapped\",[99]],[[127283,127283],\"mapped\",[100]],[[127284,127284],\"mapped\",[101]],[[127285,127285],\"mapped\",[102]],[[127286,127286],\"mapped\",[103]],[[127287,127287],\"mapped\",[104]],[[127288,127288],\"mapped\",[105]],[[127289,127289],\"mapped\",[106]],[[127290,127290],\"mapped\",[107]],[[127291,127291],\"mapped\",[108]],[[127292,127292],\"mapped\",[109]],[[127293,127293],\"mapped\",[110]],[[127294,127294],\"mapped\",[111]],[[127295,127295],\"mapped\",[112]],[[127296,127296],\"mapped\",[113]],[[127297,127297],\"mapped\",[114]],[[127298,127298],\"mapped\",[115]],[[127299,127299],\"mapped\",[116]],[[127300,127300],\"mapped\",[117]],[[127301,127301],\"mapped\",[118]],[[127302,127302],\"mapped\",[119]],[[127303,127303],\"mapped\",[120]],[[127304,127304],\"mapped\",[121]],[[127305,127305],\"mapped\",[122]],[[127306,127306],\"mapped\",[104,118]],[[127307,127307],\"mapped\",[109,118]],[[127308,127308],\"mapped\",[115,100]],[[127309,127309],\"mapped\",[115,115]],[[127310,127310],\"mapped\",[112,112,118]],[[127311,127311],\"mapped\",[119,99]],[[127312,127318],\"valid\",[],\"NV8\"],[[127319,127319],\"valid\",[],\"NV8\"],[[127320,127326],\"valid\",[],\"NV8\"],[[127327,127327],\"valid\",[],\"NV8\"],[[127328,127337],\"valid\",[],\"NV8\"],[[127338,127338],\"mapped\",[109,99]],[[127339,127339],\"mapped\",[109,100]],[[127340,127343],\"disallowed\"],[[127344,127352],\"valid\",[],\"NV8\"],[[127353,127353],\"valid\",[],\"NV8\"],[[127354,127354],\"valid\",[],\"NV8\"],[[127355,127356],\"valid\",[],\"NV8\"],[[127357,127358],\"valid\",[],\"NV8\"],[[127359,127359],\"valid\",[],\"NV8\"],[[127360,127369],\"valid\",[],\"NV8\"],[[127370,127373],\"valid\",[],\"NV8\"],[[127374,127375],\"valid\",[],\"NV8\"],[[127376,127376],\"mapped\",[100,106]],[[127377,127386],\"valid\",[],\"NV8\"],[[127387,127461],\"disallowed\"],[[127462,127487],\"valid\",[],\"NV8\"],[[127488,127488],\"mapped\",[12411,12363]],[[127489,127489],\"mapped\",[12467,12467]],[[127490,127490],\"mapped\",[12469]],[[127491,127503],\"disallowed\"],[[127504,127504],\"mapped\",[25163]],[[127505,127505],\"mapped\",[23383]],[[127506,127506],\"mapped\",[21452]],[[127507,127507],\"mapped\",[12487]],[[127508,127508],\"mapped\",[20108]],[[127509,127509],\"mapped\",[22810]],[[127510,127510],\"mapped\",[35299]],[[127511,127511],\"mapped\",[22825]],[[127512,127512],\"mapped\",[20132]],[[127513,127513],\"mapped\",[26144]],[[127514,127514],\"mapped\",[28961]],[[127515,127515],\"mapped\",[26009]],[[127516,127516],\"mapped\",[21069]],[[127517,127517],\"mapped\",[24460]],[[127518,127518],\"mapped\",[20877]],[[127519,127519],\"mapped\",[26032]],[[127520,127520],\"mapped\",[21021]],[[127521,127521],\"mapped\",[32066]],[[127522,127522],\"mapped\",[29983]],[[127523,127523],\"mapped\",[36009]],[[127524,127524],\"mapped\",[22768]],[[127525,127525],\"mapped\",[21561]],[[127526,127526],\"mapped\",[28436]],[[127527,127527],\"mapped\",[25237]],[[127528,127528],\"mapped\",[25429]],[[127529,127529],\"mapped\",[19968]],[[127530,127530],\"mapped\",[19977]],[[127531,127531],\"mapped\",[36938]],[[127532,127532],\"mapped\",[24038]],[[127533,127533],\"mapped\",[20013]],[[127534,127534],\"mapped\",[21491]],[[127535,127535],\"mapped\",[25351]],[[127536,127536],\"mapped\",[36208]],[[127537,127537],\"mapped\",[25171]],[[127538,127538],\"mapped\",[31105]],[[127539,127539],\"mapped\",[31354]],[[127540,127540],\"mapped\",[21512]],[[127541,127541],\"mapped\",[28288]],[[127542,127542],\"mapped\",[26377]],[[127543,127543],\"mapped\",[26376]],[[127544,127544],\"mapped\",[30003]],[[127545,127545],\"mapped\",[21106]],[[127546,127546],\"mapped\",[21942]],[[127547,127551],\"disallowed\"],[[127552,127552],\"mapped\",[12308,26412,12309]],[[127553,127553],\"mapped\",[12308,19977,12309]],[[127554,127554],\"mapped\",[12308,20108,12309]],[[127555,127555],\"mapped\",[12308,23433,12309]],[[127556,127556],\"mapped\",[12308,28857,12309]],[[127557,127557],\"mapped\",[12308,25171,12309]],[[127558,127558],\"mapped\",[12308,30423,12309]],[[127559,127559],\"mapped\",[12308,21213,12309]],[[127560,127560],\"mapped\",[12308,25943,12309]],[[127561,127567],\"disallowed\"],[[127568,127568],\"mapped\",[24471]],[[127569,127569],\"mapped\",[21487]],[[127570,127743],\"disallowed\"],[[127744,127776],\"valid\",[],\"NV8\"],[[127777,127788],\"valid\",[],\"NV8\"],[[127789,127791],\"valid\",[],\"NV8\"],[[127792,127797],\"valid\",[],\"NV8\"],[[127798,127798],\"valid\",[],\"NV8\"],[[127799,127868],\"valid\",[],\"NV8\"],[[127869,127869],\"valid\",[],\"NV8\"],[[127870,127871],\"valid\",[],\"NV8\"],[[127872,127891],\"valid\",[],\"NV8\"],[[127892,127903],\"valid\",[],\"NV8\"],[[127904,127940],\"valid\",[],\"NV8\"],[[127941,127941],\"valid\",[],\"NV8\"],[[127942,127946],\"valid\",[],\"NV8\"],[[127947,127950],\"valid\",[],\"NV8\"],[[127951,127955],\"valid\",[],\"NV8\"],[[127956,127967],\"valid\",[],\"NV8\"],[[127968,127984],\"valid\",[],\"NV8\"],[[127985,127991],\"valid\",[],\"NV8\"],[[127992,127999],\"valid\",[],\"NV8\"],[[128000,128062],\"valid\",[],\"NV8\"],[[128063,128063],\"valid\",[],\"NV8\"],[[128064,128064],\"valid\",[],\"NV8\"],[[128065,128065],\"valid\",[],\"NV8\"],[[128066,128247],\"valid\",[],\"NV8\"],[[128248,128248],\"valid\",[],\"NV8\"],[[128249,128252],\"valid\",[],\"NV8\"],[[128253,128254],\"valid\",[],\"NV8\"],[[128255,128255],\"valid\",[],\"NV8\"],[[128256,128317],\"valid\",[],\"NV8\"],[[128318,128319],\"valid\",[],\"NV8\"],[[128320,128323],\"valid\",[],\"NV8\"],[[128324,128330],\"valid\",[],\"NV8\"],[[128331,128335],\"valid\",[],\"NV8\"],[[128336,128359],\"valid\",[],\"NV8\"],[[128360,128377],\"valid\",[],\"NV8\"],[[128378,128378],\"disallowed\"],[[128379,128419],\"valid\",[],\"NV8\"],[[128420,128420],\"disallowed\"],[[128421,128506],\"valid\",[],\"NV8\"],[[128507,128511],\"valid\",[],\"NV8\"],[[128512,128512],\"valid\",[],\"NV8\"],[[128513,128528],\"valid\",[],\"NV8\"],[[128529,128529],\"valid\",[],\"NV8\"],[[128530,128532],\"valid\",[],\"NV8\"],[[128533,128533],\"valid\",[],\"NV8\"],[[128534,128534],\"valid\",[],\"NV8\"],[[128535,128535],\"valid\",[],\"NV8\"],[[128536,128536],\"valid\",[],\"NV8\"],[[128537,128537],\"valid\",[],\"NV8\"],[[128538,128538],\"valid\",[],\"NV8\"],[[128539,128539],\"valid\",[],\"NV8\"],[[128540,128542],\"valid\",[],\"NV8\"],[[128543,128543],\"valid\",[],\"NV8\"],[[128544,128549],\"valid\",[],\"NV8\"],[[128550,128551],\"valid\",[],\"NV8\"],[[128552,128555],\"valid\",[],\"NV8\"],[[128556,128556],\"valid\",[],\"NV8\"],[[128557,128557],\"valid\",[],\"NV8\"],[[128558,128559],\"valid\",[],\"NV8\"],[[128560,128563],\"valid\",[],\"NV8\"],[[128564,128564],\"valid\",[],\"NV8\"],[[128565,128576],\"valid\",[],\"NV8\"],[[128577,128578],\"valid\",[],\"NV8\"],[[128579,128580],\"valid\",[],\"NV8\"],[[128581,128591],\"valid\",[],\"NV8\"],[[128592,128639],\"valid\",[],\"NV8\"],[[128640,128709],\"valid\",[],\"NV8\"],[[128710,128719],\"valid\",[],\"NV8\"],[[128720,128720],\"valid\",[],\"NV8\"],[[128721,128735],\"disallowed\"],[[128736,128748],\"valid\",[],\"NV8\"],[[128749,128751],\"disallowed\"],[[128752,128755],\"valid\",[],\"NV8\"],[[128756,128767],\"disallowed\"],[[128768,128883],\"valid\",[],\"NV8\"],[[128884,128895],\"disallowed\"],[[128896,128980],\"valid\",[],\"NV8\"],[[128981,129023],\"disallowed\"],[[129024,129035],\"valid\",[],\"NV8\"],[[129036,129039],\"disallowed\"],[[129040,129095],\"valid\",[],\"NV8\"],[[129096,129103],\"disallowed\"],[[129104,129113],\"valid\",[],\"NV8\"],[[129114,129119],\"disallowed\"],[[129120,129159],\"valid\",[],\"NV8\"],[[129160,129167],\"disallowed\"],[[129168,129197],\"valid\",[],\"NV8\"],[[129198,129295],\"disallowed\"],[[129296,129304],\"valid\",[],\"NV8\"],[[129305,129407],\"disallowed\"],[[129408,129412],\"valid\",[],\"NV8\"],[[129413,129471],\"disallowed\"],[[129472,129472],\"valid\",[],\"NV8\"],[[129473,131069],\"disallowed\"],[[131070,131071],\"disallowed\"],[[131072,173782],\"valid\"],[[173783,173823],\"disallowed\"],[[173824,177972],\"valid\"],[[177973,177983],\"disallowed\"],[[177984,178205],\"valid\"],[[178206,178207],\"disallowed\"],[[178208,183969],\"valid\"],[[183970,194559],\"disallowed\"],[[194560,194560],\"mapped\",[20029]],[[194561,194561],\"mapped\",[20024]],[[194562,194562],\"mapped\",[20033]],[[194563,194563],\"mapped\",[131362]],[[194564,194564],\"mapped\",[20320]],[[194565,194565],\"mapped\",[20398]],[[194566,194566],\"mapped\",[20411]],[[194567,194567],\"mapped\",[20482]],[[194568,194568],\"mapped\",[20602]],[[194569,194569],\"mapped\",[20633]],[[194570,194570],\"mapped\",[20711]],[[194571,194571],\"mapped\",[20687]],[[194572,194572],\"mapped\",[13470]],[[194573,194573],\"mapped\",[132666]],[[194574,194574],\"mapped\",[20813]],[[194575,194575],\"mapped\",[20820]],[[194576,194576],\"mapped\",[20836]],[[194577,194577],\"mapped\",[20855]],[[194578,194578],\"mapped\",[132380]],[[194579,194579],\"mapped\",[13497]],[[194580,194580],\"mapped\",[20839]],[[194581,194581],\"mapped\",[20877]],[[194582,194582],\"mapped\",[132427]],[[194583,194583],\"mapped\",[20887]],[[194584,194584],\"mapped\",[20900]],[[194585,194585],\"mapped\",[20172]],[[194586,194586],\"mapped\",[20908]],[[194587,194587],\"mapped\",[20917]],[[194588,194588],\"mapped\",[168415]],[[194589,194589],\"mapped\",[20981]],[[194590,194590],\"mapped\",[20995]],[[194591,194591],\"mapped\",[13535]],[[194592,194592],\"mapped\",[21051]],[[194593,194593],\"mapped\",[21062]],[[194594,194594],\"mapped\",[21106]],[[194595,194595],\"mapped\",[21111]],[[194596,194596],\"mapped\",[13589]],[[194597,194597],\"mapped\",[21191]],[[194598,194598],\"mapped\",[21193]],[[194599,194599],\"mapped\",[21220]],[[194600,194600],\"mapped\",[21242]],[[194601,194601],\"mapped\",[21253]],[[194602,194602],\"mapped\",[21254]],[[194603,194603],\"mapped\",[21271]],[[194604,194604],\"mapped\",[21321]],[[194605,194605],\"mapped\",[21329]],[[194606,194606],\"mapped\",[21338]],[[194607,194607],\"mapped\",[21363]],[[194608,194608],\"mapped\",[21373]],[[194609,194611],\"mapped\",[21375]],[[194612,194612],\"mapped\",[133676]],[[194613,194613],\"mapped\",[28784]],[[194614,194614],\"mapped\",[21450]],[[194615,194615],\"mapped\",[21471]],[[194616,194616],\"mapped\",[133987]],[[194617,194617],\"mapped\",[21483]],[[194618,194618],\"mapped\",[21489]],[[194619,194619],\"mapped\",[21510]],[[194620,194620],\"mapped\",[21662]],[[194621,194621],\"mapped\",[21560]],[[194622,194622],\"mapped\",[21576]],[[194623,194623],\"mapped\",[21608]],[[194624,194624],\"mapped\",[21666]],[[194625,194625],\"mapped\",[21750]],[[194626,194626],\"mapped\",[21776]],[[194627,194627],\"mapped\",[21843]],[[194628,194628],\"mapped\",[21859]],[[194629,194630],\"mapped\",[21892]],[[194631,194631],\"mapped\",[21913]],[[194632,194632],\"mapped\",[21931]],[[194633,194633],\"mapped\",[21939]],[[194634,194634],\"mapped\",[21954]],[[194635,194635],\"mapped\",[22294]],[[194636,194636],\"mapped\",[22022]],[[194637,194637],\"mapped\",[22295]],[[194638,194638],\"mapped\",[22097]],[[194639,194639],\"mapped\",[22132]],[[194640,194640],\"mapped\",[20999]],[[194641,194641],\"mapped\",[22766]],[[194642,194642],\"mapped\",[22478]],[[194643,194643],\"mapped\",[22516]],[[194644,194644],\"mapped\",[22541]],[[194645,194645],\"mapped\",[22411]],[[194646,194646],\"mapped\",[22578]],[[194647,194647],\"mapped\",[22577]],[[194648,194648],\"mapped\",[22700]],[[194649,194649],\"mapped\",[136420]],[[194650,194650],\"mapped\",[22770]],[[194651,194651],\"mapped\",[22775]],[[194652,194652],\"mapped\",[22790]],[[194653,194653],\"mapped\",[22810]],[[194654,194654],\"mapped\",[22818]],[[194655,194655],\"mapped\",[22882]],[[194656,194656],\"mapped\",[136872]],[[194657,194657],\"mapped\",[136938]],[[194658,194658],\"mapped\",[23020]],[[194659,194659],\"mapped\",[23067]],[[194660,194660],\"mapped\",[23079]],[[194661,194661],\"mapped\",[23000]],[[194662,194662],\"mapped\",[23142]],[[194663,194663],\"mapped\",[14062]],[[194664,194664],\"disallowed\"],[[194665,194665],\"mapped\",[23304]],[[194666,194667],\"mapped\",[23358]],[[194668,194668],\"mapped\",[137672]],[[194669,194669],\"mapped\",[23491]],[[194670,194670],\"mapped\",[23512]],[[194671,194671],\"mapped\",[23527]],[[194672,194672],\"mapped\",[23539]],[[194673,194673],\"mapped\",[138008]],[[194674,194674],\"mapped\",[23551]],[[194675,194675],\"mapped\",[23558]],[[194676,194676],\"disallowed\"],[[194677,194677],\"mapped\",[23586]],[[194678,194678],\"mapped\",[14209]],[[194679,194679],\"mapped\",[23648]],[[194680,194680],\"mapped\",[23662]],[[194681,194681],\"mapped\",[23744]],[[194682,194682],\"mapped\",[23693]],[[194683,194683],\"mapped\",[138724]],[[194684,194684],\"mapped\",[23875]],[[194685,194685],\"mapped\",[138726]],[[194686,194686],\"mapped\",[23918]],[[194687,194687],\"mapped\",[23915]],[[194688,194688],\"mapped\",[23932]],[[194689,194689],\"mapped\",[24033]],[[194690,194690],\"mapped\",[24034]],[[194691,194691],\"mapped\",[14383]],[[194692,194692],\"mapped\",[24061]],[[194693,194693],\"mapped\",[24104]],[[194694,194694],\"mapped\",[24125]],[[194695,194695],\"mapped\",[24169]],[[194696,194696],\"mapped\",[14434]],[[194697,194697],\"mapped\",[139651]],[[194698,194698],\"mapped\",[14460]],[[194699,194699],\"mapped\",[24240]],[[194700,194700],\"mapped\",[24243]],[[194701,194701],\"mapped\",[24246]],[[194702,194702],\"mapped\",[24266]],[[194703,194703],\"mapped\",[172946]],[[194704,194704],\"mapped\",[24318]],[[194705,194706],\"mapped\",[140081]],[[194707,194707],\"mapped\",[33281]],[[194708,194709],\"mapped\",[24354]],[[194710,194710],\"mapped\",[14535]],[[194711,194711],\"mapped\",[144056]],[[194712,194712],\"mapped\",[156122]],[[194713,194713],\"mapped\",[24418]],[[194714,194714],\"mapped\",[24427]],[[194715,194715],\"mapped\",[14563]],[[194716,194716],\"mapped\",[24474]],[[194717,194717],\"mapped\",[24525]],[[194718,194718],\"mapped\",[24535]],[[194719,194719],\"mapped\",[24569]],[[194720,194720],\"mapped\",[24705]],[[194721,194721],\"mapped\",[14650]],[[194722,194722],\"mapped\",[14620]],[[194723,194723],\"mapped\",[24724]],[[194724,194724],\"mapped\",[141012]],[[194725,194725],\"mapped\",[24775]],[[194726,194726],\"mapped\",[24904]],[[194727,194727],\"mapped\",[24908]],[[194728,194728],\"mapped\",[24910]],[[194729,194729],\"mapped\",[24908]],[[194730,194730],\"mapped\",[24954]],[[194731,194731],\"mapped\",[24974]],[[194732,194732],\"mapped\",[25010]],[[194733,194733],\"mapped\",[24996]],[[194734,194734],\"mapped\",[25007]],[[194735,194735],\"mapped\",[25054]],[[194736,194736],\"mapped\",[25074]],[[194737,194737],\"mapped\",[25078]],[[194738,194738],\"mapped\",[25104]],[[194739,194739],\"mapped\",[25115]],[[194740,194740],\"mapped\",[25181]],[[194741,194741],\"mapped\",[25265]],[[194742,194742],\"mapped\",[25300]],[[194743,194743],\"mapped\",[25424]],[[194744,194744],\"mapped\",[142092]],[[194745,194745],\"mapped\",[25405]],[[194746,194746],\"mapped\",[25340]],[[194747,194747],\"mapped\",[25448]],[[194748,194748],\"mapped\",[25475]],[[194749,194749],\"mapped\",[25572]],[[194750,194750],\"mapped\",[142321]],[[194751,194751],\"mapped\",[25634]],[[194752,194752],\"mapped\",[25541]],[[194753,194753],\"mapped\",[25513]],[[194754,194754],\"mapped\",[14894]],[[194755,194755],\"mapped\",[25705]],[[194756,194756],\"mapped\",[25726]],[[194757,194757],\"mapped\",[25757]],[[194758,194758],\"mapped\",[25719]],[[194759,194759],\"mapped\",[14956]],[[194760,194760],\"mapped\",[25935]],[[194761,194761],\"mapped\",[25964]],[[194762,194762],\"mapped\",[143370]],[[194763,194763],\"mapped\",[26083]],[[194764,194764],\"mapped\",[26360]],[[194765,194765],\"mapped\",[26185]],[[194766,194766],\"mapped\",[15129]],[[194767,194767],\"mapped\",[26257]],[[194768,194768],\"mapped\",[15112]],[[194769,194769],\"mapped\",[15076]],[[194770,194770],\"mapped\",[20882]],[[194771,194771],\"mapped\",[20885]],[[194772,194772],\"mapped\",[26368]],[[194773,194773],\"mapped\",[26268]],[[194774,194774],\"mapped\",[32941]],[[194775,194775],\"mapped\",[17369]],[[194776,194776],\"mapped\",[26391]],[[194777,194777],\"mapped\",[26395]],[[194778,194778],\"mapped\",[26401]],[[194779,194779],\"mapped\",[26462]],[[194780,194780],\"mapped\",[26451]],[[194781,194781],\"mapped\",[144323]],[[194782,194782],\"mapped\",[15177]],[[194783,194783],\"mapped\",[26618]],[[194784,194784],\"mapped\",[26501]],[[194785,194785],\"mapped\",[26706]],[[194786,194786],\"mapped\",[26757]],[[194787,194787],\"mapped\",[144493]],[[194788,194788],\"mapped\",[26766]],[[194789,194789],\"mapped\",[26655]],[[194790,194790],\"mapped\",[26900]],[[194791,194791],\"mapped\",[15261]],[[194792,194792],\"mapped\",[26946]],[[194793,194793],\"mapped\",[27043]],[[194794,194794],\"mapped\",[27114]],[[194795,194795],\"mapped\",[27304]],[[194796,194796],\"mapped\",[145059]],[[194797,194797],\"mapped\",[27355]],[[194798,194798],\"mapped\",[15384]],[[194799,194799],\"mapped\",[27425]],[[194800,194800],\"mapped\",[145575]],[[194801,194801],\"mapped\",[27476]],[[194802,194802],\"mapped\",[15438]],[[194803,194803],\"mapped\",[27506]],[[194804,194804],\"mapped\",[27551]],[[194805,194805],\"mapped\",[27578]],[[194806,194806],\"mapped\",[27579]],[[194807,194807],\"mapped\",[146061]],[[194808,194808],\"mapped\",[138507]],[[194809,194809],\"mapped\",[146170]],[[194810,194810],\"mapped\",[27726]],[[194811,194811],\"mapped\",[146620]],[[194812,194812],\"mapped\",[27839]],[[194813,194813],\"mapped\",[27853]],[[194814,194814],\"mapped\",[27751]],[[194815,194815],\"mapped\",[27926]],[[194816,194816],\"mapped\",[27966]],[[194817,194817],\"mapped\",[28023]],[[194818,194818],\"mapped\",[27969]],[[194819,194819],\"mapped\",[28009]],[[194820,194820],\"mapped\",[28024]],[[194821,194821],\"mapped\",[28037]],[[194822,194822],\"mapped\",[146718]],[[194823,194823],\"mapped\",[27956]],[[194824,194824],\"mapped\",[28207]],[[194825,194825],\"mapped\",[28270]],[[194826,194826],\"mapped\",[15667]],[[194827,194827],\"mapped\",[28363]],[[194828,194828],\"mapped\",[28359]],[[194829,194829],\"mapped\",[147153]],[[194830,194830],\"mapped\",[28153]],[[194831,194831],\"mapped\",[28526]],[[194832,194832],\"mapped\",[147294]],[[194833,194833],\"mapped\",[147342]],[[194834,194834],\"mapped\",[28614]],[[194835,194835],\"mapped\",[28729]],[[194836,194836],\"mapped\",[28702]],[[194837,194837],\"mapped\",[28699]],[[194838,194838],\"mapped\",[15766]],[[194839,194839],\"mapped\",[28746]],[[194840,194840],\"mapped\",[28797]],[[194841,194841],\"mapped\",[28791]],[[194842,194842],\"mapped\",[28845]],[[194843,194843],\"mapped\",[132389]],[[194844,194844],\"mapped\",[28997]],[[194845,194845],\"mapped\",[148067]],[[194846,194846],\"mapped\",[29084]],[[194847,194847],\"disallowed\"],[[194848,194848],\"mapped\",[29224]],[[194849,194849],\"mapped\",[29237]],[[194850,194850],\"mapped\",[29264]],[[194851,194851],\"mapped\",[149000]],[[194852,194852],\"mapped\",[29312]],[[194853,194853],\"mapped\",[29333]],[[194854,194854],\"mapped\",[149301]],[[194855,194855],\"mapped\",[149524]],[[194856,194856],\"mapped\",[29562]],[[194857,194857],\"mapped\",[29579]],[[194858,194858],\"mapped\",[16044]],[[194859,194859],\"mapped\",[29605]],[[194860,194861],\"mapped\",[16056]],[[194862,194862],\"mapped\",[29767]],[[194863,194863],\"mapped\",[29788]],[[194864,194864],\"mapped\",[29809]],[[194865,194865],\"mapped\",[29829]],[[194866,194866],\"mapped\",[29898]],[[194867,194867],\"mapped\",[16155]],[[194868,194868],\"mapped\",[29988]],[[194869,194869],\"mapped\",[150582]],[[194870,194870],\"mapped\",[30014]],[[194871,194871],\"mapped\",[150674]],[[194872,194872],\"mapped\",[30064]],[[194873,194873],\"mapped\",[139679]],[[194874,194874],\"mapped\",[30224]],[[194875,194875],\"mapped\",[151457]],[[194876,194876],\"mapped\",[151480]],[[194877,194877],\"mapped\",[151620]],[[194878,194878],\"mapped\",[16380]],[[194879,194879],\"mapped\",[16392]],[[194880,194880],\"mapped\",[30452]],[[194881,194881],\"mapped\",[151795]],[[194882,194882],\"mapped\",[151794]],[[194883,194883],\"mapped\",[151833]],[[194884,194884],\"mapped\",[151859]],[[194885,194885],\"mapped\",[30494]],[[194886,194887],\"mapped\",[30495]],[[194888,194888],\"mapped\",[30538]],[[194889,194889],\"mapped\",[16441]],[[194890,194890],\"mapped\",[30603]],[[194891,194891],\"mapped\",[16454]],[[194892,194892],\"mapped\",[16534]],[[194893,194893],\"mapped\",[152605]],[[194894,194894],\"mapped\",[30798]],[[194895,194895],\"mapped\",[30860]],[[194896,194896],\"mapped\",[30924]],[[194897,194897],\"mapped\",[16611]],[[194898,194898],\"mapped\",[153126]],[[194899,194899],\"mapped\",[31062]],[[194900,194900],\"mapped\",[153242]],[[194901,194901],\"mapped\",[153285]],[[194902,194902],\"mapped\",[31119]],[[194903,194903],\"mapped\",[31211]],[[194904,194904],\"mapped\",[16687]],[[194905,194905],\"mapped\",[31296]],[[194906,194906],\"mapped\",[31306]],[[194907,194907],\"mapped\",[31311]],[[194908,194908],\"mapped\",[153980]],[[194909,194910],\"mapped\",[154279]],[[194911,194911],\"disallowed\"],[[194912,194912],\"mapped\",[16898]],[[194913,194913],\"mapped\",[154539]],[[194914,194914],\"mapped\",[31686]],[[194915,194915],\"mapped\",[31689]],[[194916,194916],\"mapped\",[16935]],[[194917,194917],\"mapped\",[154752]],[[194918,194918],\"mapped\",[31954]],[[194919,194919],\"mapped\",[17056]],[[194920,194920],\"mapped\",[31976]],[[194921,194921],\"mapped\",[31971]],[[194922,194922],\"mapped\",[32000]],[[194923,194923],\"mapped\",[155526]],[[194924,194924],\"mapped\",[32099]],[[194925,194925],\"mapped\",[17153]],[[194926,194926],\"mapped\",[32199]],[[194927,194927],\"mapped\",[32258]],[[194928,194928],\"mapped\",[32325]],[[194929,194929],\"mapped\",[17204]],[[194930,194930],\"mapped\",[156200]],[[194931,194931],\"mapped\",[156231]],[[194932,194932],\"mapped\",[17241]],[[194933,194933],\"mapped\",[156377]],[[194934,194934],\"mapped\",[32634]],[[194935,194935],\"mapped\",[156478]],[[194936,194936],\"mapped\",[32661]],[[194937,194937],\"mapped\",[32762]],[[194938,194938],\"mapped\",[32773]],[[194939,194939],\"mapped\",[156890]],[[194940,194940],\"mapped\",[156963]],[[194941,194941],\"mapped\",[32864]],[[194942,194942],\"mapped\",[157096]],[[194943,194943],\"mapped\",[32880]],[[194944,194944],\"mapped\",[144223]],[[194945,194945],\"mapped\",[17365]],[[194946,194946],\"mapped\",[32946]],[[194947,194947],\"mapped\",[33027]],[[194948,194948],\"mapped\",[17419]],[[194949,194949],\"mapped\",[33086]],[[194950,194950],\"mapped\",[23221]],[[194951,194951],\"mapped\",[157607]],[[194952,194952],\"mapped\",[157621]],[[194953,194953],\"mapped\",[144275]],[[194954,194954],\"mapped\",[144284]],[[194955,194955],\"mapped\",[33281]],[[194956,194956],\"mapped\",[33284]],[[194957,194957],\"mapped\",[36766]],[[194958,194958],\"mapped\",[17515]],[[194959,194959],\"mapped\",[33425]],[[194960,194960],\"mapped\",[33419]],[[194961,194961],\"mapped\",[33437]],[[194962,194962],\"mapped\",[21171]],[[194963,194963],\"mapped\",[33457]],[[194964,194964],\"mapped\",[33459]],[[194965,194965],\"mapped\",[33469]],[[194966,194966],\"mapped\",[33510]],[[194967,194967],\"mapped\",[158524]],[[194968,194968],\"mapped\",[33509]],[[194969,194969],\"mapped\",[33565]],[[194970,194970],\"mapped\",[33635]],[[194971,194971],\"mapped\",[33709]],[[194972,194972],\"mapped\",[33571]],[[194973,194973],\"mapped\",[33725]],[[194974,194974],\"mapped\",[33767]],[[194975,194975],\"mapped\",[33879]],[[194976,194976],\"mapped\",[33619]],[[194977,194977],\"mapped\",[33738]],[[194978,194978],\"mapped\",[33740]],[[194979,194979],\"mapped\",[33756]],[[194980,194980],\"mapped\",[158774]],[[194981,194981],\"mapped\",[159083]],[[194982,194982],\"mapped\",[158933]],[[194983,194983],\"mapped\",[17707]],[[194984,194984],\"mapped\",[34033]],[[194985,194985],\"mapped\",[34035]],[[194986,194986],\"mapped\",[34070]],[[194987,194987],\"mapped\",[160714]],[[194988,194988],\"mapped\",[34148]],[[194989,194989],\"mapped\",[159532]],[[194990,194990],\"mapped\",[17757]],[[194991,194991],\"mapped\",[17761]],[[194992,194992],\"mapped\",[159665]],[[194993,194993],\"mapped\",[159954]],[[194994,194994],\"mapped\",[17771]],[[194995,194995],\"mapped\",[34384]],[[194996,194996],\"mapped\",[34396]],[[194997,194997],\"mapped\",[34407]],[[194998,194998],\"mapped\",[34409]],[[194999,194999],\"mapped\",[34473]],[[195000,195000],\"mapped\",[34440]],[[195001,195001],\"mapped\",[34574]],[[195002,195002],\"mapped\",[34530]],[[195003,195003],\"mapped\",[34681]],[[195004,195004],\"mapped\",[34600]],[[195005,195005],\"mapped\",[34667]],[[195006,195006],\"mapped\",[34694]],[[195007,195007],\"disallowed\"],[[195008,195008],\"mapped\",[34785]],[[195009,195009],\"mapped\",[34817]],[[195010,195010],\"mapped\",[17913]],[[195011,195011],\"mapped\",[34912]],[[195012,195012],\"mapped\",[34915]],[[195013,195013],\"mapped\",[161383]],[[195014,195014],\"mapped\",[35031]],[[195015,195015],\"mapped\",[35038]],[[195016,195016],\"mapped\",[17973]],[[195017,195017],\"mapped\",[35066]],[[195018,195018],\"mapped\",[13499]],[[195019,195019],\"mapped\",[161966]],[[195020,195020],\"mapped\",[162150]],[[195021,195021],\"mapped\",[18110]],[[195022,195022],\"mapped\",[18119]],[[195023,195023],\"mapped\",[35488]],[[195024,195024],\"mapped\",[35565]],[[195025,195025],\"mapped\",[35722]],[[195026,195026],\"mapped\",[35925]],[[195027,195027],\"mapped\",[162984]],[[195028,195028],\"mapped\",[36011]],[[195029,195029],\"mapped\",[36033]],[[195030,195030],\"mapped\",[36123]],[[195031,195031],\"mapped\",[36215]],[[195032,195032],\"mapped\",[163631]],[[195033,195033],\"mapped\",[133124]],[[195034,195034],\"mapped\",[36299]],[[195035,195035],\"mapped\",[36284]],[[195036,195036],\"mapped\",[36336]],[[195037,195037],\"mapped\",[133342]],[[195038,195038],\"mapped\",[36564]],[[195039,195039],\"mapped\",[36664]],[[195040,195040],\"mapped\",[165330]],[[195041,195041],\"mapped\",[165357]],[[195042,195042],\"mapped\",[37012]],[[195043,195043],\"mapped\",[37105]],[[195044,195044],\"mapped\",[37137]],[[195045,195045],\"mapped\",[165678]],[[195046,195046],\"mapped\",[37147]],[[195047,195047],\"mapped\",[37432]],[[195048,195048],\"mapped\",[37591]],[[195049,195049],\"mapped\",[37592]],[[195050,195050],\"mapped\",[37500]],[[195051,195051],\"mapped\",[37881]],[[195052,195052],\"mapped\",[37909]],[[195053,195053],\"mapped\",[166906]],[[195054,195054],\"mapped\",[38283]],[[195055,195055],\"mapped\",[18837]],[[195056,195056],\"mapped\",[38327]],[[195057,195057],\"mapped\",[167287]],[[195058,195058],\"mapped\",[18918]],[[195059,195059],\"mapped\",[38595]],[[195060,195060],\"mapped\",[23986]],[[195061,195061],\"mapped\",[38691]],[[195062,195062],\"mapped\",[168261]],[[195063,195063],\"mapped\",[168474]],[[195064,195064],\"mapped\",[19054]],[[195065,195065],\"mapped\",[19062]],[[195066,195066],\"mapped\",[38880]],[[195067,195067],\"mapped\",[168970]],[[195068,195068],\"mapped\",[19122]],[[195069,195069],\"mapped\",[169110]],[[195070,195071],\"mapped\",[38923]],[[195072,195072],\"mapped\",[38953]],[[195073,195073],\"mapped\",[169398]],[[195074,195074],\"mapped\",[39138]],[[195075,195075],\"mapped\",[19251]],[[195076,195076],\"mapped\",[39209]],[[195077,195077],\"mapped\",[39335]],[[195078,195078],\"mapped\",[39362]],[[195079,195079],\"mapped\",[39422]],[[195080,195080],\"mapped\",[19406]],[[195081,195081],\"mapped\",[170800]],[[195082,195082],\"mapped\",[39698]],[[195083,195083],\"mapped\",[40000]],[[195084,195084],\"mapped\",[40189]],[[195085,195085],\"mapped\",[19662]],[[195086,195086],\"mapped\",[19693]],[[195087,195087],\"mapped\",[40295]],[[195088,195088],\"mapped\",[172238]],[[195089,195089],\"mapped\",[19704]],[[195090,195090],\"mapped\",[172293]],[[195091,195091],\"mapped\",[172558]],[[195092,195092],\"mapped\",[172689]],[[195093,195093],\"mapped\",[40635]],[[195094,195094],\"mapped\",[19798]],[[195095,195095],\"mapped\",[40697]],[[195096,195096],\"mapped\",[40702]],[[195097,195097],\"mapped\",[40709]],[[195098,195098],\"mapped\",[40719]],[[195099,195099],\"mapped\",[40726]],[[195100,195100],\"mapped\",[40763]],[[195101,195101],\"mapped\",[173568]],[[195102,196605],\"disallowed\"],[[196606,196607],\"disallowed\"],[[196608,262141],\"disallowed\"],[[262142,262143],\"disallowed\"],[[262144,327677],\"disallowed\"],[[327678,327679],\"disallowed\"],[[327680,393213],\"disallowed\"],[[393214,393215],\"disallowed\"],[[393216,458749],\"disallowed\"],[[458750,458751],\"disallowed\"],[[458752,524285],\"disallowed\"],[[524286,524287],\"disallowed\"],[[524288,589821],\"disallowed\"],[[589822,589823],\"disallowed\"],[[589824,655357],\"disallowed\"],[[655358,655359],\"disallowed\"],[[655360,720893],\"disallowed\"],[[720894,720895],\"disallowed\"],[[720896,786429],\"disallowed\"],[[786430,786431],\"disallowed\"],[[786432,851965],\"disallowed\"],[[851966,851967],\"disallowed\"],[[851968,917501],\"disallowed\"],[[917502,917503],\"disallowed\"],[[917504,917504],\"disallowed\"],[[917505,917505],\"disallowed\"],[[917506,917535],\"disallowed\"],[[917536,917631],\"disallowed\"],[[917632,917759],\"disallowed\"],[[917760,917999],\"ignored\"],[[918000,983037],\"disallowed\"],[[983038,983039],\"disallowed\"],[[983040,1048573],\"disallowed\"],[[1048574,1048575],\"disallowed\"],[[1048576,1114109],\"disallowed\"],[[1114110,1114111],\"disallowed\"]]");

/***/ }),

/***/ 2357:
/***/ ((module) => {

"use strict";
module.exports = require("assert");;

/***/ }),

/***/ 8614:
/***/ ((module) => {

"use strict";
module.exports = require("events");;

/***/ }),

/***/ 5747:
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ 8605:
/***/ ((module) => {

"use strict";
module.exports = require("http");;

/***/ }),

/***/ 7211:
/***/ ((module) => {

"use strict";
module.exports = require("https");;

/***/ }),

/***/ 1631:
/***/ ((module) => {

"use strict";
module.exports = require("net");;

/***/ }),

/***/ 2087:
/***/ ((module) => {

"use strict";
module.exports = require("os");;

/***/ }),

/***/ 5622:
/***/ ((module) => {

"use strict";
module.exports = require("path");;

/***/ }),

/***/ 4213:
/***/ ((module) => {

"use strict";
module.exports = require("punycode");;

/***/ }),

/***/ 2413:
/***/ ((module) => {

"use strict";
module.exports = require("stream");;

/***/ }),

/***/ 4016:
/***/ ((module) => {

"use strict";
module.exports = require("tls");;

/***/ }),

/***/ 8835:
/***/ ((module) => {

"use strict";
module.exports = require("url");;

/***/ }),

/***/ 1669:
/***/ ((module) => {

"use strict";
module.exports = require("util");;

/***/ }),

/***/ 8761:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(1713);
/******/ })()
;
//# sourceMappingURL=index.js.map
window.__ModuleLoader__.load({ id: "dsh-pixel-ui", factory: (require) => { var module = { exports: {} }; var exports = module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.js
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_client = require("@deepseek-ai/dsh-client-runtime/client");

// src/client/pixel.css
var pixel_default = `/* dsh-pixel-ui — 星露谷风像素皮肤（木屋/羊皮纸/暖阳/终端绿四主题）\r
 * 全面对标 Agent Xi 前端像素语言（web/src/styles/main.css）：\r
 *   - 木色/金色/羊皮纸三系色板 + 阶梯硬阴影 + 内凹/凸起 bevel\r
 *   - 像素字体做界面装饰（标题/页签/按钮/徽章/输入框），正文与代码走 mono\r
 *   - 木纹条纹纹理、CRT 扫描线 + 暗角 + 微闪烁、像素光标、像素按压动效\r
 * 作用域 html[data-pixel-ui]：任一像素主题激活时生效，\r
 * data-pixel-theme 区分四种配色。切回 现代默认/浅色/深色 即整体退出。\r
 * 原则：颜色尽量交给主题 token，本表负责 token 表达不了的像素质感。 */\r
\r
@font-face {\r
  font-family: 'Fusion Pixel 12';\r
  src: url('/dsh-pixel-ui/fonts/fusion-pixel-12px.woff2') format('woff2');\r
  font-weight: 400;\r
  font-style: normal;\r
  font-display: swap;\r
}\r
@font-face {\r
  font-family: 'Press Start 2P';\r
  src: url('/dsh-pixel-ui/fonts/PressStart2P-Regular.ttf') format('truetype');\r
  font-weight: 400;\r
  font-style: normal;\r
  font-display: swap;\r
}\r
\r
html[data-pixel-ui] {\r
  /* ── Xi 同款色板 ─────────────────────────────────────── */\r
  --px-wood-darkest: #1A0F06;\r
  --px-wood-dark: #2C1A0C;\r
  --px-wood-mid: #3A2515;\r
  --px-wood-warm: #4A3020;\r
  --px-wood-light: #6B4C2E;\r
  --px-wood-pale: #8B6B45;\r
  --px-gold: #F4D03F;\r
  --px-gold-bright: #FFE066;\r
  --px-gold-dark: #C99A00;\r
  --px-gold-deep: #8B6B00;\r
  --px-parchment: #F5E6C8;\r
  --px-text-on-dark: #E8D5B0;\r
  --px-text-light: #9B7B5B;\r
\r
  /* 输入框专用色（各主题单独覆盖，保证任何底色下文字可见） */\r
  --px-input-bg: #1A0F06;\r
  --px-input-text: #FFFDF5;\r
  --px-input-caret: #F4D03F;\r
  --px-input-ph: #B08A5E;\r
\r
  /* 文字阴影强度：暗色主题用 2px 像素硬阴影，浅色主题收敛防重影 */\r
  --px-ts-chrome: 2px 2px 0 rgba(26, 15, 6, 0.6), -1px -1px 0 rgba(26, 15, 6, 0.4);\r
  --px-ts-btn: 1px 1px 0 rgba(0, 0, 0, 0.4);\r
\r
  /* CRT 覆盖层强度（暗色主题）：扫描线 + 暗角，浅色主题另行收敛 */\r
  --px-scan: rgba(0, 0, 0, 0.1);\r
  --px-vignette: rgba(0, 0, 0, 0.22);\r
\r
  /* 侧边栏色阶：整体比内容区亮一档，读出「凸起面板」而非凹槽 */\r
  --px-sidebar-hi: #6B4C2E;\r
  --px-sidebar-lo: #4A3020;\r
\r
  /* 像素字体栈：中文/全角走 fusion-pixel（12px 原生），英文数字兜底 Press Start 2P */\r
  --px-font: 'Fusion Pixel 12', 'Press Start 2P', monospace;\r
  --px-mono: 'Cascadia Code', 'Consolas', 'Courier New', monospace;\r
}\r
\r
/* ── 四主题色板（Agent Xi 同款）────────────────────────── */\r
html[data-pixel-theme='pixel-paper'] {\r
  --px-wood-darkest: #F0E8D8;\r
  --px-wood-dark: #E8DCC8;\r
  --px-wood-mid: #DDD0B8;\r
  --px-wood-warm: #D4C4A8;\r
  --px-wood-light: #B8A080;\r
  --px-wood-pale: #9B8B6B;\r
  --px-gold: #C8960C;\r
  --px-gold-bright: #E0A800;\r
  --px-gold-dark: #A07000;\r
  --px-gold-deep: #805000;\r
  --px-parchment: #FFFDF5;\r
  --px-text-on-dark: #3A2A10;\r
  --px-text-light: #8B7040;\r
  --px-input-bg: #FFFDF5;\r
  --px-input-text: #3A2A10;\r
  --px-input-caret: #C8960C;\r
  --px-input-ph: #8B7040;\r
  /* 浅色底上 2px 硬阴影会变重影：去掉文字阴影，靠字体本身 */\r
  --px-ts-chrome: none;\r
  --px-ts-btn: none;\r
  /* 浅色底收敛 CRT：扫描线更轻，暗角几乎取消 */\r
  --px-scan: rgba(0, 0, 0, 0.05);\r
  --px-vignette: rgba(0, 0, 0, 0.08);\r
  /* 浅色主题：侧栏用更亮的奶油白，与内容区（#F0E8D8）区分 */\r
  --px-sidebar-hi: #FFFDF5;\r
  --px-sidebar-lo: #E8DCC8;\r
}\r
html[data-pixel-theme='pixel-warm'] {\r
  --px-wood-darkest: #1E0E04;\r
  --px-wood-dark: #34180A;\r
  --px-wood-mid: #4A2210;\r
  --px-wood-warm: #5C2E16;\r
  --px-wood-light: #8B4A28;\r
  --px-wood-pale: #A86B40;\r
  --px-gold: #FF8C42;\r
  --px-gold-bright: #FFA64D;\r
  --px-gold-dark: #D96E30;\r
  --px-gold-deep: #A05020;\r
  --px-parchment: #FFF0E0;\r
  --px-text-on-dark: #F0C8A0;\r
  --px-text-light: #A86B40;\r
  --px-input-bg: #1E0E04;\r
  --px-input-text: #FFFBF5;\r
  --px-input-caret: #FF8C42;\r
  --px-input-ph: #C08A5C;\r
  --px-sidebar-hi: #8B4A28;\r
  --px-sidebar-lo: #5C2E16;\r
}\r
html[data-pixel-theme='pixel-retro'] {\r
  --px-wood-darkest: #0A0E0A;\r
  --px-wood-dark: #0E140E;\r
  --px-wood-mid: #121A12;\r
  --px-wood-warm: #162016;\r
  --px-wood-light: #2A402A;\r
  --px-wood-pale: #3A5A3A;\r
  --px-gold: #33FF33;\r
  --px-gold-bright: #66FF66;\r
  --px-gold-dark: #00CC00;\r
  --px-gold-deep: #009900;\r
  --px-parchment: #0A1A0A;\r
  --px-text-on-dark: #33FF33;\r
  --px-text-light: #118811;\r
  --px-input-bg: #0A0E0A;\r
  --px-input-text: #33FF33;\r
  --px-input-caret: #33FF33;\r
  --px-input-ph: #118811;\r
  --px-sidebar-hi: #2A402A;\r
  --px-sidebar-lo: #162016;\r
}\r
\r
/* ── 全局质感：禁次像素平滑（像素字体的灵魂）、位图三件套、方形化 ── */\r
html[data-pixel-ui] body {\r
  -webkit-font-smoothing: none;\r
  -moz-osx-font-smoothing: grayscale;\r
  text-rendering: geometricPrecision;\r
  font-family: var(--px-font) !important;\r
  letter-spacing: 0.01em;\r
}\r
\r
html[data-pixel-ui] img,\r
html[data-pixel-ui] canvas,\r
html[data-pixel-ui] video {\r
  image-rendering: -moz-crisp-edges;\r
  image-rendering: crisp-edges;\r
  image-rendering: pixelated;\r
}\r
\r
/* 一切皆方角（像素风第一原则） */\r
html[data-pixel-ui] * {\r
  border-radius: 0 !important;\r
}\r
\r
html[data-pixel-ui] ::selection {\r
  background: var(--px-gold);\r
  color: var(--px-wood-darkest);\r
}\r
\r
html[data-pixel-ui] :focus-visible {\r
  outline: 2px solid var(--px-gold) !important;\r
  outline-offset: 1px;\r
}\r
\r
/* ── 像素滚动条：方形、木色 ────────────────────────────── */\r
html[data-pixel-ui] ::-webkit-scrollbar { width: 10px; height: 10px; }\r
html[data-pixel-ui] ::-webkit-scrollbar-track {\r
  background: var(--px-wood-darkest);\r
  border-left: 2px solid var(--px-wood-dark);\r
}\r
html[data-pixel-ui] ::-webkit-scrollbar-thumb {\r
  background: var(--px-wood-light);\r
  border: 2px solid var(--px-wood-darkest);\r
}\r
html[data-pixel-ui] ::-webkit-scrollbar-thumb:hover { background: var(--px-wood-pale); }\r
\r
/* ── 排版：装饰性 UI 用像素字体，正文/代码用 mono（Xi 的信息分层） ── */\r
html[data-pixel-ui] h1,\r
html[data-pixel-ui] h2,\r
html[data-pixel-ui] h3,\r
html[data-pixel-ui] [class*='title'],\r
html[data-pixel-ui] [class*='label'],\r
html[data-pixel-ui] [class*='tab'],\r
html[data-pixel-ui] [class*='badge'],\r
html[data-pixel-ui] [class*='chip'],\r
html[data-pixel-ui] [class*='Tag'],\r
html[data-pixel-ui] [class*='pill'] {\r
  font-family: var(--px-font) !important;\r
  text-shadow: var(--px-ts-chrome);\r
}\r
\r
/* 标题/页签取金色（Xi .panel-title 语义） */\r
html[data-pixel-ui] h1,\r
html[data-pixel-ui] h2,\r
html[data-pixel-ui] h3,\r
html[data-pixel-ui] [class*='title'] {\r
  color: var(--px-gold-bright) !important;\r
  letter-spacing: 0.02em;\r
}\r
\r
/* 页签/分段控件（对话/轨迹）：选中凸起+金底边，未选内凹——去掉按钮式重边框，避免与顶栏双框打架 */\r
html[data-pixel-ui] [role='tab'],\r
html[data-pixel-ui] [class*='tab']:not([class*='table']) {\r
  font-size: 12px;\r
  border: 2px solid #000 !important;\r
  background-color: var(--px-wood-dark) !important;\r
  color: var(--px-text-light) !important;\r
  box-shadow: inset 2px 2px 0 rgba(0, 0, 0, 0.35) !important;\r
  transition: box-shadow 0.06s steps(2), background-color 0.06s steps(2);\r
}\r
html[data-pixel-ui] [role='tab'][aria-selected='true'],\r
html[data-pixel-ui] [class*='tab'][class*='active']:not([class*='table']) {\r
  color: var(--px-parchment) !important;\r
  background-color: var(--px-wood-mid) !important;\r
  box-shadow:\r
    inset 2px 2px 0 var(--px-wood-pale),\r
    inset -2px -2px 0 rgba(0, 0, 0, 0.5),\r
    inset 0 -3px 0 var(--px-gold) !important;\r
}\r
/* 其它 aria-selected 元素只给金色底边，不套页签凸起 */\r
html[data-pixel-ui] [aria-selected='true']:not([role='tab']):not([class*='tab']) {\r
  box-shadow: inset 0 -3px 0 var(--px-gold) !important;\r
}\r
\r
/* 徽章/小标签：切角 + 内凹高光（小元素才有资格切角，避免大块裁阴影） */\r
html[data-pixel-ui] [class*='badge'],\r
html[data-pixel-ui] [class*='chip'],\r
html[data-pixel-ui] [class*='Tag'],\r
html[data-pixel-ui] [class*='pill'] {\r
  font-size: 11px;\r
  line-height: 1.5;\r
  border: 1px solid #000 !important;\r
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.3) !important;\r
  clip-path: polygon(\r
    0 2px, 2px 2px, 2px 0,\r
    calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px,\r
    100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%,\r
    2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px)\r
  );\r
}\r
\r
/* ── 正文/消息/代码：mono 内容层（Xi log 区用 Fira Code 的忠实移植） ── */\r
html[data-pixel-ui] [class*='message'],\r
html[data-pixel-ui] [class*='bubble'],\r
html[data-pixel-ui] [class*='markdown'],\r
html[data-pixel-ui] [class*='content'],\r
html[data-pixel-ui] pre,\r
html[data-pixel-ui] code,\r
html[data-pixel-ui] [class*='code'] {\r
  font-family: var(--px-mono) !important;\r
  letter-spacing: 0;\r
  text-shadow: none;\r
}\r
\r
/* 消息行：左侧木色竖条（Xi .log-row 色带，统一木色） */\r
html[data-pixel-ui] [class*='message'],\r
html[data-pixel-ui] [class*='bubble'] {\r
  border-left: 3px solid var(--px-wood-warm) !important;\r
}\r
\r
/* 代码块：黑底木边（Xi .log-code-wrap） */\r
html[data-pixel-ui] pre,\r
html[data-pixel-ui] [class*='code'] {\r
  background: var(--px-wood-darkest) !important;\r
  color: var(--px-text-on-dark) !important;\r
  border: 2px solid var(--px-wood-light) !important;\r
  box-shadow: inset 2px 2px 0 rgba(0, 0, 0, 0.4) !important;\r
}\r
/* 行内代码：暗底金字 */\r
html[data-pixel-ui] code {\r
  background: rgba(0, 0, 0, 0.4) !important;\r
  color: var(--px-gold-bright) !important;\r
  border: 1px solid rgba(0, 0, 0, 0.12) !important;\r
  padding: 0 4px;\r
}\r
html[data-pixel-ui] pre code {\r
  background: transparent !important;\r
  color: inherit !important;\r
  border: none !important;\r
  padding: 0;\r
}\r
\r
/* ── 按钮：8-bit 凸起 + 阶梯硬阴影 + 悬停抬升 + 按压沉底 ── */\r
html[data-pixel-ui] button,\r
html[data-pixel-ui] [role='button'],\r
html[data-pixel-ui] [class*='btn'],\r
html[data-pixel-ui] [class*='Button'] {\r
  font-family: var(--px-font) !important;\r
  font-size: 12px;\r
  letter-spacing: 0.02em;\r
  border: 2px solid #000 !important;\r
  box-shadow:\r
    inset 2px 2px 0 rgba(255, 248, 231, 0.22),\r
    inset -2px -2px 0 rgba(0, 0, 0, 0.5),\r
    2px 2px 0 #000,\r
    3px 3px 0 rgba(0, 0, 0, 0.6) !important;\r
  text-shadow: var(--px-ts-btn);\r
  transition: transform 0.08s steps(2), box-shadow 0.08s steps(2), filter 0.08s steps(2);\r
}\r
html[data-pixel-ui] button:hover,\r
html[data-pixel-ui] [role='button']:hover,\r
html[data-pixel-ui] [class*='btn']:hover,\r
html[data-pixel-ui] [class*='Button']:hover {\r
  filter: brightness(1.1);\r
  transform: translate(-2px, -2px);\r
  box-shadow:\r
    inset 2px 2px 0 rgba(255, 248, 231, 0.25),\r
    inset -2px -2px 0 rgba(0, 0, 0, 0.4),\r
    4px 4px 0 #000,\r
    5px 5px 0 rgba(0, 0, 0, 0.6) !important;\r
}\r
html[data-pixel-ui] button:active,\r
html[data-pixel-ui] [role='button']:active,\r
html[data-pixel-ui] [class*='btn']:active,\r
html[data-pixel-ui] [class*='Button']:active {\r
  transform: translate(2px, 2px);\r
  box-shadow:\r
    inset 2px 2px 0 rgba(0, 0, 0, 0.5),\r
    inset -2px -2px 0 rgba(255, 248, 231, 0.1) !important;\r
}\r
\r
/* 主按钮（品牌色）金边 */\r
html[data-pixel-ui] button[class*='primary'],\r
html[data-pixel-ui] [class*='btn-primary'] {\r
  border-color: var(--px-gold-deep) !important;\r
  box-shadow:\r
    inset 2px 2px 0 rgba(255, 224, 102, 0.5),\r
    inset -2px -2px 0 rgba(0, 0, 0, 0.5),\r
    2px 2px 0 #000,\r
    3px 3px 0 rgba(0, 0, 0, 0.6) !important;\r
}\r
\r
/* ── 输入框：黑木底 + 羊皮纸文字 + 金色光标（修复文字不可见） ──\r
 * 关键：必须显式给文字颜色。Xi #command-input：cream 字 / wood-darkest 底 /\r
 * gold-deep 边 / 3px 内凹，聚焦金边光环。 */\r
html[data-pixel-ui] input,\r
html[data-pixel-ui] textarea,\r
html[data-pixel-ui] select,\r
html[data-pixel-ui] [contenteditable='true'] {\r
  font-family: var(--px-font) !important;\r
  font-size: 12px;\r
  letter-spacing: 0;\r
  color: var(--px-input-text) !important;\r
  -webkit-text-fill-color: var(--px-input-text) !important;\r
  caret-color: var(--px-input-caret) !important;\r
  background-color: var(--px-input-bg) !important;\r
  border: 2px solid var(--px-gold-deep) !important;\r
  box-shadow:\r
    inset 3px 3px 0 rgba(0, 0, 0, 0.6),\r
    inset -1px -1px 0 rgba(244, 208, 63, 0.1),\r
    0 0 0 1px #000 !important;\r
}\r
html[data-pixel-ui] input:focus,\r
html[data-pixel-ui] textarea:focus,\r
html[data-pixel-ui] select:focus,\r
html[data-pixel-ui] [contenteditable='true']:focus {\r
  border-color: var(--px-gold) !important;\r
  box-shadow:\r
    inset 3px 3px 0 rgba(0, 0, 0, 0.6),\r
    0 0 0 2px var(--px-gold) !important;\r
}\r
/* 输入件自带金框聚焦环：关掉全局焦点描边，避免双环 */\r
html[data-pixel-ui] input:focus-visible,\r
html[data-pixel-ui] textarea:focus-visible,\r
html[data-pixel-ui] select:focus-visible,\r
html[data-pixel-ui] [contenteditable='true']:focus-visible {\r
  outline: none !important;\r
}\r
html[data-pixel-ui] input::placeholder,\r
html[data-pixel-ui] textarea::placeholder {\r
  color: var(--px-input-ph) !important;\r
  -webkit-text-fill-color: var(--px-input-ph) !important;\r
  opacity: 1;\r
}\r
/* 输入框容器只做边框质感，不压背景（避免把容器文字也染黑） */\r
html[data-pixel-ui] [class*='input'] {\r
  border-color: var(--px-gold-deep) !important;\r
}\r
\r
/* ── 面板/卡片/弹层：双框 + 阶梯硬阴影 + 木纹竖条 ────────── */\r
html[data-pixel-ui] [class*='panel'],\r
html[data-pixel-ui] [class*='card'],\r
html[data-pixel-ui] [class*='Card'],\r
html[data-pixel-ui] dialog,\r
html[data-pixel-ui] [role='dialog'],\r
html[data-pixel-ui] [class*='modal'],\r
html[data-pixel-ui] [class*='popover'],\r
html[data-pixel-ui] [class*='menu'],\r
html[data-pixel-ui] [class*='dropdown'],\r
html[data-pixel-ui] [class*='popup'] {\r
  border: 2px solid var(--px-wood-warm) !important;\r
  outline: 2px solid #000;\r
  outline-offset: -2px;\r
  box-shadow:\r
    inset 1px 1px 0 rgba(255, 255, 255, 0.08),\r
    inset -1px -1px 0 rgba(0, 0, 0, 0.4),\r
    2px 2px 0 #000,\r
    3px 3px 0 rgba(0, 0, 0, 0.6) !important;\r
  /* Xi 木纹：每 10px 一条 1px 暗竖纹 */\r
  background-image:\r
    repeating-linear-gradient(\r
      90deg,\r
      transparent 0px,\r
      transparent 10px,\r
      rgba(0, 0, 0, 0.06) 10px,\r
      rgba(0, 0, 0, 0.06) 11px\r
    ) !important;\r
  transition: transform 0.08s steps(2), box-shadow 0.08s steps(2);\r
}\r
\r
/* 卡片悬停：抬升 + 阴影加厚（Xi hover 位移），与按钮同款二阶过渡 */\r
html[data-pixel-ui] [class*='card']:hover,\r
html[data-pixel-ui] [class*='Card']:hover {\r
  transform: translate(-2px, -2px);\r
  box-shadow:\r
    inset 1px 1px 0 rgba(255, 255, 255, 0.1),\r
    inset -1px -1px 0 rgba(0, 0, 0, 0.4),\r
    4px 4px 0 #000,\r
    5px 5px 0 rgba(0, 0, 0, 0.6) !important;\r
}\r
html[data-pixel-ui] [class*='card']:active,\r
html[data-pixel-ui] [class*='Card']:active {\r
  transform: translate(0, 0);\r
  box-shadow:\r
    inset 2px 2px 0 rgba(0, 0, 0, 0.45),\r
    inset -1px -1px 0 rgba(255, 255, 255, 0.06),\r
    2px 2px 0 #000 !important;\r
}\r
\r
/* ── 顶栏/侧栏：亮上缘 + 暗下缘的凸起 bevel + 外投阴影，与聊天区拉开立体层级 ── */\r
html[data-pixel-ui] [class*='header'],\r
html[data-pixel-ui] [class*='topbar'],\r
html[data-pixel-ui] [class*='titlebar'] {\r
  background-image: linear-gradient(180deg, var(--px-wood-light) 0%, var(--px-wood-warm) 45%, var(--px-wood-dark) 100%) !important;\r
  border-bottom: 3px solid #000 !important;\r
  box-shadow:\r
    inset 0 2px 0 var(--px-wood-pale),\r
    inset 0 -2px 0 rgba(0, 0, 0, 0.55),\r
    0 3px 0 rgba(0, 0, 0, 0.35) !important;\r
}\r
html[data-pixel-ui] [class*='sidebar'],\r
html[data-pixel-ui] [class*='Sidebar'] {\r
  background-image: linear-gradient(90deg, var(--px-sidebar-hi) 0%, var(--px-sidebar-lo) 100%) !important;\r
  border-right: 3px solid #000 !important;\r
  box-shadow:\r
    inset 2px 0 0 var(--px-wood-pale),\r
    inset -3px 0 0 rgba(0, 0, 0, 0.5),\r
    3px 0 0 rgba(0, 0, 0, 0.35) !important;\r
}\r
\r
/* 侧栏项目：悬停金色左条 + 木色底；时间戳等次要文字弱化对齐 */\r
html[data-pixel-ui] [class*='sidebar'] [class*='item']:hover,\r
html[data-pixel-ui] [class*='Sidebar'] [class*='item']:hover {\r
  background-color: var(--px-wood-mid) !important;\r
  box-shadow: inset 3px 0 0 var(--px-gold) !important;\r
}\r
html[data-pixel-ui] [class*='sidebar'] [class*='time'],\r
html[data-pixel-ui] [class*='Sidebar'] [class*='time'],\r
html[data-pixel-ui] [class*='sidebar'] [class*='meta'],\r
html[data-pixel-ui] [class*='sidebar'] [class*='desc'],\r
html[data-pixel-ui] [class*='sidebar'] [class*='secondary'],\r
html[data-pixel-ui] [class*='Sidebar'] [class*='secondary'] {\r
  color: var(--px-text-light) !important;\r
  font-family: var(--px-mono) !important;\r
  font-size: 10px;\r
  letter-spacing: 0;\r
  opacity: 0.85;\r
}\r
\r
/* 状态栏/指标：数字走 mono，弱化整体以区分正文 */\r
html[data-pixel-ui] [class*='status'],\r
html[data-pixel-ui] [class*='Status'],\r
html[data-pixel-ui] [class*='metrics'],\r
html[data-pixel-ui] [class*='stats'] {\r
  font-family: var(--px-mono) !important;\r
  font-size: 11px;\r
  letter-spacing: 0;\r
  color: var(--px-text-light) !important;\r
}\r
\r
/* 消息正文的小节标题（音效/操作/镜头…）：金色像素方块前缀 */\r
html[data-pixel-ui] [class*='message'] h2::before,\r
html[data-pixel-ui] [class*='message'] h3::before,\r
html[data-pixel-ui] [class*='markdown'] h2::before,\r
html[data-pixel-ui] [class*='markdown'] h3::before {\r
  content: '';\r
  display: inline-block;\r
  width: 8px;\r
  height: 8px;\r
  margin-right: 6px;\r
  background: var(--px-gold);\r
  box-shadow: 2px 2px 0 #000;\r
  vertical-align: baseline;\r
}\r
\r
/* 输入占位文字：统一提亮配色（含 contenteditable 空态占位） */\r
html[data-pixel-ui] [contenteditable='true']:empty::before,\r
html[data-pixel-ui] [class*='placeholder'] {\r
  color: var(--px-input-ph) !important;\r
  -webkit-text-fill-color: var(--px-input-ph) !important;\r
}\r
\r
/* ── 链接：金色下划线 ──────────────────────────────────── */\r
html[data-pixel-ui] a {\r
  color: var(--px-gold-bright) !important;\r
  text-decoration-thickness: 2px;\r
  text-underline-offset: 3px;\r
}\r
\r
/* ── 进度条：刻度纹理 + 硬框（Xi .quest-progress） ──────── */\r
html[data-pixel-ui] [class*='progress'] {\r
  border: 2px solid #000 !important;\r
  box-shadow: inset 2px 2px 0 rgba(0, 0, 0, 0.6) !important;\r
  background-image: repeating-linear-gradient(\r
    90deg,\r
    transparent 0px,\r
    transparent 4px,\r
    rgba(0, 0, 0, 0.35) 4px,\r
    rgba(0, 0, 0, 0.35) 5px\r
  ) !important;\r
}\r
\r
/* ── 像素光标（SVG data-URI 阶梯箭头，Xi 同款造型） ─────── */\r
html[data-pixel-ui] body {\r
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Cpath d='M2 2v17h3v-3h3v-3h3v-3h3v-3h3V2z' fill='%23FFFDF5' stroke='%231A0F06' stroke-width='2'/%3E%3C/svg%3E") 2 2, auto;\r
}\r
html[data-pixel-ui] button,\r
html[data-pixel-ui] [role='button'],\r
html[data-pixel-ui] a,\r
html[data-pixel-ui] [class*='card'],\r
html[data-pixel-ui] [class*='tab'],\r
html[data-pixel-ui] [class*='menu'],\r
html[data-pixel-ui] [class*='dropdown'],\r
html[data-pixel-ui] select,\r
html[data-pixel-ui] label[for] {\r
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Cpath d='M2 2v17h3v-3h3v-3h3v-3h3v-3h3V2z' fill='%23F4D03F' stroke='%231A0F06' stroke-width='2'/%3E%3C/svg%3E") 2 2, pointer;\r
}\r
html[data-pixel-ui] input,\r
html[data-pixel-ui] textarea,\r
html[data-pixel-ui] [contenteditable='true'] {\r
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Cpath d='M5 3h4v2h2v2h2v2h2v2h2v2h2v6h-2v2h-4v2H5z' fill='%23FFFDF5' stroke='%231A0F06' stroke-width='2'/%3E%3C/svg%3E") 4 3, text;\r
}\r
\r
/* ── 危险按钮：主题错误色包边（token 由四主题 JS 侧声明） ── */\r
html[data-pixel-ui] button[class*='danger'],\r
html[data-pixel-ui] button[class*='Danger'],\r
html[data-pixel-ui] [class*='btn-danger'],\r
html[data-pixel-ui] [class*='btn-Danger'],\r
html[data-pixel-ui] [class*='destructive'] {\r
  border-color: var(--dsw-alias-state-error-primary, #E74C3C) !important;\r
  box-shadow:\r
    inset 2px 2px 0 rgba(255, 255, 255, 0.18),\r
    inset -2px -2px 0 rgba(0, 0, 0, 0.5),\r
    2px 2px 0 #000,\r
    3px 3px 0 rgba(0, 0, 0, 0.6) !important;\r
}\r
\r
/* ── 禁用态：沉底无阴影，不可点（光标同步） ────────────── */\r
html[data-pixel-ui] button:disabled,\r
html[data-pixel-ui] [role='button'][aria-disabled='true'],\r
html[data-pixel-ui] [class*='btn'][disabled],\r
html[data-pixel-ui] [class*='Button'][disabled],\r
html[data-pixel-ui] input:disabled,\r
html[data-pixel-ui] textarea:disabled,\r
html[data-pixel-ui] select:disabled {\r
  filter: none !important;\r
  transform: none !important;\r
  opacity: 0.55;\r
  cursor: not-allowed;\r
  box-shadow:\r
    inset 2px 2px 0 rgba(0, 0, 0, 0.45),\r
    inset -1px -1px 0 rgba(255, 255, 255, 0.05) !important;\r
}\r
\r
/* ── 下拉框：原生箭头换成金色阶梯三角 ──────────────────── */\r
html[data-pixel-ui] select {\r
  appearance: none;\r
  -webkit-appearance: none;\r
  padding-right: 28px !important;\r
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='8' height='2'/%3E%3Crect x='1' y='2' width='6' height='2'/%3E%3Crect x='2' y='4' width='4' height='2'/%3E%3Crect x='3' y='6' width='2' height='2'/%3E%3C/svg%3E") !important;\r
  background-repeat: no-repeat !important;\r
  background-position: right 8px center !important;\r
}\r
html[data-pixel-ui] select option {\r
  background-color: var(--px-input-bg);\r
  color: var(--px-input-text);\r
}\r
\r
/* ── 复选框：金底黑勾的像素方格 ────────────────────────── */\r
html[data-pixel-ui] input[type='checkbox'] {\r
  appearance: none;\r
  -webkit-appearance: none;\r
  width: 14px;\r
  height: 14px;\r
  padding: 0;\r
  flex-shrink: 0;\r
}\r
html[data-pixel-ui] input[type='checkbox']:checked {\r
  background-color: var(--px-gold) !important;\r
  background-image:\r
    linear-gradient(45deg, transparent 44%, var(--px-wood-darkest) 44%, var(--px-wood-darkest) 62%, transparent 62%),\r
    linear-gradient(-45deg, transparent 58%, var(--px-wood-darkest) 58%, var(--px-wood-darkest) 76%, transparent 76%) !important;\r
  box-shadow:\r
    inset 2px 2px 0 rgba(0, 0, 0, 0.5),\r
    inset -1px -1px 0 rgba(255, 255, 255, 0.25),\r
    0 0 0 1px #000 !important;\r
}\r
\r
/* ── 单选：方块内金点（像素时代没有圆角） ──────────────── */\r
html[data-pixel-ui] input[type='radio'] {\r
  appearance: none;\r
  -webkit-appearance: none;\r
  width: 14px;\r
  height: 14px;\r
  padding: 0;\r
  flex-shrink: 0;\r
}\r
html[data-pixel-ui] input[type='radio']:checked {\r
  background-color: var(--px-gold) !important;\r
  box-shadow:\r
    inset 0 0 0 3px var(--px-input-bg),\r
    0 0 0 1px #000 !important;\r
}\r
\r
/* ── 开关：内凹轨道（滑块由宿主组件绘制，只铺轨道质感） ── */\r
html[data-pixel-ui] [role='switch'],\r
html[data-pixel-ui] [class*='switch-track'],\r
html[data-pixel-ui] [class*='Switch'] {\r
  border: 2px solid #000 !important;\r
  background-color: var(--px-wood-dark) !important;\r
  box-shadow: inset 2px 2px 0 rgba(0, 0, 0, 0.5) !important;\r
}\r
\r
/* ── 滑块：刻度轨道 + 方块拇指 ────────────────────────── */\r
html[data-pixel-ui] input[type='range'] {\r
  appearance: none;\r
  -webkit-appearance: none;\r
  height: 14px;\r
  padding: 0;\r
  border: none !important;\r
  background: transparent !important;\r
  box-shadow: none !important;\r
}\r
html[data-pixel-ui] input[type='range']::-webkit-slider-runnable-track {\r
  height: 8px;\r
  border: 2px solid #000;\r
  background-image: repeating-linear-gradient(\r
    90deg,\r
    transparent 0px,\r
    transparent 5px,\r
    rgba(0, 0, 0, 0.3) 5px,\r
    rgba(0, 0, 0, 0.3) 6px\r
  );\r
  box-shadow: inset 2px 2px 0 rgba(0, 0, 0, 0.5);\r
}\r
html[data-pixel-ui] input[type='range']::-webkit-slider-thumb {\r
  -webkit-appearance: none;\r
  width: 12px;\r
  height: 14px;\r
  margin-top: -5px;\r
  background-color: var(--px-gold);\r
  border: 2px solid #000;\r
  box-shadow:\r
    inset 2px 2px 0 rgba(255, 255, 255, 0.4),\r
    inset -2px -2px 0 rgba(0, 0, 0, 0.4);\r
}\r
html[data-pixel-ui] input[type='range']::-moz-range-track {\r
  height: 8px;\r
  border: 2px solid #000;\r
  background: var(--px-wood-mid);\r
  box-shadow: inset 2px 2px 0 rgba(0, 0, 0, 0.5);\r
}\r
html[data-pixel-ui] input[type='range']::-moz-range-thumb {\r
  width: 12px;\r
  height: 14px;\r
  background-color: var(--px-gold);\r
  border: 2px solid #000;\r
  border-radius: 0;\r
  box-shadow:\r
    inset 2px 2px 0 rgba(255, 255, 255, 0.4),\r
    inset -2px -2px 0 rgba(0, 0, 0, 0.4);\r
}\r
\r
/* ── 提示框：黑底金边 + 阶梯阴影 ──────────────────────── */\r
html[data-pixel-ui] [role='tooltip'],\r
html[data-pixel-ui] [class*='tooltip'],\r
html[data-pixel-ui] [class*='Tooltip'] {\r
  font-family: var(--px-font) !important;\r
  font-size: 11px;\r
  line-height: 1.6;\r
  color: var(--px-parchment) !important;\r
  background: var(--px-wood-darkest) !important;\r
  border: 2px solid var(--px-gold-deep) !important;\r
  box-shadow: 2px 2px 0 #000, 3px 3px 0 rgba(0, 0, 0, 0.6) !important;\r
  text-shadow: var(--px-ts-btn);\r
}\r
\r
/* ── 内容排版：消息正文里的分隔线/引用/表格/折叠 ────────── */\r
html[data-pixel-ui] hr {\r
  border: none !important;\r
  height: 4px;\r
  background-image: linear-gradient(\r
    180deg,\r
    var(--px-wood-light) 0px,\r
    var(--px-wood-light) 1px,\r
    transparent 1px,\r
    transparent 3px,\r
    var(--px-wood-light) 3px,\r
    var(--px-wood-light) 4px\r
  ) !important;\r
}\r
html[data-pixel-ui] blockquote {\r
  border-left: 4px solid var(--px-gold) !important;\r
  background-color: var(--px-wood-dark) !important;\r
  color: var(--px-text-on-dark) !important;\r
  padding: 6px 10px;\r
  box-shadow: inset 2px 0 0 rgba(0, 0, 0, 0.18) !important;\r
}\r
html[data-pixel-ui] table {\r
  border: 2px solid var(--px-wood-warm) !important;\r
  border-collapse: collapse;\r
}\r
html[data-pixel-ui] th {\r
  background-color: var(--px-wood-warm) !important;\r
  color: var(--px-parchment) !important;\r
  font-family: var(--px-font) !important;\r
  font-size: 12px;\r
  border: 1px solid var(--px-wood-light) !important;\r
}\r
html[data-pixel-ui] td {\r
  border: 1px solid var(--px-wood-light) !important;\r
}\r
html[data-pixel-ui] summary {\r
  cursor: pointer;\r
  font-family: var(--px-font) !important;\r
  color: var(--px-gold-bright) !important;\r
}\r
html[data-pixel-ui] summary::marker {\r
  color: var(--px-gold);\r
}\r
\r
/* ── 菜单项悬停：金色左条 + 木色底 ─────────────────────── */\r
html[data-pixel-ui] [role='menuitem']:hover,\r
html[data-pixel-ui] [class*='menu-item']:hover,\r
html[data-pixel-ui] [class*='dropdown'] [class*='item']:hover,\r
html[data-pixel-ui] [class*='popover'] [class*='item']:hover {\r
  background-color: var(--px-wood-mid) !important;\r
  box-shadow: inset 3px 0 0 var(--px-gold) !important;\r
}\r
\r
/* ── 滚动条：Firefox 同步 + 角落 ───────────────────────── */\r
html[data-pixel-ui] {\r
  scrollbar-color: var(--px-wood-light) var(--px-wood-darkest);\r
}\r
html[data-pixel-ui] ::-webkit-scrollbar-corner {\r
  background: var(--px-wood-darkest);\r
}\r
\r
/* ── CRT 覆盖层：扫描线 + 暗角 + 微闪烁（Xi v3 滤镜） ────\r
 * 盖在最顶层但不拦截任何事件；尊重系统“减少动态效果”偏好。 */\r
html[data-pixel-ui] body::after {\r
  content: "";\r
  position: fixed;\r
  inset: 0;\r
  z-index: 2147483647;\r
  pointer-events: none;\r
  background:\r
    repeating-linear-gradient(\r
      0deg,\r
      var(--px-scan) 0px,\r
      var(--px-scan) 1px,\r
      transparent 1px,\r
      transparent 3px\r
    ),\r
    radial-gradient(ellipse at center, transparent 62%, var(--px-vignette) 100%);\r
  animation: px-crt-flicker 4s steps(60) infinite;\r
}\r
@keyframes px-crt-flicker {\r
  0%, 100% { opacity: 1; }\r
  50% { opacity: 0.96; }\r
}\r
@media (prefers-reduced-motion: reduce) {\r
  html[data-pixel-ui] body::after { animation: none; }\r
  html[data-pixel-ui] button,\r
  html[data-pixel-ui] [role='button'],\r
  html[data-pixel-ui] [class*='btn'],\r
  html[data-pixel-ui] [class*='Button'],\r
  html[data-pixel-ui] [class*='panel'],\r
  html[data-pixel-ui] [class*='card'],\r
  html[data-pixel-ui] [class*='Card'],\r
  .px-theme-btn {\r
    transition: none;\r
  }\r
}\r
\r
/* ── 设置页「像素主题」行（不跟随皮肤作用域：现代模式下也保持可点） ── */\r
.px-theme-row {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 8px;\r
  padding: 12px 0;\r
  border-top: 1px solid rgba(139, 107, 69, 0.35);\r
}\r
.px-theme-row-title {\r
  font-family: 'Fusion Pixel 12', 'Press Start 2P', monospace;\r
  font-size: 12px;\r
  color: #F4D03F;\r
  text-shadow: var(--px-ts-chrome, 2px 2px 0 rgba(26, 15, 6, 0.6));\r
  letter-spacing: 0.05em;\r
}\r
.px-theme-row-cubes {\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 8px;\r
}\r
.px-theme-btn {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 6px;\r
  padding: 5px 10px;\r
  font-family: 'Fusion Pixel 12', 'Press Start 2P', monospace;\r
  font-size: 11px;\r
  color: #E8D5B0;\r
  background: #2C1A0C;\r
  border: 2px solid #1A0F06;\r
  border-radius: 0 !important;\r
  cursor: pointer;\r
  box-shadow:\r
    inset 1px 1px 0 rgba(255, 248, 231, 0.15),\r
    inset -1px -1px 0 rgba(0, 0, 0, 0.4),\r
    2px 2px 0 rgba(0, 0, 0, 0.5);\r
  transition: transform 0.06s steps(2), box-shadow 0.06s steps(2), filter 0.06s steps(2);\r
}\r
.px-theme-btn:hover {\r
  filter: brightness(1.12);\r
  transform: translate(-1px, -1px);\r
  box-shadow:\r
    inset 1px 1px 0 rgba(255, 248, 231, 0.2),\r
    inset -1px -1px 0 rgba(0, 0, 0, 0.35),\r
    3px 3px 0 rgba(0, 0, 0, 0.5);\r
}\r
.px-theme-btn:active {\r
  transform: translate(1px, 1px);\r
  box-shadow: inset 2px 2px 0 rgba(0, 0, 0, 0.4);\r
}\r
.px-theme-btn-active {\r
  color: #1A0F06;\r
  /* 皮肤激活时跟随当前主题强调色（木屋金/暖阳橙/终端绿），现代模式回落金色 */\r
  background: var(--px-gold, #F4D03F);\r
  border-color: var(--px-gold-deep, #8B6B00);\r
  box-shadow:\r
    inset 1px 1px 0 var(--px-gold-bright, #FFE066),\r
    inset -1px -1px 0 var(--px-gold-deep, #8B6B00),\r
    2px 2px 0 rgba(0, 0, 0, 0.5);\r
}\r
.px-theme-swatch {\r
  width: 10px;\r
  height: 10px;\r
  border: 1px solid #000;\r
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.4);\r
}\r
`;

// src/client/index.js
var name = "dsh-pixel-ui";
var inject = ["slots", "theme"];
var THEME_STORAGE_KEY = "dsh-pixel-ui:theme";
var THEMES = [
  {
    id: "pixel-wood",
    colorScheme: "dark",
    tokens: {
      "--dsw-alias-bg-base": "#1A0F06",
      "--dsw-alias-bg-layer-1": "#2C1A0C",
      "--dsw-alias-bg-layer-2": "#3A2515",
      "--dsw-alias-bg-overlay": "#241408",
      "--dsw-alias-border-l1": "#4A3020",
      "--dsw-alias-border-l2": "#8B6B45",
      "--dsw-alias-brand-primary": "#F4D03F",
      "--dsw-alias-label-primary": "#F5E6C8",
      "--dsw-alias-label-secondary": "#9B7B5B",
      "--dsw-alias-state-error-primary": "#E74C3C",
      "--dsw-alias-state-success-primary": "#7DCE82",
      "--dsw-alias-state-warn-primary": "#F39C12",
      "--dsw-specific-sidebar-fill": "#241408"
    }
  },
  {
    id: "pixel-paper",
    colorScheme: "light",
    tokens: {
      "--dsw-alias-bg-base": "#F0E8D8",
      "--dsw-alias-bg-layer-1": "#E8DCC8",
      "--dsw-alias-bg-layer-2": "#DDD0B8",
      "--dsw-alias-bg-overlay": "#E2D6BE",
      "--dsw-alias-border-l1": "#D4C4A8",
      "--dsw-alias-border-l2": "#9B8B6B",
      "--dsw-alias-brand-primary": "#C8960C",
      "--dsw-alias-label-primary": "#3A2A10",
      "--dsw-alias-label-secondary": "#6B5020",
      "--dsw-alias-state-error-primary": "#8B2020",
      "--dsw-alias-state-success-primary": "#3A7A40",
      "--dsw-alias-state-warn-primary": "#805000",
      "--dsw-specific-sidebar-fill": "#E8DCC8"
    }
  },
  {
    id: "pixel-warm",
    colorScheme: "dark",
    tokens: {
      "--dsw-alias-bg-base": "#1E0E04",
      "--dsw-alias-bg-layer-1": "#34180A",
      "--dsw-alias-bg-layer-2": "#4A2210",
      "--dsw-alias-bg-overlay": "#2A1308",
      "--dsw-alias-border-l1": "#5C2E16",
      "--dsw-alias-border-l2": "#A86B40",
      "--dsw-alias-brand-primary": "#FF8C42",
      "--dsw-alias-label-primary": "#F0C8A0",
      "--dsw-alias-label-secondary": "#A86B40",
      "--dsw-alias-state-error-primary": "#D93B3B",
      "--dsw-alias-state-success-primary": "#6DBF6D",
      "--dsw-alias-state-warn-primary": "#FF8C42",
      "--dsw-specific-sidebar-fill": "#2A1308"
    }
  },
  {
    id: "pixel-retro",
    colorScheme: "dark",
    tokens: {
      "--dsw-alias-bg-base": "#0A0E0A",
      "--dsw-alias-bg-layer-1": "#0E140E",
      "--dsw-alias-bg-layer-2": "#121A12",
      "--dsw-alias-bg-overlay": "#0C100C",
      "--dsw-alias-border-l1": "#2A402A",
      "--dsw-alias-border-l2": "#3A5A3A",
      "--dsw-alias-brand-primary": "#33FF33",
      "--dsw-alias-label-primary": "#33FF33",
      "--dsw-alias-label-secondary": "#118811",
      "--dsw-alias-state-error-primary": "#FF3333",
      "--dsw-alias-state-success-primary": "#33FF33",
      "--dsw-alias-state-warn-primary": "#FFCC33",
      "--dsw-specific-sidebar-fill": "#0C100C"
    }
  }
];
var PIXEL_IDS = THEMES.map((theme) => theme.id);
var RESTORABLE_IDS = /* @__PURE__ */ new Set(["light", "dark", "system", ...PIXEL_IDS]);
var THEME_CHOICES = [
  { id: "pixel-wood", label: "像素·木屋", swatch: "#F4D03F" },
  { id: "pixel-paper", label: "像素·羊皮纸", swatch: "#F5E6C8" },
  { id: "pixel-warm", label: "像素·暖阳", swatch: "#FF8C42" },
  { id: "pixel-retro", label: "像素·终端绿", swatch: "#33FF33" },
  { id: "system", label: "现代默认", swatch: "#7A7A7A" }
];
function createThemeRowStore() {
  return (0, import_client.defineStore)({
    init: () => ({ preference: null, revision: -1 }),
    actions: {
      sync: (draft, preference, revision) => {
        if (revision <= draft.revision) return;
        draft.preference = preference;
        draft.revision = revision;
      }
    }
  });
}
function ThemeRow(props) {
  const preference = props.useStore((state) => state.preference);
  return (0, import_react.createElement)(
    "div",
    { className: "px-theme-row" },
    (0, import_react.createElement)("div", { className: "px-theme-row-title" }, "像素主题"),
    (0, import_react.createElement)(
      "div",
      { className: "px-theme-row-cubes" },
      THEME_CHOICES.map((choice) => (0, import_react.createElement)(
        "button",
        {
          key: choice.id,
          type: "button",
          className: "px-theme-btn" + (preference === choice.id ? " px-theme-btn-active" : ""),
          onClick: () => {
            props.setTheme(choice.id);
          }
        },
        (0, import_react.createElement)("span", { className: "px-theme-swatch", style: { background: choice.swatch } }),
        choice.label
      ))
    )
  );
}
function apply(ctx) {
  const syncScope = () => {
    const active = ctx.theme.getTheme().active;
    const on = PIXEL_IDS.includes(active.id);
    document.documentElement.toggleAttribute("data-pixel-ui", on);
    if (on) document.documentElement.setAttribute("data-pixel-theme", active.id);
    else document.documentElement.removeAttribute("data-pixel-theme");
  };
  const persist = (snapshot) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, snapshot.preference);
    } catch {
    }
  };
  ctx.on("theme/change", (snapshot) => {
    syncScope();
    persist(snapshot);
  });
  ctx.effect(() => {
    const disposers = THEMES.map((definition) => ctx.theme.register(definition));
    return () => {
      for (const dispose of disposers) dispose();
    };
  }, "dsh-pixel-ui: theme registration");
  let saved = null;
  try {
    saved = localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
  }
  const target = saved !== null && RESTORABLE_IDS.has(saved) ? saved : "pixel-wood";
  try {
    ctx.theme.setTheme(target);
  } catch {
  }
  syncScope();
  const rowStore = createThemeRowStore();
  let bound = void 0;
  const syncRow = (snapshot) => {
    bound?.sync(snapshot.preference, snapshot.revision);
  };
  ctx.on("theme/change", syncRow);
  ctx.slots.inject("settings.general.item", () => ctx.slots.register({
    name: "settings.general.item",
    id: "pixel-theme",
    order: 20,
    store: rowStore,
    inject: (actions) => {
      bound = actions;
      syncRow(ctx.theme.getTheme());
      return { setTheme: (id) => {
        ctx.theme.setTheme(id);
      } };
    }
  }, ThemeRow));
  ctx.effect(() => {
    const style = document.createElement("style");
    style.dataset.plugin = "dsh-pixel-ui";
    style.textContent = pixel_default;
    document.head.appendChild(style);
    return () => {
      style.remove();
      document.documentElement.removeAttribute("data-pixel-ui");
      document.documentElement.removeAttribute("data-pixel-theme");
    };
  }, "dsh-pixel-ui: stylesheet");
}
return module.exports; } });
//# sourceMappingURL=client.js.map

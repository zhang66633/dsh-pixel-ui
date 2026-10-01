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
var import_dsh_client_store = require("@deepseek-ai/dsh-client-store");

// src/client/pixel.css
var pixel_default = "/* dsh-pixel-ui — 星露谷风像素皮肤（木屋/羊皮纸/暖阳/终端绿四主题）\n *\n * 设计原则（v1.5.0 重写，依据是桌面端实测）：\n *\n * 1. **完全平面（flat）**。用户 2026-10-01 的决定：不要立体效果。\n *    所以本表里**没有任何 box-shadow / text-shadow**——凸起、凹陷、浮雕、\n *    文字投影全部取消。像素的层次改由三样东西表达：\n *      ① 整像素描边（2px，内容层 1px）；\n *      ② 平涂色块之间的一档明度差（主题色板自带）；\n *      ③ 2px 棋盘抖动（--px-dither）与手绘 SVG 像素图形。\n *    历史上用半透明 inset/outset 做 bevel，在 1.25 DPR 上会渲染成亚像素\n *    灰阶毛边，那正是用户最早报的「伪像素」。\n *\n * 2. **只做 token 表达不了的事**。颜色、背景、文字色交给主题 token；本表负责\n *    方角、2px 整像素描边、像素字体、位图缩放、像素光标、像素滚动条。\n *\n * 3. **选择器必须是「确定的类型」，不许再用 `[class*='card']` 这种子串扫射**。\n *    v1.4 的 `[class*=...]` 规则命中了宿主大量它没打算命中的元素（`.xz4KEq_*`、\n *    `.Dc7zOa_*`、`.Hqq-bq_*`、图标类…），结果整个界面被盖上一层厚重黑框，\n *    读起来像「处处凹陷的印章」——用户报的「伪像素 / 凹陷」就是它。\n *    这里只保留三类选择器：\n *      a) 真正的 HTML 语义（button/input/table/pre/hr/…）；\n *      b) 稳定的 ARIA 与 data 属性（[role=tab]、[aria-selected]、[data-theme]）；\n *      c) 本插件自己的类名（.px-*）与宿主主题 token（--dsw-*）。\n *\n * 4. **1px 细线只在内容层出现**（表格内线），装饰框一律 2px 起：\n *    像素风里 1px 装饰线在非整数缩放下必然糊成灰线。\n *\n * 作用域 html[data-pixel-ui]：任一像素主题激活时生效，data-pixel-theme 区分配色。\n */\n\n@font-face {\n  font-family: 'Fusion Pixel 12';\n  src: url('/dsh-pixel-ui/fonts/fusion-pixel-12px.woff2') format('woff2');\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}\n@font-face {\n  font-family: 'Press Start 2P';\n  src: url('/dsh-pixel-ui/fonts/PressStart2P-Regular.ttf') format('truetype');\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}\n\n/* ── 基础令牌（木屋=暗色基准，其余主题覆盖配色） ─────────────────── */\nhtml[data-pixel-ui] {\n  /* 木色阶 */\n  --px-wood-darkest: #1A0F06;\n  --px-wood-dark: #2C1A0C;\n  --px-wood-mid: #3A2515;\n  --px-wood-warm: #4A3020;\n  --px-wood-light: #6B4C2E;\n  --px-wood-pale: #8B6B45;\n  /* 金色阶 */\n  --px-gold: #F4D03F;\n  --px-gold-bright: #FFE066;\n  --px-gold-dark: #C99A00;\n  --px-gold-deep: #8B6B00;\n  --px-parchment: #F5E6C8;\n  --px-text-on-dark: #E8D5B0;\n  --px-text-light: #AC8A63;\n  /* 输入件 */\n  --px-input-bg: #1A0F06;\n  --px-input-text: #FFFDF5;\n  --px-input-caret: #F4D03F;\n  --px-input-ph: #B08A5E;\n  /* 代码 */\n  --px-code-bg: #241408;\n  --px-code-ink: #FFE066;\n  /* 提示框 */\n  --px-tooltip-bg: #1A0F06;\n  /* 强调面 */\n  --px-accent-bg: #F4D03F;\n  --px-accent-ink: #1A0F06;\n  --px-ink-on-mid: #F5E6C8;\n  /* 描边色：平面皮肤唯一的「线」色，2px 整像素 */\n  --px-line: #140B04;\n  /* 纹理：2px 棋盘抖动 */\n  --px-dither: #241408;\n  /* 暗角（CRT 只保留暗角，扫描线在非整数 DPR 上必糊） */\n  --px-vignette: rgba(0, 0, 0, 0.2);\n  /* 内容列宽：宿主把 --dsh-conversation-column-width 写死成 0，\n   * clamp(680px, 0 * .64, 920px) 恒取 680px 下限 → 宽屏上正文只占中间一条\n   * （踩坑 #7）。这里补上那个变量应有的值：正文随视口撑开。 */\n  --px-chat-width: clamp(680px, calc(64vw - 140px), 1200px);\n  /* 侧栏 / 顶栏底 */\n  --px-sidebar-fill: #241408;\n  --px-topbar-fill: #2C1A0C;\n  /* 字体栈 */\n  --px-font: 'Fusion Pixel 12', 'Press Start 2P', monospace;\n  --px-mono: 'Cascadia Code', 'Consolas', 'Courier New', monospace;\n}\n\n/* ── 四主题配色（Agent Xi 同款） ─────────────────────────────────── */\nhtml[data-pixel-theme='pixel-paper'] {\n  --px-wood-darkest: #F0E8D8;\n  --px-wood-dark: #E8DCC8;\n  --px-wood-mid: #DDD0B8;\n  --px-wood-warm: #D4C4A8;\n  --px-wood-light: #B8A080;\n  --px-wood-pale: #9B8B6B;\n  --px-gold: #A07000;\n  --px-gold-bright: #6B4F00;\n  --px-gold-dark: #8A6400;\n  --px-gold-deep: #7A5A00;\n  --px-parchment: #FFFDF5;\n  --px-text-on-dark: #3A2A10;\n  --px-text-light: #6B5020;\n  --px-input-bg: #FFFDF5;\n  --px-input-text: #3A2A10;\n  --px-input-caret: #8A6400;\n  --px-input-ph: #8B7040;\n  --px-code-bg: #E0D4BC;\n  --px-code-ink: #5C4400;\n  --px-tooltip-bg: #2A1B08;\n  --px-accent-bg: #7A5A00;\n  --px-accent-ink: #FFFDF5;\n  --px-ink-on-mid: #3A2A10;\n  --px-line: #8B7040;\n  --px-dither: #D8C9AC;\n  --px-vignette: rgba(0, 0, 0, 0.07);\n  --px-sidebar-fill: #E8DCC8;\n  --px-topbar-fill: #E8DCC8;\n}\nhtml[data-pixel-theme='pixel-warm'] {\n  --px-wood-darkest: #1E0E04;\n  --px-wood-dark: #34180A;\n  --px-wood-mid: #4A2210;\n  --px-wood-warm: #5C2E16;\n  --px-wood-light: #8B4A28;\n  --px-wood-pale: #A86B40;\n  --px-gold: #FF8C42;\n  --px-gold-bright: #FFA64D;\n  --px-gold-dark: #D96E30;\n  --px-gold-deep: #A05020;\n  --px-parchment: #FFF0E0;\n  --px-text-on-dark: #F0C8A0;\n  --px-text-light: #C08A5C;\n  --px-input-bg: #1E0E04;\n  --px-input-text: #FFFBF5;\n  --px-input-caret: #FF8C42;\n  --px-input-ph: #C08A5C;\n  --px-code-bg: #2A1308;\n  --px-code-ink: #FFA64D;\n  --px-tooltip-bg: #1E0E04;\n  --px-accent-bg: #FF8C42;\n  --px-accent-ink: #1E0E04;\n  --px-ink-on-mid: #FFF0E0;\n  --px-line: #150801;\n  --px-dither: #2A1308;\n  --px-sidebar-fill: #2A1308;\n  --px-topbar-fill: #34180A;\n}\nhtml[data-pixel-theme='pixel-retro'] {\n  --px-wood-darkest: #0A0E0A;\n  --px-wood-dark: #0E140E;\n  --px-wood-mid: #121A12;\n  --px-wood-warm: #162016;\n  --px-wood-light: #2A402A;\n  --px-wood-pale: #3A5A3A;\n  --px-gold: #33FF33;\n  --px-gold-bright: #66FF66;\n  --px-gold-dark: #00CC00;\n  --px-gold-deep: #009900;\n  --px-parchment: #B8F0B8;\n  --px-text-on-dark: #33FF33;\n  --px-text-light: #22AA22;\n  --px-input-bg: #0A0E0A;\n  --px-input-text: #33FF33;\n  --px-input-caret: #33FF33;\n  --px-input-ph: #22AA22;\n  --px-code-bg: #0E140E;\n  --px-code-ink: #66FF66;\n  --px-tooltip-bg: #0A0E0A;\n  --px-accent-bg: #33FF33;\n  --px-accent-ink: #0A0E0A;\n  --px-ink-on-mid: #B8F0B8;\n  --px-line: #040704;\n  --px-dither: #101A10;\n  --px-sidebar-fill: #0C100C;\n  --px-topbar-fill: #0E140E;\n}\n\n/* ── 内容列宽（桌面端「一半一半」的修正，踩坑 #7） ──────────────────\n * 宿主只在样式表里声明 `--dsh-chat-content-width: var(--dsh-chat-user-width,\n * clamp(680px, calc(var(--dsh-conversation-column-width, 0px) * .64), 920px))`，\n * 而 `--dsh-conversation-column-width` 全仓无人赋值 → clamp 恒取 680px。\n * 在根作用域用 !important 把两个变量补上（宿主会把 user-width 以内联样式写在\n * 容器上，只有 !important 能压过内联）。 */\nhtml[data-pixel-ui] {\n  --dsh-conversation-column-width: calc(100vw - 280px) !important;\n  --dsh-chat-user-width: var(--px-chat-width) !important;\n  --dsh-chat-content-width: var(--px-chat-width) !important;\n}\n/* 兜底：万一宿主把列宽写死在自己的样式层，这里同权重覆盖。 */\nhtml[data-pixel-ui] [class*='xz4KEq_column'] {\n  max-width: var(--px-chat-width);\n}\n\n/* ── 全局：方角、禁次像素平滑、位图缩放 ─────────────────────────── */\nhtml[data-pixel-ui] * {\n  border-radius: 0 !important;\n}\nhtml[data-pixel-ui] body {\n  -webkit-font-smoothing: none;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: geometricPrecision;\n  font-family: var(--px-font) !important;\n  /* 0.01em 会把字形推到半像素 → 灰边；像素字体必须整像素落位 */\n  letter-spacing: 0;\n}\nhtml[data-pixel-ui] img,\nhtml[data-pixel-ui] canvas,\nhtml[data-pixel-ui] video {\n  image-rendering: pixelated;\n}\nhtml[data-pixel-ui] ::selection {\n  background: var(--px-accent-bg);\n  color: var(--px-accent-ink);\n}\nhtml[data-pixel-ui] :focus-visible {\n  outline: 2px solid var(--px-gold) !important;\n  outline-offset: 1px;\n}\n\n/* 暗角：只保留径向暗角（扫描线在 1.25 DPR 上必糊成灰膜）。 */\nhtml[data-pixel-ui] body::after {\n  content: \"\";\n  position: fixed;\n  inset: 0;\n  z-index: 2147483647;\n  pointer-events: none;\n  background: radial-gradient(ellipse at center, transparent 70%, var(--px-vignette) 100%);\n}\n@media (prefers-reduced-motion: reduce) {\n  html[data-pixel-ui] * {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n\n/* ── 像素滚动条：方、10px、木色 ─────────────────────────────────── */\nhtml[data-pixel-ui] {\n  scrollbar-color: var(--px-wood-light) var(--px-wood-darkest);\n}\nhtml[data-pixel-ui] ::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\nhtml[data-pixel-ui] ::-webkit-scrollbar-track {\n  background: var(--px-wood-darkest);\n  border-left: 2px solid var(--px-wood-dark);\n}\nhtml[data-pixel-ui] ::-webkit-scrollbar-thumb {\n  background: var(--px-wood-light);\n  border: 2px solid var(--px-wood-darkest);\n}\nhtml[data-pixel-ui] ::-webkit-scrollbar-thumb:hover {\n  background: var(--px-wood-pale);\n}\nhtml[data-pixel-ui] ::-webkit-scrollbar-corner {\n  background: var(--px-wood-darkest);\n}\n\n/* ── 排版：装饰性文字走像素字体；正文/代码走 mono ────────────────── */\nhtml[data-pixel-ui] h1,\nhtml[data-pixel-ui] h2,\nhtml[data-pixel-ui] h3,\nhtml[data-pixel-ui] h4,\nhtml[data-pixel-ui] summary,\nhtml[data-pixel-ui] button,\nhtml[data-pixel-ui] label,\nhtml[data-pixel-ui] legend,\nhtml[data-pixel-ui] [role='tab'],\nhtml[data-pixel-ui] [role='menuitem'],\nhtml[data-pixel-ui] [role='tooltip'],\nhtml[data-pixel-ui] [role='switch'] {\n  font-family: var(--px-font) !important;\n}\nhtml[data-pixel-ui] h1,\nhtml[data-pixel-ui] h2,\nhtml[data-pixel-ui] h3 {\n  color: var(--px-gold-bright) !important;\n}\n/* 正文/代码层：mono、不加字阴影、长 token 允许断行（像素字体更宽） */\nhtml[data-pixel-ui] pre,\nhtml[data-pixel-ui] code,\nhtml[data-pixel-ui] kbd,\nhtml[data-pixel-ui] textarea,\nhtml[data-pixel-ui] input,\nhtml[data-pixel-ui] p,\nhtml[data-pixel-ui] li,\nhtml[data-pixel-ui] td,\nhtml[data-pixel-ui] th {\n  font-family: var(--px-mono) !important;\n}\nhtml[data-pixel-ui] p,\nhtml[data-pixel-ui] li {\n  overflow-wrap: anywhere;\n}\n\n/* ── 按钮：默认只继承宿主的底与形（宿主大量图标按钮本来就是透明的），\n * 只把方角、像素字与「按下去掉一档」的反馈补齐；实心块只在悬停/选中时出现。\n * v1.4 给**所有** button 套 2px 黑框 + 内阴影，图标按钮全变成厚盒子，\n * 这是用户报「处处凹陷」的主因之一。 ─────────────────────────────── */\nhtml[data-pixel-ui] button {\n  font-size: 12px;\n  letter-spacing: 0;\n  border: none !important;\n  transition: background-color 0.06s steps(2), transform 0.06s steps(2);\n}\nhtml[data-pixel-ui] button:not(:disabled):hover {\n  background-color: var(--px-wood-dark) !important;\n}\n/* 实心块按钮（工具栏/主按钮）才用整圈 2px bevel，列表行只用金色左条 */\nhtml[data-pixel-ui] button[class*='primary']:hover,\nhtml[data-pixel-ui] button[class*='Primary']:hover,\nhtml[data-pixel-ui] button[class*='danger']:hover,\n\nhtml[data-pixel-ui] button:not(:disabled):active {\n  transform: translateY(1px);\n}\n/* 宿主已经画成「实心块」的按钮（主按钮/危险按钮）才补像素描边 */\nhtml[data-pixel-ui] button[class*='primary'],\nhtml[data-pixel-ui] button[class*='Primary'],\nhtml[data-pixel-ui] button[class*='danger'],\nhtml[data-pixel-ui] button[class*='Danger'] {\n  border: 2px solid var(--px-line) !important;\n}\nhtml[data-pixel-ui] button:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n\n/* ── 页签（对话/轨迹/记忆）：文字 + 金下沿，**不加边框**\n * v1.4 给页签套了 2px 黑框，整条读起来像凹陷的输入框（用户报「凹陷了」）。\n * 平面皮肤里「选中」只用颜色 + 一条整像素下边线表达，不做凹凸。 */\nhtml[data-pixel-ui] [role='tab'] {\n  font-size: 13px;\n  border: none !important;\n  border-bottom: 3px solid transparent !important;\n  background-color: transparent !important;\n  color: var(--px-text-light) !important;\n}\nhtml[data-pixel-ui] [role='tab']:hover {\n  color: var(--px-text-on-dark) !important;\n}\nhtml[data-pixel-ui] [role='tab'][aria-selected='true'] {\n  color: var(--px-gold-bright) !important;\n  background-color: transparent !important;\n  border-bottom-color: var(--px-gold) !important;\n}\n\n/* ── 输入件：黑木底 + 羊皮纸字 + 金框，聚焦金环 ───────────────────\n * 只给「真正的输入面」上底和框，`select` 与只读输入保留宿主的形，\n * 否则设置页里成排的选择器全变成黑盒子。 */\nhtml[data-pixel-ui] input:not([type='checkbox']):not([type='radio']),\nhtml[data-pixel-ui] textarea,\nhtml[data-pixel-ui] [contenteditable='true'] {\n  font-size: 12px;\n  letter-spacing: 0;\n  color: var(--px-input-text) !important;\n  -webkit-text-fill-color: var(--px-input-text) !important;\n  caret-color: var(--px-input-caret) !important;\n  background-color: var(--px-input-bg) !important;\n  border: 2px solid var(--px-gold-deep) !important;\n}\nhtml[data-pixel-ui] input:focus,\nhtml[data-pixel-ui] textarea:focus,\nhtml[data-pixel-ui] [contenteditable='true']:focus {\n  border-color: var(--px-gold) !important;\n  outline: none !important;\n}\nhtml[data-pixel-ui] select {\n  color: var(--px-input-text) !important;\n  background-color: transparent !important;\n  border: 2px solid var(--px-gold-deep) !important;\n}\nhtml[data-pixel-ui] select:focus {\n  border-color: var(--px-gold) !important;\n  outline: none !important;\n}\nhtml[data-pixel-ui] input::placeholder,\nhtml[data-pixel-ui] textarea::placeholder {\n  color: var(--px-input-ph) !important;\n  -webkit-text-fill-color: var(--px-input-ph) !important;\n  opacity: 1;\n}\nhtml[data-pixel-ui] [contenteditable='true']:empty::before {\n  color: var(--px-input-ph) !important;\n  -webkit-text-fill-color: var(--px-input-ph) !important;\n}\n\n/* ── 选择件：复选框 / 单选 / 开关 / 滑块 ───────────────────────── */\nhtml[data-pixel-ui] input[type='checkbox'],\nhtml[data-pixel-ui] input[type='radio'] {\n  appearance: none;\n  -webkit-appearance: none;\n  width: 14px;\n  height: 14px;\n  padding: 0;\n  flex-shrink: 0;\n  background-color: var(--px-input-bg) !important;\n  border: 2px solid var(--px-line) !important;\n}\nhtml[data-pixel-ui] input[type='checkbox']:checked {\n  background-color: var(--px-gold) !important;\n  /* 12×12 手绘像素对勾（2px 阶梯），定位取整像素 */\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' shape-rendering='crispEdges'%3E%3Cg fill='%231A0F06'%3E%3Crect x='0' y='4' width='2' height='2'/%3E%3Crect x='0' y='6' width='2' height='2'/%3E%3Crect x='2' y='6' width='2' height='2'/%3E%3Crect x='2' y='8' width='2' height='2'/%3E%3Crect x='4' y='4' width='2' height='2'/%3E%3Crect x='4' y='6' width='2' height='2'/%3E%3Crect x='4' y='8' width='2' height='2'/%3E%3Crect x='4' y='10' width='2' height='2'/%3E%3Crect x='6' y='2' width='2' height='2'/%3E%3Crect x='6' y='4' width='2' height='2'/%3E%3Crect x='6' y='6' width='2' height='2'/%3E%3Crect x='6' y='8' width='2' height='2'/%3E%3Crect x='8' y='0' width='2' height='2'/%3E%3Crect x='8' y='2' width='2' height='2'/%3E%3Crect x='8' y='4' width='2' height='2'/%3E%3Crect x='8' y='6' width='2' height='2'/%3E%3Crect x='10' y='0' width='2' height='2'/%3E%3Crect x='10' y='2' width='2' height='2'/%3E%3Crect x='10' y='4' width='2' height='2'/%3E%3C/g%3E%3C/svg%3E\") !important;\n  background-repeat: no-repeat !important;\n  background-position: 3px 1px !important;\n  border: 2px solid var(--px-line) !important;\n}\nhtml[data-pixel-ui] input[type='radio']:checked {\n  background-color: var(--px-gold) !important;\n  /* 平色时代没有 inset 灰阶可用：8×8 手绘像素方点，整像素定位 */\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='8' height='8' fill='%231A0F06'/%3E%3C/svg%3E\") !important;\n  background-size: 6px 6px !important;\n  background-position: 2px 2px !important;\n  background-repeat: no-repeat !important;\n}\nhtml[data-pixel-ui] select {\n  appearance: none;\n  -webkit-appearance: none;\n  padding-right: 28px !important;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='8' height='2'/%3E%3Crect x='1' y='2' width='6' height='2'/%3E%3Crect x='2' y='4' width='4' height='2'/%3E%3Crect x='3' y='6' width='2' height='2'/%3E%3C/svg%3E\") !important;\n  background-repeat: no-repeat !important;\n  background-position: right 8px center !important;\n}\nhtml[data-pixel-ui] select option {\n  background-color: var(--px-input-bg);\n  color: var(--px-input-text);\n}\nhtml[data-pixel-ui] [role='switch'] {\n  border: 2px solid var(--px-line) !important;\n  background-color: var(--px-wood-dark) !important;\n}\nhtml[data-pixel-ui] input[type='range'] {\n  appearance: none;\n  -webkit-appearance: none;\n  height: 14px;\n  padding: 0;\n  border: none !important;\n  background: transparent !important;\n}\nhtml[data-pixel-ui] input[type='range']::-webkit-slider-runnable-track {\n  height: 8px;\n  border: 2px solid var(--px-line);\n  background-color: var(--px-wood-mid);\n}\nhtml[data-pixel-ui] input[type='range']::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  width: 12px;\n  height: 14px;\n  margin-top: -5px;\n  background-color: var(--px-gold);\n  border: 2px solid var(--px-line);\n}\nhtml[data-pixel-ui] input[type='range']::-moz-range-track {\n  height: 8px;\n  border: 2px solid var(--px-line);\n  background: var(--px-wood-mid);\n}\nhtml[data-pixel-ui] input[type='range']::-moz-range-thumb {\n  width: 12px;\n  height: 14px;\n  background-color: var(--px-gold);\n  border: 2px solid var(--px-line);\n  border-radius: 0;\n}\n\n/* ── 内容层：代码块 / 行内代码 / 引用 / 表格 / 分隔线 ─────────────── */\nhtml[data-pixel-ui] pre {\n  background: var(--px-code-bg) !important;\n  color: var(--px-text-on-dark) !important;\n  border: 2px solid var(--px-wood-light) !important;\n}\nhtml[data-pixel-ui] code {\n  background: var(--px-code-bg) !important;\n  color: var(--px-code-ink) !important;\n  border: none !important;\n  padding: 0 3px;\n}\nhtml[data-pixel-ui] pre code {\n  background: transparent !important;\n  color: inherit !important;\n  padding: 0;\n}\nhtml[data-pixel-ui] blockquote {\n  border-left: 4px solid var(--px-gold) !important;\n  background-color: var(--px-wood-dark) !important;\n  color: var(--px-text-on-dark) !important;\n  padding: 6px 10px;\n}\nhtml[data-pixel-ui] hr {\n  border: none !important;\n  height: 2px;\n  background: var(--px-wood-light) !important;\n}\nhtml[data-pixel-ui] table {\n  border: 2px solid var(--px-wood-warm) !important;\n  border-collapse: collapse;\n}\nhtml[data-pixel-ui] th {\n  background-color: var(--px-wood-warm) !important;\n  color: var(--px-ink-on-mid) !important;\n  font-family: var(--px-font) !important;\n  font-size: 12px;\n  border: 1px solid var(--px-wood-light) !important;\n}\nhtml[data-pixel-ui] td {\n  border: 1px solid var(--px-wood-light) !important;\n}\nhtml[data-pixel-ui] a {\n  color: var(--px-gold-bright) !important;\n  text-decoration-thickness: 2px;\n  text-underline-offset: 3px;\n}\nhtml[data-pixel-ui] summary {\n  cursor: pointer;\n  color: var(--px-gold-bright) !important;\n}\n\n/* ── 工具提示 ───────────────────────────────────────────────────── */\nhtml[data-pixel-ui] [role='tooltip'] {\n  font-size: 11px;\n  line-height: 1.6;\n  color: var(--px-parchment) !important;\n  background: var(--px-tooltip-bg) !important;\n  border: 2px solid var(--px-gold-deep) !important;\n}\nhtml[data-pixel-ui] [role='menuitem']:hover,\nhtml[data-pixel-ui] [role='option']:hover {\n  background-color: var(--px-wood-mid) !important;\n}\n\n/* ── 像素光标（SVG data-URI 阶梯箭头） ──────────────────────────── */\nhtml[data-pixel-ui] body {\n  cursor: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Cpath d='M2 2v17h3v-3h3v-3h3v-3h3v-3h3V2z' fill='%23FFFDF5' stroke='%231A0F06' stroke-width='2'/%3E%3C/svg%3E\") 2 2, auto;\n}\nhtml[data-pixel-ui] button,\nhtml[data-pixel-ui] a,\nhtml[data-pixel-ui] select,\nhtml[data-pixel-ui] [role='tab'],\nhtml[data-pixel-ui] [role='menuitem'],\nhtml[data-pixel-ui] [role='switch'] {\n  cursor: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Cpath d='M2 2v17h3v-3h3v-3h3v-3h3v-3h3V2z' fill='%23F4D03F' stroke='%231A0F06' stroke-width='2'/%3E%3C/svg%3E\") 2 2, pointer;\n}\nhtml[data-pixel-ui] input,\nhtml[data-pixel-ui] textarea,\nhtml[data-pixel-ui] [contenteditable='true'] {\n  cursor: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Cpath d='M5 3h4v2h2v2h2v2h2v2h2v2h2v6h-2v2h-4v2H5z' fill='%23FFFDF5' stroke='%231A0F06' stroke-width='2'/%3E%3C/svg%3E\") 4 3, text;\n}\n\n/* ── 设置页「像素主题」行 ─────────────────────────────────────────\n * 这一段**不跟随皮肤作用域**：像素主题激活时用 --px-* 值，\n * 现代默认（浅色/深色/跟随系统）回落到 --dsw-alias-* 宿主 token，\n * 保证行在任何外观下都清晰可点、对比度达标。\n * 触摸目标 ≥32px（WCAG 2.2 web 目标 24px 之上留手感余量）。 */\n.px-theme-row {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 12px 0;\n  border-top: 1px solid var(--px-wood-pale, var(--dsw-alias-border-l2, #6b5a3a));\n}\n.px-theme-row-title {\n  font-family: var(--px-font, inherit);\n  font-size: 12px;\n  color: var(--px-gold-bright, var(--dsw-alias-label-primary));\n}\n.px-theme-row-desc {\n  font-size: 11px;\n  line-height: 1.6;\n  color: var(--px-text-light, var(--dsw-alias-label-secondary));\n}\n.px-theme-row-cubes {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.px-theme-btn {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-height: 32px;\n  padding: 6px 12px;\n  font-family: var(--px-font, inherit);\n  font-size: 11px;\n  color: var(--px-text-on-dark, var(--dsw-alias-label-primary));\n  background: var(--px-wood-dark, var(--dsw-alias-bg-layer-1));\n  border: 2px solid var(--px-wood-darkest, var(--dsw-alias-border-l1));\n  border-radius: 0 !important;\n  cursor: pointer;\n  transition: transform 0.06s steps(2), background-color 0.06s steps(2);\n}\n.px-theme-btn:hover {\n  background: var(--px-wood-mid, var(--dsw-alias-bg-layer-2));\n}\n.px-theme-btn:active {\n  transform: translateY(2px);\n}\n.px-theme-btn:focus-visible {\n  outline: 2px solid var(--px-gold, var(--dsw-alias-state-business-primary, currentColor));\n  outline-offset: 2px;\n}\n.px-theme-btn-active {\n  color: var(--px-accent-ink, var(--dsw-alias-label-on-accent, #fff));\n  background: var(--px-accent-bg, var(--dsw-alias-brand-primary));\n  border-color: var(--px-gold-deep, var(--dsw-alias-border-l2));\n}\n.px-theme-swatch {\n  width: 10px;\n  height: 10px;\n  border: 2px solid #000;\n  flex-shrink: 0;\n}\n";

// src/client/index.js
var name = "dsh-pixel-ui";
var inject = ["slots", "theme", "locale"];
var THEME_STORAGE_KEY = "dsh-pixel-ui:theme";
var PREFERENCE_URL = "/dsh-pixel-ui/preference";
var BOOTSTRAP_GLOBAL = "__DSH_PIXEL_UI__";
var DEFAULT_SKIN = "pixel-wood";
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
      "--dsw-alias-label-secondary": "#AC8A63",
      "--dsw-alias-state-error-primary": "#E74C3C",
      "--dsw-alias-state-success-primary": "#7DCE82",
      "--dsw-alias-state-warn-primary": "#F39C12",
      "--dsw-alias-state-idle-primary": "#7A5C3E",
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
      "--dsw-alias-border-l2": "#7A6A4A",
      "--dsw-alias-brand-primary": "#8A6400",
      "--dsw-alias-label-primary": "#3A2A10",
      "--dsw-alias-label-secondary": "#6B5020",
      "--dsw-alias-state-error-primary": "#8B2020",
      "--dsw-alias-state-success-primary": "#3A7A40",
      "--dsw-alias-state-warn-primary": "#805000",
      "--dsw-alias-state-idle-primary": "#847458",
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
      "--dsw-alias-label-secondary": "#C08A5C",
      "--dsw-alias-state-error-primary": "#D93B3B",
      "--dsw-alias-state-success-primary": "#6DBF6D",
      "--dsw-alias-state-warn-primary": "#FF8C42",
      "--dsw-alias-state-idle-primary": "#8A5A38",
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
      "--dsw-alias-border-l2": "#4A7A4A",
      "--dsw-alias-brand-primary": "#33FF33",
      "--dsw-alias-label-primary": "#33FF33",
      "--dsw-alias-label-secondary": "#22AA22",
      "--dsw-alias-state-error-primary": "#FF3333",
      "--dsw-alias-state-success-primary": "#33FF33",
      "--dsw-alias-state-warn-primary": "#FFCC33",
      "--dsw-alias-state-idle-primary": "#359035",
      "--dsw-specific-sidebar-fill": "#0C100C"
    }
  }
];
var PIXEL_IDS = THEMES.map((theme) => theme.id);
var RESTORABLE_IDS = /* @__PURE__ */ new Set(["light", "dark", "system", ...PIXEL_IDS]);
var LOCALE_NS = "settings.pixel-ui";
var MESSAGES = {
  zh: {
    "row.title": "像素主题",
    "row.desc": "选择后立即生效并跨重启记忆；「现代默认」回到宿主外观",
    "theme.pixel-wood": "像素·木屋",
    "theme.pixel-paper": "像素·羊皮纸",
    "theme.pixel-warm": "像素·暖阳",
    "theme.pixel-retro": "像素·终端绿",
    "theme.system": "现代默认"
  },
  en: {
    "row.title": "Pixel theme",
    "row.desc": "Applies instantly and persists across restarts; “Modern default” returns to the host appearance",
    "theme.pixel-wood": "Pixel · Wood",
    "theme.pixel-paper": "Pixel · Paper",
    "theme.pixel-warm": "Pixel · Warm",
    "theme.pixel-retro": "Pixel · Terminal Green",
    "theme.system": "Modern default"
  }
};
var THEME_CHOICES = [
  { id: "pixel-wood", swatch: "#F4D03F" },
  { id: "pixel-paper", swatch: "#FFFDF5" },
  { id: "pixel-warm", swatch: "#FF8C42" },
  { id: "pixel-retro", swatch: "#33FF33" },
  { id: "system", swatch: "#7A7A7A" }
];
var fallbackT = (key) => key;
function createThemeRowStore() {
  return (0, import_dsh_client_store.defineStore)({
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
  const t = typeof props.t === "function" ? props.t : fallbackT;
  return (0, import_react.createElement)(
    "div",
    { className: "px-theme-row", role: "group", "aria-label": t("row.title") },
    (0, import_react.createElement)("div", { className: "px-theme-row-title" }, t("row.title")),
    (0, import_react.createElement)("div", { className: "px-theme-row-desc" }, t("row.desc")),
    (0, import_react.createElement)(
      "div",
      { className: "px-theme-row-cubes" },
      THEME_CHOICES.map((choice) => (0, import_react.createElement)(
        "button",
        {
          key: choice.id,
          type: "button",
          className: "px-theme-btn" + (preference === choice.id ? " px-theme-btn-active" : ""),
          "aria-pressed": preference === choice.id,
          onClick: () => {
            props.setTheme(choice.id);
          }
        },
        (0, import_react.createElement)("span", { className: "px-theme-swatch", "aria-hidden": "true", style: { background: choice.swatch } }),
        t(`theme.${choice.id}`)
      ))
    )
  );
}
function readLocalTheme() {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return RESTORABLE_IDS.has(value) ? value : null;
  } catch {
    return null;
  }
}
function writeLocalTheme(id) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, id);
  } catch {
  }
}
function readBootTheme() {
  try {
    const theme = globalThis[BOOTSTRAP_GLOBAL]?.theme;
    return typeof theme === "string" && RESTORABLE_IDS.has(theme) ? theme : null;
  } catch {
    return null;
  }
}
async function readHostTheme() {
  const injected = readBootTheme();
  if (injected !== null) return injected;
  try {
    const res = await fetch(PREFERENCE_URL, { headers: { accept: "application/json" } });
    if (!res.ok) return null;
    const body = await res.json();
    const theme = body?.theme;
    return typeof theme === "string" && RESTORABLE_IDS.has(theme) ? theme : null;
  } catch {
    return null;
  }
}
function writeHostTheme(id) {
  try {
    fetch(PREFERENCE_URL, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ theme: id })
    }).catch(() => {
    });
  } catch {
  }
}
function apply(ctx) {
  const syncScope = () => {
    const active = ctx.theme.getTheme().active;
    const on = PIXEL_IDS.includes(active.id);
    document.documentElement.toggleAttribute("data-pixel-ui", on);
    if (on) document.documentElement.setAttribute("data-pixel-theme", active.id);
    else document.documentElement.removeAttribute("data-pixel-theme");
    return on;
  };
  let explicit = false;
  let restoring = true;
  ctx.on("theme/change", (snapshot) => {
    syncScope();
    const pref = snapshot.preference;
    if (explicit) {
      explicit = false;
      writeLocalTheme(pref);
      writeHostTheme(pref);
      return;
    }
    if (PIXEL_IDS.includes(pref)) {
      writeLocalTheme(pref);
      writeHostTheme(pref);
      return;
    }
    const want = readLocalTheme();
    if (want !== null && PIXEL_IDS.includes(want)) {
      try {
        ctx.theme.setTheme(want);
      } catch {
      }
      return;
    }
    if (restoring || want === null) {
      return;
    }
    writeLocalTheme(pref);
    writeHostTheme(pref);
  });
  ctx.effect(() => {
    const disposers = THEMES.map((definition) => ctx.theme.register(definition));
    return () => {
      for (const dispose of disposers) dispose();
    };
  }, "dsh-pixel-ui: theme registration");
  const applyTarget = (target) => {
    try {
      ctx.theme.setTheme(target);
    } catch {
    }
    syncScope();
    writeLocalTheme(target);
    return ctx.theme.getTheme().active.id === target;
  };
  const restore = async () => {
    const local = readLocalTheme();
    if (local !== null) {
      applyTarget(local);
      const host2 = await readHostTheme();
      if (host2 !== null && host2 !== ctx.theme.getTheme().preference) applyTarget(host2);
      return;
    }
    const host = await readHostTheme();
    if (!applyTarget(host ?? DEFAULT_SKIN)) {
      await new Promise((resolve) => {
        setTimeout(resolve, 120);
      });
      applyTarget(host ?? DEFAULT_SKIN);
    }
  };
  const settle = () => {
    restoring = false;
  };
  void restore().then(settle, settle);
  ctx.effect(() => ctx.locale.register(LOCALE_NS, MESSAGES), "dsh-pixel-ui: settings row dictionaries");
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
    locale: LOCALE_NS,
    inject: (actions) => {
      bound = actions;
      syncRow(ctx.theme.getTheme());
      return { setTheme: (id) => {
        explicit = true;
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

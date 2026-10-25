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
var pixel_default = `/* dsh-pixel-ui — 星露谷风像素皮肤（木屋/羊皮纸/暖阳/终端绿四主题）\r
 *\r
 * 设计原则（v1.5.0 重写，依据是桌面端实测）：\r
 *\r
 * 1. **完全平面（flat）**。用户 2026-10-01 的决定：不要立体效果。\r
 *    所以本表里**没有任何 box-shadow / text-shadow**——凸起、凹陷、浮雕、\r
 *    文字投影全部取消。像素的层次改由三样东西表达：\r
 *      ① 整像素描边（2px，内容层 1px）；\r
 *      ② 平涂色块之间的一档明度差（主题色板自带）；\r
 *      ③ 2px 棋盘抖动（--px-dither）与手绘 SVG 像素图形。\r
 *    历史上用半透明 inset/outset 做 bevel，在 1.25 DPR 上会渲染成亚像素\r
 *    灰阶毛边，那正是用户最早报的「伪像素」。\r
 *\r
 * 2. **只做 token 表达不了的事**。颜色、背景、文字色交给主题 token；本表负责\r
 *    方角、2px 整像素描边、像素字体、位图缩放、像素光标、像素滚动条。\r
 *\r
 * 3. **选择器必须是「确定的类型」，不许再用 \`[class*='card']\` 这种子串扫射**。\r
 *    v1.4 的 \`[class*=...]\` 规则命中了宿主大量它没打算命中的元素（\`.xz4KEq_*\`、\r
 *    \`.Dc7zOa_*\`、\`.Hqq-bq_*\`、图标类…），结果整个界面被盖上一层厚重黑框，\r
 *    读起来像「处处凹陷的印章」——用户报的「伪像素 / 凹陷」就是它。\r
 *    这里只保留三类选择器：\r
 *      a) 真正的 HTML 语义（button/input/table/pre/hr/…）；\r
 *      b) 稳定的 ARIA 与 data 属性（[role=tab]、[aria-selected]、[data-theme]）；\r
 *      c) 本插件自己的类名（.px-*）与宿主主题 token（--dsw-*）。\r
 *\r
 * 4. **1px 细线只在内容层出现**（表格内线），装饰框一律 2px 起：\r
 *    像素风里 1px 装饰线在非整数缩放下必然糊成灰线。\r
 *\r
 * 5. **动效是像素动效（v1.6.0）**：只用 \`steps()\` 阶梯、逐帧闪烁和 sprite\r
 *    位移；不做平滑插值、不做 width/height 动画、不移动布局。所有动画都在\r
 *    \`prefers-reduced-motion: reduce\` 下关掉。动效只表达「状态正在变化」\r
 *    （思考中/运行中/选中/按下/提示进入），不拿来做装饰。\r
 *\r
 * 作用域 html[data-pixel-ui]：任一像素主题激活时生效，data-pixel-theme 区分配色。\r
 */\r
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
/* ── 基础令牌（木屋=暗色基准，其余主题覆盖配色） ─────────────────── */\r
html[data-pixel-ui] {\r
  /* 木色阶 */\r
  --px-wood-darkest: #1A0F06;\r
  --px-wood-dark: #2C1A0C;\r
  --px-wood-mid: #3A2515;\r
  --px-wood-warm: #4A3020;\r
  --px-wood-light: #6B4C2E;\r
  --px-wood-pale: #8B6B45;\r
  /* 金色阶 */\r
  --px-gold: #F4D03F;\r
  --px-gold-bright: #FFE066;\r
  --px-gold-dark: #C99A00;\r
  --px-gold-deep: #8B6B00;\r
  --px-parchment: #F5E6C8;\r
  --px-text-on-dark: #E8D5B0;\r
  --px-text-light: #AC8A63;\r
  /* 输入件 */\r
  --px-input-bg: #1A0F06;\r
  --px-input-text: #FFFDF5;\r
  --px-input-caret: #F4D03F;\r
  --px-input-ph: #B08A5E;\r
  /* 勾/点：暗色主题用深木色，浅色纸面在主题块里换成纸白 */\r
  --px-check: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' shape-rendering='crispEdges'%3E%3Cg fill='%231A0F06'%3E%3Crect x='0' y='4' width='2' height='2'/%3E%3Crect x='0' y='6' width='2' height='2'/%3E%3Crect x='2' y='6' width='2' height='2'/%3E%3Crect x='2' y='8' width='2' height='2'/%3E%3Crect x='4' y='4' width='2' height='2'/%3E%3Crect x='4' y='6' width='2' height='2'/%3E%3Crect x='4' y='8' width='2' height='2'/%3E%3Crect x='4' y='10' width='2' height='2'/%3E%3Crect x='6' y='2' width='2' height='2'/%3E%3Crect x='6' y='4' width='2' height='2'/%3E%3Crect x='6' y='6' width='2' height='2'/%3E%3Crect x='6' y='8' width='2' height='2'/%3E%3Crect x='8' y='0' width='2' height='2'/%3E%3Crect x='8' y='2' width='2' height='2'/%3E%3Crect x='8' y='4' width='2' height='2'/%3E%3Crect x='8' y='6' width='2' height='2'/%3E%3Crect x='10' y='0' width='2' height='2'/%3E%3Crect x='10' y='2' width='2' height='2'/%3E%3Crect x='10' y='4' width='2' height='2'/%3E%3C/g%3E%3C/svg%3E");\r
  --px-radio: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='8' height='8' fill='%231A0F06'/%3E%3C/svg%3E");\r
  /* 代码 */\r
  --px-code-bg: #241408;\r
  --px-code-ink: #FFE066;\r
  /* 提示框 */\r
  --px-tooltip-bg: #1A0F06;\r
  /* 强调面 */\r
  --px-accent-bg: #F4D03F;\r
  --px-accent-ink: #1A0F06;\r
  --px-ink-on-mid: #F5E6C8;\r
  /* 描边色：平面皮肤唯一的「线」色，2px 整像素 */\r
  --px-line: #140B04;\r
  /* 纹理：2px 棋盘抖动 */\r
  --px-dither: #241408;\r
  /* 暗角（CRT 只保留暗角，扫描线在非整数 DPR 上必糊） */\r
  --px-vignette: rgba(0, 0, 0, 0.2);\r
  /* 内容列宽：宿主把 --dsh-conversation-column-width 写死成 0，\r
   * clamp(680px, 0 * .64, 920px) 恒取 680px 下限 → 宽屏上正文只占中间一条\r
   * （踩坑 #7）。这里补上那个变量应有的值：正文随视口撑开。 */\r
  --px-chat-width: clamp(680px, calc(64vw - 140px), 1200px);\r
  /* 侧栏 / 顶栏底 */\r
  --px-sidebar-fill: #241408;\r
  --px-topbar-fill: #2C1A0C;\r
  /* 字体栈 */\r
  --px-font: 'Fusion Pixel 12', 'Press Start 2P', monospace;\r
  --px-mono: 'Cascadia Code', 'Consolas', 'Courier New', monospace;\r
  /* 动效：像素动画只走阶梯，不使用平滑曲线（v1.6.0） */\r
  --px-t-fast: 80ms;\r
  --px-t-mid: 140ms;\r
  --px-t-slow: 220ms;\r
  --px-step-2: steps(2, end);\r
  --px-step-4: steps(4, end);\r
  --px-step-8: steps(8, end);\r
  /* 主按钮悬停底色；与 --px-accent-bg / --px-accent-ink 配对做对比度审计 */\r
  --px-accent-hover: #FFE066;\r
}\r
\r
/* ── 四主题配色（Agent Xi 同款） ─────────────────────────────────── */\r
html[data-pixel-theme='pixel-paper'] {\r
  --px-wood-darkest: #F0E8D8;\r
  --px-wood-dark: #E8DCC8;\r
  --px-wood-mid: #DDD0B8;\r
  --px-wood-warm: #D4C4A8;\r
  --px-wood-light: #B8A080;\r
  --px-wood-pale: #9B8B6B;\r
  --px-gold: #A07000;\r
  --px-gold-bright: #6B4F00;\r
  --px-gold-dark: #8A6400;\r
  --px-gold-deep: #7A5A00;\r
  --px-parchment: #FFFDF5;\r
  --px-text-on-dark: #3A2A10;\r
  --px-text-light: #6B5020;\r
  --px-input-bg: #FFFDF5;\r
  --px-input-text: #3A2A10;\r
  --px-input-caret: #8A6400;\r
  --px-input-ph: #8B7040;\r
  /* 深金底上的深木色勾看不清，纸面主题改成纸白勾/点 */\r
  --px-check: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' shape-rendering='crispEdges'%3E%3Cg fill='%23FFFDF5'%3E%3Crect x='0' y='4' width='2' height='2'/%3E%3Crect x='0' y='6' width='2' height='2'/%3E%3Crect x='2' y='6' width='2' height='2'/%3E%3Crect x='2' y='8' width='2' height='2'/%3E%3Crect x='4' y='4' width='2' height='2'/%3E%3Crect x='4' y='6' width='2' height='2'/%3E%3Crect x='4' y='8' width='2' height='2'/%3E%3Crect x='4' y='10' width='2' height='2'/%3E%3Crect x='6' y='2' width='2' height='2'/%3E%3Crect x='6' y='4' width='2' height='2'/%3E%3Crect x='6' y='6' width='2' height='2'/%3E%3Crect x='6' y='8' width='2' height='2'/%3E%3Crect x='8' y='0' width='2' height='2'/%3E%3Crect x='8' y='2' width='2' height='2'/%3E%3Crect x='8' y='4' width='2' height='2'/%3E%3Crect x='8' y='6' width='2' height='2'/%3E%3Crect x='10' y='0' width='2' height='2'/%3E%3Crect x='10' y='2' width='2' height='2'/%3E%3Crect x='10' y='4' width='2' height='2'/%3E%3C/g%3E%3C/svg%3E");\r
  --px-radio: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='8' height='8' fill='%23FFFDF5'/%3E%3C/svg%3E");\r
  --px-code-bg: #E0D4BC;\r
  --px-code-ink: #5C4400;\r
  --px-tooltip-bg: #2A1B08;\r
  --px-accent-bg: #7A5A00;\r
  --px-accent-ink: #FFFDF5;\r
  --px-ink-on-mid: #3A2A10;\r
  --px-line: #8B7040;\r
  --px-dither: #D8C9AC;\r
  --px-vignette: rgba(0, 0, 0, 0.07);\r
  --px-sidebar-fill: #E8DCC8;\r
  --px-topbar-fill: #E8DCC8;\r
  --px-accent-hover: #5C4400;\r
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
  --px-text-light: #C08A5C;\r
  --px-input-bg: #1E0E04;\r
  --px-input-text: #FFFBF5;\r
  --px-input-caret: #FF8C42;\r
  --px-input-ph: #C08A5C;\r
  --px-code-bg: #2A1308;\r
  --px-code-ink: #FFA64D;\r
  --px-tooltip-bg: #1E0E04;\r
  --px-accent-bg: #FF8C42;\r
  --px-accent-ink: #1E0E04;\r
  --px-ink-on-mid: #FFF0E0;\r
  --px-line: #150801;\r
  --px-dither: #2A1308;\r
  --px-sidebar-fill: #2A1308;\r
  --px-topbar-fill: #34180A;\r
  --px-accent-hover: #FFA64D;\r
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
  --px-parchment: #B8F0B8;\r
  --px-text-on-dark: #33FF33;\r
  --px-text-light: #22AA22;\r
  --px-input-bg: #0A0E0A;\r
  --px-input-text: #33FF33;\r
  --px-input-caret: #33FF33;\r
  --px-input-ph: #22AA22;\r
  --px-code-bg: #0E140E;\r
  --px-code-ink: #66FF66;\r
  --px-tooltip-bg: #0A0E0A;\r
  --px-accent-bg: #33FF33;\r
  --px-accent-ink: #0A0E0A;\r
  --px-ink-on-mid: #B8F0B8;\r
  --px-line: #040704;\r
  --px-dither: #101A10;\r
  --px-sidebar-fill: #0C100C;\r
  --px-topbar-fill: #0E140E;\r
  --px-accent-hover: #66FF66;\r
}\r
\r
/* ── 内容列宽（桌面端「一半一半」的修正，踩坑 #7） ──────────────────\r
 * 宿主只在样式表里声明 \`--dsh-chat-content-width: var(--dsh-chat-user-width,\r
 * clamp(680px, calc(var(--dsh-conversation-column-width, 0px) * .64), 920px))\`，\r
 * 而 \`--dsh-conversation-column-width\` 全仓无人赋值 → clamp 恒取 680px。\r
 * 在根作用域用 !important 把两个变量补上（宿主会把 user-width 以内联样式写在\r
 * 容器上，只有 !important 能压过内联）。 */\r
html[data-pixel-ui] {\r
  --dsh-conversation-column-width: calc(100vw - 280px) !important;\r
  --dsh-chat-user-width: var(--px-chat-width) !important;\r
  --dsh-chat-content-width: var(--px-chat-width) !important;\r
}\r
/* 兜底：万一宿主把列宽写死在自己的样式层，这里同权重覆盖。 */\r
html[data-pixel-ui] [class*='xz4KEq_column'] {\r
  max-width: var(--px-chat-width);\r
}\r
\r
/* ── 全局：方角、禁次像素平滑、位图缩放 ─────────────────────────── */\r
html[data-pixel-ui] * {\r
  border-radius: 0 !important;\r
}\r
html[data-pixel-ui] body {\r
  -webkit-font-smoothing: none;\r
  -moz-osx-font-smoothing: grayscale;\r
  text-rendering: geometricPrecision;\r
  font-family: var(--px-font) !important;\r
  /* 0.01em 会把字形推到半像素 → 灰边；像素字体必须整像素落位 */\r
  letter-spacing: 0;\r
}\r
html[data-pixel-ui] img,\r
html[data-pixel-ui] canvas,\r
html[data-pixel-ui] video {\r
  image-rendering: pixelated;\r
}\r
html[data-pixel-ui] ::selection {\r
  background: var(--px-accent-bg);\r
  color: var(--px-accent-ink);\r
}\r
html[data-pixel-ui] :focus-visible {\r
  outline: 2px solid var(--px-gold) !important;\r
  outline-offset: 1px;\r
}\r
html[data-pixel-ui] {\r
  accent-color: var(--px-gold);\r
}\r
\r
/* 像素动效：闪烁 / 思考条 / 提示进入 / 运行中。全部走 steps 或离散帧。 */\r
@keyframes px-blink {\r
  0%, 55% { opacity: 1; }\r
  56%, 100% { opacity: 0.35; }\r
}\r
@keyframes px-toast-in {\r
  from { opacity: 0; transform: translateY(8px); }\r
  to { opacity: 1; transform: translateY(0); }\r
}\r
@keyframes px-toast-out {\r
  from { opacity: 1; transform: translateY(0); }\r
  to { opacity: 0; transform: translateY(4px); }\r
}\r
@keyframes px-running {\r
  0%, 100% { border-left-color: var(--px-gold); }\r
  50% { border-left-color: var(--px-wood-light); }\r
}\r
\r
/* 暗角：只保留径向暗角（扫描线在 1.25 DPR 上必糊成灰膜）。 */\r
html[data-pixel-ui] body::after {\r
  content: "";\r
  position: fixed;\r
  inset: 0;\r
  z-index: 2147483647;\r
  pointer-events: none;\r
  background: radial-gradient(ellipse at center, transparent 70%, var(--px-vignette) 100%);\r
}\r
@media (prefers-reduced-motion: reduce) {\r
  html[data-pixel-ui] * {\r
    transition: none !important;\r
    animation: none !important;\r
  }\r
  html[data-pixel-ui] *::before,\r
  html[data-pixel-ui] *::after {\r
    transition: none !important;\r
    animation: none !important;\r
  }\r
}\r
\r
/* ── 像素滚动条：方、10px、木色 ─────────────────────────────────── */\r
html[data-pixel-ui] {\r
  scrollbar-color: var(--px-wood-light) var(--px-wood-darkest);\r
}\r
html[data-pixel-ui] ::-webkit-scrollbar {\r
  width: 8px;\r
  height: 8px;\r
}\r
html[data-pixel-ui] ::-webkit-scrollbar-track {\r
  background: var(--px-wood-darkest);\r
  border-left: 2px solid var(--px-wood-dark);\r
}\r
html[data-pixel-ui] ::-webkit-scrollbar-thumb {\r
  background-color: var(--px-wood-light);\r
  border: 2px solid var(--px-wood-darkest);\r
  /* 4×2 的握把，比整条渐变更像像素滚动条 */\r
  background-image: linear-gradient(var(--px-wood-pale), var(--px-wood-pale));\r
  background-size: 4px 2px;\r
  background-position: center;\r
  background-repeat: no-repeat;\r
}\r
html[data-pixel-ui] ::-webkit-scrollbar-thumb:hover {\r
  background-color: var(--px-wood-pale);\r
}\r
html[data-pixel-ui] ::-webkit-scrollbar-thumb:active {\r
  background-color: var(--px-gold-dark);\r
}\r
html[data-pixel-ui] ::-webkit-scrollbar-corner {\r
  background: var(--px-wood-darkest);\r
}\r
\r
/* ── 排版：装饰性文字走像素字体；正文/代码走 mono ────────────────── */\r
html[data-pixel-ui] h1,\r
html[data-pixel-ui] h2,\r
html[data-pixel-ui] h3,\r
html[data-pixel-ui] h4,\r
html[data-pixel-ui] summary,\r
html[data-pixel-ui] button,\r
html[data-pixel-ui] label,\r
html[data-pixel-ui] legend,\r
html[data-pixel-ui] [role='tab'],\r
html[data-pixel-ui] [role='menuitem'],\r
html[data-pixel-ui] [role='tooltip'],\r
html[data-pixel-ui] [role='switch'] {\r
  font-family: var(--px-font) !important;\r
  font-variant-ligatures: none;\r
}\r
html[data-pixel-ui] h1,\r
html[data-pixel-ui] h2,\r
html[data-pixel-ui] h3 {\r
  color: var(--px-gold-bright) !important;\r
}\r
/* 正文/代码层：mono、不加字阴影、长 token 允许断行（像素字体更宽） */\r
html[data-pixel-ui] pre,\r
html[data-pixel-ui] code,\r
html[data-pixel-ui] kbd,\r
html[data-pixel-ui] textarea,\r
html[data-pixel-ui] input,\r
html[data-pixel-ui] p,\r
html[data-pixel-ui] li,\r
html[data-pixel-ui] td,\r
html[data-pixel-ui] th {\r
  font-family: var(--px-mono) !important;\r
}\r
html[data-pixel-ui] p,\r
html[data-pixel-ui] li {\r
  overflow-wrap: anywhere;\r
}\r
html[data-pixel-ui] li::marker {\r
  color: var(--px-gold);\r
}\r
html[data-pixel-ui] kbd {\r
  color: var(--px-text-light) !important;\r
  font-family: var(--px-font) !important;\r
  font-size: 11px;\r
  font-variant-ligatures: none;\r
}\r
html[data-pixel-ui] mark {\r
  background: var(--px-gold) !important;\r
  color: var(--px-accent-ink) !important;\r
}\r
\r
/* ── 按钮：默认只继承宿主的底与形（宿主大量图标按钮本来就是透明的），\r
 * 只把方角、像素字与「按下去掉一档」的反馈补齐；实心块只在悬停/选中时出现。\r
 * v1.4 给**所有** button 套 2px 黑框 + 内阴影，图标按钮全变成厚盒子，\r
 * 这是用户报「处处凹陷」的主因之一。 ─────────────────────────────── */\r
html[data-pixel-ui] button {\r
  font-size: 12px;\r
  letter-spacing: 0;\r
  border: none !important;\r
  font-variant-ligatures: none;\r
  transition:\r
    background-color var(--px-t-fast) var(--px-step-2),\r
    color var(--px-t-fast) var(--px-step-2),\r
    transform var(--px-t-fast) var(--px-step-2);\r
}\r
/* 主按钮/危险按钮的底色由宿主 token 负责，这里不能再把它们刷成木色，\r
 * 否则 hover 时深字落在深底上（v1.5.0 的 generic hover 就踩过这个）。\r
 * 只给「普通按钮」用木色 hover。用 wood-mid 而不是 wood-dark：\r
 * 纸面主题的 wood-dark 和 sidebar 同色，hover 会完全看不见。 */\r
html[data-pixel-ui] button:not(:disabled):not([class*='primary']):not([class*='Primary']):not([class*='danger']):not([class*='Danger']):hover {\r
  background-color: var(--px-wood-mid) !important;\r
}\r
/* 主按钮：实心块 + 2px 描边；hover 由 --dsw-alias-button-primary-hover 控制，\r
 * dither 是叠加的 2px 棋盘（不改变底色）。 */\r
html[data-pixel-ui] button[class*='primary']:hover:not(:disabled),\r
html[data-pixel-ui] button[class*='Primary']:hover:not(:disabled) {\r
  background-image: repeating-conic-gradient(\r
    color-mix(in srgb, var(--px-accent-ink) 10%, transparent) 0 25%,\r
    transparent 0 50%\r
  ) !important;\r
  background-size: 4px 4px !important;\r
}\r
/* 按下去只做 1px 的整像素位移，不改布局尺寸；松开即回。 */\r
html[data-pixel-ui] button:not(:disabled):active {\r
  transform: translate(1px, 1px);\r
  transition-duration: 0s;\r
}\r
/* 已经按下的切换按钮用木色底 + 金色字，和普通 hover 区分开。\r
 * 设置页的像素主题按钮自己管理选中态，不能被这条刷掉。 */\r
html[data-pixel-ui] button[aria-pressed='true']:not(.px-theme-btn) {\r
  background-color: var(--px-wood-mid) !important;\r
  color: var(--px-gold-bright) !important;\r
}\r
/* 宿主的 primary token 已能上色；这里再兜一层，保证 token 缺失/第三方按钮\r
 * 也跟随主题，不把宿主默认蓝带进木屋/羊皮纸。 */\r
html[data-pixel-ui] button[class*='primary'],\r
html[data-pixel-ui] button[class*='Primary'] {\r
  background-color: var(--px-accent-bg) !important;\r
  background-image: none !important;\r
  color: var(--px-accent-ink) !important;\r
  border: 2px solid var(--px-line) !important;\r
}\r
html[data-pixel-ui] button[class*='primary']:hover:not(:disabled),\r
html[data-pixel-ui] button[class*='Primary']:hover:not(:disabled) {\r
  background-color: var(--px-accent-hover) !important;\r
}\r
html[data-pixel-ui] button[class*='danger'],\r
html[data-pixel-ui] button[class*='Danger'] {\r
  border: 2px solid var(--px-line) !important;\r
}\r
html[data-pixel-ui] button:disabled {\r
  opacity: 0.55;\r
  cursor: not-allowed;\r
}\r
\r
/* ── 页签（对话/轨迹/记忆）：文字 + 金下沿，**不加边框**\r
 * v1.4 给页签套了 2px 黑框，整条读起来像凹陷的输入框（用户报「凹陷了」）。\r
 * 平面皮肤里「选中」只用颜色 + 一条整像素下边线表达，不做凹凸。 */\r
html[data-pixel-ui] [role='tab'] {\r
  position: relative;\r
  font-size: 13px;\r
  font-variant-ligatures: none;\r
  border: none !important;\r
  border-bottom: 3px solid transparent !important;\r
  background-color: transparent !important;\r
  color: var(--px-text-light) !important;\r
  transition: color var(--px-t-fast) var(--px-step-2);\r
}\r
html[data-pixel-ui] [role='tab']::after {\r
  content: "";\r
  position: absolute;\r
  left: 0;\r
  right: 0;\r
  bottom: -3px;\r
  height: 2px;\r
  background: var(--px-gold);\r
  pointer-events: none;\r
  transform: scaleX(0);\r
  transform-origin: left center;\r
  transition:\r
    transform var(--px-t-mid) var(--px-step-4),\r
    height var(--px-t-fast) var(--px-step-2);\r
}\r
html[data-pixel-ui] [role='tab']:hover {\r
  color: var(--px-text-on-dark) !important;\r
}\r
html[data-pixel-ui] [role='tab']:hover::after {\r
  transform: scaleX(1);\r
}\r
html[data-pixel-ui] [role='tab'][aria-selected='true'] {\r
  color: var(--px-gold-bright) !important;\r
  background-color: transparent !important;\r
  border-bottom-color: transparent !important;\r
}\r
html[data-pixel-ui] [role='tab'][aria-selected='true']::after {\r
  height: 3px;\r
  transform: scaleX(1);\r
}\r
\r
/* ── 输入件：黑木底 + 羊皮纸字 + 金框，聚焦金环 ───────────────────\r
 * 只给「真正的输入面」上底和框，\`select\` 与只读输入保留宿主的形，\r
 * 否则设置页里成排的选择器全变成黑盒子。 */\r
html[data-pixel-ui] input:not([type='checkbox']):not([type='radio']),\r
html[data-pixel-ui] textarea,\r
html[data-pixel-ui] [contenteditable='true'] {\r
  font-size: 12px;\r
  letter-spacing: 0;\r
  font-variant-ligatures: none;\r
  color: var(--px-input-text) !important;\r
  -webkit-text-fill-color: var(--px-input-text) !important;\r
  caret-color: var(--px-input-caret) !important;\r
  caret-shape: block;\r
  background-color: var(--px-input-bg) !important;\r
  border: 2px solid var(--px-gold-deep) !important;\r
  transition: border-color var(--px-t-fast) var(--px-step-2);\r
}\r
html[data-pixel-ui] input:not([type='checkbox']):not([type='radio']):hover:not(:focus),\r
html[data-pixel-ui] textarea:hover:not(:focus),\r
html[data-pixel-ui] [contenteditable='true']:hover:not(:focus) {\r
  border-color: var(--px-gold-dark) !important;\r
}\r
html[data-pixel-ui] input:focus,\r
html[data-pixel-ui] textarea:focus,\r
html[data-pixel-ui] [contenteditable='true']:focus {\r
  border-color: var(--px-gold) !important;\r
  outline: none !important;\r
}\r
html[data-pixel-ui] select {\r
  color: var(--px-input-text) !important;\r
  background-color: transparent !important;\r
  border: 2px solid var(--px-gold-deep) !important;\r
  transition: border-color var(--px-t-fast) var(--px-step-2);\r
}\r
html[data-pixel-ui] select:hover:not(:focus) {\r
  border-color: var(--px-gold-dark) !important;\r
}\r
html[data-pixel-ui] select:focus {\r
  border-color: var(--px-gold) !important;\r
  outline: none !important;\r
}\r
html[data-pixel-ui] input::placeholder,\r
html[data-pixel-ui] textarea::placeholder {\r
  color: var(--px-input-ph) !important;\r
  -webkit-text-fill-color: var(--px-input-ph) !important;\r
  opacity: 1;\r
}\r
html[data-pixel-ui] [contenteditable='true']:empty::before {\r
  color: var(--px-input-ph) !important;\r
  -webkit-text-fill-color: var(--px-input-ph) !important;\r
}\r
\r
/* ── 选择件：复选框 / 单选 / 开关 / 滑块 ───────────────────────── */\r
html[data-pixel-ui] input[type='checkbox'],\r
html[data-pixel-ui] input[type='radio'] {\r
  appearance: none;\r
  -webkit-appearance: none;\r
  width: 14px;\r
  height: 14px;\r
  padding: 0;\r
  flex-shrink: 0;\r
  background-color: var(--px-input-bg) !important;\r
  border: 2px solid var(--px-line) !important;\r
  transition:\r
    background-color var(--px-t-fast) var(--px-step-2),\r
    border-color var(--px-t-fast) var(--px-step-2);\r
}\r
html[data-pixel-ui] input[type='checkbox']:not(:checked):hover,\r
html[data-pixel-ui] input[type='radio']:not(:checked):hover {\r
  border-color: var(--px-gold-dark) !important;\r
}\r
html[data-pixel-ui] input[type='checkbox']:checked {\r
  background-color: var(--px-gold) !important;\r
  /* 12×12 手绘像素对勾（2px 阶梯），颜色由 --px-check 按主题切换 */\r
  background-image: var(--px-check) !important;\r
  background-repeat: no-repeat !important;\r
  background-position: 3px 1px !important;\r
  border: 2px solid var(--px-line) !important;\r
}\r
html[data-pixel-ui] input[type='radio']:checked {\r
  background-color: var(--px-gold) !important;\r
  /* 平色时代没有 inset 灰阶可用：8×8 手绘像素方点，颜色由 --px-radio 切换 */\r
  background-image: var(--px-radio) !important;\r
  background-size: 6px 6px !important;\r
  background-position: 2px 2px !important;\r
  background-repeat: no-repeat !important;\r
}\r
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
html[data-pixel-ui] [role='switch'] {\r
  border: 2px solid var(--px-line) !important;\r
  background-color: var(--px-wood-dark) !important;\r
  transition: border-color var(--px-t-fast) var(--px-step-2), background-color var(--px-t-fast) var(--px-step-2);\r
}\r
html[data-pixel-ui] [role='switch']:hover {\r
  border-color: var(--px-gold-dark) !important;\r
}\r
html[data-pixel-ui] input[type='range'] {\r
  appearance: none;\r
  -webkit-appearance: none;\r
  height: 14px;\r
  padding: 0;\r
  border: none !important;\r
  background: transparent !important;\r
}\r
html[data-pixel-ui] input[type='range']::-webkit-slider-runnable-track {\r
  height: 8px;\r
  border: 2px solid var(--px-line);\r
  background-color: var(--px-wood-mid);\r
}\r
html[data-pixel-ui] input[type='range']::-webkit-slider-thumb {\r
  -webkit-appearance: none;\r
  width: 12px;\r
  height: 14px;\r
  margin-top: -5px;\r
  background-color: var(--px-gold);\r
  border: 2px solid var(--px-line);\r
  transition: background-color var(--px-t-fast) var(--px-step-2);\r
}\r
html[data-pixel-ui] input[type='range']::-webkit-slider-thumb:hover {\r
  background-color: var(--px-gold-bright);\r
}\r
html[data-pixel-ui] input[type='range']::-moz-range-track {\r
  height: 8px;\r
  border: 2px solid var(--px-line);\r
  background: var(--px-wood-mid);\r
}\r
html[data-pixel-ui] input[type='range']::-moz-range-thumb {\r
  width: 12px;\r
  height: 14px;\r
  background-color: var(--px-gold);\r
  border: 2px solid var(--px-line);\r
  border-radius: 0;\r
}\r
\r
/* ── 内容层：代码块 / 行内代码 / 引用 / 表格 / 分隔线 ─────────────── */\r
html[data-pixel-ui] pre {\r
  background: var(--px-code-bg) !important;\r
  color: var(--px-text-on-dark) !important;\r
  border: 2px solid var(--px-wood-light) !important;\r
  border-left: 4px solid var(--px-gold-deep) !important;\r
}\r
/* 代码块顶栏：像终端窗口的 title bar，2px 底线 + 左侧金色方块。 */\r
html[data-pixel-ui] [data-code-block-banner] {\r
  background-color: var(--px-wood-mid) !important;\r
  color: var(--px-text-light) !important;\r
  border-bottom: 2px solid var(--px-line) !important;\r
  border-left: 4px solid var(--px-gold) !important;\r
  font-family: var(--px-font) !important;\r
  font-size: 11px;\r
  letter-spacing: 0;\r
  font-variant-ligatures: none;\r
}\r
html[data-pixel-ui] [data-code-block-banner] button {\r
  background: transparent !important;\r
  color: var(--px-text-on-dark) !important;\r
  border: none !important;\r
  padding: 0 4px;\r
}\r
html[data-pixel-ui] code {\r
  background: var(--px-code-bg) !important;\r
  color: var(--px-code-ink) !important;\r
  border: none !important;\r
  padding: 0 3px;\r
}\r
html[data-pixel-ui] pre code {\r
  background: transparent !important;\r
  color: inherit !important;\r
  padding: 0;\r
}\r
html[data-pixel-ui] blockquote {\r
  border: 2px solid var(--px-wood-light) !important;\r
  border-left: 4px solid var(--px-gold) !important;\r
  background-color: var(--px-wood-dark) !important;\r
  background-image: repeating-conic-gradient(\r
    color-mix(in srgb, var(--px-gold) 5%, transparent) 0 25%,\r
    transparent 0 50%\r
  ) !important;\r
  background-size: 4px 4px !important;\r
  color: var(--px-text-on-dark) !important;\r
  padding: 6px 10px;\r
}\r
html[data-pixel-ui] hr {\r
  border: none !important;\r
  height: 2px;\r
  background: repeating-linear-gradient(\r
    90deg,\r
    var(--px-wood-light) 0 2px,\r
    transparent 2px 4px\r
  ) !important;\r
}\r
html[data-pixel-ui] table {\r
  border: 2px solid var(--px-wood-warm) !important;\r
  border-collapse: collapse;\r
}\r
html[data-pixel-ui] tbody tr:nth-child(even) td {\r
  background-color: color-mix(in srgb, var(--px-wood-mid) 32%, transparent) !important;\r
}\r
html[data-pixel-ui] tbody tr:hover td {\r
  background-color: var(--px-wood-mid) !important;\r
}\r
html[data-pixel-ui] th {\r
  background-color: var(--px-wood-warm) !important;\r
  color: var(--px-ink-on-mid) !important;\r
  font-family: var(--px-font) !important;\r
  font-size: 12px;\r
  border: 1px solid var(--px-wood-light) !important;\r
}\r
html[data-pixel-ui] td {\r
  border: 1px solid var(--px-wood-light) !important;\r
}\r
html[data-pixel-ui] a {\r
  color: var(--px-gold-bright) !important;\r
  text-decoration-color: var(--px-gold-dark);\r
  text-decoration-thickness: 2px;\r
  text-underline-offset: 3px;\r
  transition: color var(--px-t-fast) var(--px-step-2);\r
}\r
html[data-pixel-ui] a:hover {\r
  color: var(--px-gold) !important;\r
}\r
html[data-pixel-ui] summary {\r
  cursor: pointer;\r
  color: var(--px-gold-bright) !important;\r
  transition: color var(--px-t-fast) var(--px-step-2);\r
}\r
html[data-pixel-ui] summary:hover {\r
  color: var(--px-gold) !important;\r
}\r
\r
/* ── 工具提示 / 菜单 / 状态条 ──────────────────────────────────── */\r
html[data-pixel-ui] [role='tooltip'] {\r
  font-size: 11px;\r
  line-height: 1.6;\r
  color: var(--px-parchment) !important;\r
  background: var(--px-tooltip-bg) !important;\r
  border: 2px solid var(--px-gold-deep) !important;\r
  background-image:\r
    linear-gradient(var(--px-gold), var(--px-gold)),\r
    linear-gradient(var(--px-gold), var(--px-gold)) !important;\r
  background-size: 6px 2px, 2px 6px !important;\r
  background-position: 0 0, 0 0 !important;\r
  background-repeat: no-repeat !important;\r
}\r
html[data-pixel-ui] [data-menu-material],\r
html[data-pixel-ui] [role='menu'] {\r
  border: 2px solid var(--px-line) !important;\r
  /* 2px 描边不能再把固定宽度的菜单撑出 4px 横向滚动条 */\r
  box-sizing: border-box !important;\r
  overflow-x: hidden !important;\r
}\r
/* 菜单的滚动容器在 role=menu 的内部（宿主 _viewport_），只给外层\r
 * overflow-x:hidden 拦不住内部那一条；菜单不需要横向滚动，一律 clip。 */\r
html[data-pixel-ui] [role='menu'] *,\r
html[data-pixel-ui] [data-menu-material] * {\r
  overflow-x: clip !important;\r
}\r
html[data-pixel-ui] [role='dialog'] {\r
  /* dialog 默认 content-box 时，2px 边框同样会撑出内部横向滚动条 */\r
  box-sizing: border-box !important;\r
}\r
html[data-pixel-ui] [role='dialog'] nav,\r
html[data-pixel-ui] [role='dialog'] [role='tablist'] {\r
  overflow-x: hidden !important;\r
}\r
/* 设置页左侧导航是“列 flex + 按钮”的结构：按钮的 min-width:auto 会把\r
 * 像素字体的 min-content 宽度顶出去，navList 就会出现横向滚动条。 */\r
html[data-pixel-ui] [role='dialog'] button {\r
  min-width: 0;\r
}\r
/* 设置对话框的底色正好是 wood-mid；通用 hover 也是 wood-mid，等于没变。\r
 * 对话框内普通按钮改用 wood-warm，至少和面板底色差一档明度。 */\r
html[data-pixel-ui] [role='dialog'] button:not(:disabled):not([class*='primary']):not([class*='Primary']):not([class*='danger']):not([class*='Danger']):hover {\r
  background-color: var(--px-wood-warm) !important;\r
}\r
/* 设置页左导航是 div.navList（直接子级全是 button，其中一个是 aria-current），\r
 * overflow-y:auto 会把 overflow-x 也算成 auto；内容只要宽 1px 就冒横向滚动条。 */\r
html[data-pixel-ui] [role='dialog'] div:has(> button[aria-current]) {\r
  overflow-x: hidden !important;\r
}\r
html[data-pixel-ui] [role='menuitem']:hover,\r
html[data-pixel-ui] [role='option']:hover,\r
html[data-pixel-ui] [role='treeitem']:hover {\r
  background-color: var(--px-wood-mid) !important;\r
}\r
/* 菜单项即使不在 [role=menu] 外壳里（宿主 portal/自定义菜单）也要有\r
 * 可见的文字色变化 + 金色左条，不能只赌底色和菜单面不同。 */\r
html[data-pixel-ui] [role='menuitem']:hover {\r
  color: var(--px-gold-bright) !important;\r
  background-image:\r
    linear-gradient(var(--px-gold), var(--px-gold)),\r
    repeating-conic-gradient(\r
      color-mix(in srgb, var(--px-gold) 8%, transparent) 0 25%,\r
      transparent 0 50%\r
    ) !important;\r
  background-size: 3px 100%, 4px 4px !important;\r
  background-position: 0 0, 0 0 !important;\r
  background-repeat: no-repeat, repeat !important;\r
}\r
html[data-pixel-ui] [role='option']:hover {\r
  color: var(--px-gold-bright) !important;\r
}\r
/* 菜单项（设置/意见反馈/退出登录…）在宿主里是 button[role=menuitem]，\r
 * 菜单表面本身可能是 wood-mid 或宿主灰；只换底色仍然可能看不见。\r
 * 这里固定叠 3px 金色左条 + 2px dither，并把文字提到 gold-bright。 */\r
html[data-pixel-ui] [role='menu'] [role='menuitem']:hover,\r
html[data-pixel-ui] [data-menu-material] [role='menuitem']:hover,\r
html[data-pixel-ui] [role='menu'] button:hover,\r
html[data-pixel-ui] [data-menu-material] button:hover {\r
  background-color: var(--px-wood-mid) !important;\r
  color: var(--px-gold-bright) !important;\r
  background-image:\r
    linear-gradient(var(--px-gold), var(--px-gold)),\r
    repeating-conic-gradient(\r
      color-mix(in srgb, var(--px-gold) 8%, transparent) 0 25%,\r
      transparent 0 50%\r
    ) !important;\r
  background-size: 3px 100%, 4px 4px !important;\r
  background-position: 0 0, 0 0 !important;\r
  background-repeat: no-repeat, repeat !important;\r
}\r
html[data-pixel-ui] [role='menuitem'] {\r
  transition:\r
    background-color var(--px-t-fast) var(--px-step-2),\r
    color var(--px-t-fast) var(--px-step-2);\r
}\r
/* 危险菜单项（退出登录等）保留红色语义，不跟着菜单 hover 变金。 */\r
html[data-pixel-ui] button[role='menuitem'][class*='danger']:hover {\r
  color: var(--px-state-error, var(--dsw-alias-state-error-primary, #E74C3C)) !important;\r
  background-image: linear-gradient(\r
    var(--px-state-error, var(--dsw-alias-state-error-primary, #E74C3C)),\r
    var(--px-state-error, var(--dsw-alias-state-error-primary, #E74C3C))\r
  ) !important;\r
  background-size: 3px 100% !important;\r
  background-repeat: no-repeat !important;\r
}\r
html[data-pixel-ui] [role='treeitem'][aria-selected='true'] {\r
  background-color: var(--px-wood-dark) !important;\r
  background-image: linear-gradient(var(--px-gold), var(--px-gold));\r
  background-repeat: no-repeat;\r
  background-position: 0 0;\r
  background-size: 2px 100%;\r
  color: var(--px-gold-bright) !important;\r
}\r
/* 已选中的会话行也要有 hover 反馈：宿主把 selected 和 hover 写成同一个背景，\r
 * 我们的 selected 规则又在 hover 之后，不补这一条就会出现「悬停完全没反应」。 */\r
html[data-pixel-ui] [role='treeitem'][aria-selected='true']:hover {\r
  background-color: var(--px-wood-mid) !important;\r
}\r
/* 未选中的会话/项目行：hover 时补 2px 金色左侧条，别只靠一档底色。 */\r
html[data-pixel-ui] [role='treeitem']:hover:not([aria-selected='true']) {\r
  background-image: linear-gradient(var(--px-gold-deep), var(--px-gold-deep));\r
  background-repeat: no-repeat;\r
  background-position: 0 0;\r
  background-size: 2px 100%;\r
  color: var(--px-parchment) !important;\r
}\r
html[data-pixel-ui] [role='menuitem'][aria-current='page'] {\r
  background-color: var(--px-wood-dark) !important;\r
  background-image: linear-gradient(var(--px-gold), var(--px-gold));\r
  background-repeat: no-repeat;\r
  background-position: 0 0;\r
  background-size: 3px 100%;\r
  color: var(--px-gold-bright) !important;\r
}\r
/* 侧栏/列表的当前项：3px 金色左条，不占布局。 */\r
html[data-pixel-ui] [aria-current='page'] {\r
  background-color: var(--px-wood-mid) !important;\r
  color: var(--px-gold-bright) !important;\r
  background-image: linear-gradient(var(--px-gold), var(--px-gold));\r
  background-repeat: no-repeat;\r
  background-position: 0 0;\r
  background-size: 3px 100%;\r
}\r
html[data-pixel-ui] [aria-current='page']:hover {\r
  background-color: var(--px-wood-mid) !important;\r
  background-image:\r
    linear-gradient(var(--px-gold), var(--px-gold)),\r
    repeating-conic-gradient(\r
      color-mix(in srgb, var(--px-gold) 8%, transparent) 0 25%,\r
      transparent 0 50%\r
    ) !important;\r
  background-size: 3px 100%, 4px 4px !important;\r
  background-position: 0 0, 0 0 !important;\r
  background-repeat: no-repeat, repeat !important;\r
}\r
/* 吸顶分组标题：粘住时补 2px 底线，和滚动内容分开。 */\r
html[data-pixel-ui] [data-stuck] {\r
  border-bottom: 2px solid var(--px-wood-light) !important;\r
  background-image: repeating-conic-gradient(\r
    color-mix(in srgb, var(--px-gold) 5%, transparent) 0 25%,\r
    transparent 0 50%\r
  ) !important;\r
  background-size: 4px 4px !important;\r
}\r
/* 终端块 / diff 卡片：左侧运行条 + 代码块同款描边。 */\r
html[data-pixel-ui] [data-terminal] {\r
  border: 2px solid var(--px-wood-light) !important;\r
}\r
html[data-pixel-ui] [data-terminal][data-running] {\r
  border-left: 3px solid var(--px-gold) !important;\r
  animation: px-running 1.1s steps(2, end) infinite;\r
}\r
html[data-pixel-ui] [data-diff] {\r
  border-left: 4px solid var(--px-gold-deep) !important;\r
}\r
/* 标签：左侧 2px 色条代替圆角/渐变；色条落在原有 8px 内边距里，不改宽。 */\r
html[data-pixel-ui] [data-tone] {\r
  border-radius: 0 !important;\r
  background-image: linear-gradient(currentColor, currentColor);\r
  background-repeat: no-repeat;\r
  background-position: 0 center;\r
  background-size: 2px calc(100% - 4px);\r
}\r
\r
/* ── 反馈层：toast / dialog / 思考中 / 状态点 ───────────────────── */\r
html[data-pixel-ui] [role='alert'] {\r
  border: 2px solid var(--px-line) !important;\r
  border-left: 4px solid var(--px-gold) !important;\r
  background-color: var(--px-tooltip-bg) !important;\r
  color: var(--px-parchment) !important;\r
  animation: px-toast-in var(--px-t-slow) steps(3, end) both;\r
}\r
html[data-pixel-ui] [role='alert'][data-closing] {\r
  animation: px-toast-out 120ms steps(2, end) both;\r
}\r
html[data-pixel-ui] [role='dialog'] {\r
  border: 2px solid var(--px-line) !important;\r
  background-image:\r
    linear-gradient(var(--px-gold), var(--px-gold)),\r
    linear-gradient(var(--px-gold), var(--px-gold)),\r
    linear-gradient(var(--px-gold), var(--px-gold)),\r
    linear-gradient(var(--px-gold), var(--px-gold)) !important;\r
  background-size: 10px 2px, 2px 10px, 10px 2px, 2px 10px !important;\r
  background-position: 0 0, 0 0, 100% 100%, 100% 100% !important;\r
  background-repeat: no-repeat !important;\r
}\r
/* 思考中的行：保留宿主文字，但把 1.5s 的平滑扫光改成 4 帧阶梯，\r
 * 并在左侧补一条 2px 的闪烁光标（位置由宿主 decoration 承担，不加布局）。 */\r
html[data-pixel-ui] [data-shimmer] {\r
  position: relative;\r
}\r
html[data-pixel-ui] [data-shimmer] > [aria-hidden='true'] {\r
  background-image: linear-gradient(var(--px-gold), var(--px-gold));\r
  background-size: 2px 100%;\r
  background-position: 0 0;\r
  background-repeat: no-repeat;\r
  animation: px-blink 1.2s steps(1, end) infinite;\r
}\r
html[data-pixel-ui] [data-shimmer] > [aria-hidden='true'] * {\r
  color: var(--px-gold) !important;\r
  animation-duration: 1.2s !important;\r
  animation-timing-function: steps(4, end) !important;\r
}\r
html[data-pixel-ui] span[data-state='ongoing'] {\r
  animation: px-blink 1.1s steps(1, end) infinite;\r
}\r
html[data-pixel-ui] [data-state='ongoing'] * {\r
  animation-timing-function: steps(8, end) !important;\r
}\r
\r
/* ── 像素光标（SVG data-URI 阶梯箭头） ──────────────────────────── */\r
html[data-pixel-ui] body {\r
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Cpath d='M2 2v17h3v-3h3v-3h3v-3h3v-3h3V2z' fill='%23FFFDF5' stroke='%231A0F06' stroke-width='2'/%3E%3C/svg%3E") 2 2, auto;\r
}\r
/* 浅色纸面：白填充的箭头会和纸面糊在一起，换成深棕填充 + 纸白描边。 */\r
html[data-pixel-theme='pixel-paper'] body {\r
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Cpath d='M2 2v17h3v-3h3v-3h3v-3h3v-3h3V2z' fill='%233A2A10' stroke='%23FFFDF5' stroke-width='2'/%3E%3C/svg%3E") 2 2, auto;\r
}\r
html[data-pixel-ui] button,\r
html[data-pixel-ui] a,\r
html[data-pixel-ui] select,\r
html[data-pixel-ui] [role='tab'],\r
html[data-pixel-ui] [role='menuitem'],\r
html[data-pixel-ui] [role='switch'],\r
html[data-pixel-ui] [role='treeitem'],\r
html[data-pixel-ui] [role='option'],\r
html[data-pixel-ui] [role='button'],\r
html[data-pixel-ui] [role='link'],\r
html[data-pixel-ui] [aria-selected],\r
html[data-pixel-ui] [aria-current] {\r
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Cpath d='M2 2v17h3v-3h3v-3h3v-3h3v-3h3V2z' fill='%23F4D03F' stroke='%231A0F06' stroke-width='2'/%3E%3C/svg%3E") 2 2, pointer;\r
}\r
/* 宿主的 .sessionRow / .projectRow 只在行上写 cursor:pointer；子 span 若被\r
 * 宿主另写 cursor 会导致箭头/默认小手混用。让可交互行内的非文本子元素继承\r
 * 同一个像素手，输入框和 contenteditable 保持像素 I-beam。 */\r
html[data-pixel-ui] :is(button, a, select, [role='tab'], [role='menuitem'], [role='switch'], [role='treeitem'], [role='option'], [role='button'], [role='link']) *:not(input):not(textarea):not([contenteditable='true']) {\r
  cursor: inherit !important;\r
}\r
html[data-pixel-ui] input,\r
html[data-pixel-ui] textarea,\r
html[data-pixel-ui] [contenteditable='true'] {\r
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Cpath d='M5 3h4v2h2v2h2v2h2v2h2v2h2v6h-2v2h-4v2H5z' fill='%23FFFDF5' stroke='%231A0F06' stroke-width='2'/%3E%3C/svg%3E") 4 3, text;\r
}\r
\r
/* ── 设置页「像素主题」行 ─────────────────────────────────────────\r
 * 这一段**不跟随皮肤作用域**：像素主题激活时用 --px-* 值，\r
 * 现代默认（浅色/深色/跟随系统）回落到 --dsw-alias-* 宿主 token，\r
 * 保证行在任何外观下都清晰可点、对比度达标。\r
 * 触摸目标 ≥32px（WCAG 2.2 web 目标 24px 之上留手感余量）。 */\r
.px-theme-row {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 8px;\r
  padding: 12px 0;\r
  border-top: 2px solid var(--px-wood-pale, var(--dsw-alias-border-l2, #6b5a3a));\r
}\r
.px-theme-row-title {\r
  font-family: var(--px-font, inherit);\r
  font-size: 12px;\r
  font-variant-ligatures: none;\r
  color: var(--px-gold-bright, var(--dsw-alias-label-primary));\r
}\r
.px-theme-row-desc {\r
  font-size: 11px;\r
  line-height: 1.6;\r
  color: var(--px-text-light, var(--dsw-alias-label-secondary));\r
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
  min-height: 32px;\r
  padding: 6px 12px;\r
  font-family: var(--px-font, inherit);\r
  font-size: 11px;\r
  font-variant-ligatures: none;\r
  color: var(--px-text-on-dark, var(--dsw-alias-label-primary));\r
  background-color: var(--px-wood-dark, var(--dsw-alias-bg-layer-1));\r
  border: 2px solid var(--px-wood-darkest, var(--dsw-alias-border-l1));\r
  border-radius: 0 !important;\r
  cursor: pointer;\r
  transition:\r
    transform var(--px-t-fast, 80ms) steps(2, end),\r
    background-color var(--px-t-fast, 80ms) steps(2, end),\r
    background-image var(--px-t-fast, 80ms) steps(2, end);\r
}\r
.px-theme-btn:hover {\r
  background-color: var(--px-wood-mid, var(--dsw-alias-bg-layer-2));\r
  background-image: repeating-conic-gradient(\r
    color-mix(in srgb, var(--px-gold, #F4D03F) 7%, transparent) 0 25%,\r
    transparent 0 50%\r
  );\r
  background-size: 4px 4px;\r
}\r
.px-theme-btn:active {\r
  transform: translate(1px, 1px);\r
  transition-duration: 0s;\r
}\r
.px-theme-btn:focus-visible {\r
  outline: 2px solid var(--px-gold, var(--dsw-alias-state-business-primary, currentColor));\r
  outline-offset: 2px;\r
}\r
.px-theme-btn-active {\r
  color: var(--px-accent-ink, var(--dsw-alias-label-on-accent, #fff));\r
  background-color: var(--px-accent-bg, var(--dsw-alias-brand-primary));\r
  background-image: repeating-conic-gradient(\r
    color-mix(in srgb, var(--px-accent-ink, #1A0F06) 8%, transparent) 0 25%,\r
    transparent 0 50%\r
  );\r
  background-size: 4px 4px;\r
  border-color: var(--px-gold-deep, var(--dsw-alias-border-l2));\r
}\r
.px-theme-btn-active:hover {\r
  background-color: var(--px-accent-hover, var(--dsw-alias-button-primary-hover, var(--px-accent-bg)));\r
}\r
.px-theme-swatch {\r
  width: 10px;\r
  height: 10px;\r
  border: 2px solid #000;\r
  flex-shrink: 0;\r
}\r
\r
/* ── pixel-woodcut：真 PNG 9-slice 主题（Complete UI · Wood） ────────\r
 * 与上面四个「纯 CSS 平面」主题并列的第五套主题：对话框、菜单、主按钮、\r
 * 输入框、选中行、Toast、滚动条改用 CC BY 4.0 的木质 PNG 切片。\r
 * 素材经 /dsh-pixel-ui/assets/wood/* 路由提供；字号/布局仍由本皮肤控制。\r
 * 授权：assets/complete-ui/wood/ATTRIBUTION.md（Crusenho Agus Hennihuno）。\r
 */\r
html[data-pixel-theme='pixel-woodcut'] {\r
  --px-wood-darkest: #24110D;\r
  --px-wood-dark: #321A14;\r
  --px-wood-mid: #3E221A;\r
  --px-wood-warm: #5A3022;\r
  --px-wood-light: #8A5A3A;\r
  --px-wood-pale: #F0C9A8;\r
  --px-text-on-dark: #F8E6D2;\r
  --px-text-light: #E4B998;\r
  --px-parchment: #F8E6D2;\r
  --px-gold: #F2B07A;\r
  --px-gold-bright: #FFD28A;\r
  --px-gold-dark: #C27A50;\r
  --px-gold-deep: #8A4A2E;\r
  --px-sidebar-fill: #1E0D0A;\r
  --px-line: #1A0B08;\r
  --px-accent-bg: #F6C4AA;\r
  --px-accent-hover: #FFD7BB;\r
  --px-accent-ink: #3A1D14;\r
  --px-input-bg: #F0D8BE;\r
  --px-input-text: #3A1D14;\r
  --px-input-ph: #6B4030;\r
  --px-input-caret: #3A1D14;\r
  --px-tooltip-bg: #2A140F;\r
  --px-code-bg: #2A140F;\r
  --px-code-ink: #FFD28A;\r
  --px-code-meta: #C99470;\r
  --px-ink-on-mid: #F8E6D2;\r
  --pxw-ink: #3A1D14;\r
  --pxw-ink-2: #6B4030;\r
  --pxw-cream: #F8E5CF;\r
  --pxw-cream-2: #F0D8BE;\r
  --pxw-salmon: #F1A08C;\r
  --pxw-panel: url('/dsh-pixel-ui/assets/wood/panel.png');\r
  --pxw-button: url('/dsh-pixel-ui/assets/wood/button-primary.png');\r
  --pxw-button-press: url('/dsh-pixel-ui/assets/wood/button-primary-press.png');\r
  --pxw-button-lock: url('/dsh-pixel-ui/assets/wood/button-primary-lock.png');\r
  --pxw-input: url('/dsh-pixel-ui/assets/wood/input.png');\r
  --pxw-select: url('/dsh-pixel-ui/assets/wood/select-bar.png');\r
  --pxw-scroll: url('/dsh-pixel-ui/assets/wood/scroll-handle.png');\r
}\r
html[data-pixel-theme='pixel-woodcut'] body {\r
  background-color: var(--px-wood-darkest);\r
  background-image: repeating-conic-gradient(rgba(255, 200, 160, 0.035) 0 25%, transparent 0 50%);\r
  background-size: 4px 4px;\r
}\r
html[data-pixel-theme='pixel-woodcut'] [role='dialog'] {\r
  border: 24px solid transparent !important;\r
  border-image: var(--pxw-panel) 24 fill / 24px / 0 stretch !important;\r
  background: transparent !important;\r
  box-sizing: border-box !important;\r
  color: var(--pxw-ink) !important;\r
  --dsw-alias-label-primary: var(--pxw-ink);\r
  --dsw-alias-label-secondary: var(--pxw-ink-2);\r
  --dsw-alias-label-tertiary: #8A5A44;\r
  --dsw-alias-border-l1: #C99A74;\r
  --dsw-alias-border-l2: #8A4A2E;\r
  --dsw-alias-bg-layer-1: var(--pxw-cream-2);\r
  --dsw-alias-bg-layer-2: var(--pxw-cream);\r
  --dsw-alias-bg-layer-3: var(--pxw-cream-2);\r
  --dsw-alias-interactive-bg-hover: #EFCBB0;\r
}\r
html[data-pixel-theme='pixel-woodcut'] [role='dialog'] :where(h1, h2, h3, h4, p, span, div, label, strong, em, li) {\r
  color: var(--pxw-ink) !important;\r
}\r
html[data-pixel-theme='pixel-woodcut'] [role='dialog'] button[class*='danger'],\r
html[data-pixel-theme='pixel-woodcut'] [role='dialog'] button[class*='danger'] * {\r
  color: #B13A2E !important;\r
}\r
html[data-pixel-theme='pixel-woodcut'] [data-menu-material] {\r
  border: 10px solid transparent !important;\r
  border-image: var(--pxw-panel) 20 fill / 10px / 0 stretch !important;\r
  background: transparent !important;\r
  box-sizing: border-box !important;\r
  overflow-x: hidden !important;\r
  color: var(--pxw-ink) !important;\r
  --dsw-alias-label-primary: var(--pxw-ink);\r
  --dsw-alias-label-secondary: var(--pxw-ink-2);\r
  --dsw-alias-interactive-bg-hover: #EFCBB0;\r
}\r
html[data-pixel-theme='pixel-woodcut'] [role='menu']:not([data-menu-material]) {\r
  border: 0 !important;\r
  border-image: none !important;\r
  background: transparent !important;\r
}\r
html[data-pixel-theme='pixel-woodcut'] [role='menuitem'] {\r
  color: var(--pxw-ink) !important;\r
  background: transparent !important;\r
  background-image: none !important;\r
}\r
html[data-pixel-theme='pixel-woodcut'] [role='menuitem']:hover {\r
  color: var(--pxw-ink) !important;\r
  background-color: #EFCBB0 !important;\r
  background-image: none !important;\r
}\r
html[data-pixel-theme='pixel-woodcut'] button[class*='primary'],\r
html[data-pixel-theme='pixel-woodcut'] button[class*='Primary'] {\r
  border: 6px 10px solid transparent !important;\r
  border-image: var(--pxw-button) 8 20 fill / 6px 10px / 0 stretch !important;\r
  background: transparent !important;\r
  color: var(--pxw-ink) !important;\r
  min-height: 32px;\r
}\r
html[data-pixel-theme='pixel-woodcut'] button[class*='primary']:hover,\r
html[data-pixel-theme='pixel-woodcut'] button[class*='Primary']:hover {\r
  border-image-source: var(--pxw-button-press) !important;\r
  color: var(--pxw-ink) !important;\r
  background: transparent !important;\r
  background-image: none !important;\r
}\r
html[data-pixel-theme='pixel-woodcut'] button[class*='primary']:active,\r
html[data-pixel-theme='pixel-woodcut'] button[class*='Primary']:active {\r
  border-image-source: var(--pxw-button-lock) !important;\r
  transform: none !important;\r
}\r
html[data-pixel-theme='pixel-woodcut'] input:not([type='checkbox']):not([type='radio']):not([type='range']),\r
html[data-pixel-theme='pixel-woodcut'] textarea,\r
html[data-pixel-theme='pixel-woodcut'] [contenteditable='true'] {\r
  border: 8px solid transparent !important;\r
  border-image: var(--pxw-input) 10 fill / 8px / 0 stretch !important;\r
  background: transparent !important;\r
  color: var(--pxw-ink) !important;\r
  caret-color: var(--pxw-ink) !important;\r
  box-sizing: border-box !important;\r
}\r
html[data-pixel-theme='pixel-woodcut'] input::placeholder,\r
html[data-pixel-theme='pixel-woodcut'] textarea::placeholder {\r
  color: #8A5A44 !important;\r
}\r
html[data-pixel-theme='pixel-woodcut'] [role='menuitem'][aria-current='page'],\r
html[data-pixel-theme='pixel-woodcut'] [role='treeitem'][aria-selected='true'] {\r
  border: 8px solid transparent !important;\r
  border-image: var(--pxw-select) 10 fill / 8px / 0 stretch !important;\r
  background: transparent !important;\r
  background-image: none !important;\r
  color: var(--pxw-ink) !important;\r
  box-sizing: border-box !important;\r
}\r
html[data-pixel-theme='pixel-woodcut'] [role='alert'] {\r
  border: 10px solid transparent !important;\r
  border-image: var(--pxw-panel) 20 fill / 10px / 0 stretch !important;\r
  background: transparent !important;\r
  color: var(--pxw-ink) !important;\r
  animation: none !important;\r
}\r
html[data-pixel-theme='pixel-woodcut'] [role='tooltip'] {\r
  border: 8px solid transparent !important;\r
  border-image: var(--pxw-panel) 20 fill / 8px / 0 stretch !important;\r
  background: transparent !important;\r
  color: var(--pxw-ink) !important;\r
}\r
html[data-pixel-theme='pixel-woodcut'] [role='dialog'] button:not([class*='primary']):not([class*='Primary']):not([class*='danger']):not([class*='Danger']):hover,\r
html[data-pixel-theme='pixel-woodcut'] [data-menu-material] button:hover {\r
  background-color: #EFCBB0 !important;\r
  color: var(--pxw-ink) !important;\r
}\r
html[data-pixel-theme='pixel-woodcut'] ::-webkit-scrollbar-thumb {\r
  background: var(--pxw-scroll) center / 100% 100% no-repeat !important;\r
  border: 2px solid var(--px-wood-darkest) !important;\r
}\r
html[data-pixel-theme='pixel-woodcut'] ::-webkit-scrollbar-track {\r
  background: #3A221A !important;\r
  border-left: 2px solid var(--px-line);\r
}\r
html[data-pixel-theme='pixel-woodcut'] [role='tab']::after {\r
  background: var(--pxw-salmon, #F1A08C) !important;\r
}\r
`;

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
      "--dsw-specific-sidebar-fill": "#241408",
      "--dsw-alias-button-primary-fill": "#F4D03F",
      "--dsw-alias-button-primary-hover": "#FFE066",
      "--dsw-alias-label-primary-foreground": "#1A0F06"
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
      "--dsw-specific-sidebar-fill": "#E8DCC8",
      "--dsw-alias-button-primary-fill": "#7A5A00",
      "--dsw-alias-button-primary-hover": "#5C4400",
      "--dsw-alias-label-primary-foreground": "#FFFDF5"
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
      "--dsw-specific-sidebar-fill": "#2A1308",
      "--dsw-alias-button-primary-fill": "#FF8C42",
      "--dsw-alias-button-primary-hover": "#FFA64D",
      "--dsw-alias-label-primary-foreground": "#1E0E04"
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
      "--dsw-specific-sidebar-fill": "#0C100C",
      "--dsw-alias-button-primary-fill": "#33FF33",
      "--dsw-alias-button-primary-hover": "#66FF66",
      "--dsw-alias-label-primary-foreground": "#0A0E0A"
    }
  },
  {
    id: "pixel-woodcut",
    colorScheme: "dark",
    tokens: {
      "--dsw-alias-bg-base": "#24110D",
      "--dsw-alias-bg-layer-1": "#321A14",
      "--dsw-alias-bg-layer-2": "#3E221A",
      "--dsw-alias-bg-overlay": "#2A140F",
      "--dsw-alias-border-l1": "#6A3A2A",
      "--dsw-alias-border-l2": "#C98A68",
      "--dsw-alias-brand-primary": "#F2B07A",
      "--dsw-alias-label-primary": "#F8E6D2",
      "--dsw-alias-label-secondary": "#D3A585",
      "--dsw-alias-state-error-primary": "#E86A5A",
      "--dsw-alias-state-success-primary": "#9AD6A0",
      "--dsw-alias-state-warn-primary": "#F2C46D",
      "--dsw-alias-state-idle-primary": "#8A5A48",
      "--dsw-specific-sidebar-fill": "#1E0D0A",
      "--dsw-alias-button-primary-fill": "#F8E4CE",
      "--dsw-alias-button-primary-hover": "#FFD3B8",
      "--dsw-alias-label-primary-foreground": "#3A1D14"
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
    "theme.pixel-woodcut": "像素·木刻",
    "theme.system": "现代默认"
  },
  en: {
    "row.title": "Pixel theme",
    "row.desc": "Applies instantly and persists across restarts; “Modern default” returns to the host appearance",
    "theme.pixel-wood": "Pixel · Wood",
    "theme.pixel-paper": "Pixel · Paper",
    "theme.pixel-warm": "Pixel · Warm",
    "theme.pixel-retro": "Pixel · Terminal Green",
    "theme.pixel-woodcut": "Pixel · Woodcut",
    "theme.system": "Modern default"
  }
};
var THEME_CHOICES = [
  { id: "pixel-wood", swatch: "#F4D03F" },
  { id: "pixel-paper", swatch: "#FFFDF5" },
  { id: "pixel-warm", swatch: "#FF8C42" },
  { id: "pixel-retro", swatch: "#33FF33" },
  { id: "pixel-woodcut", swatch: "#F8E4CE" },
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

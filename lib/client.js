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
var pixel_default = `/* dsh-pixel-ui — 星露谷风像素皮肤（木屋/羊皮纸/暖阳/终端绿/全息/南瓜灯/便签本）\r
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
 * 作用域 html[data-pixel-ui]：任一像素主题激活时生效，data-pixel-theme 区分配色；\r
 * data-pixel-asset 只在三套真素材主题（全息/南瓜灯/便签本）出现，驱动共用\r
 * 9-slice 层。前四套仍是零素材、零阴影的纯平面皮肤。\r
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
  /* 勾/点：暗色主题用深木色；纸面/便签本用预置的纸白版本（--px-*-light） */\r
  --px-check: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' shape-rendering='crispEdges'%3E%3Cg fill='%231A0F06'%3E%3Crect x='0' y='4' width='2' height='2'/%3E%3Crect x='0' y='6' width='2' height='2'/%3E%3Crect x='2' y='6' width='2' height='2'/%3E%3Crect x='2' y='8' width='2' height='2'/%3E%3Crect x='4' y='4' width='2' height='2'/%3E%3Crect x='4' y='6' width='2' height='2'/%3E%3Crect x='4' y='8' width='2' height='2'/%3E%3Crect x='4' y='10' width='2' height='2'/%3E%3Crect x='6' y='2' width='2' height='2'/%3E%3Crect x='6' y='4' width='2' height='2'/%3E%3Crect x='6' y='6' width='2' height='2'/%3E%3Crect x='6' y='8' width='2' height='2'/%3E%3Crect x='8' y='0' width='2' height='2'/%3E%3Crect x='8' y='2' width='2' height='2'/%3E%3Crect x='8' y='4' width='2' height='2'/%3E%3Crect x='8' y='6' width='2' height='2'/%3E%3Crect x='10' y='0' width='2' height='2'/%3E%3Crect x='10' y='2' width='2' height='2'/%3E%3Crect x='10' y='4' width='2' height='2'/%3E%3C/g%3E%3C/svg%3E");\r
  --px-radio: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='8' height='8' fill='%231A0F06'/%3E%3C/svg%3E");\r
  --px-check-light: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' shape-rendering='crispEdges'%3E%3Cg fill='%23FFFDF5'%3E%3Crect x='0' y='4' width='2' height='2'/%3E%3Crect x='0' y='6' width='2' height='2'/%3E%3Crect x='2' y='6' width='2' height='2'/%3E%3Crect x='2' y='8' width='2' height='2'/%3E%3Crect x='4' y='4' width='2' height='2'/%3E%3Crect x='4' y='6' width='2' height='2'/%3E%3Crect x='4' y='8' width='2' height='2'/%3E%3Crect x='4' y='10' width='2' height='2'/%3E%3Crect x='6' y='2' width='2' height='2'/%3E%3Crect x='6' y='4' width='2' height='2'/%3E%3Crect x='6' y='6' width='2' height='2'/%3E%3Crect x='6' y='8' width='2' height='2'/%3E%3Crect x='8' y='0' width='2' height='2'/%3E%3Crect x='8' y='2' width='2' height='2'/%3E%3Crect x='8' y='4' width='2' height='2'/%3E%3Crect x='8' y='6' width='2' height='2'/%3E%3Crect x='10' y='0' width='2' height='2'/%3E%3Crect x='10' y='2' width='2' height='2'/%3E%3Crect x='10' y='4' width='2' height='2'/%3E%3C/g%3E%3C/svg%3E");\r
  --px-radio-light: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='8' height='8' fill='%23FFFDF5'/%3E%3C/svg%3E");\r
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
  --px-check: var(--px-check-light);\r
  --px-radio: var(--px-radio-light);\r
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
/* ── 真 PNG 9-slice 素材层：全息 / 南瓜灯 / 便签本 ───────────────────\r
 * 三套素材主题共用下面这一层规则，差异全部收敛到 --pxa-* 变量\r
 * （图片、切片、边框宽度、重复方式、文字色）。素材在构建时由\r
 * scripts/asset-inline.mjs 转成 data URI：浏览器端不再依赖宿主素材路由，\r
 * 换素材只需要重新 build + 刷新页面，不必重启 DSH Desktop。\r
 * 素材：Complete UI Essential Pack v2.4 © Crusenho Agus Hennihuno，\r
 * CC BY 4.0；每套的源文件映射与署名见 assets/complete-ui/<theme>/ATTRIBUTION.md。\r
 *\r
 * v1.7 留下的两条硬规则：\r
 *   ① Tooltip / Toast 不套大面板图，只换成 2px 主题色边（木刻版翻车点）；\r
 *   ② 横条主按钮和方形图标按钮用不同素材，绝不把 96×32 塞进方块。\r
 */\r
\r
/* 全息：深蓝 + 青。96×96 面板、96×32 主按钮、32×32 图标框。 */\r
html[data-pixel-theme='pixel-hologram'] {\r
  --px-wood-darkest: #071426;\r
  --px-wood-dark: #10233B;\r
  --px-wood-mid: #1A2E4A;\r
  --px-wood-warm: #244A6A;\r
  --px-wood-light: #3E8FB0;\r
  --px-wood-pale: #9BC4D4;\r
  --px-text-on-dark: #E8F7FF;\r
  --px-text-light: #9BC4D4;\r
  --px-parchment: #E8F7FF;\r
  --px-gold: #14DCEE;\r
  --px-gold-bright: #7DF3FF;\r
  --px-gold-dark: #0FA8B8;\r
  --px-gold-deep: #0B6F7A;\r
  --px-sidebar-fill: #081624;\r
  --px-line: #1B5A6A;\r
  --px-accent-bg: #2C416D;\r
  --px-accent-hover: #385586;\r
  --px-accent-ink: #E8F7FF;\r
  --px-input-bg: #1A2E4A;\r
  --px-input-text: #E8F7FF;\r
  --px-input-ph: #8FB6C9;\r
  --px-input-caret: #14DCEE;\r
  --px-tooltip-bg: #0A1A2E;\r
  --px-code-bg: #071426;\r
  --px-code-ink: #7DF3FF;\r
  --px-code-meta: #9BC4D4;\r
  --px-ink-on-mid: #E8F7FF;\r
  --px-topbar-fill: #10233B;\r
  --px-dither: #0C1E33;\r
  --pxa-panel: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAABARJREFUeJztnUtugzAQhocIVekiioQ4ArfobbroojlPu8git+ktOAJCqrJIVUWhi9bEARv8GBii/p9UNbUpM5nBeLDHOCEDeVk3pvIhqiJL8rJuur+HjvGV4apD97Opfi6qIkuG6nuVeVk3249y8KSfT8XoiX1xkTuVLqGyXRjTLzUpst4fjpfzqXfwKn2ky/lEW9pt6O9K5lBSyX14fzua5NlYpY9E9LyhyKvaJNtV/pCdiGjUVm2hbgSXE3+/7jafT8Xol3Mh1gDfr7tNjHyTbB/5Y+XKViYnJET9K9DnxAPfyxluA0jXm8ptTkhtzd8F/X+GlB2t8xV8h6z3h6O6XepOWEkq9d94eH87bj/KmygTDpiZrhPaKOg3orjS/XusXKJuyfWmclWm345aB+j3aJ/ORapuyfWmcuux1rN7MqSo1Dmn0ImbWfqApRpiCQ6+6054qY71QdwBSzbiVLrpowjRUdCSDTgnLvZbpY/09fLcPhHnnFHQf2fMfpNHQSAMOECQqsgSOECQvKwbOEAYOECYqDAUEdEV1zBUpyqyBGEoEyFhaNsHfD4VbNOLwJ02CqqKLIET5gdRkDB4DlgAK+4MN+DOzWCcQoVKGA31R7eNLQzV54OJiFbdZFVl0Mv51PsxlYMrY3ZSn1VmBBGehMVBHyAMWoAwvT4AzEvavQW5RkHogHkIjoIAD70WAMIIGY4m6ixRAuEEZ0WgE5YFYagwKyL7KkUwPSnR7yrF9f5wpJHBJFM5IqI4MCcsDKIgRlyGo4moTdAlQifMistwtJ4dTQQHiAMHCAMHCIPURGEQhgqCvCBhjGkpIBzX54CbMiIk53Lh8hzQBcm5wrS3oKrIEirrZku7zXp/OPq8BQQdcxg3CzS6IAqanrysGyRmCYMwVBiEocwM5VWZFulhUp4Z3zDUmheEzLjpycu6sbYAZMZND8aChEEYKgw64QWA5FwmQpNz0QKYcFnMaHpXhPVBDFOS82C9BWEwbh5wCxIGzwEz0319fesApKjPh75SPiWC8TnxGQ0l0tYHwPg8XM4nrzViwZlxiIZ4QGacMIiChIEDhIEDhMGkPBPRryrA+oA4Ql9VgChIGNE+YGyXunuREQOLA6S+pLRxOeRP3gKkjTTEEnRbdBgqaaC5ZLPtprrU3VJj5Mec2zsMjYmClrpb6pS6DR2DfcTuCDhAGDhAALWZZ1VkSUJ0nZL8fbU6P18vz1GrL6fSS4Lu62ranCB9XpizE9a3bg3FNmVqkzvlcltdD1976Fe+KrMuU+VQ1iQwiD+9XOatORw+hKseXWy26BlGtQQOWIz/h6tenDJj9Ohi08uo6NTZckqRvKwbtbGxKtfL9OO45drKptLBdlH8AItA04fuFeYIAAAAAElFTkSuQmCC");\r
  --pxa-panel-slice: 24 fill;\r
  --pxa-panel-width: 24px;\r
  --pxa-panel-repeat: stretch;\r
  --pxa-menu: var(--pxa-panel);\r
  --pxa-menu-slice: 20 fill;\r
  --pxa-menu-width: 10px;\r
  --pxa-button: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAAAAXNSR0IArs4c6QAAANhJREFUaIHt2LENgzAQheGHlQkiCgbIasyBPIdXYwAXESuQJkY2MkqDzlL8fxUCitM72zpZAgAAAMwNVx/GddstC+lVtQHjuu3TvFjX0p0YvB7nl3n4MXhN86IYvHlx/+acY8q42AG18HG/fGEfDSB8ezF4OYnwreVHkSP8tlx6IPw2jgYQfhvFDoA99/sX3C0/bWhAA8UU1LCOLp2HHRpgKA8/Bq/36zkwBRmphS8xBZm4Cl9SeRuamsAN6D1SjlfhS9LA3b+NWvjStwEtCupNLXwAAIB+fQDKgHLEoJpwFQAAAABJRU5ErkJggg==");\r
  --pxa-button-hover: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAAAAXNSR0IArs4c6QAAAKtJREFUaIHt2TEOwyAQRNEB5YQ+gg+2R8gV141JEMJKk2UL/qssews0IyiwBAAAACxXnj4c7r5yIbuaFnC4+7l6JRsySa/xJeHHse65ZVz7AcKPdeobfPM5ggh/PdO9Awg/TyX8XPX3CCJRQDIKSEYBySggGQUko4AkJuldSqGABC18qdsB9jiOf+rDl4YjyEQRkcbwpe46muuIWLPwJanw52uNWfgAAAD7ugDNuSljuyndMAAAAABJRU5ErkJggg==");\r
  --pxa-button-active: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAAAAXNSR0IArs4c6QAAAL1JREFUaIHt2bENwyAUhOEDZYLIhQfwap7DYg5W8wAUkVdwisgOQkSp4BX8X2XZFOhOUDxLAAAAQHfu14dpP86eGxlVtYBpP8553XrvZTgpBj3Kl4TfTorhfr4y9vkCwm9rXjeV+d5XEOH3l2L4nADCt+MJ35b/vwQtUYAxCjBGAcYowBgFGKMAIykGvZanowADV/hSdgLyQRHaycOXiisoxUARDZXhS/qOoxlHtFULX5Icf776qIUPAAAwrje7uT3lHa4XNQAAAABJRU5ErkJggg==");\r
  --pxa-button-slice: 8 20 fill;\r
  --pxa-button-width: 6px 10px;\r
  --pxa-button-ink: #E8F7FF;\r
  --pxa-button-hover-ink: #E8F7FF;\r
  --pxa-icon: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAMNJREFUWIXtl00KwkAMhd88quBCBOkRegtvpOfRG3mLHkEK4kKwJXU1/lRMC9pJF8lyXpL3QSBMAgDkZdXCIE7FOoRovjqWSc3PmwIAEPKyaqP5/LC/pDC/bXfLCMH4mMq860UtEQBIPeVnffIAgtmoevZBRILkWyGzhdpkiE7UEBGIiA7wTGoexdJc1eZDdPmmq+gJwgEcwBzA94D5CBzAAcwBfA+Yj6D/U4p6ZL0nujP7tz4dgHgupYhXL/vjFLA9z+878Ykw7yfaGgAAAABJRU5ErkJggg==");\r
  --pxa-icon-slice: 8 fill;\r
  --pxa-icon-width: 5px;\r
  --pxa-input: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFhJREFUWIXtziEZgDAUAOEbHxg0Yt3QmJUgBIEogSQBYoICUGB6z9wVuB+CSwDLXT+AvO1d59d5pKHrsZEAAQIECBAgQIAAAQIECAgHjABzWQF4nykUE9IPGr4I7mcYsWgAAAAASUVORK5CYII=");\r
  --pxa-input-slice: 10 fill;\r
  --pxa-input-width: 8px;\r
  --pxa-input-ink: #E8F7FF;\r
  --pxa-placeholder: #9BC4D4;\r
  --pxa-caret: #14DCEE;\r
  --pxa-select: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAE9JREFUWIXt1KERACEMRNENcxUwCAqgNeq4RimBoQVQKHxi/lNx+1UkAAhm9yhjbc/h2bJJ0nfHa/8996Wx9mzZku/qiwACCCAg/BUDAMIdSUQP3t7ChOIAAAAASUVORK5CYII=");\r
  --pxa-select-slice: 10 fill;\r
  --pxa-select-width: 8px;\r
  --pxa-ink: #E8F7FF;\r
  --pxa-accent: #14DCEE;\r
  --pxa-accent-bright: #7DF3FF;\r
  --pxa-hover-wash: rgba(20, 220, 238, 0.1);\r
  --pxa-tooltip-bg: #0A1A2E;\r
  --pxa-tooltip-ink: #E8F7FF;\r
}\r
html[data-pixel-theme='pixel-hologram'] body {\r
  background-color: var(--px-wood-darkest);\r
  background-image:\r
    linear-gradient(rgba(20, 220, 238, 0.045) 1px, transparent 1px),\r
    linear-gradient(90deg, rgba(20, 220, 238, 0.045) 1px, transparent 1px);\r
  background-size: 24px 24px;\r
}\r
html[data-pixel-theme='pixel-hologram'] ::-webkit-scrollbar-thumb {\r
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAFlJREFUWIXt0rENgDAMBdGDERAjsP9EjBCxAvQ0KPbvuFdGSs5SDJKkv1s6l/fzut9n49im3lyT8YrSAKl4aYBkHCZ34Cs++//Q2IFEPDZANR4ZoBOXJAngAWGqFA9rfCGtAAAAAElFTkSuQmCC") center / 100% 100% no-repeat !important;\r
  border: 2px solid var(--px-wood-darkest) !important;\r
}\r
html[data-pixel-theme='pixel-hologram'] ::-webkit-scrollbar-track {\r
  background: var(--px-wood-dark);\r
  border-left: 2px solid var(--px-line);\r
}\r
\r
/* 南瓜灯：暖橙藤蔓包边。frame_full 30px 只给对话框；菜单用 frame_simple，\r
 * 避免小块浮层被厚藤蔓包成“门板”。 */\r
html[data-pixel-theme='pixel-pumpkin'] {\r
  --px-wood-darkest: #170D06;\r
  --px-wood-dark: #241409;\r
  --px-wood-mid: #2F1B0C;\r
  --px-wood-warm: #3A2210;\r
  --px-wood-light: #8A4A18;\r
  --px-wood-pale: #D89A5A;\r
  --px-text-on-dark: #FFE9C9;\r
  --px-text-light: #D8A76F;\r
  --px-parchment: #FFE9C9;\r
  --px-gold: #FF9E2C;\r
  --px-gold-bright: #FFC85E;\r
  --px-gold-dark: #D97706;\r
  --px-gold-deep: #8A4A18;\r
  --px-sidebar-fill: #1B0F07;\r
  --px-line: #0E0703;\r
  --px-accent-bg: #FF9E2C;\r
  --px-accent-hover: #FFB45C;\r
  --px-accent-ink: #2A1206;\r
  --px-input-bg: #3A2210;\r
  --px-input-text: #FFF6E6;\r
  --px-input-ph: #F2C795;\r
  --px-input-caret: #FFC85E;\r
  --px-tooltip-bg: #1C0F07;\r
  --px-code-bg: #120A05;\r
  --px-code-ink: #FFC85E;\r
  --px-code-meta: #D8A76F;\r
  --px-ink-on-mid: #FFE9C9;\r
  --px-topbar-fill: #241409;\r
  --px-dither: #20120A;\r
  --pxa-panel: url("data:image/png;base64,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");\r
  --pxa-panel-slice: 30 fill;\r
  --pxa-panel-width: 30px;\r
  --pxa-panel-repeat: round;\r
  --pxa-menu: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAuFJREFUWIXFl79LG2EYxz93Go4EL3j+INqKFdriVMRJRAu6lNJi6NKpi4vUf0Chm10Vd8HFpS3tKLRbm4B1SJcgWYQOlaCYGJvTi01NSr0O+sZE7707k0C/S+7u836f5z3yPO/7Hlzo5asB+/3bxzYSufFGvKq4SB+pfElty2K48ka8iriwv47ZT97s099+xsrT2+dwfNMXb8SrigFsmfS3n5E+Upn9uAdb5vlzD96IF0AVAwrJECt9ofNZ9oUoJEOXA2UcqNt7wdXCWqnmP1nKddXcu/FGvIKr8ZROIRlirvuQD0Z/7YBkCMGd5MaqvW6xW97t7bweDQwufDYs8laOR8UQ5UygkmDDymAfdzIQKVeei9+dA42dA82RVXtlsaOJmOJaqfMzebKmScQweBjuufaWG1YGQMqEd3G1A1kXVNqILZPZ3SLpI7VSLAwZNZO4qqxpAkiZSC6LrYxvKkp1perDRWZ3i5VK1YeLNZO4qn3LAqA3HL7GqpO7xW4trJXQhy+NS7ku6CtW7qsrWSSUTURITMhPbF9dUK+a1gVZ05S+vZNOSiUU2+an+rc5XXCT5NXqDYc9u8B1L1hc7SBiGI5FdpPkDe0F9UzianJfe4EoFK/1/CbyE7vSBU6HhmZ1gVtsNZqIKfGUzqcXvaSPVOa6D2HIQJ/W6u6Cfcsia5psWBncYkcTMUUFmFouOxbK1HK57rcX8op9oyKUFeJVVlcRCsmKMGIYjt0gkjkxP7FbRgODC7fObOa6Dyneucv9H0W03j+UMwHKmQDxlE66dIL17Ddjz+9hfTtf5XRNQ9c0IoZxjQG0BYPYx514xfa1FAN87zkjb+XQtgO0BYO0BYP8Oj2lLRh0ZFnTbN5SLFtO52fyAFLWtAOJ26ECkDIvr+8DiZRPa54HDi/+34/lrfGUzgTOEsuljDfiFVwBWB+ZtCceFBwTRBMxxY0D1Out6YL1kclrn8/RRMwXb8T7D0nQvI83eiFSAAAAAElFTkSuQmCC");\r
  --pxa-menu-slice: 12 fill;\r
  --pxa-menu-width: 12px;\r
  --pxa-button: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAABzElEQVR4nO2aMUvDQBTH3x2dhApOjk5ZBBFBcNCABedO4ifwQ4jOil/AzU8gTpkFheogCFIcMzk6FSx0PXmX3nlpLrGB9h6c7zeU5Hrvtfz/JLncewIc1PO+Ag/i4EXMjn2f7qruzgRge60YSFJfKEA+KOWIPc6lkmOKO9ceqK8zZZIxSyZJQaxfa+0lfrD4gckHheZ4BdTddpgwdGYH7s7zQD/9Pzm5SkrnQt1sKvOQcMX/hEnwPxczG7BSNWE4Ajl+//3CwOIvHp+mqL1cvX2rLJ+YMKD2ehXE0CF5FUQHas9XADGy9hWbWT5JWrwJM3SwAcSwAcSwAcSwAcSwAcSwAcRIroIRkg/4CqBG4p500941sxi8mg5HIHTl/vLIVve5IrZcbDEmSWF88VB0RXBRnq4zgldBxBQ1YeS4b29DFXw7pm17iEyO2ONcmvS8z/ShsN1bxgRfEs+DWhfy593KdnPEHudSl2MqPtaEtQF4Yk1ggmCaITpPH1043BrrgToTfJ0TbQ0zOWKPc/lLT9Rer4KyvZ5CE5hwoPj910dhW1KaTMDJs7Q1zOSIPc6lSU8Uv9SaiAMZ9Lx9omayS93cOkyO2OPAYR49fwDBAQQZqKqgBwAAAABJRU5ErkJggg==");\r
  --pxa-button-hover: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAABlklEQVR4nO3aMUvDQBQH8JdDHIQKTo5OWVxEEDpoBsG1Hf0EfgMX0VlxcXTzEzi2q6AQHQqCFMdMjk4FCx1cTi7xzksuFyo0eZD+f0NJ0ruX8h5Jk7wQAQDAsgrsFfm8L0sHHbzkxilfJ3uyszsj2tnINoRR+R6SOBej7fNsToxf9lizID/PpA4GNQsjCjav09wL9YHkNyyJs5yrI8B32oFmrBQ33J8nDe16OR1fhbn1QN5uS/0nYSf/g2aN/7g226I1twjjCYnp298XGpK/eGU5VbkX63evzuUTNEPlPr0KAj4CV0F8VO5xBDAT3ltsqF8YZXfCwAcFYIYCMEMBmKEAzFAAZigAM4EuGKMkxhHATahn0lXPrmExSnM6nlCQdu4vj0x3Hx2xeplmTBjR9OLBbUkWW2ZQL/H03ql5F+Cjcp92wwbdQ9kbdM1pyFH2xPS/7xDpGG2fZ6vI57A/ov7oMTDtSFOEoiSm4emqs7l38+1/W6wiRtvn2XwxdPLVcq4frIrgjCYyg+cZ66NjtH0eWebJ5w82gMizrPsdPgAAAABJRU5ErkJggg==");\r
  --pxa-button-active: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAABpUlEQVR4nO2aMUvFMBDHr0EQhCc4OTp1EUQEwUELPnB2dHbwQ4jOil/AzcHZ8c2CQnUQBHk4dnJ0emDhgVMkralpkxSF1x7E/28obXp3Lf8jaZoLEQAAsBGZF/JhWzqNdh5rdoqPo0052JgSrS+VDXHifkKW1mKE7mdixfjGtK1O5Pux1MFAx8QJRcsXhfZCHSB+z2RpqbnqAb5hB/TDXLPh5iTr6dH/k4PzuHYdyctVqT8SpvhvNO395UJmhRbsJIwnJPKXnxsaiD97XJoq7cXi1bM1fQL9oLQvZkGAD4FZEB9Ke/QAZoT3Fxt0T5yUf8KADySAGSSAGSSAGSSAGSSAGSSAGYEqGCNZih7AjVBr0m1r12A2ODUdTygqKvdne1V1HxWxbqmKMXFC+emtXZJslsxAt2AWxEw02hrK3bWczGHIwrVi+tc9RDpG6H4mLXqq4ef+dVBuzKoloUmWUn79aTUPDuf9u8VaYoTuZ+KLocXff7qLqnqwToILZdzEZ+tDxwjdz6RNTyW+Oq8+wqphREPnJi1tbOKz9aFjhO5HBr/R8wuC++L290wmRwAAAABJRU5ErkJggg==");\r
  --pxa-button-slice: 6 8 12 8 fill;\r
  --pxa-button-width: 6px 8px 10px 8px;\r
  --pxa-button-ink: #FFF6E6;\r
  --pxa-button-hover-ink: #FFF6E6;\r
  --pxa-icon: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABe0lEQVR4nO2XP0oEMRTGv4StFkawsrRKI8giCBY6oBfYSjyBVxDEAyxewM4TiNVeQGG0EAQZLKeytBrYhW0jLzHZmZjJajGJxf6afZOX5Hu8zZ8Xhgby6VDCgR09M/qdne/LbG8BjDa1Q+TwUhXhcQ2fsq3456U0g3tH5GBb10qbRxcnqkJrAmC+tMdk4DbcXVW9Cp5NROubo6yjif/QKGsM5m9DZKNl2wcWvQawjaG1SZtv3L6yWOKuBmmrXZASnnIXkHb6DKDrSI2ByPVJmBK+DgDrvyAxPH0AVcRCxKUq/kMGymU9EJ2yBqc72RzHF5NGYdATVkPkqh5gSYrSRmXMkRgmb3Z0PXA6to+KFua2/GuGQuPIdz/VAczMy8UE4fLdUb1sfnt1k6hZ3IE51RqgAOjDBhEJtfgB8Mf3rNXg69jlWyUQmpMgbbULpgcn8nh3jpiQ+PjlQe8CMkwmfB27fKsEQnOSJtn2TUBQJtzOpqPPFyI0zvjI/gJjIqCQvIbvSgAAAABJRU5ErkJggg==");\r
  --pxa-icon-slice: 4 4 10 4 fill;\r
  --pxa-icon-width: 4px 4px 6px 4px;\r
  --pxa-input: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA5UlEQVR4nGNkQAL/X1b8Z6ADYBTvYISzGWCWH7Gmi+Vwi22Ogu1mBFs+VYuuloOBviDYEYwDYjmSI1jQxVatfAOmJz75RXX7jhZLYYgx0ctyELDufYbfAQMBmBizrzFuXiROf5tD/MCJkAnEdtD9TH8H3D4Mppg+pZj85zX8Rn8HXHwPLnuYGAYYMI06gGE0CgYYMI06gGE0CgYYMI06gG/OmdH2wP/R9gAMhIWLgOl8GTYGWgBszXIWdAGYI8IY6JgLPp/nYhgIAO6awTigxik9LQd5HOwIZMFN5o50cYTfyf1wewE2tktlQ86FQgAAAABJRU5ErkJggg==");\r
  --pxa-input-slice: 6 fill;\r
  --pxa-input-width: 6px;\r
  --pxa-input-ink: #FFF6E6;\r
  --pxa-placeholder: #F2C795;\r
  --pxa-caret: #FFC85E;\r
  --pxa-select: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAU9JREFUWIXtlzFKA0EYhb9/DRZCAlsFD2AjyCIELLJCvEAqj5AuB9AmVRo9gN1WHkEPoGC2EBYkCGk8gVUgASthLLKzyc5O2Gp3LeY1M/zvzf8/2Fl4I+xAfd8qvZfunZi1XWjedtams/UGyDZq1s83OLncrF9vtr5bXqNMZ/ASxpIZUA+nRfeBv1nnS3tjzWuU6Uw+8JEwFrEOrwuBj9fY8BQtszC6+QXg+PCgkoHTae7u4sl4Ic+P3VqGA0wm6Re/HiJhLB7A4Gxd2cC9SP8KbzXqqfb5T/0G5kvUrK8av4TOgDPgDDgDzoAz4Ax4nSjJElGt+C+JSMxEVGsoDfxiKo7uC6VK0fglFABbMF1/HAGwL7BqXqNMZ+NlvJAWQCdKZDXq5Z5or59tAAZ7nGteo0xn8p0o2T5ONZ4urjITw/cXMWu70LztrE1n6w3wBwNidr7sF3ekAAAAAElFTkSuQmCC");\r
  --pxa-select-slice: 6 fill;\r
  --pxa-select-width: 6px;\r
  --pxa-ink: #FFE9C9;\r
  --pxa-accent: #FF9E2C;\r
  --pxa-accent-bright: #FFC85E;\r
  --pxa-hover-wash: rgba(255, 158, 44, 0.12);\r
  --pxa-tooltip-bg: #1C0F07;\r
  --pxa-tooltip-ink: #FFE9C9;\r
}\r
html[data-pixel-theme='pixel-pumpkin'] body {\r
  background-color: var(--px-wood-darkest);\r
  background-image: repeating-conic-gradient(rgba(255, 158, 44, 0.045) 0 25%, transparent 0 50%);\r
  background-size: 4px 4px;\r
}\r
\r
/* 便签本：撕角活页纸 + 铅笔光标。panel 的左边 18px 是活页孔，\r
 * 用 repeat round 让孔按比例排布，而不是被拉成长椭圆。 */\r
html[data-pixel-theme='pixel-papernote'] {\r
  --px-wood-darkest: #F2E6D2;\r
  --px-wood-dark: #F6ECD9;\r
  --px-wood-mid: #EFE3CE;\r
  --px-wood-warm: #E6D7BC;\r
  --px-wood-light: #C9AF8A;\r
  --px-wood-pale: #A8895F;\r
  --px-text-on-dark: #3A2412;\r
  --px-text-light: #6E4E2E;\r
  --px-parchment: #FFFAF2;\r
  --px-gold: #6E3A10;\r
  --px-gold-bright: #8C4A16;\r
  --px-gold-dark: #5A2E0C;\r
  --px-gold-deep: #4A2408;\r
  --px-sidebar-fill: #F6ECD9;\r
  --px-line: #8C5A2C;\r
  --px-accent-bg: #A3551B;\r
  --px-accent-hover: #8C4713;\r
  --px-accent-ink: #FFF9F1;\r
  --px-input-bg: #FFF9F1;\r
  --px-input-text: #3A2412;\r
  --px-input-ph: #7A5A38;\r
  --px-input-caret: #8C4A16;\r
  --px-tooltip-bg: #2E1C0C;\r
  --px-code-bg: #F0E2CC;\r
  --px-code-ink: #6E3A10;\r
  --px-code-meta: #7A5A38;\r
  --px-ink-on-mid: #3A2412;\r
  --px-topbar-fill: #F6ECD9;\r
  --px-dither: #E9DAC0;\r
  --px-check: var(--px-check-light);\r
  --px-radio: var(--px-radio-light);\r
  --pxa-panel: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAABCVJREFUeJztnT2S8jAMhgVDT0XHQej3BtRwOrbmBvQcJB3VniBbEIMsSw6ByM5m32fmm4+JZcc/a8eWJXtx2FBLDnzfaBF+y3d832jh9d6a8DITxeWWYYEVEdHpeh4/N7t9Gyo6SX+3T5/NAVZmIlGvXZiMolfQ9kt/QXOJZZrL838Zt7nQcbe/Z0KmF+JZ6WpyXMaSCzJa2jKdV98jy9vzbrXMLEw2QtwALNJxu378PjU/aYa0SswVPBd3jDBN5hV5Kx7R+3nkcUW6shHUHiCFDhtq1UboY0gFzAWrzKxn8fpdEKUfSaL0I/pWAwAd1hOWRPfKtr7SwIHtF52uZzpsqF3xv/7HX3lzIdrt0+fgc8QQFU9DQ2DXQsABMWtcJYHab+DGiug5d+VTT6L70COfvRL2jtwU6cs7H5qtugsyIfzU/DzXCpRZBwBnupnQUj4Ezog6XhpiwAvxEV7mAoETbKiPVsLWRwXrgJFhyrkVEVM7bNe6/nq7hipiLMQIs5rjxsikERpXdUPmuNuXzdQ/Rl0Jn65n6II8MVURAeiCfGGzzbgB+G4OVsV+mOsAIlR8YdKFGChK2gOwEvZFbMikyjj0Al+6+o32hGUgcKZ3GkrQBbnBKv+woTZqAF7p0AWNjPi2nq7nuzLu+0aLsOqdq9HsJDBMMSO7INVOFIwPN0vR7IKgCyqHbp4OXZAfmmGWGogpqQ/ZPWFQHDRAZWAVUQNTFyQCgT+wjKtMtBKGXVAhpDIOdkEFkXZBRLqPGHBCOmhYXpLAEdMqoguELsiZXhcl6IL8EJ71aQ9gjnrAAVGv2JSvgXTUBoVoLs9DTLrvKuyCStBVfIB7pKqzIDAyynE9YaYJu6AamDtiDOiCyvDwlCfqKlo5VAi6oJHhCzFZ0TXy86+AMq4yWWUc9+CDLqgI8BGrQdZHDHZBRcFKuAZw0psOWAmXJusjFgSAH9gPmBbmqYnQBZVB3ZKELqgckTIugGOMneHT0OAflrvxAoxIThn3uHgAuiA/XlLGQRdUDHNHDNNRR1gvgH9AZaCKKE326GL0AH963VTRCEVJhyAMQ/7ALqgyfUPQcbsmvkL+qzdgTJbsmXGgKKoyDjhjWsbRUy+k3i8GPqfPMi66zA2MT68yDj5i/pi6oBAIigEfsRqY6wCM+2XQVsLadYbaVX5DriaU1/hNlaFl0mTlc63sXAZXGdaEXWOFIagGcgjiK2Gr6wAfkpVw8BODYZYjzPhtXj5iU7dtFUP8YUPtMnyE+b+hCb0cNpRP38Nl+uSHvMuS7XsH0zCEeh5+YFNfZrRj2o2j2814OTktTf5cnMcTpS/jchmr52j5kOlzty7+/oxc2HOZ1ZH1/KrwKcONn23DrD/Go1C7fRtupyBSToavSMgTn+DM5sYMzbh4ajeCaFbnv8g+yu7Ryv7IAAAAAElFTkSuQmCC");\r
  --pxa-panel-slice: 12 8 12 18 fill;\r
  --pxa-panel-width: 12px 8px 12px 18px;\r
  --pxa-panel-repeat: stretch round;\r
  --pxa-menu: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAMZJREFUWIXtl7ENwyAQRR8WPZU7BqHPBtRmOlx7g/QexB2VJyBFbEKX7i5S+B0I6R+n/3RglpmKktaCsQB538A/ZN2PJ4RYp34veUfyTrQO25uvBQOAdzUfp0wBa8EQoloO7DJTWwa8qwBStwcwmhTAlQEtClKIDAoGBbZfSBrfmr4fESxAhYI+hBoUTC2ESmohzMc5KFCRPgW9+ZgFf0nBDz3JgBQiINSJ60k2ZsFnFuwbdyfyvr3/bpIFNGNhGQAtEtaCeQEYeX/dSgetuAAAAABJRU5ErkJggg==");\r
  --pxa-menu-slice: 6 fill;\r
  --pxa-menu-width: 6px;\r
  --pxa-button: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAAAAXNSR0IArs4c6QAAASlJREFUaIHt2iEOgzAUBuC/BI/C4Uk4AZ4boOnpiuYGeE6wZB6H2gk6scHagtvKS8b/qdEgXt5fuoQHQEQkRoULXQ4rUchV9Ivf89S96HJYc79BlxXMNJxb2Z/TdQtzvwFlZd0QtgDW5nuK5rwK/9k8bj/DELwnQJfVyZVdi9vfLoftFygvAB478Rz2tm5tCgR/vDx2fu+op+9jKelyWO58OQkA7npBiXQBV8cAhDEAYQxAGAMQxgCEMQBhDEAYAxDGAIQxAGHpbsUZHmz4rigafyBTt7sb+Kb0x4INnq6LZn5AFxncsSQnZHG4G/3zBMwjzDS8BvLhbPjoWKKv9QuUcqdhZhqAooEuMsm6LmEdyivgM5LkeR+Xrtvdd0HbBT/Iii9sPhGRsCcxOlS7B3jCOgAAAABJRU5ErkJggg==");\r
  --pxa-button-hover: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAAXNSR0IArs4c6QAAAR1JREFUaIHtmTEOgzAMRX+q7Ezd2CtxAnZuwNycLszcoDsnQGJnY+IEdAjQJKLq1Fhy/CbiLPbHGNkGhLxRV8bnHVtqR1LRLWHM58EP2g59Sp+SYeoWQCiCBlzwduiBsoEpC3dTNgQu/pH5BQCw0wg8qu0Q4UbqFBF2Gs+M14fxSA/umEd1Pj/v2LR/aYeetRBxbTN1i0AAdt+9TxzbXhNuZwHMFFcEOb/5H2T5F/ARAagdoEYEoHaAGhGA2gFqRABqB6gRAYLT3iDkhOsG5xfsvH6mQbsNAPs+IcgAO68AXJ/MeS7go2PD10xgirqcB/jDUcZ0C5SKdwDHdJgjpizgT7+7BUp3y54F0/gZGDJO+3g3cLkY4Uq8FRIEAW9z5lUxZXlYggAAAABJRU5ErkJggg==");\r
  --pxa-button-active: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAAAAXNSR0IArs4c6QAAASlJREFUaIHt2iEOgzAUBuC/BI/C4Uk4AZ4boOnpiuYGeE6wZB6H2gk6scHagtvKS8b/qdEgXt5fuoQHQEQkRoULXQ4rUchV9Ivf89S96HJYc79BlxXMNJxb2Z/TdQtzvwFlZd0QtgDW5nuK5rwK/9k8bj/DELwnQJfVyZVdi9vfLoftFygvAB478Rz2tm5tCgR/vDx2fu+op+9jKelyWO58OQkA7npBiXQBV8cAhDEAYQxAGAMQxgCEMQBhDEAYAxDGAIQxAGHpbsUZHmz4rigafyBTt7sb+Kb0x4INnq6LZn5AFxncsSQnZHG4G/3zBMwjzDS8BvLhbPjoWKKv9QuUcqdhZhqAooEuMsm6LmEdyivgM5LkeR+Xrtvdd0HbBT/Iii9sPhGRsCcxOlS7B3jCOgAAAABJRU5ErkJggg==");\r
  --pxa-button-slice: 8 6 10 6 fill;\r
  --pxa-button-width: 6px 5px 8px 6px;\r
  --pxa-button-ink: #3A2412;\r
  --pxa-button-hover-ink: #6E3A10;\r
  --pxa-icon: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAMZJREFUWIXtl7ENwyAQRR8WPZU7BqHPBtRmOlx7g/QexB2VJyBFbEKX7i5S+B0I6R+n/3RglpmKktaCsQB538A/ZN2PJ4RYp34veUfyTrQO25uvBQOAdzUfp0wBa8EQoloO7DJTWwa8qwBStwcwmhTAlQEtClKIDAoGBbZfSBrfmr4fESxAhYI+hBoUTC2ESmohzMc5KFCRPgW9+ZgFf0nBDz3JgBQiINSJ60k2ZsFnFuwbdyfyvr3/bpIFNGNhGQAtEtaCeQEYeX/dSgetuAAAAABJRU5ErkJggg==");\r
  --pxa-icon-slice: 6 fill;\r
  --pxa-icon-width: 6px;\r
  --pxa-input: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAAXNSR0IArs4c6QAAAOVJREFUaIHtmbERhSAQRBeHFswshNwOiLU6je3g5xZiZhH8BJABYnYG7oWSrO84gjsFzzbDoXPOFyr/poDv54/7ap2pGbuxAEoJuqj8srZL1YrnB8AX2FiXStDxYBByCVM8WdY+q1/huK/Y9podpiXhHQhsM9wwAmptvhs7yA2otbZ/GKfyZCxEADsAGxHADsBGBLADsBEB7ABsRAA7ABsRwA7ARgSwA7ARAewAbEQAOwCbbyboZ2SRQUbkGijHxV0vSrJCF5uhXEaPpHtCfb5QMNYVVc9bojPCaiwuCUdYjwfS5egfS5w8Vq4TIVoAAAAASUVORK5CYII=");\r
  --pxa-input-slice: 4 4 6 4 fill;\r
  --pxa-input-width: 4px 4px 5px 4px;\r
  --pxa-input-ink: #3A2412;\r
  --pxa-placeholder: #7A5A38;\r
  --pxa-caret: #8C4A16;\r
  --pxa-select: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAMZJREFUWIXtl7ENwyAQRR8WPZU7BqHPBtRmOlx7g/QexB2VJyBFbEKX7i5S+B0I6R+n/3RglpmKktaCsQB538A/ZN2PJ4RYp34veUfyTrQO25uvBQOAdzUfp0wBa8EQoloO7DJTWwa8qwBStwcwmhTAlQEtClKIDAoGBbZfSBrfmr4fESxAhYI+hBoUTC2ESmohzMc5KFCRPgW9+ZgFf0nBDz3JgBQiINSJ60k2ZsFnFuwbdyfyvr3/bpIFNGNhGQAtEtaCeQEYeX/dSgetuAAAAABJRU5ErkJggg==");\r
  --pxa-select-slice: 6 fill;\r
  --pxa-select-width: 6px;\r
  --pxa-ink: #3A2412;\r
  --pxa-accent: #8C5A2C;\r
  --pxa-accent-bright: #6E3A10;\r
  --pxa-hover-wash: rgba(140, 90, 44, 0.14);\r
  --pxa-tooltip-bg: #2E1C0C;\r
  --pxa-tooltip-ink: #FFFAF2;\r
  --pxa-outline: #8C5A2C;\r
}\r
html[data-pixel-theme='pixel-papernote'] body {\r
  background-color: var(--px-wood-darkest);\r
  background-image: repeating-conic-gradient(rgba(140, 90, 44, 0.04) 0 25%, transparent 0 50%);\r
  background-size: 4px 4px;\r
}\r
/* 便签本：铅笔光标覆盖一切——按钮/链接/输入框/正文都不再退回像素手或\r
 * I-beam，否则一块纸面上会同时出现三种指针。热区在笔尖 (4,4)：素材是\r
 * 左上笔尖、右下橡皮，之前写成 26 26 等于点在橡皮上。 */\r
html[data-pixel-theme='pixel-papernote'] body,\r
html[data-pixel-theme='pixel-papernote'] body * {\r
  cursor: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAWNJREFUWIVjYBgFIx0wogvEiDL8x6V4yWtM9ZQCFmyCX6wD4Oz19cEICbfY/9R2BBM+SWTLY91iGRZPCMIbQlR1wGRfHQzLGRgYqO4IrA6Y7KvDIGOkzvDk3E0Uy2GAmo7AGQJPzt1kqKxoYWgONcYqTy1H4HQAzHIFa3mGB0cf0swRWFN0jCjDf2SfwxyhYC2P1ZDYgnVkZ1GcmujlCLwa6OEIgopp7QiiFNLSEUS7lFaOICm+aOEIklMtsY64YdTKwMDAwNBqp4nXEWTlXUKOgFmuERrKwMDAwBD78gpOR5BdteJyxI/cJSiWwwAuR+CtjvGBJa8ZGGtXn4XzYZbfuXMHw3J8gGwHoDviimcDw507dxh8KisZnrz5Qx8HoDvCILWU4cmbPwwyIixEO4JqzasYUYb/7cwacD7METIiLHgTIVVBjCjD/8cSGnD8X0fnP6HqmuquQreQLj4fBaOAEgAArfrJfFZraPoAAAAASUVORK5CYII=") 4 4, auto !important;\r
}\r
\r
/* 云石：板岩底 + 白石框 + 钢青。白石的 20px 边框只给对话框和菜单；\r
 * 按钮/输入框本身是白石控件，文字用深墨色。 */\r
html[data-pixel-theme='pixel-marble'] {\r
  --px-wood-darkest: #161C26;\r
  --px-wood-dark: #1F2836;\r
  --px-wood-mid: #2A3548;\r
  --px-wood-warm: #354258;\r
  --px-wood-light: #5C708C;\r
  --px-wood-pale: #AEBCCB;\r
  --px-text-on-dark: #E9F0F7;\r
  --px-text-light: #AEBCCB;\r
  --px-parchment: #E9F0F7;\r
  --px-gold: #7FB2E5;\r
  --px-gold-bright: #A9D1F2;\r
  --px-gold-dark: #5A88B8;\r
  --px-gold-deep: #3C5A7A;\r
  --px-sidebar-fill: #121821;\r
  --px-line: #0D1219;\r
  --px-accent-bg: #7FB2E5;\r
  --px-accent-hover: #9CC6EE;\r
  --px-accent-ink: #121A24;\r
  --px-input-bg: #E8EFF2;\r
  --px-input-text: #1B2230;\r
  --px-input-ph: #5A6B80;\r
  --px-input-caret: #5A88B8;\r
  --px-tooltip-bg: #1B2230;\r
  --px-code-bg: #1F2836;\r
  --px-code-ink: #A9D1F2;\r
  --px-code-meta: #AEBCCB;\r
  --px-ink-on-mid: #E9F0F7;\r
  --px-topbar-fill: #1F2836;\r
  --px-dither: #1B2330;\r
  --pxa-panel: url("data:image/png;base64,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");\r
  --pxa-panel-slice: 20 fill;\r
  --pxa-panel-width: 20px;\r
  --pxa-panel-repeat: repeat;\r
  --pxa-menu: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAz5JREFUWIWlVz9IG1Ec/p5cszm4hLrUgHSR0jooBLo0jgoVxN0/OImDi4vDDaFkcWmhOIhEukukkWZsXIRAbmhBspSAcTG85aDZTuE6XH8vv/fu3eWMH4Tk7t6973u//xEA0Or0Qhgozs0I2/1xUZybESZXcW5GODaSwvSU9s1xe+8nkvD1aesIrU4vdGwP3EpN+36ZH268u1NSmxempzQivj6fn7QSmvc0AbYTJ4l7++YVGnKA5ZV59Wx7q6R+e+2u+r3+cQHr/l+N/LzuRQL4woYcWNU2fvwaKcw8hGcRDQytSRayuoBOIOUAfelrLkgiJByfNjWCUUgUkBVEmISFxVksLM6qa9Oazt7Gkmh1eiGdxBa9T3FBGkxrSTkYWoD8VD5ciwnhgVY9Sz8xX2sSu5VazJ1KABGbQggUtRyt6yvtulzZt4riQcjRlz5i1Ymr5bj98zu2Qc4R2nXwOMy04vsPAIYWIcvxLNjbWBIOoOcsT0VObpIBwItczrgTxISMip+J1KcWQv5Jep5zRMw9SXBanV7ILcAxrGwluIefAQRW4ucg1QJeuwuv3c1UoseFA0S1GohSz+azUcWG4yEIEDyGiRkRK0Reu4vqzR2AqMHY0Lq+Qs4RY5u/etaMdUgpB2h1euGEtEQ9gcpoubKP4DHEQxBkJs3qtonywWosv5ZX5rXWOg7cSk2JSNvL2oySsuIp2N4qwa3UVEXd3YlE8Hjy2t1s3bB+cakKEbmBx4PNNRRsRNiXUW8xe4E2eFK5LB+uxbriJ/eLVuF4ZeT3OQqv3ylCm4B8fhKi/39Uur33tT6wvVVS1+d1D/WLSy21osIUISnlzJkR0NOwL30I9+i7kk+NozA9hePTplJN6ckzhrddM7fpPcAegLS+fLAqtBjgvT5tDONrzbZtktrScXenpGLDGTXzAVAjlc2ktiEjqbtyy9A7mbKANqze3D27PphwTo42tThIg2luClYbstaS2ETEQX62BSEQmZSLGjXQkgu4aOUC079ZazmvbFTtCLY50rSYGsnMv1nHp02cHG0KAPj67WcmF5lzpK27kmtoBFAW6Etf8xuP2L2NJQEAZqxkiR+z2dFhqM78A9t9tgHLgs7zAAAAAElFTkSuQmCC");\r
  --pxa-menu-slice: 12 fill;\r
  --pxa-menu-width: 12px;\r
  --pxa-menu-repeat: repeat;\r
  --pxa-button: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAAAAXNSR0IArs4c6QAAAZRJREFUaIHtmjFOwzAUhn8HBpZGSVWpuQALMwsXIRdA7Q1oszEgNWkXZtQeoN24FZUQRHRhKwN6KIpi+1kqvCHvG+3/fbbs2EmlAoqiKEpfMe2G14/PY7stS2Pj6m9n2xmq99X6xupy2+ptOZvD57bNy1XnWguCvbDKaaGNYD+ZyunJ0thE0pPoO947Vflb9AQIoxsgjL6EhdETIEiWxibSp18WPQHC6GeoMHoChNENEEY/Q4XRd4AwegUJoxsgSJbGRq8gYfQECKMbIEw0TgbSc+gt42SAs6+Lq4eb60vpufSSx6eXnytIT8H/Q2tuAGC22B7L+S0AYF8frOGuPpt8Xx+8dSFecvoyBNfpynPGbHo4DsrOyx2qIjfn1DEvdwAA2ogmd/fPAID1cuKdDOXXy4m3LsRLTl+G4Dpdec6YTQ/HQetM/P4xa7bYWn8PvL3XAIDRMPFOhvKjYeKtC/GS05chuE5XnjNm0xPiqIrcAI3P0KrIDTW22aymZrOadvbZ8py6EC8nR74Qpysf6uE42uv8Dc6z5hxuhT2FAAAAAElFTkSuQmCC");\r
  --pxa-button-hover: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAAAAXNSR0IArs4c6QAAAZNJREFUaIHtmjFOw0AQRf8uFDS27CiSfQEaahouQi4QJTcITkeBhJM01FFyANJxKwoEiIoOimgky+CdWZQwheeVu3/+Tma867UUhxbPbx9f7bEyT11ovq1tayiei+XW+s27K75L1+XBeXflFYoL1YIQF9Y4LNQI8ZNpHJ4yT53XTqLvsGeqcVxsByhjDVDGXsLK2A5QpMxT5+3p18V2gDJ2DVXGdoAy1gBl7BqqjL0DlLEjSBlrgCJlnjo7gpSxHaCMNUAZX2SJdg69pcgSnHyeXdxeXZ5r59JL7h6e9keQ7YL/h2ruAaCqdyiypLMRobmQORcX4yvRkV+MJ/e7Y3wkHqSt6h0A4JQmaKCurn+YjGdrAMBmORElNJ6tsVlO2LgYX/LkNITUM6SXrNn0kXhQnQl3c//Ifge8vL4DAIaDjE2G9MNBxsbF+JKnJM8Yz5BesmbT5y8edg1Vxi/mI8fLjGOwmI/sn3HaeGDfCe1E+gbV3DcHuhqxXU3ddjUVN4m0XFyMr0RHfjGeIX2sj8SjXedvMgbJ/79aVMIAAAAASUVORK5CYII=");\r
  --pxa-button-active: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAgCAYAAADtwH1UAAAAAXNSR0IArs4c6QAAAZNJREFUaIHtmjFOw0AQRf8uFDS27CiSfQEaahouQi4QJTcITkeBhJM01FFyANJxKwoEiIoOimgky+CdWZQwheeVu3/+Tma867UUhxbPbx9f7bEyT11ovq1tayiei+XW+s27K75L1+XBeXflFYoL1YIQF9Y4LNQI8ZNpHJ4yT53XTqLvsGeqcVxsByhjDVDGXsLK2A5QpMxT5+3p18V2gDJ2DVXGdoAy1gBl7BqqjL0DlLEjSBlrgCJlnjo7gpSxHaCMNUAZX2SJdg69pcgSnHyeXdxeXZ5r59JL7h6e9keQ7YL/h2ruAaCqdyiypLMRobmQORcX4yvRkV+MJ/e7Y3wkHqSt6h0A4JQmaKCurn+YjGdrAMBmORElNJ6tsVlO2LgYX/LkNITUM6SXrNn0kXhQnQl3c//Ifge8vL4DAIaDjE2G9MNBxsbF+JKnJM8Yz5BesmbT5y8edg1Vxi/mI8fLjGOwmI/sn3HaeGDfCe1E+gbV3DcHuhqxXU3ddjUVN4m0XFyMr0RHfjGeIX2sj8SjXedvMgbJ/79aVMIAAAAASUVORK5CYII=");\r
  --pxa-button-slice: 5 8 6 8 fill;\r
  --pxa-button-width: 5px 6px 6px 6px;\r
  --pxa-button-ink: #1B2230;\r
  --pxa-button-hover-ink: #1B2230;\r
  --pxa-icon: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAQ9JREFUWIXtV7sKwkAQnI0WNgmJCOYHbKxt/BH9AdE/8NFZCEZtrCX5AO38qxRBxcouFrLhPFw73SIZOAgz5Gayexs4oELZQTaRXu+5zYWBR5IeBh59ekfSzL3eAkib/AochDTMzRCOhrEJsX//gnoF1AOoHkJAuQJh4JFT+kNYjaF6APUxrM6A+o+oaoF+gLbvqpm3fRe1R6O77Pc6KgFW+/OrBRpVePOcrY85I73ei2VytmYvSZf2nK2POQDUOcQ8OgEAovmgCDaaHgAA8XaM0fSAeDsWv0jSbZ59GMXFhBOZyC43AECr6SO73NBq+mIASZf4zWJIgDGGm8WQmGQkuwkluwnxs+j+Rbd52+cJri7Wy++hebcAAAAASUVORK5CYII=");\r
  --pxa-icon-slice: 6 fill;\r
  --pxa-icon-width: 6px;\r
  --pxa-input: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAOVJREFUWIVjZGBgYEgrn/O/qSKMgRCQEORjfPH+039CahgYGBgIqYMBlvL2lf/ff/hMjFqiDCXWYhhgIkUxLcDIdoCEIB/jgDrgxftP/0d2FAwuB8Rl9Q2cAx48esKwaFrRwDjg/KXrDApyMgNiOQMDAwOToZ7mgFnOwDDSCyIGhsGUDQcCjBbFow5AccCA1wUDBZjOX7rOwMDAMHCVEQMDw8itjAa8LhgtCfE6oLptOU5N1W3L4ZhYgEs9I6xzKijACxd88+4Dg4iQAFaD3rz7AGfjUoNLDzb1TAwMDANmeWdlOCMAdVNaL5kcHLkAAAAASUVORK5CYII=");\r
  --pxa-input-slice: 6 fill;\r
  --pxa-input-width: 6px;\r
  --pxa-input-ink: #1B2230;\r
  --pxa-placeholder: #5A6B80;\r
  --pxa-caret: #5A88B8;\r
  --pxa-select: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAANBJREFUWIVjYBgFo2AUjIIBBowMDAwMaeVz/jdVhKFIPHj+noGBgYFBQVIQrxi6HLI8PvVwB6SVz/kvKMDLUJjhiWEQLQHMUSwwAXpZjG4fk6AAL10tRgdM7z98HlgHDKjtow4YFA4YzQUDajsDUkmIrcynJYAXxYICvAzo0YBeeRBTqcDUkaqX5f2Hzwx6WkoMazadwWnw42evGRgYGBhkpUTxOuDxs9cYagjpZZyycN9/ZM3IhsA0owN0eZg+YgCy2s7KcEaiNI2CUTAKaAkA7J1WLFOXtqgAAAAASUVORK5CYII=");\r
  --pxa-select-slice: 6 fill;\r
  --pxa-select-width: 6px;\r
  --pxa-select-ink: #1B2230;\r
  --pxa-ink: #E9F0F7;\r
  --pxa-accent: #7FB2E5;\r
  --pxa-accent-bright: #A9D1F2;\r
  --pxa-hover-wash: rgba(127, 178, 229, 0.14);\r
  --pxa-tooltip-bg: #1B2230;\r
  --pxa-tooltip-ink: #E9F0F7;\r
}\r
html[data-pixel-theme='pixel-marble'] body {\r
  background-color: var(--px-wood-darkest);\r
  background-image: repeating-conic-gradient(rgba(127, 178, 229, 0.035) 0 25%, transparent 0 50%);\r
  background-size: 4px 4px;\r
}\r
\r
/* ── 共用 9-slice 规则：只在素材主题生效 ─────────────────────────── */\r
/* 便签的纸面几乎与页面同色，补 2px 墨线把「纸」钉出来；其他素材主题的\r
 * 边缘本身对比足够，--pxa-outline 不设即透明。 */\r
html[data-pixel-asset] [role='dialog'],\r
html[data-pixel-asset] [data-menu-material] {\r
  outline: 2px solid var(--pxa-outline, transparent);\r
  outline-offset: -2px;\r
}\r
html[data-pixel-asset] [role='dialog'] {\r
  border: 0 solid transparent !important;\r
  border-width: var(--pxa-panel-width, 24px) !important;\r
  border-image: var(--pxa-panel) var(--pxa-panel-slice, 24 fill) / var(--pxa-panel-width, 24px) / 0 var(--pxa-panel-repeat, stretch) !important;\r
  background: transparent !important;\r
  color: var(--pxa-ink) !important;\r
  box-sizing: border-box !important;\r
}\r
html[data-pixel-asset] [data-menu-material] {\r
  border: 0 solid transparent !important;\r
  border-width: var(--pxa-menu-width, 10px) !important;\r
  border-image: var(--pxa-menu) var(--pxa-menu-slice, 10 fill) / var(--pxa-menu-width, 10px) / 0 var(--pxa-menu-repeat, stretch) !important;\r
  background: transparent !important;\r
  box-sizing: border-box !important;\r
  overflow-x: hidden !important;\r
}\r
html[data-pixel-asset] [role='menu']:not([data-menu-material]) {\r
  border: 0 !important;\r
  border-image: none !important;\r
  background: transparent !important;\r
}\r
html[data-pixel-asset] [role='menuitem'] {\r
  color: var(--pxa-ink) !important;\r
  background: transparent !important;\r
  background-image: none !important;\r
}\r
html[data-pixel-asset] [role='menuitem']:hover {\r
  color: var(--pxa-accent-bright) !important;\r
  background-color: var(--pxa-hover-wash) !important;\r
  background-image: none !important;\r
}\r
html[data-pixel-asset] button[class*='primary'],\r
html[data-pixel-asset] button[class*='Primary'] {\r
  border: 0 solid transparent !important;\r
  border-width: var(--pxa-button-width) !important;\r
  border-image: var(--pxa-button) var(--pxa-button-slice) / var(--pxa-button-width) / 0 stretch !important;\r
  background: transparent !important;\r
  color: var(--pxa-button-ink) !important;\r
  min-height: 32px;\r
}\r
html[data-pixel-asset] button[class*='primary']:hover,\r
html[data-pixel-asset] button[class*='Primary']:hover {\r
  border-image-source: var(--pxa-button-hover) !important;\r
  color: var(--pxa-button-hover-ink, var(--pxa-button-ink)) !important;\r
  background: transparent !important;\r
  background-image: none !important;\r
}\r
html[data-pixel-asset] button[class*='primary']:active,\r
html[data-pixel-asset] button[class*='Primary']:active {\r
  border-image-source: var(--pxa-button-active, var(--pxa-button)) !important;\r
  transform: translate(1px, 1px) !important;\r
  transition-duration: 0s !important;\r
}\r
/* 图标主按钮（发送/关闭）：用方形图标框，绝不把横条按钮塞进方块。 */\r
html[data-pixel-asset] button[class*='primary']:has(> svg:only-child),\r
html[data-pixel-asset] button[class*='Primary']:has(> svg:only-child) {\r
  border: 0 solid transparent !important;\r
  border-width: var(--pxa-icon-width) !important;\r
  border-image: var(--pxa-icon) var(--pxa-icon-slice) / var(--pxa-icon-width) / 0 stretch !important;\r
  background: transparent !important;\r
  color: var(--pxa-button-ink) !important;\r
  min-height: 0;\r
}\r
html[data-pixel-asset] button[class*='primary']:has(> svg:only-child):hover,\r
html[data-pixel-asset] button[class*='Primary']:has(> svg:only-child):hover {\r
  border-image-source: var(--pxa-icon) !important;\r
  color: var(--pxa-accent-bright) !important;\r
}\r
html[data-pixel-asset] input:not([type='checkbox']):not([type='radio']):not([type='range']),\r
html[data-pixel-asset] textarea,\r
html[data-pixel-asset] [contenteditable='true'] {\r
  border: 0 solid transparent !important;\r
  border-width: var(--pxa-input-width, 8px) !important;\r
  border-image: var(--pxa-input) var(--pxa-input-slice, 10 fill) / var(--pxa-input-width, 8px) / 0 stretch !important;\r
  background: transparent !important;\r
  color: var(--pxa-input-ink) !important;\r
  caret-color: var(--pxa-caret) !important;\r
  box-sizing: border-box !important;\r
}\r
html[data-pixel-asset] input::placeholder,\r
html[data-pixel-asset] textarea::placeholder {\r
  color: var(--pxa-placeholder) !important;\r
  -webkit-text-fill-color: var(--pxa-placeholder) !important;\r
  opacity: 1;\r
}\r
html[data-pixel-asset] [contenteditable='true']:empty::before {\r
  color: var(--pxa-placeholder) !important;\r
  -webkit-text-fill-color: var(--pxa-placeholder) !important;\r
}\r
html[data-pixel-asset] [role='menuitem'][aria-current='page'],\r
html[data-pixel-asset] [role='treeitem'][aria-selected='true'] {\r
  border: 0 solid transparent !important;\r
  border-width: var(--pxa-select-width, 8px) !important;\r
  border-image: var(--pxa-select) var(--pxa-select-slice, 10 fill) / var(--pxa-select-width, 8px) / 0 stretch !important;\r
  background: transparent !important;\r
  background-image: none !important;\r
  color: var(--pxa-select-ink, var(--pxa-ink)) !important;\r
  box-sizing: border-box !important;\r
}\r
/* 浮层只换颜色：2px 主题色边 + 实色底，不套面板图。 */\r
html[data-pixel-asset] [role='tooltip'] {\r
  border: 2px solid var(--pxa-accent) !important;\r
  border-image: none !important;\r
  background-color: var(--pxa-tooltip-bg) !important;\r
  color: var(--pxa-tooltip-ink) !important;\r
}\r
html[data-pixel-asset] [role='alert'] {\r
  border: 2px solid var(--pxa-accent) !important;\r
  border-left: 4px solid var(--pxa-accent) !important;\r
  border-image: none !important;\r
  background-color: var(--pxa-tooltip-bg) !important;\r
  color: var(--pxa-tooltip-ink) !important;\r
}\r
html[data-pixel-asset] [role='dialog'] button:not(:disabled):not([class*='primary']):not([class*='Primary']):hover {\r
  background-color: var(--pxa-hover-wash) !important;\r
}\r
html[data-pixel-asset] [role='tab']::after {\r
  background: var(--pxa-accent) !important;\r
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
      "--dsw-alias-label-primary-foreground": "#1A0F06",
      "--dsw-specific-bubble": "#3A2515",
      "--dsw-specific-bubble-highlight": "#4A3020",
      "--dsw-specific-menu": "#241408",
      "--dsw-specific-input-major": "#1A0F06",
      "--dsw-specific-selector": "#4A3020",
      "--dsw-specific-tip": "#3A2515"
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
      "--dsw-alias-label-primary-foreground": "#FFFDF5",
      "--dsw-specific-bubble": "#E3D4B8",
      "--dsw-specific-bubble-highlight": "#D8C7A6",
      "--dsw-specific-menu": "#FFFDF5",
      "--dsw-specific-input-major": "#FFFDF5",
      "--dsw-specific-selector": "#D4C4A8",
      "--dsw-specific-tip": "#D4C4A8"
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
      "--dsw-alias-label-primary-foreground": "#1E0E04",
      "--dsw-specific-bubble": "#4A2210",
      "--dsw-specific-bubble-highlight": "#5C2E16",
      "--dsw-specific-menu": "#2A1308",
      "--dsw-specific-input-major": "#1E0E04",
      "--dsw-specific-selector": "#5C2E16",
      "--dsw-specific-tip": "#4A2210"
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
      "--dsw-alias-label-primary-foreground": "#0A0E0A",
      "--dsw-specific-bubble": "#101A10",
      "--dsw-specific-bubble-highlight": "#162016",
      "--dsw-specific-menu": "#0C100C",
      "--dsw-specific-input-major": "#0A0E0A",
      "--dsw-specific-selector": "#2A402A",
      "--dsw-specific-tip": "#162016"
    }
  },
  {
    id: "pixel-hologram",
    colorScheme: "dark",
    tokens: {
      "--dsw-alias-bg-base": "#071426",
      "--dsw-alias-bg-layer-1": "#10233B",
      "--dsw-alias-bg-layer-2": "#1A2E4A",
      "--dsw-alias-bg-overlay": "#0A1A2E",
      "--dsw-alias-border-l1": "#244A6A",
      "--dsw-alias-border-l2": "#3E8FB0",
      "--dsw-alias-brand-primary": "#14DCEE",
      "--dsw-alias-label-primary": "#E8F7FF",
      "--dsw-alias-label-secondary": "#9BC4D4",
      "--dsw-alias-state-error-primary": "#FF6B7A",
      "--dsw-alias-state-success-primary": "#6FE3C1",
      "--dsw-alias-state-warn-primary": "#FFD166",
      "--dsw-alias-state-idle-primary": "#52748C",
      "--dsw-specific-sidebar-fill": "#081624",
      "--dsw-alias-button-primary-fill": "#2C416D",
      "--dsw-alias-button-primary-hover": "#385586",
      "--dsw-alias-label-primary-foreground": "#E8F7FF",
      "--dsw-specific-bubble": "#12314F",
      "--dsw-specific-bubble-highlight": "#1A3E60",
      "--dsw-specific-menu": "#0A1A2E",
      "--dsw-specific-input-major": "#10233B",
      "--dsw-specific-selector": "#244A6A",
      "--dsw-specific-tip": "#0A1A2E"
    }
  },
  {
    id: "pixel-pumpkin",
    colorScheme: "dark",
    tokens: {
      "--dsw-alias-bg-base": "#170D06",
      "--dsw-alias-bg-layer-1": "#241409",
      "--dsw-alias-bg-layer-2": "#2F1B0C",
      "--dsw-alias-bg-overlay": "#1C0F07",
      "--dsw-alias-border-l1": "#4A2A12",
      "--dsw-alias-border-l2": "#C4741F",
      "--dsw-alias-brand-primary": "#FF9E2C",
      "--dsw-alias-label-primary": "#FFE9C9",
      "--dsw-alias-label-secondary": "#D8A76F",
      "--dsw-alias-state-error-primary": "#FF7A66",
      "--dsw-alias-state-success-primary": "#9BD57A",
      "--dsw-alias-state-warn-primary": "#FFC24B",
      "--dsw-alias-state-idle-primary": "#A06A3E",
      "--dsw-specific-sidebar-fill": "#1B0F07",
      "--dsw-alias-button-primary-fill": "#8A3E0C",
      "--dsw-alias-button-primary-hover": "#A64E10",
      "--dsw-alias-label-primary-foreground": "#FFF6E6",
      "--dsw-specific-bubble": "#5A2E10",
      "--dsw-specific-bubble-highlight": "#6E3A14",
      "--dsw-specific-menu": "#241409",
      "--dsw-specific-input-major": "#2A170A",
      "--dsw-specific-selector": "#4A2A12",
      "--dsw-specific-tip": "#3A2210"
    }
  },
  {
    id: "pixel-papernote",
    colorScheme: "light",
    tokens: {
      "--dsw-alias-bg-base": "#F2E6D2",
      "--dsw-alias-bg-layer-1": "#F6ECD9",
      "--dsw-alias-bg-layer-2": "#EEE1C9",
      "--dsw-alias-bg-overlay": "#FFFAF2",
      "--dsw-alias-border-l1": "#E2D1B4",
      "--dsw-alias-border-l2": "#8C5A2C",
      "--dsw-alias-brand-primary": "#9A5518",
      "--dsw-alias-label-primary": "#3A2412",
      "--dsw-alias-label-secondary": "#6E4E2E",
      "--dsw-alias-state-error-primary": "#A33225",
      "--dsw-alias-state-success-primary": "#3F7A3A",
      "--dsw-alias-state-warn-primary": "#8A5A00",
      "--dsw-alias-state-idle-primary": "#94795C",
      "--dsw-specific-sidebar-fill": "#F6ECD9",
      "--dsw-alias-button-primary-fill": "#A3551B",
      "--dsw-alias-button-primary-hover": "#8C4713",
      "--dsw-alias-label-primary-foreground": "#FFF9F1",
      "--dsw-specific-bubble": "#F3DCBC",
      "--dsw-specific-bubble-highlight": "#EBC9A0",
      "--dsw-specific-menu": "#FFFAF2",
      "--dsw-specific-input-major": "#FFF9F1",
      "--dsw-specific-selector": "#DCC7A4",
      "--dsw-specific-tip": "#E6D7BC"
    }
  },
  {
    id: "pixel-marble",
    colorScheme: "dark",
    tokens: {
      "--dsw-alias-bg-base": "#161C26",
      "--dsw-alias-bg-layer-1": "#1F2836",
      "--dsw-alias-bg-layer-2": "#2A3548",
      "--dsw-alias-bg-overlay": "#1B2230",
      "--dsw-alias-border-l1": "#3C4A60",
      "--dsw-alias-border-l2": "#A9C0DA",
      "--dsw-alias-brand-primary": "#7FB2E5",
      "--dsw-alias-label-primary": "#E9F0F7",
      "--dsw-alias-label-secondary": "#AEBCCB",
      "--dsw-alias-state-error-primary": "#FF7A7A",
      "--dsw-alias-state-success-primary": "#7BE3B0",
      "--dsw-alias-state-warn-primary": "#FFC857",
      "--dsw-alias-state-idle-primary": "#6F8098",
      "--dsw-specific-sidebar-fill": "#121821",
      "--dsw-alias-button-primary-fill": "#E8EFF2",
      "--dsw-alias-button-primary-hover": "#F6FAFD",
      "--dsw-alias-label-primary-foreground": "#1B2230",
      "--dsw-specific-bubble": "#2A3548",
      "--dsw-specific-bubble-highlight": "#354258",
      "--dsw-specific-menu": "#1B2230",
      "--dsw-specific-input-major": "#1F2836",
      "--dsw-specific-selector": "#3C4A60",
      "--dsw-specific-tip": "#2A3548"
    }
  }
];
var PIXEL_IDS = THEMES.map((theme) => theme.id);
var ASSET_IDS = /* @__PURE__ */ new Set(["pixel-hologram", "pixel-pumpkin", "pixel-papernote", "pixel-marble"]);
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
    "theme.pixel-hologram": "像素·全息",
    "theme.pixel-pumpkin": "像素·南瓜灯",
    "theme.pixel-papernote": "像素·便签本",
    "theme.pixel-marble": "像素·云石",
    "theme.system": "现代默认"
  },
  en: {
    "row.title": "Pixel theme",
    "row.desc": "Applies instantly and persists across restarts; “Modern default” returns to the host appearance",
    "theme.pixel-wood": "Pixel · Wood",
    "theme.pixel-paper": "Pixel · Paper",
    "theme.pixel-warm": "Pixel · Warm",
    "theme.pixel-retro": "Pixel · Terminal Green",
    "theme.pixel-hologram": "Pixel · Hologram",
    "theme.pixel-pumpkin": "Pixel · Pumpkin",
    "theme.pixel-papernote": "Pixel · Papernote",
    "theme.pixel-marble": "Pixel · Marble",
    "theme.system": "Modern default"
  }
};
var THEME_CHOICES = [
  { id: "pixel-wood", swatch: "#F4D03F" },
  { id: "pixel-paper", swatch: "#FFFDF5" },
  { id: "pixel-warm", swatch: "#FF8C42" },
  { id: "pixel-retro", swatch: "#33FF33" },
  { id: "pixel-hologram", swatch: "#14DCEE" },
  { id: "pixel-pumpkin", swatch: "#FF9E2C" },
  { id: "pixel-papernote", swatch: "#F3DCBC" },
  { id: "pixel-marble", swatch: "#E8EFF2" },
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
    if (on) {
      document.documentElement.setAttribute("data-pixel-theme", active.id);
      document.documentElement.toggleAttribute("data-pixel-asset", ASSET_IDS.has(active.id));
    } else {
      document.documentElement.removeAttribute("data-pixel-theme");
      document.documentElement.removeAttribute("data-pixel-asset");
    }
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

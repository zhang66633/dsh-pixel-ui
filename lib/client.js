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
var pixel_default = `/* dsh-pixel-ui — 星露谷风像素皮肤（木屋/羊皮纸/暖阳/终端绿四主题）
 *
 * 设计原则（v1.5.0 重写，依据是桌面端实测）：
 *
 * 1. **完全平面（flat）**。用户 2026-10-01 的决定：不要立体效果。
 *    所以本表里**没有任何 box-shadow / text-shadow**——凸起、凹陷、浮雕、
 *    文字投影全部取消。像素的层次改由三样东西表达：
 *      ① 整像素描边（2px，内容层 1px）；
 *      ② 平涂色块之间的一档明度差（主题色板自带）；
 *      ③ 2px 棋盘抖动（--px-dither）与手绘 SVG 像素图形。
 *    历史上用半透明 inset/outset 做 bevel，在 1.25 DPR 上会渲染成亚像素
 *    灰阶毛边，那正是用户最早报的「伪像素」。
 *
 * 2. **只做 token 表达不了的事**。颜色、背景、文字色交给主题 token；本表负责
 *    方角、2px 整像素描边、像素字体、位图缩放、像素光标、像素滚动条。
 *
 * 3. **选择器必须是「确定的类型」，不许再用 \`[class*='card']\` 这种子串扫射**。
 *    v1.4 的 \`[class*=...]\` 规则命中了宿主大量它没打算命中的元素（\`.xz4KEq_*\`、
 *    \`.Dc7zOa_*\`、\`.Hqq-bq_*\`、图标类…），结果整个界面被盖上一层厚重黑框，
 *    读起来像「处处凹陷的印章」——用户报的「伪像素 / 凹陷」就是它。
 *    这里只保留三类选择器：
 *      a) 真正的 HTML 语义（button/input/table/pre/hr/…）；
 *      b) 稳定的 ARIA 与 data 属性（[role=tab]、[aria-selected]、[data-theme]）；
 *      c) 本插件自己的类名（.px-*）与宿主主题 token（--dsw-*）。
 *
 * 4. **1px 细线只在内容层出现**（表格内线），装饰框一律 2px 起：
 *    像素风里 1px 装饰线在非整数缩放下必然糊成灰线。
 *
 * 5. **动效是像素动效（v1.6.0）**：只用 \`steps()\` 阶梯、逐帧闪烁和 sprite
 *    位移；不做平滑插值、不做 width/height 动画、不移动布局。所有动画都在
 *    \`prefers-reduced-motion: reduce\` 下关掉。动效只表达「状态正在变化」
 *    （思考中/运行中/选中/按下/提示进入），不拿来做装饰。
 *
 * 作用域 html[data-pixel-ui]：任一像素主题激活时生效，data-pixel-theme 区分配色。
 */

@font-face {
  font-family: 'Fusion Pixel 12';
  src: url('/dsh-pixel-ui/fonts/fusion-pixel-12px.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Press Start 2P';
  src: url('/dsh-pixel-ui/fonts/PressStart2P-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* ── 基础令牌（木屋=暗色基准，其余主题覆盖配色） ─────────────────── */
html[data-pixel-ui] {
  /* 木色阶 */
  --px-wood-darkest: #1A0F06;
  --px-wood-dark: #2C1A0C;
  --px-wood-mid: #3A2515;
  --px-wood-warm: #4A3020;
  --px-wood-light: #6B4C2E;
  --px-wood-pale: #8B6B45;
  /* 金色阶 */
  --px-gold: #F4D03F;
  --px-gold-bright: #FFE066;
  --px-gold-dark: #C99A00;
  --px-gold-deep: #8B6B00;
  --px-parchment: #F5E6C8;
  --px-text-on-dark: #E8D5B0;
  --px-text-light: #AC8A63;
  /* 输入件 */
  --px-input-bg: #1A0F06;
  --px-input-text: #FFFDF5;
  --px-input-caret: #F4D03F;
  --px-input-ph: #B08A5E;
  /* 勾/点：暗色主题用深木色，浅色纸面在主题块里换成纸白 */
  --px-check: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' shape-rendering='crispEdges'%3E%3Cg fill='%231A0F06'%3E%3Crect x='0' y='4' width='2' height='2'/%3E%3Crect x='0' y='6' width='2' height='2'/%3E%3Crect x='2' y='6' width='2' height='2'/%3E%3Crect x='2' y='8' width='2' height='2'/%3E%3Crect x='4' y='4' width='2' height='2'/%3E%3Crect x='4' y='6' width='2' height='2'/%3E%3Crect x='4' y='8' width='2' height='2'/%3E%3Crect x='4' y='10' width='2' height='2'/%3E%3Crect x='6' y='2' width='2' height='2'/%3E%3Crect x='6' y='4' width='2' height='2'/%3E%3Crect x='6' y='6' width='2' height='2'/%3E%3Crect x='6' y='8' width='2' height='2'/%3E%3Crect x='8' y='0' width='2' height='2'/%3E%3Crect x='8' y='2' width='2' height='2'/%3E%3Crect x='8' y='4' width='2' height='2'/%3E%3Crect x='8' y='6' width='2' height='2'/%3E%3Crect x='10' y='0' width='2' height='2'/%3E%3Crect x='10' y='2' width='2' height='2'/%3E%3Crect x='10' y='4' width='2' height='2'/%3E%3C/g%3E%3C/svg%3E");
  --px-radio: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='8' height='8' fill='%231A0F06'/%3E%3C/svg%3E");
  /* 代码 */
  --px-code-bg: #241408;
  --px-code-ink: #FFE066;
  /* 提示框 */
  --px-tooltip-bg: #1A0F06;
  /* 强调面 */
  --px-accent-bg: #F4D03F;
  --px-accent-ink: #1A0F06;
  --px-ink-on-mid: #F5E6C8;
  /* 描边色：平面皮肤唯一的「线」色，2px 整像素 */
  --px-line: #140B04;
  /* 纹理：2px 棋盘抖动 */
  --px-dither: #241408;
  /* 暗角（CRT 只保留暗角，扫描线在非整数 DPR 上必糊） */
  --px-vignette: rgba(0, 0, 0, 0.2);
  /* 内容列宽：宿主把 --dsh-conversation-column-width 写死成 0，
   * clamp(680px, 0 * .64, 920px) 恒取 680px 下限 → 宽屏上正文只占中间一条
   * （踩坑 #7）。这里补上那个变量应有的值：正文随视口撑开。 */
  --px-chat-width: clamp(680px, calc(64vw - 140px), 1200px);
  /* 侧栏 / 顶栏底 */
  --px-sidebar-fill: #241408;
  --px-topbar-fill: #2C1A0C;
  /* 字体栈 */
  --px-font: 'Fusion Pixel 12', 'Press Start 2P', monospace;
  --px-mono: 'Cascadia Code', 'Consolas', 'Courier New', monospace;
  /* 动效：像素动画只走阶梯，不使用平滑曲线（v1.6.0） */
  --px-t-fast: 80ms;
  --px-t-mid: 140ms;
  --px-t-slow: 220ms;
  --px-step-2: steps(2, end);
  --px-step-4: steps(4, end);
  --px-step-8: steps(8, end);
  /* 主按钮悬停底色；与 --px-accent-bg / --px-accent-ink 配对做对比度审计 */
  --px-accent-hover: #FFE066;
}

/* ── 四主题配色（Agent Xi 同款） ─────────────────────────────────── */
html[data-pixel-theme='pixel-paper'] {
  --px-wood-darkest: #F0E8D8;
  --px-wood-dark: #E8DCC8;
  --px-wood-mid: #DDD0B8;
  --px-wood-warm: #D4C4A8;
  --px-wood-light: #B8A080;
  --px-wood-pale: #9B8B6B;
  --px-gold: #A07000;
  --px-gold-bright: #6B4F00;
  --px-gold-dark: #8A6400;
  --px-gold-deep: #7A5A00;
  --px-parchment: #FFFDF5;
  --px-text-on-dark: #3A2A10;
  --px-text-light: #6B5020;
  --px-input-bg: #FFFDF5;
  --px-input-text: #3A2A10;
  --px-input-caret: #8A6400;
  --px-input-ph: #8B7040;
  /* 深金底上的深木色勾看不清，纸面主题改成纸白勾/点 */
  --px-check: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' shape-rendering='crispEdges'%3E%3Cg fill='%23FFFDF5'%3E%3Crect x='0' y='4' width='2' height='2'/%3E%3Crect x='0' y='6' width='2' height='2'/%3E%3Crect x='2' y='6' width='2' height='2'/%3E%3Crect x='2' y='8' width='2' height='2'/%3E%3Crect x='4' y='4' width='2' height='2'/%3E%3Crect x='4' y='6' width='2' height='2'/%3E%3Crect x='4' y='8' width='2' height='2'/%3E%3Crect x='4' y='10' width='2' height='2'/%3E%3Crect x='6' y='2' width='2' height='2'/%3E%3Crect x='6' y='4' width='2' height='2'/%3E%3Crect x='6' y='6' width='2' height='2'/%3E%3Crect x='6' y='8' width='2' height='2'/%3E%3Crect x='8' y='0' width='2' height='2'/%3E%3Crect x='8' y='2' width='2' height='2'/%3E%3Crect x='8' y='4' width='2' height='2'/%3E%3Crect x='8' y='6' width='2' height='2'/%3E%3Crect x='10' y='0' width='2' height='2'/%3E%3Crect x='10' y='2' width='2' height='2'/%3E%3Crect x='10' y='4' width='2' height='2'/%3E%3C/g%3E%3C/svg%3E");
  --px-radio: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='8' height='8' fill='%23FFFDF5'/%3E%3C/svg%3E");
  --px-code-bg: #E0D4BC;
  --px-code-ink: #5C4400;
  --px-tooltip-bg: #2A1B08;
  --px-accent-bg: #7A5A00;
  --px-accent-ink: #FFFDF5;
  --px-ink-on-mid: #3A2A10;
  --px-line: #8B7040;
  --px-dither: #D8C9AC;
  --px-vignette: rgba(0, 0, 0, 0.07);
  --px-sidebar-fill: #E8DCC8;
  --px-topbar-fill: #E8DCC8;
  --px-accent-hover: #5C4400;
}
html[data-pixel-theme='pixel-warm'] {
  --px-wood-darkest: #1E0E04;
  --px-wood-dark: #34180A;
  --px-wood-mid: #4A2210;
  --px-wood-warm: #5C2E16;
  --px-wood-light: #8B4A28;
  --px-wood-pale: #A86B40;
  --px-gold: #FF8C42;
  --px-gold-bright: #FFA64D;
  --px-gold-dark: #D96E30;
  --px-gold-deep: #A05020;
  --px-parchment: #FFF0E0;
  --px-text-on-dark: #F0C8A0;
  --px-text-light: #C08A5C;
  --px-input-bg: #1E0E04;
  --px-input-text: #FFFBF5;
  --px-input-caret: #FF8C42;
  --px-input-ph: #C08A5C;
  --px-code-bg: #2A1308;
  --px-code-ink: #FFA64D;
  --px-tooltip-bg: #1E0E04;
  --px-accent-bg: #FF8C42;
  --px-accent-ink: #1E0E04;
  --px-ink-on-mid: #FFF0E0;
  --px-line: #150801;
  --px-dither: #2A1308;
  --px-sidebar-fill: #2A1308;
  --px-topbar-fill: #34180A;
  --px-accent-hover: #FFA64D;
}
html[data-pixel-theme='pixel-retro'] {
  --px-wood-darkest: #0A0E0A;
  --px-wood-dark: #0E140E;
  --px-wood-mid: #121A12;
  --px-wood-warm: #162016;
  --px-wood-light: #2A402A;
  --px-wood-pale: #3A5A3A;
  --px-gold: #33FF33;
  --px-gold-bright: #66FF66;
  --px-gold-dark: #00CC00;
  --px-gold-deep: #009900;
  --px-parchment: #B8F0B8;
  --px-text-on-dark: #33FF33;
  --px-text-light: #22AA22;
  --px-input-bg: #0A0E0A;
  --px-input-text: #33FF33;
  --px-input-caret: #33FF33;
  --px-input-ph: #22AA22;
  --px-code-bg: #0E140E;
  --px-code-ink: #66FF66;
  --px-tooltip-bg: #0A0E0A;
  --px-accent-bg: #33FF33;
  --px-accent-ink: #0A0E0A;
  --px-ink-on-mid: #B8F0B8;
  --px-line: #040704;
  --px-dither: #101A10;
  --px-sidebar-fill: #0C100C;
  --px-topbar-fill: #0E140E;
  --px-accent-hover: #66FF66;
}

/* ── 内容列宽（桌面端「一半一半」的修正，踩坑 #7） ──────────────────
 * 宿主只在样式表里声明 \`--dsh-chat-content-width: var(--dsh-chat-user-width,
 * clamp(680px, calc(var(--dsh-conversation-column-width, 0px) * .64), 920px))\`，
 * 而 \`--dsh-conversation-column-width\` 全仓无人赋值 → clamp 恒取 680px。
 * 在根作用域用 !important 把两个变量补上（宿主会把 user-width 以内联样式写在
 * 容器上，只有 !important 能压过内联）。 */
html[data-pixel-ui] {
  --dsh-conversation-column-width: calc(100vw - 280px) !important;
  --dsh-chat-user-width: var(--px-chat-width) !important;
  --dsh-chat-content-width: var(--px-chat-width) !important;
}
/* 兜底：万一宿主把列宽写死在自己的样式层，这里同权重覆盖。 */
html[data-pixel-ui] [class*='xz4KEq_column'] {
  max-width: var(--px-chat-width);
}

/* ── 全局：方角、禁次像素平滑、位图缩放 ─────────────────────────── */
html[data-pixel-ui] * {
  border-radius: 0 !important;
}
html[data-pixel-ui] body {
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: geometricPrecision;
  font-family: var(--px-font) !important;
  /* 0.01em 会把字形推到半像素 → 灰边；像素字体必须整像素落位 */
  letter-spacing: 0;
}
html[data-pixel-ui] img,
html[data-pixel-ui] canvas,
html[data-pixel-ui] video {
  image-rendering: pixelated;
}
html[data-pixel-ui] ::selection {
  background: var(--px-accent-bg);
  color: var(--px-accent-ink);
}
html[data-pixel-ui] :focus-visible {
  outline: 2px solid var(--px-gold) !important;
  outline-offset: 1px;
}
html[data-pixel-ui] {
  accent-color: var(--px-gold);
}

/* 像素动效：闪烁 / 思考条 / 提示进入 / 运行中。全部走 steps 或离散帧。 */
@keyframes px-blink {
  0%, 55% { opacity: 1; }
  56%, 100% { opacity: 0.35; }
}
@keyframes px-toast-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes px-toast-out {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(4px); }
}
@keyframes px-running {
  0%, 100% { border-left-color: var(--px-gold); }
  50% { border-left-color: var(--px-wood-light); }
}

/* 暗角：只保留径向暗角（扫描线在 1.25 DPR 上必糊成灰膜）。 */
html[data-pixel-ui] body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 70%, var(--px-vignette) 100%);
}
@media (prefers-reduced-motion: reduce) {
  html[data-pixel-ui] * {
    transition: none !important;
    animation: none !important;
  }
  html[data-pixel-ui] *::before,
  html[data-pixel-ui] *::after {
    transition: none !important;
    animation: none !important;
  }
}

/* ── 像素滚动条：方、10px、木色 ─────────────────────────────────── */
html[data-pixel-ui] {
  scrollbar-color: var(--px-wood-light) var(--px-wood-darkest);
}
html[data-pixel-ui] ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
html[data-pixel-ui] ::-webkit-scrollbar-track {
  background: var(--px-wood-darkest);
  border-left: 2px solid var(--px-wood-dark);
}
html[data-pixel-ui] ::-webkit-scrollbar-thumb {
  background-color: var(--px-wood-light);
  border: 2px solid var(--px-wood-darkest);
  /* 4×2 的握把，比整条渐变更像像素滚动条 */
  background-image: linear-gradient(var(--px-wood-pale), var(--px-wood-pale));
  background-size: 4px 2px;
  background-position: center;
  background-repeat: no-repeat;
}
html[data-pixel-ui] ::-webkit-scrollbar-thumb:hover {
  background-color: var(--px-wood-pale);
}
html[data-pixel-ui] ::-webkit-scrollbar-thumb:active {
  background-color: var(--px-gold-dark);
}
html[data-pixel-ui] ::-webkit-scrollbar-corner {
  background: var(--px-wood-darkest);
}

/* ── 排版：装饰性文字走像素字体；正文/代码走 mono ────────────────── */
html[data-pixel-ui] h1,
html[data-pixel-ui] h2,
html[data-pixel-ui] h3,
html[data-pixel-ui] h4,
html[data-pixel-ui] summary,
html[data-pixel-ui] button,
html[data-pixel-ui] label,
html[data-pixel-ui] legend,
html[data-pixel-ui] [role='tab'],
html[data-pixel-ui] [role='menuitem'],
html[data-pixel-ui] [role='tooltip'],
html[data-pixel-ui] [role='switch'] {
  font-family: var(--px-font) !important;
  font-variant-ligatures: none;
}
html[data-pixel-ui] h1,
html[data-pixel-ui] h2,
html[data-pixel-ui] h3 {
  color: var(--px-gold-bright) !important;
}
/* 正文/代码层：mono、不加字阴影、长 token 允许断行（像素字体更宽） */
html[data-pixel-ui] pre,
html[data-pixel-ui] code,
html[data-pixel-ui] kbd,
html[data-pixel-ui] textarea,
html[data-pixel-ui] input,
html[data-pixel-ui] p,
html[data-pixel-ui] li,
html[data-pixel-ui] td,
html[data-pixel-ui] th {
  font-family: var(--px-mono) !important;
}
html[data-pixel-ui] p,
html[data-pixel-ui] li {
  overflow-wrap: anywhere;
}
html[data-pixel-ui] li::marker {
  color: var(--px-gold);
}
html[data-pixel-ui] kbd {
  background: var(--px-wood-mid) !important;
  color: var(--px-parchment) !important;
  border: 2px solid var(--px-line) !important;
  padding: 0 4px;
  font-family: var(--px-font) !important;
  font-size: 11px;
  font-variant-ligatures: none;
}
html[data-pixel-ui] mark {
  background: var(--px-gold) !important;
  color: var(--px-accent-ink) !important;
}

/* ── 按钮：默认只继承宿主的底与形（宿主大量图标按钮本来就是透明的），
 * 只把方角、像素字与「按下去掉一档」的反馈补齐；实心块只在悬停/选中时出现。
 * v1.4 给**所有** button 套 2px 黑框 + 内阴影，图标按钮全变成厚盒子，
 * 这是用户报「处处凹陷」的主因之一。 ─────────────────────────────── */
html[data-pixel-ui] button {
  font-size: 12px;
  letter-spacing: 0;
  border: none !important;
  font-variant-ligatures: none;
  transition:
    background-color var(--px-t-fast) var(--px-step-2),
    color var(--px-t-fast) var(--px-step-2),
    transform var(--px-t-fast) var(--px-step-2);
}
/* 主按钮/危险按钮的底色由宿主 token 负责，这里不能再把它们刷成木色，
 * 否则 hover 时深字落在深底上（v1.5.0 的 generic hover 就踩过这个）。
 * 只给「普通按钮」用木色 hover。 */
html[data-pixel-ui] button:not(:disabled):not([class*='primary']):not([class*='Primary']):not([class*='danger']):not([class*='Danger']):hover {
  background-color: var(--px-wood-dark) !important;
}
/* 主按钮：实心块 + 2px 描边；hover 由 --dsw-alias-button-primary-hover 控制，
 * dither 是叠加的 2px 棋盘（不改变底色）。 */
html[data-pixel-ui] button[class*='primary']:hover:not(:disabled),
html[data-pixel-ui] button[class*='Primary']:hover:not(:disabled) {
  background-image: repeating-conic-gradient(
    color-mix(in srgb, var(--px-accent-ink) 10%, transparent) 0 25%,
    transparent 0 50%
  ) !important;
  background-size: 4px 4px !important;
}
/* 按下去只做 1px 的整像素位移，不改布局尺寸；松开即回。 */
html[data-pixel-ui] button:not(:disabled):active {
  transform: translate(1px, 1px);
  transition-duration: 0s;
}
/* 已经按下的切换按钮用木色底 + 金色字，和普通 hover 区分开。
 * 设置页的像素主题按钮自己管理选中态，不能被这条刷掉。 */
html[data-pixel-ui] button[aria-pressed='true']:not(.px-theme-btn) {
  background-color: var(--px-wood-mid) !important;
  color: var(--px-gold-bright) !important;
}
/* 宿主的 primary token 已能上色；这里再兜一层，保证 token 缺失/第三方按钮
 * 也跟随主题，不把宿主默认蓝带进木屋/羊皮纸。 */
html[data-pixel-ui] button[class*='primary'],
html[data-pixel-ui] button[class*='Primary'] {
  background-color: var(--px-accent-bg) !important;
  background-image: none !important;
  color: var(--px-accent-ink) !important;
  border: 2px solid var(--px-line) !important;
}
html[data-pixel-ui] button[class*='primary']:hover:not(:disabled),
html[data-pixel-ui] button[class*='Primary']:hover:not(:disabled) {
  background-color: var(--px-accent-hover) !important;
}
html[data-pixel-ui] button[class*='danger'],
html[data-pixel-ui] button[class*='Danger'] {
  border: 2px solid var(--px-line) !important;
}
html[data-pixel-ui] button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* ── 页签（对话/轨迹/记忆）：文字 + 金下沿，**不加边框**
 * v1.4 给页签套了 2px 黑框，整条读起来像凹陷的输入框（用户报「凹陷了」）。
 * 平面皮肤里「选中」只用颜色 + 一条整像素下边线表达，不做凹凸。 */
html[data-pixel-ui] [role='tab'] {
  position: relative;
  font-size: 13px;
  font-variant-ligatures: none;
  border: none !important;
  border-bottom: 3px solid transparent !important;
  background-color: transparent !important;
  color: var(--px-text-light) !important;
  transition: color var(--px-t-fast) var(--px-step-2);
}
html[data-pixel-ui] [role='tab']::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
  height: 2px;
  background: var(--px-gold);
  pointer-events: none;
  transform: scaleX(0);
  transform-origin: left center;
  transition:
    transform var(--px-t-mid) var(--px-step-4),
    height var(--px-t-fast) var(--px-step-2);
}
html[data-pixel-ui] [role='tab']:hover {
  color: var(--px-text-on-dark) !important;
}
html[data-pixel-ui] [role='tab']:hover::after {
  transform: scaleX(1);
}
html[data-pixel-ui] [role='tab'][aria-selected='true'] {
  color: var(--px-gold-bright) !important;
  background-color: transparent !important;
  border-bottom-color: transparent !important;
}
html[data-pixel-ui] [role='tab'][aria-selected='true']::after {
  height: 3px;
  transform: scaleX(1);
}

/* ── 输入件：黑木底 + 羊皮纸字 + 金框，聚焦金环 ───────────────────
 * 只给「真正的输入面」上底和框，\`select\` 与只读输入保留宿主的形，
 * 否则设置页里成排的选择器全变成黑盒子。 */
html[data-pixel-ui] input:not([type='checkbox']):not([type='radio']),
html[data-pixel-ui] textarea,
html[data-pixel-ui] [contenteditable='true'] {
  font-size: 12px;
  letter-spacing: 0;
  font-variant-ligatures: none;
  color: var(--px-input-text) !important;
  -webkit-text-fill-color: var(--px-input-text) !important;
  caret-color: var(--px-input-caret) !important;
  caret-shape: block;
  background-color: var(--px-input-bg) !important;
  border: 2px solid var(--px-gold-deep) !important;
  transition: border-color var(--px-t-fast) var(--px-step-2);
}
html[data-pixel-ui] input:not([type='checkbox']):not([type='radio']):hover:not(:focus),
html[data-pixel-ui] textarea:hover:not(:focus),
html[data-pixel-ui] [contenteditable='true']:hover:not(:focus) {
  border-color: var(--px-gold-dark) !important;
}
html[data-pixel-ui] input:focus,
html[data-pixel-ui] textarea:focus,
html[data-pixel-ui] [contenteditable='true']:focus {
  border-color: var(--px-gold) !important;
  outline: none !important;
}
html[data-pixel-ui] select {
  color: var(--px-input-text) !important;
  background-color: transparent !important;
  border: 2px solid var(--px-gold-deep) !important;
  transition: border-color var(--px-t-fast) var(--px-step-2);
}
html[data-pixel-ui] select:hover:not(:focus) {
  border-color: var(--px-gold-dark) !important;
}
html[data-pixel-ui] select:focus {
  border-color: var(--px-gold) !important;
  outline: none !important;
}
html[data-pixel-ui] input::placeholder,
html[data-pixel-ui] textarea::placeholder {
  color: var(--px-input-ph) !important;
  -webkit-text-fill-color: var(--px-input-ph) !important;
  opacity: 1;
}
html[data-pixel-ui] [contenteditable='true']:empty::before {
  color: var(--px-input-ph) !important;
  -webkit-text-fill-color: var(--px-input-ph) !important;
}

/* ── 选择件：复选框 / 单选 / 开关 / 滑块 ───────────────────────── */
html[data-pixel-ui] input[type='checkbox'],
html[data-pixel-ui] input[type='radio'] {
  appearance: none;
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  padding: 0;
  flex-shrink: 0;
  background-color: var(--px-input-bg) !important;
  border: 2px solid var(--px-line) !important;
  transition:
    background-color var(--px-t-fast) var(--px-step-2),
    border-color var(--px-t-fast) var(--px-step-2);
}
html[data-pixel-ui] input[type='checkbox']:not(:checked):hover,
html[data-pixel-ui] input[type='radio']:not(:checked):hover {
  border-color: var(--px-gold-dark) !important;
}
html[data-pixel-ui] input[type='checkbox']:checked {
  background-color: var(--px-gold) !important;
  /* 12×12 手绘像素对勾（2px 阶梯），颜色由 --px-check 按主题切换 */
  background-image: var(--px-check) !important;
  background-repeat: no-repeat !important;
  background-position: 3px 1px !important;
  border: 2px solid var(--px-line) !important;
}
html[data-pixel-ui] input[type='radio']:checked {
  background-color: var(--px-gold) !important;
  /* 平色时代没有 inset 灰阶可用：8×8 手绘像素方点，颜色由 --px-radio 切换 */
  background-image: var(--px-radio) !important;
  background-size: 6px 6px !important;
  background-position: 2px 2px !important;
  background-repeat: no-repeat !important;
}
html[data-pixel-ui] select {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 28px !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='8' height='2'/%3E%3Crect x='1' y='2' width='6' height='2'/%3E%3Crect x='2' y='4' width='4' height='2'/%3E%3Crect x='3' y='6' width='2' height='2'/%3E%3C/svg%3E") !important;
  background-repeat: no-repeat !important;
  background-position: right 8px center !important;
}
html[data-pixel-ui] select option {
  background-color: var(--px-input-bg);
  color: var(--px-input-text);
}
html[data-pixel-ui] [role='switch'] {
  border: 2px solid var(--px-line) !important;
  background-color: var(--px-wood-dark) !important;
  transition: border-color var(--px-t-fast) var(--px-step-2), background-color var(--px-t-fast) var(--px-step-2);
}
html[data-pixel-ui] [role='switch']:hover {
  border-color: var(--px-gold-dark) !important;
}
html[data-pixel-ui] input[type='range'] {
  appearance: none;
  -webkit-appearance: none;
  height: 14px;
  padding: 0;
  border: none !important;
  background: transparent !important;
}
html[data-pixel-ui] input[type='range']::-webkit-slider-runnable-track {
  height: 8px;
  border: 2px solid var(--px-line);
  background-color: var(--px-wood-mid);
}
html[data-pixel-ui] input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 12px;
  height: 14px;
  margin-top: -5px;
  background-color: var(--px-gold);
  border: 2px solid var(--px-line);
  transition: background-color var(--px-t-fast) var(--px-step-2);
}
html[data-pixel-ui] input[type='range']::-webkit-slider-thumb:hover {
  background-color: var(--px-gold-bright);
}
html[data-pixel-ui] input[type='range']::-moz-range-track {
  height: 8px;
  border: 2px solid var(--px-line);
  background: var(--px-wood-mid);
}
html[data-pixel-ui] input[type='range']::-moz-range-thumb {
  width: 12px;
  height: 14px;
  background-color: var(--px-gold);
  border: 2px solid var(--px-line);
  border-radius: 0;
}

/* ── 内容层：代码块 / 行内代码 / 引用 / 表格 / 分隔线 ─────────────── */
html[data-pixel-ui] pre {
  background: var(--px-code-bg) !important;
  color: var(--px-text-on-dark) !important;
  border: 2px solid var(--px-wood-light) !important;
  border-left: 4px solid var(--px-gold-deep) !important;
}
/* 代码块顶栏：像终端窗口的 title bar，2px 底线 + 左侧金色方块。 */
html[data-pixel-ui] [data-code-block-banner] {
  background-color: var(--px-wood-mid) !important;
  color: var(--px-text-light) !important;
  border-bottom: 2px solid var(--px-line) !important;
  border-left: 4px solid var(--px-gold) !important;
  font-family: var(--px-font) !important;
  font-size: 11px;
  letter-spacing: 0;
  font-variant-ligatures: none;
}
html[data-pixel-ui] [data-code-block-banner] button {
  background: transparent !important;
  color: var(--px-text-on-dark) !important;
  border: none !important;
  padding: 0 4px;
}
html[data-pixel-ui] code {
  background: var(--px-code-bg) !important;
  color: var(--px-code-ink) !important;
  border: none !important;
  padding: 0 3px;
}
html[data-pixel-ui] pre code {
  background: transparent !important;
  color: inherit !important;
  padding: 0;
}
html[data-pixel-ui] blockquote {
  border: 2px solid var(--px-wood-light) !important;
  border-left: 4px solid var(--px-gold) !important;
  background-color: var(--px-wood-dark) !important;
  background-image: repeating-conic-gradient(
    color-mix(in srgb, var(--px-gold) 5%, transparent) 0 25%,
    transparent 0 50%
  ) !important;
  background-size: 4px 4px !important;
  color: var(--px-text-on-dark) !important;
  padding: 6px 10px;
}
html[data-pixel-ui] hr {
  border: none !important;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    var(--px-wood-light) 0 2px,
    transparent 2px 4px
  ) !important;
}
html[data-pixel-ui] table {
  border: 2px solid var(--px-wood-warm) !important;
  border-collapse: collapse;
}
html[data-pixel-ui] tbody tr:nth-child(even) td {
  background-color: color-mix(in srgb, var(--px-wood-mid) 32%, transparent) !important;
}
html[data-pixel-ui] tbody tr:hover td {
  background-color: var(--px-wood-mid) !important;
}
html[data-pixel-ui] th {
  background-color: var(--px-wood-warm) !important;
  color: var(--px-ink-on-mid) !important;
  font-family: var(--px-font) !important;
  font-size: 12px;
  border: 1px solid var(--px-wood-light) !important;
}
html[data-pixel-ui] td {
  border: 1px solid var(--px-wood-light) !important;
}
html[data-pixel-ui] a {
  color: var(--px-gold-bright) !important;
  text-decoration-color: var(--px-gold-dark);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  transition: color var(--px-t-fast) var(--px-step-2);
}
html[data-pixel-ui] a:hover {
  color: var(--px-gold) !important;
}
html[data-pixel-ui] summary {
  cursor: pointer;
  color: var(--px-gold-bright) !important;
  transition: color var(--px-t-fast) var(--px-step-2);
}
html[data-pixel-ui] summary:hover {
  color: var(--px-gold) !important;
}

/* ── 工具提示 / 菜单 / 状态条 ──────────────────────────────────── */
html[data-pixel-ui] [role='tooltip'] {
  font-size: 11px;
  line-height: 1.6;
  color: var(--px-parchment) !important;
  background: var(--px-tooltip-bg) !important;
  border: 2px solid var(--px-gold-deep) !important;
  background-image:
    linear-gradient(var(--px-gold), var(--px-gold)),
    linear-gradient(var(--px-gold), var(--px-gold)) !important;
  background-size: 6px 2px, 2px 6px !important;
  background-position: 0 0, 0 0 !important;
  background-repeat: no-repeat !important;
}
html[data-pixel-ui] [data-menu-material],
html[data-pixel-ui] [role='menu'] {
  border: 2px solid var(--px-line) !important;
}
html[data-pixel-ui] [role='menuitem']:hover,
html[data-pixel-ui] [role='option']:hover,
html[data-pixel-ui] [role='treeitem']:hover {
  background-color: var(--px-wood-mid) !important;
}
html[data-pixel-ui] [role='treeitem'][aria-selected='true'] {
  background-color: var(--px-wood-dark) !important;
  background-image: linear-gradient(var(--px-gold), var(--px-gold));
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 2px 100%;
  color: var(--px-gold-bright) !important;
}
/* 已选中的会话行也要有 hover 反馈：宿主把 selected 和 hover 写成同一个背景，
 * 我们的 selected 规则又在 hover 之后，不补这一条就会出现「悬停完全没反应」。 */
html[data-pixel-ui] [role='treeitem'][aria-selected='true']:hover {
  background-color: var(--px-wood-mid) !important;
}
/* 未选中的会话/项目行：hover 时补 2px 金色左侧条，别只靠一档底色。 */
html[data-pixel-ui] [role='treeitem']:hover:not([aria-selected='true']) {
  background-image: linear-gradient(var(--px-gold-deep), var(--px-gold-deep));
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 2px 100%;
  color: var(--px-parchment) !important;
}
html[data-pixel-ui] [role='menuitem'][aria-current='page'] {
  background-color: var(--px-wood-dark) !important;
  background-image: linear-gradient(var(--px-gold), var(--px-gold));
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 3px 100%;
  color: var(--px-gold-bright) !important;
}
/* 侧栏/列表的当前项：3px 金色左条，不占布局。 */
html[data-pixel-ui] [aria-current='page'] {
  background-image: linear-gradient(var(--px-gold), var(--px-gold));
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 3px 100%;
}
/* 吸顶分组标题：粘住时补 2px 底线，和滚动内容分开。 */
html[data-pixel-ui] [data-stuck] {
  border-bottom: 2px solid var(--px-wood-light) !important;
  background-image: repeating-conic-gradient(
    color-mix(in srgb, var(--px-gold) 5%, transparent) 0 25%,
    transparent 0 50%
  ) !important;
  background-size: 4px 4px !important;
}
/* 终端块 / diff 卡片：左侧运行条 + 代码块同款描边。 */
html[data-pixel-ui] [data-terminal] {
  border: 2px solid var(--px-wood-light) !important;
}
html[data-pixel-ui] [data-terminal][data-running] {
  border-left: 3px solid var(--px-gold) !important;
  animation: px-running 1.1s steps(2, end) infinite;
}
html[data-pixel-ui] [data-diff] {
  border-left: 4px solid var(--px-gold-deep) !important;
}
/* 标签：左侧 2px 色条代替圆角/渐变；色条落在原有 8px 内边距里，不改宽。 */
html[data-pixel-ui] [data-tone] {
  border-radius: 0 !important;
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-position: 0 center;
  background-size: 2px calc(100% - 4px);
}

/* ── 反馈层：toast / dialog / 思考中 / 状态点 ───────────────────── */
html[data-pixel-ui] [role='alert'] {
  border: 2px solid var(--px-line) !important;
  border-left: 4px solid var(--px-gold) !important;
  background-color: var(--px-tooltip-bg) !important;
  color: var(--px-parchment) !important;
  animation: px-toast-in var(--px-t-slow) steps(3, end) both;
}
html[data-pixel-ui] [role='alert'][data-closing] {
  animation: px-toast-out 120ms steps(2, end) both;
}
html[data-pixel-ui] [role='dialog'] {
  border: 2px solid var(--px-line) !important;
  background-image:
    linear-gradient(var(--px-gold), var(--px-gold)),
    linear-gradient(var(--px-gold), var(--px-gold)),
    linear-gradient(var(--px-gold), var(--px-gold)),
    linear-gradient(var(--px-gold), var(--px-gold)) !important;
  background-size: 10px 2px, 2px 10px, 10px 2px, 2px 10px !important;
  background-position: 0 0, 0 0, 100% 100%, 100% 100% !important;
  background-repeat: no-repeat !important;
}
/* 思考中的行：保留宿主文字，但把 1.5s 的平滑扫光改成 4 帧阶梯，
 * 并在左侧补一条 2px 的闪烁光标（位置由宿主 decoration 承担，不加布局）。 */
html[data-pixel-ui] [data-shimmer] {
  position: relative;
}
html[data-pixel-ui] [data-shimmer] > [aria-hidden='true'] {
  background-image: linear-gradient(var(--px-gold), var(--px-gold));
  background-size: 2px 100%;
  background-position: 0 0;
  background-repeat: no-repeat;
  animation: px-blink 1.2s steps(1, end) infinite;
}
html[data-pixel-ui] [data-shimmer] > [aria-hidden='true'] * {
  color: var(--px-gold) !important;
  animation-duration: 1.2s !important;
  animation-timing-function: steps(4, end) !important;
}
html[data-pixel-ui] span[data-state='ongoing'] {
  animation: px-blink 1.1s steps(1, end) infinite;
}
html[data-pixel-ui] [data-state='ongoing'] * {
  animation-timing-function: steps(8, end) !important;
}

/* ── 像素光标（SVG data-URI 阶梯箭头） ──────────────────────────── */
html[data-pixel-ui] body {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Cpath d='M2 2v17h3v-3h3v-3h3v-3h3v-3h3V2z' fill='%23FFFDF5' stroke='%231A0F06' stroke-width='2'/%3E%3C/svg%3E") 2 2, auto;
}
/* 浅色纸面：白填充的箭头会和纸面糊在一起，换成深棕填充 + 纸白描边。 */
html[data-pixel-theme='pixel-paper'] body {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Cpath d='M2 2v17h3v-3h3v-3h3v-3h3v-3h3V2z' fill='%233A2A10' stroke='%23FFFDF5' stroke-width='2'/%3E%3C/svg%3E") 2 2, auto;
}
html[data-pixel-ui] button,
html[data-pixel-ui] a,
html[data-pixel-ui] select,
html[data-pixel-ui] [role='tab'],
html[data-pixel-ui] [role='menuitem'],
html[data-pixel-ui] [role='switch'],
html[data-pixel-ui] [role='treeitem'],
html[data-pixel-ui] [role='option'],
html[data-pixel-ui] [role='button'],
html[data-pixel-ui] [role='link'],
html[data-pixel-ui] [aria-selected],
html[data-pixel-ui] [aria-current] {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Cpath d='M2 2v17h3v-3h3v-3h3v-3h3v-3h3V2z' fill='%23F4D03F' stroke='%231A0F06' stroke-width='2'/%3E%3C/svg%3E") 2 2, pointer;
}
/* 宿主的 .sessionRow / .projectRow 只在行上写 cursor:pointer；子 span 若被
 * 宿主另写 cursor 会导致箭头/默认小手混用。让可交互行内的非文本子元素继承
 * 同一个像素手，输入框和 contenteditable 保持像素 I-beam。 */
html[data-pixel-ui] :is(button, a, select, [role='tab'], [role='menuitem'], [role='switch'], [role='treeitem'], [role='option'], [role='button'], [role='link']) *:not(input):not(textarea):not([contenteditable='true']) {
  cursor: inherit !important;
}
html[data-pixel-ui] input,
html[data-pixel-ui] textarea,
html[data-pixel-ui] [contenteditable='true'] {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Cpath d='M5 3h4v2h2v2h2v2h2v2h2v2h2v6h-2v2h-4v2H5z' fill='%23FFFDF5' stroke='%231A0F06' stroke-width='2'/%3E%3C/svg%3E") 4 3, text;
}

/* ── 设置页「像素主题」行 ─────────────────────────────────────────
 * 这一段**不跟随皮肤作用域**：像素主题激活时用 --px-* 值，
 * 现代默认（浅色/深色/跟随系统）回落到 --dsw-alias-* 宿主 token，
 * 保证行在任何外观下都清晰可点、对比度达标。
 * 触摸目标 ≥32px（WCAG 2.2 web 目标 24px 之上留手感余量）。 */
.px-theme-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 0;
  border-top: 2px solid var(--px-wood-pale, var(--dsw-alias-border-l2, #6b5a3a));
}
.px-theme-row-title {
  font-family: var(--px-font, inherit);
  font-size: 12px;
  font-variant-ligatures: none;
  color: var(--px-gold-bright, var(--dsw-alias-label-primary));
}
.px-theme-row-desc {
  font-size: 11px;
  line-height: 1.6;
  color: var(--px-text-light, var(--dsw-alias-label-secondary));
}
.px-theme-row-cubes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.px-theme-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  padding: 6px 12px;
  font-family: var(--px-font, inherit);
  font-size: 11px;
  font-variant-ligatures: none;
  color: var(--px-text-on-dark, var(--dsw-alias-label-primary));
  background-color: var(--px-wood-dark, var(--dsw-alias-bg-layer-1));
  border: 2px solid var(--px-wood-darkest, var(--dsw-alias-border-l1));
  border-radius: 0 !important;
  cursor: pointer;
  transition:
    transform var(--px-t-fast, 80ms) steps(2, end),
    background-color var(--px-t-fast, 80ms) steps(2, end),
    background-image var(--px-t-fast, 80ms) steps(2, end);
}
.px-theme-btn:hover {
  background-color: var(--px-wood-mid, var(--dsw-alias-bg-layer-2));
  background-image: repeating-conic-gradient(
    color-mix(in srgb, var(--px-gold, #F4D03F) 7%, transparent) 0 25%,
    transparent 0 50%
  );
  background-size: 4px 4px;
}
.px-theme-btn:active {
  transform: translate(1px, 1px);
  transition-duration: 0s;
}
.px-theme-btn:focus-visible {
  outline: 2px solid var(--px-gold, var(--dsw-alias-state-business-primary, currentColor));
  outline-offset: 2px;
}
.px-theme-btn-active {
  color: var(--px-accent-ink, var(--dsw-alias-label-on-accent, #fff));
  background-color: var(--px-accent-bg, var(--dsw-alias-brand-primary));
  background-image: repeating-conic-gradient(
    color-mix(in srgb, var(--px-accent-ink, #1A0F06) 8%, transparent) 0 25%,
    transparent 0 50%
  );
  background-size: 4px 4px;
  border-color: var(--px-gold-deep, var(--dsw-alias-border-l2));
}
.px-theme-btn-active:hover {
  background-color: var(--px-accent-hover, var(--dsw-alias-button-primary-hover, var(--px-accent-bg)));
}
.px-theme-swatch {
  width: 10px;
  height: 10px;
  border: 2px solid #000;
  flex-shrink: 0;
}
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

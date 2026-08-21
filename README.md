# 🪵 dsh-pixel-ui

> DeepSeek Harness 像素皮肤（Agent Xi 风格）：四个主题一键切换——像素·木屋 / 像素·羊皮纸 / 像素·暖阳 / 像素·终端绿，随时可切回现代默认 UI。

![License: MIT](https://img.shields.io/badge/license-MIT-brightgreen)
![dsh](https://img.shields.io/badge/dsh-0.1.0--rc.7-blue)
![version](https://img.shields.io/badge/version-1.1.0-F4D03F)
![themes](https://img.shields.io/badge/themes-4-orange)

---

## Overview
<p align="center">
  <img src="./assets/screenshot-wood.png" alt="像素·木屋（默认主题）" width="760" />
</p>

`dsh-pixel-ui` 是一个**皮肤插件**，把 dsh Web GUI 重皮肤成像素 RPG 风：

1. **四个主题**：像素·木屋（深木 + 金）、像素·羊皮纸（浅色纸面 + 金棕）、像素·暖阳（暖橙木）、像素·终端绿（CRT 绿字），色板与 Agent Xi 主题系统同源；
2. **像素质感**：阶梯硬阴影、8-bit 凸起按钮、内凹输入框、木纹条纹、CRT 扫描线 + 暗角、像素光标；
3. **像素字体**：标题/页签/按钮/徽章/输入框用 fusion-pixel（中文）+ Press Start 2P（英文数字），正文与代码走 mono，长文不累眼。

**适合谁**：想要像素风 / 星露谷风 / 复古终端外观的 dsh 用户；想给会话截图加一点氛围感的博主和开发者。


## Themes

### 像素·木屋 · `pixel-wood`

> 深色 · 深木 `#1A0F06` + 金 `#F4D03F`（默认主题）

<img src="./assets/screenshot-wood.png" alt="像素·木屋" width="100%" />

### 像素·羊皮纸 · `pixel-paper`

> 浅色 · 纸面 `#F0E8D8` + 金棕 `#C8960C`

<img src="./assets/screenshot-paper.png" alt="像素·羊皮纸" width="100%" />

### 像素·暖阳 · `pixel-warm`

> 深色 · 暖木 `#1E0E04` + 橙 `#FF8C42`

<img src="./assets/screenshot-warm.png" alt="像素·暖阳" width="100%" />

### 像素·终端绿 · `pixel-retro`

> 深色 · 墨绿 `#0A0E0A` + 绿 `#33FF33`

<img src="./assets/screenshot-retro.png" alt="像素·终端绿" width="100%" />

<details>
<summary>📷 对话页与输入框（展开查看四主题截图）</summary>

<img src="./assets/screenshot-wood-chat.png" alt="木屋对话页" width="100%" />
<img src="./assets/screenshot-paper-chat.png" alt="羊皮纸对话页" width="100%" />
<img src="./assets/screenshot-warm-chat.png" alt="暖阳对话页" width="100%" />
<img src="./assets/screenshot-retro-chat.png" alt="终端绿对话页" width="100%" />

</details>

## Compatibility

| 项 | 支持范围 |
| --- | --- |
| dsh 生态 | `0.1.0-rc.6` ~ `0.1.0-rc.7`（ThemeService `register`/`setTheme` + `settings.general.item` 槽位；rc.6 最后实机验证 2026-08-14，rc.7 对应 DSH Desktop 2.0.1 内置内核） |
| DSH Desktop | 2.0.x（web 兼容模式/高级模式均适用；见下方「DSH Desktop 固定端口」） |
| 模式 | 三深色 + 一浅色（`colorScheme` 按主题声明） |
| 浏览器 | 现代 Chromium / Firefox（`localStorage` + CSS 变量 + SVG 光标） |
| 字体 | fusion-pixel 12px zh_hans（MIT）+ Press Start 2P（OFL），随包分发 |

## Install / Uninstall

### Install

npm（推荐）：

```bash
dsh plugin add dsh-pixel-ui
```

GitHub Releases（无需 npm，同样开箱即用）：

```bash
# 下载 Releases 里的 dsh-pixel-ui-<version>.tgz
dsh plugin add ./dsh-pixel-ui-1.1.0.tgz
```

GitHub 源码（构建产物已随仓库提交，无需构建）：

```bash
dsh plugin add github:zhang66633/dsh-pixel-ui
```

本地开发（link 方式）：

```jsonc
// <profile>/package.json
{
  "dependencies": { "dsh-pixel-ui": "link:<仓库路径>" },
  "dsh": { "profile": { "bundles": ["dsh-pixel-ui"] } }
}
```

```bash
cd <profile> && pnpm install
```

安装后重启 dsh / DSH Desktop，皮肤才会进入 Loader 组合。

#### DSH Desktop 用户

1. 托盘右键 → **Open DSH Terminal**，在终端里执行 `dsh plugin add dsh-pixel-ui`（自动作用于当前 profile，如 `desktop`）；
2. 退出并重新打开 DSH Desktop。

#### DSH Desktop 固定端口（主题记忆）

DSH Desktop 默认每次启动随机分配本地 Web 端口，浏览器的 `localStorage` 按 origin（含端口）隔离——**不固定端口时，像素主题的选择会在重启后回到默认「像素·木屋」**。需要记住选择时，请在 DSH Desktop 设置中为 `dsh-desktop.port` 指定一个固定端口（例如 `43189`），保存后应用会自动重启。

### Upgrade

- npm：重新运行 `dsh plugin add`（固定版本号）；
- 本地 link：`git pull` 后重新构建（`npm run build`），刷新浏览器。

### Disable

只从 `dsh.profile.bundles` 移除 `dsh-pixel-ui`（依赖可以保留）——皮肤不再注入，UI 回到现代默认。

### Uninstall

从 profile `package.json` 移除依赖与 bundles 条目，`pnpm install`。

## Quick start

1. 安装后重启 dsh / DSH Desktop；
2. 首次加载自动激活默认主题「像素·木屋」；
3. 设置 → 通用 → **像素主题**，五个按钮一键切换四个皮肤和「现代默认」；
4. 选「现代默认」（或外观行选 浅色 / 深色 / 跟随系统）即整体退出皮肤，选择会被记住，下次打开不复活。

最小可复现示例：安装 → 重启 → 木屋主题上身 → 切换到「像素·羊皮纸」→ 输入框文字清晰可读 → 点「现代默认」→ 页面立即回到现代 UI → 刷新页面仍是现代 UI。

## Configuration

- **无配置项**：四个主题的 13 个 `--dsw-alias-*` token 定义在 `src/client/index.js` 的 `THEMES`，像素质感样式在 `src/client/pixel.css`；
- **默认主题**：`pixel-wood`（仅首次安装时自动激活，之后尊重你的选择）；
- **持久化**：最后的选择存于浏览器 `localStorage` 的 `dsh-pixel-ui:theme`；DSH Desktop 需固定本地端口（见「DSH Desktop 固定端口」）。
- 无环境变量、无敏感项。

## Permissions & data

- 宿主进程：**只读**本包内字体文件，仅注册一个 `/dsh-pixel-ui/fonts/*` 路由（文件名白名单，无路径穿越）；
- 浏览器半边：注册主题 + 注入样式表 + 一个设置行；无网络请求、无遥测、不读凭据，只在 `localStorage` 存一个主题 id。

## Troubleshooting

| 现象 | 处理 |
| --- | --- |
| 皮肤没生效 | `dsh --profile <name> --dump-config`（DSH Desktop 终端里直接 `dsh --dump-config`）确认 `dsh-pixel-ui` 在树；设置 → 通用 → 像素主题 里选一个主题；重启 |
| 想回现代默认 | 设置 → 通用 → 像素主题 → 点「现代默认」（或外观行选 浅色/深色/跟随系统） |
| 字体没加载 | 浏览器控制台（F12 → Network）看 `/dsh-pixel-ui/fonts/*` 是否 200 |
| 主题没记住 | 确认浏览器未禁用 `localStorage`；DSH Desktop 下先确认已配置固定端口（`dsh-desktop.port`） |
| 回滚 | 从 `dsh.profile.bundles` 移除插件条目并 `pnpm install` —— profile 其余部分不受影响 |

## Development

```bash
npm install
npm run build   # 构建 lib/client.js（wire 格式，CSS 以文本内联）
```

改动皮肤后重新构建并刷新浏览器即可（link 安装方式下无需重启 dsh）。欢迎 PR；行为变更请同步更新 README。

## License & security

[MIT](./LICENSE) © 2026 zhang66633 · 字体：fusion-pixel（MIT）、Press Start 2P（SIL OFL）。

安全问题请通过 GitHub **security advisory** 私下报告，不要发公开 issue。

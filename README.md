# dsh-pixel-ui

> DeepSeek Harness 像素皮肤：深木色面板 + 金色描边 + 羊皮纸文字，fusion-pixel 中文像素字体 + Press Start 2P 英文像素字体。仅深色模式。

## Overview

`dsh-pixel-ui` 是一个 dsh 皮肤插件，把 Web GUI 重皮肤成像素 RPG 风：

- **颜色**：深木色系（`#1A0F06 → #8B6B45`）打底，金色 `#F4D03F` 做强调，羊皮纸 `#F5E6C8` 做正文
- **像素字体**：标题/页签/按钮/徽章用 fusion-pixel（中文）+ Press Start 2P（英文/数字），正文保持系统字体保证可读性
- **质感**：8-bit 凸起按钮（硬边阴影、按下下沉）、内凹输入框、面板硬边框 + 右下硬阴影、方形像素滚动条
- **克制**：像素化集中在外壳（边框/页签/按钮），内容区保持可读——「边框像素化、内容现代化」

安装后自动激活；想切回默认，在主题设置里选 `dark` 即可（插件会监听主题切换，只在 pixel-wood 激活时注入像素样式）。

## Compatibility

| 项 | 支持范围 |
| --- | --- |
| dsh 生态 | `0.1.0-rc.6`（ThemeService `register`/`setTheme` seam） |
| 模式 | 仅深色（`colorScheme: dark`） |
| 字体 | fusion-pixel 12px zh_hans（MIT）+ Press Start 2P（OFL），随包分发 |

## Install

```bash
dsh plugin --profile web add dsh-pixel-ui     # npm 发布后
# 本地开发：profile package.json 加 "dependencies": { "dsh-pixel-ui": "link:<本仓库>" }
#            + dsh.profile.bundles 加 "dsh-pixel-ui"，然后 pnpm install
```

## Uninstall

从 profile `package.json` 移除依赖与 bundles 条目，`pnpm install`。

## Configuration

无配置项。主题 id 为 `pixel-wood`；深木色板定义在 `src/client/index.js` 的 `THEME_TOKENS`（13 个 `--dsw-alias-*` token），像素质感样式在 `src/client/pixel.css`（`html[data-pixel-ui]` 作用域）。

## Permissions & data

- 宿主半边只读本包内字体文件，仅注册一个 `/dsh-pixel-ui/fonts/*` 路由（文件名白名单）
- 浏览器半边只注册主题 + 注入样式表，无网络请求、无遥测、不读任何数据

## Troubleshooting

| 现象 | 处理 |
| --- | --- |
| 皮肤没生效 | `dsh --profile web --dump-config` 确认 `dsh-pixel-ui` 在树；设置里确认主题为 `pixel-wood`；重启 |
| 字体没加载 | 浏览器控制台看 `/dsh-pixel-ui/fonts/*` 是否 200 |
| 想回默认 | 主题设置选 `dark`；卸载走上面的步骤 |

## Development

```bash
npm install
npm run build      # 构建 lib/client.js（wire 格式，CSS 以文本内联）
```

## License & security

[MIT](./LICENSE) · 字体：fusion-pixel（MIT）、Press Start 2P（SIL OFL）。

安全问题请通过 GitHub security advisory 私下报告。

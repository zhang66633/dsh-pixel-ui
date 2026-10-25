# dsh-pixel-ui · 开发文档

> 规则②：每个项目必须建立并维护开发文档文件夹。本目录记录开发计划、迭代过程与踩坑记录。
> 推论（用户原话的深层理由）：**把「为什么」记录下来比把代码写完更重要**——决策理由、踩过的坑、验证过的结论要随时可查。

## 目录

| 文件 | 内容 |
| --- | --- |
| [开发计划.md](./开发计划.md) | 当前版本的目标、范围、架构图（mermaid）与验收标准 |
| [迭代记录.md](./迭代记录.md) | 每次改动的动机、决策与验证结果（倒序） |
| [踩坑记录.md](./踩坑记录.md) | 环境/框架/工具链踩坑与规避方式，带复现条件 |

## 项目速览

- **形态**：DSH 客户端皮肤插件（dual-face：node 半边服务字体 + 偏好持久化，browser 半边注册四主题 + 注入样式表 + 设置行）。
- **契约来源**：`@deepseek-ai/dsh-client-ui-theme`（ThemeService）、`dsh-client-ui-slots`（`settings.general.item` 槽位）、`dsh-client-store`（`defineStore`）、`dsh-host-webserver`（路由）、`dsh-home-paths`（`$DSH_HOME` 解析）。
- **当前支持**：dsh `0.1.0-rc.6` ~ `0.2.x`（`dsh.compatibility.dshReleases` 逐版登记；`0.2.1-rc.3` 已核对并登记）。`engines.dsh` 与 `@deepseek-ai/dsh-*` peers 同时声明：0.2.1 的 app-boot 优先读 `engines.dsh`，dshmarket 发现页把两者取交集。`npm run test:compat` 是声明门禁。
- **0.2.1 客户端基线**：`dsh-client-store` / `dsh-client-ui-slots` / `dsh-client-ui-primitives` / `dsh-client-ui-dockkit` 不再作为 `node_modules` 包分发，而是由 Web 前端的静态模块表提供；插件 bundle 的 `require` 仍按同名解析，`dsh.client.inject` 的包名顺序照旧。

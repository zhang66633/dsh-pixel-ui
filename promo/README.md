# 宣传动画 · 蓝色肥鱼女仆的换装间

26.8 秒，1920×1080，H.264 + AAC，九套主题；主角是项目里的蓝色鲸鱼女仆，剧情是她在更衣间里
一套套换装，身后的 DSH 窗口同步换肤，最后落到安装命令。

- [MP4](./dsh-pixel-ui-promo.mp4)
- [GIF 预告（7 秒）](./teaser.gif)
- [封面](./poster.png)
- [可交互页面](./index.html)：浏览器直接打开即可播放；`?t=3000` 定格到 3 秒，`?record=1` 录屏

## 剧情 / 时间线

| 时间 | 场景 |
| --- | --- |
| 0.0–1.4s | 标题「给代码换一套衣服」+ 9 套主题副标题 |
| 1.4–3.8s | 像素·木屋：深木 + 暖金 |
| 3.8–6.2s | 像素·羊皮纸：纸面 + 金棕 |
| 6.2–8.6s | 像素·暖阳：暖橙 + 木纹 |
| 8.6–11.0s | 像素·终端绿：墨绿 + 荧光 |
| 11.0–13.4s | 像素·全息：深蓝 + 青霓 |
| 13.4–15.8s | 像素·南瓜灯：暗橙 + 暖金 |
| 15.8–18.2s | 像素·便签本：纸色 + 深棕 |
| 18.2–20.6s | 像素·云石：板岩 + 白石 |
| 20.6–23.0s | 像素·秘银：靛紫 + 银蓝 |
| 23.0–25.6s | 「9 套主题 / 随时换装」+ 安装命令 + 9 色色板 |
| 25.6–26.8s | 收尾 |

每个主题 2.4 秒：角色卡从左侧滑入（仅第一场），换装用 0.55 秒的竖向像素擦除；
右侧是主题名、英文、三条配色、一个会换色的 DSH 窗口模拟、底部 9 格进度条。

## 素材

### 主角

`chars/wood.webp` 是用户提供的模板（蓝发鲸鱼女仆、棕色女仆装、完整蕾丝头饰）。
其余 8 套以它为参考，用火山方舟 Seedream **图生图**生成，保持脸、发型、鲸鱼耳、尾巴、
白色蕾丝头饰、围裙、坐姿、构图和光影不变，只换女仆装配色：

| 主题 | 服装提示词（节选） | 模型 |
| --- | --- | --- |
| 木屋 | 棕色女仆装 + 奶油围裙 + 金色滚边 | 用户模板 |
| 羊皮纸 | 奶油白羊皮纸色 + 浅金棕裙摆 + 金色蝴蝶结 | Seedream 5.0 pro |
| 暖阳 | 暖橙上衣 + 锈红裙摆 + 橙色蝴蝶结 | Seedream 5.0 pro |
| 终端绿 | 墨绿 + 荧光绿裙摆 + 亮绿蝴蝶结 | Seedream 4.0 |
| 全息 | 深海军蓝 + 青色发光滚边 + 银色全息饰边 | Seedream 4.0 |
| 南瓜灯 | 焦糖橙 + 深棕 + 藤蔓暗纹 + 暖金滚边 | Seedream 4.0 |
| 便签本 | 奶油纸色 + 浅棕铅笔色蝴蝶结 + 装订线细节 | Seedream 4.0 |
| 云石 | 板岩蓝灰 + 白石色蕾丝/围裙 + 钢青蝴蝶结 | Seedream 4.0 |
| 秘银 | 靛紫 + 银蓝金属滚边 + 紫色高光 | Seedream 4.0 |

生成时统一使用完整提示词（见 `docs/dev/迭代记录.md` 的宣传动画条目）：
“严格以参考图为模板：保持……完全不变，只更换女仆装的配色为：……。
仍是同一件长袖女仆装版型，只换颜色、滚边和少量暗纹。纯白背景，不要文字、边框、水印，
只输出一个角色。”

### 为什么是白底 + multiply

素材保持白底，不抠图。画布把角色以 `globalCompositeOperation = 'multiply'` 叠到奶油色卡纸上：
白色背景会变成卡纸色，蕾丝、围裙的白边不会被“抠掉”，也不会出现标签遮挡留下的缺口。
最初版本对四格图做白色 flood-fill，结果白色蕾丝与背景连在一起，头饰右上角被吃出一个洞；
改用用户提供的新模板 + 生成九套后彻底解决。

## 重新渲染

依赖：

- Node 24（页面与录制脚本）
- Microsoft Edge（headless 录制）
- ffmpeg 7.x。**注意**：本机 PATH 里有一个 2013 年的 ffmpeg（N-55702），不支持 VP9 解码；
  用 imageio-ffmpeg 自带的 7.1：
  `C:\Users\lenovo\AppData\Roaming\Python\Python314\site-packages\imageio_ffmpeg\binaries\ffmpeg-win-x86_64-v7.1.exe`

步骤：

```bash
# 1) 音乐（在 promo/ 目录下运行，生成 music.wav；已有 music.mp3 可跳过）
python music.py

# 2) 录制：Edge headless + MediaRecorder + 本地 8765 上传
#    产物 TEMP/promo.webm；脚本自动结束 Edge
node record.mjs

# 3) 合成 MP4（换成你的 ffmpeg 7 路径）
ffmpeg -i TEMP/promo.webm -i promo/music.mp3 \
  -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
  -c:a aac -b:a 160k -shortest promo/dsh-pixel-ui-promo.mp4

# 4) GIF 预告（可选）
ffmpeg -ss 0 -t 7 -i promo/dsh-pixel-ui-promo.mp4 \
  -vf "fps=12,scale=800:-1:flags=lanczos,palettegen=max_colors=128" -y TEMP/palette.png
ffmpeg -ss 0 -t 7 -i promo/dsh-pixel-ui-promo.mp4 -i TEMP/palette.png \
  -lavfi "fps=12,scale=800:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=4" \
  -y promo/teaser.gif
```

页面本身零构建：`promo/index.html` + `chars/*.webp` + 字体（`../assets/fonts`）即可。
修改每套主题的停留时长，调 `index.html` 里的 `SLOT = 2.4`；总长 `DURATION` 会自动重算。

## 状态录像（v1.12.0）

- [state-tour.mp4](./state-tour.mp4)：18 秒，1600×1000，九套主题 × normal / hover / pressed / focus
- [state-tour.gif](./state-tour.gif)：800×500 预览
- [state-matrix.png](./state-matrix.png)：9×4 状态矩阵

做法：`state-board.html` 用真实皮肤 CSS，把 `:hover` / `:active` / `:focus-visible` 替换成
`:is(:hover, .px-force-hover)` 等，按 `?theme=&state=&asset=` 给对应元素加 class，再用
Edge headless 逐帧截图；**这是 forced-state 演示，不是真实宿主截图**。真实宿主
`http://127.0.0.1:63819/` 需要 `dsh web` 打印的带 token URL（token 只在该进程内存里），
拿到后再回填真机截图。

## 备注

- 角色图由用户提供/确认；Complete UI 的切片仍按 CC BY 4.0 署名（见仓库根 `README.md`）。
- 音乐是脚本生成的 120 BPM 芯片音（Am–F–C–G 琶音 + 三角波贝斯 + 噪声踩镲），无外部音源。
- 5.0 pro 在生成 paper/warm 后返回 `AccountOverdueError`，之后改用 4.0；4.5 的模型 ID
  在当前 API Key 下不存在（`/api/v3/models` 里只有 4.0、5.0 pro/flash）。

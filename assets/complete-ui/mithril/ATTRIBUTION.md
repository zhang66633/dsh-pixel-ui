# Complete UI Essential Pack · MysticWood theme

Selected sprites from **Complete UI Essential Pack v2.4** by
**Crusenho Agus Hennihuno** (<https://crusenho.itch.io>), used under the
**Creative Commons Attribution 4.0 International (CC BY 4.0)** license:
<https://creativecommons.org/licenses/by/4.0/>.

The sprites are used unmodified as 9-slice textures in the `pixel-mithril`
theme. They are inlined into the client bundle as data URIs at build time
(`scripts/asset-inline.mjs`).

- Original pack: Complete UI Essential Pack v2.4
- Theme: `10_MysticWood_Theme`
- License text: `LICENSE.txt` in this directory.

| Local file | Source sprite | Role |
| --- | --- | --- |
| `panel.png` | `UI_MysticWood_Frame_Lite_01a.png` | dialog + menu frame (32×32, slice 6) |
| `button.png` | `UI_MysticWood_Button_Large_01a1.png` | primary button (rest) |
| `button-hover.png` | `UI_MysticWood_Button_Large_01a2.png` | primary button (hover) |
| `button-press.png` | `UI_MysticWood_Button_Large_01a3.png` | primary button (pressed) |
| `icon-button.png` | `UI_MysticWood_Button_Small_01a1.png` | icon-only primary button |
| `input.png` | `UI_MysticWood_Textfield_01a.png` | text field |
| `select.png` | `UI_MysticWood_Select_01a1.png` | selected row / menu item |

Note: the 96×96 `Frame_Standard` sprite puts the silver art only on the left
and right edges (top/bottom are almost entirely dark fill), so it reads like
a curtain frame when used for dialogs. The theme uses the 32×32 `Frame_Lite`
instead, which has silver on all four sides.

Modifications: none to the images; only CSS border-image slicing is applied at
runtime.

# Complete UI Essential Pack · Papernote theme

Selected sprites from **Complete UI Essential Pack v2.4** by
**Crusenho Agus Hennihuno** (<https://crusenho.itch.io>), used under the
**Creative Commons Attribution 4.0 International (CC BY 4.0)** license:
<https://creativecommons.org/licenses/by/4.0/>.

The sprites are used unmodified as 9-slice textures in the `pixel-papernote`
theme. They are inlined into the client bundle as data URIs at build time
(`scripts/asset-inline.mjs`), so the shipped plugin carries no extra asset
route.

- Original pack: Complete UI Essential Pack v2.4
- Theme: `11_Papernote_Theme`
- License text: `LICENSE.txt` in this directory.

| Local file | Source sprite | Role |
| --- | --- | --- |
| `panel.png` | `UI_Papernote_FrameStandard01.png` | dialog frame (torn note page, punched holes) |
| `popover.png` | `UI_Papernote_FrameLite01.png` | menu / popover frame |
| `button.png` | `UI_Papernote_Button03.png` | primary button (rest) |
| `button-hover.png` | `UI_Papernote_Button02.png` | primary button (hover) |
| `icon-button.png` | `UI_Papernote_FrameLite01.png` | icon-only primary button |
| `input.png` | `UI_Papernote_Textfield01.png` | text field |
| `cursor.png` | `UI_Papernote_CursorPencil01.png` | pencil cursor (hotspot at the tip) |

Modifications: none to the images; only CSS border-image slicing/scaling and
cursor hotspot placement are applied at runtime.

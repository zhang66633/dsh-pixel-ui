# Complete UI Essential Pack · Pumpkin theme

Selected sprites from **Complete UI Essential Pack v2.4** by
**Crusenho Agus Hennihuno** (<https://crusenho.itch.io>), used under the
**Creative Commons Attribution 4.0 International (CC BY 4.0)** license:
<https://creativecommons.org/licenses/by/4.0/>.

The sprites are used unmodified as 9-slice textures in the `pixel-pumpkin`
theme. They are inlined into the client bundle as data URIs at build time
(`scripts/asset-inline.mjs`), so the shipped plugin carries no extra asset
route.

- Original pack: Complete UI Essential Pack v2.4
- Theme: `09_Pumpkin_Theme`
- License text: `LICENSE.txt` in this directory.

| Local file | Source sprite | Role |
| --- | --- | --- |
| `panel.png` | `ui_pumpkin_frame_full.png` | dialog frame |
| `popover.png` | `ui_pumpkin_frame_simple.png` | menu / popover frame |
| `button.png` | `ui_pumpkin_button_long1.png` | primary button (rest) |
| `button-hover.png` | `ui_pumpkin_button_long2.png` | primary button (hover) |
| `button-press.png` | `ui_pumpkin_button_long3.png` | primary button (pressed) |
| `icon-button.png` | `ui_pumpkin_button_simple1.png` | icon-only primary button |
| `input.png` | `ui_pumpkin_text_field.png` | text field |
| `select.png` | `ui_pumpkin_dropdown.png` | selected row / menu item |

Modifications: the flat interior fill of the button sprites (button, button-hover,
button-press, icon-button) was darkened from `#BF5F16` to `#8A3E0C`, and of the
text-field sprite from `#BF5F16` to `#3A2210`, so primary-button ink and input
placeholder/text reach WCAG AA on the rendered fill (`--dsw-alias-button-primary-fill`
and `--px-input-bg` respectively). Rims, pumpkin vines and highlights are untouched.
Only CSS border-image slicing/scaling is applied at runtime; all other pixels are
the original artwork.

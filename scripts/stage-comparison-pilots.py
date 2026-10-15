import argparse, json, pathlib, shutil, re
parser = argparse.ArgumentParser(description='Merge only identity and comparison changes into a fresh active-theme backup.')
parser.add_argument('--base', required=True)
parser.add_argument('--output', required=True)
args = parser.parse_args()
root = pathlib.Path(__file__).resolve().parents[1]
base, output = pathlib.Path(args.base), pathlib.Path(args.output)
if output.exists(): raise SystemExit('Use a new output directory.')
shutil.copytree(base, output)
s = (base / 'sections/main-product.liquid').read_text()
local = (root / 'sections/main-product.liquid').read_text()
def replace(old, new):
 global s
 if old not in s: raise SystemExit('Active section changed; review before staging: ' + old[:70])
 s = s.replace(old, new)
replace('{% assign target_product = section.settings.featured_product | default: product %}', '''{% assign target_product = product | default: section.settings.featured_product %}
  {% assign use_product_overrides = true %}
  {% if product != blank and section.settings.featured_product != blank and section.settings.featured_product.id != product.id %}
    {% assign use_product_overrides = false %}
  {% endif %}''')
replace('{{ section.settings.custom_title | default: target_product.title }}', '{% if use_product_overrides %}{{ section.settings.custom_title | default: target_product.title | escape }}{% else %}{{ target_product.title | escape }}{% endif %}')
for condition in ['intro_text != blank', 'section.settings.custom_description != blank', 'section.settings.subtitle != blank', 'section.settings.secondary_description != blank', 'first_img_block.settings.image != blank', 'img_blocks.size > 0']:
 replace('{% if '+condition+' %}', '{% if use_product_overrides and '+condition+' %}')
replace('{% unless target_product.available %}', '{% unless current_variant.available %}')
replace('{% if target_product.available %}', '{% if current_variant.available %}')
# Selected options and variants remain tied to the visited product; purchase policy stays in the active section.
start = local.index('  function updateSelectedVariant()')
old_start = s.index('  function updateSelectedVariant()')
# Copy only this function through the next function/listener boundary.
# Balanced braces allow nested conditions and objects.
def end_function(text, index):
 depth = 0; opened = False
 for i in range(index, len(text)):
  if text[i] == '{': depth += 1; opened = True
  elif text[i] == '}':
   depth -= 1
   if opened and depth == 0: return i+1
 raise ValueError('Unclosed function')
s = s[:old_start] + local[start:end_function(local,start)] + s[end_function(s,old_start):]
a = local.index('      {% capture comparison_family %}')
b = local.index('      {% endif %}', a) + len('      {% endif %}')
a_old = s.index('      {% if section.settings.show_compare_btn %}')
b_old = s.index('      {% endif %}', a_old) + len('      {% endif %}')
s = s[:a_old] + local[a:b] + s[b_old:]
(output/'sections/main-product.liquid').write_text(s)
files = ['templates/product.json','snippets/comparison-family.liquid','snippets/comparison-excluded.liquid','snippets/product-family-comparison.liquid','assets/equipro-comparison.js','assets/equipro-comparison.css','assets/equipro-comparison-data.json']
for name in files: shutil.copy2(root/name, output/name)
# Wrap the active modal, preserving its existing editor settings and markup for non-pilot families.
modal = (base/'sections/product-compare-modal.liquid').read_text()
i = modal.index('{% schema %}')
wrapper = "{% capture comparison_family %}{% render 'comparison-family', target_product: product %}{% endcapture %}\n{% capture comparison_excluded %}{% render 'comparison-excluded', target_product: product %}{% endcapture %}\n{% if comparison_family == blank and comparison_excluded == blank %}\n"
(output/'sections/product-compare-modal.liquid').write_text(wrapper+modal[:i]+'{% endif %}\n'+modal[i:])
locale = json.loads(re.sub(r'/\*[\s\S]*?\*/', '', (base/'locales/en.default.json').read_text()))
locale['comparison'] = json.loads((root/'locales/en.default.json').read_text())['comparison']
(output/'locales/en.default.json').write_text(json.dumps(locale,ensure_ascii=False,indent=2)+'\n')
files += ['sections/main-product.liquid','sections/product-compare-modal.liquid','locales/en.default.json']
(output/'comparison-deployment-files.json').write_text(json.dumps(files, indent=2)+'\n')
print('\n'.join(files))

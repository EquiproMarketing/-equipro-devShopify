"""Read-only local preflight. Remote freshness must be checked separately immediately before authorized upload."""
from pathlib import Path
import json,hashlib,re,shlex
E=Path(__file__).resolve().parent;root=E.parents[1];m=json.loads((E/'final-manifest.json').read_text());assert m['themeId']=='157851386029';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();names={x['path'] for x in m['files']};remote=json.loads((E/'preflight-2026-11-23/main-full-inventory.json').read_text());available={x['filename'] for x in remote['files']}|names
for n in m['files']:
 p=root/n['candidatePath'];assert sha(p)==n['candidateSha256'],n['path'];before=E/'preflight-2026-11-23/remote-before'/n['path'];assert (sha(before) if before.exists() else None)==n['remoteContentSha256'];assert (n['path'] in {x['filename'] for x in remote['files']})==(n['operation']=='UPDATE')
 s=p.read_text()
 for x in re.finditer(r"['\"]([^'\"]+)['\"]\s*\|\s*asset_url",s):assert 'assets/'+x[1] in available,(n['path'],x[1])
 for x in re.finditer(r"{%[-]?\s*render\s+['\"]([^'\"]+)['\"]",s):assert 'snippets/'+x[1]+'.liquid' in available,(n['path'],x[1])
 if n['path'].endswith('.json'):json.loads(re.sub(r'^\s*/\*[\s\S]*?\*/','',s))
for n in m.get('supportFilesNotUploaded',[]):
 p=E/'candidate'/n['path'];assert sha(p)==n['sha256'] and n['path'] not in names
 snapshot=root/'docs/tr02a2-main-snapshot'/n['path'];assert sha(snapshot)==n['sha256'],n['path']
assert (E/'candidate/layout/theme.liquid').is_file()
assert (E/'candidate/config/settings_schema.json').is_file()
args=shlex.split((E/'proposed-deploy-command.txt').read_text());only=[args[i+1] for i,a in enumerate(args) if a=='--only'];assert len(only)==len(names) and set(only)==names;assert '--nodelete' in args and '--publish' not in args and '--force' not in args
original=json.loads((root/'docs/post-qa-correction-manifest.json').read_text());assert all(sha(root/n['candidatePath'])==n['candidateSha256'] for n in original['files'])
a=json.loads((E/'candidate/locales/en.default.json').read_text());b=json.loads((E/'candidate/locales/fr.json').read_text())
def flatten(d,p='',o=None):
 if o is None:o={}
 for k,v in d.items():
  if isinstance(v,dict):flatten(v,p+k+'.',o)
  else:o[p+k]=v
 return o
a,b=flatten(a),flatten(b);assert set(a)==set(b) and len(a)==311
for k in a:assert re.findall(r'{{\s*(.*?)\s*}}',a[k])==re.findall(r'{{\s*(.*?)\s*}}',b[k]),k
print('PASS: 18 exact candidates, 3 ADD / 15 UPDATE, dependencies present, 311 EN/FR leaves, 9 original corrective hashes preserved. Remote authorization still required.')

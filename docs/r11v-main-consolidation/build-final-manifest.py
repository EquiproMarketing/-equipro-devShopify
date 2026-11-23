"""Build review artifacts only. Does not call Shopify or Git."""
from pathlib import Path
import json,hashlib,difflib,shlex
E=Path(__file__).resolve().parent;root=E.parents[1];C=E/'candidate';P=E/'preflight-2026-11-23';sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();fix=json.loads((root/'docs/post-qa-correction-manifest.json').read_text());m=json.loads((E/'manifest.json').read_text());remote={x['filename']:x for x in json.loads((P/'inventory.json').read_text())};by={x['path']:x for x in fix['files']};prior={x['path']:x for x in m['files']}
for n in m['files']:n['candidateSha256']=sha(root/n['candidatePath'])
(E/'manifest.json').write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n');files=[];diff=''
for f in sorted(set(by)|set(prior)):
 p=C/f;orig=P/'remote-before'/f
 files.append({'path':f,'operation':'UPDATE' if orig.exists() else 'ADD','candidatePath':str(p.relative_to(root)),'remoteContentSha256':sha(orig) if orig.exists() else None,'shopifyChecksumMd5':remote.get(f,{}).get('checksumMd5'),'candidateSha256':sha(p),'includesCorrectiveBatch':f in by,'includesConsolidation':f in prior})
 diff+=''.join(difflib.unified_diff(orig.read_text().splitlines(True) if orig.exists() else [],p.read_text().splitlines(True),fromfile='MAIN/'+f,tofile='FINAL/'+f))
assert len(files)==18 and sum(n['operation']=='ADD' for n in files)==3
for n in fix['files']:assert sha(root/n['candidatePath'])==n['candidateSha256']
manifest={'shop':'equipro-dev.myshopify.com','themeId':'157851386029','date':'2026-11-23','deployAuthorized':False,'description':'Union of immutable nine-UPDATE corrective batch and selective consolidation. Seven overlapping files written once at final content. Requires specific authorization for these 18 paths and hashes.','files':files,'preservedRuntime':['assets/cart-drawer.js','assets/quote-modal.js','layout/theme.liquid','sections/header.liquid','sections/footer.liquid','assets/shipping-calculator.js'],'frPublished':False,'recovery':'STOP on partial failure. Restore only with separate authorization from preflight-2026-11-23/remote-before. Added file deletion needs separate authorization.'}
manifest['validation']=m.get('tests',{})
manifest['themeCheck']=m.get('themeCheck',{})
manifest['supportFilesNotUploaded']=[{'path':n,'purpose':'CLI directory validation only; exact file from verified TR-02A.2 MAIN snapshot; excluded from --only list','sha256':sha(C/n)} for n in ['layout/theme.liquid','config/settings_schema.json'] if (C/n).is_file()]
(E/'final-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n');(E/'final-main.diff').write_text(diff)
cmd=['shopify','theme','push','--store','equipro-dev.myshopify.com','--theme','157851386029','--path',str(C.relative_to(root)),'--allow-live','--nodelete','--no-input','--json']
for n in files:cmd+=['--only',n['path']]
(E/'proposed-deploy-command.txt').write_text(shlex.join(cmd)+'\n');print('18 paths: 3 ADD / 15 UPDATE. No deployment.')

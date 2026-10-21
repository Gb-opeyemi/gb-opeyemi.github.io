from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
root=Path(__file__).resolve().parents[1]/'dist'
class Check(HTMLParser):
    ids=set(); links=[]; errors=[]; h1=0
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if 'id' in attrs:
            if attrs['id'] in self.ids:self.errors.append('Duplicate ID: '+attrs['id'])
            self.ids.add(attrs['id'])
        if tag=='h1':self.h1+=1
        if tag=='img' and not attrs.get('alt'):self.errors.append('Missing image alt text')
        for field in ('href','src'):
            if field in attrs:self.links.append(attrs[field])
c=Check();c.feed((root/'index.html').read_text())
for url in c.links:
    parsed=urlsplit(url)
    if parsed.scheme or parsed.netloc:continue
    if parsed.path and not (root/unquote(parsed.path)).is_file():c.errors.append('Missing local asset: '+url)
    if parsed.fragment and parsed.fragment not in c.ids:c.errors.append('Missing anchor: '+url)
assert c.h1==1, 'Expected one H1'
assert not c.errors,'\n'.join(c.errors)
print(f'Passed: {len(c.ids)} anchors, {len(c.links)} references, image alt text and heading structure.')

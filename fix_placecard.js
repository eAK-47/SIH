const fs = require('fs');
const p = '/home/om/Documents/sih/client/src/components/PlaceCard.tsx';
let src = fs.readFileSync(p, 'utf8');

src = src.replace(/<Plus className="h-3 w-3" \/> Add Bill\n        <\/span>\n        \{place.entityType === 'TRANSPORT' <Plus className="h-3 w-3" \/> Add Bill<Plus className="h-3 w-3" \/> Add Bill \(/,
  \`<Plus className="h-3 w-3" /> Add Bill
        </span>
        {place.entityType === 'TRANSPORT' && (\`);

fs.writeFileSync(p, src);

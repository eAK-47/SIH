const fs = require('fs');

// Fix 1: PlaceCard.tsx
let p1 = '/home/om/Documents/sih/client/src/components/PlaceCard.tsx';
let txt = fs.readFileSync(p1, 'utf8');
txt = txt.replace(/<Plus className="h-3 w-3" \/> Add Bill<Plus className="h-3 w-3" \/> Add Bill \(/, "&& (");
fs.writeFileSync(p1, txt);

// Fix 2: platform.controller.ts (missing closing brace before auditTransitQuote)
let p2 = '/home/om/Documents/sih/src/controllers/platform.controller.ts';
let txt2 = fs.readFileSync(p2, 'utf8');
txt2 = txt2.replace("    } catch (e: any) {\n      return reply.status(500).send({ success: false, error: e.message });\n    }\n  // 5. Transit Audit Quote", "    } catch (e: any) {\n      return reply.status(500).send({ success: false, error: e.message });\n    }\n  }\n\n  // 5. Transit Audit Quote");
fs.writeFileSync(p2, txt2);

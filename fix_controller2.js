const fs = require('fs');
const p = '/home/om/Documents/sih/src/controllers/platform.controller.ts';
let src = fs.readFileSync(p, 'utf8');

src = src.replace(/    \} catch \(e: any\) \{\n      return reply\.status\(500\)\.send\(\{ success: false, error: e\.message \}\);\n    \}\n  \/\/ 5\. Transit Audit Quote/,
  \`    } catch (e: any) {
      return reply.status(500).send({ success: false, error: e.message });
    }
  }

  // 5. Transit Audit Quote\`);

fs.writeFileSync(p, src);

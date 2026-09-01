const fs = require('fs');

let p1 = '/home/om/Documents/sih/client/src/components/PlaceCard.tsx';
let txt1 = fs.readFileSync(p1, 'utf8');
txt1 = txt1.replace("          </button>\n        )}\n        </span>\n      </div>", "          </button>\n        )}\n      </div>");
fs.writeFileSync(p1, txt1);

let p2 = '/home/om/Documents/sih/src/controllers/platform.controller.ts';
let txt2 = fs.readFileSync(p2, 'utf8');
txt2 = txt2.replace("    } catch (e: any) {\n      return reply.status(500).send({ success: false, error: e.message });\n    }\n  }\n\n  // 5. Transit Audit Quote", "    } catch (e: any) {\n      return reply.status(500).send({ success: false, error: e.message });\n    }\n  }\n\n  // 5. Transit Audit Quote");
// Oh wait, looking at platform.controller.ts | tail -50, it says:
//      });
//    } catch (e: any) {
//      return reply.status(500).send({ success: false, error: e.message });
//    }
//  } // <-- wait, this closing brace closes getMerchantDashboard? Let's check.

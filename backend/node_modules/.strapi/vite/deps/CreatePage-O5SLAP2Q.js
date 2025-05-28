import {
  EditPage
} from "./chunk-S6O7FSN3.js";
import "./chunk-V2WBTQ53.js";
import "./chunk-SP5ZASJN.js";
import "./chunk-IMVUCITA.js";
import "./chunk-3FZ62J2F.js";
import "./chunk-ABYQNKYE.js";
import "./chunk-TI4RIGLO.js";
import "./chunk-EGNP2T5O.js";
import "./chunk-YXDCVYVT.js";
import "./chunk-B6XMLIZD.js";
import "./chunk-3V3SRQBZ.js";
import "./chunk-CTNWA7X7.js";
import "./chunk-VYSYYPOB.js";
import {
  Page
} from "./chunk-AKPHIZM6.js";
import "./chunk-476AGES7.js";
import {
  useTypedSelector
} from "./chunk-VSUJGU6Y.js";
import "./chunk-KOSUTHJQ.js";
import "./chunk-CZOZGSD3.js";
import "./chunk-BHLYCXQ7.js";
import "./chunk-BLJUR3JO.js";
import "./chunk-CE4VABH2.js";
import "./chunk-5VODLFKF.js";
import "./chunk-XLJ2PL5F.js";
import "./chunk-YSRCD6GK.js";
import "./chunk-TUXTO2Z5.js";
import "./chunk-FOD4ENRR.js";
import "./chunk-WRD5KPDH.js";
import {
  require_jsx_runtime
} from "./chunk-NIAJZ5MX.js";
import "./chunk-ACIMPXWY.js";
import "./chunk-MADUDGYZ.js";
import {
  __toESM
} from "./chunk-PLDDJCW6.js";

// node_modules/@strapi/admin/dist/admin/admin/src/pages/Settings/pages/Webhooks/CreatePage.mjs
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var ProtectedCreatePage = () => {
  const permissions = useTypedSelector((state) => {
    var _a;
    return (_a = state.admin_app.permissions.settings) == null ? void 0 : _a.webhooks.create;
  });
  return (0, import_jsx_runtime.jsx)(Page.Protect, {
    permissions,
    children: (0, import_jsx_runtime.jsx)(EditPage, {})
  });
};
export {
  ProtectedCreatePage
};
//# sourceMappingURL=CreatePage-O5SLAP2Q.js.map

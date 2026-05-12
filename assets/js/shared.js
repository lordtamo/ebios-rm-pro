/* ============================================================
   EBIOS RM Pro v5 – Shared JavaScript
   Rôle :
   - État global (D)
   - Persistance localStorage
   - Utilitaires communs
   - Constantes méthodologiques (ANSSI, MITRE)
   ============================================================ */

/* ============================
   CONFIGURATION
   ============================ */

const STORAGE_KEY = "ebios5";
const STORAGE_ID_KEY = "ebios5_id";

/* ============================
   ÉTAT GLOBAL
   ============================ */

let D = {
  meta: {
    studyName: "",
    organization: "",
    scope: "",
    date: new Date().toISOString().split("T")[0],
    version: "1.0",
    jalons: 3,
    lastSaved: null
  },

  missions: [],
  bv: [],                 // valeurs métier
  fe: [],                 // événements redoutés
  baseline: [],
  rs: [],                 // sources de risque
  pp: [],                 // parties prenantes
  ss: [],                 // scénarios stratégiques
  os: [],                 // scénarios opérationnels
  measures: [],           // mesures PACS
  erToSr: [],
  customSources: [],
  objectifsVises: [],
  risquesResiduels: []
};

let ID_SEQ = 1;

/* ============================
   INITIALISATION
   ============================ */

(function init() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedId = localStorage.getItem(STORAGE_ID_KEY);

    if (saved) {
      D = JSON.parse(saved);
      ID_SEQ = savedId ? parseInt(savedId, 10) : inferNextId(D);
    }
  } catch (e) {
    console.error("Erreur chargement données EBIOS :", e);
  }
})();

/* ============================
   PERSISTANCE
   ============================ */

function save() {
  D.meta.lastSaved = new Date().toISOString();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(D));
  localStorage.setItem(STORAGE_ID_KEY, String(ID_SEQ));

  notifySave();
}

function resetAll() {
  if (!confirm("Effacer toute l’analyse EBIOS ?")) return;

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_ID_KEY);
  location.reload();
}

function notifySave() {
  const evt = new CustomEvent("ebios:saved", { detail: D.meta.lastSaved });
  window.dispatchEvent(evt);
}

/* ============================
   GESTION DES IDs
   ============================ */

function gid() {
  return ID_SEQ++;
}

function inferNextId(data) {
  try {
    const ids = [];
    Object.values(data).forEach(v => {
      if (Array.isArray(v)) {
        v.forEach(o => o && typeof o.id === "number" && ids.push(o.id));
      }
    });
    return ids.length ? Math.max(...ids) + 1 : 1;
  } catch {
    return 1;
  }
}

/* ============================
   UTILITAIRES DE SÉCURITÉ
   ============================ */

function esc(str) {
  if (str === null || str === undefined) return "";
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}

function sanitizeStr(str, maxLen = 500) {
  if (typeof str !== "string") return "";
  return str.substring(0, maxLen).replace(/[<>]/g, "");
}

function sanitizeNum(val, min = 1, max = 4) {
  const n = parseInt(val, 10);
  if (isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function hasInjection(str) {
  if (typeof str !== "string") return false;
  return /<script|javascript:|on\w+=|data:/i.test(str);
}

/* ============================
   CONSTANTES MÉTHODOLOGIQUES
   ============================ */

const MITRE = {
  tactics: [
    { id: "TA0043", name: "Reconnaissance" },
    { id: "TA0001", name: "Initial Access" },
    { id: "TA0002", name: "Execution" },
    { id: "TA0003", name: "Persistence" },
    { id: "TA0004", name: "Privilege Escalation" },
    { id: "TA0005", name: "Defense Evasion" },
    { id: "TA0006", name: "Credential Access" },
    { id: "TA0007", name: "Discovery" },
    { id: "TA0008", name: "Lateral Movement" },
    { id: "TA0009", name: "Collection" },
    { id: "TA0011", name: "Command & Control" },
    { id: "TA0010", name: "Exfiltration" },
    { id: "TA0040", name: "Impact" }
  ]
};

const BDC = {
  sources: [
    "État étranger",
    "Crime organisé",
    "Concurrent",
    "Hacktiviste",
    "Attaquant interne"
  ],

  objectifs: [
    "Espionnage",
    "Sabotage",
    "Lucratif",
    "Atteinte à l’image"
  ],

  typesVM: [
    "Processus métier",
    "Service",
    "Données personnelles",
    "Infrastructure"
  ],

  gravites: [
    { id: 1, label: "Mineure", color: "#22c55e" },
    { id: 2, label: "Significative", color: "#eab308" },
    { id: 3, label: "Grave", color: "#f97316" },
    { id: 4, label: "Critique", color: "#dc2626" }
  ]
};

/* ============================
   CALCULS TRANSVERSES
   ============================ */

function getLvlColor(level) {
  switch (parseInt(level, 10)) {
    case 1: return "#22c55e";
    case 2: return "#eab308";
    case 3: return "#f97316";
    case 4: return "#dc2626";
    default: return "#64748b";
  }
}

function getRisks() {
  return D.os.map((os, idx) => {
    const ss = D.ss.find(s => s.id === os.ss);
    const g = ss ? parseInt(ss.g, 10) : 1;
    const v = parseInt(os.v, 10);
    return {
      id: os.id,
      index: idx + 1,
      g,
      v,
      level: g * v,
      name: ss ? ss.desc || "Scénario" : "Scénario"
    };
  });
}

/* ============================
   EXPORT GLOBAL (debug / iframe)
   ============================ */

window.EBIOS = {
  D,
  save,
  resetAll,
  gid,
  getRisks,
  esc,
  sanitizeStr,
  sanitizeNum,
  hasInjection,
  BDC,
  MITRE
};
``

/* Données et fonctions partagées */
const D = JSON.parse(localStorage.getItem("ebios5")) || {
  meta: { studyName: "", organization: "" },
  missions: [],
  bv: [],
  fe: [],
  rs: [],
  ss: [],
  os: [],
  measures: [],
  risquesResiduels: []
};

function save() {
  localStorage.setItem("ebios5", JSON.stringify(D));
}

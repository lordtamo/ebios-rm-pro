# 🛡️ EBIOS RM Pro v5

Reprise de l'application Web de EBIOS RM Pro v5.


**Application web d'analyse de risques selon la méthodologie EBIOS Risk Manager de l'ANSSI**

![Version](https://img.shields.io/badge/version-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Security](https://img.shields.io/badge/security-hardened-brightgreen)

## 📋 Description

EBIOS RM Pro est un outil **100% client-side** (aucun serveur requis) permettant de réaliser des analyses de risques complètes selon la méthodologie EBIOS Risk Manager v1.5 de l'ANSSI.

### Fonctionnalités principales

- ✅ **5 Ateliers EBIOS RM** complets
- 📊 **Dashboard** avec indicateurs visuels
- 📝 **Export Word** professionnel
- 💾 **Import/Export JSON** pour sauvegarde et partage
- 🎯 **Base de connaissances ANSSI** intégrée
- ⚔️ **Référentiel MITRE ATT&CK** pour les scénarios opérationnels
- 📉 **Risques résiduels** avec cartographie avant/après
- 🔒 **Sécurité renforcée** contre les injections XSS

## 🚀 Utilisation

### Option 1 : Téléchargement direct
1. Téléchargez `EBIOS-RM-Pro-v5.html`
2. Ouvrez-le dans votre navigateur (Chrome, Firefox, Edge)
3. C'est tout ! 🎉

### Option 2 : GitHub Pages
Accédez directement à : `https://github.com/Cyber-Autopsie/ebios-rm-pro`

## 📚 Les 5 Ateliers

| Atelier | Description |
|---------|-------------|
| **1. Cadrage** | Périmètre, missions, valeurs métier, événements redoutés, socle de sécurité |
| **2. Sources de Risque** | Sources de risque, objectifs visés, couples SR/OV, pertinence |
| **3. Scénarios Stratégiques** | Parties prenantes, écosystème, chemins d'attaque stratégiques |
| **4. Scénarios Opérationnels** | Modes opératoires techniques (MITRE ATT&CK), vraisemblance |
| **5. Traitement** | Plan de traitement PACS, mesures par jalon, risques résiduels |

## 🔐 Sécurité

L'application implémente plusieurs mesures de sécurité :

- **Échappement HTML** de toutes les données utilisateur
- **Validation des imports JSON** avec schéma
- **Sanitization des entrées** (longueur max, caractères interdits)
- **Détection des injections** (XSS, scripts malveillants)
- **Content Security Policy** restrictive
- **Subresource Integrity** pour les CDN

Voir [SECURITY.md](SECURITY.md) pour plus de détails.

## 💾 Stockage des données

- Données stockées dans le **localStorage** du navigateur
- **Aucune donnée transmise** à un serveur
- **Export JSON** pour sauvegarde externe
- **Export Word** pour les rapports officiels

## 📦 Dépendances (CDN)

- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [docx](https://docx.js.org/) - Génération de documents Word
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) - Téléchargement de fichiers
- [Chart.js](https://www.chartjs.org/) - Graphiques

## 📁 Structure du projet

```
ebios-rm-pro/
/
├─ index.html
├─ assets/
│  ├─ css/
│  │  └─ common.css
│  └─ js/
│     └─ shared.js
└─ pages/
   ├─ atelier1.html
   ├─ atelier2.html
   ├─ atelier3.html
   ├─ atelier4.html
   ├─ atelier5.html
   └─ dashboard.html
```

## 📄 License

MIT License - Libre d'utilisation, modification et distribution.

## 🙏 Crédits

- Méthodologie **EBIOS Risk Manager** par l'[ANSSI](https://www.ssi.gouv.fr/)
- Référentiel **MITRE ATT&CK** par [MITRE](https://attack.mitre.org/)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📧 Contact

Pour signaler un bug ou proposer une amélioration, ouvrez une issue sur GitHub.

---

*Développé avec ❤️ pour la communauté cybersécurité française*

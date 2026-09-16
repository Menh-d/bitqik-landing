/* ==========================================================================
   bitqik Link Hub — Blockchain Box UI Logic & Official Links
   ========================================================================== */

// 1. Data Store: ONLY 4 Official Channels (Website, Facebook, TikTok, YouTube)
const bitqikLinks = [
  {
    id: "website",
    hash: "#BLOCK-WEB01",
    icon: "🌐",
    title: { lao: "ເວັບໄຊທ໌ທາງການ (Official Website)", en: "Official Website" },
    desc: { lao: "ສູນຊື້-ຂາຍ ສິນຊັບດິຈິທັອນອັນດັບ 1 ໃນລາວ — bitqik.com", en: "Laos #1 Digital Asset Exchange Platform — bitqik.com" },
    url: "https://bitqik.com",
    tag: "MAIN NET"
  },
  {
    id: "facebook",
    hash: "#BLOCK-FB02",
    icon: "🔵",
    title: { lao: "Facebook Page ທາງການ", en: "Official Facebook Page" },
    desc: { lao: "ຕິດຕາມຂ່າວສານ, ກິດຈະກໍາ ແລະ ໂປຣໂມຊັນຫຼ້າສຸດ", en: "Follow official news, events & latest campaigns" },
    url: "https://www.facebook.com/bitqik",
    tag: "SOCIAL"
  },
  {
    id: "tiktok",
    hash: "#BLOCK-TK03",
    icon: "🎵",
    title: { lao: "TikTok @bitqikofficial", en: "Official TikTok Channel" },
    desc: { lao: "ວິດີໂອສັ້ນ ເທັກນິກການເທຣດ ແລະ ຄວາມຮູ້ crypto ເຂົ້າໃຈງ່າຍ", en: "Short entertaining & educational crypto videos" },
    url: "https://www.tiktok.com/@bitqikofficial",
    tag: "VIRAL"
  },
  {
    id: "youtube",
    hash: "#BLOCK-YT04",
    icon: "▶️",
    title: { lao: "YouTube Official Channel", en: "Official YouTube Channel" },
    desc: { lao: "ຄລິບສອນການໃຊ້ງານແອັບ ແລະ ວິເຄາະຕະຫຼາດຢ່າງລະອຽດ", en: "Full video tutorials & market breakdown" },
    url: "https://www.youtube.com/@bitqikofficial",
    tag: "MEDIA"
  }
];

// 2. UI Translation Dictionary
const i18n = {
  lao: {
    statusText: "BLOCKCHAIN NODE: ACTIVE",
    heroDesc: "ແພລດຟອມຊື້-ຂາຍ ສິນຊັບດິຈິທັອນ ທີ່ໄດ້ຮັບໃບອະນຸຍາດຢ່າງເປັນທາງການ ໃນສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ",
    licenseTag: "🛡️ Licensed & Regulated by Bank of Lao PDR",
    appTag: "MOBILE APPLICATION",
    appTitle: "ດາວໂຫລດແອັບ bitqik ເທຣດໄດ້ທຸກທີ່!",
    appDesc: "ປະສົບການເທຣດ crypto ທີ່ງ່າຍດາຍ, ປອດໄພ ພ້ອມລະບົບຝາກ-ຖອນ ເງິນກີບອັດໂນມັດ 24 ຊົ່ວໂມງ",
    appBtn: "📲 ດາວໂຫລດແອັບມືຖື",
    sectionTitle: "ລິ້ງທາງການຂອງ bitqik (OFFICIAL CHANNELS)",
    toastCopied: "ຄັດລອກລິ້ງສຳເລັດແລ້ວ!",
    rights: "© 2026 bitqik Sole Co., Ltd. All rights reserved."
  },
  en: {
    statusText: "BLOCKCHAIN NODE: ACTIVE",
    heroDesc: "Official Licensed & Regulated Digital Asset Exchange Platform in Lao PDR",
    licenseTag: "🛡️ Licensed & Regulated by Bank of Lao PDR",
    appTag: "MOBILE APPLICATION",
    appTitle: "Download bitqik App — Trade Anywhere!",
    appDesc: "Seamless crypto trading experience with instant 24/7 LAK fiat deposits & withdrawals.",
    appBtn: "📲 Download Mobile App",
    sectionTitle: "Official bitqik Channels & Links",
    toastCopied: "Link copied to clipboard!",
    rights: "© 2026 bitqik Sole Co., Ltd. All rights reserved."
  }
};

let currentLang = "lao";

// Render Links
function renderLinks() {
  const container = document.getElementById("link-grid");
  if (!container) return;

  container.innerHTML = bitqikLinks.map(item => {
    const title = item.title[currentLang];
    const desc = item.desc[currentLang];

    return `
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="blockchain-link-card">
        <div class="card-left">
          <div class="node-icon-box">${item.icon}</div>
          <div class="card-info">
            <div class="block-tag-row">
              <span class="block-hash">${item.hash}</span>
            </div>
            <span class="card-title">${title}</span>
            <span class="card-desc">${desc}</span>
          </div>
        </div>
        <div class="card-right">
          <div class="arrow-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </a>
    `;
  }).join('');
}

// Update UI Language
function setLanguage(lang) {
  currentLang = lang;
  document.getElementById("lang-btn-text").innerText = lang === "lao" ? "🇱🇦 ລາວ" : "🇬🇧 English";
  
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang] && i18n[lang][key]) {
      el.innerText = i18n[lang][key];
    }
  });

  renderLinks();
}

document.addEventListener("DOMContentLoaded", () => {
  renderLinks();

  document.getElementById("lang-btn").addEventListener("click", () => {
    setLanguage(currentLang === "lao" ? "en" : "lao");
  });
});

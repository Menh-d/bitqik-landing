/* ==========================================================================
   bitqik — Swiss Minimalist Architectural Grid UI Logic (Asklepios Style)
   ========================================================================== */

const bitqikNavItems = [
  {
    id: "website",
    title: { en: "Website", lao: "ເວັບໄຊທ໌ທາງການ" },
    sub: { en: "bitqik.com", lao: "bitqik.com" },
    url: "https://bitqik.com",
    defaultActive: true
  },
  {
    id: "download",
    title: { en: "Download App", lao: "ດາວໂຫລດແອັບ" },
    sub: { en: "iOS & Android", lao: "iOS & Android" },
    url: "https://bitqik.com/download",
    defaultActive: false
  },
  {
    id: "facebook",
    title: { en: "Facebook", lao: "Facebook Page" },
    sub: { en: "@bitqik", lao: "ຂ່າວສານ & ກິດຈະກໍາ" },
    url: "https://www.facebook.com/bitqik",
    defaultActive: false
  },
  {
    id: "tiktok",
    title: { en: "TikTok", lao: "TikTok Official" },
    sub: { en: "@bitqikofficial", lao: "ວິດີໂອສັ້ນ Crypto" },
    url: "https://www.tiktok.com/@bitqikofficial",
    defaultActive: false
  },
  {
    id: "youtube",
    title: { en: "YouTube", lao: "YouTube Channel" },
    sub: { en: "@bitqikofficial", lao: "ສອນເທຣດ & ວິເຄາະ" },
    url: "https://www.youtube.com/@bitqikofficial",
    defaultActive: false
  }
];

const i18n = {
  en: {
    menuHeader: "Main Menu",
    infoLicense: "Licensed by BOL",
    infoSupport: "Support Center",
    infoPrivacy: "Privacy Policy",
    infoTerms: "Terms of Use",
    appPreviewLabel: "bitqik Mobile App",
    appPreviewTag: "GET APP",
    copyright: "COPYRIGHT 2026 © BITQIK SOLE CO., LTD. ALL RIGHTS RESERVED."
  },
  lao: {
    menuHeader: "ເມນູຫຼັກ",
    infoLicense: "ໃບອະນຸຍາດ ທຫລ (BOL)",
    infoSupport: "ສູນຊ່ວຍເຫຼືອ 24/7",
    infoPrivacy: "ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ",
    infoTerms: "ເງື່ອນໄຂການໃຊ້ບໍລິການ",
    appPreviewLabel: "ດາວໂຫລດແອັບ bitqik",
    appPreviewTag: "ດາວໂຫລດ",
    copyright: "COPYRIGHT 2026 © BITQIK SOLE CO., LTD. ສະຫງວນລິຂະສິດທັງໝົດ."
  }
};

let currentLang = "en";

function renderEditorialNav() {
  const listEl = document.getElementById("editorial-nav-list");
  if (!listEl) return;

  listEl.innerHTML = bitqikNavItems
    .map((item) => {
      const label = item.title[currentLang];
      const sub = item.sub[currentLang];
      const activeClass = item.defaultActive ? "is-active" : "";

      return `
        <li class="editorial-nav-item">
          <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="editorial-nav-link ${activeClass}" data-id="${item.id}">
            <span class="nav-l-prefix" aria-hidden="true"></span>
            <span class="nav-item-title">${label}</span>
            <span class="nav-item-sub">${sub}</span>
          </a>
        </li>
      `;
    })
    .join("");

  // Interactive hover behavior: move `is-active` L-prefix smoothly to hovered item
  const links = listEl.querySelectorAll(".editorial-nav-link");
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      links.forEach((l) => l.classList.remove("is-active"));
      link.classList.add("is-active");
    });
  });

  listEl.addEventListener("mouseleave", () => {
    links.forEach((l) => l.classList.remove("is-active"));
    const defaultLink = listEl.querySelector('[data-id="website"]');
    if (defaultLink) defaultLink.classList.add("is-active");
  });
}

function setLanguage(lang) {
  currentLang = lang;
  const langBtn = document.getElementById("lang-btn-text");
  if (langBtn) {
    langBtn.textContent = lang === "en" ? "🇱🇦 ລາວ" : "🇬🇧 EN";
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang] && i18n[lang][key]) {
      el.textContent = i18n[lang][key];
    }
  });

  renderEditorialNav();
}

function setTheme(themeName) {
  if (themeName === "orange") {
    document.body.removeAttribute("data-theme");
  } else {
    document.body.setAttribute("data-theme", themeName);
  }
}

// Interactive 3D Phone Parallax Effect on Mouse Move
function initPhone3DParallax() {
  const stage = document.getElementById("phoneStage");
  const device = document.getElementById("phoneDevice");
  const sheen = document.getElementById("phoneSheen");
  if (!stage || !device) return;

  window.addEventListener("mousemove", (e) => {
    if (window.innerWidth < 1024) return;

    const rect = stage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
    const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

    const rotateY = -18 + deltaX * 14;
    const rotateX = 10 - deltaY * 12;
    const rotateZ = 3 + deltaX * 3;

    device.style.transform = `rotateY(${rotateY.toFixed(2)}deg) rotateX(${rotateX.toFixed(2)}deg) rotateZ(${rotateZ.toFixed(2)}deg)`;

    if (sheen) {
      const sheenOpacity = Math.max(0.4, Math.min(1, 0.85 - deltaX * 0.3 + deltaY * 0.2));
      sheen.style.opacity = sheenOpacity;
    }
  });

  stage.addEventListener("mouseleave", () => {
    device.style.transform = `rotateY(-18deg) rotateX(10deg) rotateZ(3deg)`;
    if (sheen) sheen.style.opacity = 0.85;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderEditorialNav();
  initPhone3DParallax();

  const langBtn = document.getElementById("lang-btn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      setLanguage(currentLang === "en" ? "lao" : "en");
    });
  }

  document.querySelectorAll(".theme-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      const theme = dot.getAttribute("data-theme-choice");
      setTheme(theme);
    });
  });
});

/* ==========================================================================
   bitqik — Swiss Minimalist Architectural Grid UI Logic (Asklepios Style)
   Theme: Deep Bitqik Navy Blue
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
    url: "https://bitqik.com.la/download/",
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
    copyright: "COPYRIGHT 2026 © BITQIK SOLE CO., LTD. ALL RIGHTS RESERVED."
  },
  lao: {
    menuHeader: "ເມນູຫຼັກ",
    infoLicense: "ໃບອະນຸຍາດ ທຫລ (BOL)",
    infoSupport: "ສູນຊ່ວຍເຫຼືອ 24/7",
    infoPrivacy: "ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ",
    infoTerms: "ເງື່ອນໄຂການໃຊ້ບໍລິການ",
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

// ==========================================================================
// CINEMATIC INTRO TYPEWRITER & TRANSITION ORCHESTRATION
// ==========================================================================
function initIntroExperience() {
  const introScreen = document.getElementById("intro-screen");
  const typewriterText = document.getElementById("intro-text-typed");
  const badgeWrap = document.getElementById("intro-badge-wrap");
  const subtitle = document.getElementById("intro-subtitle");
  const skipBtn = document.getElementById("intro-skip-pill");
  const canvasCard = document.getElementById("canvas-card");

  if (!introScreen) {
    if (canvasCard) canvasCard.classList.add("is-revealed");
    return;
  }

  document.body.classList.add("has-intro");

  let isDismissed = false;

  function dismissIntro() {
    if (isDismissed) return;
    isDismissed = true;

    introScreen.classList.add("is-dismissed");
    if (canvasCard) {
      canvasCard.classList.add("is-revealed");
    }

    // Clean up DOM and body class after animation sequence finishes
    setTimeout(() => {
      introScreen.style.display = "none";
      document.body.classList.remove("has-intro");
    }, 1300);
  }

  // Dismiss listeners: Skip button, click anywhere on intro, or ESC key
  if (skipBtn) {
    skipBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dismissIntro();
    });
  }
  introScreen.addEventListener("click", () => {
    dismissIntro();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === " ") {
      dismissIntro();
    }
  });

  // Typewriter typing "bitqik Academy"
  const fullText = "bitqik Academy";
  let charIdx = 0;

  function typeNextChar() {
    if (isDismissed) return;

    charIdx++;
    const currentSub = fullText.slice(0, charIdx);

    if (currentSub.length <= 6) {
      typewriterText.innerHTML = `<span class="intro-orange">${currentSub}</span>`;
    } else {
      const bitqikPart = currentSub.slice(0, 6);
      const academyPart = currentSub.slice(6);
      typewriterText.innerHTML = `<span class="intro-orange">${bitqikPart}</span><span class="intro-white">${academyPart}</span>`;
    }

    if (charIdx < fullText.length) {
      setTimeout(typeNextChar, 55);
    } else {
      // Reveal badge and tagline right after typing completes
      setTimeout(() => {
        if (badgeWrap) badgeWrap.classList.add("is-visible");
        if (subtitle) subtitle.classList.add("is-visible");
      }, 120);

      // Transition smoothly into landing page after viewing
      setTimeout(() => {
        dismissIntro();
      }, 1250);
    }
  }

  // Initial pause before typing starts
  setTimeout(typeNextChar, 250);
}

document.addEventListener("DOMContentLoaded", () => {
  renderEditorialNav();
  initIntroExperience();

  const langBtn = document.getElementById("lang-btn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      setLanguage(currentLang === "en" ? "lao" : "en");
    });
  }
});

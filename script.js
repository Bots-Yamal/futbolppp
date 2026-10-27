/* =========================================
   NISK EMOJIS
   ========================================= */


/* EMOJIS */

const emojis = [
  {
    name: "happy",
    emoji: "😀",
    category: "Reacciones"
  },
  {
    name: "laugh",
    emoji: "😂",
    category: "Reacciones"
  },
  {
    name: "love",
    emoji: "😍",
    category: "Cute"
  },
  {
    name: "cool",
    emoji: "😎",
    category: "Reacciones"
  },
  {
    name: "fire",
    emoji: "🔥",
    category: "Memes"
  },
  {
    name: "heart",
    emoji: "❤️",
    category: "Cute"
  },
  {
    name: "sparkles",
    emoji: "✨",
    category: "Cute"
  },
  {
    name: "gaming",
    emoji: "🎮",
    category: "Gaming"
  },
  {
    name: "minecraft",
    emoji: "⛏️",
    category: "Minecraft"
  },
  {
    name: "staff",
    emoji: "🛡️",
    category: "Staff"
  },
  {
    name: "warning",
    emoji: "⚠️",
    category: "Staff"
  },
  {
    name: "check",
    emoji: "✅",
    category: "Staff"
  }
];


/* STICKERS */

const stickers = [
  {
    name: "Happy Cat",
    emoji: "😺",
    category: "Cute"
  },
  {
    name: "Love",
    emoji: "🥰",
    category: "Cute"
  },
  {
    name: "LOL",
    emoji: "🤣",
    category: "Memes"
  },
  {
    name: "Angry",
    emoji: "😡",
    category: "Reacciones"
  },
  {
    name: "Gaming",
    emoji: "🎮",
    category: "Gaming"
  },
  {
    name: "Fire",
    emoji: "🔥",
    category: "Memes"
  },
  {
    name: "Staff",
    emoji: "🛡️",
    category: "Staff"
  },
  {
    name: "Minecraft",
    emoji: "⛏️",
    category: "Minecraft"
  }
];


/* PACKS */

const packs = [
  {
    name: "Cute Pack",
    icon: "💖",
    description: "Emojis y stickers adorables.",
    items: 25
  },
  {
    name: "Staff Pack",
    icon: "🛡️",
    description: "Perfecto para servidores y staff.",
    items: 30
  },
  {
    name: "Gaming Pack",
    icon: "🎮",
    description: "Emojis para comunidades gaming.",
    items: 35
  },
  {
    name: "Meme Pack",
    icon: "😂",
    description: "Reacciones y memes.",
    items: 40
  }
];


/* =========================================
   NAVEGACIÓN
   ========================================= */

function showSection(sectionId) {

  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  const section = document.getElementById(sectionId);

  if (section) {
    section.classList.add("active");
  }

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.remove("active");

    if (button.dataset.section === sectionId) {
      button.classList.add("active");
    }
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


document.querySelectorAll(".nav-btn").forEach(button => {

  button.addEventListener("click", () => {

    showSection(button.dataset.section);

  });

});


/* =========================================
   EMOJIS
   ========================================= */

let selectedEmojiCategory = "Todos";


function getCategories(array) {

  return [
    "Todos",
    ...new Set(array.map(item => item.category))
  ];

}


function renderCategories(containerId, array, callback) {

  const container = document.getElementById(containerId);

  container.innerHTML = "";

  getCategories(array).forEach(category => {

    const button = document.createElement("button");

    button.className = "category";

    if (category === "Todos") {
      button.classList.add("active");
    }

    button.textContent = category;

    button.addEventListener("click", () => {

      container.querySelectorAll(".category")
        .forEach(btn => btn.classList.remove("active"));

      button.classList.add("active");

      callback(category);

    });

    container.appendChild(button);

  });

}


function renderEmojis(category = "Todos", search = "") {

  const grid = document.getElementById("emojiGrid");

  const filtered = emojis.filter(item => {

    const matchesCategory =
      category === "Todos" ||
      item.category === category;

    const matchesSearch =
      item.name.toLowerCase()
        .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;

  });


  grid.innerHTML = "";


  if (filtered.length === 0) {

    grid.innerHTML = `
      <p style="color:var(--muted)">
        No encontramos emojis.
      </p>
    `;

    return;
  }


  filtered.forEach(item => {

    const card = document.createElement("div");

    card.className = "emoji-card";

    card.innerHTML = `
      <div class="emoji-display">
        ${item.emoji}
      </div>

      <div class="emoji-name">
        :${item.name}:
      </div>

      <button
        class="copy-btn"
        onclick="copyEmoji('${item.emoji}', '${item.name}')"
      >
        📋 Copiar
      </button>
    `;

    grid.appendChild(card);

  });

}


function copyEmoji(emoji, name) {

  navigator.clipboard.writeText(emoji);

  showToast(`:${name}: copiado`);

}


/* =========================================
   STICKERS
   ========================================= */

function renderStickers(category = "Todos", search = "") {

  const grid = document.getElementById("stickerGrid");

  const filtered = stickers.filter(item => {

    const matchesCategory =
      category === "Todos" ||
      item.category === category;

    const matchesSearch =
      item.name.toLowerCase()
        .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;

  });


  grid.innerHTML = "";


  filtered.forEach(item => {

    const card = document.createElement("div");

    card.className = "sticker-card";

    card.innerHTML = `
      <div class="sticker-display">
        ${item.emoji}
      </div>

      <div class="sticker-name">
        ${item.name}
      </div>

      <button
        class="copy-btn"
        onclick="copyEmoji('${item.emoji}', '${item.name}')"
      >
        📋 Copiar
      </button>
    `;

    grid.appendChild(card);

  });

}


/* =========================================
   PACKS
   ========================================= */

function renderPacks() {

  const grid = document.getElementById("packGrid");

  grid.innerHTML = "";


  packs.forEach(pack => {

    const card = document.createElement("div");

    card.className = "pack-card";

    card.innerHTML = `
      <div class="pack-icon">
        ${pack.icon}
      </div>

      <h3>
        ${pack.name}
      </h3>

      <p>
        ${pack.description}
      </p>

      <p>
        📦 ${pack.items} elementos
      </p>

      <button
        class="download-btn"
        onclick="downloadPack('${pack.name}')"
      >
        ⬇️ Descargar pack
      </button>
    `;

    grid.appendChild(card);

  });

}


function downloadPack(name) {

  showToast(
    `El pack "${name}" estará disponible próximamente`
  );

}


/* =========================================
   DESTACADOS
   ========================================= */

function renderFeatured() {

  const container =
    document.getElementById("featuredEmojis");

  container.innerHTML = "";


  emojis.slice(0, 6).forEach(item => {

    const card = document.createElement("div");

    card.className = "emoji-card";

    card.innerHTML = `
      <div class="emoji-display">
        ${item.emoji}
      </div>

      <div class="emoji-name">
        :${item.name}:
      </div>

      <button
        class="copy-btn"
        onclick="copyEmoji('${item.emoji}', '${item.name}')"
      >
        📋 Copiar
      </button>
    `;

    container.appendChild(card);

  });

}


/* =========================================
   BUSCADOR
   ========================================= */

document.getElementById("emojiSearch")
  .addEventListener("input", event => {

    renderEmojis(
      selectedEmojiCategory,
      event.target.value
    );

  });


let selectedStickerCategory = "Todos";


document.getElementById("stickerSearch")
  .addEventListener("input", event => {

    renderStickers(
      selectedStickerCategory,
      event.target.value
    );

  });


/* =========================================
   TEMA
   ========================================= */

const themeButton =
  document.getElementById("themeButton");


themeButton.addEventListener("click", () => {

  document.body.classList.toggle("light");

  if (document.body.classList.contains("light")) {

    themeButton.textContent = "☀️";

    localStorage.setItem("theme", "light");

  } else {

    themeButton.textContent = "🌙";

    localStorage.setItem("theme", "dark");

  }

});


if (localStorage.getItem("theme") === "light") {

  document.body.classList.add("light");

  themeButton.textContent = "☀️";

}


/* =========================================
   TOAST
   ========================================= */

function showToast(message) {

  const toast = document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");


  setTimeout(() => {

    toast.classList.remove("show");

  }, 2000);

}


/* =========================================
   INICIALIZACIÓN
   ========================================= */

document.getElementById("emojiCount").textContent =
  emojis.length;

document.getElementById("stickerCount").textContent =
  stickers.length;

document.getElementById("packCount").textContent =
  packs.length;


renderCategories(
  "emojiCategories",
  emojis,
  category => {

    selectedEmojiCategory = category;

    renderEmojis(
      category,
      document.getElementById("emojiSearch").value
    );

  }
);


renderCategories(
  "stickerCategories",
  stickers,
  category => {

    selectedStickerCategory = category;

    renderStickers(
      category,
      document.getElementById("stickerSearch").value
    );

  }
);


renderEmojis();
renderStickers();
renderPacks();
renderFeatured();

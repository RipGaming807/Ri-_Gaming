const uploadInput = document.getElementById("uploadInput");
const uploadBtn = document.getElementById("uploadBtn");
const gamesList = document.getElementById("gamesList");
const body = document.getElementById("body");

let gameCount = 0;

// 📝 Upload Game File (.txt with HTML, CSS, JS blocks)
uploadBtn.addEventListener("click", () => {
  const file = uploadInput.files[0];
  if (!file || !file.name.endsWith(".txt")) {
    return alert("📂 Please upload a valid Notepad (.txt) file.");
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const content = e.target.result;
    const html = extract(content, "<!-- HTML -->");
    const css = extract(content, "<!-- CSS -->");
    const js = extract(content, "<!-- JS -->");

    const finalGame = `
      <!DOCTYPE html>
      <html><head><style>${css}</style></head>
      <body>${html}<script>${js}<\/script></body>
      </html>
    `;

    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <h3>🎮 Game ${++gameCount}</h3>
      <iframe srcdoc="${finalGame.replace(/"/g, '&quot;')}"></iframe>
    `;
    gamesList.appendChild(card);
  };

  reader.readAsText(file);
});

// 🔍 Extract Block From TXT
function extract(str, marker) {
  const lines = str.split("\n");
  const start = lines.indexOf(marker);
  const nextMarkers = ["<!-- HTML -->", "<!-- CSS -->", "<!-- JS -->"].filter(m => m !== marker);
  let end = lines.length;
  for (let m of nextMarkers) {
    const i = lines.indexOf(m);
    if (i > start && i < end) end = i;
  }
  return lines.slice(start + 1, end).join("\n").trim();
}

// 🌗 Theme Switch
document.getElementById("themeToggle").addEventListener("change", e => {
  body.classList.remove("dark-theme", "light-theme");
  body.classList.add(e.target.value === "light" ? "light-theme" : "dark-theme");
});

// 🎨 Background Switch
document.getElementById("bgSelect").addEventListener("change", e => {
  const bg = e.target.value;
  body.classList.remove(
    "bg-black", "bg-neon", "bg-space", "bg-city", "bg-desert",
    "bg-fantasy", "bg-spooky", "bg-urban", "bg-nebula", "bg-planet", "bg-clouds"
  );
  body.classList.add("bg-" + bg);
});

const apps = JSON.parse(localStorage.getItem("myApps") || "[]");
const container = document.getElementById("apps");

if (container) {
  container.innerHTML = ""; // Clear first

  apps.forEach((app, index) => {
    const div = document.createElement("div");
    div.className = "app";

    div.innerHTML = `
      <img src="${app.icon}" alt="${app.name}" />
      <br />
      <strong>${app.name}</strong>
      <br />
      <button onclick="launch('${app.package}')">▶️ Launch</button>
      <button onclick="removeApp(${index})" class="remove-btn">🗑️</button>
    `;

    container.appendChild(div);
  });
}

function launch(pkg) {
  if (pkg === "com.supercell.clashroyale") {
    // Special intent for Clash Royale
    window.location.href =
      "intent://link.clashroyale.com#Intent;scheme=https;package=com.supercell.clashroyale;end";
  } else {
    // Generic intent for other apps
    window.location.href = `intent://${pkg}#Intent;scheme=android-app;package=${pkg};end`;
  }
}

function removeApp(index) {
  const confirmDel = confirm("Are you sure you want to delete this app?");
  if (!confirmDel) return;

  const apps = JSON.parse(localStorage.getItem("myApps") || "[]");
  apps.splice(index, 1);
  localStorage.setItem("myApps", JSON.stringify(apps));
  location.reload();
}

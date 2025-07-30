// script.js - handles loading apps & navigation

const appsContainer = document.getElementById('apps');

function loadApps() {
  const apps = JSON.parse(localStorage.getItem('myApps') || '[]');
  appsContainer.innerHTML = '';

  if(apps.length === 0){
    appsContainer.innerHTML = "<p>No apps added yet! Click below to add some! 🌟</p>";
    return;
  }

  for(let i = 0; i < 10; i++){
    const app = apps[i];
    if(!app) break;

    const appDiv = document.createElement('div');
    appDiv.className = 'app';

    appDiv.innerHTML = `
      <img src="${app.icon}" alt="${app.name} icon" />
      <p>${app.name}</p>
    `;

    appDiv.addEventListener('click', () => {
      window.location.href = `app${i+1}.html`;
    });

    appsContainer.appendChild(appDiv);
  }
}

document.addEventListener('DOMContentLoaded', loadApps);

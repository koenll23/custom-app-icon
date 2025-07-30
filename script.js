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

function saveApps() {
  alert('Save button clicked! 🚀');  // <-- THIS alert added for testing!

  const newApps = [];
  let filesToLoad = 0;
  let filesLoaded = 0;

  for(let i = 0; i < 10; i++){
    const nameInput = document.getElementById(`name${i}`);
    const packageInput = document.getElementById(`package${i}`);
    const iconInput = document.getElementById(`icon${i}`);

    if(!nameInput || !packageInput || !iconInput) continue;

    const name = nameInput.value.trim();
    const pkg = packageInput.value.trim();
    const iconFile = iconInput.files[0];

    if(!name && !pkg) continue;

    if(iconFile){
      filesToLoad++;
      const reader = new FileReader();
      reader.onload = (e) => {
        newApps.push({ name, package: pkg, icon: e.target.result });
        filesLoaded++;
        if(filesLoaded === filesToLoad){
          localStorage.setItem('myApps', JSON.stringify(newApps));
          alert('Apps saved with icons! 🎉');
        }
      }
      reader.readAsDataURL(iconFile);
    } else {
      newApps.push({ name, package: pkg, icon: '' });
    }
  }

  if(filesToLoad === 0){
    localStorage.setItem('myApps', JSON.stringify(newApps));
    alert('Apps saved without icons! 🎉');
  }
}

document.addEventListener('DOMContentLoaded', loadApps);

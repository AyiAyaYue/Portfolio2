// Show Time
const time = document.getElementById('timer');

function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();

    if (min < 10) {
        min = "0" + min;
    }

    time.innerHTML = `${hour}<span>:</span>${min}`;

    setTimeout(showTime, 1000);
}

showTime();

const icons = {
    projects: document.getElementsByClassName('projects')[0],
    skills: document.getElementsByClassName('skills')[0],
    about: document.getElementsByClassName('about-me')[0],
    music: document.getElementsByClassName('music-list')[0],
    email: document.getElementsByClassName('email-me')[0],
};

const openFolders = [];

for (const [key, icon] of Object.entries(icons)) {
    icon.addEventListener('click', (event) => {
        const folder = folders[key];
        
        if (!openFolders.includes(folder)) {
            openFolders.push(folder);
            folder.style.zIndex = openFolders.indexOf(folder);
            folder.style.display = 'block';
        }
 
        event.preventDefault();
    });
}

const folders = {
    projects: document.getElementsByClassName('hidden-projects')[0],
    skills: document.getElementsByClassName('hidden-skills')[0],
    about: document.getElementsByClassName('hidden-about-me')[0],
    music: document.getElementsByClassName('hidden-music')[0],
    email: document.getElementsByClassName('hidden-email')[0]
};

const closeButtons = document.getElementsByClassName('close');
for (const button of closeButtons) {
    button.addEventListener('click', (event) => {
        const folder = event.target.closest('.window');
        folder.style.display = 'none';

        openFolders.splice(openFolders.indexOf(folder), 1);
        for (const folder of openFolders) {
            folder.style.zIndex = openFolders.indexOf(folder);
        }

        event.preventDefault();
    });
};

for (const folder of Object.values(folders)) {
    folder.addEventListener('click', (event) => {
        if (event.target.className.includes('close')) return; // ignore if close btn clicked

        openFolders.splice(openFolders.indexOf(folder), 1); // remove folder from openFolders
        openFolders.push(folder);

        for (const otherfolder of openFolders) {
            otherfolder.style.zIndex = openFolders.indexOf(otherfolder);
        }

        event.preventDefault();
    });
}
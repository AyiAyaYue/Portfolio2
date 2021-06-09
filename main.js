// Show Time
const time = document.getElementById('timer');

function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();

    if (hour < 10) {
        hour = "0" + hour;
    }

    if (min < 10) {
        min = "0" + min;
    }

    time.innerHTML = `${hour}<span>:</span>${min}`;

    setTimeout(showTime, 1000);
}

showTime();

// open/close folders, ordering folders
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

// most recent folder clicked, folder shows most front
for (const folder of Object.values(folders)) {
    folder.addEventListener('click', (event) => {
        if (event.target.className.includes('close')) return; // ignore if close btn clicked

        openFolders.splice(openFolders.indexOf(folder), 1); // remove folder from openFolders
        openFolders.push(folder);

        for (const openFolder of openFolders) {
            openFolder.style.zIndex = openFolders.indexOf(openFolder);
        }

        event.preventDefault();
    });
}

//windows

//drag
const el = document.getElementsByClassName('window')[0];

el.addEventListener('mousedown', mousedown);

function mousedown(e) {
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

    function mousemove(e) {

        el.style.left  = -600 + e.clientX + "px";
        el.style.top = -390 + e.clientY + "px";

        prevX = e.clientX;
        prevY = e.clientY;
        console.log(`Mouse X: ${e.clientX}, Mouse Y: ${e.clientY}`);
    }
    
    function mouseup() {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);
    }

    console.log('clicked');
}


//FED folder
const fedIcon = document.getElementsByClassName('fed-icon')[0];
const fedContent = document.querySelector('.fed-content');

fedIcon.addEventListener('click', function() {

    fedContent.style.display = 'block';

})


const ucdIcon = document.getElementsByClassName('ucd-icon')[0];

const mpIcon = document.getElementsByClassName('mp-icon')[0];

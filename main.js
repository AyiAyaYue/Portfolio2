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
    fed: document.getElementsByClassName('front-end')[0],
    ux: document.getElementsByClassName('UCD')[0],
    mp: document.getElementsByClassName('MP')[0]
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
    email: document.getElementsByClassName('hidden-email')[0],
    fed: document.getElementsByClassName('fed-content')[0],
    ux: document.getElementsByClassName('ux-content')[0],
    mp: document.getElementsByClassName('mp-content')[0]
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
        if (event.target.className.includes('close') || event.target.parentElement.className.includes('icon')) return; // ignore if close btn clicked

        openFolders.splice(openFolders.indexOf(folder), 1); // remove folder from openFolders
        openFolders.push(folder);

        for (const openFolder of openFolders) {
            openFolder.style.zIndex = openFolders.indexOf(openFolder);
        }

        event.preventDefault();
    });
}

//drag
const windows = document.getElementsByClassName('window');

for (const el of windows) {
    el.addEventListener('mousedown', (e) => mousedown(e, el));
}

function mousedown(e, el) {
    console.log(e.target.parentElement.parentElement)
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - rect.x;
    const offsetY = e.clientY - rect.y;

    function mousemove(e) {
        openFolders.splice(openFolders.indexOf(el), 1); // remove folder from openFolders
        openFolders.push(el);

        for (const openFolder of openFolders) {
            openFolder.style.zIndex = openFolders.indexOf(openFolder);
        }

        el.style.left = -window.innerWidth / 2 + e.clientX - offsetX + "px";
        el.style.top = -(window.innerHeight - 60) / 2 + e.clientY - offsetY + "px";

        prevX = e.clientX;
        prevY = e.clientY;
        //console.log(`Mouse X: ${e.clientX}, Mouse Y: ${e.clientY}`);
    }

    function mouseup() {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);
    }

    //console.log('clicked');
}

//music player
const playBtn = document.querySelector('#play');
const pauseBtn = document.querySelector('#pause');
const stopBtn = document.querySelector('#stop');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

//song title
const songs = ['Claudio', 'SunnyDays', 'MegaMan'];

//keep track
let songIndex = 2;

//loadsonginfo
loadSong(songs[songIndex]);

//update
function loadSong(song) {
    audio.src = `audio/${song}.mp3`;
}

function play() {
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();

}

function pause() {
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

function stop() {
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
    audio.currentTime = 0;
}

function prev() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex]);

    play();
}

function next() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    play();
}

playBtn.addEventListener('click', () => {

    if (audio.paused) {
        play();
    } else {
        pause();
    }
});
stopBtn.addEventListener('click', stop());
prevBtn.addEventListener('click', prev());
nextBtn.addEventListener('click', next());

//display duration
const progress = document.querySelector('.progress');

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

}

audio.ontimeupdate = function () {myFunction()};
function myFunction() {
    //let counter = Math.round(Math.floor(audio.currentTime) / 60) + ":" + Math.floor(audio.currentTime - Math.round(Math.floor(audio.currentTime) / 60));
    let minutes  = Math.floor(audio.currentTime / 60);
    let seconds  = Math.floor(audio.currentTime - minutes * 60);

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    document.getElementById('music-timer').innerHTML = `${minutes} : ${seconds}`;
}

const display = document.querySelector('.display');

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

audio.addEventListener('timeupdate', updateProgress);
display.addEventListener('click', setProgress);

audio.addEventListener('ended', next);

// my tools
var header = document.getElementById("skill-btn");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}

const mpBtn = document.getElementsByClassName("mp-btn")[0];
const uxBtn = document.getElementsByClassName("ux-btn")[0];
const fedBtn = document.getElementsByClassName("fed-btn")[0];
const othersBtn = document.getElementsByClassName("others-btn")[0];

const mpTools = document.querySelector(".mp-skills");
const uxTools = document.querySelector(".ux-skills");
const fedTools = document.querySelector(".fed-skills");
const otherTools = document.querySelector(".other-skills");

mpBtn.addEventListener('click', function() {
    uxTools.style.display = "none";
    mpTools.style.display = "block";
    fedTools.style.display = "none";
    otherTools.style.display = "none";
})

uxBtn.addEventListener('click', function() {
    uxTools.style.display = "block";
    mpTools.style.display = "none";
    fedTools.style.display = "none";
    otherTools.style.display = "none";
})

fedBtn.addEventListener('click', function() {
    uxTools.style.display = "none";
    mpTools.style.display = "none";
    fedTools.style.display = "block";
    otherTools.style.display = "none";
})

othersBtn.addEventListener('click', function() {
    uxTools.style.display = "none";
    mpTools.style.display = "none";
    fedTools.style.display = "none";
    otherTools.style.display = "block";
})

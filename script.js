console.log("Checking code execution...");

let currentSong = new Audio();
let b = [];
let currentIndex = 0;

async function getSongs() {
    let res = await fetch("songs.json");
    let songs = await res.json();
    return songs;
}

function playMusic(track) {
    currentSong.src = track;
    currentSong.play();
    document.querySelector(".songname1").innerHTML = track.split("/").pop();
}

function formatTime(seconds) {
    seconds = Math.floor(seconds);

    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    if (secs < 10) secs = "0" + secs;
    if (mins < 10) mins = "0" + mins;

    return `${mins}:${secs}`;
}

async function main() {
    b = await getSongs();

    let songlist = document.querySelector(".ok");
    songlist.innerHTML = "";

    for (let i = 0; i < b.length; i++) {
        songlist.innerHTML += `<li>
                        <img src="song.svg" height="30px" width="30px" alt="songicon">
                        <div class="songinfo">
                            <div class="songname">${b[i].split("/").pop()}</div>
                            <div class="songcreator">-Sakar </div>
                        </div>
                        <div class="playnow">
                            <div>Play Now</div>
                            <img height="20px" width="20px" src="play-svgrepo-com.svg" alt="">
                        </div>
                    </li>`;
    }

    // Default first song
    currentSong.src = b[0];
    document.querySelector(".songname1").innerHTML = b[0].split("/").pop();
    document.querySelector(".duration").innerHTML = "00:00 / 00:00";

    // Click song list
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach((li, index) => {
        li.addEventListener("click", () => {
            playMusic(b[index]);
            currentIndex = index;
            document.getElementById("play").src = "pause.svg";
            document.querySelector(".sidebar").style.left = "-100%";
        });
    });

    // Play/Pause
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "pause.svg";
        } else {
            currentSong.pause();
            play.src = "play-svgrepo-com.svg";
        }
    });

    // Update duration and seek circle
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".duration").innerHTML =
            `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`;

        document.querySelector(".circle").style.left =
            (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Seek bar click
    document.querySelector(".soundbar").addEventListener("click", (e) => {
        document.querySelector(".circle").style.left =
            (e.offsetX / e.target.getBoundingClientRect().width) * 100 + "%";

        currentSong.currentTime =
            (e.offsetX / e.target.getBoundingClientRect().width) * currentSong.duration;
    });

    // Hamburger sidebar toggle
    ham.addEventListener("click", () => {
        let sidebar = document.querySelector(".sidebar");

        if (getComputedStyle(sidebar).left === "0px") {
            sidebar.style.left = "-100%";
        } else {
            sidebar.style.left = "0%";
        }
    });

    // Dummy features
    document.querySelector(".searchbox").addEventListener("click", () => alert("its a dummy feature"));
    document.querySelector(".logohome").addEventListener("click", () => alert("its a dummy feature"));
    document.querySelector(".ndsection").addEventListener("click", () => alert("its a dummy feature"));
    document.querySelector(".search").addEventListener("click", () => alert("its a dummy feature"));

    // Previous button
    pre.addEventListener("click", () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = b.length - 1;
        playMusic(b[currentIndex]);
        play.src = "pause.svg";
    });

    // Next button
    next.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex >= b.length) currentIndex = 0;
        playMusic(b[currentIndex]);
        play.src = "pause.svg";
    });

    // Volume control
    let volumeBar = document.getElementById("volumeBar");
    let volumeIcon = document.getElementById("volumeIcon");

    currentSong.volume = volumeBar.value / 100;

    volumeBar.addEventListener("input", () => {
        currentSong.volume = volumeBar.value / 100;

        if (volumeBar.value == 0) {
            volumeIcon.src = "sound.svg";
        } else {
            volumeIcon.src = "sound.svg";
        }
    });

    volumeIcon.addEventListener("click", () => {
        if (currentSong.volume > 0) {
            currentSong.volume = 0;
            volumeBar.value = 0;
            volumeIcon.src = "sound.svg";
        } else {
            currentSong.volume = 1;
            volumeBar.value = 100;
            volumeIcon.src = "sound.svg";
        }
    });
}

main();
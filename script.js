console.log("Checking code execution...");
let currentSong = new Audio();
let b = [];
let currentIndex = 0;

let a;
async function getSongs() {
    a = await fetch("http://127.0.0.1:3000/songs/");
    b = await a.text();
    let div = document.createElement("div")
    div.innerHTML = b
    let c = div.getElementsByTagName("a")
    let songs = []

    for (let index = 0; index < c.length; index++) {
        const element = c[index];
        if (element.innerHTML.endsWith(".mp3")) {
            songs.push(element)
        }
    }
    let names = []
    for (let index = 0; index < songs.length; index++) {
        const element = songs[index];
        names[index] = element.innerHTML
    }
    return names
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

    // add leading zero if needed
    if (secs < 10) secs = "0" + secs;
    if (mins < 10) mins = "0" + mins;

    return `${mins}:${secs}`;
}


async function main() {
    b = await getSongs();
    // console.log(b)
    let songlist = document.querySelector(".ok")
    for (let i = 0; i < b.length; i++) {
        songlist.innerHTML += `<li>
                        <img src="song.svg" height="30px" width="30px" alt="songicon">
                        <div class="songinfo">
                            <div class="songname">${b[i]}</div>
                            <div class="songcreator">-Sakar </div>
                        </div>
                        <div class="playnow">
                            <div>Play Now</div>
                            <img height="20px" width="20px" src="play-svgrepo-com.svg" alt="">
                        </div>
                    </li>`;
    }
    currentSong.src = "songs/" + document.querySelector(".songname").innerHTML
    document.querySelector(".songname1").innerHTML = document.querySelector(".songname").innerHTML
    document.querySelector(".duration").innerHTML = "00:00 / 00:00"

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", e => {
            console.log(e.currentTarget.querySelector(".songname").innerHTML)
            playMusic(e.currentTarget.querySelector(".songname").innerHTML)
            document.getElementById("play").src = "pause.svg"
            document.querySelector(".sidebar").style.left = "-100%"
        })
    });
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "play-svgrepo-com.svg"
        }
    })
    currentSong.addEventListener("timeupdate", () => {
        // console.log(currentSong.currentTime, currentSong.duration)
        document.querySelector(".duration").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })
    document.querySelector(".soundbar").addEventListener("click", (e) => {
        document.querySelector(".circle").style.left = (e.offsetX / e.target.getBoundingClientRect().width) * 100 + "%"
        currentSong.currentTime = (e.offsetX / e.target.getBoundingClientRect().width) * currentSong.duration
    })
    ham.addEventListener("click", () => {
        let sidebar = document.querySelector(".sidebar");

        if (getComputedStyle(sidebar).left === "0px") {
            sidebar.style.left = "-100%";
        } else {
            sidebar.style.left = "0%";
        }
    });
    document.querySelector(".searchbox").addEventListener("click", () => {
        alert("its a dummy feature")
    })
    document.querySelector(".logohome").addEventListener("click", () => {
        alert("its a dummy feature")
    })
    document.querySelector(".ndsection").addEventListener("click", () => {
        alert("its a dummy feature")
    })
    document.querySelector(".search").addEventListener("click", () => {
        alert("its a dummy feature")
    })
    pre.addEventListener("click", () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = b.length - 1;
        playMusic(b[currentIndex]);
        play.src = "pause.svg"
    });

    next.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex >= b.length) currentIndex = 0;
        playMusic(b[currentIndex]);
        play.src = "pause.svg"
    });
    let volumeBar = document.getElementById("volumeBar");
    let volumeIcon = document.getElementById("volumeIcon");

    // Default volume
    currentSong.volume = volumeBar.value / 100;

    // Change volume when slider changes
    volumeBar.addEventListener("input", () => {
        currentSong.volume = volumeBar.value / 100;

        if (volumeBar.value == 0) {
            volumeIcon.src = "sound.svg";
        }
        else {
            volumeIcon.src = "sound.svg";
        }
    });

    // Click icon to mute/unmute
    volumeIcon.addEventListener("click", () => {
        if (currentSong.volume > 0) {
            currentSong.volume = 0;
            volumeBar.value = 0;
            volumeIcon.src = "sound.svg";
        }
        else {
            currentSong.volume = 1;
            volumeBar.value = 100;
            volumeIcon.src = "sound.svg";
        }
    });

}
main()




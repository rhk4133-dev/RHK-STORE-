// Extracted YouTube IDs from your URLs
let songs = [
"h13lbNkUaEg","sf7VoyW_5ro","EtGh9oC2SZ0","yh3C2JU-m_Y","1PxT9i4-uTc",
"Q-_cu_78eIA","0pVMxbQh-Lc","NeXbmEnpSz0","palMj0iq-3g","LbrJZgyqp5w",
"vipdDXKHT_0","ElIizBi-rEc","DL8BsPDe4ck","N5BmQz4AmFI","CQSzGF9VAak",
"pPGcYXZhCPY","YjoKyFJf4CU","aorAeMA06i0","vmu53OX935A","wc-pzBaSiPA",
"PMzTLWTWLZU","g5O5ufz8w34","5Eqb_-j3FDA","uXgzCjAv-9k","Zu6z3qUPu1s",
"sX4Bxks_VlI","hoNb6HuNmU0","LK7-_dgAVQE","Pm7sWFzcPes","yu8nxs1gw48",
"wiur_AGatGU","LAdp3ZHeP4Q","rUeyfai1ddc","FCDAnPFJUPA","AN8-o7ckg6k"
];

let currentIndex = 0;
let player;
let isShuffle = false;
let isRepeat = false;

const songList = document.getElementById("songList");
const nowPlaying = document.getElementById("nowPlaying");
const loader = document.getElementById("loader");

// Create Song List
songs.forEach((id, index) => {
    let div = document.createElement("div");
    div.className = "song-item";
    div.innerText = "RHK Song " + (index + 1);
    div.onclick = () => playSong(index);
    songList.appendChild(div);
});

// YouTube API
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubePlayer', {
        height: '0',
        width: '0',
        videoId: songs[0],
        playerVars: { autoplay: 0, controls: 0 },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        if (isRepeat) {
            playSong(currentIndex);
        } else {
            nextSong();
        }
    }

    if (event.data === YT.PlayerState.PLAYING) {
        loader.style.display = "none";
    }
}

function playSong(index) {
    currentIndex = index;
    loader.style.display = "flex";
    player.loadVideoById(songs[index]);
    nowPlaying.innerText = "Playing: RHK Song " + (index + 1);
}

function togglePlay() {
    if (!player) return;

    let state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        document.getElementById("playBtn").innerText = "▶";
    } else {
        player.playVideo();
        document.getElementById("playBtn").innerText = "⏸";
    }
}

function nextSong() {
    if (isShuffle) {
        currentIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentIndex = (currentIndex + 1) % songs.length;
    }
    playSong(currentIndex);
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex);
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    alert("Shuffle " + (isShuffle ? "ON" : "OFF"));
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    alert("Repeat " + (isRepeat ? "ON" : "OFF"));
}

function toggleTheme() {
    document.body.classList.toggle("light-mode");
}
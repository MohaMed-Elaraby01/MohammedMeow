// Visitor count
let visitorCount = 160;
if (localStorage.getItem("visitorCount")) {
  visitorCount = parseInt(localStorage.getItem("visitorCount")) + 1;
}
localStorage.setItem("visitorCount", visitorCount);
document.getElementById("visitor-count").innerText = visitorCount;

// عناصر السر
const secretBtn = document.getElementById("secretBtn");
const modal = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");

// زر السر
secretBtn.addEventListener("click", () => {
  const answer = prompt("حط إسم عيلتي التانية يحج");
  if (answer === "الخربة") {
    modal.style.display = "flex";
  } else if (answer !== null) {
    alert("غلط");
  }
});

// قفل الرسالة
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Music Player
const musicBox = document.getElementById("musicBox");
const songList = document.getElementById("songList");
const audioPlayer = document.getElementById("audioPlayer");
const currentSongImage = document.getElementById("currentSongImage");

let currentSong = null;
let loopMode = "all"; // all or single
let progressDragging = false;
let progressData = {}; // stores currentTime for each song

musicBox.addEventListener("click", () => {
  songList.style.display = songList.style.display === "flex" ? "none" : "flex";
});

// Initialize songs
document.querySelectorAll(".song").forEach((song, index, allSongs) => {
  const playBtn = song.querySelector(".play-btn");
  const loopBtn = song.querySelector(".loop-btn");
  const nextBtn = song.querySelector(".next-btn");
  const prevBtn = song.querySelector(".prev-btn");
  const timeLabel = song.querySelector(".song-time");
  const progressBar = song.querySelector(".progress-bar");
  const progressFill = song.querySelector(".progress-fill");
  const progressThumb = song.querySelector(".progress-thumb");
  const src = song.getAttribute("data-src");
  const img = song.getAttribute("data-img");

  // Load saved time
  if (!progressData[src]) progressData[src] = 0;

  function playSong() {
    if (currentSong !== song) {
      if (currentSong) {
        currentSong.querySelector(".play-btn").textContent = "▶️";
        progressData[currentSong.getAttribute("data-src")] = audioPlayer.currentTime;
      }
      currentSong = song;
      audioPlayer.src = src;
      currentSongImage.src = img;
      audioPlayer.currentTime = progressData[src];
      audioPlayer.play();
      playBtn.textContent = "⏸️";
    } else {
      if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.textContent = "⏸️";
      } else {
        audioPlayer.pause();
        playBtn.textContent = "▶️";
      }
    }
  }

  playBtn.addEventListener("click", playSong);

  loopBtn.addEventListener("click", () => {
    if (loopMode === "all") {
      loopMode = "single";
      loopBtn.textContent = "🔂";
    } else {
      loopMode = "all";
      loopBtn.textContent = "🔁";
    }
  });

  nextBtn.addEventListener("click", () => {
    const nextIndex = (index + 1) % allSongs.length;
    allSongs[nextIndex].querySelector(".play-btn").click();
  });

  prevBtn.addEventListener("click", () => {
    const prevIndex = (index - 1 + allSongs.length) % allSongs.length;
    allSongs[prevIndex].querySelector(".play-btn").click();
  });

  function updateProgress() {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100 || 0;
    progressFill.style.width = percent + "%";
    progressThumb.style.left = percent + "%";
    timeLabel.textContent = `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration)}`;
  }

  audioPlayer.addEventListener("timeupdate", () => {
    if (currentSong === song && !progressDragging) updateProgress();
  });

  audioPlayer.addEventListener("ended", () => {
    if (loopMode === "single") {
      audioPlayer.currentTime = 0;
      audioPlayer.play();
    } else {
      const nextIndex = (index + 1) % allSongs.length;
      allSongs[nextIndex].querySelector(".play-btn").click();
    }
  });

  // Progress dragging (mouse + touch)
  function startDrag(e) {
    progressDragging = true;
    moveDrag(e);
  }
  function moveDrag(e) {
    if (!progressDragging) return;
    const rect = progressBar.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let percent = (clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));
    progressFill.style.width = percent * 100 + "%";
    progressThumb.style.left = percent * 100 + "%";
    timeLabel.textContent = `${formatTime(percent * audioPlayer.duration)} / ${formatTime(audioPlayer.duration)}`;
    audioPlayer.currentTime = percent * audioPlayer.duration;
  }
  function stopDrag() { progressDragging = false; }

  progressBar.addEventListener("mousedown", startDrag);
  progressBar.addEventListener("mousemove", moveDrag);
  document.addEventListener("mouseup", stopDrag);

  progressBar.addEventListener("touchstart", startDrag);
  progressBar.addEventListener("touchmove", moveDrag);
  document.addEventListener("touchend", stopDrag);
});

// Format time
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0"+s : s}`;
}
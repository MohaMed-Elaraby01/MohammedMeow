// --- عداد الزوار ---
let visitorCount = 250;
if (localStorage.getItem("visitorCount")) {
  visitorCount = parseInt(localStorage.getItem("visitorCount")) + 1;
}
localStorage.setItem("visitorCount", visitorCount);
document.getElementById("visitor-count").innerText = visitorCount;

// مودالات
const secretBtn = document.getElementById("secretBtn");
const passwordModal = document.getElementById("passwordModal");
const passwordInput = document.getElementById("passwordInput");
const checkPassword = document.getElementById("checkPassword");
const closePassword = document.getElementById("closePassword");

// ===== زر المعلومات =====
const aboutBtn = document.getElementById("aboutBtn");
const aboutModal = document.getElementById("aboutModal");
const closeAbout = document.querySelector(".close-about");

// فتح/إغلاق المودال
aboutBtn.addEventListener("click", (e)=>{
  e.stopPropagation();
  aboutModal.style.display = aboutModal.style.display==="flex" ? "none" : "flex";
});

// زر الغلق داخل المودال
closeAbout.addEventListener("click", ()=>{
  aboutModal.style.display="none";
});

// إغلاق المودال عند الضغط في أي مكان خارج المودال
document.addEventListener("click", ()=>{
  aboutModal.style.display="none";
});

// منع إغلاق عند الضغط داخل المودال
aboutModal.querySelector(".about-modal").addEventListener("click", e=>{
  e.stopPropagation();
});

const modal = document.getElementById("modalOverlay");
const voicePlayer = document.getElementById("voicePlayer");
const closeVoice = document.getElementById("closeVoice");
const playPauseVoice = document.getElementById("playPauseVoice");
const voiceProgressFill = document.querySelector(".voice-progress-fill");
const voiceThumb = document.querySelector(".voice-thumb");
const voiceProgressBar = document.querySelector(".voice-progress-bar");
const voiceTime = document.getElementById("voice-time");
let voiceUserInteracted = false;
// ⚡ منع توقف الفويس فجأة
voicePlayer.addEventListener("pause", () => {
  if (!voicePlayer.ended && voiceUserInteracted) {
    setTimeout(() => {
      voicePlayer.play().catch(()=>{});
    }, 50);
  }
});

// ✅ هنا نحط إغلاق مودال الفويس
closeVoice.addEventListener("click", () => {
  voiceUserInteracted = false;
  voicePlayer.pause();
  voicePlayer.currentTime = 0;
  modal.style.display = "none";
});

// فتح مودال كلمة السر
secretBtn.addEventListener("click", () => {
  passwordModal.style.display = "flex";
  passwordInput.value = "";
});

// التحقق من كلمة السر
checkPassword.addEventListener("click", () => {
  const answer = passwordInput.value.trim();
  if (answer === "راون" || answer === "روان") {
    passwordModal.style.display = "none";
    modal.style.display = "flex"; // مودال الفويس
    voicePlayer.pause();
    playPauseVoice.textContent = "▶️";
  } else {
    alert(".غلط");
  }
});

// إغلاق مودال كلمة السر
closePassword.addEventListener("click", () => {
  passwordModal.style.display = "none";
});

// زر معلومات عني
aboutBtn.addEventListener("click", () => {
  aboutModal.style.display = "flex";
});
closeAbout.addEventListener("click", () => {
  aboutModal.style.display = "none";
});

// زر الإغلاق للفويس
closeVoice.addEventListener("click", () => {
  voicePlayer.pause();
  modal.style.display = "none";
});

// زر التشغيل / الإيقاف للفويس
playPauseVoice.addEventListener("click", () => {
  voiceUserInteracted = true;

  audioPlayer.pause();

  if (voicePlayer.paused) {
    voicePlayer.play().catch(()=>{});
    playPauseVoice.textContent = "⏸️";
  } else {
    voicePlayer.pause();
    playPauseVoice.textContent = "▶️";
  }
});

// تحديث شريط التقدم ووقت الفويس الحالي والكامل
voicePlayer.addEventListener("timeupdate", () => {
  const percent = (voicePlayer.currentTime / voicePlayer.duration) * 100 || 0;
  voiceProgressFill.style.width = percent + "%";
  voiceThumb.style.left = percent + "%";
  voiceTime.textContent = `${formatTime(voicePlayer.currentTime)} / ${formatTime(voicePlayer.duration)}`;
});

// سحب شريط التقدم
let draggingVoice = false;
function startDrag(e) { draggingVoice = true; moveDrag(e); }
function moveDrag(e) {
  if (!draggingVoice) return;
  const rect = voiceProgressBar.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  let percent = (clientX - rect.left) / rect.width;
  percent = Math.max(0, Math.min(1, percent));
  voiceProgressFill.style.width = percent * 100 + "%";
  voiceThumb.style.left = percent * 100 + "%";
  voicePlayer.currentTime = percent * voicePlayer.duration;
}
function stopDrag() { draggingVoice = false; }

voiceProgressBar.addEventListener("mousedown", startDrag);
voiceProgressBar.addEventListener("mousemove", moveDrag);
document.addEventListener("mouseup", stopDrag);
voiceProgressBar.addEventListener("touchstart", startDrag);
voiceProgressBar.addEventListener("touchmove", moveDrag);
document.addEventListener("touchend", stopDrag);

// Format الوقت
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0"+s : s}`;
}

// عند انتهاء الصوت
voicePlayer.addEventListener("ended", () => {
  playPauseVoice.textContent = "▶️";
});

// Music Box
const musicBox=document.getElementById("musicBox");
const songList=document.getElementById("songList");
const audioPlayer=document.getElementById("audioPlayer");
const currentSongImage=document.getElementById("currentSongImage");
let currentSong=null,loopMode="all",progressDragging=false,progressData={};

musicBox.addEventListener("click",()=>{songList.style.display=songList.style.display==="flex"?"none":"flex";});

document.querySelectorAll(".song").forEach((song,index,allSongs)=>{
  const playBtn=song.querySelector(".play-btn");
  const loopBtn=song.querySelector(".loop-btn");
  const nextBtn=song.querySelector(".next-btn");
  const prevBtn=song.querySelector(".prev-btn");
  const timeLabel=song.querySelector(".song-time");
  const progressBar=song.querySelector(".progress-bar");
  const progressFill=song.querySelector(".progress-fill");
  const progressThumb=song.querySelector(".progress-thumb");
  const src=song.getAttribute("data-src");
  const img=song.getAttribute("data-img");
  if(!progressData[src]) progressData[src]=0;

  function playSong(){
    if(currentSong!==song){
      if(currentSong){ currentSong.querySelector(".play-btn").textContent="▶️"; progressData[currentSong.getAttribute("data-src")]=audioPlayer.currentTime;}
      currentSong=song;
      audioPlayer.src=src;
      currentSongImage.src=img;
      audioPlayer.currentTime=progressData[src];
      audioPlayer.play();
      playBtn.textContent="⏸️";
    } else {
      if(audioPlayer.paused){ audioPlayer.play(); playBtn.textContent="⏸️"; } 
      else { audioPlayer.pause(); playBtn.textContent="▶️"; }
    }
  }
  playBtn.addEventListener("click",playSong);
  loopBtn.addEventListener("click",()=>{loopMode=loopMode==="all"?"single":"all"; loopBtn.textContent=loopMode==="all"?"🔁":"🔂";});
  nextBtn.addEventListener("click",()=>{const nextIndex=(index+1)%allSongs.length; allSongs[nextIndex].querySelector(".play-btn").click();});
  prevBtn.addEventListener("click",()=>{const prevIndex=(index-1+allSongs.length)%allSongs.length; allSongs[prevIndex].querySelector(".play-btn").click();});

  function updateProgress(){
    const percent=(audioPlayer.currentTime/audioPlayer.duration)*100||0;
    progressFill.style.width=percent+"%";
    progressThumb.style.left=percent+"%";
    timeLabel.textContent=`${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration)}`;
  }

  audioPlayer.addEventListener("timeupdate",()=>{if(currentSong===song && !progressDragging) updateProgress();});
  audioPlayer.addEventListener("ended",()=>{if(loopMode==="single"){audioPlayer.currentTime=0;audioPlayer.play();} else {const nextIndex=(index+1)%allSongs.length; allSongs[nextIndex].querySelector(".play-btn").click();}});

  function startDragProgress(e){progressDragging=true; moveDragProgress(e);}
  function moveDragProgress(e){if(!progressDragging) return; const rect=progressBar.getBoundingClientRect(); const clientX=e.touches?e.touches[0].clientX:e.clientX; let percent=(clientX-rect.left)/rect.width; percent=Math.max(0,Math.min(1,percent)); progressFill.style.width=percent*100+"%"; progressThumb.style.left=percent*100+"%"; audioPlayer.currentTime=percent*audioPlayer.duration;}
  function stopDragProgress(){progressDragging=false;}
  progressBar.addEventListener("mousedown",startDragProgress);
  progressBar.addEventListener("mousemove",moveDragProgress);
  document.addEventListener("mouseup",stopDragProgress);
  progressBar.addEventListener("touchstart",startDragProgress);
  progressBar.addEventListener("touchmove",moveDragProgress);
  document.addEventListener("touchend",stopDragProgress);
});

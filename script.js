document.addEventListener("DOMContentLoaded", () => {

  // ===== الفقاعة =====
  const statusBubble = document.getElementById("statusBubble");
  setTimeout(() => {
    statusBubble.classList.add("show");
    setTimeout(() => statusBubble.classList.remove("show"), 8000);
  }, 1000);

  // ===== عداد الزوار =====
  let visitorCount = parseInt(localStorage.getItem("visitorCount") || "250") + 1;
  localStorage.setItem("visitorCount", visitorCount);
  document.getElementById("visitor-count").innerText = visitorCount;

  // ===== زر الهلال (ديني) =====
  const religionBtn = document.getElementById("religionBtn");
  const religionModal = document.getElementById("religionModal");
  const closeReligion = document.querySelector(".close-religion");

  if (religionBtn) {
    religionBtn.addEventListener("click", e => {
      e.stopPropagation();
      religionModal.style.display = "flex";
    });
  }

  if (closeReligion) {
    closeReligion.addEventListener("click", () => {
      religionModal.style.display = "none";
    });
  }

  if (religionModal) {
    religionModal.addEventListener("click", e => {
      if (e.target === religionModal) religionModal.style.display = "none";
    });
  }

  // ===== مودالات =====
  const passwordModal = document.getElementById("passwordModal");
  const passwordInput = document.getElementById("passwordInput");
  const checkPassword = document.getElementById("checkPassword");
  const closePassword = document.getElementById("closePassword");
  const secretBtn = document.getElementById("secretBtn");

  const wrongPasswordModal = document.getElementById("wrongPasswordModal");
  const closeWrongPassword = document.getElementById("closeWrongPassword");

  const newMessageModal = document.getElementById("newMessageModal");
  const messageInput = document.getElementById("messageInput");
  const sendMessageBtn = document.getElementById("sendMessageBtn");
  const messageBtn = document.getElementById("openMessageModal");
  const closeNewMessage = document.getElementById("closeNewMessage");

  const emptyMessageModal = document.getElementById("emptyMessageModal");
  const closeEmptyMessage = document.getElementById("closeEmptyMessage");

  const successModal = document.getElementById("successModal");
  const closeSuccess = successModal.querySelector("button");

  const aboutModal = document.getElementById("aboutModal");
  const aboutBtn = document.getElementById("aboutBtn");
  const closeAbout = document.querySelector(".close-about");

  const modal = document.getElementById("modalOverlay");
  const voicePlayer = document.getElementById("voicePlayer");
  const playPauseVoice = document.getElementById("playPauseVoice");
  const closeVoice = document.getElementById("closeVoice");
  const voiceProgressFill = document.querySelector(".voice-progress-fill");
  const voiceThumb = document.querySelector(".voice-thumb");
  const voiceProgressBar = document.querySelector(".voice-progress-bar");
  const voiceTime = document.getElementById("voice-time");
  let voiceUserInteracted = false;
  let draggingVoice = false;

  // ===== صندوق الموسيقى =====
  const musicBox = document.getElementById("musicBox");
  const songList = document.getElementById("songList");
  const audioPlayer = document.getElementById("audioPlayer");
  const currentSongImage = document.getElementById("currentSongImage");

  const playBtn = document.querySelector("#qar2atSong .play-btn");
  const nextBtn = document.querySelector("#qar2atSong .next-btn");
  const prevBtn = document.querySelector("#qar2atSong .prev-btn");
  const loopBtn = document.querySelector("#qar2atSong .loop-btn");
  const progressBar = document.querySelector("#qar2atSong .progress-bar");
  const progressFill = document.querySelector("#qar2atSong .progress-fill");
  const progressThumb = document.querySelector("#qar2atSong .progress-thumb");
  const timeLabel = document.querySelector("#qar2atSong .song-time");
  let loopMode = "all";
  let dragging = false;

  // === ضبط صندوق الموسيقى ===
  currentSongImage.src = "cover1.jpg"; // الكفر الخاص بالصندوق
  audioPlayer.src = "قلب همومه ملايين.mp3"; // الأغنية الوحيدة

  // ===== مودال الرسائل =====
  messageBtn.addEventListener("click", e => {
    e.stopPropagation();
    newMessageModal.style.display = "flex";
    messageInput.value = "";
    messageInput.focus();
  });
  closeNewMessage.addEventListener("click", () => newMessageModal.style.display = "none");
  sendMessageBtn.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (!message) {
      newMessageModal.style.display = "none";
      emptyMessageModal.style.display = "flex";
      return;
    }
    const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSc_UhUjJ86Ft3KhcHL1EMS2j3Ps75ZujAns287XY66BY7bQ0A/formResponse";  
    const entryID = "214003542";  
    fetch(`${formURL}?entry.${entryID}=${encodeURIComponent(message)}`, { method: "POST", mode: "no-cors" }).then(() => {
      newMessageModal.style.display = "none";
      messageInput.value = "";
      successModal.style.display = "flex";
    });
  });
  closeEmptyMessage.addEventListener("click", () => emptyMessageModal.style.display = "none");
  closeSuccess.addEventListener("click", () => successModal.style.display = "none");

  // ===== مودال كلمة السر =====
  secretBtn.addEventListener("click", () => {
    passwordModal.style.display = "flex";
    passwordInput.value = "";
    passwordInput.focus();
  });
  closePassword.addEventListener("click", () => passwordModal.style.display = "none");
  checkPassword.addEventListener("click", () => {
    const ans = passwordInput.value.trim();
    if (ans === "منا" || ans === "منى") {
      passwordModal.style.display = "none";
      modal.style.display = "flex";
      voicePlayer.pause();
      playPauseVoice.textContent = "▶️";
    } else {
      passwordModal.style.display = "none";
      wrongPasswordModal.style.display = "flex";
    }
  });
  closeWrongPassword.addEventListener("click", () => wrongPasswordModal.style.display = "none");

  // ===== مودال المعلومات =====
  aboutBtn.addEventListener("click", e => {
    e.stopPropagation();
    aboutModal.style.display = aboutModal.style.display === "flex" ? "none" : "flex";
  });
  closeAbout.addEventListener("click", () => aboutModal.style.display = "none");
  aboutModal.querySelector(".about-modal").addEventListener("click", e => e.stopPropagation());

  // ===== صندوق الموسيقى =====
  musicBox.addEventListener("click", e => {
    e.stopPropagation();
    songList.style.display = songList.style.display === "flex" ? "none" : "flex";
  });
  songList.addEventListener("click", e => e.stopPropagation());
  document.addEventListener("click", () => { aboutModal.style.display = "none"; songList.style.display = "none"; });

  // ===== أزرار الموسيقى =====
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  }

  playBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (audioPlayer.paused) {
      audioPlayer.play();
      playBtn.textContent = "⏸️";
    } else {
      audioPlayer.pause();
      playBtn.textContent = "▶️";
    }
  });

  nextBtn.addEventListener("click", () => {
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    playBtn.textContent = "⏸️";
  });

  prevBtn.addEventListener("click", () => {
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    playBtn.textContent = "⏸️";
  });

  loopBtn.addEventListener("click", e => {
    e.stopPropagation();
    loopMode = loopMode === "all" ? "single" : "all";
    loopBtn.textContent = loopMode === "all" ? "🔁" : "🔂";
  });

  audioPlayer.addEventListener("timeupdate", () => {
    if (!audioPlayer.duration) return;
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = percent + "%";
    progressThumb.style.left = percent + "%";
    timeLabel.textContent = `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration)}`;
  });

  audioPlayer.addEventListener("ended", () => {
    playBtn.textContent = "▶️";
    if (loopMode === "single") {
      audioPlayer.currentTime = 0;
      audioPlayer.play();
    }
  });

  // ===== سحب شريط التقدم =====
  function seek(e) {
    const rect = progressBar.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const percent = Math.min(Math.max((x - rect.left) / rect.width, 0), 1);
    audioPlayer.currentTime = percent * audioPlayer.duration;
  }

  progressBar.addEventListener("mousedown", e => { dragging = true; seek(e); });
  document.addEventListener("mousemove", e => dragging && seek(e));
  document.addEventListener("mouseup", () => dragging = false);
  progressBar.addEventListener("touchstart", e => { dragging = true; seek(e); });
  document.addEventListener("touchmove", e => dragging && seek(e));
  document.addEventListener("touchend", () => dragging = false);

  // ===== مودال الفويس =====
  playPauseVoice.addEventListener("click", () => {
    voiceUserInteracted = true;
    if (voicePlayer.paused) {
      voicePlayer.play().catch(() => {});
      playPauseVoice.textContent = "⏸️";
    } else {
      voicePlayer.pause();
      playPauseVoice.textContent = "▶️";
    }
  });

  closeVoice.addEventListener("click", () => {
    voiceUserInteracted = false;
    voicePlayer.pause();
    voicePlayer.currentTime = 0;
    modal.style.display = "none";
  });

  voicePlayer.addEventListener("timeupdate", () => {
    const percent = (voicePlayer.currentTime / voicePlayer.duration) * 100 || 0;
    voiceProgressFill.style.width = percent + "%";
    voiceThumb.style.left = percent + "%";
    voiceTime.textContent = `${formatTime(voicePlayer.currentTime)} / ${formatTime(voicePlayer.duration)}`;
  });

  voicePlayer.addEventListener("pause", () => {
    if (!voicePlayer.ended && voiceUserInteracted)
      setTimeout(() => voicePlayer.play().catch(() => {}), 50);
  });

  voicePlayer.addEventListener("ended", () => playPauseVoice.textContent = "▶️");

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

});
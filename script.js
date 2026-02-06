document.addEventListener("DOMContentLoaded", () => {

  function openModal(id) {
    document.getElementById(id)?.classList.add("active");
  }

  function closeModal(id) {
    document.getElementById(id)?.classList.remove("active");
  }

  // ===== الفقاعة =====
  const statusBubble = document.getElementById("statusBubble");
  if (statusBubble) {
    setTimeout(() => {
      statusBubble.classList.add("show");
      setTimeout(() => statusBubble.classList.remove("show"), 6000);
    }, 1000);
  }

  // ===== عداد الزوار =====
  let visitorCount = parseInt(localStorage.getItem("visitorCount") || "250") + 1;
  localStorage.setItem("visitorCount", visitorCount);
  const visitorEl = document.getElementById("visitor-count");
  if (visitorEl) visitorEl.innerText = visitorCount;

  // ===== زر الهلال =====
  const religionBtn = document.getElementById("religionBtn");
  const religionModal = document.getElementById("religionModal");
  const closeReligion = document.querySelector(".close-religion");

  religionBtn?.addEventListener("click", e => {
    e.stopPropagation();
    openModal("religionModal");
  });

  closeReligion?.addEventListener("click", () => closeModal("religionModal"));

  religionModal?.addEventListener("click", e => {
    if (e.target === religionModal) closeModal("religionModal");
  });

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

  const emptyNameModal = document.getElementById("emptyNameModal");
  const closeEmptyName = document.getElementById("closeEmptyName");

  const emptyMessageModal = document.getElementById("emptyMessageModal");
  const closeEmptyMessage = document.getElementById("closeEmptyMessage");

  const successModal = document.getElementById("successModal");
  const closeSuccess = successModal?.querySelector("button");

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

const profilePic = document.querySelector('.profile-picture');
const loveBoxes = document.querySelector('.love-boxes');

profilePic.addEventListener('click', () => {
  loveBoxes.classList.remove('show'); // reset
  void loveBoxes.offsetWidth;         // trick لإعادة الأنيميشن
  loveBoxes.classList.add('show');
});

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
  currentSongImage.src = "cover1.png"; // الكفر الخاص بالصندوق
  audioPlayer.src = "متغير ياما عن زمان.mp3"; // الأغنية الوحيدة

  // ===== مودال الرسائل =====
messageBtn.addEventListener("click", e => {
  e.stopPropagation();
  openModal("newMessageModal");
  messageInput.value = "";
  senderName.value = "";
});

closeNewMessage.addEventListener("click", () =>
  closeModal("newMessageModal")
);

sendMessageBtn.addEventListener("click", () => {
  const name = senderName.value.trim();
  const message = messageInput.value.trim();

  // ❌ الاسم فاضي
  if (!name) {
    closeModal("newMessageModal");
    openModal("emptyNameModal");
    return;
  }

  // ❌ الرسالة فاضية
  if (!message) {
    closeModal("newMessageModal");
    openModal("emptyMessageModal");
    return;
  }

  // ✅ دمج الاسم + الرسالة
  const finalMessage = `${message} - ${name}`;

  const formURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSc_UhUjJ86Ft3KhcHL1EMS2j3Ps75ZujAns287XY66BY7bQ0A/formResponse";
  const entryID = "214003542";

  fetch(
    `${formURL}?entry.${entryID}=${encodeURIComponent(finalMessage)}`,
    { method: "POST", mode: "no-cors" }
  ).then(() => {
    closeModal("newMessageModal");
    messageInput.value = "";
    senderName.value = "";
    openModal("successModal");
  });
});

closeEmptyMessage.addEventListener("click", () => {
  closeModal("emptyMessageModal");
  openModal("newMessageModal");
});

closeEmptyName.addEventListener("click", () => {
  closeModal("emptyNameModal");
  openModal("newMessageModal");
});
  closeSuccess.addEventListener("click", () => closeModal("successModal"));

  // ===== مودال كلمة السر =====
  secretBtn.addEventListener("click", () => {
  openModal("passwordModal");
  passwordInput.value = "";
  // شيلنا focus
});
  closePassword.addEventListener("click", () => closeModal("passwordModal"));
  checkPassword.addEventListener("click", () => {
    const ans = passwordInput.value.trim();
    if (ans === "منا" || ans === "منى") {
      closeModal("passwordModal");
      openModal("modalOverlay");
      voicePlayer.pause();
      playPauseVoice.textContent = "▶️";
    } else {
      closeModal("passwordModal");
      openModal("wrongPasswordModal");
    }
  });
  closeWrongPassword.addEventListener("click", () => closeModal("wrongPasswordModal"));

  // ===== مودال المعلومات =====
  aboutBtn.addEventListener("click", e => {
    e.stopPropagation();
    aboutModal.classList.toggle("active");
  });
  closeAbout.addEventListener("click", () => closeModal("aboutModal"));
  aboutModal.querySelector(".about-modal").addEventListener("click", e => e.stopPropagation());

// ===== صندوق الموسيقى =====
musicBox.addEventListener("click", e => {
  e.stopPropagation();
  songList.classList.toggle("active");
});

songList.addEventListener("click", e => e.stopPropagation());

document.addEventListener("click", () => {
  closeModal("aboutModal");
  songList.classList.remove("active");
});


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

nextBtn.addEventListener("click", e => {
  e.stopPropagation();
  audioPlayer.currentTime = 0;
  audioPlayer.play();
});

prevBtn.addEventListener("click", e => {
  e.stopPropagation();
  audioPlayer.currentTime = 0;
  audioPlayer.play();
});

// ===== زر اللوب =====
loopBtn.addEventListener("click", e => {
  e.stopPropagation();

  if (loopMode === "all") {
    // تكرار أغنية واحدة
    loopMode = "single";
    audioPlayer.loop = true;
    loopBtn.textContent = "🔂";
  } else {
    // إلغاء التكرار
    loopMode = "all";
    audioPlayer.loop = false;
    loopBtn.textContent = "🔁";
  }
});

audioPlayer.addEventListener("timeupdate", () => {
  if (!audioPlayer.duration) return;

  const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressFill.style.width = percent + "%";
  progressThumb.style.left = percent + "%";
  timeLabel.textContent =
    formatTime(audioPlayer.currentTime) + " / " +
    formatTime(audioPlayer.duration);
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

  if (voicePlayer.paused) {
    voicePlayer.play();
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
  closeModal("modalOverlay");
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

const songs = [
    { title: "Saharlar", artist: "Dilnoz", src: "song1.mp3", cover: "saharlar.jpg" },
    { title: "Inson qasidasi ", artist: "Sherali Jo'rayev", src: "song2.m4a", cover: "sher.jpg" },
    { title: "Bandaman", artist: "Sherali Jo'rayev", src: "bandaman.mp3", cover: "sher.jpg" },
    { title: "Mockingbird ", artist: "Eminem", src: "mockingbird.mp3", cover: "eminem.jpg" },
    { title: "Hala Madrid", artist: "🦁😎🙋‍♂️", src: "halamadrid.mp3", cover: "ronaldo.avif" },
  ];
  
  let currentSongIndex = 0;
  
  const audio = document.getElementById("audio");
  const title = document.getElementById("title");
  const artist = document.getElementById("artist");
  const cover = document.getElementById("cover");
  const playBtn = document.getElementById("play");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const progress = document.getElementById("progress");
  const progressContainer = document.querySelector(".progress-container");
  const songSelect = document.getElementById("songSelect");
  
  // Dinamik ravishda select optionlarni hosil qilish
  function populateSongOptions() {
    songSelect.innerHTML = ""; // Avvalgi optionlarni tozalash
    songs.forEach((song, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${song.title} - ${song.artist}`;
      songSelect.appendChild(option);
    });
  }
  
  // Qo'shiqni yuklash funksiyasi
  function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
  }
  
  // Qo'shiqni o'ynatish va to'xtatish funksiyalari
  function playSong() {
    audio.play();
    playBtn.textContent = "⏸";
  }
  
  function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶️";
  }
  
  // Qo'shiqni o'zgartirish funksiyalari
  function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
  }
  
  function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
  }
  
  // Progress barni yangilash
  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const percent = (currentTime / duration) * 100;
    progress.style.width = `${percent}%`;
  }
  
  // Progress ustiga bosib vaqtni o'zgartirish
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
  }
  
  // Select elementida qo'shiqni tanlash
  function selectSong() {
    currentSongIndex = parseInt(this.value);
    loadSong(songs[currentSongIndex]);
    playSong();
  }
  
  // Qo'shiq nomini o'zgartirish (misol uchun biror hodisadan so'ng)
  function updateSongTitle(index, newTitle) {
    if (songs[index]) {
      songs[index].title = newTitle;
      populateSongOptions(); // Select elementni yangilash
      if (index === currentSongIndex) {
        loadSong(songs[currentSongIndex]); // Agar hozirgi qo'shiq o'zgargan bo'lsa, UI ni yangilash
      }
    }
  }
  
  // Hodisalarni tinglash
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      playSong();
    } else {
      pauseSong();
    }
  });
  
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  audio.addEventListener("timeupdate", updateProgress);
  progressContainer.addEventListener("click", setProgress);
  songSelect.addEventListener("change", selectSong);
  
  // Boshlanishda massivdagi qo'shiqlarni yuklash
  populateSongOptions();
  loadSong(songs[currentSongIndex]);
  
  // Qo'shiq nomini o'zgartirish misoli
  // Masalan: 2-chi qo'shiqning nomini "New Song Title" ga o'zgartirish
  // updateSongTitle(2, "New Song Title");
  
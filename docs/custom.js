// ==================== ASSETS CONFIGURATION ====================
// 本地调试自动使用相对路径。
// 部署时替换为 GitHub raw 链接，格式：
//   var ASSETS = {
//     bgImage: 'https://raw.githubusercontent.com/YUhuan83/YUhuan83.github.io/main/filename.jpg',
//     audio:   'https://raw.githubusercontent.com/YUhuan83/YUhuan83.github.io/main/filename.mp3'
//   };
(function () {
  var isPost = window.location.pathname.indexOf('/post/') !== -1;
  var BASE = isPost ? '../..' : '..';
  window.ASSETS = {
    bgImage: 'https://raw.githubusercontent.com/YUhuan83/YUhuan83.github.io/main/8478e062921da586a4e88ef04e1cdde7.jpg',
    audio: 'https://raw.githubusercontent.com/YUhuan83/YUhuan83.github.io/main/%E6%BE%A4%E9%87%8E%E5%BC%98%E4%B9%8B_mpi-theDOGS.mp3'
  };
})();

// ==================== Background Image ====================
(function setBackground() {
  if (ASSETS.bgImage) {
    document.documentElement.style.setProperty('--bg-image', 'url(' + ASSETS.bgImage + ')');
  }
})();

// ==================== Music Player ====================
(function initMusicPlayer() {
  if (!ASSETS.audio) return;

  // --- Create DOM ---
  var bar = document.createElement('div');
  bar.className = 'music-bar';

  var btn = document.createElement('button');
  btn.className = 'music-btn';
  btn.setAttribute('aria-label', '播放音乐');
  btn.innerHTML = playIcon();

  var info = document.createElement('div');
  info.className = 'music-info';

  var progress = document.createElement('div');
  progress.className = 'music-progress';

  var progressFill = document.createElement('div');
  progressFill.className = 'music-progress-fill';
  progress.appendChild(progressFill);

  var title = document.createElement('span');
  title.className = 'music-title';
  title.textContent = '澤野弘之 - theDOGS';

  info.appendChild(progress);
  info.appendChild(title);

  var timeDisplay = document.createElement('span');
  timeDisplay.className = 'music-time';
  timeDisplay.textContent = '00:00';

  bar.appendChild(btn);
  bar.appendChild(info);
  bar.appendChild(timeDisplay);
  document.body.appendChild(bar);

  // --- Audio ---
  var audio = new Audio(ASSETS.audio);
  audio.preload = 'metadata';
  var playing = false;
  var durationKnown = false;

  function playIcon() {
    return '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5a.5.5 0 0 1 .8-.4l8 5.5a.5.5 0 0 1 0 .8l-8 5.5a.5.5 0 0 1-.8-.4z"/></svg>';
  }

  function pauseIcon() {
    return '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5zm7 0a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5z"/></svg>';
  }

  function formatTime(sec) {
    if (isNaN(sec)) return '00:00';
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function seek(e) {
    if (!durationKnown) return;
    var rect = progress.getBoundingClientRect();
    var ratio = (e.clientX - rect.left) / rect.width;
    ratio = Math.max(0, Math.min(1, ratio));
    audio.currentTime = ratio * audio.duration;
  }

  // --- Events ---
  btn.addEventListener('click', function () {
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(function () {});
    }
  });

  audio.addEventListener('play', function () {
    playing = true;
    btn.innerHTML = pauseIcon();
    btn.classList.add('playing');
  });

  audio.addEventListener('pause', function () {
    playing = false;
    btn.innerHTML = playIcon();
    btn.classList.remove('playing');
  });

  audio.addEventListener('ended', function () {
    playing = false;
    btn.innerHTML = playIcon();
    btn.classList.remove('playing');
  });

  audio.addEventListener('loadedmetadata', function () {
    durationKnown = true;
    timeDisplay.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', function () {
    if (durationKnown && audio.duration > 0) {
      var pct = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = pct + '%';
    }
    timeDisplay.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('error', function () {
    console.warn('Music file could not be loaded:', ASSETS.audio);
  });

  progress.addEventListener('click', seek);
})();

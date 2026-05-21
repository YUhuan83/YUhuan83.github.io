// Music player
(function() {
  var isPost = window.location.pathname.indexOf('/post/') !== -1;
  var BASE = isPost ? '../..' : '..';
  var audioSrc = BASE + '/%E6%BE%A4%E9%87%8E%E5%BC%98%E4%B9%8B_mpi-theDOGS.mp3';

  var container = document.createElement('div');
  container.id = 'music-player';

  var btn = document.createElement('button');
  btn.id = 'music-btn';
  for (var i = 0; i < 3; i++) {
    var w = document.createElement('div');
    w.className = 'wave';
    btn.appendChild(w);
  }
  var icon = document.createElement('div');
  icon.className = 'icon';
  btn.appendChild(icon);

  container.appendChild(btn);
  document.body.appendChild(container);

  var audio = new Audio(audioSrc);
  audio.loop = true;
  var isPlaying = false;

  function togglePlay() {
    if (isPlaying) { audio.pause(); }
    else { audio.play().catch(function() {}); }
  }

  btn.addEventListener('click', togglePlay);

  audio.addEventListener('play', function() {
    isPlaying = true;
    btn.classList.add('playing');
  });

  audio.addEventListener('pause', function() {
    isPlaying = false;
    btn.classList.remove('playing');
  });

  audio.addEventListener('ended', function() {
    isPlaying = false;
    btn.classList.remove('playing');
  });

  setTimeout(function() {
    audio.play().then(function() {
      isPlaying = true;
      btn.classList.add('playing');
    }).catch(function() {
      document.addEventListener('click', function firstClick() {
        audio.play().catch(function() {});
        document.removeEventListener('click', firstClick);
      }, { once: true });
    });
  }, 500);
})();

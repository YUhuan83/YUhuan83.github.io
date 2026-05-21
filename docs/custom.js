(function() {
  var isPost = window.location.pathname.indexOf('/post/') !== -1;
  var BASE = isPost ? '../..' : '..';
  window.ASSETS = {
    bgImage: BASE + '/8478e062921da586a4e88ef04e1cdde7.jpg',
    audio: BASE + '/%E6%BE%A4%E9%87%8E%E5%BC%98%E4%B9%8B_mpi-theDOGS.mp3'
  };
})();
(function() {
  if (ASSETS.bgImage) {
    document.documentElement.style.setProperty('--bg-image', 'url(' + ASSETS.bgImage + ')');
  }
})();
(function() {
  if (!ASSETS.audio) return;
  var c = document.createElement('div');
  c.id = 'music-player';
  var b = document.createElement('button');
  b.id = 'music-btn';
  for (var i = 0; i < 3; i++) {
    var w = document.createElement('div');
    w.className = 'wave';
    b.appendChild(w);
  }
  var icon = document.createElement('div');
  icon.className = 'icon';
  b.appendChild(icon);
  c.appendChild(b);
  document.body.appendChild(c);
  var a = new Audio(ASSETS.audio);
  a.loop = true;
  var p = false;
  b.onclick = function() {
    if (p) { a.pause(); } else { a.play().catch(function() {}); }
  };
  a.onplay = function() { p = true; b.classList.add('playing'); };
  a.onpause = function() { p = false; b.classList.remove('playing'); };
  a.onended = function() { p = false; b.classList.remove('playing'); };
  setTimeout(function() {
    a.play().then(function() {
      p = true; b.classList.add('playing');
    }).catch(function() {
      document.addEventListener('click', function f() {
        a.play().catch(function() {});
        document.removeEventListener('click', f);
      }, { once: true });
    });
  }, 500);
})();

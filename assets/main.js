(function () {
  // --- theme toggle (applied early via inline script, this wires up the button) ---
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = t === 'dark' ? '◑' : '◐';
  }

  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('theme-btn');
    if (btn) {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      btn.textContent = current === 'dark' ? '◑' : '◐';
      btn.addEventListener('click', function () {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }

    // --- typewriter for site title ---
    const title = document.querySelector('.site-title');
    if (title) {
      const text = title.textContent.trim();
      title.textContent = '';
      let i = 0;
      function tick() {
        if (i < text.length) {
          title.textContent += text[i++];
          setTimeout(tick, 55);
        }
      }
      tick();
    }

    // --- grain canvas ---
    const canvas = document.getElementById('grain');
    if (canvas) {
      const w = canvas.width = window.innerWidth;
      const h = canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      const img = ctx.createImageData(w, h);
      const data = img.data;
      for (let j = 0; j < data.length; j += 4) {
        const v = Math.random() * 255 | 0;
        data[j] = data[j + 1] = data[j + 2] = v;
        data[j + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    }
  });
})();

/* Asteroid — Cosmic shared behaviors.
   The <head> inline boot script sets the theme and adds the 'js' class
   (so no-JS visitors still see content). This file wires the rest. */
(function () {
  // ---- theme toggle (exposed for inline onclick) ----
  window.toggleTheme = function () {
    var h = document.documentElement;
    var n = h.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    h.setAttribute('data-theme', n);
    try { localStorage.setItem('theme', n); } catch (e) {}
    window.dispatchEvent(new CustomEvent('themechange', { detail: n }));
  };

  // ---- mobile nav ----
  window.toggleNav = function () {
    var l = document.querySelector('.nav-links');
    if (l) l.classList.toggle('open');
  };

  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    // ---- starfield ----
    var sky = document.getElementById('sky');
    if (sky && !sky.childElementCount) {
      for (var i = 0; i < 80; i++) {
        var s = document.createElement('div');
        s.className = 'star';
        var sz = Math.random() * 2 + 0.6;
        s.style.width = sz + 'px'; s.style.height = sz + 'px';
        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.setProperty('--t', (Math.random() * 5 + 2.5) + 's');
        s.style.animationDelay = (-Math.random() * 6) + 's';
        sky.appendChild(s);
      }
    }

    // ---- scroll reveal ----
    var els = [].slice.call(document.querySelectorAll('[data-reveal]'));
    function showAll(){ els.forEach(function (e) { e.classList.add('in'); }); }
    if (!('IntersectionObserver' in window)) { showAll(); }
    else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
      els.forEach(function (e) { io.observe(e); });
      setTimeout(showAll, 2600); // safety net for throttled tabs
    }

    // ---- copy buttons ----
    document.querySelectorAll('.code-copy').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var code = btn.closest('.code-card, .code-tabs, pre');
        code = code && (code.querySelector('.tab-panel:not([hidden]) code') || code.querySelector('code'));
        if (!code) return;
        navigator.clipboard.writeText(code.innerText).then(function () {
          btn.textContent = 'Copied'; btn.classList.add('copied');
          setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
        });
      });
    });
  });
})();

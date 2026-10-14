// Dark-mode toggle, shared by every page. The choice lasts for the browser
// session (sessionStorage); each page applies it before first paint.
(function () {
  var toggle = document.getElementById('theme-toggle');

  function syncToggle() {
    var dark = document.body.classList.contains('dark');
    toggle.textContent = dark ? 'Light mode' : 'Dark mode';
    toggle.setAttribute('aria-pressed', String(dark));
  }

  toggle.addEventListener('click', function () {
    var dark = document.body.classList.toggle('dark');
    try { sessionStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
    syncToggle();
  });
  syncToggle();
})();

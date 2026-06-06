
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es, o) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('active'); o.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(function (el) { io.observe(el); });
  } else { $$('.reveal').forEach(function (el) { el.classList.add('active'); }); }

  var nt = $('.nav-toggle'), sn = $('#side-nav');
  function setNav(open) {
    document.body.classList.toggle('nav-open', open);
    if (nt) nt.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (sn) sn.setAttribute('aria-hidden', open ? 'false' : 'true');
  }
  if (nt) nt.addEventListener('click', function () { setNav(!document.body.classList.contains('nav-open')); });
  $$('#side-nav .nav a').forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });

  var prog = $('#progress');
  function onScroll() {
    if (!prog) return;
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    prog.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Modale détail projet ---- */
  var modal = $('#proj-modal');
  var modalBody = $('#proj-modal-body');
  var projects = $$('.proj');

  if (modal && modalBody && projects.length) {
    var lastFocus = null;

    // Détection auto des rapports PDF : le bouton n'apparaît que si le fichier existe.
    projects.forEach(function (card) {
      var report = card.getAttribute('data-report');
      if (!report) return;
      fetch(report, { method: 'HEAD' })
        .then(function (r) { if (r.ok) card.setAttribute('data-report-ready', '1'); })
        .catch(function () { /* fichier absent : pas de bouton, pas de lien cassé */ });
    });

    function buildBody(card) {
      var frag = document.createElement('div');

      var top = card.querySelector('.proj-top');
      if (top) frag.appendChild(top.cloneNode(true));

      var body = card.querySelector('.proj-body');
      if (body) {
        var clone = body.cloneNode(true);
        var h3 = clone.querySelector('h3');
        if (h3) h3.id = 'proj-modal-title';
        frag.appendChild(clone);
      }

      // Texte étendu (rempli par Bilal dans .proj-detail) — affiché s'il est non vide.
      var detail = card.querySelector('.proj-detail');
      if (detail && detail.innerHTML.trim()) {
        var d = document.createElement('div');
        d.className = 'proj-modal-detail';
        d.innerHTML = detail.innerHTML;
        frag.appendChild(d);
      }

      var tech = card.querySelector('.proj-tech');
      if (tech) frag.appendChild(tech.cloneNode(true));

      // Liens : code GitHub (repris de la carte) + rapport PDF (si disponible).
      var links = document.createElement('div');
      links.className = 'proj-modal-links';
      var code = card.querySelector('.proj-link');
      if (code) {
        var a = code.cloneNode(true);
        a.className = 'btn btn-primary';
        links.appendChild(a);
      }
      if (card.getAttribute('data-report-ready') === '1') {
        var rep = document.createElement('a');
        rep.className = 'btn btn-outline';
        rep.href = card.getAttribute('data-report');
        rep.target = '_blank';
        rep.rel = 'noopener';
        rep.textContent = 'Rapport PDF ↗';
        links.appendChild(rep);
      }
      if (links.children.length) frag.appendChild(links);

      modalBody.innerHTML = '';
      modalBody.appendChild(frag);
    }

    function openModal(card) {
      lastFocus = document.activeElement;
      buildBody(card);
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      var closeBtn = modal.querySelector('.proj-modal-close');
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    projects.forEach(function (card) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function (e) {
        // Laisser les liens internes (GitHub) se comporter normalement.
        if (e.target.closest('a')) return;
        openModal(card);
      });
    });

    modal.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-close')) closeModal();
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
    });
  }
})();

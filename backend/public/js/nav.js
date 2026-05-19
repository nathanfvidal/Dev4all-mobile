(function () {
  function init() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    // ── SCROLL ─────────────────────────────────────────────
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    // ── WRAP NAV-MENU + NAV-ACTIONS IN DROPDOWN ────────────
    var navMenu = document.getElementById('nav-menu');
    var navActions = document.querySelector('.nav-actions');
    var dropdown = null;

    if (navMenu && navActions) {
      dropdown = document.createElement('div');
      dropdown.id = 'nav-dropdown';
      dropdown.className = 'nav-dropdown';
      navMenu.parentNode.insertBefore(dropdown, navMenu);
      dropdown.appendChild(navMenu);
      dropdown.appendChild(navActions);
    }

    // ── HAMBURGER TOGGLE ───────────────────────────────────
    var menuToggle = document.getElementById('menu-toggle');

    function closeMenu() {
      if (dropdown) dropdown.classList.remove('open');
      document.body.classList.remove('menu-open');
    }

    if (menuToggle && dropdown) {
      menuToggle.addEventListener('click', function () {
        var isOpen = dropdown.classList.toggle('open');
        document.body.classList.toggle('menu-open', isOpen);
      });
    }

    // Close on nav link click
    if (navMenu) {
      navMenu.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });
    }

    // Close on backdrop click (outside navbar)
    document.addEventListener('click', function (e) {
      if (document.body.classList.contains('menu-open') && !navbar.contains(e.target)) {
        closeMenu();
      }
    });

    // ── AUTH STATE ─────────────────────────────────────────
    try {
      var token = localStorage.getItem('token');
      if (token) {
        var navLogin = document.getElementById('nav-login');
        var navPainel = document.getElementById('nav-painel');
        var btnVerificar = document.getElementById('btn-verificar-orcamento');
        if (navLogin) navLogin.style.display = 'none';
        if (navPainel) navPainel.style.display = 'block';
        if (btnVerificar) btnVerificar.style.display = 'none';
      }
    } catch (e) {}

    // ── BOTTOM NAV ─────────────────────────────────────────
    if (document.body.classList.contains('auth-body')) return;

    var path = window.location.pathname;

    function isActive(href) {
      if (href === '/') return path === '/' || path === '/index.html';
      return path === href;
    }

    var items = [
      {
        href: '/',
        label: 'Home',
        icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>'
      },
      {
        href: '/portfolio.html',
        label: 'Portfólio',
        icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>'
      },
      {
        href: '/sobre.html',
        label: 'Sobre nós',
        icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>'
      },
      {
        href: '/contato.html',
        label: 'Contato',
        icon: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>'
      }
    ];

    var bnav = document.createElement('nav');
    bnav.className = 'bottom-nav';
    bnav.setAttribute('aria-label', 'Navegação');
    bnav.innerHTML = items.map(function (item) {
      return (
        '<a href="' + item.href + '" class="bottom-nav-item' + (isActive(item.href) ? ' active' : '') + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        item.icon +
        '</svg>' +
        '<span>' + item.label + '</span>' +
        '</a>'
      );
    }).join('');
    document.body.appendChild(bnav);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

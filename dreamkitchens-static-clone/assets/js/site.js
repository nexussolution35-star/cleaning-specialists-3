/*!
 * site.js — behaviour for the static clone.
 *
 * The pages in this archive are captured, fully-rendered DOM: every layout and
 * style is already baked in, and the original theme's JavaScript has been
 * removed. This file restores only the interactions that the markup cannot
 * express on its own — opening the off-canvas menu, the search overlay,
 * the mobile menu drill-down, and keeping the (server-less) forms inert.
 */
(function () {
  'use strict';

  var body = document.body;
  var ocm = document.getElementById('slide-out-widget-area');
  var ocmBg = document.getElementById('slide-out-widget-area-bg');

  /* ---------------------------------------------------------------- menu -- */

  function setToggleState(open) {
    var toggles = document.querySelectorAll('.slide-out-widget-area-toggle a');
    for (var i = 0; i < toggles.length; i++) {
      toggles[i].classList.toggle('closed', !open);
      toggles[i].classList.toggle('open', open);
      toggles[i].setAttribute('aria-expanded', open ? 'true' : 'false');
    }
  }

  /* The theme's stylesheet parks each menu row at opacity 0 / translateY(110px)
     and leaves the reveal to script, so the reveal is staged here. */
  function menuRows() {
    return ocm ? ocm.querySelectorAll('.off-canvas-menu-container .menu > li') : [];
  }

  function revealRows() {
    var rows = menuRows();
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      row.style.transition = 'opacity .5s cubic-bezier(.15,.2,.1,1) ' + (0.12 + i * 0.045) +
        's, transform .7s cubic-bezier(.15,.2,.1,1) ' + (0.12 + i * 0.045) + 's';
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';
    }
  }

  function hideRows() {
    var rows = menuRows();
    for (var i = 0; i < rows.length; i++) {
      rows[i].style.transition = '';
      rows[i].style.opacity = '';
      rows[i].style.transform = '';
    }
  }

  function openMenu() {
    if (!ocm) return;
    if (ocmBg) {
      ocmBg.style.display = 'block';
      ocmBg.style.width = '100%';
      ocmBg.style.height = '100%';
      ocmBg.style.transform = 'none';
      ocmBg.style.webkitTransform = 'none';
      ocmBg.classList.add('open', 'material-open');
    }
    ocm.style.display = 'block';
    ocm.classList.add('open', 'material-open');
    body.classList.add('side-widget-open', 'material-ocm-open');
    var header = document.getElementById('header-outer');
    if (header) header.classList.add('side-widget-open');
    setToggleState(true);
    requestAnimationFrame(revealRows);
    var first = ocm.querySelector('.off-canvas-menu-container a');
    if (first) first.focus({ preventScroll: true });
  }

  function closeMenu() {
    if (!ocm) return;
    hideRows();
    ocm.classList.remove('open', 'material-open');
    ocm.style.display = '';
    if (ocmBg) {
      ocmBg.classList.remove('open', 'material-open');
      ocmBg.style.display = '';
      ocmBg.style.width = '';
      ocmBg.style.height = '';
      ocmBg.style.transform = '';
      ocmBg.style.webkitTransform = '';
    }
    body.classList.remove('side-widget-open', 'material-ocm-open');
    var header = document.getElementById('header-outer');
    if (header) header.classList.remove('side-widget-open');
    setToggleState(false);
    resetSubmenus();
  }

  function menuIsOpen() {
    return !!ocm && ocm.classList.contains('open');
  }

  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('.slide-out-widget-area-toggle a, a[href="#slide-out-widget-area"]');
    if (toggle) {
      e.preventDefault();
      menuIsOpen() ? closeMenu() : openMenu();
      return;
    }
    if (e.target.closest('.slide_out_area_close')) {
      e.preventDefault();
      closeMenu();
      return;
    }
    if (menuIsOpen() && ocmBg && e.target === ocmBg) closeMenu();
  });

  /* ------------------------------------------- off-canvas submenu drill-in -- */

  function resetSubmenus() {
    if (!ocm) return;
    var lists = ocm.querySelectorAll('.menu.subview');
    for (var i = 0; i < lists.length; i++) lists[i].classList.remove('subview');
    var items = ocm.querySelectorAll('.subviewopen, .subview');
    for (var j = 0; j < items.length; j++) items[j].classList.remove('subviewopen', 'subview');
  }

  if (ocm) {
    ocm.addEventListener('click', function (e) {
      var back = e.target.closest('li.back > a');
      if (back) {
        e.preventDefault();
        var openItem = ocm.querySelector('li.subviewopen');
        if (openItem) {
          openItem.classList.remove('subviewopen');
          var parentList = openItem.closest('ul.menu');
          if (parentList && !parentList.querySelector('li.subviewopen')) {
            parentList.classList.remove('subview');
          }
          var ancestor = openItem.parentElement.closest('li.subview');
          if (ancestor) ancestor.classList.add('subviewopen');
        }
        return;
      }
      var link = e.target.closest('a');
      if (!link) return;
      var li = link.parentElement;
      if (li && li.classList.contains('menu-item-has-children') && link.parentElement === li) {
        var sub = li.querySelector(':scope > .sub-menu');
        if (sub) {
          e.preventDefault();
          var root = li.closest('ul.menu');
          if (root) root.classList.add('subview');
          var chain = li;
          while (chain && chain !== root) {
            if (chain.tagName === 'LI') chain.classList.add('subview');
            chain = chain.parentElement;
          }
          li.classList.remove('subview');
          li.classList.add('subviewopen');
        }
      }
    });
  }

  /* -------------------------------------------------------------- search -- */

  var searchOuter = document.getElementById('search-outer');

  document.addEventListener('click', function (e) {
    if (e.target.closest('#search-btn a, .nectar-search-btn')) {
      e.preventDefault();
      if (searchOuter) {
        body.classList.add('search-open');
        searchOuter.style.display = 'block';
        var input = searchOuter.querySelector('input[name="s"]');
        if (input) input.focus({ preventScroll: true });
      }
      return;
    }
    if (e.target.closest('#search-outer #close a')) {
      e.preventDefault();
      body.classList.remove('search-open');
      if (searchOuter) searchOuter.style.display = '';
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (menuIsOpen()) closeMenu();
    if (body.classList.contains('search-open')) {
      body.classList.remove('search-open');
      if (searchOuter) searchOuter.style.display = '';
    }
  });

  /* --------------------------------------------------------------- forms -- */
  /* No back end ships with a static archive, so submissions stay put. */

  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form.hasAttribute('data-static-clone')) return;
    e.preventDefault();
    var note = form.querySelector('.static-clone-note');
    if (!note) {
      note = document.createElement('p');
      note.className = 'static-clone-note';
      note.setAttribute('role', 'status');
      note.style.cssText = 'margin:14px 0 0;padding:12px 16px;border:1px solid currentColor;' +
        'border-radius:4px;font-size:14px;line-height:1.5;opacity:.85;';
      form.appendChild(note);
    }
    note.textContent = 'This is a static archive of the site — form submissions are not sent.';
  });

  /* ------------------------------------------------------- anchor scroll -- */

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    /* the menu, search and drill-down controls are also '#' links — they have
       their own handlers above and must not be treated as jump links. */
    if (a.closest('.slide-out-widget-area-toggle, #slide-out-widget-area, #search-outer, #search-btn')) return;
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    var target = document.getElementById(id) || document.getElementsByName(id)[0];
    if (!target) return;
    e.preventDefault();
    if (menuIsOpen()) closeMenu();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();

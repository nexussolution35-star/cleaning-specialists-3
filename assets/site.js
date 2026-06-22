/* The Cleaning Specialist — interactivity (vanilla JS, no framework) */
(function () {
  // Mobile menu
  window.tcsToggleMob = function () {
    document.getElementById('mob').classList.toggle('open');
  };

  // FAQ accordion
  document.addEventListener('click', function (e) {
    var q = e.target.closest('.faq-q');
    if (q) {
      var item = q.closest('.faq-item');
      var ans = item.querySelector('.faq-a');
      var open = item.classList.toggle('open');
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : 0;
    }
  });

  // Form handler (placeholder — wire to your CRM / email endpoint)
  document.addEventListener('submit', function (e) {
    if (e.target.matches('.quote-form, .lead-form')) {
      e.preventDefault();
      alert("Thank you! A Cleaning Specialist will call you back shortly to confirm your free assessment.");
      e.target.reset();
    }
  });

  // Smooth scroll to quote for "Get a Quote" buttons
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-scroll]');
    if (b) {
      var t = document.querySelector(b.getAttribute('data-scroll'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }
  });

  // Animated stat counters
  var counted = false;
  function runCounters() {
    if (counted) return;
    var stats = document.querySelectorAll('[data-count]');
    if (!stats.length) return;
    var first = stats[0].getBoundingClientRect();
    if (first.top < window.innerHeight && first.bottom > 0) {
      counted = true;
      stats.forEach(function (el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = 1400, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var val = Math.floor(p * target);
          el.textContent = (val >= 1000 ? (val / 1000).toFixed(val % 1000 === 0 ? 0 : 1) + 'k' : val) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = (target >= 1000 ? (target / 1000) + 'k' : target) + suffix;
        }
        requestAnimationFrame(step);
      });
    }
  }
  window.addEventListener('scroll', runCounters);
  window.addEventListener('load', runCounters);
})();

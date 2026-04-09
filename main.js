// ============================================
// Zeeshan Yousuf Portfolio - Main JS
// Uses jQuery + vanilla JS
// ============================================

$(document).ready(function () {

  // --- Mobile Nav Toggle ---
  $('#navToggle').on('click', function () {
    $('#navLinks').toggleClass('open');
    $(this).toggleClass('active');
  });

  // Close mobile nav when clicking a link
  $('#navLinks a').on('click', function () {
    if ($(window).width() <= 768) {
      $('#navLinks').removeClass('open');
      $('#navToggle').removeClass('active');
    }
  });

  // --- Scroll-triggered Fade-in Animations ---
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        $(entry.target).addClass('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  $('.fade-in').each(function () {
    fadeObserver.observe(this);
  });

  // Timeline items
  const timelineObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        $(entry.target).addClass('visible');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  $('.timeline-item').each(function () {
    timelineObserver.observe(this);
  });

  // --- Animated Counter ---
  function animateCounter($el, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function formatNumber(n) {
      if (n >= 1000) {
        return n.toLocaleString() + '+';
      }
      return n + '+';
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      $el.text(formatNumber(current));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        $el.text(formatNumber(target));
      }
    }

    requestAnimationFrame(update);
  }

  // Observe stat counters
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const $el = $(entry.target);
        const target = parseInt($el.data('count'), 10);
        if (target) {
          animateCounter($el, target);
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  $('[data-count]').each(function () {
    counterObserver.observe(this);
  });

  // --- Nav background on scroll ---
  $(window).on('scroll', function () {
    const $nav = $('.nav');
    if ($(window).scrollTop() > 50) {
      $nav.css({
        'background': 'rgba(10, 10, 15, 0.95)',
        'box-shadow': '0 2px 20px rgba(0, 0, 0, 0.3)'
      });
    } else {
      $nav.css({
        'background': 'rgba(10, 10, 15, 0.8)',
        'box-shadow': 'none'
      });
    }
  });

  // --- Smooth scroll for anchor links ---
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 600);
    }
  });

  // --- Typing effect for hero greeting ---
  const $greeting = $('.hero-greeting');
  if ($greeting.length) {
    const text = $greeting.text();
    $greeting.text('');
    $greeting.css('visibility', 'visible');

    let i = 0;
    function typeChar() {
      if (i < text.length) {
        $greeting.text(text.substring(0, i + 1));
        i++;
        setTimeout(typeChar, 50);
      }
    }
    // Small delay before typing starts
    setTimeout(typeChar, 500);
  }

  // --- Parallax on background glows ---
  $(window).on('mousemove', function (e) {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    $('.bg-glow-1').css('transform', 'translate(' + x + 'px, ' + y + 'px)');
    $('.bg-glow-2').css('transform', 'translate(' + (-x) + 'px, ' + (-y) + 'px)');
  });

  // --- Project card hover tilt effect ---
  $('.project-card, .project-hero').on('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / centerY * -3;
    const rotateY = (x - centerX) / centerX * 3;

    $(this).css('transform', 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-6px)');
  });

  $('.project-card, .project-hero').on('mouseleave', function () {
    $(this).css('transform', 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)');
  });

  // --- Skill tags subtle animation on hover ---
  $('.skill-tag, .skill-tag-sm, .tech-badge').on('mouseenter', function () {
    $(this).css({
      'transform': 'scale(1.05)',
      'transition': '0.2s ease'
    });
  }).on('mouseleave', function () {
    $(this).css('transform', 'scale(1)');
  });

});

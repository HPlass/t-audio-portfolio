// Mark video frames whose self-hosted media file hasn't been added yet
// (used on work/*.html pages), so the page shows a styled "add media"
// placeholder instead of a broken player.
document.querySelectorAll('.media-frame video').forEach((video) => {
  video.addEventListener('error', () => {
    const frame = video.closest('.media-frame');
    frame.classList.add('missing');
    frame.dataset.src = video.getAttribute('src');
  }, true);
});

// Selected Work filters: show only cards matching the active category.
const filterButtons = document.querySelectorAll('.work-filter');
const workCards = document.querySelectorAll('.work-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((b) => {
      b.classList.remove('is-active');
      b.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('is-active');
    button.setAttribute('aria-pressed', 'true');

    const filter = button.dataset.filter;
    workCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

// Only one player at a time: pause everything else when one starts.
document.querySelectorAll('video, audio').forEach((player) => {
  player.addEventListener('play', () => {
    document.querySelectorAll('video, audio').forEach((other) => {
      if (other !== player) other.pause();
    });
  });
});

// Highlight the nav link for the section currently in view.
const navLinks = document.querySelectorAll('.site-nav a');
const sections = [...navLinks].map((a) => document.querySelector(a.hash));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((a) => {
      a.classList.toggle('active', a.hash === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach((s) => s && observer.observe(s));

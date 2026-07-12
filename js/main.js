// Mark video frames whose media file hasn't been added yet, so the page
// shows a styled "add media" placeholder instead of a broken player.
document.querySelectorAll('.media-frame video').forEach((video) => {
  video.addEventListener('error', () => {
    const frame = video.closest('.media-frame');
    frame.classList.add('missing');
    frame.dataset.src = video.getAttribute('src');
  }, true);
});

// Same for audio tracks: hide the broken player and show a hint instead.
document.querySelectorAll('.track audio').forEach((audio) => {
  audio.addEventListener('error', () => {
    audio.classList.add('missing');
    const note = document.createElement('p');
    note.className = 'missing-note';
    note.textContent = `Add audio file: ${audio.getAttribute('src')}`;
    audio.after(note);
  }, true);
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

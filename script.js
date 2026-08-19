const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menu?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
filters.forEach(filter => filter.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  filter.classList.add('active');
  cards.forEach(card => {
    const show = filter.dataset.filter === 'all' || card.dataset.category === filter.dataset.filter;
    card.style.display = show ? '' : 'none';
  });
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', async event => {
  event.preventDefault();
  const status = document.querySelector('#form-status');
  const button = contactForm.querySelector('button[type="submit"]');
  button.disabled = true;
  status.textContent = 'Envoi du message...';
  try {
    const response = await fetch(contactForm.action, {
      method: contactForm.method,
      headers: { Accept: 'application/json' },
      body: new FormData(contactForm)
    });
    if (!response.ok) throw new Error('Unable to submit');
    contactForm.reset();
    status.classList.remove('error');
    status.textContent = 'Merci, votre message a bien été envoyé.';
  } catch (error) {
    status.classList.add('error');
    status.textContent = 'Une erreur est survenue. Réessayez ou contactez-moi sur WhatsApp.';
  } finally {
    button.disabled = false;
  }
});

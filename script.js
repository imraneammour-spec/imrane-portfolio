document.documentElement.classList.add('js');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-header nav');

const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

if (menu && nav) {
  if (!nav.id) nav.id = 'site-navigation';
  menu.setAttribute('aria-controls', nav.id);
  const closeMenu = ({ returnFocus = false } = {}) => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Ouvrir le menu');
    if (returnFocus) menu.focus();
  };
  const openMenu = () => {
    nav.classList.add('open');
    menu.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-label', 'Fermer le menu');
    nav.querySelector('a')?.focus();
  };
  menu.addEventListener('click', () => (nav.classList.contains('open') ? closeMenu() : openMenu()));
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu({ returnFocus: true });
  });
  document.addEventListener('click', event => {
    if (nav.classList.contains('open') && !header.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 720) closeMenu(); });
}

const filters = [...document.querySelectorAll('.filter')];
const subfilterGroup = document.querySelector('.project-subfilters');
const subfilters = [...document.querySelectorAll('.project-subfilter')];
const cards = [...document.querySelectorAll('.project-card')];
const setSubfilter = filter => {
  const type = filter.dataset.projectFilter;
  subfilters.forEach(item => {
    const selected = item === filter;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  cards.forEach(card => {
    card.hidden = card.dataset.category !== 'interieur' || (type !== 'all' && card.dataset.projectType !== type);
  });
};
const setFilter = filter => {
  const category = filter.dataset.filter;
  filters.forEach(item => {
    const selected = item === filter;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  if (subfilterGroup) subfilterGroup.hidden = category !== 'interieur';
  if (category === 'interieur' && subfilters.length) {
    setSubfilter(subfilters[0]);
  } else {
    cards.forEach(card => { card.hidden = !(category === 'all' || card.dataset.category === category); });
  }
};
filters.forEach((filter, index) => {
  filter.setAttribute('aria-pressed', String(filter.classList.contains('active')));
  filter.addEventListener('click', () => setFilter(filter));
  filter.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + filters.length) % filters.length;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % filters.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = filters.length - 1;
    filters[nextIndex].focus();
    setFilter(filters[nextIndex]);
  });
});
subfilters.forEach((filter, index) => {
  filter.setAttribute('aria-pressed', String(filter.classList.contains('active')));
  filter.addEventListener('click', () => setSubfilter(filter));
  filter.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + subfilters.length) % subfilters.length;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % subfilters.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = subfilters.length - 1;
    subfilters[nextIndex].focus();
    setSubfilter(subfilters[nextIndex]);
  });
});

if (!reducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
} else {
  document.querySelectorAll('.reveal').forEach(item => item.classList.add('visible'));
}

const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', async event => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const status = document.querySelector('#form-status');
  const button = contactForm.querySelector('button[type="submit"]');
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  status.className = 'form-status';
  status.textContent = 'Envoi du message…';
  try {
    const response = await fetch(contactForm.action, {
      method: contactForm.method,
      headers: { Accept: 'application/json' },
      body: new FormData(contactForm)
    });
    if (!response.ok) throw new Error('Form submission failed');
    contactForm.reset();
    status.classList.add('success');
    status.textContent = 'Merci, votre message a bien été envoyé.';
  } catch {
    status.classList.add('error');
    status.textContent = 'Une erreur est survenue. Réessayez ou contactez-moi sur WhatsApp.';
  } finally {
    button.disabled = false;
    button.removeAttribute('aria-busy');
  }
});

// Keep each project's images in a compact, independently navigable gallery.
const projectCover = document.querySelector('.case-study > main > .case-cover[data-gallery-image]');
const firstProjectGallery = document.querySelector('.case-study .case-gallery');
if (projectCover && firstProjectGallery) firstProjectGallery.prepend(projectCover);

document.querySelectorAll('.case-study .case-gallery').forEach(gallery => {
  const slides = [...gallery.querySelectorAll(':scope > figure[data-gallery-image]')];
  if (!slides.length) return;

  const controls = document.createElement('div');
  controls.className = 'project-carousel__controls';
  controls.innerHTML = '<span class="project-carousel__hint">Explorer les vues <span aria-hidden="true">↗</span></span><div class="project-carousel__navigation"><button class="project-carousel__arrow project-carousel__previous" type="button" aria-label="Vue précédente">←</button><span class="project-carousel__counter" aria-live="polite"></span><button class="project-carousel__arrow project-carousel__next" type="button" aria-label="Vue suivante">→</button></div>';

  const rail = document.createElement('div');
  rail.className = 'project-carousel__rail';
  rail.setAttribute('role', 'group');
  rail.setAttribute('aria-label', 'Choisir une vue');
  const thumbnails = slides.map((slide, index) => {
    const image = slide.querySelector('img');
    const button = document.createElement('button');
    button.className = 'project-carousel__thumbnail';
    button.type = 'button';
    button.setAttribute('aria-label', `Afficher la vue ${index + 1} sur ${slides.length}`);
    const thumbnail = document.createElement('img');
    thumbnail.src = image.src;
    thumbnail.alt = '';
    thumbnail.loading = 'lazy';
    button.append(thumbnail);
    rail.append(button);
    return button;
  });

  let activeIndex = 0;
  const counter = controls.querySelector('.project-carousel__counter');
  const showSlide = (index, animate = true) => {
    const nextIndex = (index + slides.length) % slides.length;
    const direction = index < activeIndex ? 'previous' : 'next';
    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== nextIndex;
      slide.classList.toggle('is-active', slideIndex === nextIndex);
      slide.classList.remove('slide-from-next', 'slide-from-previous');
    });
    if (animate && !reducedMotion && nextIndex !== activeIndex) {
      // Restart the entrance animation when moving between the same two views.
      void slides[nextIndex].offsetWidth;
      slides[nextIndex].classList.add(`slide-from-${direction}`);
    }
    thumbnails.forEach((button, slideIndex) => {
      if (slideIndex === nextIndex) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    counter.textContent = `${String(nextIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    slides[nextIndex].querySelector('img').loading = 'eager';
    slides[(nextIndex + 1) % slides.length].querySelector('img').loading = 'eager';
    activeIndex = nextIndex;
  };

  controls.querySelector('.project-carousel__previous').addEventListener('click', () => showSlide(activeIndex - 1));
  controls.querySelector('.project-carousel__next').addEventListener('click', () => showSlide(activeIndex + 1));
  thumbnails.forEach((button, index) => button.addEventListener('click', () => showSlide(index)));
  gallery.addEventListener('keydown', event => {
    if (document.body.classList.contains('lightbox-open')) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); showSlide(activeIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showSlide(activeIndex + 1); }
  });
  gallery.append(controls, rail);
  gallery.classList.add('is-carousel');
  gallery.setAttribute('aria-roledescription', 'carrousel');
  showSlide(0, false);
});

const galleryImages = [...document.querySelectorAll('[data-gallery-image] img')];
if (galleryImages.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.hidden = true;
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Galerie du projet');
  lightbox.innerHTML = '<span class="image-lightbox__counter" aria-live="polite"></span><button class="image-lightbox__close" type="button" aria-label="Fermer la galerie">×</button><button class="image-lightbox__nav image-lightbox__prev" type="button" aria-label="Image précédente">←</button><img class="image-lightbox__image" alt="" /><button class="image-lightbox__nav image-lightbox__next" type="button" aria-label="Image suivante">→</button>';
  document.body.append(lightbox);
  const preview = lightbox.querySelector('.image-lightbox__image');
  const counter = lightbox.querySelector('.image-lightbox__counter');
  const closeButton = lightbox.querySelector('.image-lightbox__close');
  const previousButton = lightbox.querySelector('.image-lightbox__prev');
  const nextButton = lightbox.querySelector('.image-lightbox__next');
  const controls = [closeButton, previousButton, nextButton];
  let trigger;
  let currentIndex = 0;
  const showImage = index => {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    const image = galleryImages[currentIndex];
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt;
    counter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(galleryImages.length).padStart(2, '0')}`;
  };
  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
    trigger?.focus();
  };
  const openLightbox = image => {
    trigger = image.closest('[data-gallery-image]');
    showImage(galleryImages.indexOf(image));
    lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  };
  galleryImages.forEach(image => {
    const figure = image.closest('[data-gallery-image]');
    figure.tabIndex = 0;
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', `Voir dans la galerie : ${image.alt}`);
    figure.addEventListener('click', () => openLightbox(image));
    figure.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });
  closeButton.addEventListener('click', closeLightbox);
  previousButton.addEventListener('click', () => showImage(currentIndex - 1));
  nextButton.addEventListener('click', () => showImage(currentIndex + 1));
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); closeLightbox(); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(currentIndex - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); showImage(currentIndex + 1); }
    if (event.key === 'Tab') {
      event.preventDefault();
      const currentControl = controls.indexOf(document.activeElement);
      const nextControl = event.shiftKey ? (currentControl + controls.length - 1) % controls.length : (currentControl + 1) % controls.length;
      controls[nextControl].focus();
    }
  });
}

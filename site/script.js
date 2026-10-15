(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#nav-links');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Ouvrir le menu');
    }));
  }

  const config = window.MONPEAQ_CONFIG || {};
  const downloadLink = document.querySelector('#apk-download');
  const downloadStatus = document.querySelector('#download-status');
  const url = typeof config.apkDownloadUrl === 'string' ? config.apkDownloadUrl.trim() : '';
  if (downloadLink && url && /^https:\/\//i.test(url) && !url.includes('VOTRE_COMPTE') && !url.includes('VOTRE_DEPOT')) {
    downloadLink.href = url;
    downloadLink.target = '_blank';
    downloadLink.rel = 'noopener noreferrer';
    downloadLink.removeAttribute('aria-disabled');
    downloadLink.textContent = 'Télécharger l’APK';
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = ' ↓';
    downloadLink.appendChild(arrow);
    if (downloadStatus) downloadStatus.textContent = 'Téléchargement depuis la source officielle MonPEAQ.';
  } else if (downloadLink) {
    downloadLink.addEventListener('click', (event) => event.preventDefault());
  }

  const email = typeof config.contactEmail === 'string' ? config.contactEmail.trim() : '';
  document.querySelectorAll('[data-contact-email]').forEach((node) => {
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      node.href = `mailto:${email}`;
      node.textContent = email;
      node.hidden = false;
    } else {
      node.hidden = true;
    }
  });

  const year = document.querySelector('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

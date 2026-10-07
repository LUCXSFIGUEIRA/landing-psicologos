/* ==========================================================================
   Landing page para psicólogos: menu mobile, FAQ, vídeo e animações
   ========================================================================== */

(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const ano = $('[data-year]');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- Menu mobile ---------- */
  const toggle = $('.nav__toggle');
  const menu = $('#menu-mobile');

  function abrirMenu(abrir) {
    toggle.setAttribute('aria-expanded', String(abrir));
    toggle.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = abrir ? 'hidden' : '';
    if (abrir) {
      menu.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('is-open')));
    } else {
      menu.classList.remove('is-open');
      setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 450);
    }
  }

  if (toggle && menu) {
    toggle.addEventListener('click', () => abrirMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) abrirMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        abrirMenu(false);
        toggle.focus();
      }
    });
    matchMedia('(min-width: 721px)').addEventListener('change', (e) => { if (e.matches) abrirMenu(false); });
  }

  /* ---------- FAQ ---------- */
  $$('.faq__item button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq__item');
      const aberto = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(aberto));
    });
  });

  /* ---------- Vídeo (carrega o YouTube só no clique) ---------- */
  $$('.video').forEach((box) => {
    const btn = $('.video__facade', box);
    btn.addEventListener('click', () => {
      const id = box.dataset.videoId;
      // aberto direto do arquivo (file://) o YouTube recusa o player (erro 153)
      if (location.protocol === 'file:') {
        window.open(`https://www.youtube.com/watch?v=${id}`, '_blank', 'noopener');
        return;
      }
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
      iframe.title = box.dataset.videoTitle || 'Vídeo';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      box.replaceChildren(iframe);
      iframe.focus();
    });
  });

  /* ---------- Entradas no scroll ---------- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    // pequeno escalonamento entre irmãos que entram juntos
    const porPai = new Map();
    reveals.forEach((el) => {
      const lista = porPai.get(el.parentElement) || [];
      lista.push(el);
      porPai.set(el.parentElement, lista);
    });
    porPai.forEach((lista) => lista.forEach((el, i) => el.style.setProperty('--d', `${Math.min(i, 5) * 80}ms`)));

    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));

    /* botão flutuante aparece depois do hero */
    const fab = $('.fab');
    const hero = $('#hero');
    if (fab && hero) {
      new IntersectionObserver(([e]) => fab.classList.toggle('is-visible', !e.isIntersecting), { threshold: 0.05 })
        .observe(hero);
    }
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
    $('.fab')?.classList.add('is-visible');
  }
})();

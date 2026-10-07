/* ==========================================================================
   Landing page para psicólogos
   - Personalização por URL: ?nome=Ana%20Souza&crp=CRP%2006/123456&whatsapp=5511988887777
   - Painel de demonstração: adicione ?demo=1 ao endereço
   ========================================================================== */

(() => {
  'use strict';

  /* ---------- Dados padrão (edite aqui para fixar um cliente) ---------- */
  const PADRAO = {
    nome: 'Marina Albuquerque',
    titulo: 'Psicóloga',
    crp: 'CRP 00/000000',
    abordagem: 'Terapia Cognitivo-Comportamental',
    local: 'Pinheiros, São Paulo - SP',
    whatsapp: '5511900000000',
    instagram: 'marina.psi',
    email: 'contato@marinaalbuquerque.com.br',
    foto: 'assets/img/psicologa.webp',
    cor: 'salvia',
  };

  const CAMPOS = Object.keys(PADRAO);
  const CORES = {
    salvia: '#2F5D4E',
    petroleo: '#1E4F63',
    terracota: '#94452F',
    ameixa: '#5C3D61',
    grafite: '#2E3440',
  };

  const params = new URLSearchParams(location.search);
  const dados = { ...PADRAO };
  CAMPOS.forEach((k) => {
    const v = params.get(k);
    if (v && v.trim()) dados[k] = v.trim();
  });

  /* ---------- Utilidades ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const soDigitos = (s) => String(s || '').replace(/\D/g, '');

  const iniciais = (nome) => {
    const partes = nome.split(/\s+/).filter((p) => p.length > 2 || /^[A-ZÀ-Ú]/.test(p));
    const sem = partes.filter((p) => !/^(da|de|do|das|dos|e)$/i.test(p));
    const a = sem[0] || nome;
    const b = sem.length > 1 ? sem[sem.length - 1] : '';
    return (a[0] + (b[0] || '')).toUpperCase();
  };

  const primeiroNome = (nome) => nome.split(/\s+/)[0];

  const formatarTelefone = (num) => {
    let d = soDigitos(num);
    if (d.length > 11 && d.startsWith('55')) d = d.slice(2);
    if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return num;
  };

  const ehFeminino = (titulo) => /a$/i.test(titulo.trim());

  /* ---------- Aplicar dados na página ---------- */
  function aplicar() {
    const ig = dados.instagram.replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '');
    const derivados = {
      ...dados,
      iniciais: iniciais(dados.nome),
      tituloClinico: `${dados.titulo} ${ehFeminino(dados.titulo) ? 'clínica' : 'clínico'}`,
      telefone: formatarTelefone(dados.whatsapp),
      instagram: `@${ig}`,
    };

    $$('[data-bind]').forEach((el) => {
      const k = el.dataset.bind;
      if (k in derivados) el.textContent = derivados[k];
    });

    $$('[data-bind-src="foto"]').forEach((img) => {
      if (img.getAttribute('src') !== dados.foto) img.src = dados.foto;
      if (img.closest('.hero')) img.alt = `Retrato de ${dados.nome}`;
    });

    $$('[data-bind-href="instagram"]').forEach((a) => { a.href = `https://instagram.com/${ig}`; });
    $$('[data-bind-href="email"]').forEach((a) => { a.href = `mailto:${dados.email}`; });

    const msg = `Olá, ${primeiroNome(dados.nome)}! Encontrei seu site e gostaria de agendar uma conversa.`;
    const wa = `https://wa.me/${soDigitos(dados.whatsapp)}?text=${encodeURIComponent(msg)}`;
    $$('[data-whatsapp]').forEach((a) => {
      a.href = wa;
      a.target = '_blank';
      a.rel = 'noopener';
    });

    document.documentElement.dataset.cor = CORES[dados.cor] ? dados.cor : 'salvia';
    document.title = `${dados.nome} | ${dados.titulo}`;
  }

  aplicar();

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
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
      iframe.title = box.dataset.videoTitle || 'Vídeo';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;
      box.replaceChildren(iframe);
      iframe.focus();
    }, { once: true });
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

  /* ---------- Painel de demonstração (?demo=1) ---------- */
  if (params.get('demo') === '1') montarPainel();

  function montarPainel() {
    const painel = document.createElement('aside');
    painel.className = 'demo';
    painel.setAttribute('aria-label', 'Personalizar demonstração');
    painel.innerHTML = `
      <div class="demo__head">
        <strong><i class="ph-light ph-sliders-horizontal"></i> Personalizar demonstração</strong>
        <button type="button" class="demo__toggle" aria-label="Recolher painel" aria-expanded="true"><i class="ph-light ph-minus"></i></button>
      </div>
      <form>
        <label>Nome completo<input name="nome" autocomplete="off"></label>
        <div class="demo__row">
          <label>Título
            <select name="titulo">
              <option>Psicóloga</option>
              <option>Psicólogo</option>
            </select>
          </label>
          <label>CRP<input name="crp" placeholder="CRP 06/123456" autocomplete="off"></label>
        </div>
        <label>Abordagem<input name="abordagem" autocomplete="off"></label>
        <label>Local do consultório<input name="local" autocomplete="off"></label>
        <div class="demo__row">
          <label>WhatsApp (com DDI)<input name="whatsapp" inputmode="tel" placeholder="5511988887777" autocomplete="off"></label>
          <label>Instagram<input name="instagram" placeholder="usuario" autocomplete="off"></label>
        </div>
        <label>E-mail<input name="email" type="email" autocomplete="off"></label>
        <label>Foto (endereço da imagem)<input name="foto" placeholder="https://..." autocomplete="off"></label>
        <div>
          <span style="display:block;font-weight:600;font-size:.8rem;margin-bottom:6px">Cor de destaque</span>
          <div class="demo__swatches" role="group" aria-label="Cor de destaque">
            ${Object.entries(CORES).map(([k, hex]) => `<button type="button" data-cor="${k}" title="${k}" aria-label="${k}" style="background:${hex}"></button>`).join('')}
          </div>
        </div>
        <p class="demo__hint">As mudanças aparecem na hora. Use "Copiar link" para enviar ao cliente uma versão já personalizada, sem este painel.</p>
        <div class="demo__actions">
          <button type="button" class="btn btn--primary" data-acao="copiar">Copiar link</button>
          <button type="button" class="btn btn--ghost" data-acao="limpar">Restaurar padrão</button>
        </div>
        <p class="demo__status" role="status"></p>
      </form>`;
    document.body.appendChild(painel);

    const form = $('form', painel);
    const status = $('.demo__status', painel);

    const preencher = () => {
      CAMPOS.filter((k) => k !== 'cor').forEach((k) => { form.elements[k].value = dados[k]; });
      $$('.demo__swatches button', painel).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cor === dados.cor)));
    };

    const linkCliente = () => {
      const url = new URL(location.href);
      url.search = '';
      CAMPOS.forEach((k) => { if (dados[k] !== PADRAO[k]) url.searchParams.set(k, dados[k]); });
      return url.toString();
    };

    const sincronizarUrl = () => {
      const url = new URL(linkCliente());
      url.searchParams.set('demo', '1');
      history.replaceState(null, '', url);
    };

    form.addEventListener('input', (e) => {
      const k = e.target.name;
      if (!k) return;
      dados[k] = e.target.value.trim() || PADRAO[k];
      aplicar();
      sincronizarUrl();
    });

    $$('.demo__swatches button', painel).forEach((b) => b.addEventListener('click', () => {
      dados.cor = b.dataset.cor;
      aplicar();
      preencher();
      sincronizarUrl();
    }));

    painel.addEventListener('click', async (e) => {
      const acao = e.target.closest('[data-acao]')?.dataset.acao;
      if (acao === 'copiar') {
        const link = linkCliente();
        try {
          await navigator.clipboard.writeText(link);
          status.textContent = 'Link copiado.';
        } catch {
          window.prompt('Copie o link:', link);
        }
        setTimeout(() => { status.textContent = ''; }, 2500);
      }
      if (acao === 'limpar') {
        Object.assign(dados, PADRAO);
        aplicar();
        preencher();
        sincronizarUrl();
        status.textContent = 'Dados padrão restaurados.';
        setTimeout(() => { status.textContent = ''; }, 2500);
      }
    });

    const recolher = $('.demo__toggle', painel);
    recolher.addEventListener('click', () => {
      const fechado = painel.dataset.collapsed === 'true';
      painel.dataset.collapsed = String(!fechado);
      recolher.setAttribute('aria-expanded', String(fechado));
      recolher.innerHTML = `<i class="ph-light ${fechado ? 'ph-minus' : 'ph-plus'}"></i>`;
    });

    preencher();
  }
})();

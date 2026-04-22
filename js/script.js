// ─── FORM ────────────────────────────────────────────────────────────
const WHATSAPP_PHONE = '5511998483958';
const EMAIL_ADDR = 'graficacd@terra.com.br';

function buildMessage({ nome, telefone, email, servico, mensagem }) {
  return [
    'Olá! Gostaria de um orçamento.',
    '',
    `*Nome:* ${nome}`,
    telefone ? `*Telefone:* ${telefone}` : null,
    `*E-mail:* ${email}`,
    servico ? `*Serviço:* ${servico}` : null,
    '',
    `*Mensagem:*`,
    mensagem,
  ].filter(Boolean).join('\n');
}

function showBusyState(btn, label) {
  btn.dataset.originalLabel = btn.innerHTML;
  btn.innerHTML = label;
  btn.style.background = '#2ecc71';
  btn.style.color = '#fff';
  btn.disabled = true;
}

function restoreBtn(btn) {
  if (!btn.dataset.originalLabel) return;
  btn.innerHTML = btn.dataset.originalLabel;
  delete btn.dataset.originalLabel;
  btn.style.background = '';
  btn.style.color = '';
  btn.disabled = false;
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  let activeChannel = 'whatsapp';

  contactForm.querySelectorAll('button[type="submit"]').forEach(btn => {
    btn.addEventListener('click', () => { activeChannel = btn.dataset.channel || 'whatsapp'; });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const data = {
      nome: contactForm.nome.value.trim(),
      telefone: contactForm.telefone.value.trim(),
      email: contactForm.email.value.trim(),
      servico: contactForm.servico.value,
      mensagem: contactForm.mensagem.value.trim(),
    };

    const status = contactForm.querySelector('.form-status');
    const btn = contactForm.querySelector(`button[data-channel="${activeChannel}"]`);
    const message = buildMessage(data);

    if (activeChannel === 'whatsapp') {
      const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener');
      showBusyState(btn, '✓ Abrindo WhatsApp...');
      if (status) {
        status.textContent = 'Abrindo o WhatsApp com sua mensagem. Envie para confirmar o pedido.';
        status.classList.add('is-visible');
      }
    } else {
      const subject = encodeURIComponent(`Orçamento – ${data.servico || 'Gráfica CD'}`);
      const body = encodeURIComponent(message.replace(/\*/g, ''));
      window.location.href = `mailto:${EMAIL_ADDR}?subject=${subject}&body=${body}`;
      showBusyState(btn, '✓ Abrindo seu e-mail...');
      if (status) {
        status.textContent = `Abrindo seu cliente de e-mail. Não abriu? Escreva para ${EMAIL_ADDR} ou use o WhatsApp.`;
        status.classList.add('is-visible');
      }
    }

    setTimeout(() => {
      restoreBtn(btn);
      if (status) { status.textContent = ''; status.classList.remove('is-visible'); }
      contactForm.reset();
      const counter = contactForm.querySelector('[data-count]');
      if (counter) counter.textContent = '0';
    }, 4500);
  });

  // Contador de caracteres da mensagem
  const textarea = contactForm.querySelector('#f-mensagem');
  const counter = contactForm.querySelector('[data-count]');
  if (textarea && counter) {
    textarea.addEventListener('input', () => {
      counter.textContent = String(textarea.value.length);
    });
  }
}

// ─── SCROLL REVEAL ───────────────────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.service-card, .why-card, .stat, .contact-item, .machine-card, .portfolio-item, .faq-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// ─── NAV SCROLL EFFECT ───────────────────────────────────────────────
const nav = document.querySelector('nav');
const backToTop = document.querySelector('.back-to-top');

function onScroll() {
  const y = window.scrollY;
  if (nav) {
    if (y > 60) {
      nav.style.background = 'rgba(0,0,0,0.97)';
      nav.style.boxShadow = '0 2px 24px rgba(0,0,0,0.55)';
    } else {
      nav.style.background = '';
      nav.style.boxShadow = '';
    }
  }
  if (backToTop) {
    backToTop.classList.toggle('is-visible', y > 500);
  }
}
window.addEventListener('scroll', onScroll, { passive: true });

// ─── BACK TO TOP ─────────────────────────────────────────────────────
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── PHONE MASK ──────────────────────────────────────────────────────
const telInput = document.querySelector('input[type="tel"]');
if (telInput) {
  telInput.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 11);
    if (v.length >= 7) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length >= 3) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    this.value = v;
  });
}

// ─── COUNT-UP STATS ──────────────────────────────────────────────────
function animateCount(el) {
  const text = el.textContent.trim();
  const match = text.match(/(\D*)(\d+(?:\.\d+)?)(.*)/);
  if (!match) return;
  const prefix = match[1];
  const target = parseFloat(match[2]);
  const suffix = match[3];
  const isFloat = match[2].includes('.');
  const duration = 1200;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = text;
  }
  requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-num, .why-trust-num').forEach(el => countObserver.observe(el));

// ─── MOBILE NAV TOGGLE ───────────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  const closeMenu = () => {
    navToggle.classList.remove('is-open');
    navLinks.classList.remove('is-open');
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    navToggle.classList.add('is-open');
    navLinks.classList.add('is-open');
    document.body.classList.add('nav-open');
    navToggle.setAttribute('aria-expanded', 'true');
  };

  navToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('is-open')) closeMenu();
    else openMenu();
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('is-open')) closeMenu();
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('is-open')) return;
    if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
    closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navLinks.classList.contains('is-open')) closeMenu();
  });
}

// ─── AGORA ABERTO? ───────────────────────────────────────────────────
// Exibe indicador "Aberto agora" / "Fechado" perto do horário
(function openStatus() {
  const badge = document.querySelector('[data-open-status]');
  if (!badge) return;
  const now = new Date();
  const day = now.getDay(); // 0=dom, 6=sáb
  const minutes = now.getHours() * 60 + now.getMinutes();
  const open = day >= 1 && day <= 5 && minutes >= 8 * 60 && minutes < 17 * 60 + 30;
  badge.textContent = open ? '● Aberto agora' : '● Fechado';
  badge.classList.toggle('is-open', open);
  badge.classList.toggle('is-closed', !open);
})();

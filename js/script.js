function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.form-submit');

  const nome = form.nome.value;
  const telefone = form.telefone.value;
  const email = form.email.value;
  const servico = form.servico.value;
  const mensagem = form.mensagem.value;

  const corpo = encodeURIComponent(
    `Nome: ${nome}\nTelefone: ${telefone}\nE-mail: ${email}\nServiço: ${servico}\n\nMensagem:\n${mensagem}`
  );
  const assunto = encodeURIComponent(`Orçamento – ${servico || 'Gráfica CD'}`);

  window.location.href = `mailto:graficacd@terra.com.br?subject=${assunto}&body=${corpo}`;

  btn.textContent = '✓ Abrindo seu e-mail...';
  btn.style.background = '#2ecc71';
  btn.style.color = '#fff';

  setTimeout(() => {
    btn.textContent = 'Enviar mensagem →';
    btn.style.background = '';
    btn.style.color = '';
    form.reset();
  }, 3000);
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .why-item, .stat, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Nav scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(17,17,17,0.97)';
    nav.style.boxShadow = '0 2px 24px rgba(0,0,0,0.4)';
  } else {
    nav.style.background = 'rgba(17,17,17,0.85)';
    nav.style.boxShadow = 'none';
  }
});

// Phone mask
const telInput = document.querySelector('input[type="tel"]');
if (telInput) {
  telInput.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '').slice(0, 11);
    if (v.length >= 7) v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    else if (v.length >= 3) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    this.value = v;
  });
}

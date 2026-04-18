  function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.form-submit');
    btn.textContent = '✓ Mensagem enviada!';
    btn.style.background = '#2ecc71';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.textContent = 'Enviar mensagem →';
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);
  }

  // scroll reveal
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

(() => {
  // 年号
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // スムーススクロール（内部リンク）
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const id = a.getAttribute('href');
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // スクロールスパイ（現在セクションのナビ強調）
  const sections = Array.from(document.querySelectorAll('main > section[id]'));
  const linkMap = new Map(
    Array.from(navLinks).map(a => [a.getAttribute('href'), a])
  );
  const spy = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const href = `#${entry.target.id}`;
        const link = linkMap.get(href);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0.01 }
  );
  sections.forEach(s => spy.observe(s));

  // セクションのフェードイン（1回だけ）
  const revealTargets = Array.from(document.querySelectorAll('.section .container'));
  revealTargets.forEach(t => t.classList.add('reveal'));
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  revealTargets.forEach(t => io.observe(t));

  // ヘッダー縮小＆影
  const header = document.querySelector('.site-header');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (!header) return;
    if (y > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
    lastY = y;
    // トップへ戻るボタンの表示切替
    if (toTopBtn) {
      toTopBtn.hidden = y < 300;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // トップへ戻るボタン
  const toTopBtn = document.createElement('button');
  toTopBtn.type = 'button';
  toTopBtn.className = 'to-top';
  toTopBtn.textContent = '↑';
  toTopBtn.title = 'トップへ戻る';
  toTopBtn.hidden = true;
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  document.body.appendChild(toTopBtn);
})();

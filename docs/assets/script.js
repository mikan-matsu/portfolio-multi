(() => {
  // 年
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // トップへ戻るボタン（先に作ってからスクロール監視）
  const toTopBtn = document.createElement('button');
  toTopBtn.type = 'button';
  toTopBtn.className = 'to-top';
  toTopBtn.textContent = '↑';
  toTopBtn.title = 'トップへ戻る';
  toTopBtn.hidden = true;
  toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(toTopBtn);

  // スムーススクロール
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  navLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const el = document.querySelector(a.getAttribute('href'));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // モバイルならメニューを閉じる
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // スクロールスパイ
  const sections = Array.from(document.querySelectorAll('main > section[id]'));
  const linkMap = new Map(Array.from(navLinks).map(a => [a.getAttribute('href'), a]));
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = linkMap.get('#' + entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0.01 });
  sections.forEach(s => spy.observe(s));

  // フェードイン
  const targets = Array.from(document.querySelectorAll('.section .container'));
  targets.forEach(t => t.classList.add('reveal'));
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  targets.forEach(t => io.observe(t));

  // ヘッダー縮小＆toTop表示
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 10);
    toTopBtn.hidden = y < 300;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // モバイルメニュー
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links){
    toggle.addEventListener('click', () => {
      const opened = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(opened));
    });
  }

  // 送信モック
  const note = document.getElementById('form-note');
  const btn = document.querySelector('button[type="submit"]');
  if (btn && note){
    btn.addEventListener('click', ()=>{ note.textContent = '送信しました（ダミー）'; setTimeout(()=> note.textContent = '', 2500); });
  }
})();

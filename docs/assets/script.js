(function () {
  // 1) ナビ開閉（aria連動）
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      links.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // 2) スクロールでヘッダー縮小／ToTop表示
  const header = document.querySelector('.site-header');
  const toTop = document.querySelector('.to-top');
  const onScroll = () => {
    if (window.scrollY > 10) header?.classList.add('scrolled');
    else header?.classList.remove('scrolled');

    if (toTop) {
      if (window.scrollY > 400) toTop.classList.add('show');
      else toTop.classList.remove('show');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 3) トップへ戻る
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // 4) フッター年
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // 5) アンカーのスムーズスクロール（ヘッダー分オフセット・簡易）
  const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const headerOffset = (header?.offsetHeight ?? 64);
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      if (prefersReduce) window.scrollTo(0, y);
      else window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  // 6) 出現アニメーション（Observerを1本に統合）
  const observeTargets = [
    ...document.querySelectorAll('[data-animate]'),
    ...document.querySelectorAll('.reveal'),
    ...document.querySelectorAll('.section')
  ];
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const t = e.target;

        // 共通: in / fade-in を付与（どちらのCSSでも効くように）
        t.classList.add('in');
        t.classList.add('fade-in');

        // スキルバーが含まれる場合は伸ばす
        if ((t.id === 'skills') || t.closest?.('#skills')) {
          document.querySelectorAll('.skill .bar > span').forEach(b => {
            b.style.transform = 'scaleX(1)';
          });
        }

        io.unobserve(t);
      });
    }, { threshold: 0.15 });

    observeTargets.forEach(el => io.observe(el));
  } else {
    // フォールバック
    observeTargets.forEach(el => {
      el.classList.add('in');
      el.classList.add('fade-in');
    });
  }

  // 7) 簡易送信メッセージ
  const sendBtn = document.getElementById('send-btn');
  const note = document.getElementById('form-note');
  sendBtn?.addEventListener('click', () => {
    if (!note) return;
    note.textContent = '送信しました（ダミー動作）';
    setTimeout(() => (note.textContent = ''), 2500);
  });
})();

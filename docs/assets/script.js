(function () {
  // === ナビゲーション制御 ====================
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    // トグルボタン押下
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      links.setAttribute('aria-expanded', String(open));
    });

    // 外側クリックで閉じる
    document.addEventListener('click', (e) => {
      if (links.classList.contains('open') && !links.contains(e.target) && e.target !== toggle) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', "false");
        links.setAttribute('aria-expanded', "false");
      }
    });

    // メニューリンククリックで閉じる
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', "false");
        links.setAttribute('aria-expanded', "false");
      });
    });
  }

  // === ヘッダー縮小 & ToTopボタン制御 ====================
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

  // === トップへ戻る ====================
  toTop?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  // === フッター年自動更新 ====================
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // === アンカーのスムーズスクロール ====================
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

  // === 出現アニメーション ====================
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
        t.classList.add('in', 'fade-in');

        // スキルバー制御
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
    observeTargets.forEach(el => el.classList.add('in', 'fade-in'));
  }

  // === 簡易送信メッセージ ====================
  const sendBtn = document.getElementById('send-btn');
  const note = document.getElementById('form-note');
  sendBtn?.addEventListener('click', () => {
    if (!note) return;
    note.textContent = '送信しました（ダミー動作）';
    setTimeout(() => (note.textContent = ''), 2500);
  });
})();

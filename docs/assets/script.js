(function () {
  // ナビ開閉
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // スクロールでヘッダー縮小
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
  window.addEventListener('scroll', onScroll);
  onScroll();

  // トップへ戻る
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // フッター年
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // 出現アニメ
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // 簡易送信メッセージ
  const sendBtn = document.getElementById('send-btn');
  const note = document.getElementById('form-note');
  sendBtn?.addEventListener('click', () => {
    if (note) {
      note.textContent = '送信しました（ダミー動作）';
      setTimeout(() => (note.textContent = ''), 2500);
    }
  });
})();

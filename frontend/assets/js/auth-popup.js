// Đăng nhập/Đăng ký chuyên nghiệp UI cho popup
// Yêu cầu: HTML popup phải có id="authModal" và các id như bên dưới

document.addEventListener('DOMContentLoaded', function() {
  const loginBtn = document.getElementById('loginBtn');
  const authModal = document.getElementById('authModal');
  const closeAuthModal = document.getElementById('closeAuthModal');
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const toggleAuth = document.getElementById('toggleAuth');
  const authForm = document.getElementById('authForm');
  const userError = document.getElementById('userError');
  const passError = document.getElementById('passError');
  let isLogin = true;

  function setTab(login) {
    isLogin = login;
    if(tabLogin && tabRegister) {
      tabLogin.classList.toggle('text-gray-400', !login);
      tabLogin.classList.toggle('border-fuchsia-500', login);
      tabLogin.classList.toggle('border-transparent', !login);
      tabRegister.classList.toggle('text-gray-400', login);
      tabRegister.classList.toggle('border-fuchsia-500', !login);
      tabRegister.classList.toggle('border-transparent', login);
    }
    if(authForm) {
      const btn = authForm.querySelector('button[type="submit"]');
      if(btn) btn.textContent = login ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ';
    }
  }
  function openAuthModal(login = true) {
    setTab(login);
    if(authModal) authModal.classList.remove('hidden');
  }
  function closeModal() {
    if(authModal) authModal.classList.add('hidden');
  }
  if(loginBtn) loginBtn.addEventListener('click', () => openAuthModal(true));
  if(closeAuthModal) closeAuthModal.addEventListener('click', closeModal);
  if(tabLogin) tabLogin.addEventListener('click', () => setTab(true));
  if(tabRegister) tabRegister.addEventListener('click', () => setTab(false));
  if(toggleAuth) toggleAuth.addEventListener('click', () => setTab(false));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  if(authModal) authModal.addEventListener('click', (e) => { if (e.target === authModal) closeModal(); });
  if(authForm) authForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Demo validate
    let valid = true;
    const userInput = authForm.querySelector('input[type="text"]');
    const passInput = authForm.querySelector('input[type="password"]');
    if (userError && userInput && !userInput.value) {
      userError.classList.remove('hidden');
      valid = false;
    } else if(userError) {
      userError.classList.add('hidden');
    }
    if (passError && passInput && !passInput.value) {
      passError.classList.remove('hidden');
      valid = false;
    } else if(passError) {
      passError.classList.add('hidden');
    }
    if (!valid) return;
    alert(isLogin ? 'Đăng nhập thành công (demo)!' : 'Đăng ký thành công (demo)!');
    closeModal();
  });
});

function openPopup() {
  document.getElementById('popup').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  document.getElementById('popup').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('popup').addEventListener('click', function(e) {
  if (e.target === this) closePopup();
});

document.getElementById('popup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('.btn-submit');
  btn.textContent = '✓ נשלח! נחזור אליכם בקרוב';
  btn.classList.add('success');
  btn.disabled = true;
  setTimeout(() => {
    this.reset();
    btn.textContent = 'אשמח שתחזרו אלי';
    btn.classList.remove('success');
    btn.disabled = false;
    closePopup();
  }, 3000);
});

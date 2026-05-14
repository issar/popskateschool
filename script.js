var WEBHOOK_URL = 'https://hook.eu2.make.com/p9wcmqo7me42pkzl1ipixrud7k6hgoks';

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
  var btn = this.querySelector('.btn-submit');
  var name    = document.getElementById('field-name').value;
  var phone   = document.getElementById('field-phone').value;
  var email   = document.getElementById('field-email').value;
  var consent = document.getElementById('field-consent').checked ? 'כן' : 'לא';

  btn.textContent = '...שולח';
  btn.disabled = true;

  fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type:    'lead',
      name:    name,
      phone:   phone,
      email:   email,
      consent: consent,
      date:    new Date().toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' })
    })
  })
  .finally(function() {
    if (typeof fbq !== 'undefined') fbq('track', 'Lead');
    btn.textContent = '✓ נשלח!';
    btn.classList.add('success');
    setTimeout(function() {
      window.location.href = 'thank-you.html?name=' + encodeURIComponent(name)
        + '&phone=' + encodeURIComponent(phone)
        + '&email=' + encodeURIComponent(email);
    }, 700);
  });
});

/* Shabakat Alasturah — shared site behavior */
(function () {
  "use strict";

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Pre-select the "interest" dropdown on the contact page when arriving
  // via a product/service link like contact.html?interest=call-booster
  var interestSelect = document.querySelector("#interest");
  if (interestSelect) {
    var params = new URLSearchParams(window.location.search);
    var interest = params.get("interest");
    if (interest) {
      var optionExists = Array.prototype.some.call(interestSelect.options, function (opt) {
        return opt.value === interest;
      });
      if (optionExists) interestSelect.value = interest;
    }
  }

  // Contact form: prevent double-submit, show a sending state, and reveal
  // native validation styling only after the user has attempted to submit.
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var submitBtn = contactForm.querySelector('button[type="submit"]');
    var statusEl = contactForm.querySelector('.form-status');
    var isArabicForm = document.documentElement.dir === 'rtl';
    // The native 'submit' event only fires once all fields pass constraint
    // validation, so catch failures via the (non-bubbling) 'invalid' event.
    contactForm.addEventListener('invalid', function () {
      contactForm.classList.add('form-attempted');
      if (statusEl) {
        statusEl.textContent = isArabicForm
          ? 'يرجى تعبئة الحقول المطلوبة قبل الإرسال.'
          : 'Please fill in the required fields before submitting.';
      }
    }, true);
    contactForm.addEventListener('submit', function (e) {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = isArabicForm ? 'جارٍ الإرسال…' : 'Sending…';
      }
      if (statusEl) {
        statusEl.textContent = isArabicForm ? 'جارٍ إرسال طلبك…' : 'Sending your request…';
      }
    });
  }

  // Show success message if redirected back after Web3Forms submission
  var urlParams = new URLSearchParams(window.location.search);
  if (contactForm && urlParams.get('sent') === '1') {
    contactForm.style.display = 'none';
    var msg = document.createElement('div');
    msg.className = 'form-success';
    msg.innerHTML = isArabicForm
      ? '<p>✅ تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.</p>'
      : '<p>✅ Your message was sent successfully. We will get back to you shortly.</p>';
    contactForm.parentNode.insertBefore(msg, contactForm);
  }
})();

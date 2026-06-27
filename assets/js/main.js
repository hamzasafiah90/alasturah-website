/* Shabakat Alasturah — shared site behavior */
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      var expanded = links.classList.contains("open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
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

  // Show success message if redirected back after Web3Forms submission
  (function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('sent') === '1') {
      const form = document.getElementById('contact-form');
      if (form) {
        form.style.display = 'none';
        const msg = document.createElement('div');
        msg.className = 'form-success';
        msg.style.cssText = 'text-align:center;padding:2rem;font-size:1.1rem;color:var(--color-primary,#1a3c6e);';
        // Detect language from <html dir> attribute
        const isArabic = document.documentElement.dir === 'rtl';
        msg.innerHTML = isArabic
          ? '<p>✅ تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.</p>'
          : '<p>✅ Your message was sent successfully. We will get back to you shortly.</p>';
        form.parentNode.insertBefore(msg, form);
      }
    }
  })();
})();

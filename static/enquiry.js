/* Consultation form. Posts JSON to the existing enquiry worker.
   A filled honeypot is treated as success and is not sent. */
(function () {
  var form = document.getElementById("ac-enquiry-form");
  var panel = document.querySelector(".ac-contact-panel");

  function showThanks(moveFocus) {
    if (!panel) return;
    panel.innerHTML = '<h2 id="contact-heading">Contact</h2>' +
      '<p class="ac-success" role="status" tabindex="-1">Message received. A response will follow shortly.</p>';
    var status = panel.querySelector(".ac-success");
    if (moveFocus && status) status.focus();
  }

  try {
    if (/(?:^|[?&])sent=(?:1|true|yes)\b/.test(location.search || "")) {
      showThanks(false);
    }
  } catch (e) {}

  if (!form || !panel) return;

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var hp = form.querySelector('[name="company_url"]');
    if (hp && String(hp.value || "").trim()) {
      showThanks(true);
      return;
    }
    var fd = new FormData(form);
    var body = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      company: String(fd.get("company") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      company_url: String(fd.get("company_url") || "").trim()
    };
    var btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Sending\u2026";
    }
    fetch(form.action, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) {
      if (!r.ok) throw new Error("send failed");
      showThanks(true);
    }).catch(function () {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Request a consultation";
      }
      var alert = panel.querySelector(".ac-form-alert");
      if (!alert) {
        alert = document.createElement("div");
        alert.className = "ac-form-alert";
        alert.setAttribute("role", "alert");
        form.parentNode.insertBefore(alert, form);
      }
      alert.textContent = "";
      alert.appendChild(document.createTextNode("The message could not be sent. Email "));
      var link = document.createElement("a");
      link.href = "mailto:contact@accology.co";
      link.textContent = "contact@accology.co";
      alert.appendChild(link);
      alert.appendChild(document.createTextNode("."));
    });
  });
})();

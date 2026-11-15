/* Mobile navigation. Desktop layout is CSS only. */
(function () {
  var btn = document.querySelector(".ac-nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!btn || !nav) return;
  var label = btn.querySelector(".ac-nav-toggle-label");

  function setOpen(open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
    if (label) label.textContent = open ? "Close" : "Menu";
  }

  btn.addEventListener("click", function () {
    setOpen(btn.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (ev) {
    if (ev.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      btn.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 861px)").matches) setOpen(false);
  });
})();

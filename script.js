// Liquid glass nav: sliding indicator + cursor-following highlight
(function () {
  var nav = document.querySelector(".glass-nav");
  if (!nav) return;

  var list = nav.querySelector("ul");
  var links = Array.prototype.slice.call(nav.querySelectorAll("a"));
  var current = nav.querySelector('a[aria-current="page"]') || links[0];

  var indicator = document.createElement("span");
  indicator.className = "nav-indicator";
  indicator.setAttribute("aria-hidden", "true");
  list.insertBefore(indicator, list.firstChild);

  function moveTo(link) {
    if (!link) return;
    var listBox = list.getBoundingClientRect();
    var box = link.getBoundingClientRect();
    indicator.style.width = box.width + "px";
    indicator.style.transform = "translateX(" + (box.left - listBox.left) + "px)";
    indicator.classList.add("is-ready");
  }

  links.forEach(function (link) {
    link.addEventListener("mouseenter", function () { moveTo(link); });
    link.addEventListener("focus", function () { moveTo(link); });
  });

  nav.addEventListener("mouseleave", function () { moveTo(current); });
  list.addEventListener("focusout", function (e) {
    if (!list.contains(e.relatedTarget)) moveTo(current);
  });

  nav.addEventListener("mousemove", function (e) {
    var box = nav.getBoundingClientRect();
    nav.style.setProperty("--mx", e.clientX - box.left + "px");
    nav.style.setProperty("--my", e.clientY - box.top + "px");
  });

  window.addEventListener("resize", function () { moveTo(current); });

  // wait for web fonts so measurements are right
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { moveTo(current); });
  }
  moveTo(current);
})();

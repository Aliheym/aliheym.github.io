"use strict";

(function () {
  const langSelect = document.querySelector(".lang-selection");

  if (!langSelect) return;

  const langOpen = langSelect.querySelector(".lang-selection__title");
  const inputs = langSelect.querySelectorAll("input");

  const addEListener = (element) => {
    element.addEventListener("change", () => {
      langOpen.innerHTML = element.value;
      langSelect.classList.remove("lang-selection--open");
    });
  };

  const onClickLangOpen = (evt) => {
    evt.preventDefault();

    langSelect.classList.toggle("lang-selection--open");
    for (let i = 0; i < inputs.length; i++) {
      addEListener(inputs[i]);
    }
  };

  langOpen.addEventListener("click", onClickLangOpen);
})();

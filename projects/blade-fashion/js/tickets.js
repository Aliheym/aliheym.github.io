"use strict";

(function () {
  const popup = document.querySelector(".popup--tickets");
  const overlay = document.querySelector(".overlay");
  const table = document.querySelector(".tickets-table");

  if (!popup || !overlay || !table) return;

  const form = popup.querySelector(".form");
  const btnClose = popup.querySelector(".popup__close");
  const btnSubmit = form.querySelector(".form__btn-submit");
  const btnThanks = popup.querySelector(".popup__thanks-btn");
  const inputName = form.querySelector("#tickets-name");
  const inputMail = form.querySelector("#tickets-mail");
  const areaName = form.querySelector(".form__area--name");
  const areaEmail = form.querySelector(".form__area--mail");
  const body = document.querySelector("body");

  const onInput = (evt) => {
    const activeInput = evt.target;
    const area = activeInput.closest(".form__area");

    area.classList.toggle("form__area--error");
    activeInput.removeEventListener("input", onInput);
  };

  const onClickBtnSubmit = (evt) => {
    evt.preventDefault();

    if (!inputName.value || !inputMail.value) {
      if (!inputName.value) {
        areaName.classList.add("form__area--error");
        inputName.addEventListener("input", onInput);
      }

      if (!inputMail.value) {
        areaEmail.classList.add("form__area--error");
        inputMail.addEventListener("input", onInput);
      }
    } else {
      popup.classList.add("popup--submit");

      btnSubmit.removeEventListener("click", onClickBtnSubmit);
    }
  };

  const onClosePopup = (evt) => {
    evt.preventDefault();

    popup.classList.remove("popup--open");
    popup.classList.remove("popup--submit");

    overlay.classList.remove("overlay--open");

    table.addEventListener("click", onClickBtnTable);

    btnSubmit.removeEventListener("click", onClickBtnSubmit);
    overlay.removeEventListener("click", onClosePopup);
    window.removeEventListener("keydown", onKeydown);
    btnThanks.removeEventListener("click", onClosePopup);

    body.classList.remove("modal-no-scroll");
  };

  const onKeydown = (evt) => {
    if (evt.keyCode === 27) {
      // Esc
      evt.preventDefault();

      onClosePopup(evt);
    }
  };

  const onClickBtnTable = (evt) => {
    evt.preventDefault();

    const activeElement = evt.target;

    if (activeElement.classList.contains("button-buy")) {
      overlay.classList.add("overlay--open");
      popup.classList.add("popup--open");

      const statusButton = activeElement.dataset.status;
      const relevantRadio = form.querySelector(
        "input[value=" + statusButton + "]"
      );
      relevantRadio.checked = true;

      inputName.focus();

      table.removeEventListener("click", onClickBtnTable);

      btnClose.addEventListener("click", onClosePopup);
      btnThanks.addEventListener("click", onClosePopup);
      btnSubmit.addEventListener("click", onClickBtnSubmit);
      overlay.addEventListener("click", onClosePopup);
      window.addEventListener("keydown", onKeydown);

      body.classList.add("modal-no-scroll");
    }
  };

  table.addEventListener("click", onClickBtnTable);
})();

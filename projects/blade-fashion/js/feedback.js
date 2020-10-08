"use strict";

(function () {
  const DESKTOP = 1023;
  const contacts = document.querySelector(".contacts");

  if (!contacts) return;

  const feedback = contacts.querySelector(".feedback__wrapper");
  const overlay = feedback.querySelector(".feedback__overlay");
  const form = feedback.querySelector(".form");

  const btnClose = feedback.querySelector(".feedback__close");
  const btnCloseThansk = feedback.querySelector(".feedback__close--thanks");
  const btnSubmit = form.querySelector(".form__btn-small");
  const btnThanks = feedback.querySelector(".feedback__thanks-btn");

  const inputName = form.querySelector("#feedback-name");
  const inputMail = form.querySelector("#feedback-mail");
  const textarea = form.querySelector("#feedback-message");

  const areaName = form.querySelector(".form__area--name");
  const areaEmail = form.querySelector(".form__area--mail");
  const areaTextarea = form.querySelector(".form__area--textarea");

  const btnOpenPopup = contacts.querySelector(".feedback__btn-open");
  const body = document.body;

  let widthWindow = document.documentElement.clientWidth;

  const onResize = () => {
    widthWindow = document.documentElement.clientWidth;

    if (
      widthWindow < DESKTOP &&
      overlay.classList.contains("feedback__overlay--open")
    )
      onClosePopup();
  };

  const onInput = (evt) => {
    const activeInput = evt.target;
    const area = activeInput.closest(".form__area");

    area.classList.toggle("form__area--error");
    activeInput.removeEventListener("input", onInput);
  };

  const onClickBtnSubmit = (evt) => {
    evt.preventDefault();

    if (!inputName.value || !inputMail.value || !textarea.value) {
      if (!inputName.value) {
        areaName.classList.add("form__area--error");
        inputName.addEventListener("input", onInput);
      }

      if (!inputMail.value) {
        areaEmail.classList.add("form__area--error");
        inputMail.addEventListener("input", onInput);
      }

      if (!textarea.value) {
        areaTextarea.classList.add("form__area--error");
        textarea.addEventListener("input", onInput);
      }
    } else {
      feedback.classList.add("feedback__wrapper--submit");
      overlay.classList.add("feedback__overlay--open");
      overlay.addEventListener("click", onClosePopup);
      window.addEventListener("keydown", onKeydown);

      btnThanks.addEventListener("click", onClosePopup);
      btnClose.addEventListener("click", onClosePopup);
      btnCloseThansk.addEventListener("click", onClosePopup);

      inputName.value = inputMail.value = textarea.value = "";

      body.classList.add("modal-no-scroll");
    }
  };

  const onClosePopup = () => {
    feedback.classList.remove("feedback__wrapper--open");
    feedback.classList.add("feedback__wrapper--close");

    setTimeout(() => {
      feedback.classList.remove("feedback__wrapper--close");
    }, 300);

    overlay.classList.remove("feedback__overlay--open");
    feedback.classList.remove("feedback__wrapper--submit");

    window.removeEventListener("keydown", onKeydown);
    btnThanks.removeEventListener("click", onClosePopup);
    btnClose.removeEventListener("click", onClosePopup);
    btnCloseThansk.removeEventListener("click", onClosePopup);

    body.classList.remove("modal-no-scroll");
  };

  const onKeydown = (evt) => {
    if (evt.keyCode === 27) {
      // ESC
      evt.preventDefault();

      onClosePopup(evt);
    }
  };

  const onClickBtnOpen = (evt) => {
    evt.preventDefault();

    overlay.classList.add("overlay-feedback--open");

    inputName.focus();

    feedback.classList.add("feedback__wrapper--open");

    overlay.addEventListener("click", onClosePopup);
    window.addEventListener("keydown", onKeydown);
    btnSubmit.addEventListener("click", onClickBtnSubmit);
    btnClose.addEventListener("click", onClosePopup);

    body.classList.add("modal-no-scroll");
  };

  btnOpenPopup.addEventListener("click", onClickBtnOpen);
  btnSubmit.addEventListener("click", onClickBtnSubmit);
  window.addEventListener("scroll", onResize);
})();

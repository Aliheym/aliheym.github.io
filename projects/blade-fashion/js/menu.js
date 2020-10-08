"use strict";

(() => {
  const TABLET = 767;
  const DESKTOP = 1023;

  const body = document.body;
  const header = document.querySelector(".main-header");
  const nav = document.querySelector(".main-nav");
  const btn = document.querySelector(".main-header__btn");
  const preview = document.querySelector("#preview");
  let widthWindow = document.documentElement.clientWidth;

  if (!header || !btn || !body) return;

  let bottomPositionPreview = preview.getBoundingClientRect().bottom;

  const getBottomPosition = () => {
    let position = btn.getBoundingClientRect().bottom;

    if (widthWindow > DESKTOP) {
      position = nav.getBoundingClientRect().bottom;
    }

    return position;
  };

  let bottomPosition = getBottomPosition();

  const onScroll = () => {
    bottomPositionPreview = preview.getBoundingClientRect().bottom;
    bottomPosition = getBottomPosition();

    if (widthWindow > TABLET) {
      if (bottomPosition > bottomPositionPreview) {
        header.classList.add("main-header--scroll");
      } else {
        header.classList.remove("main-header--scroll");
      }
    }
  };

  const onResize = () => {
    widthWindow = document.documentElement.clientWidth;
    getBottomPosition();

    if (widthWindow > DESKTOP) {
      body.classList.toggle("no-scroll");
    } else {
      if (header.classList.contains("main-header--opened")) {
        body.classList.toggle("no-scroll");
      }
    }
  };

  const onClickHeader = (evt) => {
    const activeElement = evt.target;

    if (activeElement.classList.contains("main-nav__link")) {
      header.classList.remove("main-header--opened");
      body.classList.remove("no-scroll");
      header.removeEventListener("click", onClickHeader);
    }
  };

  const onClickBtn = (evt) => {
    evt.preventDefault();

    header.classList.toggle("main-header--opened");

    if (header.classList.contains("main-header--opened")) {
      header.addEventListener("click", onClickHeader);
      body.classList.add("no-scroll");
    } else {
      header.removeEventListener("click", onClickHeader);
      body.classList.remove("no-scroll");
    }
  };

  btn.addEventListener("click", onClickBtn);
  window.addEventListener("resize", onResize);
  window.addEventListener("scroll", onScroll);
})();

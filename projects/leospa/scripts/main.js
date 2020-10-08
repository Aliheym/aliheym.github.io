"use strict";

$(document).ready(function () {
  $(".features-list").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  });

  $(".testimonials__list").owlCarousel({
    loop: true,
    dots: true,
    nav: false,
    autoplay: true,
    margin: 0,
    items: 1,
  });
});

(function () {
  let TABLET = 767;
  let DESKTOP = 1023;
  let scrollClassName = "site-header--scroll";
  let widthWindow = document.documentElement.clientWidth;
  let header = document.querySelector(".site-header");
  let menuBtn = document.querySelector(".menu-btn");
  let hero = document.querySelector(".hero__wrapper");

  let topHeaderPosition = header.getBoundingClientRect().top;
  let topHeroPosition = hero.getBoundingClientRect().top;

  let onScroll = function () {
    topHeaderPosition = header.getBoundingClientRect().top;
    topHeroPosition = hero.getBoundingClientRect().top;

    if (widthWindow > TABLET) {
      if (topHeaderPosition > topHeroPosition + 5) {
        header.classList.add(scrollClassName);
      } else {
        header.classList.remove(scrollClassName);
      }
    }
  };

  let onClickHeader = function (evt) {
    let activeElement = evt.target;

    if (activeElement.classList.contains("main-nav__link")) {
      menuBtn.classList.remove("menu-btn--opened");
      document.body.classList.remove("no-scroll");
      header.removeEventListener("click", onClickHeader);
    }
  };

  let onClickMenuBtn = function (evt) {
    evt.preventDefault();
    menuBtn.classList.toggle("menu-btn--opened");

    if (menuBtn.classList.contains("menu-btn--opened")) {
      document.body.classList.add("no-scroll");
      header.addEventListener("click", onClickHeader);
    } else {
      document.body.classList.remove("no-scroll");
      header.removeEventListener("click", onClickHeader);
    }
  };

  let onResize = function () {
    widthWindow = document.documentElement.clientWidth;
    if (widthWindow > DESKTOP) {
      document.body.classList.remove("no-scroll");
      onScroll();
    } else {
      if (menuBtn.classList.contains("menu-btn--opened")) {
        document.body.classList.add("no-scroll");
      }

      header.classList.remove(scrollClassName);
    }
  };

  onScroll();

  menuBtn.addEventListener("click", onClickMenuBtn);
  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", onResize);
})();

(function () {
  let sections = document.querySelectorAll("[data-section]");

  if (!sections) return;

  let getPosition = function (sections) {
    let positions = [];

    for (let i = 0; i < sections.length; i++) {
      positions.push({
        name: sections[i].dataset.section,
        position: sections[i].getBoundingClientRect().top - 25,
      });
    }

    return positions;
  };

  let getActiveSection = function (sectionPositions) {
    let section = {
      name: null,
      position: -Infinity,
    };

    for (let i = 0; i < sectionPositions.length; i++) {
      if (
        sectionPositions[i].position <= 0 &&
        section.position < sectionPositions[i].position
      ) {
        section = sectionPositions[i];
      }
    }

    return section;
  };

  let sectionPositions = getPosition(sections);
  let currentSection = getActiveSection(sectionPositions);

  let onScroll = function () {
    sectionPositions = getPosition(sections);
    let activeSection = getActiveSection(sectionPositions);

    if (currentSection != activeSection && activeSection.name) {
      currentSection = activeSection;
      let oldActiveLink = document.querySelector(".main-nav__link--active");
      let newActiveLink = document.querySelector(
        "[href='#" + currentSection.name + "']"
      );
      oldActiveLink.classList.remove("main-nav__link--active");
      newActiveLink.classList.add("main-nav__link--active");
    }
  };

  onScroll();
  window.addEventListener("scroll", onScroll);
})();

(function () {
  let form = document.querySelector(".form");

  let changeFillStatus = function (element) {
    let groupElement = element.closest(".form__group");

    if (!groupElement) return;

    if (element.value.length) {
      groupElement.classList.add("form__group--filled");
    } else {
      groupElement.classList.remove("form__group--filled");
    }
  };

  let onFocusOut = function (evt) {
    let activeElement = evt.target;
    changeFillStatus(activeElement);
  };

  for (let i = 0; i < form.elements.length; i++) {
    changeFillStatus(form.elements[i]);
  }

  form.addEventListener("focusout", onFocusOut);
})();

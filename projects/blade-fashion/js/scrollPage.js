"use strict";

(function () {
  const sections = document.querySelectorAll("[data-block]");

  if (!sections) return;

  const halfHeightWindow = window.innerHeight / 2;

  const getPosition = (blocks) => {
    const position = [];

    for (let i = 0; i < blocks.length; i++) {
      position[i] = {
        name: blocks[i].dataset.block,
        position: blocks[i].getBoundingClientRect().top,
      };
    }

    return position;
  };

  const checkPosition = (blocks) => {
    let block = false;

    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].position >= 0 && blocks[i].position <= halfHeightWindow) {
        block = blocks[i].name;
      }
    }

    return block;
  };

  let sectionPositon = getPosition(sections);
  let activeBlock = checkPosition(sectionPositon);

  const onScroll = () => {
    sectionPositon = getPosition(sections);
    if (
      activeBlock !== checkPosition(sectionPositon) &&
      checkPosition(sectionPositon)
    ) {
      activeBlock = checkPosition(sectionPositon);

      const oldActiveLink = document.querySelector(".main-nav__link--active");
      const newActiveLink = document.querySelector(
        '[href="#' + activeBlock + '"]'
      );

      oldActiveLink.classList.remove("main-nav__link--active");
      newActiveLink.classList.add("main-nav__link--active");
    }
  };

  window.addEventListener("scroll", onScroll);
})();

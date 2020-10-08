"use strict";

(function () {
  const TABLET = 643;
  const table = document.querySelector(".tickets-table");

  if (!table) return;

  let widthWindow = document.documentElement.clientWidth;
  let tableWidth = table.offsetWidth;
  let maxDist = tableWidth - widthWindow;

  let startX = false;
  let dist = 0;
  let bias = 0;
  let startTable = table.getBoundingClientRect().left;

  const getResetParameters = () => {
    widthWindow = document.documentElement.clientWidth;
    tableWidth = table.offsetWidth;

    maxDist = tableWidth - widthWindow;
    startX = false;
    dist = 0;
    bias = 0;

    startTable = table.getBoundingClientRect().left;
  };

  table.addEventListener("touchstart", (evt) => {
    widthWindow = document.documentElement.clientWidth;
    tableWidth = table.offsetWidth;

    if (widthWindow > TABLET) return;

    if (!startX) {
      startX = evt.changedTouches[0].clientX;
    }
  });

  table.addEventListener("touchmove", (evt) => {
    widthWindow = document.documentElement.clientWidth;
    if (widthWindow > TABLET) return;

    dist = evt.changedTouches[0].clientX - startX;

    if (dist < 0) {
      maxDist = tableWidth + startTable - widthWindow;
      bias = Math.max(dist, -maxDist);
    } else {
      maxDist = -startTable;
      bias = Math.min(dist, maxDist);
    }

    table.style.left = startTable + bias + "px";
  });

  table.addEventListener("touchend", () => {
    widthWindow = document.documentElement.clientWidth;

    if (widthWindow > TABLET) return;

    getResetParameters();
  });

  window.addEventListener("resize", () => {
    getResetParameters();

    if (widthWindow > TABLET) return;

    table.style.left = "";
  });
})();

$(function () {
  // SLIDERS

  $(".team__members").owlCarousel({
    items: 2,
    loop: true,
    autoplay: true,
    smartSpeed: 700,
    autoplayHoverPause: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      768: {
        items: 4,
      },
      1100: {
        items: 2,
      },
    },
  });

  $(".testimonials__list").owlCarousel({
    items: 1,
    loop: true,
    margin: 100,
    autoplay: true,
    smartSpeed: 1000,
    dots: true,
  });

  $(".clients__list").owlCarousel({
    items: 6,
    loop: true,
    dots: true,
    margin: 20,
    responsive: {
      0: {
        items: 2,
      },
      480: {
        items: 4,
        margin: 10,
      },
      960: {
        items: 6,
      },
    },
  });

  $(".news__list").owlCarousel({
    items: 3,
    loop: true,
    margin: 30,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      720: {
        items: 2,
      },
      960: {
        items: 3,
      },
    },
  });

  // AOS

  $(".team__skills-list").waypoint(
    function () {
      $(".skill-item__progress-bar").each(function () {
        $(".skill-item__progress-value").each(function () {
          $(this).animate(
            {
              left: $(this).text(),
            },
            2000
          );
        });

        $(this).animate(
          {
            width: $(this).attr("aria-valuenow") + "%",
          },
          2000
        );
      });

      this.destroy();
    },
    {
      offset: "bottom-in-view",
    }
  );

  $(".stats").waypoint(
    function () {
      $(".stats__value").each(function () {
        var $this = $(this);

        $({ counter: 0 }).animate(
          { counter: $this.attr("data-value") },
          {
            duration: 5000,
            easing: "swing",
            step: function () {
              $this.text(Math.ceil(this.counter));
            },
          }
        );
      });

      this.destroy();
    },
    {
      offset: "bottom-in-view",
    }
  );

  // TABS

  $(".service-details__tabs").responsiveTabs({
    animation: "slide",
  });

  // Isotope

  let $projects = $(".projects__list").isotope({
    itemSelector: ".projects__item",
    layoutMode: "fitRows",
  });
  let $filterBtnGroup = $(".projects__filter-btn");

  $filterBtnGroup.on("click", function () {
    let filterValue = $(this).attr("data-filter");

    $filterBtnGroup
      .filter(".projects__filter-btn--checked")
      .removeClass("projects__filter-btn--checked");

    $(this).addClass("projects__filter-btn--checked");

    $projects.isotope({
      filter: filterValue,
    });
  });

  // Scroll

  let header = document.querySelector(".site-header");
  let menuToggle = document.querySelector(".main-nav__toggle");

  const TABLET = 768;
  let windowWidth = document.documentElement.clientWidth;

  let pageSections = document.querySelectorAll("[data-section]");
  let pageSectionsOffset = [];
  let currentSection = getActiveSection(pageSectionsOffset);

  function onMenuLinkClick(evt) {
    let menuLink = evt.target;

    if (menuLink.classList.contains("main-nav__link")) {
      menuToggle.classList.remove("main-nav__toggle--opened");
      header.removeEventListener("click", onMenuLinkClick);
    }
  }

  function getSectionsOffset(pageSections) {
    let result = [];

    for (let i = 0; i < pageSections.length; i++) {
      result.push({
        name: pageSections[i].dataset.section,
        position: pageSections[i].getBoundingClientRect().top - 25,
      });
    }

    return result;
  }

  function getActiveSection(pageSectionsOffset) {
    let section = {
      name: null,
      position: -Infinity,
    };

    for (let i = 0; i < pageSectionsOffset.length; i++) {
      if (
        pageSectionsOffset[i].position <= 0 &&
        pageSectionsOffset[i].position > section.position
      ) {
        section = pageSectionsOffset[i];
      }
    }

    return section;
  }

  function onScroll() {
    let scrollPosition = window.pageYOffset;

    if (windowWidth > TABLET) {
      if (
        scrollPosition > 0 &&
        !header.classList.contains("site-header--opened")
      ) {
        header.classList.add("site-header--opened");
      }

      if (scrollPosition === 0) {
        header.classList.remove("site-header--opened");
      }
    }
  }

  function onSectionScroll() {
    pageSectionsOffset = getSectionsOffset(pageSections);
    let activeSection = getActiveSection(pageSectionsOffset);

    if (windowWidth > TABLET) {
      if (activeSection.name && currentSection.name !== activeSection.name) {
        currentSection = activeSection;
        let oldActiveLink = document.querySelector(".main-nav__link--active");
        let newActiveLink = document.querySelector(
          "a[href='#" + currentSection.name + "']"
        );

        oldActiveLink.classList.remove("main-nav__link--active");
        newActiveLink.classList.add("main-nav__link--active");
      }
    }
  }

  function onResize() {
    windowWidth = document.documentElement.clientWidth;
  }

  onSectionScroll();

  window.addEventListener("scroll", onScroll);
  window.addEventListener("scroll", onSectionScroll);
  window.addEventListener("resize", onResize);

  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("main-nav__toggle--opened");

    if (menuToggle.classList.contains("main-nav__toggle--opened")) {
      header.addEventListener("click", onMenuLinkClick);
    }
  });
});

/*Menu*/
const toggleButton = document.querySelector(".toggle_button");
const toggleButtonIcon = document.querySelector(".toggle_button i");
const mobileMenu = document.querySelector("#mobile_dropdown_menu");

toggleButton.addEventListener("click", () => {
  console.log("fired");

  if (mobileMenu.classList.contains("show")) {
    // Hide the menu
    mobileMenu.classList.remove("show");
    mobileMenu.classList.add("hide");

    // wait for animation to finish before hide the menu
    setTimeout(() => {
      mobileMenu.classList.remove("hide");
      mobileMenu.style.display = "none";
    }, 500); // 500ms matches the animation duration

    toggleButtonIcon.classList.remove("fa-regular", "fa-circle-xmark");
    toggleButtonIcon.classList.add("fa-solid", "fa-bars");
  } else {
    // showing the hidden menu
    mobileMenu.style.display = "block";
    mobileMenu.classList.add("show");

    toggleButtonIcon.classList.remove("fa-solid", "fa-bars");
    toggleButtonIcon.classList.add("fa-regular", "fa-circle-xmark");
  }
});

(() => {
  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  //data

  const infoBoxes = [
    {
      title: "Cover",
      text: "Noise Cancelling cover make you isolate from the morden world.",
      image: "images/cover.svg",
    },
    {
      title: "Adjustable Plastic Tip",
      text: "Different sizes ensure a comfortable fit for everyone.",
      image: "images/eartip.svg",
    },
    {
      title: "Magic Circle",
      text: "the magical icon",
      image: "images/magiccircle.svg",
    },
    {
      title: "Invisible Fast Charger",
      text: "Charges seamlessly and quickly without compromising design.",
      image: "images/charger.svg",
    },
    {
      title: "Round Shape Earbud Shell",
      text: "Rounded design for ultimate comfort and stability during use.",
      image: "images/roundshape.svg",
    },
    {
      title: "High-Quality Speaker",
      text: "Delivers immersive audio experience with deep bass and clarity.",
      image: "images/speaker.svg",
    },
  ];

  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);

      let title = document.createElement("h2");
      title.textContent = infoBox.title;
      // create title variable = document.createElement("h2");
      // title variable.textContent = infoBox.title;

      let p = document.createElement("p");
      p.textContent = infoBox.text;
      //create a p variable = document.createElement("p");
      //p variable.textContent = infoBox.text;

      let img = document.createElement("img");
      img.src = infoBox.image;
      img.alt = infoBox.title;
      //selected.appendChild(title variable name);
      //selected.appendChild( p variable name);
      selected.appendChild(img);
      selected.appendChild(title);
      selected.appendChild(p);
    });
  }

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  function modelLoaded() {
    loadInfo();
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();

(() => {
  const canvas = document.querySelector("#explode-view");
  const context = canvas.getContext("2d");
  canvas.width = 1920;
  canvas.height = 1080;

  const frameCount = 1209; // how many still frames
  const images = [];

  //Fill the array with images and point to the images

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();

    // recreating the path images/explode_001.webp
    img.src = `images/explode_${(i + 1).toString().padStart(5, "0")}.png`;
    images.push(img);
  }
  console.log(images);

  const buds = {
    frame: 0,
  };

  gsap.to(buds, {
    frame: 1208,
    snap: "frame",
    scrollTrigger: {
      trigger: "#explode-view",
      pin: true,
      scrub: 3,
      markers: false,
      start: "top top",
      end: "500% end",
    },
    onUpdate: render,
  });

  //when images is first loaded onto the array, call the render
  images[0].addEventListener("loaded", render);
  function render() {
    //console.log(buds.frame);
    console.log(images[buds.frame]);
    //wipe the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[buds.frame], 0, 0);
  }
})();

(() => {
  const earbuds = document.querySelector("#ear-buds");
  const buttons = document.querySelectorAll("#color-con button");

  //Array.from(buttons) converts the HTMLCollection into an array to use forEach.

  function swapColor(e) {
    // method 1
    // console.log(this.id);
    // earbuds.src = `images/${this.id}.jpg`;
    // method 2
    // console.log(e.currentTarget.id);
    // earbuds.src = `images/${e.currentTarget.id}.jpg`;
    const selected = e.currentTarget.id;
    earbuds.src = `images/${selected}.png`;
  }
  buttons.forEach((button) => {
    button.addEventListener("click", swapColor);
  });
})();

(() => {
  const divisor = document.querySelector("#divisor");
  const slider = document.querySelector("#slider");

  function moveDivisor() {
    console.log(slider.value);
    //divisor.style.width = slider.value + "%";

    divisor.style.width = `${slider.value}%`;
  }
  slider.addEventListener("input", moveDivisor);
})();
(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  gsap.fromTo(
    "#header-con",
    {
      scale: 0.8,
      y: -50,
    },
    {
      scale: 1,
      y: 0,
      ease: "power3.out",
      duration: 2,
      scrollTrigger: {
        trigger: "#header-con",
        toggleActions: "restart none none none",
        markers: false,
        start: "top center",
        end: "bottom center",
      },
    }
  );

  const earbudInfos = document.querySelectorAll("#earbud-infos div");

  console.log(earbudInfos);
  earbudInfos.forEach((e, index) => {
    gsap.fromTo(
      e,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        duration: 1.5,
        scrollTrigger: {
          trigger: "#earbud-info-con",
          toggleActions: "restart none none none",
          markers: false,
          start: "top center",
          end: "bottom center",
        },
        delay: index * 0.3,
      }
    );
  });

  gsap.fromTo(
    "#color-info",
    {
      opacity: 0,
      x: -100,
      y: -50,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      ease: "power3.out",
      duration: 2,
      scrollTrigger: {
        trigger: "#colorselector-con",
        toggleActions: "restart none none none",
        markers: false,
        start: "top center",
        end: "bottom center",
      },
    }
  );
  gsap.fromTo(
    "#buds-con",
    {
      opacity: 0,
      x: 200,
    },
    {
      opacity: 1,
      x: 0,
      ease: "power3.out",
      duration: 2,
      scrollTrigger: {
        trigger: "#colorselector-con",
        toggleActions: "restart none none none",
        markers: false,
        start: "top center",
        end: "bottom center",
      },
    }
  );

  gsap.fromTo(
    "#eartip-buds-con",
    {
      opacity: 0,
      x: -200,
    },
    {
      opacity: 1,
      x: 0,
      ease: "power3.out",
      duration: 2,
      scrollTrigger: {
        trigger: "#eartip-con",
        toggleActions: "restart none none none",
        markers: false,
        start: "top center",
        end: "bottom center",
      },
    }
  );
  gsap.fromTo(
    "#eartip-info-con",
    {
      opacity: 0,
      x: 200,
    },
    {
      opacity: 1,
      x: 0,
      ease: "power3.out",
      duration: 2,
      scrollTrigger: {
        trigger: "#eartip-con",
        toggleActions: "restart none none none",
        markers: false,
        start: "top center",
        end: "bottom center",
      },
    }
  );
  gsap.fromTo(
    "#x-ray-con",
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      ease: "power3.out",
      duration: 2,
      scrollTrigger: {
        trigger: "#x-ray-con",
        toggleActions: "restart none none none",
        markers: false,
        start: "top center",
        end: "bottom center",
      },
    }
  );

  gsap.fromTo(
    "#model-con",
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      ease: "power3.out",
      duration: 2,
      scrollTrigger: {
        trigger: "#model-con",
        toggleActions: "restart none none none",
        markers: false,
        start: "top center",
        end: "bottom center",
      },
    }
  );

  const earbudmobileInfos = document.querySelectorAll(
    "#earbud-model-mobile div"
  );

  console.log(earbudmobileInfos);
  earbudmobileInfos.forEach((e, index) => {
    gsap.fromTo(
      e,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        duration: 1.5,
        scrollTrigger: {
          trigger: "#earbud-model-mobile-con",
          toggleActions: "restart none none none",
          markers: false,
          start: "top center",
          end: "bottom center",
        },
        delay: index * 0.3,
      }
    );
  });
  gsap.fromTo(
    "#earbud-model-mobile-img",
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      ease: "power3.out",
      duration: 1,
      scrollTrigger: {
        trigger: "#earbud-model-mobile-con",
        toggleActions: "restart none none none",
        markers: false,
        start: "top center",
        end: "bottom center",
      },
    }
  );
})();

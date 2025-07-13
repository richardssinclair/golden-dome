import Lenis from "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.36/dist/lenis.mjs";

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  // Lenis for smooth scrolling
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Gold Dome intro zoom
  const cards = gsap.utils.toArray(".card");
  const introCard = cards[0];

  const cardImageWrapper = introCard.querySelector(".card-img");
  const cardImg = introCard.querySelector(".card-img img");
  gsap.set(cardImageWrapper, {
    scale: 0.5,
    borderRadius: "600px 600px 50px 50px",
  });
  gsap.set(cardImg, { scale: 1.5 });
  // function animateContentIn(titleChars, description) {
  //   gsap.to(titleChars, { x: "0%", duration: 0.75, ease: "power4.out" });
  //   gsap.to(description, {
  //     x: 0,
  //     opacity: 1,
  //     duration: 0.75,
  //     delay: 0.1,
  //     ease: "power4.out",
  //   });
  // }

  ScrollTrigger.create({
    trigger: introCard,
    start: "top top",
    end: "+=300vh",
    onUpdate: (self) => {
      const progress = self.progress;
      const imgScale = 0.5 + progress * 0.5;
      const borderRadius = 400 - progress * 375;
      const innerImgScale = 1.5 - progress * 0.5;

      gsap.set(cardImageWrapper, {
        scale: imgScale,
        borderRadius: `${borderRadius}px ${borderRadius}px 50px 50px`,
      });
      gsap.set(cardImg, { scale: innerImgScale });
    },
  });

  // Make Donald golden
  gsap.set(".donald-img-2", { opacity: 0 });
  const donaldGold = gsap.timeline({
    scrollTrigger: {
      trigger: ".donald",
      start: "center 50%",
      end: "bottom 50%",
      scrub: true,
    },
  });

  donaldGold.to(".donald-img-2", { opacity: 1, duration: 1 });

  // Map colouring in functionality
  gsap.set("#map-2", { opacity: 0 });
  gsap.set("#map-3", { opacity: 0 });

  const mapTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".map",
      start: "top 70%",
      end: "bottom 80%",
      scrub: true,
    },
  });

  mapTimeline
    .to("#map-2", { opacity: 1, duration: 0.5 })
    .to("#map-3", { opacity: 1, duration: 1 });

  // Changing city names
  const cities = ["London", "Paris", "Tokyo", "New York", "Beijing", "Berlin"];
  const cityElement = document.querySelector(".city");
  let index = 0;

  setInterval(() => {
    index = (index + 1) % cities.length;
    cityElement.textContent = cities[index];
  }, 2000);

  // Changing year
  let yearObj = { val: 2025 };
  const yearDisplay = document.getElementById("year");

  gsap.to(yearObj, {
    val: 2030,
    duration: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".date-counter",
      start: "top 70%",
      end: "bottom 80%",
      scrub: true,
    },
    onUpdate: () => {
      yearDisplay.textContent = Math.floor(yearObj.val);
    },
  });

  // rocket flying from left to right
  gsap.to(".red-rocket-img", {
    x: "100vw",
    ease: "none",
    scrollTrigger: {
      trigger: ".rocket-info",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});

const categories = [
  {
    id: "sports-adventures",
    short: "SA",
    chip: "Adventures",
    title: "Adventure Sports",
    kicker: "Featured Category",
    image: "assets/sports.JPG",
    points: [
      { label: "Climb Kili", image: "assets/details/Climb Kili.jpg" },
      { label: "Climb Jabal Shams", image: "assets/details/Climb Jabal Shams.jpg" },
      { label: "Climb Everest Base Camp", image: "assets/details/Climb Everest Base Camp.jpg" },
      { label: "Skydiving license", image: "assets/details/Skydiving license.jpg" },
      { label: "Advanced open water diving", image: "assets/details/Advanced open water diving.JPG" },
      { label: "A2 free diving", image: "assets/details/A2 free diving.jpg" },
      { label: "Spartan race", image: "assets/details/Spartan race.JPG" }
    ]
  },
  {
    id: "gaming",
    short: "GG",
    chip: "Gaming",
    title: "Gaming",
    kicker: "Featured Category",
    image: "assets/gaming.jpg",
    points: [
      { label: "Host GG gaming show", image: "assets/details/Gaming/Host_GG_gaming_show.jpg" },
      { label: "Host gaming show AlAan TV Heroes", image: "assets/details/Gaming/Host gaming show AlAan TV Heroes.jpg" },
      { label: "Relaunching my gaming channel Beki Games", image: "assets/details/Gaming/Relaunching my gaming channel Beki Games.jpg" },
      { label: "Leading 2 seasons of Lenovo Legion Her Legion Clan tournaments", image: "assets/details/Gaming/Leading 2 seasons of Lenovo Legion Her Legion Clan tournaments.jpg" },
      { label: "Winning Lenovo Reach Your Impossible gaming award", image: "assets/details/Gaming/Winning_Lenovo_Reach_Your_Impossible_gaming_award.jpg" },
      { label: "Getting Twitch Partner and hitting 10k followers during Ramadan", image: "assets/details/Gaming/Getting Twitch Partner and hitting 10k followers during Ramadan.jpg" },
      { label: "Media coverage DXB Sports Festival", image: "assets/details/Gaming/Media_coverage_DXB_Sports_Festival.jpg" }
    ]
  },
  {
    id: "media-coverages",
    short: "MC",
    chip: "Media",
    title: "Media Coverage",
    kicker: "Featured Category",
    image: "assets/media-coverage.JPG",
    points: [
      { label: "Interview with Ariana at the Paris premiere of Wicked", image: "assets/details/Interview with Ariana at the Paris premiere of Wicked.jpg" },
      { label: "With Dune 2 cast", image: "assets/details/With Dune 2 cast.JPG" },
      { label: "With Sheikha Bodour Al Qasimi at her book launch", image: "assets/details/With Sheikha Bodour Al Qasimi at her book launch.JPG" },
      { label: "Panel at the World Governments Summit", image: "assets/details/Panel at the World Governments Summit.JPEG" },
      { label: "Moderator at 1 Billion Summit 2024", image: "assets/details/Moderator_at_1_Billion_Summit_2024.jpg" },
      { label: "Speaker at 1 Billion Summit Meta 2026", image: "assets/details/Speaker at 1 Billion Summit Meta 2026.JPEG" },
      { label: "Roundtable with YouTube, TikTok, Meta, and Twitch CEOs", image: "assets/details/Roundtable_with_YouTube,_TikTok,_Meta,_and_Twitch_CEOs.jpg" },
      { label: "Watchalong co-hosting live", image: null },
      { label: "Dose of Emirates co-hosting", image: null }
    ]
  },
  {
    id: "traveling",
    short: "TR",
    chip: "Travel",
    title: "Traveling",
    kicker: "Featured Category",
    image: "assets/travel.JPG",
    points: [
      { label: "Tourism entities: Turkey", image: "assets/details/Tourism_entities_Turkey.jpg" },
      { label: "Dubai Best Winter", image: "assets/details/Dubai_Best_Winter.jpg" },
      { label: "Abu Dhabi Tourism", image: null },
      { label: "Moscow Tourism", image: "assets/details/Moscow_Tourism.jpg" },
      { label: "Sweden Tourism", image: "assets/details/Sweden Tourism.JPEG" },
      { label: "Saudi Tourism", image: "assets/details/Saudi_Tourism.jpg" },
      { label: "Visit Hungary", image: null },
      { label: "Salalah Explore", image: "assets/details/Salalah_Explore.jpg" },
      { label: "Hong Kong Tourism", image: "assets/details/Hong Kong Tourism.JPG" },
      { label: "Uzbek Tourism", image: "assets/details/Uzbek_Tourism.jpg" },
      { label: "Macao", image: null }
    ]
  },
  {
    id: "awards-nominations",
    short: "AW",
    chip: "Awards",
    title: "Awards & Nominations",
    kicker: "Featured Category",
    image: "assets/awards-nominations.jpg",
    points: [
      { label: "People's Choice Award: Middle Eastern Social Media Star 2022", image: "assets/details/Awards and Nominations/People's Choice Award Middle Eastern Social Media Star 2022.JPG" },
      { label: "Best rising content creator 2023", image: "assets/details/Awards and Nominations/Best rising content creator 2023.JPEG" },
      { label: "Winning Lenovo Reach Your Impossible gaming award 2024 & 2025", image: "assets/details/Awards and Nominations/Winning Lenovo Reach Your Impossible gaming award 2024 & 2025.jpg" },
      { label: "The Nomad Award 2025", image: "assets/details/Awards and Nominations/The Nomad Award 2025.jpg" }
    ]
  }
];

const frame = document.querySelector(".story-frame");
const storyNav = document.getElementById("storyNav");
const storyChip = document.getElementById("storyChip");
const selectedPointTitle = document.getElementById("selectedPointTitle");
const selectedPointCaption = document.getElementById("selectedPointCaption");
const scrollThumb = document.getElementById("scrollThumb");
const [activeLayer, incomingLayer] = document.querySelectorAll("[data-layer]");

let activeIndex = 0;
let activePointIndex = 0;
let showingIncoming = false;
let wheelLocked = false;
const preloadedImages = new Set();
let idlePreloadStarted = false;
let touchStartY = null;
let touchCurrentY = null;
const swipeThreshold = 42;

function getActiveCategory() {
  return categories[activeIndex];
}

function getActivePoint() {
  return getActiveCategory().points[activePointIndex];
}

function getCurrentImage() {
  const point = getActivePoint();
  return point?.image || getActiveCategory().image;
}

function renderNav() {
  storyNav.innerHTML = "";

  categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "story-dot";
    button.setAttribute("aria-label", category.title);
    button.style.setProperty("--dot-image", `url("${category.image}")`);

    if (index === activeIndex) {
      button.classList.add("is-active");
      button.setAttribute("aria-current", "true");
    }

    button.addEventListener("click", () => setCategory(index));
    storyNav.appendChild(button);
  });
}

function preloadImage(path) {
  if (!path || preloadedImages.has(path)) {
    return;
  }

  const image = new Image();
  image.decoding = "async";
  image.src = path;
  preloadedImages.add(path);
}

function preloadCategoryImages(category) {
  preloadImage(category.image);
  category.points.forEach((point) => {
    if (point.image) {
      preloadImage(point.image);
    }
  });
}

function preloadPrimaryImages() {
  categories.forEach((category) => {
    preloadImage(category.image);
    preloadImage(category.points[0]?.image);
  });
}

function scheduleFullPreload() {
  if (idlePreloadStarted) {
    return;
  }

  idlePreloadStarted = true;
  const preloadAll = () => {
    categories.forEach((category) => preloadCategoryImages(category));
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(preloadAll, { timeout: 1500 });
    return;
  }

  window.setTimeout(preloadAll, 400);
}

function getPointCaption(point, category) {
  if (point.caption) {
    return point.caption;
  }

  return `Lorem ipsum dolor sit amet for ${point.label.toLowerCase()} in ${category.title.toLowerCase()}.`;
}

function updateBackground(imagePath) {
  const nextLayer = showingIncoming ? activeLayer : incomingLayer;
  const currentLayer = showingIncoming ? incomingLayer : activeLayer;

  nextLayer.style.backgroundImage =
    `linear-gradient(180deg, rgba(6, 10, 16, 0.08), rgba(6, 10, 16, 0.16) 28%, rgba(6, 10, 16, 0.32) 62%, rgba(6, 10, 16, 0.56) 100%), url("${imagePath}")`;
  nextLayer.classList.add("is-active");
  currentLayer.classList.remove("is-active");
  showingIncoming = !showingIncoming;
}

function updateContent() {
  const category = getActiveCategory();
  const activePoint = getActivePoint();

  frame.classList.remove("is-transitioning");
  void frame.offsetWidth;
  frame.classList.add("is-transitioning");

  storyChip.textContent = category.chip;
  selectedPointTitle.textContent = activePoint.label;
  selectedPointCaption.textContent = getPointCaption(activePoint, category);

  window.clearTimeout(updateContent.timeoutId);
  updateContent.timeoutId = window.setTimeout(() => {
    frame.classList.remove("is-transitioning");
  }, 520);
}

function updateScrollThumb() {
  const steps = getActiveCategory().points.length - 1;
  const maxTravel = 100;
  const offset = steps > 0 ? (activePointIndex / steps) * maxTravel : 0;
  scrollThumb.style.transform = `translateY(${offset}px)`;
}

function applyState(categoryChanged) {
  updateBackground(getCurrentImage());
  updateContent();

  if (categoryChanged) {
    renderNav();
  }

  updateScrollThumb();
}

function setCategory(index) {
  activeIndex = (index + categories.length) % categories.length;
  activePointIndex = 0;
  preloadImage(getActiveCategory().points[0]?.image);
  applyState(true);
}

function movePoint(direction) {
  const points = getActiveCategory().points;
  const nextIndex = activePointIndex + direction;

  if (nextIndex < 0 || nextIndex >= points.length || wheelLocked) {
    return;
  }

  wheelLocked = true;
  frame.classList.add("is-wheel-locked");
  activePointIndex = nextIndex;
  const point = points[activePointIndex];

  if (point?.image) {
    preloadImage(point.image);
  }

  applyState(false);

  window.setTimeout(() => {
    wheelLocked = false;
    frame.classList.remove("is-wheel-locked");
  }, 460);
}

frame.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();

    if (Math.abs(event.deltaY) < 12) {
      return;
    }

    movePoint(event.deltaY > 0 ? 1 : -1);
  },
  { passive: false }
);

frame.addEventListener(
  "touchstart",
  (event) => {
    if (event.touches.length !== 1) {
      touchStartY = null;
      touchCurrentY = null;
      return;
    }

    touchStartY = event.touches[0].clientY;
    touchCurrentY = touchStartY;
  },
  { passive: true }
);

frame.addEventListener(
  "touchmove",
  (event) => {
    if (touchStartY === null || event.touches.length !== 1) {
      return;
    }

    touchCurrentY = event.touches[0].clientY;
    const deltaY = touchCurrentY - touchStartY;

    if (Math.abs(deltaY) > 10) {
      event.preventDefault();
    }
  },
  { passive: false }
);

frame.addEventListener(
  "touchend",
  () => {
    if (touchStartY === null || touchCurrentY === null) {
      touchStartY = null;
      touchCurrentY = null;
      return;
    }

    const deltaY = touchCurrentY - touchStartY;

    if (Math.abs(deltaY) >= swipeThreshold) {
      movePoint(deltaY < 0 ? 1 : -1);
    }

    touchStartY = null;
    touchCurrentY = null;
  },
  { passive: true }
);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    movePoint(-1);
  }

  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    movePoint(1);
  }
});

preloadPrimaryImages();
scheduleFullPreload();
setCategory(0);

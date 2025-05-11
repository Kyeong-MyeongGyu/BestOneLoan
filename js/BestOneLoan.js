const images = [
    './img/Apt1.jpg',
    './img/Apt2.jpg',
    './img/Ville1.jpg',
    './img/Apt3.jpg',
    './img/Apt4.jpg',
    './img/Ville2.jpg'
];

let current = 0;
let showing = 1;
let isTransitioning = false;

const slider1 = document.querySelector('.slider1');
const slider2 = document.querySelector('.slider2');
const gradient = document.querySelector('.gradient-bg');

function preloadAndShowImage(sliderToShow, sliderToHide, src, callback) {
const img = new Image();
img.src = src;

img.onload = () => {
    sliderToShow.style.backgroundImage = `url('${src}')`;
    sliderToShow.style.opacity = '1';
    sliderToHide.style.opacity = '0';

    if (gradient.style.opacity !== '0') {
    gradient.style.opacity = '0';
    }

    if (typeof callback === 'function') callback();
};
}

function startSlideShow() {
setInterval(() => {
    if (isTransitioning) return;
    isTransitioning = true;

    const next = (current + 1) % images.length;

    if (showing === 1) {
    preloadAndShowImage(slider2, slider1, images[next], () => {
        showing = 2;
        current = next;
        isTransitioning = false;
    });
    } else {
    preloadAndShowImage(slider1, slider2, images[next], () => {
        showing = 1;
        current = next;
        isTransitioning = false;
    });
    }
}, 5000);
}

preloadAndShowImage(slider1, slider2, images[current], () => {
    current = 0;
    startSlideShow();
});

const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.querySelector(".close");

openBtn.onclick = () => {
  modal.classList.add("show");
};

closeBtn.onclick = () => {
  modal.classList.remove("show");
};

window.onclick = (e) => {
  if (e.target == modal) {
    modal.classList.remove("show");
  }
};

// 이미지 로딩 완료 시 placeholder 제거
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".img-wrapper img");

  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.style.opacity = "1";
      const placeholder = img.previousElementSibling;
      if (placeholder) placeholder.style.display = "none";
    });
  });
});
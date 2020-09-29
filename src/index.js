import ElemArr from "./js/gallery-markup.js";

const galleryList = document.querySelector(".js-gallery");
galleryList.append(...ElemArr);
//variables
const lightboxImg = document.querySelector(".lightbox__image");
const lightboxWrap = document.querySelector(".js-lightbox");
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const backdrop = document.querySelector(".lightbox__content");

//open modal
galleryList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "UL") return;
  const currentLink = e.target.closest("a");
  lightboxImg.src = currentLink.href;
  lightboxImg.dataset.num = currentLink.dataset.num;
  lightboxImg.alt = currentLink.title;
  lightboxWrap.classList.add("is-open");
  window.addEventListener("keydown", onEscPress);
  window.addEventListener("keydown", onArrowsPress);
});

//close modal
closeModalBtn.addEventListener("click", onCloseModal);
backdrop.addEventListener("click", onBackdropClick);

// close modal function
function onCloseModal() {
  lightboxWrap.classList.remove("is-open");
  lightboxWrap.addEventListener(
    "transitionend",
    () => {
      lightboxImg.src = "#";
      lightboxImg.dataset.num = "-1";
      lightboxImg.alt = "#";
    },
    { once: true }
  );
  window.removeEventListener("keydown", onEscPress);
  window.removeEventListener("keydown", onArrowsPress);
}
//close modal by click to backdrop
function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}
// close modal by Escape
function onEscPress(e) {
  if (e.code === "Escape") {
    onCloseModal();
  }
}
//Arrow Press function
function onArrowsPress(e) {
  if (e.code !== "ArrowRight" && e.code !== "ArrowLeft") return;
  const lightboxImgNum = Number(lightboxImg.dataset.num);

  let index; //element index in ElemArr
  switch (e.code) {
    case "ArrowRight":
      index = lightboxImgNum + 1 > ElemArr.length - 1 ? 0 : lightboxImgNum + 1;
      break;
    case "ArrowLeft":
      index = lightboxImgNum - 1 < 0 ? ElemArr.length - 1 : lightboxImgNum - 1;
      break;
  }
  const linkElem = ElemArr[index].children[0];

  lightboxImg.src = linkElem.href;
  lightboxImg.dataset.num = linkElem.dataset.num;
  lightboxImg.alt = linkElem.title;
}

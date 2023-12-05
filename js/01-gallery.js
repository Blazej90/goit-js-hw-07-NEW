import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector("ul.gallery");
let lightboxInstance;

galleryContainer.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") return;
  const imageSrc = event.target.dataset.source;
  lightboxInstance = basicLightbox.create(
    `<img src="${imageSrc}" width="800" height="600">`
  );
  lightboxInstance.show();
  addKeyboardListener();
});

const addKeyboardListener = () => {
  document.addEventListener("keydown", handleKeyPress);
};

const removeKeyboardListener = () => {
  document.removeEventListener("keydown", handleKeyPress);
};

const handleKeyPress = (event) => {
  if (event.key === "Escape" && lightboxInstance) {
    lightboxInstance.close();
    removeKeyboardListener();
  }
};

const images = galleryItems.map((item) => {
  return `<li class="gallery__item">
      <a class="gallery__link" href="${item.original}">
          <img
              class="gallery__image"
              src="${item.preview}"
              data-source="${item.original}"
              alt="${item.description}"
          />
      </a>
  </li>`;
});

galleryContainer.insertAdjacentHTML("beforeend", images.join(""));

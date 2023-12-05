import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector("ul.gallery");
let lightbox;

galleryContainer.addEventListener("click", (event) => {
  event.preventDefault();

  const clickedElement = event.target;
  if (clickedElement.nodeName !== "IMG") return;

  const imageSrc = clickedElement.dataset.source;

  if (!lightbox) {
    lightbox = new SimpleLightbox(".gallery__item-link", {
      captionsData: "alt",
      captionDelay: 250,
    });
  }

  const overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);

  lightbox.open({
    items: galleryItems.map((item) => ({
      src: item.original,
      title: item.description,
    })),
    onClose: () => {
      overlay.remove();
      removeKeyboardListener();
    },
  });

  addKeyboardListener();
});

const addKeyboardListener = () => {
  document.addEventListener("keydown", handleKeyPress);
};

const removeKeyboardListener = () => {
  document.removeEventListener("keydown", handleKeyPress);
};

const handleKeyPress = (event) => {
  if (event.key === "Escape" && lightbox) {
    lightbox.close();
    removeKeyboardListener();
  }
};

const images = galleryItems.map((item) => {
  return `<li class="gallery__item">
      <a class="gallery__item-link" href="${item.original}">
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

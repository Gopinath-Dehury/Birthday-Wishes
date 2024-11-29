const container = document.getElementById("photo-container");
const photos = document.querySelectorAll(".photo");

// Initialize photos in the center, stacked randomly
function initializePhotos() {
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  photos.forEach(photo => {
    photo.style.left = `${containerWidth / 2}px`;
    photo.style.top = `${containerHeight / 2}px`;
    photo.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 10}deg)`;
  });
}

// Drag functionality
photos.forEach(photo => {
  let isDragging = false;
  let offsetX, offsetY;

  photo.addEventListener("mousedown", e => {
    isDragging = true;
    photo.style.zIndex = 1000;
    offsetX = e.clientX - photo.offsetLeft;
    offsetY = e.clientY - photo.offsetTop;
  });

  document.addEventListener("mousemove", e => {
    if (isDragging) {
      photo.style.left = `${e.clientX - offsetX}px`;
      photo.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      photo.style.zIndex = "";
    }
  });
});

// Initialize on page load
window.onload = initializePhotos;

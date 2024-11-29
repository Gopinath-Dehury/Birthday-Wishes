const container = document.getElementById("photo-container");
const photos = document.querySelectorAll(".photo");
const resetButton = document.getElementById("reset-button");
const audioElement = document.getElementById("birthday-audio");

// Check if the device is mobile or tablet
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

if (!isMobile) {
  // Initialize photos in the center with random rotations
  function initializePhotos() {
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    photos.forEach(photo => {
      // Center and apply random rotation
      photo.style.left = `${containerWidth / 2}px`;
      photo.style.top = `${containerHeight / 2}px`;
      const randomRotation = Math.random() * 20 - 10; // Random angle between -10° and 10°
      photo.dataset.rotation = randomRotation; // Store initial rotation
      photo.style.transform = `translate(-50%, -50%) rotate(${randomRotation}deg)`;
    });
  }

  // Drag and rotate functionality
  photos.forEach(photo => {
    let isDragging = false;
    let offsetX, offsetY, startX, startY, initialRotation;

    photo.addEventListener("mousedown", e => {
      isDragging = true;
      photo.style.zIndex = 1000;

      // Store initial mouse and element positions
      startX = e.clientX;
      startY = e.clientY;
      offsetX = e.clientX - photo.offsetLeft;
      offsetY = e.clientY - photo.offsetTop;
      initialRotation = parseFloat(photo.dataset.rotation) || 0; // Get stored rotation
    });

    document.addEventListener("mousemove", e => {
      if (isDragging) {
        // Move photo
        photo.style.left = `${e.clientX - offsetX}px`;
        photo.style.top = `${e.clientY - offsetY}px`;

        // Calculate and apply rotation based on mouse movement
        const rotationDelta = (e.clientX - startX) / 5; // Rotation sensitivity
        const newRotation = initialRotation + rotationDelta;
        photo.style.transform = `translate(-50%, -50%) rotate(${newRotation}deg)`;

        // Store the new rotation
        photo.dataset.rotation = newRotation;

        // Hide images near the text area when swiped
        const photoLeft = e.clientX - offsetX;
        if (photoLeft < 100) { // Move too far to the left
          photo.style.visibility = 'hidden';
        } else {
          photo.style.visibility = 'visible';
        }
      }
    });

    document.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        photo.style.zIndex = "";
      }
    });
  });

  // Reset functionality
  resetButton.addEventListener("click", initializePhotos);

  // Initialize on page load
  window.onload = initializePhotos;
} else {
  // On mobile or tablet, do not allow dragging and autoplay audio manually
  resetButton.style.display = 'none'; // Optionally hide reset button on mobile
  audioElement.play(); // Autoplay sound for mobile devices (if allowed)
}

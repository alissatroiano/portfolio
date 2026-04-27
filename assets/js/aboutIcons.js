document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".about-icons img");
  let currentIndex = 0;
  const totalImages = images.length;
  const intervalTime = 5000;

  function changeImage() {
    // Hide current image
    images[currentIndex].style.opacity = 0;

    // Increment index
    currentIndex = (currentIndex + 1) % totalImages;

    // Show next image
    images[currentIndex].style.opacity = 1;
  }

  // Initial setup: Hide all, then show the first one
  images.forEach((img, index) => {
    img.style.opacity = index === 0 ? 1 : 0;
    img.style.transition = "opacity 3s ease-in-out"; // Controls fade speed
  });

  setInterval(changeImage, intervalTime);
});

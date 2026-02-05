document.addEventListener("DOMContentLoaded", function() {
    const bookButton = document.getElementById("bookButton");
    if (bookButton) {
        bookButton.addEventListener("click", function() {
            alert("Booking functionality coming soon!");
        });
    }
});

const images = ['babylon.jpg', '2.jpg', 'TGB_surat.jpg','Club_07.jpg'];
let current = 0;
const slideshow = document.getElementById('slideshowJS');

function changeImage() {
  slideshow.style.backgroundImage = `url(${images[current]})`;
  current = (current + 1) % images.length;
}

changeImage(); // Show first image
setInterval(changeImage, 4000); // Change every 4s
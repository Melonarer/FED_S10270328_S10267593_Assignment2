// Keep track of the previous scroll position to determine scroll direction
let lastScrollY = 0;

// Select the top bar element that will be hidden or shown based on scroll direction
const topBar = document.querySelector('.top-bar');

// Event listener for scroll event
window.addEventListener('scroll', () => {
  // Get the current scroll position (how far the page has scrolled)
  const currentScrollY = window.scrollY;

  // If the user scrolls down (current scroll position is greater than previous scroll position)
  if (currentScrollY > lastScrollY) {
    // Hide the top bar by adding the 'hidden' class
    topBar.classList.add('hidden');
  } else {
    // If the user scrolls up, show the top bar by removing the 'hidden' class
    topBar.classList.remove('hidden');
  }

  // Update the last scroll position for the next scroll event
  lastScrollY = currentScrollY;
});

// Variables for handling touch scroll behavior on mobile
let touchStartY = 0;

// Event listener for the start of a touch event (when the user touches the screen)
window.addEventListener('touchstart', (event) => {
  // Save the initial touch position (Y-coordinate) when the touch starts
  touchStartY = event.touches[0].clientY;
});

// Event listener for the movement of touch (user dragging finger on screen)
window.addEventListener('touchmove', (event) => {
  // Get the current touch position (Y-coordinate)
  const touchCurrentY = event.touches[0].clientY;
  
  // If the user moves their finger upwards (scroll up)
  if (touchCurrentY < touchStartY) {
    // Show the top bar by removing the 'hidden' class
    topBar.classList.remove('hidden');
  } else {
    // If the user moves their finger downwards (scroll down), hide the top bar
    topBar.classList.add('hidden');
  }

  // Update the touch position for the next movement
  touchStartY = touchCurrentY;
});
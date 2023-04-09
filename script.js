// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Select the hamburger menu element
  const hamburgerMenu = document.querySelector('.hamburger-menu');

  // Create the mobile menu element
  const mobileMenu = document.createElement('ul');
  mobileMenu.classList.add('mobile-menu');

  // Clone desktop menu items to the mobile menu
  const menuItems = document.querySelectorAll('.menu li');
  menuItems.forEach((item) => {
      const mobileItem = document.createElement('li');
      mobileItem.appendChild(item.querySelector('a').cloneNode(true));
      mobileMenu.appendChild(mobileItem);
  });

  // Add the mobile menu to the navigation
  document.querySelector('nav').appendChild(mobileMenu);

  // Toggle the mobile menu visibility when the hamburger menu is clicked
  hamburgerMenu.addEventListener('click', function () {
      mobileMenu.classList.toggle('show');
  });
});

// New code to handle smooth scrolling
const navLinks = document.querySelectorAll(".menu a, .mobile-menu a");
navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
        mobileMenu.classList.remove("show");
    });
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
  
    if (window.scrollY > 50) { // Adjust this value based on your preference
      header.classList.add('transparent');
    } else {
      header.classList.remove('transparent');
    }
  });

  window.addEventListener('scroll', function () {
    const aboutSection = document.querySelector('#about');
    const image = document.querySelector('.about-image img');
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    
    let distanceFromTop = windowHeight - rect.top;
    let distanceFromBottom = rect.bottom;
    let minDistance = Math.min(distanceFromTop, distanceFromBottom);
  
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      const scaleFactor = 0.8 + 0.2 * (minDistance / windowHeight);
      image.style.transform = `scale(${scaleFactor})`;
    } else {
      image.style.transform = 'scale(0.8)';
    }
  });
  
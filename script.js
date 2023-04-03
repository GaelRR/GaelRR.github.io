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

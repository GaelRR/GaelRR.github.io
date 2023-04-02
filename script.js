document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileMenu = document.createElement('ul');
    mobileMenu.classList.add('mobile-menu');
  
    const menuItems = document.querySelectorAll('.menu li');
    menuItems.forEach((item) => {
      const mobileItem = document.createElement('li');
      mobileItem.appendChild(item.querySelector('a').cloneNode(true));
      mobileMenu.appendChild(mobileItem);
    });
  
    document.querySelector('nav').appendChild(mobileMenu);
  
    hamburgerMenu.addEventListener('click', function () {
      mobileMenu.classList.toggle('show');
    });
  });
  
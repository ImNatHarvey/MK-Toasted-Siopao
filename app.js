// Select elements
const menu = document.querySelector('#mobile-menu'); // Mobile menu toggle button
const menuLinks = document.querySelector('.navbar__menu'); // Navbar menu links

// Toggle menu on click
menu.addEventListener('click', () => {
  menu.classList.toggle('is-active'); // Toggle active class for hamburger icon
  menuLinks.classList.toggle('active'); // Toggle active class for menu links
});

// Reveal animation
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");

      // Extra: stagger items inside features section
      if (entry.target.classList.contains("features")) {
        const items = entry.target.querySelectorAll(".feature__item");
        items.forEach((item, i) => {
          setTimeout(() => {
            item.classList.add("reveal-item");
          }, i * 200); // delay each card by 200ms
        });
      }

    } else {
      // Reset when out of view
      entry.target.classList.remove("active");

      if (entry.target.classList.contains("features")) {
        const items = entry.target.querySelectorAll(".feature__item");
        items.forEach((item) => {
          item.classList.remove("reveal-item");
        });
      }
    }
  });
}, { threshold: 0.2 });

// Subcategory filter
const categoryButtons = document.querySelectorAll(".menu-categories button");
const menuItems = document.querySelectorAll(".menu-item");

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    menuItems.forEach(item => {
      if (category === "all" || item.getAttribute("data-category").includes(category)) {
        item.style.display = "block"; // Show
      } else {
        item.style.display = "none"; // Hide
      }
    });

    // Highlight active category button
    categoryButtons.forEach(btn => btn.classList.remove("active-category"));
    button.classList.add("active-category");
  });
})

reveals.forEach((reveal) => observer.observe(reveal));


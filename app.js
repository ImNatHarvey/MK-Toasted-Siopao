document.addEventListener('DOMContentLoaded', () => {

    // Initialize particles.js inside navbar
  particlesJS("particles-js", {
    "particles": {
      "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": "#000000" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5 },
      "size": { "value": 3, "random": true },
      "line_linked": { 
        "enable": true, 
        "distance": 150, 
        "color": "#000000", 
        "opacity": 0.3, 
        "width": 1 
      },
      "move": { "enable": true, "speed": 2 }
    },
    "interactivity": {
      "events": { 
        "onhover": { "enable": true, "mode": "grab" }, 
        "onclick": { "enable": true, "mode": "push" } 
      },
      "modes": { 
        "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } }, 
        "push": { "particles_nb": 4 } 
      }
    },
    "retina_detect": true
  });

  // Body background particles
  particlesJS("particles-bg", {
    "particles": {
      "number": { "value": 80, "density": { "enable": true, "value_area": 1000 } },
      "color": { "value": "#000000" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.3 },
      "size": { "value": 3, "random": true },
      "line_linked": { "enable": true, "distance": 120, "color": "#000000", "opacity": 0.3, "width": 1 },
      "move": { "enable": true, "speed": 1.5 }
    },
    "interactivity": {
      "events": { "onhover": { "enable": false }, "onclick": { "enable": false } }
    },
    "retina_detect": true
  });

  // ---------- Mobile Navbar ----------
  const menu = document.querySelector('#mobile-menu'); 
  const menuLinks = document.querySelector('.navbar__menu'); 

  if (menu && menuLinks) {
    menu.addEventListener('click', () => {
      menu.classList.toggle('is-active'); 
      menuLinks.classList.toggle('active'); 
    });
  }

 // ---------- Reveal Animations ----------
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active", "revealed"); 
      observer.unobserve(entry.target);

      // Stagger feature items
      if (entry.target.classList.contains("features")) {
        const items = entry.target.querySelectorAll(".feature__item");
        if(items.length){
          items.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add("reveal-item");
            }, i * 200);
          });
        }
      }
    }
  });
}, { threshold: 0.2 });

reveals.forEach((reveal) => observer.observe(reveal));


  reveals.forEach((reveal) => observer.observe(reveal));

  // ---------- Menu Page Only ----------
  const categoryButtons = document.querySelectorAll(".menu-categories button");
  const menuItems = document.querySelectorAll(".menu-item");

  if (categoryButtons.length && menuItems.length) {

    // Filter by category
    categoryButtons.forEach(button => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");

        menuItems.forEach(item => {
          if (category === "all" || item.getAttribute("data-category").includes(category)) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });

        // Highlight active button
        categoryButtons.forEach(btn => btn.classList.remove("active-category"));
        button.classList.add("active-category");
      });
    });

    // Search functionality
    const toggleSearch = () => {
      const searchForm = document.querySelector('.search-form');
      const searchButton = document.querySelector('.search-button');
      const searchInput = document.querySelector('.search-input');

      if (!searchForm || !searchButton || !searchInput) return;

      searchButton.addEventListener('click', () => {
        searchForm.classList.toggle('active-search');
        if (searchForm.classList.contains('active-search')) {
          searchInput.focus();
        } else {
          searchInput.value = '';
          filterMenuItems('');
        }
      });

      searchInput.addEventListener('input', () => {
        filterMenuItems(searchInput.value.toLowerCase());
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') e.preventDefault();
      });
    };

    const filterMenuItems = (searchValue) => {
      const activeCategoryBtn = document.querySelector('.menu-categories button.active-category');
      const category = activeCategoryBtn.getAttribute('data-category');
      
      menuItems.forEach(item => {
        const matchesCategory = category === 'all' || item.getAttribute('data-category').toLowerCase().includes(category.toLowerCase());
        const matchesSearch = item.querySelector('h3').textContent.toLowerCase().includes(searchValue);

        if (matchesCategory && matchesSearch) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    };

    toggleSearch();
  }

});

document.addEventListener('DOMContentLoaded', () => {

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

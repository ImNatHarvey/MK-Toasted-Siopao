document.addEventListener('DOMContentLoaded', () => {
  // Initialize dashboard data
  initializeDashboard();
  
  // Set up report form submission
  const reportForm = document.getElementById('report-form');
  if (reportForm) {
    reportForm.addEventListener('submit', handleReportGeneration);
  }
});

// Initialize dashboard with sample data
function initializeDashboard() {
  // In a real application, you would fetch this data from an API
  const dashboardData = {
    dailyOrders: 42,
    dailyRevenue: 5250,
    dailySales: 78
  };
  
  // Update the summary cards
  document.getElementById('daily-orders').textContent = dashboardData.dailyOrders;
  document.getElementById('daily-revenue').textContent = `₱${dashboardData.dailyRevenue.toLocaleString()}`;
  document.getElementById('daily-sales').textContent = dashboardData.dailySales;
}

// Handle report generation form submission
function handleReportGeneration(e) {
  e.preventDefault();
  
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  
  if (!startDate || !endDate) {
    alert('Please select both start and end dates.');
    return;
  }
  
  // In a real application, you would fetch this data from an API
  // For demonstration, we'll use mock data
  generateIngredientReport(startDate, endDate);
}

// Generate ingredient usage report
function generateIngredientReport(startDate, endDate) {
  // Mock data - in a real application, this would come from your backend
  const mockReportData = [
    { ingredient: 'Flour', quantity: '25kg', cost: '₱1,250' },
    { ingredient: 'Pork', quantity: '15kg', cost: '₱3,750' },
    { ingredient: 'Chicken', quantity: '12kg', cost: '₱1,800' },
    { ingredient: 'Yeast', quantity: '2kg', cost: '₵400' },
    { ingredient: 'Sugar', quantity: '8kg', cost: '₱320' },
    { ingredient: 'Soy Sauce', quantity: '5L', cost: '₱375' }
  ];
  
  const resultsContainer = document.getElementById('report-results');
  
  // Create report table
  let reportHTML = `
    <h3>Ingredient Usage Report (${formatDate(startDate)} to ${formatDate(endDate)})</h3>
    <table class="report-table">
      <thead>
        <tr>
          <th>Ingredient</th>
          <th>Quantity Used</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  mockReportData.forEach(item => {
    reportHTML += `
      <tr>
        <td>${item.ingredient}</td>
        <td>${item.quantity}</td>
        <td>${item.cost}</td>
      </tr>
    `;
  });
  
  reportHTML += `
      </tbody>
    </table>
    <button class="button" onclick="exportReport()" style="margin-top: 20px;">Export Report</button>
  `;
  
  resultsContainer.innerHTML = reportHTML;
  resultsContainer.classList.add('active');
}

// Format date for display
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Export report function (mock implementation)
function exportReport() {
  alert('Report exported successfully! In a real application, this would download a CSV or PDF file.');
}

// Additional styling for the report table
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .report-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    
    .report-table th, .report-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    .report-table th {
      background-color: var(--accent);
      color: white;
    }
    
    .report-table tr:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
  `;
  document.head.appendChild(style);
});

// management.js - Shared functionality for all management pages

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all management pages
  initializeManagementPages();
  
  // Set up search functionality
  setupSearch();
  
  // Set up filters
  setupFilters();
  
  // Set up pagination
  setupPagination();
});

// Initialize management pages
function initializeManagementPages() {
  console.log('Management pages initialized');
  
  // Add active class to current page in navigation
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.navbar__links');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// Set up search functionality
function setupSearch() {
  const searchForms = document.querySelectorAll('.search-form');
  
  searchForms.forEach(form => {
    const input = form.querySelector('.search-input');
    const button = form.querySelector('.search-button');
    
    if (button && input) {
      button.addEventListener('click', () => {
        performSearch(input.value);
      });
      
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          performSearch(input.value);
        }
      });
    }
  });
}

// Perform search
function performSearch(query) {
  console.log(`Searching for: ${query}`);
  // In a real application, this would filter the table or make an API call
  alert(`Search functionality would filter results for: ${query}`);
}

// Set up filters
function setupFilters() {
  const filters = document.querySelectorAll('.status-filter, .category-filter');
  
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Remove active class from all filters in the same group
      const filterGroup = filter.parentElement;
      const siblings = filterGroup.querySelectorAll('.status-filter, .category-filter');
      siblings.forEach(sibling => sibling.classList.remove('active'));
      
      // Add active class to clicked filter
      filter.classList.add('active');
      
      // Get filter criteria
      const filterType = filter.classList.contains('status-filter') ? 'status' : 'category';
      const filterValue = filter.getAttribute('data-status') || filter.getAttribute('data-category');
      
      // Apply filter
      applyFilter(filterType, filterValue);
    });
  });
}

// Apply filter to table
function applyFilter(type, value) {
  console.log(`Filtering by ${type}: ${value}`);
  // In a real application, this would filter the table rows
}

// Set up pagination
function setupPagination() {
  const paginationButtons = document.querySelectorAll('.pagination-btn');
  
  paginationButtons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonText = button.textContent;
      console.log(`Pagination: ${buttonText}`);
      // In a real application, this would load the next/previous page
    });
  });
}

// Export function for generating reports
function exportReport(format = 'csv') {
  console.log(`Exporting report as ${format}`);
  // In a real application, this would generate and download a report
  alert(`Report would be exported as ${format.toUpperCase()}`);
}

// Order Management specific functionality
document.addEventListener('DOMContentLoaded', () => {
  // Modal functionality
  const modal = document.getElementById('orderModal');
  if (modal) {
    const closeBtn = modal.querySelector('.close');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
    
    viewButtons.forEach(button => {
      button.addEventListener('click', () => {
        modal.style.display = 'block';
        // In a real app, you would load order details here
      });
    });
  }
});

// Product Management specific functionality
document.addEventListener('DOMContentLoaded', () => {
  // Delete product confirmation
  const deleteButtons = document.querySelectorAll('.delete-btn');
  
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this product?')) {
        // In a real app, this would delete the product
        const productCard = button.closest('.product-card');
        productCard.style.opacity = '0';
        setTimeout(() => {
          productCard.remove();
        }, 300);
      }
    });
  });
});

    // Sample data for announcements (in a real app, this would come from a database)
    let announcements = [
      {
        id: 1,
        title: "Special Promotion",
        description: "Buy one get one free on all toasted siopao every Friday!",
        date: "2025-03-15",
        time: "14:30",
        image: null
      },
      {
        id: 2,
        title: "New Branch Opening",
        description: "We're excited to announce our new branch in Makati opening next month!",
        date: "2025-03-20",
        time: "10:00",
        image: null
      }
    ];

    // DOM elements
    const announcementList = document.getElementById('announcement-list');
    const createBtn = document.getElementById('create-announcement-btn');
    const modal = document.getElementById('announcement-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const announcementForm = document.getElementById('announcement-form');
    const announcementId = document.getElementById('announcement-id');
    const titleInput = document.getElementById('announcement-title');
    const descriptionInput = document.getElementById('announcement-description');
    const dateInput = document.getElementById('announcement-date');
    const timeInput = document.getElementById('announcement-time');
    const imageInput = document.getElementById('announcement-image');
    const imagePreview = document.getElementById('image-preview');

    // Display announcements
    function displayAnnouncements() {
      announcementList.innerHTML = '';
      
      if (announcements.length === 0) {
        announcementList.innerHTML = '<p>No announcements yet.</p>';
        return;
      }
      
      announcements.forEach(announcement => {
        const announcementCard = document.createElement('div');
        announcementCard.className = 'announcement-card';
        
        const dateTime = new Date(`${announcement.date}T${announcement.time}`);
        const formattedDate = dateTime.toLocaleDateString();
        const formattedTime = dateTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        announcementCard.innerHTML = `
          <h3>${announcement.title}</h3>
          <div class="announcement-meta">${formattedDate} at ${formattedTime}</div>
          <p>${announcement.description}</p>
          ${announcement.image ? `<img src="${announcement.image}" class="announcement-image" alt="Announcement image">` : ''}
          <div class="announcement-actions">
            <button class="edit-btn" data-id="${announcement.id}">Edit</button>
            <button class="delete-btn" data-id="${announcement.id}">Delete</button>
          </div>
        `;
        
        announcementList.appendChild(announcementCard);
      });
      
      // Add event listeners to edit and delete buttons
      document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt(e.target.dataset.id);
          editAnnouncement(id);
        });
      });
      
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt(e.target.dataset.id);
          deleteAnnouncement(id);
        });
      });
    }

    // Create new announcement
    function createAnnouncement() {
      modalTitle.textContent = 'Create Announcement';
      announcementForm.reset();
      announcementId.value = '';
      imagePreview.style.display = 'none';
      modal.style.display = 'flex';
    }

    // Edit announcement
    function editAnnouncement(id) {
      const announcement = announcements.find(a => a.id === id);
      if (!announcement) return;
      
      modalTitle.textContent = 'Edit Announcement';
      announcementId.value = announcement.id;
      titleInput.value = announcement.title;
      descriptionInput.value = announcement.description;
      dateInput.value = announcement.date;
      timeInput.value = announcement.time;
      
      if (announcement.image) {
        imagePreview.src = announcement.image;
        imagePreview.style.display = 'block';
      } else {
        imagePreview.style.display = 'none';
      }
      
      modal.style.display = 'flex';
    }

    // Delete announcement
    function deleteAnnouncement(id) {
      if (confirm('Are you sure you want to delete this announcement?')) {
        announcements = announcements.filter(a => a.id !== id);
        displayAnnouncements();
      }
    }

    // Save announcement (create or update)
    function saveAnnouncement(e) {
      e.preventDefault();
      
      const id = announcementId.value ? parseInt(announcementId.value) : Date.now();
      const title = titleInput.value;
      const description = descriptionInput.value;
      const date = dateInput.value;
      const time = timeInput.value;
      
      let image = null;
      if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          image = e.target.result;
          completeSave(id, title, description, date, time, image);
        };
        reader.readAsDataURL(imageInput.files[0]);
      } else {
        // If no new image selected, keep the existing one if editing
        const existingAnnouncement = announcements.find(a => a.id === id);
        image = existingAnnouncement ? existingAnnouncement.image : null;
        completeSave(id, title, description, date, time, image);
      }
    }

    function completeSave(id, title, description, date, time, image) {
      const announcementIndex = announcements.findIndex(a => a.id === id);
      
      if (announcementIndex !== -1) {
        // Update existing announcement
        announcements[announcementIndex] = {
          id, title, description, date, time, image
        };
      } else {
        // Add new announcement
        announcements.push({
          id, title, description, date, time, image
        });
      }
      
      displayAnnouncements();
      modal.style.display = 'none';
    }

    // Image preview
    imageInput.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          imagePreview.src = e.target.result;
          imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(this.files[0]);
      }
    });

    // Event listeners
    createBtn.addEventListener('click', createAnnouncement);
    closeModal.addEventListener('click', () => modal.style.display = 'none');
    announcementForm.addEventListener('submit', saveAnnouncement);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Initialize
    displayAnnouncements();

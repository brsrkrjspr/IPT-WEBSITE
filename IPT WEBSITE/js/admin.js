document.addEventListener('DOMContentLoaded', function() {
    // Top navbar navigation
    const topNavLinks = document.querySelectorAll('.top-nav a');
    
    // Sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-menu button');
    const contentSections = document.querySelectorAll('section.content');
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    // Initialize by showing the dashboard section
    document.getElementById('dashboard-section').classList.add('section-active');
    
    // Handle mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
    
    // Handle top navigation clicks
    topNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state in top navigation
            topNavLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            // Match with sidebar navigation
            const sectionId = this.getAttribute('href').substring(1);
            const targetSection = document.querySelector(`[data-section="${sectionId}-section"]`);
            
            if (targetSection) {
                targetSection.click();
            }
        });
    });
    
    // Handle sidebar navigation clicks
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Get the target section id from data attribute
            const targetSectionId = this.getAttribute('data-section');
            
            // Hide all sections
            contentSections.forEach(section => {
                section.classList.remove('section-active');
            });
            
            // Show the target section with a smooth transition
            const targetSection = document.getElementById(targetSectionId);
            if (targetSection) {
                targetSection.classList.add('section-active');
                
                // Scroll to the top of the section on mobile
                if (window.innerWidth <= 768) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    // Hide sidebar on mobile after click
                    sidebar.classList.remove('show');
                }
            }
            
            // Update active state in sidebar menu
            sidebarLinks.forEach(sideLink => {
                sideLink.parentElement.classList.remove('active');
            });
            this.parentElement.classList.add('active');
            
            // Update top navigation active state
            const sectionName = targetSectionId.replace('-section', '');
            topNavLinks.forEach(navLink => {
                if (navLink.getAttribute('href') === `#${sectionName}`) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            });
        });
    });
    
    // Handle window resize to hide/show sidebar appropriately
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('show');
        }
    });
    
    // Initialize the dashboard with empty tables and default values
    initializeDashboard();
    
    // Setup event listeners for UI controls
    setupEventListeners();
});

// Initialize dashboard with empty structure
function initializeDashboard() {
    // Set widget values to empty
    const docRequestCount = document.getElementById('docRequestCount');
    const newUserCount = document.getElementById('newUserCount');
    
    if (docRequestCount) docRequestCount.textContent = '0';
    if (newUserCount) newUserCount.textContent = '0';
    
    // Clear activity table but keep structure
    const activityTable = document.getElementById('activityTable');
    if (activityTable && activityTable.querySelector('tbody')) {
        activityTable.querySelector('tbody').innerHTML = '';
    }
    
    // Clear users table but keep structure
    const usersTable = document.getElementById('users-table');
    if (usersTable && usersTable.querySelector('tbody')) {
        usersTable.querySelector('tbody').innerHTML = '';
    }
    
    // Clear documents table but keep structure
    const documentsTable = document.getElementById('documents-table');
    if (documentsTable && documentsTable.querySelector('tbody')) {
        documentsTable.querySelector('tbody').innerHTML = '';
    }
    
    // Clear news table but keep structure
    const newsTable = document.getElementById('news-table');
    if (newsTable && newsTable.querySelector('tbody')) {
        newsTable.querySelector('tbody').innerHTML = '';
    }
    
    // Set default dates for analytics filter
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    
    if (startDate && endDate) {
        startDate.value = '';
        endDate.value = '';
    }
    
    // Clear settings values
    const systemName = document.getElementById('system-name');
    const adminEmail = document.getElementById('admin-email');
    const notifyRequests = document.getElementById('notify-requests');
    const notifyUsers = document.getElementById('notify-users');
    
    if (systemName) systemName.value = '';
    if (adminEmail) adminEmail.value = '';
    if (notifyRequests) notifyRequests.checked = false;
    if (notifyUsers) notifyUsers.checked = false;
}

// Set up event listeners for UI controls
function setupEventListeners() {
    // Button event listeners with blank functionality
    const buttons = {
        'add-user-btn': function() {},
        'search-user-btn': function() {},
        'apply-doc-filter': function() {},
        'search-doc-btn': function() {},
        'create-news-btn': function() {},
        'search-news-btn': function() {},
        'apply-date-filter': function() {},
        'save-settings': function() {},
        'reset-settings': function() {}
    };
    
    // Add event listeners for all buttons
    for (const [id, callback] of Object.entries(buttons)) {
        const button = document.getElementById(id);
        if (button) {
            button.addEventListener('click', callback);
        }
    }
    
    // Add basic event listeners for table action buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {});
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {});
    });
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {});
    });
    
    document.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', function() {});
    });
    
    // Add search functionality with empty handlers
    const searchInputs = ['user-search', 'doc-search', 'news-search'];
    
    searchInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                }
            });
        }
    });
}
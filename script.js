// --- Enhanced Authentication with User Signup ---
let currentUser = null;
let currentRole = null;

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("loginError");
    const activeTab = document.querySelector('.nav-tabs .active') ? 
                      document.querySelector('.nav-tabs .active').getAttribute('data-tab') : 'user';

    if (activeTab === 'admin') {
        if (username === "admin" && password === "admin123") {
            currentUser = "admin";
            currentRole = "admin";
            localStorage.setItem('currentUser', currentUser);
            localStorage.setItem('currentRole', currentRole);
            window.location.href = "dashboard.html";
        } else {
            errorMsg.textContent = "Invalid admin credentials!";
            errorMsg.classList.remove("d-none");
        }
    } else {
        // User login
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            currentUser = user.username;
            currentRole = "user";
            localStorage.setItem('currentUser', currentUser);
            localStorage.setItem('currentRole', currentRole);
            window.location.href = "dashboard.html";
        } else {
            errorMsg.textContent = "Invalid username or password!";
            errorMsg.classList.remove("d-none");
        }
    }
}

function handleSignup(event) {
    event.preventDefault();
    
    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
    const confirmPass = document.getElementById("signupConfirm").value.trim();
    const signupError = document.getElementById("signupError");

    if (password !== confirmPass) {
        signupError.textContent = "Passwords do not match!";
        signupError.classList.remove("d-none");
        return;
    }

    if (username.length < 3) {
        signupError.textContent = "Username must be at least 3 characters!";
        signupError.classList.remove("d-none");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(u => u.username === username)) {
        signupError.textContent = "Username already exists!";
        signupError.classList.remove("d-none");
        return;
    }

    users.push({ username, password, role: "user" });
    localStorage.setItem('users', JSON.stringify(users));
    
    alert("Account created successfully! You can now login.");
    const modal = bootstrap.Modal.getInstance(document.getElementById('signupModal'));
    if (modal) modal.hide();
    
    // Switch to login tab
    const userTab = document.querySelector('[data-tab="user"]');
    if (userTab) userTab.click();
}

// --- Chart.js Logic - All 6 Charts ---
document.addEventListener("DOMContentLoaded", function() {
    // Show current user in navbar
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay) {
        const savedUser = localStorage.getItem('currentUser');
        const savedRole = localStorage.getItem('currentRole');
        if (savedUser) {
            userDisplay.textContent = `${savedUser} (${savedRole})`;
        }
    }

    const colors = [
        'rgba(13, 110, 253, 0.8)', 
        'rgba(220, 53, 69, 0.8)', 
        'rgba(25, 135, 84, 0.8)', 
        'rgba(255, 193, 7, 0.8)',
        'rgba(111, 66, 193, 0.8)', 
        'rgba(253, 126, 20, 0.8)'
    ];

    // 1. Flights per Airline - Bar Chart
    if (document.getElementById('flightChart')) {
        new Chart(document.getElementById('flightChart'), {
            type: 'bar',
            data: {
                labels: ['Malaysia Airlines', 'AirAsia', 'Singapore Airlines', 'Emirates', 'Qatar Airways'],
                datasets: [{
                    label: 'Flights Today',
                    data: [15, 25, 10, 5, 8],
                    backgroundColor: colors,
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // 2. Flight Status Distribution - Pie Chart
    if (document.getElementById('statusChart')) {
        new Chart(document.getElementById('statusChart'), {
            type: 'pie',
            data: {
                labels: ['On-Time', 'Delayed', 'Cancelled'],
                datasets: [{
                    data: [42, 7, 2],
                    backgroundColor: ['#28a745', '#ffc107', '#dc3545']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // 3. Weekly Flight Trends - Line Chart
    if (document.getElementById('trendChart')) {
        new Chart(document.getElementById('trendChart'), {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Daily Flights',
                    data: [45, 52, 48, 61, 55, 40, 58],
                    borderColor: '#0d6efd',
                    backgroundColor: 'rgba(13, 110, 253, 0.2)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // 4. Fleet Utilization - Doughnut Chart
    if (document.getElementById('utilizationChart')) {
        new Chart(document.getElementById('utilizationChart'), {
            type: 'doughnut',
            data: {
                labels: ['In Service', 'Maintenance', 'Available'],
                datasets: [{
                    data: [65, 15, 20],
                    backgroundColor: ['#28a745', '#ffc107', '#0dcaf0']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // 5. Delays by Airline - Bar Chart
    if (document.getElementById('delayChart')) {
        new Chart(document.getElementById('delayChart'), {
            type: 'bar',
            data: {
                labels: ['AirAsia', 'Malaysia Airlines', 'Singapore Airlines', 'Emirates'],
                datasets: [{
                    label: 'Number of Delays',
                    data: [12, 5, 3, 4],
                    backgroundColor: '#fd7e14'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // 6. Aircraft Types in Fleet - Polar Area Chart
    if (document.getElementById('fleetChart')) {
        new Chart(document.getElementById('fleetChart'), {
            type: 'polarArea',
            data: {
                labels: ['Boeing 737 Max', 'Airbus A350', 'Boeing 777', 'A320neo', '787 Dreamliner', 'E190'],
                datasets: [{
                    data: [12, 5, 8, 15, 6, 9],
                    backgroundColor: colors
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
});

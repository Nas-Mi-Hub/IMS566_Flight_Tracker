// --- Authentication Logic ---
function handleLogin(event) {
    event.preventDefault(); // Prevent form from refreshing the page
    
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const errorMsg = document.getElementById("loginError");

    // Hardcoded credentials
    if (user === "admin" && pass === "admin123") {
        window.location.href = "dashboard.html"; // Redirect on success
    } else {
        errorMsg.classList.remove("d-none"); // Show error message
    }
}

// --- Chart.js Logic (Only runs on Dashboard page) ---
document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.getElementById('flightChart');
    
    // Check if the canvas exists so it doesn't throw errors on other pages
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Malaysia Airlines', 'AirAsia', 'Singapore Airlines', 'Emirates', 'Qatar Airways'],
                datasets: [{
                    label: 'Number of Flights Today',
                    data: [15, 25, 10, 5, 8],
                    backgroundColor: [
                        'rgba(13, 110, 253, 0.7)', // Bootstrap Primary
                        'rgba(220, 53, 69, 0.7)',  // Bootstrap Danger
                        'rgba(25, 135, 84, 0.7)',  // Bootstrap Success
                        'rgba(255, 193, 7, 0.7)',  // Bootstrap Warning
                        'rgba(111, 66, 193, 0.7)'  // Bootstrap Purple
                    ],
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
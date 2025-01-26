// API Key and Base URL for API requests
const APIKEY = "67960ee40acc06719d0d3647";  // API key for authentication with the RESTDB service
const BASE_URL = "https://mokeselldev-513e.restdb.io/rest/consumer";  // Base URL for the RESTDB API

// Utility function to make API requests (GET, POST, PUT, DELETE)
async function apiRequest(url, method, data = null) {
  const settings = {
    method: method,  // HTTP method (GET, POST, etc.)
    headers: {
      "Content-Type": "application/json",  // Indicates that the data being sent is in JSON format
      "x-apikey": APIKEY,  // Authentication header with API key
    },
    body: data ? JSON.stringify(data) : null,  // Convert data to JSON string if there is data to send
  };

  const response = await fetch(url, settings);  // Perform the API request
  return response.json();  // Parse the response as JSON and return it
}

// ------------- CREATE (Add new user) -------------
if (document.getElementById("signup-form")) {  // Check if signup form is present
  document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();  // Prevent form submission from reloading the page
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");  // Alert user if passwords don't match
      return;
    }

    try {
      const users = await apiRequest(BASE_URL, "GET");  // Get all users from RESTDB
      if (users.some((user) => user.Email === email)) {
        alert("Email already exists. Please use a different email.");  // Check if email already exists
        return;
      }

      const user = { Username: username, Email: email, Password: password, "Loyalty Points": 0 };
      const newUser = await apiRequest(BASE_URL, "POST", user);  // Create a new user in RESTDB
      alert("Sign Up Successful!");
      window.location.href = "login.html";  // Redirect to login page after successful signup
    } catch (err) {
      alert("Error signing up. Please try again.");
      console.error(err);  // Log error if request fails
    }
  });
}

// ------------- READ (Login user) -------------
if (document.getElementById("login-form")) {  // Check if login form is present
  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();  // Prevent form submission from reloading the page
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      const users = await apiRequest(BASE_URL, "GET");  // Get all users from RESTDB
      const user = users.find((u) => u.Email === email && u.Password === password);  // Find the user by email and password

      if (user) {
        window.location.href = `profile.html?userId=${user._id}`;  // Redirect to profile page with userId in the URL
      } else {
        alert("Invalid email or password.");
      }
    } catch (err) {
      alert("Error logging in. Please try again.");
    }
  });
}

// ------------- Update Profile -------------
document.getElementById("update-profile-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedUser = {
    Username: document.getElementById("update-username").value,
    Email: document.getElementById("update-email").value,
    "Loyalty Points": document.getElementById("profile-loyalty").textContent,  // Keep loyalty points same
  };

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');  // Get userId from the URL

    if (userId) {
      await apiRequest(`${BASE_URL}/${userId}`, "PUT", updatedUser);  // Send updated data to RESTDB
      alert("Profile updated successfully!");
      fetchUserData(userId);  // Re-fetch user data after update
    }
  } catch (err) {
    alert("Error updating profile. Please try again.");
    console.error(err);
  }
});

// Update Password
document.getElementById("update-password-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmNewPassword = document.getElementById("confirm-new-password").value;

  // Validate current password and new passwords
  if (currentPassword !== document.getElementById("profile-password").textContent) {
    alert("Current password is incorrect.");
    return;
  }
  if (newPassword !== confirmNewPassword) {
    alert("New passwords do not match.");
    return;
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    if (userId) {
      const updatedPasswordUser = { Password: newPassword };
      await apiRequest(`${BASE_URL}/${userId}`, "PUT", updatedPasswordUser);  // Update password in RESTDB
      alert("Password updated successfully!");
    }
  } catch (err) {
    alert("Error updating password. Please try again.");
    console.error(err);
  }
});

// ------------- DELETE (Delete user account) -------------
document.getElementById("delete-account").addEventListener("click", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');  // Get userId from URL
  
  if (userId && confirm("Are you sure you want to delete your account?")) {
    try {
      await apiRequest(`${BASE_URL}/${userId}`, "DELETE");  // Delete user from RESTDB
      alert("Account deleted successfully!");
      window.location.href = "landing.html";  // Redirect to landing page after deletion
    } catch (err) {
      alert("Error deleting account. Please try again.");
    }
  }
});

// ------------- LOGOUT (Clear session) -------------
if (document.getElementById("logout")) {
  document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.clear();  // Clear session (currently not used, as per your request)
    window.location.href = "landing.html";  // Redirect to landing page
  });
}

// ------------- Display Profile Information -------------
async function fetchUserData(userId) {
  try {
    const user = await apiRequest(`${BASE_URL}/${userId}`, "GET");  // Fetch user data from RESTDB
    document.getElementById("profile-username").textContent = user.Username;  // Display username
    document.getElementById("profile-email").textContent = user.Email;  // Display email
    document.getElementById("profile-loyalty").textContent = user["Loyalty Points"];  // Display loyalty points
  } catch (err) {
    alert("Error fetching user data.");
  }
}

// Get userId from URL (passed from the login page)
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
if (userId) {
  fetchUserData(userId);  // Fetch and display user data when profile page is loaded
}

// Toggle update forms
document.getElementById("show-update-form").addEventListener("click", () => {
  const container = document.getElementById("update-profile-form");
  container.style.display = container.style.display === "none" ? "block" : "none";  // Toggle visibility of the update profile form
});

document.getElementById("show-update-password-form").addEventListener("click", () => {
  const container = document.getElementById("update-password-form");
  container.style.display = container.style.display === "none" ? "block" : "none";  // Toggle visibility of the change password form
});
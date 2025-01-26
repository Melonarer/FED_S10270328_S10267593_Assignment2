document.addEventListener("DOMContentLoaded", function () {
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

  // ------------- Display Profile Information -------------
  async function fetchUserData(userId) {
    try {
      const user = await apiRequest(`${BASE_URL}/${userId}`, "GET");  // Fetch the user data
      document.getElementById("profile-username").textContent = user.Username;  // Display username
      document.getElementById("profile-email").textContent = user.Email;  // Display email
      document.getElementById("profile-loyalty").textContent = user["Loyalty Points"];  // Display loyalty points
    } catch (err) {
      alert("Error fetching user data.");
      console.error(err);
    }
  }

  // ------------- Update Username/Email -------------
  if (document.getElementById("update-form")) {
    document.getElementById("update-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("update-username").value;
      const email = document.getElementById("update-email").value;
  
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("userId");
  
      if (!userId) {
        alert("User ID is missing. Please log in again.");
        return;
      }
  
      try {
        const updatedData = { Username: username, Email: email };
        await apiRequest(`${BASE_URL}/${userId}`, "PUT", updatedData); // Update user data
        alert("Profile updated successfully!");
        window.location.reload(); // Reload to reflect changes
      } catch (err) {
        alert("Error updating profile. Please try again.");
        console.error(err);
      }
    });
  
    document.getElementById("cancel-update-form").addEventListener("click", () => {
      document.getElementById("update-profile-form").style.display = "none"; // Hide update form
    });
  }
  
  // ------------- Update Password -------------
  if (document.getElementById("update-password")) {
    document.getElementById("update-password").addEventListener("submit", async (e) => {
      e.preventDefault();
      const currentPassword = document.getElementById("current-password").value;
      const newPassword = document.getElementById("new-password").value;
      const confirmNewPassword = document.getElementById("confirm-new-password").value;
  
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("userId");
  
      if (!userId) {
        alert("User ID is missing. Please log in again.");
        return;
      }
  
      if (newPassword !== confirmNewPassword) {
        alert("New passwords do not match.");
        return;
      }
  
      try {
        const user = await apiRequest(`${BASE_URL}/${userId}`, "GET"); // Fetch user data
  
        if (user.Password !== currentPassword) {
          alert("Current password is incorrect.");
          return;
        }
  
        const updatedPassword = { Password: newPassword };
        await apiRequest(`${BASE_URL}/${userId}`, "PUT", updatedPassword); // Update password
        alert("Password updated successfully!");
        document.getElementById("update-password-form").style.display = "none"; // Hide password form
      } catch (err) {
        alert("Error updating password. Please try again.");
        console.error(err);
      }
    });
  
    document.getElementById("cancel-password-form").addEventListener("click", () => {
      document.getElementById("update-password-form").style.display = "none"; // Hide password form
    });
  }

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

  // ------------- Get User ID and Display Data on Page Load -------------
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId');
  if (userId) {
    fetchUserData(userId);  // Fetch and display user data when profile page is loaded
  }

  // Toggle update form visibility
  document.getElementById("show-update-form").addEventListener("click", () => {
    const container = document.getElementById("update-profile-form");
    container.style.display = container.style.display === "none" ? "block" : "none";  // Toggle visibility
  });

  document.getElementById("show-update-password-form").addEventListener("click", () => {
    const container = document.getElementById("update-password-form");
    container.style.display = container.style.display === "none" ? "block" : "none";  // Toggle visibility of the change password form
  });
  
  // Cancel Update Profile Form
if (document.getElementById("cancel-update-form")) {
    document.getElementById("cancel-update-form").addEventListener("click", () => {
      document.getElementById("update-profile-form").style.display = "none";
    });
  }
  
  // Cancel Change Password Form
  if (document.getElementById("cancel-password-form")) {
    document.getElementById("cancel-password-form").addEventListener("click", () => {
      document.getElementById("update-password-form").style.display = "none";
    });
  }
});
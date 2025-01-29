document.addEventListener("DOMContentLoaded", function () {
  // API Key and Base URL for API requests
  const APIKEY = "679858eff9d2bbdc10181e5d";  // API key for authentication with the RESTDB service
  const BASE_URL = "https://mokeselldev-513e.restdb.io/rest/consumer";  // Base URL for the RESTDB API

  // Utility function to make API requests (GET, POST, PUT, DELETE)
  async function apiRequest(url, method, data = null) {
    const APIKEY = "679858eff9d2bbdc10181e5d";
    const headers = {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
    };
  
    try {
      const response = await fetch(url, {
        method: method,
        headers: headers,
        body: data ? JSON.stringify(data) : null,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
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

        const user = { 
            Username: username, 
            Email: email, 
            Password: password, 
        };
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
  const loginUser = async () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      const users = await apiRequest(BASE_URL, "GET"); // Fetch all users from RESTdb
      const user = users.find((u) => u.Email === email && u.Password === password);

      if (user) {
        // Save user details to localStorage for the session
        localStorage.setItem("userId", user._id);
        localStorage.setItem("username", user.Username);
        localStorage.setItem("email", user.Email);
        alert("Login successful!");

        // Redirect to profile page
        window.location.href = `profile.html`;
      } else {
        alert("Invalid email or password.");
      }
    } catch (err) {
      alert("Error during login. Please try again.");
      console.error(err);
    }
  };

  if (document.getElementById("login-form")) {
    document.getElementById("login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      loginUser();
    });
  }

  // ------------- Display Profile Information (Fetch from RESTdb) -------------
  async function fetchUserData(userId) {
    try {
      // Fetch user data from RESTDB first
      const user = await apiRequest(`${BASE_URL}/${userId}`, "GET");
  
      // If the user data is found in RESTDB, display it
      if (user) {
        document.getElementById("profile-username").textContent = user.Username;
        document.getElementById("profile-email").textContent = user.Email;
        document.getElementById("profile-loyalty").textContent = user["Loyalty Points"];
      } else {
        // If no user data from RESTDB, fallback to localStorage
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          const storedUsername = localStorage.getItem('username');
          const storedEmail = localStorage.getItem('email');
          const storedLoyalty = localStorage.getItem('loyaltyPoints');
  
          // Display data from localStorage if no data found in RESTDB
          document.getElementById("profile-username").textContent = storedUsername;
          document.getElementById("profile-email").textContent = storedEmail;
          document.getElementById("profile-loyalty").textContent = storedLoyalty;
        } else {
          alert("User not found in both RESTDB and localStorage.");
        }
      }
    } catch (err) {
      alert("Error fetching user data.");
      console.error(err);
    }
  }
  
  // Fetch user ID from the URL or localStorage and call the function to populate data
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('userId') || localStorage.getItem("userId");
  if (userId) {
    fetchUserData(userId);  // Call function to fetch and display user data
  } else {
    alert("No user ID found.");
  }

  // ------------- Update User Profile -------------

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

  // ------------- Logout User -------------
  if (document.getElementById("logout")) {
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.clear(); // Clear all stored user data
      alert("Logged out successfully.");
      window.location.href = "landing.html";
    });
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
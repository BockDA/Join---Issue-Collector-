/**
 * This function is called when the login page is loaded to ensure that
 * the states are always reset.
 */
function resetLoginState() {
  localStorage.setItem("userLoggedIn", "false");
  localStorage.setItem("greetingShown", "false");
  createGuastFolder();
}

/**
 * This function is used to log in a guest user.
 * It checks if the user is already logged in and sets the necessary flags in localStorage.
 */
async function guestLogin() {
  if (localStorage.getItem("userLoggedIn") === "true") {
    return;
  }
  localStorage.setItem("userLoggedIn", "true");
  localStorage.setItem("greetingShown", "false");
  localStorage.setItem("userNameLogIn", "Guest");
  localStorage.setItem("userEmail", "");

  openGuestLoginPage();
}

/**
 * This function opens the guest login page by redirecting the browser.
 * @throws {Error} Throws an error if the URL is invalid.
 */
function openGuestLoginPage() {
  try {
    const url = "./HTML/summary_guest.html";
    if (url) {
      window.location.href = url;
    } else {
      throw new Error("Invalid URL");
    }
  } catch (error) {
    console.error("Error during redirection:", error);
  }
}

resetLoginState();


/**
 * Stores the current user data in the database.
 * @param {Object} userData - User data to save.
 */
async function createGuastFolder() {
   const url = Base_URL+"currentUser.json";
   const data = { email: "", name: "Guest" };
  try {
    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error saving user folder:", error);
  }
}
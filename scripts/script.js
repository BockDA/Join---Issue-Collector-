/**
 * Array of colors used for user contacts.
 * Each color represents a unique identifier for visual distinction.
 * @type {string[]}
 */
let contactColorArray = [ 
  "#FC71FF", // pink
  "#6E52FF", // bluish-purple
  "#9327FF", // light purple
  "#FFBB2B", // yellow
  "#FF4646", // red
  "#00BEE8", // light blue / mint
  "#0038FF", // dark blue
  "#FF7A00", // orange
  "#1FD7C1", // turquoise
  "#462F8A", // dark purple
  "#6e6b6dcc", // grey
];




/**
 * Toggles the visibility of the submenu by adding/removing a CSS class.
 */
function toggleMenu() {
  document.getElementById('submenu_toogle').classList.toggle('submenu_open');
}

/**
 * Closes the submenu if a user clicks outside of it or the toggle button.
 */
// TODO: evtl wird diese function nicht mehr gebartucht
/* 
document.addEventListener('click', function(event) {
  const submenu = document.getElementById('submenu_toogle');
  const toggleButton = document.getElementById('logo_user_sign_in');

  if (!submenu.contains(event.target) && !toggleButton.contains(event.target)) {
    submenu.classList.remove('submenu_open'); 
  }
});
*/

/**
 * Renders the user's initials inside the user logo element.
 * Fetches user data from Firebase and processes the name.
 */
function renderInitials() {
 // const Base_URL = "https://joinstorage-805e6-default-rtdb.europe-west1.firebasedatabase.app/";
  const Base_URL = "https://dajoin-dcf8a-default-rtdb.europe-west1.firebasedatabase.app/"
  renderUserLogo();

  fetch(`${Base_URL}/currentUser.json`)
    .then(res => res.json())
    .then(data => {
      const userName = data.name; 
      const initials = getCurrentInitials(userName);
      document.getElementById('render_initials_user_logo').textContent = initials;
     
    })
    .catch(err => console.error("Error fetching name:", err)); 
}



/**
 * This function renders the current user's name in the UI.
 */
function renderCurrentUser() {
  let userDiv = document.getElementById('current_user');
  let mobileUserDiv = document.getElementById('mobile_current_user');

  fetch(`${Base_URL}/currentUser.json`)
    .then(res => res.json())
    .then(data => {
      // TODO: wen keine Eingabe dann Gast
      // const userName = data?.name ?? 'Gast'; 
      const userName = data.name;
      userDiv.textContent = userName;
      mobileUserDiv.textContent = userName;
      console.log("Login mit Name1", userName);
      writeLoginUserLocalStorage(userName);

    })
    .catch(err => console.error("Error fetching user name:", err));
}

// TODO: neue function schreine username in localstprage
function writeLoginUserLocalStorage(userName) {
  localStorage.setItem("userNameLogIn", userName);
}




/**
 * Extracts and returns the initials from a full name.
 * @param {string} name - The full name of the user.
 * @returns {string} The user's initials in uppercase.
 */
function getCurrentInitials(name) {
  const nameParts = name.split(" ");
  const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
  return initials;
}


/**
 * Renders the user logo container into the DOM.
 */
function renderUserLogo() {
  document.getElementById("logo_user_sign_in").innerHTML = addUserLogoTemplate();
}




/**
 * Returns the HTML template string for the user logo container.
 * @returns {string} HTML string of the user logo template.
 */
function addUserLogoTemplate() {
  return ` 
   <div class="user_logo">
      <div id="render_initials_user_logo"> </div>
    </div>
  `;
}






/**
 * Navigates the user one step back in browser history.
 */
function goBack() {
  history.back();
}

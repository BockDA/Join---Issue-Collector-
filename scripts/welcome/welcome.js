setTimeout(() => {
  //  console.log("Time Ende");
  //  logoNone();
  //  dialogShoW();
}, 1000);

function logoNone() {
    document.getElementById("welcome_logo").style.display = "none";
}

function dialogShoW() {
    document.getElementById("body").style.backgroundColor = "var(--sideheader-main-color)";
    //document.getElementById("mail").style.display = "flex";
    document.getElementById("body").innerHTML = "";
    document.getElementById("body").innerHTML += welcomeTemplate();
}

function dialogShowCreateMail() {
    console.log("Seite vreate Email");
    document.getElementById("body").innerHTML = "";
    document.getElementById("body").innerHTML += welcomeCreateEmail();

}
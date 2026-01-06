setTimeout(() => {
    console.log("Time Ende");
    logoNone();
    dialogShoW();
}, 2000);

function logoNone(){
    document.getElementById("welcome_logo").style.display = "none";
}

function dialogShoW() {
    document.getElementById("body").style.backgroundColor = "var(--sideheader-main-color)";
    document.getElementById("mail").style.display = "flex";


    
   // document.getElementById("body").innerHTML += welcomeTemplate();


}
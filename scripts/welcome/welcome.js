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
    document.querySelector(".welcome-text-one").style.display = 'none';
    document.querySelector(".welome-text-two").classList.add("hidden");
    document.querySelector(".welcome-picture-second").classList.add("hidden");
    requestCounter();
    //   document.querySelector("welcome-btn-sendmail").classList.add('hidden');

}


function dialogShowStartPage() {
    console.log("Starte StartPage");
    //  document.getElementById("body").style.backgroundColor = "var(--white)"
    document.getElementById("body").innerHTML = "";
    window.location.href = "/startPage.html";
}


function dialogShowSendMail() {
    console.log("Dialog Send a Mail)")
    document.querySelector(".welcome-text-first").style.display = "none";
    document.querySelector(".welcome-text-second").style.display = "none";
    document.querySelector(".welcome-picture-second").classList.remove("hidden");
    document.querySelector(".welcome-btn-mail").style.display = "none";
    document.querySelector(".welcome-picture").classList.add("hidden");
    document.querySelector(".welcome-text-one").classList.remove("hidden");
    document.querySelector(".welome-text-two").classList.remove("hidden");
    document.querySelector(".welcome-picture-second").classList.remove("hidden");
    document.querySelector(".welcome-btn-sendmail").style.display = "flex";
    counterMax();
}


function callGmail() {
    const width = 900;
    const height = 700;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const url =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=wbda@elektro-bock.com" +
        "&su=Support%20Request";

    window.open(
        url,
        "_blank",
        `width=${width},height=${height},top=${top},left=${left}`
    );
  
}




async function counterStatus() {
    const res = await fetch("https://n8n.srv1249473.hstgr.cloud/webhook/counterStatus");
    const data = await res.json();
    console.log("Counter Status ", data);
    return data;
}


async function requestCounter() {
    let data = await counterStatus();
    document.getElementById("requestCount").innerHTML += data;
    if (data == 10) {
        document.getElementsByClassName("requestAdvertisement")[0].style.color = "red";
    }
}

async function counterMax() {
    let data = await counterStatus();
    if (data == 10) {
        document.getElementById("counterDay").style.display = "flex";
        const btn = document.getElementsByClassName("welcome-btn-sendmail")[0];
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.5";
    }
}


function welcomeCreateEmail() {

    return `
    <div id="mail" class="welcome-mail">
        <img class="logo" src="../assets/icons/logo.svg" alt="logo">
            <div class="mail-content">
                <div class="mail-header">
                    <img src="../assets/icons/arrow-left-line-black.png" onclick="dialogShoW()" alt="mail-icon">
                      <p class="requestAdvertisement">
                         <span id="requestCount"></span> of 10 requests used today
                      </p>
                </div>
                <div class="welcome-container-inner">
                    <p class="welcome-headline">Welcome</p>
                    <div class="welcome-container">
                        <div class="welcome-mail-textarea">

                            <div class="welcome-text-first">
                                <p>Easily create a ticket by sending an email </p>
                                <p> no extra steps needed</p>
                            </div>

                            <div class="welcome-text-second">
                                <p>On this platform, you can submit your feature requests via email. Our AI system will
                                    automatically generate a ticket
                                    with a deadline and priority level.</p>
                                <p>A total of 10 requests can be created per day. After this limit, emails can still be
                                    sent, but they will be manually
                                    reviewed by our team instead of generating AI tickets.</p>
                            </div>

                            <div class="welcome-text-one textFormat">
                            <P>The daily 10-request limit has been reached!</p>
                            </div>

                            <div id="counterDay" class="counterDay">
                                <p>The daily 10-request limit has been reached! </p>
                            </div>


                            <div class="welome-text-two textFormat">
                            <p>Need more? No worries - you can still send emails, but </p>
                            <p>out team will review them manually instead of using Al </p>
                            <p>to create tickets.</p>
                            </div>



                        </div>
                        <img class="welcome-picture" src="../assets/icons/picWelcomeMail.png" alt="welcome-illustration">
                        <img class="welcome-picture-second" src="../assets/icons/Artboard.png" alt="welcome-illustration">

                    </div>
                </div>
                <button class="welcome-btn-mail welcome-button" id="welcomeTaskButton" onclick="dialogShowSendMail()">Create Email
                    Request <img class="welcome-arrow-down" src="../assets/icons/check.png" alt="arrow-down"></button>

                 <button class="welcome-btn-sendmail welcome-button" id="welcomeTaskButton" onclick="callGmail()">Send an email
                   <img class="welcome-arrow-down" src="../assets/icons/check.png" alt="arrow-down"></button>

                   
            </div>
           

            <footer>
                <a href="./guest_policy.html">Privacy Policy</a>

                <a href="./guest_legal_notice.html">Legal notice</a>
            </footer>
    </div>
    </div >
    `
}
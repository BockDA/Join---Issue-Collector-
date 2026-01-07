function welcomeTemplate() {
    return `
        <div id="dialog_Show" class="dialog-Show">
        <div class="welcome-contents">
            <h1>Welcome</h1>
            <hr>
            <p>Pick the option that suits your role: create a request as a </p>
            <p>stakeholder or log in if youre part of the team</p>

            <div class="welcome-section"></div>
            <div id="" class="welcome-option">
                <div class="welcome-section-btn">
                    <div class="option-a">
                        <img src="../assets/icons/work.png" alt="stakeholder icon">
                        <span>Are your a stakeholder?</span>
                    </div>
                    <button id="" class="btn-stakeholder" onclick="dialogShowCreateMail()">Create request</button>
                </div>
                <div class="welcome-section-btn">
                    <div class="option-b">
                    <img src="../assets/icons/group.png" alt="team icon">
                    <span>Are you a team member?</span>
                    </div>
                        <button id="" class="btn-team">Member log in</button>
                </div>
               </div>
          </div>
    </div>
     
    `
}
// Form to sign up into the application
const form = document.getElementById("formSignUp");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ata = JSON.stringify({
        "mail": document.getElementById("mail").value + document.getElementById("mailDomain").value,
        "psw": document.getElementById("psw").value,
        "psw2": document.getElementById("psw2").value,
        "pseudo": document.getElementById("pseudo").value,
        //"g-recaptcha-response": grecaptcha.getResponse()
    });
    const response = await fetch('/signup', {
        method: 'POST', headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, body: ata
    });
    const data = await response.json();
    const message = document.getElementById("errorMessageContainer");
    if (message) {
        message.textContent = data["message"];
    }
    if (data["success"]) {
        document.location.href = "/code";
    }
    return false;
});
export {};
//# sourceMappingURL=Signup.js.map
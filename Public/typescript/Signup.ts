// Form to sign up into the application

const form = document.getElementById("formSignUp") as HTMLFormElement;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ata = JSON.stringify({
        "mail": (document.getElementById("mail") as HTMLInputElement).value + (document.getElementById("mailDomain") as HTMLInputElement).value,
        "psw": (document.getElementById("psw") as HTMLInputElement).value,
        "psw2": (document.getElementById("psw2") as HTMLInputElement).value,
        "pseudo": (document.getElementById("pseudo") as HTMLInputElement).value,
        //"g-recaptcha-response": grecaptcha.getResponse()
});
    const response = await fetch('/signup', {
        method: 'POST', headers:
            {
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

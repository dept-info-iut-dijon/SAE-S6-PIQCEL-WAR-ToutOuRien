const formLogIn = document.getElementById("formLogIn");
formLogIn.addEventListener("submit", async (e) => {
    e.preventDefault();
    const mailElement = document.getElementById("mail");
    const mailDomainElement = document.getElementById("mailDomain");
    const pswElement = document.getElementById("psw");
    if (mailElement && mailDomainElement && pswElement) {
        const data = JSON.stringify({
            "mail": mailElement.value + mailDomainElement.value,
            "psw": pswElement.value,
        });
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: data
        });
        const responseData = await response.json();
        const message = document.getElementById("errorMessageContainer");
        if (message && responseData["message"]) {
            message.textContent = responseData["message"];
        }
        const nom = document.getElementById("nomUtilisateur");
        if (nom && responseData["nom"]) {
            nom.textContent = responseData["nom"];
        }
        if (responseData["success"]) {
            document.location.href = "/";
        }
    }
    return false;
});
export {};
//# sourceMappingURL=Login.js.map
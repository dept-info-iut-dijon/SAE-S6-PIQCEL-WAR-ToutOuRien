// Form to log into the application

const form = document.getElementById("formLogIn")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const ata = JSON.stringify({
        "mail" : document.getElementById("mail").value + document.getElementById("mailDomain").value,
        "psw" : document.getElementById("psw").value,
    });

    console.log(ata);

    const response = await fetch('/login', {
        method: 'POST', headers:
        {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }, body: ata
    });

    console.log(response);

    const data = await response.json();

    console.log(data);

    var message = document.getElementById("errorMessageContainer");
    message.textContent = data["message"];

    var nom = document.getElementById("nomUtilisateur");
    nom.textContent = data["nom"];

    if (data["success"]) {
        document.location.href = "/";
    }

    return false;
})
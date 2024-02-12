const form = document.getElementById("formConfirmCode")

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const response = await fetch('/code', {
        method: 'POST', headers:
        {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({"confirmationCode": document.getElementById('confirmationCode').value})
    });
    const data = await response.json();

    if (data["success"]) {
        document.location.href = "/";
    } else {
        var message = document.getElementById("errorMessageContainer");
        message.textContent = "Code Incorrecte";
    }

    return false;
})
const formConfirmCode = document.getElementById("formConfirmCode");
formConfirmCode.addEventListener("submit", async (e) => {
    e.preventDefault();
    const response = await fetch('/code', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ "confirmationCode": document.getElementById('confirmationCode').value })
    });
    const data = await response.json();
    if (data["success"]) {
        document.location.href = "/";
    }
    else {
        const message = document.getElementById("errorMessageContainer");
        if (message) {
            message.textContent = "Code Incorrecte";
        }
    }
    return false;
});
export {};
//# sourceMappingURL=ConfirmCode.js.map
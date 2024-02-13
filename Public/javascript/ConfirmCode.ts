const formConfirmCode = document.getElementById("formConfirmCode") as HTMLFormElement;

formConfirmCode.addEventListener("submit", async (e: Event) => {
    e.preventDefault();
    const response = await fetch('/code', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({"confirmationCode": (document.getElementById('confirmationCode') as HTMLInputElement).value})
    });
    const data = await response.json();

    if (data["success"]) {
        document.location.href = "/";
    } else {
        const message = document.getElementById("errorMessageContainer") as HTMLElement;
        if (message) {
            message.textContent = "Code Incorrecte";
        }
    }

    return false;
});

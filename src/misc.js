const origin = "http://localhost:5173";

window.addEventListener("message", (e) => {
    if(e.origin !== origin && e.origin !== location.origin) {
    console.error("Unknown origin");
    }
    else if(e.origin === origin) {
    const message = JSON.parse(e.data);
    handleMessage(message);
    }
})

function handleMessage(message) {
    console.log("handleMEssage", message);
    const loaderDialog = document.querySelector(".loading-dialog");

    if(message === "true") {
        loaderDialog.firstChild.textContent = "Successfully sent.";
        setTimeout(() => loaderDialog.close(), 4000)
    }
    else if(message === "false") {
        loaderDialog.firstChild.textContent = "Something went wrong. Couldn't send the content.";
        setTimeout(() => loaderDialog.close(), 4000)
    }
}
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
    const loaderDialog = document.querySelector(".loading-dialog");

    if(message === "true") {
        loaderDialog.classList.add("success")
    }
    else if(message === "false") {
        loaderDialog.classList.add("failure");
    }
}
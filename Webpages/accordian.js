/* accordion.js - opens and closes the FAQ answers */

document.addEventListener("DOMContentLoaded", function () {

    const headers = document.querySelectorAll(".accordion-header");
    if (headers.length === 0) return;   // page has no accordion, do nothing

    headers.forEach(function (header) {
        header.addEventListener("click", function () {
            const panel = header.nextElementSibling;
            const wasOpen = header.getAttribute("aria-expanded") === "true";

            // Close every item first so only one is open at a time
            headers.forEach(function (other) {
                other.setAttribute("aria-expanded", "false");
                other.nextElementSibling.style.maxHeight = null;
            });

            // Open the clicked one (unless it was already open)
            if (!wasOpen) {
                header.setAttribute("aria-expanded", "true");
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
});
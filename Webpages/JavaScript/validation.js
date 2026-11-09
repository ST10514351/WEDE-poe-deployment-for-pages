
function setError(input, msg) {

    let error;

    // Radio buttons and checkboxes need their
    // error messages outside their labels
    if (input.type === "radio" || input.type === "checkbox") {

        const fieldset = input.closest("fieldset");

        if (!fieldset) return;

        error = fieldset.querySelector(".error-message");

        if (!error && msg !== "") {
            error = document.createElement("small");
            error.className = "error-message";
            fieldset.appendChild(error);
        }

    } else {

        // Find the existing error message
        const label = input.closest("label");
        const container = label || input;

        error = container.parentElement.querySelector(
            ".error-message[data-error-for='" + input.id + "']"
        );

        if (!error && msg !== "") {
            error = document.createElement("small");
            error.className = "error-message";
            error.dataset.errorFor = input.id;

            container.insertAdjacentElement("afterend", error);
        }
    }

    if (error) {
        error.textContent = msg;
    }

    input.classList.toggle("invalid", msg !== "");
    input.setCustomValidity(msg);
}


function validateField(input) {

    input.setCustomValidity("");
    const v = input.value.trim();

    if (input.required && v === "") {
        setError(input, "This field is required.");
        return false;
    }

    if (input.name === "name" && v.length > 0 && v.length < 2) {
        setError(input, "Name must be at least 2 characters.");
        return false;
    }

    if (
        input.type === "email" &&
        v !== "" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    ) {
        setError(input, "Enter a valid email address.");
        return false;
    }

    if (
        input.type === "tel" &&
        v !== "" &&
        !/^(\+27|0)[0-9]{9}$/.test(v.replace(/\s/g, ""))
    ) {
        setError(input, "Enter a valid SA number, e.g. 0821234567.");
        return false;
    }

    if (
        input.type === "date" &&
        v !== "" &&
        new Date(v) < new Date().setHours(0, 0, 0, 0)
    ) {
        setError(input, "Date cannot be in the past.");
        return false;
    }

    if (
        input.tagName === "TEXTAREA" &&
        v !== "" &&
        v.length < 10
    ) {
        setError(input, "Message must be at least 10 characters.");
        return false;
    }

    // Check other HTML validation rules
    if (!input.checkValidity()) {
        setError(input, input.validationMessage);
        return false;
    }

    setError(input, "");
    return true;
}

// Live validation (ChatGPT, 2026)
document.addEventListener("DOMContentLoaded", function () {

    document.querySelectorAll(".site-form").forEach(function (form) {

        form.querySelectorAll("input, select, textarea")
            .forEach(function (field) {

                field.addEventListener("blur", function () {
                    validateField(field);
                });

                field.addEventListener("input", function () {
                    validateField(field);
                });

                field.addEventListener("change", function () {
                    validateField(field);
                });

            });

    });

});

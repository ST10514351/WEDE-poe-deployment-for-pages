
// AJAX Form Submission
// New Beginnings Foundation

document.addEventListener("DOMContentLoaded", function () {

    const forms = document.querySelectorAll(".site-form");

    forms.forEach(function (form) {

        // Create a response message without changing the existing layout
        const responseMessage = document.createElement("p");

        responseMessage.setAttribute("role", "status");
        responseMessage.setAttribute("aria-live", "polite");

        form.appendChild(responseMessage);

        form.addEventListener("submit", async function (event) {

            event.preventDefault();

            // Use the browser's built-in HTML validation
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // Check whether the Formspree endpoint is configured
            if (
                !form.action.includes("formspree.io/f/") ||
                form.action.includes("YOUR_FORM_ID")
            ) {
                responseMessage.textContent =
                    "Form submission has not been configured yet.";

                return;
            }

            const submitButton = form.querySelector(
                'button[type="submit"], input[type="submit"]'
            );

            const originalText = submitButton
                ? submitButton.textContent
                : "";

            responseMessage.textContent = "";

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Submitting...";
            }

            try {

                // Send form information asynchronously
                const response = await fetch(form.action, {

                    method: "POST",

                    body: new FormData(form),

                    headers: {
                        "Accept": "application/json"
                    }

                });

                const result = await response.json();

                if (response.ok) {

                    responseMessage.textContent =
                        "Thank you! Your form has been submitted successfully.";

                    form.reset();

                } else {

                    const errorMessage = result.errors
                        ? result.errors.map(error => error.message).join(" ")
                        : "Something went wrong. Please try again.";

                    responseMessage.textContent = errorMessage;

                }

            } catch (error) {

                responseMessage.textContent =
                    "Unable to submit your form. Please check your internet connection.";

            } finally {

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }

            }

        });

    });

});

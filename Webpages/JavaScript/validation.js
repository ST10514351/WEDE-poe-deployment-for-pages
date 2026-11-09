function setError(input, msg) {
  input.parentElement.querySelector(".error-message").textContent = msg;
  input.classList.toggle("invalid", msg !== "");
}

function validateField(input) { //(Claude, 2026)
  const v = input.value.trim();
  if (input.required && v === "") return setError(input, "This field is required."), false;
  if (input.name === "name" && v.length < 2) return setError(input, "Name must be at least 2 characters."), false;
  if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return setError(input, "Enter a valid email address."), false;
  if (input.type === "tel" && !/^(\+27|0)[0-9]{9}$/.test(v.replace(/\s/g, ""))) return setError(input, "Enter a valid SA number, e.g. 0821234567."), false;
  if (input.type === "date" && new Date(v) < new Date().setHours(0,0,0,0)) return setError(input, "Date cannot be in the past."), false;
  if (input.tagName === "TEXTAREA" && v.length < 10) return setError(input, "Message must be at least 10 characters."), false;
  setError(input, "");
  return true;
}

function validateForm(form) {
  let ok = true;
  form.querySelectorAll("input:not([type=radio]), select, textarea")
      .forEach(f => { if (!validateField(f)) ok = false; });
  return ok;
}

// live feedback while typing
document.querySelectorAll(".site-form").forEach(form => {
  form.querySelectorAll("input, select, textarea")
      .forEach(f => f.addEventListener("blur", () => validateField(f)));
});
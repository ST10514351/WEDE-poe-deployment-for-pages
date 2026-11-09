/* counter.js - plug-in count-up for numbers like "200 000+", "60 million+", "R209 768".
   No HTML changes needed: it finds matching numbers in <h3> and <strong> tags by their text. */

document.addEventListener("DOMContentLoaded", function () {

    // Matches: optional "R", digits (spaces allowed), optional " million", optional "+"
    const pattern = /^(R?)\s?(\d[\d\s]*)(\s?million)?(\+?)$/i;

    const elements = document.querySelectorAll("h3, strong");

    elements.forEach(function (el) {
        const text = el.textContent.replace(/\s+/g, " ").trim();
        const match = text.match(pattern);
        if (!match) return;                       // not a number, e.g. "1 Goal"

        const prefix = match[1];                  // "R" or ""
        const target = parseInt(match[2].replace(/\s/g, ""), 10);
        const suffix = (match[3] ? " million" : "") + match[4];   // " million" and/or "+"
        const step = Math.max(1, Math.round(target / 200));

        let current = 0;
        const timer = setInterval(function () {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = prefix + current.toLocaleString("en-ZA").replace(/\u00a0/g, " ") + suffix;
        }, 50);
    });
});
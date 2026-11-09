/* animations.js - fades cards and sections in as they scroll into view */

(function () {
    "use strict";

    function init() {
        // Old browsers: do nothing, so the content is never hidden
        if (!("IntersectionObserver" in window)) return;

        var items = document.querySelectorAll(".content-section, .card");
        if (items.length === 0) return;

        var reduceMotion = window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Stagger the cards in each grid so they appear one after another
        document.querySelectorAll(".card-grid").forEach(function (grid) {
            grid.querySelectorAll(".card").forEach(function (card, index) {
                var delay = reduceMotion ? 0 : index * 120;
                card.style.setProperty("--reveal-delay", delay + "ms");
            });
        });

        // Hide everything first (style.css sets the hidden look)
        items.forEach(function (item) {
            item.classList.add("reveal");
        });

        var observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                obs.unobserve(el);          // only animate once
                void el.offsetWidth;        // make sure the hidden state is painted first
                el.classList.add("visible");
                cleanUp(el);
            });
        }, { rootMargin: "0px 0px -60px 0px" });

        items.forEach(function (item) {
            observer.observe(item);
        });
    }

    // When the fade has finished, remove the helper classes so the element goes
    // back to its normal styling (this keeps the card hover effect working)
    function cleanUp(el) {
        var finished = false;

        function finish() {
            if (finished) return;
            finished = true;
            el.removeEventListener("transitionend", onEnd);
            el.classList.remove("reveal", "visible");
            el.style.removeProperty("--reveal-delay");
        }

        function onEnd(event) {
            if (event.target === el && event.propertyName === "opacity") finish();
        }

        el.addEventListener("transitionend", onEnd);

        // Backup in case transitionend never fires
        var delay = parseFloat(el.style.getPropertyValue("--reveal-delay")) || 0;
        setTimeout(finish, delay + 1200);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
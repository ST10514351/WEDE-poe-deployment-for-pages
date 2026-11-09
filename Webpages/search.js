/* search.js - header search for the five pages.
   the script adds the search box to the header by itself. */

document.addEventListener("DOMContentLoaded", function () {

    // 1. The pages that can be found. Keywords edited here.
    const pages = [
        { title: "Home",       url: "home.html",     keywords: "home welcome mission homelessness statistics how it works impact stories" },
        { title: "About Us",   url: "about.html",    keywords: "about us founder story vision mission values team rehab programs job offers" },
        { title: "Donate",     url: "donate.html",   keywords: "donate donation give money support amount R500 R1000 housing food rehabilitation employment payment" },
        { title: "Contact",    url: "contact.html",  keywords: "contact volunteer collaboration enquiry email phone message management team large donation" },
        { title: "Feedback",   url: "feedback.html", keywords: "feedback suggestion complaint review comment positive constructive criticism anonymous" }
    ];

    // 2. Add the search box to the header (after the navigation)
    const header = document.querySelector(".site-header") || document.querySelector("header");
    if (!header) return;

    const box = document.createElement("div");
    box.className = "site-search";
    box.innerHTML =
        '<input type="search" class="site-search-input" placeholder="Search the site..." aria-label="Search the site">' +
        '<ul class="site-search-results" hidden></ul>';

    const nav = header.querySelector("nav");
    if (nav) {
        nav.insertAdjacentElement("afterend", box);
    } else {
        header.appendChild(box);
    }

    const input = box.querySelector("input");
    const results = box.querySelector("ul");

    // 3. Filter the pages every time the visitor types
    input.addEventListener("input", function () {
        const query = input.value.trim().toLowerCase();
        results.innerHTML = "";

        if (query === "") {
            results.hidden = true;
            return;
        }

        const matches = pages.filter(function (page) {
            return (page.title + " " + page.keywords).toLowerCase().includes(query);
        });

        if (matches.length === 0) {
            results.innerHTML = '<li class="no-results">No results found</li>';
        } else {
            matches.forEach(function (page) {
                const li = document.createElement("li");
                li.innerHTML = '<a href="' + page.url + '">' + page.title + "</a>";
                results.appendChild(li);
            });
        }
        results.hidden = false;
    });

    // 4. Close the results when clicking elsewhere or pressing Escape
    document.addEventListener("click", function (event) {
        if (!box.contains(event.target)) results.hidden = true;
    });
    input.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            results.hidden = true;
            input.blur();
        }
    });
});
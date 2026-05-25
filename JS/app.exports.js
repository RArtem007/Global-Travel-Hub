function getActivePage(pathname) {
    let page = pathname.split("/").pop().toLowerCase();
    if (!page || !page.endsWith(".html")) page = "index.html";
    return page;
}

function highlightActiveLink(links, currentPage) {
    links.forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop().toLowerCase();
        link.classList.remove("active");
        if (linkPage === currentPage) link.classList.add("active");
    });
}

function getAuthLabel(user, isAdmin) {
    if (!user) return null;
    return (isAdmin ? "👑 " : "👤 ") + user;
}

module.exports = { getActivePage, highlightActiveLink, getAuthLabel };

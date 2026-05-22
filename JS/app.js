fetch('header.html')
  .then(r => r.text())
  .then(t => {
    document.getElementById('header').innerHTML = t;

    // ===== Підсвітка активної сторінки =====
    let currentPage = window.location.pathname.split("/").pop().toLowerCase();
    if (!currentPage || !currentPage.endsWith(".html")) {
        currentPage = "index.html";
    }

    document.querySelectorAll("nav a").forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop().toLowerCase();
        link.classList.remove("active");
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });

    // ===== Кнопка входу =====
    const user = localStorage.getItem("currentUser");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const btn = document.getElementById("authBtn");
    if (user && btn) {
        btn.innerText = (isAdmin ? "👑 " : "👤 ") + user;
        btn.href = "#";
        btn.onclick = function(e) {
            e.preventDefault();
            if (confirm("Вийти з акаунту?")) {
                localStorage.removeItem("currentUser");
                localStorage.removeItem("isAdmin");
                location.reload();
            }
        };
        if (isAdmin) {
            const adminBtn = document.getElementById("adminBtn");
            if (adminBtn) adminBtn.style.display = "inline-block";
        }
    }
  });
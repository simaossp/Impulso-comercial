/* =================================
   IMPULSO COMERCIAL
   Ficheiro principal da plataforma
================================= */

document.addEventListener("DOMContentLoaded", function () {

    // Identificar a página actual
    const currentPage = window.location.pathname;

    console.log("IMPULSO COMERCIAL carregada.");
    console.log("Página actual:", currentPage);

    // Identificar parâmetros da página
    const urlParams = new URLSearchParams(window.location.search);

    const selectedCourse = urlParams.get("curso");

    if (selectedCourse) {
        console.log("Formação seleccionada:", selectedCourse);
    }

    // Links externos abrem em nova janela
    document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });

});

// Função para voltar à página anterior
function goBack() {
    window.history.back();
}

// Função para abrir o WhatsApp de apoio
function openWhatsApp() {
    window.open(
        "https://wa.me/258878646362",
        "_blank"
    );
}
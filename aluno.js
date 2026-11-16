// ==========================================
// IMPULSO COMERCIAL
// ÁREA DO ALUNO
// ==========================================

document.addEventListener("DOMContentLoaded", async function () {

    const supabase = getSupabase();

    if (!supabase) {
        alert("Não foi possível ligar à plataforma.");
        return;
    }

    // Identificar aluno autenticado
    const { data: userData, error: userError } =
        await supabase.auth.getUser();

    if (userError || !userData.user) {
        window.location.href = "login.html";
        return;
    }

    const userId = userData.user.id;

    // Carregar inscrições e pagamentos
    const [resultadoInscricoes, resultadoPagamentos] =
        await Promise.all([

            supabase
                .from("enrollments")
                .select("curso_id")
                .eq("user_id", userId),

            supabase
                .from("payments")
                .select("curso_id, status")
                .eq("user_id", userId)

        ]);

    if (resultadoInscricoes.error || resultadoPagamentos.error) {
        console.error(
            resultadoInscricoes.error || resultadoPagamentos.error
        );

        alert("Não foi possível carregar os dados da tua área.");
        return;
    }

    const inscricoes = resultadoInscricoes.data || [];
    const pagamentos = resultadoPagamentos.data || [];

    // Identificar formações adquiridas
    const cursosAdquiridos = inscricoes.map(
        inscricao => inscricao.curso_id
    );

    // Contar pagamentos pendentes
    const pagamentosPendentes = pagamentos.filter(
        pagamento => pagamento.status === "pendente"
    ).length;

    // Actualizar estatísticas
    const adquiridas = document.getElementById("formacoes-adquiridas");
    const disponiveis = document.getElementById("formacoes-disponiveis");
    const pendentes = document.getElementById("pagamentos-pendentes-aluno");

    if (adquiridas) {
        adquiridas.textContent = cursosAdquiridos.length;
    }

    if (disponiveis) {
        disponiveis.textContent =
            obterTodosCursos().length - cursosAdquiridos.length;
    }

    if (pendentes) {
        pendentes.textContent = pagamentosPendentes;
    }

    // Actualizar estado de cada formação
    const estados = {
        importacao: "estado-importacao",
        cartao: "estado-cartao",
        marketing: "estado-marketing"
    };

    Object.keys(estados).forEach(function (cursoId) {

        const elemento = document.getElementById(estados[cursoId]);

        if (!elemento) return;

        if (cursosAdquiridos.includes(cursoId)) {
            elemento.textContent = "FORMAÇÃO ADQUIRIDA";
            elemento.style.color = "#16803c";
        } else {
            const temPagamentoPendente = pagamentos.some(
                pagamento =>
                    pagamento.curso_id === cursoId &&
                    pagamento.status === "pendente"
            );

            if (temPagamentoPendente) {
                elemento.textContent = "PAGAMENTO EM VERIFICAÇÃO";
                elemento.style.color = "#b7791f";
            } else {
                elemento.textContent = "AINDA NÃO ADQUIRIDO";
                elemento.style.color = "#777";
            }
        }

    });

    console.log("Área do aluno actualizada.");
});
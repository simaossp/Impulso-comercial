// ==========================================
// IMPULSO COMERCIAL
// MÓDULO ADMINISTRATIVO
// ==========================================

document.addEventListener("DOMContentLoaded", async function () {

    console.log("Módulo administrativo carregado.");

    const supabase = getSupabase();

    if (!supabase) {
        alert("Não foi possível ligar à base de dados.");
        return;
    }

    // TOTAL DE FORMAÇÕES

    const totalFormacoes = document.getElementById("total-formacoes");

    if (totalFormacoes && typeof obterTodosCursos === "function") {
        totalFormacoes.textContent = obterTodosCursos().length;
    }

    // ÁREA DE PAGAMENTOS

    const btnPagamentos = document.getElementById("gerir-pagamentos");

    if (btnPagamentos) {

        btnPagamentos.addEventListener("click", async function () {

            let area = document.getElementById("lista-pagamentos");

            if (!area) {
                area = document.createElement("div");
                area.id = "lista-pagamentos";
                area.style.marginTop = "25px";
                btnPagamentos.parentElement.appendChild(area);
            }

            area.innerHTML = "<p>A carregar pagamentos...</p>";

            const { data: pagamentos, error } = await supabase
                .from("payments")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                area.innerHTML = "<p>Erro ao carregar pagamentos: " +
                    error.message + "</p>";
                return;
            }

            if (!pagamentos || pagamentos.length === 0) {
                area.innerHTML = "<p>Ainda não existem pagamentos registados.</p>";
                return;
            }

            area.innerHTML = "<h3>Pagamentos recebidos</h3>";

            pagamentos.forEach(function (pagamento) {

                const item = document.createElement("div");

                item.style.padding = "15px";
                item.style.marginBottom = "12px";
                item.style.background = "#f6f7fa";
                item.style.borderRadius = "8px";

                const informacao = document.createElement("p");

                informacao.textContent =
                    "Curso: " + pagamento.curso_id +
                    " | Valor: " + pagamento.valor + " MT" +
                    " | Método: " + pagamento.metodo +
                    " | Referência: " + pagamento.referencia +
                    " | Estado: " + pagamento.status;

                item.appendChild(informacao);

                if (pagamento.status === "pendente") {

                    const botao = document.createElement("button");

                    botao.textContent = "Confirmar pagamento";
                    botao.style.padding = "10px 15px";
                    botao.style.cursor = "pointer";

                    botao.addEventListener("click", async function () {

                        const confirmar = window.confirm(
                            "Confirmaste realmente a recepção deste pagamento?"
                        );

                        if (!confirmar) return;

                        botao.disabled = true;
                        botao.textContent = "A confirmar...";

                        const { error: erroInscricao } = await supabase
                            .from("enrollments")
                            .upsert({
                                user_id: pagamento.user_id,
                                curso_id: pagamento.curso_id
                            }, {
                                onConflict: "user_id,curso_id",
                                ignoreDuplicates: true
                            });

                        if (erroInscricao) {
                            alert("Erro ao criar inscrição: " + erroInscricao.message);
                            botao.disabled = false;
                            botao.textContent = "Confirmar pagamento";
                            return;
                        }

                        const { error: erroPagamento } = await supabase
                            .from("payments")
                            .update({ status: "confirmado" })
                            .eq("id", pagamento.id)
                            .eq("status", "pendente");

                        if (erroPagamento) {
                            alert("Erro ao actualizar pagamento: " + erroPagamento.message);
                            botao.disabled = false;
                            botao.textContent = "Confirmar pagamento";
                            return;
                        }

                        alert("Pagamento confirmado!");
                        btnPagamentos.click();

                    });

                    item.appendChild(botao);
                }

                area.appendChild(item);

            });

        });
    }

    // GESTÃO DE ALUNOS

    const btnAlunos = document.getElementById("gerir-alunos");

    if (btnAlunos) {
        btnAlunos.addEventListener("click", function () {
            alert("A gestão de alunos será disponibilizada numa próxima versão.");
        });
    }

    // GESTÃO DE AULAS

    const btnAulas = document.getElementById("gerir-aulas");

    if (btnAulas) {
        btnAulas.addEventListener("click", function () {
            alert("A gestão de aulas será disponibilizada numa próxima versão.");
        });
    }

    // ADICIONAR CONTEÚDOS

    const btnConteudo = document.getElementById("adicionar-conteudo");

    if (btnConteudo) {
        btnConteudo.addEventListener("click", function () {
            alert("A publicação de conteúdos será disponibilizada numa próxima versão.");
        });
    }

});
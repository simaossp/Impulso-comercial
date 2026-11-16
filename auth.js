// ==========================================
// IMPULSO COMERCIAL
// SISTEMA CENTRAL DE AUTENTICAÇÃO
// ==========================================

// REGISTAR NOVO ALUNO

async function registarUtilizador(nome, telefone, email, password) {

    const supabase = getSupabase();

    if (!supabase) {
        throw new Error("Supabase não está configurado.");
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                nome,
                telefone
            }
        }
    });

    if (error) throw error;

    return data;
}


// ENTRAR NA CONTA

async function entrarUtilizador(email, password) {

    const supabase = getSupabase();

    if (!supabase) {
        throw new Error("Supabase não está configurado.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw error;

    return data;
}


// TERMINAR SESSÃO

async function terminarSessao() {

    const supabase = getSupabase();

    if (!supabase) return;

    const { error } = await supabase.auth.signOut();

    if (error) {
        alert("Não foi possível terminar a sessão.");
        return;
    }

    window.location.href = "login.html";
}


// OBTER UTILIZADOR ACTUAL

async function obterUtilizadorActual() {

    const supabase = getSupabase();

    if (!supabase) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) return null;

    return data.user;
}


// VERIFICAR ACESSO À PÁGINA

async function verificarAcesso(pagina) {

    const supabase = getSupabase();

    if (!supabase) {
        alert("Não foi possível ligar ao sistema. Tenta novamente.");
        window.location.href = "login.html";
        return;
    }

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
        window.location.href = "login.html";
        return;
    }

    if (pagina === "admin.html") {

        const { data: perfil, error: erroPerfil } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.user.id)
            .single();

        if (erroPerfil || !perfil || perfil.role !== "admin") {
            alert("Não tens autorização para aceder ao painel.");
            window.location.href = "aluno.html";
            return;
        }
    }
}


// ==========================================
// FORMULÁRIOS E PROTECÇÃO DAS PÁGINAS
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // REGISTO

    const formRegisto = document.getElementById("form-registo");

    if (formRegisto) {

        formRegisto.addEventListener("submit", async function(event) {

            event.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const telefone = document.getElementById("telefone").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirmar = document.getElementById("confirmar-password").value;

            if (password !== confirmar) {
                alert("As palavras-passe não coincidem.");
                return;
            }

            try {

                await registarUtilizador(nome, telefone, email, password);

                alert("Registo enviado! Verifica o teu email para confirmar a conta.");

                formRegisto.reset();

            } catch (error) {

                alert("Erro no registo: " + error.message);

            }
        });
    }


    // LOGIN

    const formLogin = document.getElementById("form-login");

    if (formLogin) {

        formLogin.addEventListener("submit", async function(event) {

            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            try {

                await entrarUtilizador(email, password);

                window.location.href = "aluno.html";

            } catch (error) {

                alert("Erro ao entrar: " + error.message);

            }
        });
    }


    // PROTECÇÃO DAS PÁGINAS

    const caminho = window.location.pathname;
    const pagina = caminho.split("/").pop();

    const paginasProtegidas = [
        "aluno.html",
        "aulas.html",
        "cursos.html",
        "detalhes-curso.html",
        "checkout.html",
        "admin.html"
    ];

    if (paginasProtegidas.includes(pagina)) {
        verificarAcesso(pagina);
    }

});

console.log("Sistema central de autenticação carregado.");
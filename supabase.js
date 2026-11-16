// ======================================
// CONFIGURAÇÃO DO SUPABASE
// ======================================

const SUPABASE_CONFIG = {
    url: "https://arjmxcniuffjyiorksty.supabase.co",
    anonKey: "sb_publishable_0wlPEBWgS9sXKH_ptTMsnQ_CHDf-NWC"
};

// ======================================
// LIGAÇÃO À BASE DE DADOS
// ======================================

let supabaseClient = null;

function initializeSupabase() {

    if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
        console.warn("Supabase ainda não configurado.");
        return null;
    }

    if (!window.supabase) {
        console.error("Biblioteca Supabase não encontrada.");
        return null;
    }

    try {
        supabaseClient = window.supabase.createClient(
            SUPABASE_CONFIG.url,
            SUPABASE_CONFIG.anonKey
        );

        console.log("Supabase ligado com sucesso.");

        return supabaseClient;

    } catch (error) {
        console.error("Erro ao ligar ao Supabase:", error);
        return null;
    }
}

// ======================================
// OBTER A LIGAÇÃO
// ======================================

function getSupabase() {
    if (!supabaseClient) {
        return initializeSupabase();
    }

    return supabaseClient;
}

console.log("Módulo Supabase carregado.");
// ==========================================
// IMPULSO COMERCIAL
// BASE CENTRAL DE FORMAÇÕES
// ==========================================

const IMPULSO_COURSES = {

    importacao: {
        id: "importacao",
        name: "Importação Profissional",
        price: 737,
        currency: "MT",

        description: "Aprende a importar produtos do mercado internacional, encontrar fornecedores, realizar pagamentos e preparar os teus produtos para comercialização.",

        modules: [
            "Introdução à importação",
            "Plataformas internacionais",
            "Pesquisa de produtos",
            "Avaliação de fornecedores e prevenção de burlas",
            "Pagamentos internacionais",
            "Logística e transporte",
            "Marketing e estratégias de vendas"
        ],

        benefits: [
            "Conhecimentos práticos de importação.",
            "Orientação sobre pagamentos internacionais.",
            "Conhecimentos de marketing e vendas.",
            "Aprendizagem orientada para negócios."
        ]
    },

    cartao: {
        id: "cartao",
        name: "Cartão Virtual",
        price: 375,
        currency: "MT",

        description: "Aprende a criar e utilizar um cartão virtual para efectuar pagamentos em plataformas e serviços internacionais através de M-Pesa e e-Mola.",

        modules: [
            "Introdução aos cartões virtuais",
            "Criação da conta",
            "Configuração do cartão virtual",
            "Utilização de M-Pesa e e-Mola",
            "Pagamentos internacionais"
        ],

        benefits: [
            "Aprender a utilizar pagamentos internacionais.",
            "Conhecer o processo de criação do cartão.",
            "Orientação prática durante a aprendizagem."
        ]
    },

    marketing: {
        id: "marketing",
        name: "Marketing Digital",
        price: 400,
        currency: "MT",

        description: "Desenvolve competências para promover produtos e serviços na internet, alcançar potenciais clientes e construir oportunidades de negócio.",

        modules: [
            "Fundamentos do marketing digital",
            "Divulgação de produtos nas redes sociais",
            "Criação de anúncios digitais",
            "Captação de potenciais clientes",
            "Estratégias de comunicação e vendas"
        ],

        benefits: [
            "Conhecimentos de divulgação online.",
            "Estratégias para atrair clientes.",
            "Desenvolvimento de competências comerciais."
        ]
    }

};


// ==========================================
// OBTER UMA FORMAÇÃO
// ==========================================

function obterCurso(id) {
    return IMPULSO_COURSES[id] || null;
}


// ==========================================
// OBTER TODAS AS FORMAÇÕES
// ==========================================

function obterTodosCursos() {
    return Object.values(IMPULSO_COURSES);
}


// ==========================================
// FORMATAR PREÇO
// ==========================================

function formatarPreco(preco) {
    return preco.toLocaleString("pt-PT") + " MT";
}


console.log("Base de formações carregada.");
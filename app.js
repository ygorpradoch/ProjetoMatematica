// Inputs
const inputA = document.getElementById('setA');
const inputB = document.getElementById('setB');

// Botões
const btnUniao = document.getElementById('btn-uniao');
const btnIntersecao = document.getElementById('btn-intersecao');
const btnDiffAB = document.getElementById('btn-diff-ab');
const btnDiffBA = document.getElementById('btn-diff-ba');

// Área de Resultado
const resultadoEl = document.getElementById('resultado-final');


/* * ========================================
 * Funções Auxiliares
 * (Pequenas funções para ajudar a não repetir código)
 * ========================================
 */

/**
 * Função 1: Processar o Input do Usuário
 * Pega o texto (ex: "1, 2, 3") e transforma em um Conjunto (Set)
 * O Set é um objeto especial do JS que NÃO permite itens duplicados.
 */
function processarInput(textarea) {
    const texto = textarea.value; // Pega o valor (ex: "1, 2, 3")
    
    // 1. Divide o texto onde houver vírgula
    const arrayDeItens = texto.split(','); // Resultado: ["1", " 2", " 3"]

    const arrayLimpo = [];
    
    // 2. "Limpa" cada item (tira espaços em branco)
    for (const item of arrayDeItens) {
        const itemLimpo = item.trim(); // Tira espaços (ex: " 2" vira "2")
        
        // 3. Ignora itens vazios (se o usuário digitar "1,,2")
        if (itemLimpo.length > 0) {
            arrayLimpo.push(itemLimpo);
        }
    }
    
    // 4. Cria o Conjunto (o Set já remove duplicados automaticamente)
    return new Set(arrayLimpo); 
}

/**
 * Função 2: Mostrar o resultado na tela
 * Pega um Conjunto (Set) e formata para (ex: "{ 1, 2, 3 }")
 */
function mostrarResultado(conjunto) {
    // 1. Converte o Set de volta para um Array
    const arrayDoConjunto = Array.from(conjunto);
    
    // 2. Junta os itens do array com uma vírgula e espaço
    const textoDoConjunto = arrayDoConjunto.join(', '); // Resultado: "1, 2, 3"
    
    // 3. Coloca o texto formatado dentro do <pre> no HTML
    if (textoDoConjunto.length === 0) {
        resultadoEl.textContent = "{ }"; // Mostra conjunto vazio
    } else {
        resultadoEl.textContent = "{ " + textoDoConjunto + " }";
    }
}


/* * ========================================
 * PASSO 2: "Ouvir" os cliques nos botões
 * (Adicionar Event Listeners)
 * ========================================
 */

// --- BOTÃO 1: UNIÃO (A ∪ B) ---
// A União são TODOS os elementos de A + TODOS os elementos de B, sem repetir.
btnUniao.addEventListener('click', function() {
    // 1. Pega os valores e transforma em Sets
    const setA = processarInput(inputA);
    const setB = processarInput(inputB);
    
    // 2. Cria o conjunto de união
    // Começa criando um clone do SetA
    const uniao = new Set(setA);
    
    // Adiciona cada item do SetB no novo conjunto
    // O 'Set' ignora automaticamente se o item já existir
    for (const item of setB) {
        uniao.add(item);
    }
    
    // 3. Mostra na tela
    mostrarResultado(uniao);
});


// --- BOTÃO 2: INTERSEÇÃO (A ∩ B) ---
// A Interseção são apenas os elementos que existem em A E TAMBÉM em B.
btnIntersecao.addEventListener('click', function() {
    // 1. Pega os valores e transforma em Sets
    const setA = processarInput(inputA);
    const setB = processarInput(inputB);

    // 2. Cria o conjunto de interseção
    const intersecao = new Set();
    
    // Olha cada item do SetA
    for (const item of setA) {
        // Verifica: "O SetB TEM (has) esse item?"
        if (setB.has(item)) {
            intersecao.add(item); // Se sim, adiciona no resultado
        }
    }
    
    // 3. Mostra na tela
    mostrarResultado(intersecao);
});


// --- BOTÃO 3: DIFERENÇA (A - B) ---
// A Diferença (A - B) são os elementos que existem em A, MAS NÃO existem em B.
btnDiffAB.addEventListener('click', function() {
    // 1. Pega os valores e transforma em Sets
    const setA = processarInput(inputA);
    const setB = processarInput(inputB);

    // 2. Cria o conjunto de diferença
    const diferencaAB = new Set();
    
    // Olha cada item do SetA
    for (const item of setA) {
        // Verifica: "O SetB NÃO TEM (has) esse item?"
        // (Note o "!" que significa "NÃO")
        if (!setB.has(item)) {
            diferencaAB.add(item); // Se não tiver, adiciona no resultado
        }
    }
    
    // 3. Mostra na tela
    mostrarResultado(diferencaAB);
});


// --- BOTÃO 4: DIFERENÇA (B - A) ---
// A Diferença (B - A) são os elementos que existem em B, MAS NÃO existem em A.
btnDiffBA.addEventListener('click', function() {
    // 1. Pega os valores e transforma em Sets
    const setA = processarInput(inputA);
    const setB = processarInput(inputB);

    // 2. Cria o conjunto de diferença
    const diferencaBA = new Set();
    
    // Olha cada item do SetB (diferente da função anterior)
    for (const item of setB) {
        // Verifica: "O SetA NÃO TEM (has) esse item?"
        if (!setA.has(item)) {
            diferencaBA.add(item); // Se não tiver, adiciona no resultado
        }
    }
    
    // 3. Mostra na tela
    mostrarResultado(diferencaBA);
});

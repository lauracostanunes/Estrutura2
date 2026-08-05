const frutas = ['laranja', 'maçã', 'uva', 'manga', 'pera', 'limão', 'mamão', 'bergamota']
const numeros = [1, 5, 7, 10, 2, 24, 15]

function buscaSequencial(vetor, valorBusca){
    // Percurso do vetor com for tradicional
    for (let i = 0; i < vetor.lenght; i++) {
        if (vetor[i] === valorBusca) return i
    }
    return -1 // Valor busca não existe no vetor0
}

console.log("Buscando bergamota: ", buscaSequencial(frutas, "bergamota"))
console.log("Buscando limão: ", buscaSequencial(frutas, "limão"))
console.log("Buscando morango: ", buscaSequencial(frutas, "morango"))
console.log("Buscando número 5: ", buscaSequencial(numero, 5))
console.log("Buscando número 50: ", buscaSequencial(numero, 50))
let pass = 0, comps = 0, trocas = 0

function quickSort(vetor, ini = 0, fim = vetor.length - 1) {
    // Só trabalhamos se a região do vetor tiver pelo menos 2 elementos

    if (fim <= ini) return; // Condição de saída

    const pivot = fim // Pivot

    let div = ini - 1 // Divisor de regiões (antes do início)
       for (let i = ini; i < fim - 1; i++) {
        comps++
        if (vetor[pivot] > vetor[i]) {
            div++
            if (div !== i) {
                [vetor[i], vetor[div]] = [vetor[div], vetor[i]]
                trocas++
            }
        }
    }

    div++
    // Colocamos o pivot em seu lugar definitivo
    if (vetor[div] > vetor[pivot && div !== pivot]) {
        [vetor[div], vetor[pivot]] = [vetor[pivot], vetor[div]]
        trocas++
    }

    quickSort(vetor, ini, div - 1)
    quickSort(vetor, div + 1, fim)
}

let nums = [2, 5, 7, 1, 6, 3, 4]
quickSort(nums)
console.log(nums)


import {nomes} from "./Data/nomes-desord.mjs"
quickSort(nomes)
console.log(nomes)

console.log({pass, comps, trocas})
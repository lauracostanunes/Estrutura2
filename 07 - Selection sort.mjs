let pass, comps, trocas

function selectionSort (vetor) {
    pass = 0; comps = 0; trocas = 0;
    for(let posSel = 0; posSel < vetor.length; posSel++) {
        pass++
        let posMenor = posSel + 1

        for(let i = posMenor +1; i < vetor.length; i++) {
            if (vetor[posMenor] > vetor[i]) posMenor = i
            comps++
        }

        comps++
        if (vetor[posSel] > vetor[posMenor]) {
            [vetor[posSel], vetor[posMenor]] = [vetor[posMenor], vetor[posSel]]
            trocas++
        }
    }
}

/* let nums = [77, 44, 22, 33, 99, 55, 88, 66, 11, 0]

selectSort(nums)
console.log(nums)
*/

import {nomes} from "./Data/nomes-desord.mjs"

selectionSort(nomes)
console.log(nomes)

console.log(pass, comps, trocas)
function buscaSequencial(vetor, fnComp) {
    for (let i = 0; i < vetor.length; i++) {
        if(fnComp(vetor[i])) return i
    }
    return -1
}

function comparaNome(obj) {
    return obj.first_name === "LAURA"
}

import {objNomes} from './Data/vetor-obj-nomes.mjs'

console.log ("Posição de Laura: ", buscaSequencial (objNomes, comparaNome));


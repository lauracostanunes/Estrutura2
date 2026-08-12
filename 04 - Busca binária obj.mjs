import {objNomes} from "./data/E.D.UniFacef.2026.2.CC.SI/data/vetor-obj-nomes.mjs"

function buscaBinaria(vetor, fnComp){
    let ini = 0
    let fim = vetor.length - 1

    let meio = Math.floor((ini + fim)/2)

    while(fim >= ini){
        switch(fnComp(vetor[meio])){
            case 0:
                return meio

            case 1:
                return meio + 1
                break
            
            default:
                fim = meio - 1
                    
        }
    }
    return -1
}

console.log("posiçãode first_name=ALEXANDRE")
buscaBinaria(objNomes, (valorMeio, valorBusca = 
    "ALEXANDRE") => {
        if(valorBusca === valorMeio.first_name) return 0
        else if(valorBusca > valorMeio.first_name) return 1
        else return -1
    })

// function compara(valorMeio, valorBusca = "ALEXANDRE"){
//     if(valorBusca === valorMeio.first_name) return 0
//     else if(valorBusca > valorMeio.first_name) return 1
//     else return -1
// }



// console.log("Posição de first_name=ALEXANDRE", buscaBinaria(objNomes, compara))

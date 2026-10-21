import BinarySearchTree from "./lib/BinarySearchTree.mjs";

const arvore = new BinarySearchTree()

arvore.insert(48)
arvore.insert(71)
arvore.insert(15)
arvore.insert(29)
arvore.insert(57)
arvore.insert(1)
arvore.insert(80)
arvore.insert(14)
arvore.insert(19)
arvore.insert(37)
arvore.insert(23)
arvore.insert(21)
arvore.insert(25)
arvore.insert(51)
arvore.insert(64)

// Percurso em ordem
let percursoIN = []
arvore.inOrderTraversal(val => percursoIN.push(val))
console.log('Percurso em ordem:', percursoIN)

// Percurso pré-ordem
let percursoPRE = []
arvore.preOrderTraversal(val => percursoPRE.push(val))
console.log('Percurso pré-ordem:', percursoPRE)

// Percurso pós-ordem
let percursoPOS = []
arvore.postOrderTraversal(val => percursoPOS.push(val))
console.log('Percurso pós-ordem:', percursoPOS)

// Testes de remoção
let percursoREM = []
arvore.inOrderTraversal(val => percursoREM.push(val))
console.log('Percurso em ordem antes das remoções:', percursoREM)

// Remoção de um nodo de grau zero
arvore.remove(64)
percursoREM = []
arvore.inOrderTraversal(val => percursoREM.push(val))
console.log('Percurso em ordem após remoção do 64:', percursoREM)

// Remoção de um nodo de grau um
arvore.remove(1)
percursoREM = []
arvore.inOrderTraversal(val => percursoREM.push(val))
console.log('Percurso em ordem após remoção do 1:', percursoREM)

// Remoção de um nodo de grau dois
arvore.remove(15)
percursoREM = []
arvore.inOrderTraversal(val => percursoREM.push(val))
console.log('Percurso em ordem após remoção do 15:', percursoREM)

// Remoção da raiz
arvore.remove(48)
percursoREM = []
arvore.inOrderTraversal(val => percursoREM.push(val))
console.log('Percurso em ordem após remoção do 48:', percursoREM)

// Para descobrir a nova raiz
percursoREM = []
arvore.preOrderTraversal(val => percursoREM.push(val))
console.log(`A nova raiz é: ${percursoREM[0]}`)
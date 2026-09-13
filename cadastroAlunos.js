const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function perguntar(texto) {
  return new Promise((resolve) => rl.question(texto, resolve));
}

let alunos = [];

function calcularResultado(media) {
  return media >= 6.0 ? "Aprovado" : "Reprovado";
}

function bubbleSort(lista, comparar) {
  const arr = lista.slice(); // cópia, não modifica o original
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let trocou = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (comparar(arr[j], arr[j + 1]) > 0) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        trocou = true;
      }
    }
    if (!trocou) break; // já está ordenado, encerra antes
  }
  return arr;
}

function selectionSort(lista, comparar) {
  const arr = lista.slice();
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let indiceEscolhido = i;
    for (let j = i + 1; j < n; j++) {
      if (comparar(arr[j], arr[indiceEscolhido]) < 0) {
        indiceEscolhido = j;
      }
    }
    if (indiceEscolhido !== i) {
      const tmp = arr[i];
      arr[i] = arr[indiceEscolhido];
      arr[indiceEscolhido] = tmp;
    }
  }
  return arr;
}

function mergeSort(lista, comparar) {
  if (lista.length <= 1) return lista.slice();

  const meio = Math.floor(lista.length / 2);
  const esquerda = mergeSort(lista.slice(0, meio), comparar);
  const direita = mergeSort(lista.slice(meio), comparar);

  return intercalar(esquerda, direita, comparar);
}

function intercalar(esquerda, direita, comparar) {
  const resultado = [];
  let i = 0, j = 0;
  while (i < esquerda.length && j < direita.length) {
    if (comparar(esquerda[i], direita[j]) <= 0) {
      resultado.push(esquerda[i]);
      i++;
    } else {
      resultado.push(direita[j]);
      j++;
    }
  }
  while (i < esquerda.length) { resultado.push(esquerda[i]); i++; }
  while (j < direita.length) { resultado.push(direita[j]); j++; }
  return resultado;
}

function compararPorNomeAsc(a, b) {
  return a.nome.localeCompare(b.nome, "pt-BR", { sensitivity: "base" });
}
function compararPorRADesc(a, b) {
  return b.ra - a.ra;
}
function compararPorRAAsc(a, b) {
  return a.ra - b.ra;
}

function buscaSequencial(lista, ra, mostrarPassos) {
  for (let i = 0; i < lista.length; i++) {
    if (mostrarPassos) {
      console.log(`  comparando posição ${i} (RA ${lista[i].ra}) com RA ${ra}`);
    }
    if (lista[i].ra === ra) {
      if (mostrarPassos) console.log(`  encontrado na posição ${i}`);
      return lista[i];
    }
  }
  if (mostrarPassos) console.log("  RA não encontrado após percorrer todo o array");
  return null;
}

function buscaBinaria(listaOrdenada, ra, mostrarPassos) {
  let inicio = 0;
  let fim = listaOrdenada.length - 1;
  while (inicio <= fim) {
    const meio = Math.floor((inicio + fim) / 2);
    const atual = listaOrdenada[meio];
    if (mostrarPassos) {
      console.log(`  analisando intervalo [${inicio}..${fim}] -> posição ${meio} (RA ${atual.ra})`);
    }
    if (atual.ra === ra) {
      if (mostrarPassos) console.log(`  encontrado na posição ${meio}`);
      return atual;
    } else if (atual.ra < ra) {
      if (mostrarPassos) console.log(`  RA ${atual.ra} < ${ra} -> buscar na metade direita`);
      inicio = meio + 1;
    } else {
      if (mostrarPassos) console.log(`  RA ${atual.ra} > ${ra} -> buscar na metade esquerda`);
      fim = meio - 1;
    }
  }
  if (mostrarPassos) console.log("  RA não encontrado");
  return null;
}

function nomeSexo(sexo) {
  return { M: "Masculino", F: "Feminino", O: "Outro" }[sexo] || sexo;
}

function imprimirTabela(lista) {
  if (lista.length === 0) {
    console.log("\n(nenhum aluno para exibir)\n");
    return;
  }
  const linhas = lista.map(a => ({
    Nome: a.nome,
    RA: a.ra,
    Idade: a.idade,
    Sexo: nomeSexo(a.sexo),
    Média: a.media.toFixed(1),
    Resultado: a.resultado
  }));
  console.log("");
  console.table(linhas);
}

async function cadastrarAluno() {
  console.log("\n--- Cadastrar Aluno ---");
  const nome = (await perguntar("Nome: ")).trim();
  const raTexto = await perguntar("RA: ");
  const idadeTexto = await perguntar("Idade: ");
  const sexo = (await perguntar("Sexo (M/F/O): ")).trim().toUpperCase();
  const mediaTexto = await perguntar("Média (0 a 10): ");

  const ra = parseInt(raTexto, 10);
  const idade = parseInt(idadeTexto, 10);
  const media = parseFloat(mediaTexto);

  if (!nome || isNaN(ra) || isNaN(idade) || !["M", "F", "O"].includes(sexo) || isNaN(media)) {
    console.log("\n[ERRO] Dados inválidos. Verifique os campos e tente novamente.\n");
    return;
  }
  if (media < 0 || media > 10) {
    console.log("\n[ERRO] A média deve estar entre 0 e 10.\n");
    return;
  }
  if (buscaSequencial(alunos, ra, false)) {
    console.log(`\n[ERRO] Já existe um aluno cadastrado com o RA ${ra}.\n`);
    return;
  }

  alunos.push({
    nome,
    ra,
    idade,
    sexo,
    media,
    resultado: calcularResultado(media)
  });

  console.log(`\n[OK] Aluno "${nome}" cadastrado com sucesso.\n`);
}

function relatorioNomeAsc() {
  console.log("\n--- Relatório: Alunos em ordem crescente por Nome (bubble sort) ---");
  imprimirTabela(bubbleSort(alunos, compararPorNomeAsc));
}

function relatorioRADesc() {
  console.log("\n--- Relatório: Alunos em ordem decrescente por RA (selection sort) ---");
  imprimirTabela(selectionSort(alunos, compararPorRADesc));
}

function relatorioAprovados() {
  console.log("\n--- Relatório: Aprovados em ordem crescente por Nome (merge sort) ---");
  const aprovados = alunos.filter(a => a.resultado === "Aprovado");
  imprimirTabela(mergeSort(aprovados, compararPorNomeAsc));
}

async function buscarAlunoPorRA() {
  console.log("\n--- Buscar Aluno por RA ---");
  const raTexto = await perguntar("RA a buscar: ");
  const ra = parseInt(raTexto, 10);
  if (isNaN(ra)) {
    console.log("\n[ERRO] RA inválido.\n");
    return;
  }
  const tipo = (await perguntar("Tipo de busca (1 = sequencial, 2 = binária): ")).trim();

  let encontrado;
  if (tipo === "2") {
    console.log("\nOrdenando por RA (selection sort) antes da busca binária...");
    const ordenados = selectionSort(alunos, compararPorRAAsc);
    console.log("Executando busca binária:");
    encontrado = buscaBinaria(ordenados, ra, true);
  } else {
    console.log("Executando busca sequencial:");
    encontrado = buscaSequencial(alunos, ra, true);
  }

  if (encontrado) {
    console.log("\nAluno encontrado:");
    imprimirTabela([encontrado]);
  } else {
    console.log("\n(nenhum aluno encontrado com esse RA)\n");
  }
}

function imprimirMenu() {
  console.log("\n=====================================================");
  console.log(" CADASTRO DE ALUNOS - ESTRUTURA DE DADOS II");
  console.log("=====================================================");
  console.log(`Alunos cadastrados: ${alunos.length}`);
  console.log("1 - Cadastrar Alunos");
  console.log("2 - Relatório de Alunos em ordem crescente por Nome");
  console.log("3 - Relatório de Alunos em ordem decrescente por RA");
  console.log("4 - Relatório de Alunos em ordem crescente por Nome, apenas Aprovados");
  console.log("5 - Buscar Aluno por RA (sequencial / binária)");
  console.log("0 - Sair");
}

async function main() {
  let sair = false;
  while (!sair) {
    imprimirMenu();
    const opcao = (await perguntar("\nEscolha uma opção: ")).trim();

    switch (opcao) {
      case "1":
        await cadastrarAluno();
        break;
      case "2":
        relatorioNomeAsc();
        break;
      case "3":
        relatorioRADesc();
        break;
      case "4":
        relatorioAprovados();
        break;
      case "5":
        await buscarAlunoPorRA();
        break;
      case "0":
        sair = true;
        break;
      default:
        console.log("\n[ERRO] Opção inválida.\n");
    }
  }

  console.log("\nEncerrando o programa. Até mais!");
  rl.close();
}

main();
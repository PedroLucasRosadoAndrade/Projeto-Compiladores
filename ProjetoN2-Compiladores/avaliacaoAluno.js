const readline = require("readline");

function truncarNota(valor) {
    return Math.trunc(valor * 10) / 10;
}

function avaliarAluno(n1, n2) {
    const notaFinal = Math.round((n1 + n2) * 10) / 10;
    let situacao;

    if (notaFinal < 0.0 || notaFinal > 10.0) {
        situacao = "Nota inválida.";
    } else if (notaFinal < 4.0) {
        situacao = "Reprovado.";
    } else if (notaFinal < 7.0) {
        situacao = "Recuperação.";
    } else {
        situacao = "Aprovado.";
    }

    return { notaFinal, situacao };
}

function perguntar(rl, texto) {
    return new Promise((resolve) => {
        rl.question(texto, (resposta) => resolve(resposta));
    });
}

async function lerNota(rl, mensagem) {
    let entrada = await perguntar(rl, mensagem);
    let nota = parseFloat(entrada.replace(",", "."));

    while (isNaN(nota) || nota < 0.0 || nota > 10.0) {
        entrada = await perguntar(rl, "Nota inválida. Por favor, digite novamente: ");
        nota = parseFloat(entrada.replace(",", "."));
    }

    return truncarNota(nota);
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let continuar = "S";

    while (continuar.trim().toUpperCase() === "S") {
        const nome = await perguntar(rl, "Informe o nome do aluno(a): ");
        const n1 = await lerNota(rl, "Informe a nota N1: ");
        const n2 = await lerNota(rl, "Informe a nota N2: ");

        const { notaFinal, situacao } = avaliarAluno(n1, n2);

        console.log(`\nNome do aluno(a): ${nome}`);
        console.log(`N1: ${n1.toFixed(1)}`);
        console.log(`N2: ${n2.toFixed(1)}`);
        console.log(`Nota final: ${notaFinal.toFixed(1)}`);
        console.log(`Situação: ${situacao}`);

        continuar = await perguntar(
            rl,
            'Deseja continuar consultando notas? (Clique "S" para continuar): '
        );
        console.log();
    }

    rl.close();
}

if (require.main === module) {
    main();
}

module.exports = { avaliarAluno, truncarNota };
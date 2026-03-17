let vendas = [];
let idAtual = 1;

class Venda {
    constructor(vendedor, valor) {
        this.id = idAtual++;
        this.vendedor = vendedor;
        this.valor = valor;
        this.desconto = valor * 0.10;
        this.total = valor - this.desconto;
        this.data = new Date().toLocaleString();
    }
}

const obterValorInput = (id) => document.getElementById(id).value;

const limparCampos = () => {
    document.getElementById("vendedor").value = "";
    document.getElementById("valor").value = "";
};

const cadastrarVenda = () => {
    const nome = obterValorInput("vendedor").trim();
    const valor = parseFloat(obterValorInput("valor"));

    if (!nome || isNaN(valor)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const novaVenda = new Venda(nome, valor);
    vendas.push(novaVenda);

    limparCampos();
    atualizarTabela();
};

const atualizarTabela = () => {
    const tabela = document.getElementById("tabela");
    tabela.innerHTML = "";

    if (vendas.length === 0) {
        tabela.innerHTML = "<tr><td colspan='7'>Nenhuma venda cadastrada</td></tr>";
        return;
    }

    vendas.forEach((venda, index) => {
        const linha = `
            <tr>
                <td>${venda.id}</td>
                <td>${venda.vendedor}</td>
                <td>R$ ${venda.valor.toFixed(2)}</td>
                <td>R$ ${venda.desconto.toFixed(2)}</td>
                <td>R$ ${venda.total.toFixed(2)}</td>
                <td>${venda.data}</td>
                <td>
                    <button onclick="removerItem(${index})">Remover</button>
                </td>
            </tr>
        `;
        tabela.innerHTML += linha;
    });
};

const removerItem = (index) => {
    vendas.splice(index, 1);
    atualizarTabela();
};

const removerUltimo = () => {
    if (vendas.length === 0) {
        alert("Lista vazia!");
        return;
    }

    vendas.pop();
    atualizarTabela();
};

const limparTudo = () => {
    if (vendas.length === 0) {
        alert("Nada para limpar!");
        return;
    }

    vendas = [];
    atualizarTabela();
};
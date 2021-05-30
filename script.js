// Declarando constantes
const inputNome = document.querySelector('#nome');
const inputCategoria = document.querySelector('#categoria');
const inputQuantidade = document.querySelector('#quantidade');
const inputValor = document.querySelector('#valor');
const form = document.querySelector('form');
const tbody = document.querySelector('tbody');
const divAlert = document.querySelector('.div-alert');
const alert = document.querySelector('.alert');

// Ouvindo evento de submit
form.addEventListener('submit', (evento) => {
  evento.preventDefault();

  let objeto = {};
  objeto.nome = inputNome.value;
  objeto.categoria = inputCategoria.value;
  objeto.quantidade = inputQuantidade.value;
  objeto.valor = inputValor.value;
  objeto.total = objeto.quantidade * objeto.valor;

  //salvando o objeto no localstorage
  saveLocalStorage(objeto);

  //Chamando a função de criar tabela
  createTable();

  // Limpando campos de conteúdo
  inputNome.value = '';
  inputQuantidade.value = 1;
  inputValor.value = 1;
  inputCategoria.value = 1;

  //remove a classe d-none do alert e seta tempo de fechamento do alert
  alert.classList.remove('d-none');
  setTimeout(() => alert.classList.add('d-none'), 1000);
});

//função para filtrar produtos por categoria
function filtraCategoria() {
  var selectCategoria = document.getElementById('filterCategoria');
  table = document.getElementById('table-pedido');
  tr = table.getElementsByTagName('tbody')[0].rows;

  for (var i = 0; i < tr.length; i++) {
    categoria = tr[i].getElementsByTagName('td')[1];

    if (
      selectCategoria.value == '' ||
      categoria.textContent == selectCategoria.value
    ) {
      tr[i].style.display = '';
    } else {
      tr[i].style.display = 'none';
    }
  }
}

//função criar tabela
function createTable() {
  const limpar = document.querySelectorAll('tbody tr');
  limpar.forEach((item) => {
    item.remove();
  });
  let produtos = restoreLocalStorage();
  produtos.forEach(function (objeto, indice) {
    const tr = document.createElement('tr');
    const tdNome = document.createElement('td');
    const tdCategoria = document.createElement('td');
    const tdQuantidade = document.createElement('td');
    const tdValor = document.createElement('td');
    const tdTotal = document.createElement('td');
    // Criando botão de excluir
    const tdExcluir = document.createElement('td');
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.classList.add('btn', 'btn-danger');
    // Ouvindo evento de click
    btnExcluir.addEventListener('click', () => {
      tr.remove();
      deleteLocalStorage(indice);
    });
    tdExcluir.append(btnExcluir);

    // Pegando o valor de input dos elementos
    tdNome.textContent = objeto.nome;
    tdCategoria.textContent = objeto.categoria;
    tdQuantidade.textContent = objeto.quantidade;
    tdValor.textContent = objeto.valor;
    tdTotal.textContent = objeto.total;
    // Criação do evento de limpar conteúdo
    const btnLimpar = document.querySelector('#btnLimpar');
    btnLimpar.addEventListener('click', () => {
      const limpar = document.querySelectorAll('tbody tr');
      limpar.forEach((item) => {
        item.remove();
      });
      deleteAllLocalStorage();
    });

    // Inserindo elementos na tag referente a tabela
    tr.append(tdNome);
    tr.append(tdCategoria);
    tr.append(tdQuantidade);
    tr.append(tdValor);
    tr.append(tdTotal);
    tr.append(tdExcluir);
    // Inserindo conteúdo ao html
    tbody.append(tr);
  });
}

//Retornar o objeto do localstorage
function restoreLocalStorage() {
  let produtos;
  if (localStorage.getItem('produtos') === null) {
    produtos = [];
  } else {
    produtos = JSON.parse(localStorage.getItem('produtos'));
  }
  return produtos;
}

//Salvar objeto no localstorage
function saveLocalStorage(objeto) {
  let produtos = restoreLocalStorage();
  produtos.push(objeto);
  localStorage.setItem('produtos', JSON.stringify(produtos));
}

//Deletar item do localstorage
function deleteLocalStorage(indice) {
  let produtos = restoreLocalStorage();
  produtos.splice(indice, 1);
  localStorage.setItem('produtos', JSON.stringify(produtos));
}

//Apagar todo o localStorage
function deleteAllLocalStorage() {
  localStorage.clear();
}

//Chamando a função createTable no carregamento da página
document.addEventListener('DOMContentLoaded', createTable());

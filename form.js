const form = document.querySelector('form');
const tabelaCorpo = document.querySelector('table tbody');

// Função que adiciona uma linha na tabela
function adicionarLinha({ nome, email, fone, mensagem, idade, tipo }, index) {
  const novaLinha = document.createElement('tr');

  novaLinha.innerHTML = `
    <td contenteditable="true" data-col="nome">${nome}</td>
    <td contenteditable="true" data-col="email">${email}</td>
    <td contenteditable="true" data-col="fone">${fone}</td>
    <td contenteditable="true" data-col="mensagem">${mensagem}</td>
    <td contenteditable="true" data-col="idade">${idade}</td>
    <td contenteditable="true" data-col="tipo">${tipo}</td>
    <td><button class="btn-excluir">Excluir</button></td>
  `;

  // Atualiza localStorage ao editar
  novaLinha.querySelectorAll('td[data-col]').forEach(cell => {
    cell.addEventListener('blur', () => {
      const coluna = cell.dataset.col;
      const novosDados = JSON.parse(localStorage.getItem('contatos')) || [];
      novosDados[index][coluna] = cell.textContent.trim();
      localStorage.setItem('contatos', JSON.stringify(novosDados));
    });
  });
  function adicionarLinha({ nome, email, fone, mensagem, idade, tipo }, index) {
    const novaLinha = document.createElement('tr');
  
    novaLinha.innerHTML = `
      <td data-col="nome">${nome}</td>
      <td data-col="email">${email}</td>
      <td data-col="fone">${fone}</td>
      <td data-col="mensagem">${mensagem}</td>
      <td data-col="idade">${idade}</td>
      <td data-col="tipo">${tipo}</td>
      <td>
        <button class="btn-editar">Editar</button><br/>
        <button class="btn-excluir">Excluir</button>
      </td>
    `;
  
    const editarBtn = novaLinha.querySelector('.btn-editar');
    const excluirBtn = novaLinha.querySelector('.btn-excluir');
  
    // Ativar edição
    editarBtn.addEventListener('click', () => {
      const emEdicao = editarBtn.textContent === 'Salvar';
      const dados = JSON.parse(localStorage.getItem('contatos')) || [];
  
      novaLinha.querySelectorAll('td[data-col]').forEach(cell => {
        if (emEdicao) {
          // Salva novo conteúdo
          const col = cell.dataset.col;
          dados[index][col] = cell.textContent.trim();
          cell.setAttribute('contenteditable', 'false');
        } else {
          // Ativa edição
          cell.setAttribute('contenteditable', 'true');
          cell.focus();
        }
      });
  
      if (emEdicao) {
        // Salvar no localStorage
        localStorage.setItem('contatos', JSON.stringify(dados));
        editarBtn.textContent = 'Editar';
      } else {
        editarBtn.textContent = 'Salvar';
      }
    });
  
    // Excluir contato
    excluirBtn.addEventListener('click', () => {
      const dados = JSON.parse(localStorage.getItem('contatos')) || [];
      dados.splice(index, 1);
      localStorage.setItem('contatos', JSON.stringify(dados));
      tabelaCorpo.innerHTML = '';
      carregarDados();
    });
  
    tabelaCorpo.appendChild(novaLinha);
  }
  
  // Excluir a linha
  novaLinha.querySelector('.btn-excluir').addEventListener('click', () => {
    const dados = JSON.parse(localStorage.getItem('contatos')) || [];
    dados.splice(index, 1); // remove do array
    localStorage.setItem('contatos', JSON.stringify(dados));
    tabelaCorpo.innerHTML = ''; // limpa
    carregarDados(); // recarrega atualizado
  });

  tabelaCorpo.appendChild(novaLinha);
}

// Função para carregar os dados do localStorage
function carregarDados() {
  const dados = JSON.parse(localStorage.getItem('contatos')) || [];
  tabelaCorpo.innerHTML = ''; // limpa antes de carregar
  dados.forEach((contato, index) => {
    adicionarLinha(contato, index);
  });
}

// Evento de envio do formulário
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const contato = {
    nome: form.nome.value.trim(),
    email: form.email.value.trim(),
    fone: form.fone.value.trim(),
    mensagem: form.mensagem.value.trim(),
    idade: form.idade.value.trim(),
    tipo: form.tp_contato.value.trim()
  };

  if (!contato.nome || !contato.email) {
    alert('Por favor, preencha ao menos nome e email.');
    return;
  }

  const dados = JSON.parse(localStorage.getItem('contatos')) || [];
  dados.push(contato);
  localStorage.setItem('contatos', JSON.stringify(dados));

  carregarDados(); // recarrega a tabela com índice atualizado

  form.reset();
});

// Carrega os dados ao iniciar a página
carregarDados();

// Obter o elemento do carrinho
const cartContainer = document.querySelector(".cart-container");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");

// Função para adicionar um item ao carrinho
function adicionarAoCarrinho(produto) {
  // Obter o carrinho atual do LocalStorage
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Adiciona o produto ao array do carrinho
  carrinho.push(produto);

  // Salva o carrinho atualizado no LocalStorage
  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  // Atualiza o display do carrinho
  renderizarCarrinho();
}

// Função para renderizar o carrinho na tela
function renderizarCarrinho() {
  // Limpa o conteúdo do carrinho
  cartItems.innerHTML = '';

  // Obter os itens do LocalStorage
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Verifica se o carrinho está vazio
  if (carrinho.length === 0) {
    cartItems.innerHTML = '<p>Seu carrinho está vazio.</p>';
    cartTotal.textContent = 'Total: R$ 0,00';
    return;
  }

  // Percorre cada item do carrinho
  carrinho.forEach(item => {
    // Cria o elemento HTML para o item
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
      <div class="cart-item-info">
        <h3>${item.nome}</h3>
        <p class="cart-item-price">R$ ${item.preco.toFixed(2)}</p>
      </div>
    `;
    // Adiciona o elemento ao carrinho
    cartItems.appendChild(itemElement);
  });

  // Atualiza o total do carrinho
  atualizarTotal();
}

// Função para atualizar o total do carrinho
function atualizarTotal() {
  let total = 0;
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.forEach(item => {
    total += item.preco;
  });
  cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Adicionar evento de click aos botões "Adicionar ao Carrinho"
const botoesAdicionar = document.querySelectorAll(".carousel-item button");
botoesAdicionar.forEach(botao => {
  botao.addEventListener("click", () => {
    // Obter o ID do produto a partir do atributo "data-product-id"
    const produtoId = botao.dataset.productId;
    const produtoNome = botao.dataset.productName;
    const produtoPreco = parseFloat(botao.dataset.productPrice);

    // Obter o produto do HTML
    const produto = {
      nome: produtoNome,
      preco: produtoPreco
    };

    // Chama a função para adicionar ao carrinho
    adicionarAoCarrinho(produto);
  });
});

// Carregar o carrinho ao carregar a página
window.onload = function() {
  renderizarCarrinho();
};

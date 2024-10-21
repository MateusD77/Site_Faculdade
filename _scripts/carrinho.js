 // Obter os elementos HTML
const cartContainer = document.querySelector("#cart-items-container");
const cartTotal = document.querySelector("#cart-total");
const checkoutButton = document.querySelector("#checkout-button");

// Função para renderizar o carrinho na tela
function renderizarCarrinho() {
  // Limpa o conteúdo do carrinho
  cartContainer.innerHTML = '';

  // Obter os itens do LocalStorage
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  // Verifica se o carrinho está vazio
  if (carrinho.length === 0) {
    cartContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
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
    cartContainer.appendChild(itemElement);
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

// Carregar o carrinho ao carregar a página
window.onload = function() {
  renderizarCarrinho();
};

// Adicionar evento de click ao botão de checkout
checkoutButton.addEventListener("click", () => {
  alert("Finalizar Compra!");
  // Aqui você deve implementar a lógica de checkout
  // Por exemplo, enviar os dados do carrinho para um servidor.
  localStorage.removeItem("carrinho"); // Limpa o carrinho após finalizar a compra
  renderizarCarrinho(); // Atualiza a tela do carrinho
});

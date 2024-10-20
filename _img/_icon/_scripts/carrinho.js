        // Array para armazenar os itens do carrinho
        const carrinho = [];
 
        // Obter o elemento do carrinho
        const cartContainer = document.querySelector(".cart-container");
        const cartItems = document.querySelector("#cart-items");
        const cartTotal = document.querySelector("#cart-total");
 
        // Função para adicionar um item ao carrinho
        function adicionarAoCarrinho(produto) {
          // Adiciona o produto ao array do carrinho
          carrinho.push(produto);
          // Atualiza o display do carrinho
          renderizarCarrinho();
        }
 
        // Função para remover um item do carrinho
        function removerDoCarrinho(index) {
          // Remove o item do array
          carrinho.splice(index, 1);
          // Atualiza o display do carrinho
          renderizarCarrinho();
        }
 
        // Função para renderizar o carrinho na tela
        function renderizarCarrinho() {
          // Limpa o conteúdo do carrinho
          cartItems.innerHTML = '';
          // Percorre cada item do carrinho
          carrinho.forEach((item, index) => {
            // Cria o elemento HTML para o item
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
              <div class="cart-item-info">
                <h3>${item.nome}</h3>
                <p class="cart-item-price">R$ ${item.preco.toFixed(2)}</p>
              </div>
              <button class="remove-button" data-item-index="${index}">Remover</button>
            `;
            // Adiciona o elemento ao carrinho
            cartItems.appendChild(itemElement);
          });
          // Atualiza o total do carrinho
          atualizarTotal();
          // Adiciona evento de click aos botões "Remover"
          const removeButtons = document.querySelectorAll(".remove-button");
          removeButtons.forEach(button => {
            button.addEventListener("click", () => {
              const index = button.dataset.itemIndex;
              removerDoCarrinho(index);
            });
          });
        }
 
        // Função para atualizar o total do carrinho
        function atualizarTotal() {
          let total = 0;
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
 
            // Obter o produto do HTML (você precisará adaptar essa parte para sua lógica)
            const produto = {
              nome: produtoNome,
              preco: produtoPreco
            };
            // Chama a função para adicionar ao carrinho
            adicionarAoCarrinho(produto);
          });
        });
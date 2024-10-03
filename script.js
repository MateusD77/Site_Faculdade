// Seleciona os contêineres, trilhas, botões "anterior" e "próximo" do carrossel
const carouselContainers = document.querySelectorAll('.carousel-container');  // Seleciona todos os elementos com a classe 'carousel-container'
const carouselTracks = document.querySelectorAll('.carousel-track');  // Seleciona todos os elementos com a classe 'carousel-track'
const carouselPrevs = document.querySelectorAll('.carousel-prev');  // Seleciona todos os elementos com a classe 'carousel-prev'
const carouselNexts = document.querySelectorAll('.carousel-next');  // Seleciona todos os elementos com a classe 'carousel-next'

// Itera sobre cada contêiner do carrossel
carouselContainers.forEach((container, index) => {  // Itera sobre cada elemento 'carousel-container'
  // Obtém a trilha, o botão "anterior" e o botão "próximo" correspondentes ao contêiner atual
  const track = carouselTracks[index];  // Obtém o elemento 'carousel-track' correspondente
  const prev = carouselPrevs[index];  // Obtém o elemento 'carousel-prev' correspondente
  const next = carouselNexts[index];  // Obtém o elemento 'carousel-next' correspondente

  // Clona os itens da trilha para criar um looping contínuo
  const items = Array.from(track.children);  // Converte os elementos filhos de 'track' em um array
  const totalItems = items.length;  // Obtém o número total de itens
  items.forEach(item => {  // Itera sobre cada item
    const clone = item.cloneNode(true); // Cria um clone do item
    track.appendChild(clone); // Adiciona o clone à trilha
  });

  // Inicializa o índice do item atual
  let currentIndex = 0;  // Define o índice atual como 0

  // Calcula a largura do item (mostra 3 itens de cada vez)
  const itemWidth = container.offsetWidth / 3;  // Calcula a largura de cada item

  // Função para atualizar a posição do carrossel
  function updateCarousel() {  // Define a função 'updateCarousel' para atualizar a posição do carrossel
    // Calcula o deslocamento horizontal baseado no índice atual
    const offsetX = -currentIndex * itemWidth;  // Calcula o deslocamento horizontal

    // Define a transformação da trilha para deslocar os itens
    track.style.transform = `translateX(${offsetX}px)`;  // Aplica a transformação de deslocamento

    // Reinicia o índice quando atinge o ponto de reinício
    if (currentIndex >= totalItems) {  // Verifica se o índice atual é maior ou igual ao número total de itens
      currentIndex = 0; // Reinicia o índice
      track.style.transition = 'none'; // Remove a transição temporariamente para evitar um efeito estranho
      track.style.transform = `translateX(0)`; // Redefine a posição para o início

      // Restaura a transição após um breve atraso para garantir que o efeito de animação aconteça
      setTimeout(() => {  // Define um tempo limite para restaurar a transição
        track.style.transition = ''; // Restaura a transição
      }, 0);  // O atraso é de 0 milisegundos
    }
  }

  // Adiciona um evento de clique ao botão "anterior"
  prev.addEventListener('click', () => {  // Adiciona um evento de clique ao botão 'prev'
    currentIndex--; // Decrementa o índice atual

    // Garante que o índice fique dentro dos limites (looping infinito)
    if (currentIndex < 0) {  // Verifica se o índice atual é menor que 0
      currentIndex = totalItems - 1; // Volta para o último item original
    }

    // Atualiza a posição do carrossel
    updateCarousel();  // Chama a função 'updateCarousel' para atualizar a posição
  });

  // Adiciona um evento de clique ao botão "próximo"
  next.addEventListener('click', () => {  // Adiciona um evento de clique ao botão 'next'
    currentIndex++; // Incrementa o índice atual

    // Atualiza a posição do carrossel
    updateCarousel();  // Chama a função 'updateCarousel' para atualizar a posição
  });
});

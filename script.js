// Seleciona os contêineres, trilhas, botões "anterior" e "próximo" do carrossel
const carouselContainers = document.querySelectorAll('.carousel-container');
const carouselTracks = document.querySelectorAll('.carousel-track');
const carouselPrevs = document.querySelectorAll('.carousel-prev');
const carouselNexts = document.querySelectorAll('.carousel-next');

// Itera sobre cada contêiner do carrossel
carouselContainers.forEach((container, index) => {
  // Obtém a trilha, o botão "anterior" e o botão "próximo" correspondentes ao contêiner atual
  const track = carouselTracks[index];
  const prev = carouselPrevs[index];
  const next = carouselNexts[index];

  // Clona os itens da trilha para criar um looping contínuo
  const items = Array.from(track.children);
  const totalItems = items.length;
  items.forEach(item => {
    const clone = item.cloneNode(true); // Cria um clone do item
    track.appendChild(clone); // Adiciona o clone à trilha
  });

  // Inicializa o índice do item atual
  let currentIndex = 0;

  // Calcula a largura do item (mostra 3 itens de cada vez)
  const itemWidth = container.offsetWidth / 3;

  // Função para atualizar a posição do carrossel
  function updateCarousel() {
    // Calcula o deslocamento horizontal baseado no índice atual
    const offsetX = -currentIndex * itemWidth;

    // Define a transformação da trilha para deslocar os itens
    track.style.transform = `translateX(${offsetX}px)`;

    // Reinicia o índice quando atinge o ponto de reinício
    if (currentIndex >= totalItems) {
      currentIndex = 0; // Reinicia o índice
      track.style.transition = 'none'; // Remove a transição temporariamente para evitar um efeito estranho
      track.style.transform = `translateX(0)`; // Redefine a posição para o início

      // Restaura a transição após um breve atraso para garantir que o efeito de animação aconteça
      setTimeout(() => {
        track.style.transition = ''; // Restaura a transição
      }, 0);
    }
  }

  // Adiciona um evento de clique ao botão "anterior"
  prev.addEventListener('click', () => {
    currentIndex--; // Decrementa o índice atual

    // Garante que o índice fique dentro dos limites (looping infinito)
    if (currentIndex < 0) {
      currentIndex = totalItems - 1; // Volta para o último item original
    }

    // Atualiza a posição do carrossel
    updateCarousel();
  });

  // Adiciona um evento de clique ao botão "próximo"
  next.addEventListener('click', () => {
    currentIndex++; // Incrementa o índice atual

    // Atualiza a posição do carrossel
    updateCarousel();
  });
});

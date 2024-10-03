// Seleciona os contêineres, trilhas, botões "anterior" e "próximo" do carrossel
const carouselContainers = document.querySelectorAll('.carousel-container');
const carouselTracks = document.querySelectorAll('.carousel-track');
const carouselPrevs = document.querySelectorAll('.carousel-prev');
const carouselNexts = document.querySelectorAll('.carousel-next');

// Itera sobre cada contêiner do carrossel
carouselContainers.forEach((container, index) => {
  const track = carouselTracks[index];
  const prev = carouselPrevs[index];
  const next = carouselNexts[index];

  const initialTotalWidth = container.offsetWidth; // Calcula a largura total do contêiner
  var initialItems = Array.from(track.children); // Pega os itens reais do carrossel
  var initialSize = initialItems.length; // Quantidade de itens reais

  // Clona os itens para criar um looping contínuo (2x clones para cada lado)
  const clonesToAppend = 2;
  const clonesToTeleport = 1; // Define quando o teleporte ocorre

  for (let ix = 0; ix < clonesToAppend; ix++) {
    initialItems.forEach((item) => {
      const cloneBefore = item.cloneNode(true);
      const cloneAfter = item.cloneNode(true);
      track.appendChild(cloneAfter); // Adiciona o clone no final
      track.insertBefore(cloneBefore, initialItems[0]); // Adiciona o clone no início
    });
  }

  const allItems = Array.from(track.children); // Todos os itens, incluindo os clones
  const totalSize = allItems.length; // Tamanho total dos itens (reais + clones)
  const itemWidth = initialItems[0].offsetWidth; // Largura de cada item
  let currentIndex = initialSize*clonesToTeleport - 1; // Inicia o carrossel no primeiro item real

  // Função que move o carrossel
  function updateCarousel() {
    const offsetX = -(currentIndex * itemWidth); // Calcula a posição de deslocamento
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(${offsetX}px)`;

    // Verifica se atingiu os limites para teleportar (clones no início ou no fim)
    if (currentIndex > initialSize - 1 + (clonesToTeleport * initialSize)) {
      currentIndex = initialSize - 1;
      track.style.transition = 'transform 0.5s ease';
      track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
      setTimeout(() => {
        track.style.transition = 'none'; // Remove a transição
      }, 500);
    } else if (currentIndex < initialSize - 1 - (clonesToTeleport * initialSize)) {
      currentIndex = initialSize - 1; // Volta ao último item real
      track.style.transition = 'transform 0.5s ease';
      track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
      setTimeout(() => {
        track.style.transition = 'none'; // Remove a transição
      }, 500);
    }
  }

  // Adiciona evento ao botão "anterior" para mover o carrossel
  prev.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
  });

  // Adiciona evento ao botão "próximo" para mover o carrossel
  next.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
  });

  // Inicializa o carrossel na posição correta (primeiro item real)
  track.style.transform = `translateX(${-(currentIndex * itemWidth)}px)`;
});
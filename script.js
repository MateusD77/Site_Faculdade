const carouselContainers = document.querySelectorAll('.carousel-container');
const carouselTracks = document.querySelectorAll('.carousel-track');
const carouselPrevs = document.querySelectorAll('.carousel-prev');
const carouselNexts = document.querySelectorAll('.carousel-next');

carouselContainers.forEach((container, index) => {
  const track = carouselTracks[index];
  const prev = carouselPrevs[index];
  const next = carouselNexts[index];

  // Clona os itens para criar um looping contínuo
  const items = Array.from(track.children);
  const totalItems = items.length;
  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  let currentIndex = 0;
  const itemWidth = container.offsetWidth / 3; // Mostra 3 itens de cada vez

  function updateCarousel() {
    // Faz o looping infinito
    const offsetX = -currentIndex * itemWidth;
    track.style.transform = `translateX(${offsetX}px)`;

    // Resetar o índice quando atinge o ponto de reinício
    if (currentIndex >= totalItems) {
      currentIndex = 0; // Reinicia
      track.style.transition = 'none'; // Remove a transição para não ter um efeito estranho
      track.style.transform = `translateX(0)`;
      setTimeout(() => {
        track.style.transition = ''; // Restaura a transição
      }, 0);
    }
  }

  prev.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = totalItems - 1; // Volta para o último item original
    }
    updateCarousel();
  });

  next.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
  });
});

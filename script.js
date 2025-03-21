document.addEventListener('DOMContentLoaded', function () {
  // 1. Troca de imagens na galeria
  const thumbnails = document.querySelectorAll('.gallery-thumbnails img');
  const mainImages = document.querySelectorAll('.product-gallery img');

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', function () {
      const productGallery = this.closest('.product-details').querySelector('.product-gallery img');
      productGallery.src = this.src; // Troca a imagem principal pela miniatura clicada
    });
  });

  // 2. Modal de detalhes do produto
  const modal = document.createElement('div');
  modal.classList.add('modal');
  document.body.appendChild(modal);

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', function () {
      const imgSrc = this.src;
      modal.innerHTML = `<img src="${imgSrc}" alt="Modal Image" />`;
      modal.style.display = 'flex';
    });
  });

  modal.addEventListener('click', function () {
    modal.style.display = 'none';
  });
});
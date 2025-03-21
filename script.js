// Função principal que será executada quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function () {
  // 1. Troca de imagens na galeria
  setupGallery();

  // 2. Adicionar produtos ao carrinho
  setupAddToCart();

  // 3. Adicionar produtos à lista de desejos
  setupAddToWishlist();

  // 4. Barra de pesquisa
  setupSearch();

  // 5. Scroll suave para os produtos
  setupSmoothScroll();

  // 6. Modal de detalhes do produto
  setupModal();
});

// 1. Troca de imagens na galeria
function setupGallery() {
  const mainImages = document.querySelectorAll('.product-gallery img'); // Imagens principais
  const thumbnails = document.querySelectorAll('.gallery-thumbnails img'); // Miniaturas

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', function () {
      const productGallery = this.closest('.product-details').querySelector('.product-gallery img');
      productGallery.src = this.src; // Troca a imagem principal pela miniatura clicada
    });
  });
}

// 2. Adicionar produtos ao carrinho
function setupAddToCart() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const productName = this.closest('.product-info').querySelector('h2').innerText;
      alert(`"${productName}" foi adicionado ao carrinho!`);
      // Aqui você pode adicionar a lógica para adicionar o produto ao carrinho
    });
  });
}

// 3. Adicionar produtos à lista de desejos
function setupAddToWishlist() {
  const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');

  addToWishlistButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const productName = this.closest('.product-info').querySelector('h2').innerText;
      alert(`"${productName}" foi adicionado à lista de desejos!`);
      // Aqui você pode adicionar a lógica para adicionar o produto à lista de desejos
    });
  });
}

// 4. Barra de pesquisa
function setupSearch() {
  const searchInput = document.querySelector('.user-options input[type="text"]');
  const searchIcon = document.querySelector('.user-options .fa-search');

  searchIcon.addEventListener('click', function () {
    performSearch();
  });

  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  function performSearch() {
    const searchTerm = searchInput.value;
    if (searchTerm) {
      alert(`Você pesquisou por: "${searchTerm}"`);
      // Aqui você pode adicionar a lógica para filtrar os produtos
    }
  }
}

// 5. Scroll suave para os produtos
function setupSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav a');

  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// 6. Modal de detalhes do produto
function setupModal() {
  const thumbnails = document.querySelectorAll('.gallery-thumbnails img');
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
}
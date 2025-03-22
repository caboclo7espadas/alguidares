// Função para aumentar a quantidade
function increaseQuantity(id) {
    const quantityInput = document.getElementById(id);
    let currentValue = parseInt(quantityInput.value);

    // Define um limite máximo (opcional)
    const maxValue = 99; // Você pode ajustar esse valor
    if (currentValue < maxValue) {
        quantityInput.value = currentValue + 1;
        updateTotalPrice(id); // Atualiza o preço total (se necessário)
    }
}

// Função para diminuir a quantidade
function decreaseQuantity(id) {
    const quantityInput = document.getElementById(id);
    let currentValue = parseInt(quantityInput.value);

    // Garante que o valor não seja menor que 1
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        updateTotalPrice(id); // Atualiza o preço total (se necessário)
    }
}

// Função para atualizar o preço total
function updateTotalPrice(id) {
    const quantityInput = document.getElementById(id);
    const quantity = parseInt(quantityInput.value);

    // Supondo que o preço unitário esteja em um atributo data-price
    const priceElement = quantityInput.closest('.product-card').querySelector('.price');
    const unitPrice = parseFloat(priceElement.getAttribute('data-price'));

    // Calcula o preço total
    const totalPrice = unitPrice * quantity;

    // Atualiza o preço total na interface (se houver um elemento para isso)
    const totalPriceElement = quantityInput.closest('.product-card').querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
    }
}

// Função de busca
const searchInput = document.getElementById('search');
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const productName = card.querySelector('h2').textContent.toLowerCase();
            const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
            if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Carrinho de compras (usando localStorage)
const cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price, quantity) {
    const product = {
        name: productName,
        price: price,
        quantity: quantity
    };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} adicionado ao carrinho!`);
}

// Adiciona event listeners para os botões de quantidade e carrinho
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.quantity-control').forEach(control => {
        const increaseButton = control.querySelector('.increase');
        const decreaseButton = control.querySelector('.decrease');
        const quantityInput = control.querySelector('input[type="number"]');

        if (increaseButton && decreaseButton && quantityInput) {
            increaseButton.addEventListener('click', () => increaseQuantity(quantityInput.id));
            decreaseButton.addEventListener('click', () => decreaseQuantity(quantityInput.id));
        }
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h2').textContent;
            const price = parseFloat(productCard.querySelector('.price').getAttribute('data-price'));
            const quantity = parseInt(productCard.querySelector('input[type="number"]').value);
            addToCart(productName, price, quantity);
        });
    });
});

// Exibir itens do carrinho na página do carrinho
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }

    let html = '';
    cartItems.forEach(item => {
        html += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Quantidade: ${item.quantity}</p>
                <p>Preço: R$ ${item.price.toFixed(2)}</p>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
}

// Chame a função para exibir os itens do carrinho ao carregar a página
if (window.location.pathname.includes('carrinho.html')) {
    displayCartItems();
}

function scrollCategories(scrollAmount) {
    const categories = document.querySelector('.categories');
    categories.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}


// Funções para abrir/fechar o modal
function openLoginModal() {
    document.getElementById('login-modal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}

// Login com Google
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            alert(`Bem-vindo, ${result.user.displayName}!`);
            closeLoginModal();
        })
        .catch((error) => {
            alert(`Erro: ${error.message}`);
        });
}

// Login com Facebook
function loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            alert(`Bem-vindo, ${result.user.displayName}!`);
            closeLoginModal();
        })
        .catch((error) => {
            alert(`Erro: ${error.message}`);
        });
}

function scrollCategories(scrollAmount) {
    const categories = document.querySelector('.categories');
    categories.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}
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


// Configuração do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_DOMINIO.firebaseapp.com",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_STORAGE_BUCKET",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SEU_APP_ID"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Função para lidar com o login
function handleLogin() {
    // Pergunta ao usuário qual método de login ele deseja usar
    const loginMethod = prompt("Escolha o método de login:\n1 - Facebook\n2 - Google");

    if (loginMethod === "1") {
        loginWithFacebook();
    } else if (loginMethod === "2") {
        loginWithGoogle();
    } else {
        alert("Opção inválida. Por favor, tente novamente.");
    }
}

// Login com Facebook
function loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            alert(`Bem-vindo, ${result.user.displayName}!`);
        })
        .catch((error) => {
            alert(`Erro: ${error.message}`);
        });
}

// Login com Google
function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            alert(`Bem-vindo, ${result.user.displayName}!`);
        })
        .catch((error) => {
            alert(`Erro: ${error.message}`);
        });
}

// Função para abrir a popup de exclusão de dados
function openDeleteDataPopup() {
    const popup = document.getElementById('delete-data-popup');
    popup.style.display = 'flex';
}

// Função para fechar a popup de exclusão de dados
function closeDeleteDataPopup() {
    const popup = document.getElementById('delete-data-popup');
    popup.style.display = 'none';
}

// Fechar a popup ao clicar fora do conteúdo
window.addEventListener('click', (event) => {
    const popup = document.getElementById('delete-data-popup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

function searchProducts() {
    const term = document.getElementById('search').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productName = card.querySelector('h2').textContent.toLowerCase();
        if (productName.includes(term)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function addToCart(productName, price, quantityId) {
    const quantity = document.getElementById(quantityId).value;
    const total = (price * quantity).toFixed(2);

    alert(`Adicionado ao carrinho:\nProduto: ${productName}\nQuantidade: ${quantity}\nTotal: R$ ${total}`);
}

.delete-data-button {
    background-color: #FF0000; /* Vermelho */
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: background-color 0.3s ease;
}

.delete-data-button:hover {
    background-color: #CC0000; /* Vermelho mais escuro ao passar o mouse */
}

document.querySelectorAll('.add-to-wishlist').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
    });
});

function addToCart(productName, price, quantityId) {
    const quantity = document.getElementById(quantityId).value;
    const total = (price * quantity).toFixed(2);

    alert(`Adicionado ao carrinho:\nProduto: ${productName}\nQuantidade: ${quantity}\nTotal: R$ ${total}`);
    window.location.href = "carrinho.html"; // Redireciona para a página do carrinho
}
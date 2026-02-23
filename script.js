// ===========================
// DADOS DOS PRODUTOS
// ===========================

const kits = [
    {
        id: 'kit1',
        numero: 'Kit 1',
        preco: 94.90,
        itens: ['Torta Mini', '500g Salgadinhos', '15 Docinhos', '1 Refrigerante 2L', '50 Guardanapos', '20 Copos Descartáveis', '1 Vela Estrelar (docinho opcional)']
    },
    {
        id: 'kit2',
        numero: 'Kit 2',
        preco: 114.90,
        itens: ['Torta Pequena', '1kg Salgadinhos', '25 Docinhos', '1 Refrigerante 2L', '50 Guardanapos', '20 Copos Descartáveis', '1 Vela Estrelar (docinho opcional)']
    },
    {
        id: 'kit3',
        numero: 'Kit 3',
        preco: 134.90,
        itens: ['Torta Média', '1,2kg Salgadinhos', '25 Docinhos', '1 Refrigerante 2L', '50 Guardanapos', '30 Copos Descartáveis', '1 Vela Estrelar (docinho opcional)']
    },
    {
        id: 'kit4',
        numero: 'Kit 4',
        preco: 174.90,
        itens: ['Torta Média', '1,5kg Salgadinhos', '35 Docinhos', '2 Refrigerantes 2L', '50 Guardanapos', '30 Copos Descartáveis', '1 Vela Estrelar (docinho opcional)']
    },
    {
        id: 'kit5',
        numero: 'Kit 5',
        preco: 279.90,
        itens: ['Torta Grande', '3kg Salgadinhos', '50 Docinhos', '2 Refrigerantes 2L', '100 Guardanapos', '50 Copos Descartáveis', '1 Vela Estrelar (docinho opcional)']
    },
    {
        id: 'kit6',
        numero: 'Kit 6',
        preco: 369.90,
        itens: ['Torta Grande', '4kg Salgadinhos', '50 Docinhos', '3 Refrigerantes 2L', '100 Guardanapos', '50 Copos Descartáveis', '1 Vela Estrelar (docinho opcional)']
    }
];

const superKits = [
    { id: 'sk1', nome: 'Kit 1', info: '150 lanches com 3 opções', preco: 199.90 },
    { id: 'sk2', nome: 'Kit 2', info: '300 lanches com 6 opções', preco: 349.90 },
    { id: 'sk3', nome: 'Kit 3', info: '500 lanches com 10 opções', preco: 529.90 }
];

const extras = [
    { id: 'macaron', icon: 'fa-circle', nome: 'Macarons', descricao: 'Sob consulta' },
    { id: 'kinder', icon: 'fa-birthday-cake', nome: 'Bolo Kinder Bueno', descricao: 'Sob consulta' },
    { id: 'redvelvet', icon: 'fa-birthday-cake', nome: 'Torta Red Velvet', descricao: 'Sob consulta' },
    { id: 'tematica', icon: 'fa-star', nome: 'Tortas Temáticas', descricao: 'Sob consulta' }
];

// ===========================
// ESTADO DO CARRINHO
// ===========================

let cart = [];

// ===========================
// RENDERIZAR PRODUTOS
// ===========================

function renderKits() {
    const grid = document.getElementById('kitsGrid');
    if (!grid) return;
    grid.innerHTML = kits.map(kit => `
        <div class="kit-card">
            <span class="kit-badge">${kit.numero}</span>
            <h3>${kit.numero}</h3>
            <ul class="kit-itens">
                ${kit.itens.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <div class="kit-preco">R$ ${kit.preco.toFixed(2).replace('.', ',')}</div>
            <button class="btn-add" onclick="addToCart({id:'${kit.id}', name:'${kit.numero} - Kit Festa', price:${kit.preco}})">
                <i class="fa fa-shopping-basket"></i> Adicionar ao carrinho
            </button>
        </div>
    `).join('');
}

function renderSuperKits() {
    const grid = document.getElementById('superKitsGrid');
    if (!grid) return;
    grid.innerHTML = superKits.map(sk => `
        <div class="super-kit-card">
            <div class="sk-nome">${sk.nome}</div>
            <div class="sk-info">${sk.info}</div>
            <div class="sk-preco">R$ ${sk.preco.toFixed(2).replace('.', ',')}</div>
            <button class="btn-add" onclick="addToCart({id:'${sk.id}', name:'Super Kit Lanche - ${sk.nome}', price:${sk.preco}})">
                <i class="fa fa-shopping-basket"></i> Adicionar
            </button>
        </div>
    `).join('');
}

function renderExtras() {
    const grid = document.getElementById('extrasGrid');
    if (!grid) return;
    grid.innerHTML = extras.map(e => `
        <div class="extra-card" onclick="openModal()">
            <i class="fa ${e.icon}"></i>
            <h4>${e.nome}</h4>
            <div class="extra-preco">${e.descricao}</div>
            <button class="btn-add" style="margin-top:10px">Consultar via WhatsApp</button>
        </div>
    `).join('');
}

// ===========================
// CARRINHO
// ===========================

function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCart();
    openCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    updateCart();
}

function updateCart() {
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    document.getElementById('cartCount').textContent = count;

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    document.getElementById('cartTotal').textContent = 'R$ ' + total.toFixed(2).replace('.', ',');

    const container = document.getElementById('cartItems');
    if (cart.length === 0) {
        container.innerHTML = '<p class="cart-empty">Seu carrinho está vazio.</p>';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-qty">
                    <button onclick="changeQty('${item.id}', -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty('${item.id}', 1)">+</button>
                </div>
            </div>
            <div class="cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                <i class="fa fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function openCart() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('overlayBg').classList.add('active');
}

function closeCart() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('overlayBg').classList.remove('active');
}

// ===========================
// MODAL
// ===========================

function openModal() {
    document.getElementById('modalContato').classList.add('active');
    document.getElementById('overlayBg').classList.add('active');
}

function closeModal() {
    document.getElementById('modalContato').classList.remove('active');
    if (!document.getElementById('cartDrawer').classList.contains('open')) {
        document.getElementById('overlayBg').classList.remove('active');
    }
}

// ===========================
// CHECKOUT
// ===========================

// CONFIGURAÇÕES — edite aqui
const CONFIG = {
    pixChave: '21965547469',       // Sua chave Pix
    pixTipo: 'Telefone',           // Tipo da chave: Telefone, CPF, Email, etc.
    linkCartao: 'https://mpago.la/SEU-LINK-AQUI', // Link de pagamento Mercado Pago
    whatsapp: '5521965547469'
};

function abrirCheckout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    // Preenche resumo
    const resumo = document.getElementById('checkoutResumo');
    resumo.innerHTML = cart.map(item => `
        <div class="checkout-resumo-item">
            <span>${item.name} x${item.qty}</span>
            <span>R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}</span>
        </div>
    `).join('');

    // Preenche total
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    document.getElementById('checkoutTotal').textContent = 'R$ ' + total.toFixed(2).replace('.', ',');

    // Preenche chave pix
    document.getElementById('pixChaveTexto').textContent = CONFIG.pixChave;
    document.querySelector('.pix-tipo').textContent = 'Chave: ' + CONFIG.pixTipo;

    // Fecha painel pix se estava aberto
    document.getElementById('pixPainel').classList.remove('visivel');

    // Fecha carrinho e abre checkout
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('modalCheckout').classList.add('active');
    document.getElementById('overlayBg').classList.add('active');
}

function fecharCheckout() {
    document.getElementById('modalCheckout').classList.remove('active');
    document.getElementById('overlayBg').classList.remove('active');
}

function montarMsgWhatsApp(pagamento) {
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    let msg = `Olá! Gostaria de fazer o seguinte pedido:\n\n`;
    cart.forEach(item => {
        msg += `- ${item.name} (x${item.qty}): R$ ${(item.price * item.qty).toFixed(2)}\n`;
    });
    msg += `\nTotal: R$ ${total.toFixed(2)}`;
    msg += `\nForma de pagamento: ${pagamento}`;
    return encodeURIComponent(msg);
}

// ===========================
// PEDIDO VIA WHATSAPP (legado)
// ===========================

function finalizarPedido() {
    abrirCheckout();
}

// ===========================
// MAPA
// ===========================

function trocarMapa(card) {
    document.querySelectorAll('.loja-card').forEach(c => c.classList.remove('ativo'));
    card.classList.add('ativo');

    const novoSrc = card.getAttribute('data-mapa');
    const wrapper = document.querySelector('.mapa-wrapper');
    const iframe = document.getElementById('mapaFrame');

    wrapper.classList.add('trocando');
    setTimeout(function () {
        iframe.src = novoSrc;
        wrapper.classList.remove('trocando');
    }, 300);
}

// ===========================
// INICIALIZAR — tudo aqui dentro
// ===========================

document.addEventListener('DOMContentLoaded', function () {

    // Renderizar conteúdo dinâmico
    renderKits();
    renderSuperKits();
    renderExtras();
    updateCart();

    // Carrinho
    document.getElementById('btnCarrinho').addEventListener('click', openCart);
    document.getElementById('closeCart').addEventListener('click', closeCart);
    document.getElementById('btnFinalizarPedido').addEventListener('click', finalizarPedido);

    // Checkout
    document.getElementById('closeCheckout').addEventListener('click', fecharCheckout);

    document.getElementById('btnPagarPix').addEventListener('click', function () {
        document.getElementById('pixPainel').classList.toggle('visivel');
    });

    document.getElementById('btnCopiarPix').addEventListener('click', function () {
        const chave = CONFIG.pixChave;
        navigator.clipboard.writeText(chave).then(function () {
            const btn = document.getElementById('btnCopiarPix');
            btn.textContent = 'Copiado!';
            btn.classList.add('copiado');
            setTimeout(function () {
                btn.textContent = 'Copiar';
                btn.classList.remove('copiado');
            }, 2500);
        });
    });

    document.getElementById('btnConfirmarPix').addEventListener('click', function () {
        const msg = montarMsgWhatsApp('Pix - vou enviar o comprovante');
        window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`, '_blank');
    });

    document.getElementById('btnPagarCartao').addEventListener('click', function () {
        window.open(CONFIG.linkCartao, '_blank');
        const msg = montarMsgWhatsApp('Cartão de Crédito/Débito via Mercado Pago');
        setTimeout(function () {
            window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`, '_blank');
        }, 800);
    });

    document.getElementById('btnPagarWhatsapp').addEventListener('click', function () {
        const msg = montarMsgWhatsApp('A combinar na entrega');
        window.open(`https://wa.me/${CONFIG.whatsapp}?text=${msg}`, '_blank');
    });

    // Modal
    document.getElementById('btnFaleConosco').addEventListener('click', openModal);
    document.getElementById('closeModal').addEventListener('click', closeModal);

    // Overlay fecha carrinho e modal
    document.getElementById('overlayBg').addEventListener('click', function () {
        closeCart();
        closeModal();
    });

    // Formulário de contato
    document.getElementById('formContato').addEventListener('submit', function (e) {
        e.preventDefault();
        const nome = document.getElementById('contatoNome').value;
        const tel = document.getElementById('contatoTel').value;
        const msg = document.getElementById('contatoMsg').value;
        const texto = `Olá! Sou ${nome} (${tel}).\n\n${msg}`;
        window.open(`https://wa.me/5521965547469?text=${encodeURIComponent(texto)}`, '_blank');
        closeModal();
        this.reset();
    });

    // Menu hamburger
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    hamburger.addEventListener('click', function () {
        nav.classList.toggle('open');
    });

    // Scroll suave com offset do header fixo
    function scrollSuave(destino) {
        const inicio = window.scrollY;
        const distancia = destino - inicio;
        const duracao = 700;
        let startTime = null;

        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animar(timestamp) {
            if (!startTime) startTime = timestamp;
            const progresso = Math.min((timestamp - startTime) / duracao, 1);
            window.scrollTo(0, inicio + distancia * easeInOutCubic(progresso));
            if (progresso < 1) requestAnimationFrame(animar);
        }

        requestAnimationFrame(animar);
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            nav.classList.remove('open');
            const headerHeight = document.getElementById('header').offsetHeight;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            scrollSuave(top);
        });
    });

    // Sombra do header ao rolar
    window.addEventListener('scroll', function () {
        const header = document.getElementById('header');
        header.style.boxShadow = window.scrollY > 20
            ? '0 4px 24px rgba(200,16,46,0.14)'
            : '0 2px 16px rgba(200,16,46,0.08)';
    });

});
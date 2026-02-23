# Dona Eugênia — Site Institucional com Loja

> Padaria · Confeitaria · Café — Ternura & Sabor

Site completo para a Padaria Dona Eugênia, com vitrine de produtos, carrinho de compras, checkout com múltiplas formas de pagamento, mapa interativo por unidade e integração direta com WhatsApp. Desenvolvido com HTML, CSS e JavaScript puro, sem frameworks ou dependências externas além de fontes e ícones.

---

## Demonstração

| Tela | Funcionalidade |
|---|---|
| Hero | Apresentação da marca com chamada para ação |
| Kits Festa | 6 kits com itens e preços, adicionáveis ao carrinho |
| Super Kit Lanche | 3 opções para eventos com lista de lanches disponíveis |
| Outros Produtos | Tortas salgadas, salgadinhos avulsos e produtos especiais |
| Onde Estamos | Cards clicáveis que atualizam o mapa por unidade |
| Checkout | Modal com Pix, Cartão (Mercado Pago) e WhatsApp |

---

## Tecnologias

- **HTML5** semântico
- **CSS3** com variáveis customizadas, Grid, Flexbox e animações
- **JavaScript** vanilla (ES6+), sem jQuery ou frameworks
- **Font Awesome 6** para ícones
- **Google Fonts** — Playfair Display + Lato
- **Google Maps Embed** para o mapa interativo

Nenhum backend, nenhum banco de dados, nenhum servidor necessário. O site funciona como arquivos estáticos.

---

## Estrutura de Arquivos

```
dona-eugenia/
├── index.html        # Estrutura e conteúdo da página
├── style.css         # Estilos, temas e responsividade
├── script.js         # Lógica do carrinho, checkout e interações
├── assets/
│   └── logo.png      # Logo da padaria
└── README.md
```

---

## Funcionalidades

### Carrinho de Compras
- Adicionar e remover produtos
- Controle de quantidade por item
- Cálculo automático do total
- Drawer lateral com animação suave

### Checkout com Pagamento
- **Pix** — exibe a chave com botão de copiar e confirma pedido pelo WhatsApp
- **Cartão** — redireciona para link de pagamento do Mercado Pago
- **WhatsApp** — envia pedido formatado diretamente para o número da loja
- Resumo completo do pedido em todas as opções

### Mapa Interativo
- 3 unidades com cards clicáveis
- Troca de mapa com fade suave ao selecionar a unidade
- Card da unidade ativa destacado visualmente

### Interface
- Design responsivo para mobile, tablet e desktop
- Menu hamburguer no mobile
- Scroll suave com offset do header fixo
- Header com sombra progressiva ao rolar
- Animação de entrada no hero

### Comunicação
- Modal "Fale Conosco" com envio direto para WhatsApp
- Todos os pedidos geram mensagem formatada automaticamente

---

## Configuração

### Pagamentos e Contato

Edite o bloco `CONFIG` no topo do arquivo `script.js`:

```js
const CONFIG = {
    pixChave: '21965547469',                    // Chave Pix da padaria
    pixTipo: 'Telefone',                        // Tipo: Telefone, CPF, Email, CNPJ
    linkCartao: 'https://mpago.la/SEU-LINK',    // Link de pagamento Mercado Pago
    whatsapp: '5521965547469'                   // Número com DDI (sem + ou espaços)
};
```

### Como gerar o link do Mercado Pago

1. Acesse [mercadopago.com.br](https://www.mercadopago.com.br)
2. Vá em **Cobrar > Link de pagamento**
3. Crie um link com valor em aberto (para o cliente digitar)
4. Copie o link gerado e cole em `CONFIG.linkCartao`

### Mapa por Unidade

Cada card de unidade na seção "Onde Estamos" tem um atributo `data-mapa` com o link de embed do Google Maps. Para atualizar:

1. Acesse [maps.google.com](https://maps.google.com)
2. Pesquise o endereço
3. Clique em **Compartilhar > Incorporar mapa**
4. Copie o link do `src` do iframe
5. Cole no atributo `data-mapa` do card correspondente no `index.html`

### Produtos e Preços

Os produtos são definidos em arrays no `script.js`. Para alterar preços ou itens dos kits:

```js
const kits = [
    {
        id: 'kit1',
        numero: 'Kit 1',
        preco: 94.90,               // Altere o preço aqui
        itens: ['Torta Mini', ...]  // Altere os itens aqui
    },
    ...
];
```

---

## Cores do Tema

Todas as cores estão centralizadas em variáveis CSS no topo do `style.css`:

```css
:root {
    --vermelho: #c8102e;
    --vermelho-escuro: #a00c25;
    --rosa: #f7d6db;
    --rosa-claro: #fff0f3;
    --branco: #ffffff;
    --cinza-claro: #f9f4f5;
    --texto: #2b1a1d;
}
```

---

## Como Publicar

O site é totalmente estático. Pode ser publicado em qualquer serviço de hospedagem:

| Serviço | Plano gratuito | Domínio personalizado |
|---|---|---|
| [Netlify](https://netlify.com) | Sim | Sim |
| [Vercel](https://vercel.com) | Sim | Sim |
| [GitHub Pages](https://pages.github.com) | Sim | Sim |
| Hospedagem compartilhada | — | Sim |

Para publicar na Netlify, por exemplo, basta arrastar a pasta do projeto para o painel deles. O site entra no ar em menos de um minuto.

---

## Responsividade

| Breakpoint | Comportamento |
|---|---|
| Acima de 900px | Layout completo em grid |
| Até 900px | Colunas empilhadas, grid simplificado |
| Até 768px | Menu hamburguer, carrinho em tela cheia |

---

## Licença

Projeto desenvolvido sob encomenda para uso exclusivo da **Padaria Dona Eugênia**. Todos os direitos reservados.

---

*Desenvolvido com carinho — assim como os produtos da Dona Eugênia.*
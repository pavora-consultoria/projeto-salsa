const produtos = [
    {
        imagem: "https://ik.imagekit.io/mnz3yzqzot/25.png?updatedAt=1731556741235",
    },
    {
        imagem: "https://ik.imagekit.io/mnz3yzqzot/Yellow%20and%20Pink%20Modern%20Simple%20Restaurant%20Landing%20Page%20Website%20UI%20Prototype%20(3).png?updatedAt=1731563231277",
    },
    {
        imagem: "https://ik.imagekit.io/mnz3yzqzot/24.png?updatedAt=1731556741308",
    },
    {
        imagem: "https://ik.imagekit.io/mnz3yzqzot/26.png?updatedAt=1731556740990",
    }
];

function gerarCards() {
    const container = document.getElementById('cards-container');

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${produto.imagem}" alt="$">
        `;

        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', gerarCards);
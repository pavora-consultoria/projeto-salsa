const nome = document.getElementById("nome");
const telefone = document.getElementById("telefone");
const quantidadePessoas = document.getElementById("quantidade");
const data = document.getElementById("data");
const horario = document.getElementById("horarios");
const botaoConfirmar = document.getElementById("btn-sucesso");
const criarReserva = document.getElementById("criarReserva");
const modalSucesso = new bootstrap.Modal(
  document.getElementById("modal-sucesso")
);
let currentScrollPosition = 0;
const nomeAvaliacao = document.getElementById("nomeAvaliacao");
const comentarioAvaliacao = document.getElementById("comentarioAvaliacao");
const enviarAvaliacao = document.getElementById("enviar");

function scrollNext() {
  const feedbackContainer = document.getElementById("feedback");
  const itemWidth = document.querySelector(".avaliacao1").offsetWidth + 15;
  const maxScroll =
    feedbackContainer.scrollWidth - feedbackContainer.offsetWidth;

  if (currentScrollPosition < maxScroll) {
    currentScrollPosition += itemWidth;
    feedbackContainer.style.transform = `translateX(-${currentScrollPosition}px)`;
  }
}

function scrollPrev() {
  const feedbackContainer = document.getElementById("feedback");
  const itemWidth = document.querySelector(".avaliacao1").offsetWidth + 15;

  if (currentScrollPosition > 0) {
    currentScrollPosition -= itemWidth;
    feedbackContainer.style.transform = `translateX(-${currentScrollPosition}px)`;
  }
}

function validacaoAvaliacao() {
  if (
    nomeAvaliacao.value.trim() === "" ||
    comentarioAvaliacao.value.trim() === ""
  ) {
    enviarAvaliacao.disabled = true;
    enviarAvaliacao.style.backgroundColor = "gray";
    enviarAvaliacao.style.color = "#ffffffa4";
    enviarAvaliacao.style.border = "1px solid gray";
  } else {
    enviarAvaliacao.disabled = false;
    enviarAvaliacao.style.backgroundColor = "#ffde59";
    enviarAvaliacao.style.color = "black";
  }
}

function criarAvaliacao() {
  const feedbacks = document.getElementById("feedback");

  const novaAvaliacao = `
    <div class="avaliacao1">
      <p class="pessoa">${nomeAvaliacao.value}</p>
      <img src="https://ik.imagekit.io/mnz3yzqzot/estrelas.png?updatedAt=1732428668009" alt="Avaliação cinco estrelas" class="estrela" />
      <p>${comentarioAvaliacao.value}</p>
    </div>`;

  feedbacks.insertAdjacentHTML("beforeend", novaAvaliacao);

  const feedbackContainer = document.getElementById("feedback");
  const itemWidth = document.querySelector(".avaliacao1").offsetWidth + 15;
  const maxScroll =
    feedbackContainer.scrollWidth - feedbackContainer.offsetWidth;

  if (currentScrollPosition < maxScroll) {
    currentScrollPosition += itemWidth;
    feedbackContainer.style.transform = `translateX(-${currentScrollPosition}px)`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const feedbackContainer = document.getElementById("feedback");
  feedbackContainer.style.transform = "translateX(0px)";
});

function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function gerarReserva() {
  let reserva = "";
  const caracteres = "0123456789";

  for (let i = 0; i < 4; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    reserva += caracteres[indiceAleatorio];
  }

  return reserva;
}

function quantidadePessoasTexto(pessoas) {
  if (pessoas > 1) {
    return "pessoas";
  } else {
    return "pessoa";
  }
}

function validacao() {
  if (
    nome.value.trim() === "" ||
    telefone.value.trim() === "" ||
    data.value.trim() === "" ||
    horario.value.trim() === ""
  ) {
    botaoConfirmar.disabled = true;
    botaoConfirmar.style.backgroundColor = "gray";
    botaoConfirmar.style.color = "#ffffffa4";
    botaoConfirmar.style.border = "1px solid gray";
  } else {
    botaoConfirmar.disabled = false;
    botaoConfirmar.style.backgroundColor = "green";
    botaoConfirmar.style.color = "white";
  }
}

function confirmaReserva() {
  const dataSelecionada = new Date(data.value);
  const dataFormatada = formatarData(dataSelecionada);
  const numReserva = gerarReserva();
  const quantPessoasTexto = quantidadePessoasTexto(quantidadePessoas);
  const textoOla = document.getElementById("ola");
  const textoMensagem = document.getElementById("mensagem");

  const mensagem = `Sua reserva de número <b>${numReserva}</b> foi confirmada no Restaurante Salsa para a data ${dataFormatada} ás ${horario.value}hrs para ${quantidadePessoas.value} ${quantPessoasTexto}.<br><br>Caso precise alterar sua reserva, entre em contato conosco.`;

  textoOla.innerText = `Olá ${nome.value}!`;
  textoMensagem.innerHTML = `${mensagem}`;

  modalSucesso.show();

  setTimeout(() => {
    modalSucesso.hide();
  }, 6000);

  nome.value = "";
  telefone.value = "";
  quantidadePessoas.value = "";
  horario.value = "";
  data.value = "";

  validacao();
}

const produtos = [
  {
    imagem: "https://ik.imagekit.io/mnz3yzqzot/19.png?updatedAt=1732053587969",
    titulo: "Segunda-Feira",
    descricao: "Virado à Paulista",
  },
  {
    imagem: "https://ik.imagekit.io/mnz3yzqzot/18.png?updatedAt=1732053586548",
    titulo: "Terça-Feira",
    descricao: "Filé de Frango ao Creme de Milho",
  },
  {
    imagem: "https://ik.imagekit.io/mnz3yzqzot/21.png?updatedAt=1732053586654",
    titulo: "Quarta-Feira",
    descricao: "Feijoada",
  },
  {
    imagem: "https://ik.imagekit.io/mnz3yzqzot/20.png?updatedAt=1732053586285",
    titulo: "Quinta-Feira",
    descricao: "Bife à Rolê",
  },
  {
    imagem: "https://ik.imagekit.io/mnz3yzqzot/23.png?updatedAt=1732053587748",
    titulo: "Sexta-Feira",
    descricao: "Panqueca",
  },
];

function gerarCards() {
  const container = document.getElementById("cards-container");

  produtos.forEach((produto) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
            <img src="${produto.imagem}" alt="Prato do dia">
            <h3>${produto.titulo}</h3>
            <h6>${produto.descricao}</h6>
        `;

    container.appendChild(card);
  });
}

function menuHamburguer() {
  const menu = document.getElementById("hamburguer-img");

  menu.addEventListener("click", () => {
    const conteudo = document.getElementById("menu-conteudo");
    const whatsapp = document.getElementById("icon-whatssap");

    document.body.style.overflow = `hidden`;
    whatsapp.style.display = `none`;
    conteudo.style.display = `flex`;
  });
}

function fecharMenuHamburguer() {
  const conteudo = document.getElementById("menu-conteudo");
  const whatsapp = document.getElementById("icon-whatssap");

  document.body.style.overflow = `scroll`;
  whatsapp.style.display = `block`;
  conteudo.style.display = `none`;
}

menuHamburguer();

validacao();
validacaoAvaliacao();
nome.addEventListener("input", validacao);
telefone.addEventListener("input", validacao);
horario.addEventListener("change", validacao);
data.addEventListener("input", validacao);
nomeAvaliacao.addEventListener("input", validacaoAvaliacao);
comentarioAvaliacao.addEventListener("input", validacaoAvaliacao);

// sam

let selectedRating = 0;

document.querySelectorAll(".star").forEach((star) => {
  star.addEventListener("click", function () {
    // Remove a classe "active" de todas as estrelas
    document
      .querySelectorAll(".star")
      .forEach((s) => s.classList.remove("active"));

    // Adiciona a classe "active" nas estrelas até a selecionada
    this.classList.add("active");
    selectedRating = this.dataset.value;

    for (let i = 1; i < this.dataset.value; i++) {
      document
        .querySelector(`.star[data-value="${i}"]`)
        .classList.add("active");
    }
  });
});

document.getElementById("fale").addEventListener("submit", function (e) {
  e.preventDefault(); // Impede o envio do formulário

  const commentInput = document.getElementById("commentInput");
  const commentList = document.getElementById("commentList");

  if (commentInput.value.trim() !== "" && selectedRating > 0) {
    // Cria um novo item de lista para o comentário
    const newComment = document.createElement("li");
    newComment.innerHTML = `
      <div class="rating-display">Avaliação: ${"★".repeat(
        selectedRating
      )}${"☆".repeat(5 - selectedRating)}</div>
      <p>${commentInput.value}</p>
    `;

    // Adiciona o comentário à lista
    commentList.appendChild(newComment);

    // Limpa o campo de entrada e o rating
    commentInput.value = "";
    document
      .querySelectorAll(".star")
      .forEach((s) => s.classList.remove("active"));
    selectedRating = 0;
  } else {
    alert("Por favor, insira um comentário e uma avaliação!");
  }
});

document.addEventListener("DOMContentLoaded", gerarCards);

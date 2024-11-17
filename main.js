function formatarData(data) {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

async function enviarSMS() {
  const nome = document.getElementById("nome").value;
  const celular = document.getElementById("telefone").value;
  const quantidadePessoas = document.getElementById("quantidade").value;
  const data = document.getElementById("data").value;
  const dataSelecionada = new Date(data);
  const dataFormatada = formatarData(dataSelecionada);
  const horario = document.getElementById("horarios").value;

  const mensagem = `Olá ${nome}! \nSua reserva no Salsa foi confirmada para a data ${dataFormatada} ás ${horario}hrs para ${quantidadePessoas} pessoas. \n\nEndereço: Av. Nossa Senhora de Loreto, 1050,Vila Medeiros - Zona Norte - SP. \n\nCaso precise alterar sua reserva, entre em contato conosco. \nTe aguardamos!`;

  try {
    const response = await fetch("http://localhost:3000/send-sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: `+55${celular}`,
        body: mensagem,
      }),
    });

    const data = await response.json();

    if (data.sid) {
      document.body.innerHTML += `
    <div id="modal-backdrop" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 1040;"></div>
    <div class="modal show" id="modal-sucesso" data-bs-backdrop="static" aria-modal="true" role="dialog" style="display: block; z-index: 1050;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <p>Reserva confirmada com sucesso! <br>
Agradecemos pela escolha e esperamos vê-lo em breve!</p>
                </div>
            </div>
        </div>
    </div>`;

      setTimeout(() => {
        const modal = document.getElementById("modal-sucesso");
        if (modal) {
          modal.style.display = "none";
          document.getElementById("modal-backdrop").remove();
        }
      }, 3000);
    } else {
      document.body.innerHTML += `
    <div id="modal-backdrop" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 1040;"></div>
    <div class="modal show" id="modal-sucesso" data-bs-backdrop="static" aria-modal="true" role="dialog" style="display: block; z-index: 1050;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <p>Erro ao realizar a reserva! <br>
Por favor, verifique o número de telefone e tente novamente.</p>
                </div>
            </div>
        </div>
    </div>`;

      console.log(data.error);

      setTimeout(() => {
        const modal = document.getElementById("modal-sucesso");
        if (modal) {
          modal.style.display = "none";
          document.getElementById("modal-backdrop").remove();
        }
      }, 3000);
    }
  } catch (error) {
    console.error("Erro de conexão:", error);
  }
}

const produtos = [
  {
    imagem: "https://ik.imagekit.io/mnz3yzqzot/25.png?updatedAt=1731556741235",
  },
  {
    imagem:
      "https://ik.imagekit.io/mnz3yzqzot/Yellow%20and%20Pink%20Modern%20Simple%20Restaurant%20Landing%20Page%20Website%20UI%20Prototype%20(3).png?updatedAt=1731563231277",
  },
  {
    imagem: "https://ik.imagekit.io/mnz3yzqzot/24.png?updatedAt=1731556741308",
  },
  {
    imagem: "https://ik.imagekit.io/mnz3yzqzot/26.png?updatedAt=1731556740990",
  },
  {
    imagem: "https://ik.imagekit.io/mnz3yzqzot/26.png?updatedAt=1731556740990",
  },
  {
    imagem: "https://ik.imagekit.io/mnz3yzqzot/26.png?updatedAt=1731556740990",
  },
];

function gerarCards() {
  const container = document.getElementById("cards-container");

  produtos.forEach((produto) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
            <img src="${produto.imagem}" alt="Prato do dia">
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
document.addEventListener("DOMContentLoaded", gerarCards);

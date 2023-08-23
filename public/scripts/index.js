const mensagemDiv = document.querySelector("#mensagem");
const criarNotaForm = document.querySelector("#criarNota");
criarNotaForm.addEventListener('submit', event => {
    event.preventDefault();
    handleCriarNota();
})

const consumirAPI = async (url, metodo = 'GET', corpo) => {
    let requisicao;

    if (metodo === 'POST') {
        requisicao = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(corpo)
        })
            .then((res) => {
                res.text().then(mensagem => {
                    exibirMensagem(res.ok, mensagem);
                });
                if (res.ok) {
                    exibirNotas();
                    limparCamposFormulario();
                    return requisicao;
                }
            })
    } else {
        requisicao = await fetch(url)
            .then(res => res.json())
            .then(data => { return data })
            .catch(e => console.log(e.message));

        return requisicao;
    }
}

const exibirNotas = async () => {
    const notas = await consumirAPI('http://localhost:3000/api/notas');
    const listaDeNotas = document.querySelector("#lista_notas");
    listaDeNotas.innerHTML = "";
    notas.map(nota => {

        const card = document.createElement("div");
        const cardBody = document.createElement("div");
        const cardTitle = document.createElement("h5");
        const cardText = document.createElement("p");
        const cardDelete = document.createElement("i");

        card.classList.add('card', 'text-center', 'm-2', 'w-100');
        cardBody.classList.add('card-body', 'overflow-scroll', 'overflow-x-hidden');
        cardBody.style.height = "100px";
        cardTitle.classList.add('card-title');
        cardText.classList.add('card-text');
        cardDelete.classList.add('fa-solid', 'fa-trash');
        cardDelete.style.cursor = "pointer";

        cardDelete.onclick = async () => {
            if(window.confirm("Deseja excluir essa nota?")) {
                await consumirAPI(`http://localhost:3000/api/deletarnota/${nota.id}`, 'POST');
            }
        }

        cardTitle.textContent = nota.titulo;
        cardText.textContent = nota.descricao;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(cardDelete);

        card.appendChild(cardBody);
        card.style.background = nota.corDeFundo;

        listaDeNotas.appendChild(card);

    })
}

const handleCriarNota = async () => {

    const tituloInput = document.querySelector("#titulo");
    const descricaoInput = document.querySelector("#descricao");
    const corDeFundoInput = document.querySelector("#corDeFundo");

    const nota = {
        titulo: tituloInput.value,
        descricao: descricaoInput.value,
        corDeFundo: corDeFundoInput.value
    }

    await consumirAPI('http://localhost:3000/api/nota', 'POST', nota);

}

const limparCamposFormulario = () => {
    document.querySelector("#titulo").value = "";
    document.querySelector("#descricao").value = "";
    document.querySelector("#corDeFundo").value = null;
}

const exibirMensagem = (status, mensagem) => {

    mensagemDiv.style.display = "block";
    mensagemDiv.textContent = mensagem;

    if (status) {
        mensagemDiv.classList.remove('text-danger', 'border-danger');
        mensagemDiv.classList.add('text-center', 'text-success', 'border', 'border-success');
    } else {
        mensagemDiv.classList.remove('text-success', 'border-success');
        mensagemDiv.classList.add('text-center', 'text-danger', 'border', 'border-danger');
    }

    setTimeout(() => {
        mensagemDiv.style.display = "none";
        mensagemDiv.textContent = "";
    }, 3000)

}

window.onload = async () => {
    exibirNotas();
}
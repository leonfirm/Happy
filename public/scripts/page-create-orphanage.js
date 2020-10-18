// Create map
const map = L.map('mapid').setView([-23.5261834,-46.3445803], 15)


// Create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map)


// Create icon
const icon = L.icon({
    iconUrl: "images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})


let marker;

// Create and add marker
map.on('click', event => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // Remove icon
    marker && map.removeLayer(marker)

    // Add icon layer
    marker = L.marker([lat, lng], {icon})
    .addTo(map)
})


// adicionar o campo de fotos
function addPhotoField() {
    // pegar o container de fotos #images
    const container = document.querySelector('#images')

    // pegar o container para duplicar .new-upload
    const fieldsContainer = document.querySelectorAll('.new-upload')

    // duplicar / clonar a última imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)

    // verificar se o campo está vazio, se sim, não adicionar ao container de imagens
    const input = newFieldContainer.children[0]
    if (input.value == "") {
        return
        // Sempre que uma função encontra um 'return' ela para de ler o resto do código do bloco
    }

    // limpar o campo antes de adicionar ao container de imagens
    input.value = ""

    // adicionar o clone ao container de #images
    container.appendChild(newFieldContainer)
}

function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if (fieldsContainer.length < 2) {
        // limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    // deletar o campo
    span.parentNode.remove()
}


// selecionar sim ou não
function toggleSelect(event) {
    // retirar a classe .active (dos botões)
    document.querySelectorAll('.button-select button')
    .forEach( button => button.classList.remove('active') ) // Perceba, há uma arrow function de uma linha nesse forEach

    // colocar a classe .active no botão clicado
    const button = event.currentTarget
    button.classList.add('active')

    // atualizar o input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')
    input.value = button.dataset.value
}


// validar se lat e lng estão preenchidos
function validate(event) {
    const lat = document.querySelector('[name="lat"]')
    const lng = document.querySelector('[name="lng"]')
    if (lat == '' && lng == '') {
        event.preventDefault()
        alert('Selecione um ponto no mapa!')
    }
}


// não sei minha geolocalização
const gl = document.getElementById("localizador");
function ondeEstou() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarPosicao, deuErro)
    } else {
        gl.innerHTML="Seu browser não suporta Geolocalização."
    }
}

function mostrarPosicao(position) {
    // pegar as coordenadas (lat e lng) pelo navegador
    gl.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude + "<br>Posição atualizada no mapa!"

    // colocar as posições em lat e lng
    document.querySelector('[name="lat"]').value = position.coords.latitude
    document.querySelector('[name="lng"]').value = position.coords.longitude

    // remover do mapa
    marker && map.removeLayer(marker)

    // adicionar no mapa
    marker = L.marker([position.coords.latitude, position.coords.longitude], {icon})
    .addTo(map)
}

function deuErro(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            gl.innerHTML = "Usuário rejeitou a solicitação de Geolocalização."
            break;

        case error.POSITION_UNAVAILABLE:
            gl.innerHTML = "Localização indisponível."
            break;

        case error.TIMEOUT:
            gl.innerHTML = "A requisição expirou."
            break;

        case error.UNKNOWN_ERROR:
            gl.innerHTML = "Algum erro desconhecido aconteceu."
            break;
    }
}
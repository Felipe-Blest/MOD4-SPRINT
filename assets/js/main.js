const insertDOMcontent = document.querySelector('#insertDOMcontent')
fetch(`https://pokeapi.co/api/v2/pokemon`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ERROR N°: ${response.status}`)
        }
        response.json()
            .then(data => {
                listadoPokemon(data)
            })

    })

const listadoPokemon = (info) => {
    if (info != undefined) {
        info.forEach(element => {   
            const { sprites, name } = element
            const dataPokemon = { imagen: sprites.front_default, nombre: name }
            insertDOMcontent.innerHTML += `<div class="card" style="width: 18rem;" alt="${name}">
                <img src="${imagen}" class="card-img-top">
                    <div class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
            </div>`
        });
    }
}
const containerpokemon = document.querySelector('.container-pokemon .row')
const cargarMas = document.querySelector('.btn')
const reinicio = document.querySelector('.reset')

const listadoPokemon = (offset = '0') => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}"`)
        .then(data => {
            if (data.ok) {
                console.log('Respuesta de la API', data)
                //pasar objetos de API a .JSON
                return data.json()
            }
            throw new Error('Error de conexión a API')
        })
        // el método .JSON() es una promesa, por ende hay que volver a ejecutar un .then y así extraer su informacion
        .then(json => {
            console.log('2do .THEN', json)
            //va al objeto, variable results y extrae toda la información
            const { results } = json
            //lista a todos los pokémon y su información
            results.forEach(info => {
                console.log('información del objeto', info)
                //trae la url del pokémon en especifico
                console.log('información del objeto, especificamente url', info.url)
                const link = info.url
                fetch(link)
                    .then(dataPokemon => {
                        return dataPokemon.json()
                    })
                    //traigo todos los links de los pokemon y sus atributos correspondientes
                    .then(infoPokemon => {
                        console.log(infoPokemon)
                        // del objeto completo extraigo:
                        const { name, sprites, stats, id } = infoPokemon
                        // refactorizo(? el objeto anterior y defino mis variables
                        const refactInfoPokemon = {
                            id: id,
                            imagen: sprites.other['official-artwork'].front_default,
                            nombre: name.toUpperCase(),
                            hp: stats[0].base_stat,
                            ataque: stats[1].base_stat,
                            defensa: stats[2].base_stat,
                            ataqueEspecial: stats[3].base_stat,
                            defensaEspecial: stats[4].base_stat,
                            velocidad: stats[5].base_stat
                        }
                        console.log('objeto con mis variables:', refactInfoPokemon)
                        containerpokemon.innerHTML += `
                        <div class="col-sm-3 col-md-3 p-2">
                        <div class="card" style="width: 18rem;">
                        <img src=${refactInfoPokemon.imagen} alt="${refactInfoPokemon.id} - ${refactInfoPokemon.nombre}">
                        <div class="card-body">
                        <p>#${refactInfoPokemon.id}</p>
                        <h5 class="card-title">${refactInfoPokemon.nombre}</h5>
                        <a href="#" class="btn btn-primary">Estadisticas</a>
                        </div>
                        </div>
                        </div>
                        `
                    })

            })
        });
}
listadoPokemon()


cargarMas.addEventListener('click', (e) => {
    e.preventDefault();
    let getId = parseInt(e.target.id)
    let incremento = getId + 20
    e.target.setAttribute('id', incremento)
    listadoPokemon(getId)
})

reinicio.addEventListener('click', (e) => {
    location.reload()
})
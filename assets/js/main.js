const containerpokemon = document.querySelector('.container-pokemon .row')
const cargarMas = document.querySelector('.add')
const reinicio = document.querySelector('#reset')

const listadoPokemon = (offset = '0') => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)

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
                        // restructuring del objeto anterior y defino mis variables
                        const refactInfoPokemon = {
                            uid: id,
                            imagen: sprites.other['official-artwork'].front_default,
                            nombre: name.toUpperCase(),
                            hp: stats[0].base_stat,
                            ataque: stats[1].base_stat,
                            defensa: stats[2].base_stat,
                            ataqueEspecial: stats[3].base_stat,
                            defensaEspecial: stats[4].base_stat,
                            velocidad: stats[5].base_stat
                        }
                        const { uid, nombre, hp, ataque, defensa, ataqueEspecial, defensaEspecial, velocidad } = refactInfoPokemon
                        console.log('objeto con mis variables:', refactInfoPokemon)
                        containerpokemon.innerHTML += `
                        <div class="col-sm-3 col-md-3 p-2">
                            <div class="card" style="width: 18rem;">
                                <img src=${refactInfoPokemon.imagen} alt="${uid} - ${nombre}">
                                    <div class="card-body">
                                        <p>#${uid}</p>
                                        <h5 class="card-title">${nombre}</h5>
                                    <div class="card-body">
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal-${uid}">
                                Estadisticas
                                </button>
                            </div>
                        </div>

                        <div class="modal fade" id="exampleModal-${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${nombre}</h5>
                    </div>
                    <div class="modal-body">
                        <div id="chartContainer" style="height: 300px; max-width: 920px; margin: 0px auto;">
                    </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                        </div>
                </div>
            </div>
        </div>
                        `
                        chartPoke(nombre, uid, hp, ataque, defensa, ataqueEspecial, defensaEspecial, velocidad);
                    })

            })
        });
}
listadoPokemon()



const chartPoke = (nombre, id, hp, ataque, defensa, ataqueEspecial, defensaEspecial, velocidad) => {
    

    var chart = new CanvasJS.Chart("chartContainer", {
        backgroundColor: "transparent",
        theme: 'light1',
        width: 750,
        height: 400,
        animationEnabled: true,
        animationDuration: 5000,
        title: {
            text: `${nombre}`
        },
        legend: {
            maxWidth: 350,
            itemWidth: 120
        },
        data: [
            {
                type: "pie",
                showInLegend: true,
                legendText: "{indexLabel}",
                dataPoints: [
                    { y: (hp == 'null' ? 0 : hp) },
                    { indexLabel: hp },
                    { y: (ataque == 'null' ? 0 : ataque) },
                    { indexLabel: ataque },
                    { y: (defensa == 'null' ? 0 : defensa) },
                    { indexLabel: defensa },
                    { y: (velocidad == 'null' ? 0 : velocidad) },
                    { indexLabel: velocidad },
                    { y: (ataqueEspecial == 'null' ? 0 : ataqueEspecial) },
                    { indexLabel: ataqueEspecial },
                    { y: (defensaEspecial == 'null' ? 0 : defensaEspecial) },
                    { indexLabel: defensaEspecial },
                ]
            }
        ]
    });
    chart.render()
}


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
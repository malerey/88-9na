// // API KEY 

// // open weather api key: 28dd2ec85ef2c8982f8cc2380349186a


// // tres maneras de mostrar la info de un endpoint
// // estos son ejemplos, LEAN LA DOCUMENTACION DE CADA API 

// // /characters  --> nos trae la lista completa de recursos
// // /characters/1 --> nos va a traer 1 recurso en especifico
// // /characters?q=Rick --> nos trae todos los recursos que coincidan con la busqueda

// // busqueda:


// const buscarInfo = (ciudad, sistema) => {
//   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&appid=28dd2ec85ef2c8982f8cc2380349186a&units=${sistema}`)
//   .then(res => res.json())
//   .then(data => {
//     hacerHTML(data, sistema)
//   })
// }


// const hacerHTML = (data, sistema) => {
//     const tarjeta = document.querySelector("#tarjeta")
//     const html = `
//       <div>
//         <h1>${data.name}</h1>
//         <h2>${data.main.temp} ${sistema === "metric" ? "C" : "F"}º</h2>
//         <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
//       </div>
//     `
//     tarjeta.innerHTML = html
// }

// const form = document.querySelector("#form")
// const ciudadInput = document.querySelector("#ciudad")
// const sistemaInput = document.querySelector("#sistema")

// form.onsubmit = (e) => {
//   e.preventDefault();
//   buscarInfo(ciudadInput.value, sistemaInput.value)
// }


const prev = document.querySelector("#prev")
const next = document.querySelector("#next")

console.log(tarjetas)

let paginaActual = 1
let ultimaPagina = 0
// obtener todos los recursos

const buscarPersonajes = () => {
  console.log(paginaActual)
  fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    ultimaPagina = data.info.pages
    mostrarHTMLPersonajes(data.results)
    asignarClickTarjetaPersonaje()
  })
}

const buscarPersonaje = (id) => {
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    
  })
}

const asignarClickTarjetaPersonaje = () => {
  const tarjetas = document.querySelectorAll(".tarjeta")
  for (let i = 0; i < tarjetas.length; i++) {
    tarjetas[i].onclick = () => {
     const idPersonaje = tarjetas[i].dataset.id
      buscarPersonaje(idPersonaje)
      // cuando el usuario hace click en una tarjeta
// ocultar toda la seccion principal
// hacer un fetch a ese recurso en especifico 
// mostrar la seccion detalle
// crear la seccion detalles
    }
    
  }
}

const mostrarHTMLPersonajes = (personajes) => {
    const tarjetas = document.querySelector("#tarjetas")
  const html = personajes.reduce((acc, curr) => {
    return acc + `
    <div class="tarjeta" data-id=${curr.id}>
      <h2>${curr.name}</h2>
      <img src="${curr.image}"/> 
    </div>
    `
  }, "")
  tarjetas.innerHTML = html
}

buscarPersonajes()

next.onclick = () => {
  // ejecutar la funcion de busqueda
  // pero sumandole 1 a la pagina
  // paginaActual = paginaActual + 1
  paginaActual++

  // Math.ceil(cantidad / resultadosPorPagina )

  if (paginaActual === ultimaPagina) {
    next.disabled = true
  }

  buscarPersonajes()


}

prev.onclick = () => {
  
  paginaActual--
  if (paginaActual === 1) {
    prev.disabled = true
  }
  buscarPersonajes()
}




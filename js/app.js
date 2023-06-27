//Verificar datos en Local Storage 
let listarSeries = JSON.parse(localStorage.getItem('listaSeriesKey')) || [];
console.log(listarSeries);
//Si hay datos dibujar kas tarjetas

listarSeries.forEach(serie => {
    createColumn(serie);
});

function createColumn(serie) {
    let gridSeries = document.querySelector('#grid-series');
    gridSeries.innerHTML += `
        <article class="col-12 col-md-4 col-lg-3 mb-3">
            <div class="card">
              <img class="img-top__card-container" src="${serie.image}" alt="${serie.title}">
              <div class="card-body">
                <h5 class="card-title">${serie.title}</h5>
                <a href="#" class="btn btn-primary">Ver detalles</a>
              </div>
            </div>
          </article>
  
  `
}
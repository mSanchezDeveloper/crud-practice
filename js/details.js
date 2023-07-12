//Extraer parametro
const parametro = window.location.search;
console.log(parametro);

const urlParams = new URLSearchParams(parametro);
console.log(urlParams.get('code'));

const serieListar = urlParams.get('code');

//Buscar serie
let listarSeries = JSON.parse(localStorage.getItem('listaSeriesKey')) || [];
let serieBuscada = listarSeries.find(serie=>{return serie.code === serieListar})
console.log(serieBuscada);

//Cargar los datos
let sectionDetails = document.querySelector('#detail-series');
sectionDetails.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${serieBuscada.image}" class="img-fluid rounded-start" alt="${serieBuscada.title}">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${serieBuscada.title}</h5>
                      <p class="card-text">${serieBuscada.description}.</p>
                      <p class="card-text">Genre: <span class="badge rounded-pill bg-info">${serieBuscada.genre}</span></p>
                    </div>
                  </div>
                </div>
              </div>`;
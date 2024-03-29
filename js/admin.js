import { NewSerie } from "./serieClass.js";
import { campoRequerido, cantidadCaracteres } from "./validations.js";


// Traer elementos para validar
let codeInput = document.querySelector('#code');
let titleInput = document.querySelector('#title');
let descriptionInput = document.querySelector('#description');
let imageInput = document.querySelector('#image');
let genreInput = document.querySelector('#genre');
let formSerie = document.querySelector('#formSeries');
const btnCreateSerie = document.querySelector('#btnCreateSerie');

//Manejar el create y el update
let serieExistente = false; // si serieExistente es false la serie es nueva, caso contrario hacer update

//Validations
code.addEventListener("blur", () => {
    campoRequerido(code);
});

title.addEventListener("blur", () => {
    cantidadCaracteres(7, 40, title);
});

description.addEventListener("blur", () => {
    cantidadCaracteres(10, 200, description);
});

image.addEventListener("blur", () => {
    campoRequerido(image);
});

btnCreateSerie.addEventListener('click', () => {
    cleanForm();
    serieExistente = false;
    console.log(serieExistente);
    modalSerieAdmin.show();
});

const modalSerieAdmin = new bootstrap.Modal(document.getElementById('modalSeriesAdmin'));

//Si hay algo en localStorage listar arreglo.
let seriesList = JSON.parse(localStorage.getItem("listaSeriesKey")) || [];

//Validar formulario
formSerie.addEventListener('submit', guardarSerie);
function crearSerie(e) {
    //volver a validar los datos y crear nueva serie
    let newSerie = new NewSerie(code.value, title.value, description.value, image.value, genre.value);
    seriesList.push(newSerie);
    //Clean form
    cleanForm();
    //Guardar series en localStorage
    saveListSeries();
    //Cerrar modal luego de ingresar serie
    modalSerieAdmin.hide();
    //Mostrar ok sweet alert
    Swal.fire(
        '¡Buen trabajo!',
        '¡Una nueva serie ha sido creada!',
        'success'
    );
    deleteTable();
    cargaInicial();
};

function cleanForm() {
    formSerie.reset();
};

//Funcion para configurar crear serie
function guardarSerie(e) {
    e.preventDefault();
    if (serieExistente) {
        //Modificar serie existente
        console.log("Modificar serie")
        //Validar datos
        //Guardar actualizacion
        guardarEdicionSerie();
    } else {
        //Guardar serie nueva
        console.log("Crear serie")
        crearSerie();
    }
}

// Guardar en localstorage
function saveListSeries() {
    localStorage.setItem('listaSeriesKey', JSON.stringify(seriesList));
};

//Verificar si hay datos para dibujar la tabla
cargaInicial();

// Dibujar la tabla al iniciar
function cargaInicial() {
    if (seriesList.length > 0) {
        seriesList.forEach((itemSerie) => { crearFila(itemSerie) });
    }
};

function crearFila(itemSerie) {
    let tablaSeries = document.querySelector("#seriesDetails");
    tablaSeries.innerHTML += `
    <tr>
        <th scope="row">${itemSerie.code}</th>
        <td>${itemSerie.title}</td>
        <td><p class="content-form__text-description">${itemSerie.description}</p></td>
        <td><p class="content-form__text">${itemSerie.image}</p></td>
        <td>${itemSerie.genre}</td>
        <td>
        <button class="btn btn-warning my-1" onclick="prepararEdicionSerie('${itemSerie.code}')">
            <i class="bi bi-pencil-fill"></i>
        </button>
        <button class="btn btn-danger my-1" onclick="deleteProduct('${itemSerie.code}')">
            <i class="bi bi-x-circle-fill"></i>
        </button>
        </td>
    </tr> `;
};

// Borrar producto
window.deleteProduct = function (code) {
    //Confirmar borrar
    Swal.fire({
        title: '¿Estas seguro de eliminar la serie?',
        text: "¡Recuerda que no puedes volver atras!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Quiero borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            //Delete serie desde local y el arreglo seriesList
            let seriesListNew = seriesList.filter((serie) => { return serie.code != code });
            seriesList = seriesListNew;
            saveListSeries();
            //Actualizar tabla
            deleteTable();
            cargaInicial();
            //Success delete

            Swal.fire(
                '¡Borrado!',
                'La serie a sido borrado con éxito.',
                'success'
            )
        }
    })
};

function deleteTable() {
    let tbodySeries = document.querySelector("#seriesDetails");
    tbodySeries.innerHTML = "";
};

//Edit serie
window.prepararEdicionSerie = function (codeParam) {
    //Cargar los datos
    let serieBuscada = seriesList.find((serie) => { return serie.code == codeParam });
    console.log(serieBuscada);
    //Asignar valores al input
    code.value = serieBuscada.code;
    title.value = serieBuscada.title;
    description.value = serieBuscada.description;
    image.value = serieBuscada.image;
    genre.value = serieBuscada.genre;
    //Mostrar la ventaqna modal
    modalSerieAdmin.show();
    serieExistente = true;
    console.log(serieExistente);
}

function guardarEdicionSerie() {
    //Posicion de ka serie en el arreglo
    let posicionSerie = seriesList.findIndex((serie) => { return serie.code == code.value });
    //Modificar los valores
    seriesList[posicionSerie].title = title.value;
    seriesList[posicionSerie].description = description.value;
    seriesList[posicionSerie].image = image.value;
    seriesList[posicionSerie].genre = genre.value;
    //Guardar los valore en el localstorage
    saveListSeries();
    //Actualizar la tabla
    deleteTable();
    cargaInicial();
    //Confirmar accion
    Swal.fire(
        '¡Serie actualizada!',
        '¡La serie ha sido actualizada!',
        'success'
    );
    //Cerrar tabla
    modalSerieAdmin.hide();
}
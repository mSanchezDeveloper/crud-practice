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

const modalSerieAdmin = new bootstrap.Modal(document.getElementById('modalSeriesAdmin'));
console.log(modalSerieAdmin);

//Si hay algo en localStorage listar arreglo.
let seriesList = JSON.parse(localStorage.getItem('listaSeriesKey')) || [];

//Validar formulario
formSerie.addEventListener('submit', crearSerie);

function crearSerie(e) {
    e.preventDefault();
    //volver a validar los datos y crear nueva serie
    let newSerie = new NewSerie(code.value, title.value, description.value, image.value, genre.value);
    console.log(newSerie);
    seriesList.push(newSerie);
    console.log(seriesList);
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
    )
}

function cleanForm() {
    formSerie.reset();
}

// Guardar en localstorage
function saveListSeries() {
    localStorage.setItem('listaSeriesKey', JSON.stringify(seriesList));
}


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
    modalSerieAdmin.show();
})
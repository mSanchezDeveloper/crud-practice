import { NewSerie } from "./serieClass.js";


// Traer elementos para validar
let codeInput = document.querySelector('#code');
let titleInput = document.querySelector('#title');
let descriptionInput = document.querySelector('#description');
let imageInput = document.querySelector('#image');
let genreInput = document.querySelector('#genre');
let formSerie = document.querySelector('#formSeries');
let seriesList =[];

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
}

function cleanForm(){
    formSerie.reset();
}
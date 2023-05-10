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
});

const modalSerieAdmin = new bootstrap.Modal(document.getElementById('modalSeriesAdmin'));

//Si hay algo en localStorage listar arreglo.
const seriesList = JSON.parse(localStorage.getItem("listaSeriesKey")) || [];

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
};

function cleanForm() {
    formSerie.reset();
};

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
        <button class="btn btn-warning my-1">
            <i class="bi bi-pencil-fill"></i>
        </button>
        <button class="btn btn-danger my-1" onclick="deleteProduct('${itemSerie.code}')">
            <i class="bi bi-x-circle-fill"></i>
        </button>
        </td>
    </tr> `;
};

// Borrar producto
window.deleteProduct = function (codigo) {
    console.log("Delete product " + codigo);
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

            //Actualizar tabla

            //Success delete

            Swal.fire(
                '¡Borrado!',
                'La serie a sido borrado con éxito.',
                'success'
            )
        }
    })

};
export function campoRequerido(input) {
    if (input.value.trim().length > 0) {
        console.log("El dato esta correcto")
    } else {
        input.className += " is-invalid";
        console.log("Invalid");
        let inputInvalid = document.querySelector('.invalid-feedback');
        console.log(inputInvalid);
        inputInvalid.innerHTML = "No puedes dejar el campo vacio.";
        return false;
    }
}


export function cantidadCaracteres(min, max, input) {
    if (input.value.trim().length >= min && input.value.trim().length <= max) {
      input.className = "form-control is-valid";
      return true;
    } else {
      input.className += " is-invalid";
      let inputInvalid = document.querySelector("#validateDescription");
      console.log(inputInvalid);
      inputInvalid.innerHTML = "Por favor ingresa una descripción.";
      return false;
    }
  }
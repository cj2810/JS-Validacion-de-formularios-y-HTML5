export function valida(input){
    const tipoInput= input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML= "";

    } else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector(".input-message-error").innerHTML =
        mostrarMensajeError(tipoInput, input);

    } 

}

const tipoDeErrores = [
"valueMissing",
"typeMismatch",
"patternMismatch",
"customError",
];

const mensajesDeError={
    nombre:{
        valueMissing: "El nombre no puede estar vacío",
    },
    email:{
        valueMissing: "El correo no puede estar vacío",
        typeMismatch: "Este correo no es valido",
    },
    password:{
        valueMissing: "La contraseña no puede estar vacío",
        patternMismatch: "Contraseña de 8-10 caracteres, Una letra mayuscula, Una letra miniscula, Un numero, Un caracter especial",
    },
    nacimiento:{
        valueMissing: "La fecha de Nacimiento no puede estar vacío",
        customError: "debes tener al menos 18 años de edad",
    },
    telefono:{
        valueMissing: "El telefono no puede estar vacío",
        patternMismatch: "El formato requerido es 10 numeros",
    },
    direccion:{
        valueMissing: "El campo de ubicacion no puede estar vacío",
        patternMismatch: "la dirección debe contener de 10 a 40 caracteres",
    },
    ciudad:{
        valueMissing: "El campo de ciudad no puede estar vacío",
        patternMismatch: "La ciudad debe contener de 4 a 20 caracteres",
    },
    departamento:{
        valueMissing: "El campo de Departamento no puede estar vacío",
        patternMismatch: "El departamento debe contener de 4 a 20 caracteres",
    },

};



const validadores={
    nacimiento: (input)=> validarNacimiento(input),
};

function mostrarMensajeError(tipoInput, input){
    let mensaje = "";
   tipoDeErrores.forEach((error) => {
        if (input.validity[error]){

            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoInput],[error])
           
            mensaje = mensajesDeError[tipoInput][error];
        }

    });

    return mensaje;

}

function validarNacimiento(input) {
    const fechaCliente = new Date (input.value);
    let mensaje = "";
    if (!mayorEdad(fechaCliente)) {
        mensaje="debes tener al menos 18 años de edad";}

 
 input.setCustomValidity(mensaje);
}

function mayorEdad(fecha){
    const fechaActual= new Date();
    const diferenciaFecha= new Date(
        fecha.getUTCFullYear() +18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
   
    return diferenciaFecha < fechaActual;
};


// Declaración de variables para validar el formulario
const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');
const button = document.getElementById('btn-submit');


// Expresiones regulares para validar los carácteres escritos 
const expressions = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im 
}

const fields = {
    name: false,
    email: false,
    phone: false
}

// VALIDA CADA CAMPO CON UNA EXPRESSIÓN REGULAR
const validateForm = (event) => {
    switch (event.target.name){
        case "name":
            validateField(expressions.name, event.target, 'name');
        break;

        case "email":
            validateField(expressions.email, event.target, 'email');
        break;

        case "phone":
            validateField(expressions.phone, event.target, 'phone');
        break;
    }
}

// ASIGNA QUÉ ES LO QUE HACE CUANDO ESCRIBIMOS UNA COSA U OTRA EN LOS INPUTS, LA REUTILIZAREMOS ARRIBA
const validateField = (expression, input, field) => {
    if(expression.test(input.value)){
        document.getElementById(`${field}-container`).classList.remove('form-container-incorrect');
        document.getElementById(`${field}-container`).classList.add('form-container-correct');
        document.querySelector(`#${field}-container i`).classList.add('fa-circle-check');
        document.querySelector(`#${field}-container i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#${field}-container .form-input-error`).classList.remove('form-input-error-active') 
        fields[field] = true;
    } else{
        document.getElementById(`${field}-container`).classList.add('form-container-incorrect');
        document.getElementById(`${field}-container`).classList.remove('form-container-correct');
        document.querySelector(`#${field}-container i`).classList.remove('fa-circle-check');
        document.querySelector(`#${field}-container i`).classList.add('fa-circle-xmark');
        document.querySelector(`#${field}-container .form-input-error`).classList.add('form-input-error-active')
        fields[field] = false;
    }
}


// COMPROBACIÓN INPUTS (Al escribir o levantar la tecla)
inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm,)
    });


// EVENT VALIDATION (valida el formulario y evita que se envie)
form.addEventListener("submit", (event) => {
    event.preventDefault();

    if(fields.name && fields.email && fields.phone){
        form.reset();
        document.getElementById('success-message').classList.add('success-message-active');
        setTimeout(() => {
            document.getElementById('success-message').classList.remove('success-message-active')
        }, 5000);

 
        document.getElementById('form-message').classList.remove('form-message-active');
        

        document.querySelectorAll('.form-container-correct').forEach((icon) => {
            icon.classList.remove('form-container-correct');
        })

    } else {
        document.getElementById('form-message').classList.add('form-message-active');
        setTimeout(() => {
            document.getElementById('form-message').classList.remove('form-message-active');
        }, 20000);
    }
});









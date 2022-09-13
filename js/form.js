
// Declaración de variables para validar el formulario
const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');
const message = document.getElementById('message');
const button = document.getElementById('btn-submit');
const url = "https://database.deta.sh/v1/a0wwnrex/contactmessages/items";


// Expresiones regulares para validar los carácteres escritos 
const expressions = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
}

const fields = {
    name: false,
    email: false,
    phone: false,
    message: false,
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
    }  else{
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

const validateMessage = () => {
    if(message.value.length >= 50){
        document.getElementById(`message-container`).classList.remove('form-container-incorrect');
        document.querySelector(`#message-container .form-input-error`).classList.remove('form-input-error-active')
        fields.message = true;
    } else{
        document.getElementById(`message-container`).classList.add('form-container-incorrect')
        document.querySelector(`#message-container .form-input-error`).classList.add('form-input-error-active')
        fields.message = false;
    }
}
message.addEventListener('keyup', validateMessage);




// EVENT VALIDATION (valida el formulario y evita que se envie)
form.addEventListener("submit", (event) => {
    event.preventDefault();

    if(fields.name && fields.email && fields.phone && fields.message){

        // Activamos el mensaje de success y lo quitamos a los 5 segundos
        document.getElementById('success-message').classList.add('success-message-active');
        setTimeout(() => {
            document.getElementById('success-message').classList.remove('success-message-active')
        }, 5000);

        // Eliminamos el mensaje de error cuando el formulario ya está correcto
        document.getElementById('form-message').classList.remove('form-message-active');
        
        // Eliminamos los iconos de X o check
        document.querySelectorAll('.form-container-correct').forEach((icon) => {
            icon.classList.remove('form-container-correct');
        })

        const data ={
            name: document.querySelector('#name-input').value,
            email: inputs[1].value,
            phone: inputs[2].value,
            message: message.value
        }

        const body = {item: data}
        const fetchParams = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-API-Key': 'a0wwnrex_JeRhBybn5iFYziStv9d2M6Mchd2b4B4H'
            },
            body: JSON.stringify(body)
        }
        // Ejecutamos el fetch
        fetch(url, fetchParams)
            .then(response => {
                if(response.ok) return response.json();
            })
            .then(json => {
                if("key" in json){
                    console.log(json);
                    form.reset();    
                }
            });


    } else {
        // Mostramos el mensaje de error cuando el formulario no está correcto
        document.getElementById('form-message').classList.add('form-message-active');
        setTimeout(() => {
            document.getElementById('form-message').classList.remove('form-message-active');
        }, 20000);
    }

   
});





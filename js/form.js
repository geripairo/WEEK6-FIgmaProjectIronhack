
    let form = document.form;
    let input = form.elements;
    let button = document.getElementById('submit-btn');

    let validateName = function(){
        if(form.name.value.length === 0 ){
            form.name.style.backgroundColor= "red";
        } else return true;
    }

    let validatePhone = function(){

    }

    const validate = function(event){
        validateName(event);
        event.preventDefault();
    }

    form.addEventListener("submit", validate);








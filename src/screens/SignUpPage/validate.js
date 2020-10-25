export const validate = (form, setErrors) => {
 let input = form
 let errors = {}
 let isValid = true

    if(!form.username){
        isValid = false
        errors["username"] = "Por favor, digite um nome de usuário"    
    }

    if(!form.username !== 'undefined'){
        let pattern = new RegExp(/^[a-z0-9]{8,15}$/g)
        if(!pattern.test(input["username"])){
            isValid = false
            errors["username"] = "O nome de usuário deve conter apenas letras minúsculas e números e deve ter entre 8 e 15 caracteres"
        }
    }
    
    if(!form.email){
        isValid = false
        errors["email"] = "Por favor, digite seu e-mail"    
    }

    if(typeof form.email !== 'undefined'){
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Por favor, digite um e-mail válido";
        }
    }

    if(!form.password){
        isValid = false
        errors["password"] = "Por favor, digite uma senha"
    }

    if(typeof form.password !== 'undefined'){
        let pattern = new RegExp(/^[a-z0-9]{6,12}$/g)
        if(!pattern.test(input["password"])){
            isValid = false
            errors["password"] = "Sua senha deve ter entre 6 e 12 caracteres e conter apenas letras e números"
        }
    }


    setErrors(errors)

    return isValid

}

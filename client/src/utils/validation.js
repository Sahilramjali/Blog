

export const ValidateEmail=(email)=>{
    const validUserEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validUserEmail.test(String(email).toLowerCase());
}


export const ValidatePassword = (password) => {
    const validPassword =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])|(?=.*?[#?!@$%^&*-]).{8,16}$/;
    return validPassword.test(String(password));
  };

  export const ValidateUsername=(name)=>{
    if(name<3){
      return false;
    }
    else{
      return true;
    }
  }
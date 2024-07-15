export const verifyEmail = async (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail: boolean = emailRegex.test(email);
    return isValidEmail
   }
export const verifyUserInputs = async (email: string, password: string) => {      
    let isEmailValid = true;
    let isPasswordValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail: boolean = emailRegex.test(email);
    if(password.length < 7){
      isPasswordValid = false;
    }
    if (!isValidEmail){
      isEmailValid = false;
    }
    return {isPasswordValid, isEmailValid}
}
export const verifypasswordUserInputs = async (password: string, confirmPassword: string) => {      
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d.*\d).{6,}$/;

    let isPasswordValid = passwordPattern.test(password);
    let isConfirmPasswordValid = password === confirmPassword;
    
    return { isPasswordValid, isConfirmPasswordValid };
};
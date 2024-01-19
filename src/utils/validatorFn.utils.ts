import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function isRegistered(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isRegistered = control.value.includes('nhocdl.poro1@gmail.com')
        return isRegistered ? { isRegistered: true } : null;
    };
}



export function userNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        var usernameRegex = /^[a-zA-Z0-9_]+$/;
        const isValidUserName = usernameRegex.test(control.value)
        return !isValidUserName && control.value.length > 8 && control.value.length < 50 ? { NotValidUserName: true } : null;
    };
}

export function nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        var nameRegex = /^[a-zA-Z\s]+$/;
        const isValidName = nameRegex.test(control.value)
        return !isValidName && control.value.length > 2 && control.value.length < 21 ? { NotValidName: true } : null;
    };
}


export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        // Define the regex pattern for a valid password
        const hasNumber = /\d/;
        const hasUppercase = /[A-Z]/;
        const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (control.value.length < 8) {
            return null
        }
        return (!hasNumber.test(control.value)) ? { invalidPassword: "number" } : (!hasUppercase.test(control.value)) ? { invalidPassword: "uppercase" } : (!hasSymbol.test(control.value)) ? { invalidPassword: "symbol" } : null;
    }
}

export const misMatchValidator: ValidatorFn = (
    control: AbstractControl,
): ValidationErrors | null => {
    const password = control.get('password');
    const verifyPassword = control.get('verifyPassword');

    if (password?.value !== verifyPassword?.value) {
        control.get('verifyPassword')?.setErrors({
            misMatch: false
        })
        return { misMatch: false }
    } else {
        control.get('verifyPassword')?.setErrors(null)
        return null
    }

};
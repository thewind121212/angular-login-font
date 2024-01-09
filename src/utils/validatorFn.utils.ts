import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export function isRegistered(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isRegistered = control.value.includes('nhocdl.poro1@gmail.com')
        return isRegistered ? { isRegistered: true } : null;
    };
}

export const misMatchValidator: ValidatorFn = (
    control: AbstractControl,
): ValidationErrors | null => {
    const password = control.get('password');
    const verifyPassword = control.get('verifyPassword');

    if (password?.value !== verifyPassword?.value) {
       control.get('verifyPassword')?.setErrors({
        misMatch: true
       })
       return {misMatch : false}
    } else {
       control.get('verifyPassword')?.setErrors(null)
        return null
    }

};
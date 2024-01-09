import { FormControl, FormGroup } from "@angular/forms";

export interface InputInterface {
    formGroup: FormGroup;
    id: number;
    type: string;
    label: string;
    formControlName: string;
    controller: FormControl
}

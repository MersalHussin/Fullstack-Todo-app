import { nameRegister } from "../types";

export interface IRegisterInput {
    name:nameRegister;
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;
    }
}

export interface IErrorMessage {
    error:{
        // deatils?:{
        //     errors:{
        //         message:string
        //     }[];
        // }
        message?:string;
    }
}

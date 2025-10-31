import { IRegisterInput } from "../interfaces";

export const REGISTER_FORM : IRegisterInput[] = [
{
        name: "username",
        placeholder: "Enter your username",
        type: "text",
        validation:{
            required: true,
            minLength: 5,
        }
    },
    {
        name: "email",
        placeholder: "Enter your email",
        type: "email",
        validation:{
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
    },
    {
        name: "password",
        placeholder: "Enter your password",
        type: "password",
        validation:{
            required: true,
            minLength: 6,
        }
    }
]

export const LOGIN_FORM : IRegisterInput[] = [
    {
        name: "email",
        placeholder: "Enter your email",
        type: "email",
        validation:{
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
    },
    {
        name: "password",
        placeholder: "Enter your password",
        type: "password",
        validation:{
            required: true,
            minLength: 6,
        }
    }
]
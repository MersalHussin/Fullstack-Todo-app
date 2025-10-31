import * as yup from "yup"

export const registerSchema = yup
  .object({
    username: yup.string().required("Username is Requird").min(5, "Username should be at least 5 characters"),
    email: yup.string().required("Email is Requird").email("Not a valid email"),
    password: yup.string().required("Password is Requird").min(6, "Password should be at least 6 characters"),
  })
  .required()

export const loginSchema = yup
  .object({
    email: yup.string().required("Email is Requird").email("Not a valid email"),
    password: yup.string().required("Password is Requird").min(6, "Password should be at least 6 characters"),
  })
  .required()
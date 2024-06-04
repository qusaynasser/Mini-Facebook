import * as yup from 'yup';

export const loginSchema=yup.object({
    username:yup.string().required("userName is required"),
    password:yup.string().required("Password is required").min(6,"password must be at least 6 characters").max(13,"password must be max 13 characters")
})

export const registerSchema=yup.object({
    username:yup.string().required("userName is required"),
    name:yup.string().required("name is required"),
    email:yup.string().required("email is required"),
    password:yup.string().required("password is required").min(6,"password must be at least 6 characters").max(13,"password must be max 13 characters"),
    image:yup.string().required("image is required")
})
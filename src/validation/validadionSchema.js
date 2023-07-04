import * as yup from "yup";

export const validationSchema = yup.object().shape({
    email: yup.string().required('Email is required!').email('Invalid email address'),
    login: yup.string().required('Login is required!').min(2, 'Min size 2 letters').max(100, 'Max size 16 letters'),
    password: yup.string().required('Password is required!').min(2, 'Min size 2 letters').max(100, 'Max size 16 letters'),
});
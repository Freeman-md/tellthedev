export { }

declare global {

    type RegisterInfo = {
        email: string,
        firstName: string,
        lastName: string,
        password: string,
    }

    type RegisterFormData = {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

}
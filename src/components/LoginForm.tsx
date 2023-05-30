import { useContext } from "react";
import AuthFirebaseContext from "../context/AuthFirebaseContext";
import AuthModalContext from "../context/AuthModalContext";
import LoginFormModel from "../models/LoginForm.model";
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";

const LoginForm = () => {
  const { login } = useContext(AuthFirebaseContext);
   const {setModalVisibility } = useContext(AuthModalContext);

   const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

   const handleLogin = async (values: LoginFormModel) => {
    const { email, password, } = values;
    try {
      await login(email, password);
      setModalVisibility("hidden");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Formik
    initialValues={{ email: '', password: '' }}
    validationSchema={LoginSchema}
    onSubmit={handleLogin}
  >
    <Form>
      <div>
        <label htmlFor="email">Email</label>
        <Field type="email" name="email" />
        <ErrorMessage name="email" component="div" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <Field type="password" name="password" />
        <ErrorMessage name="password" component="div" />
      </div>

      <button type="submit">Login</button>
    </Form>
  </Formik>
  )
}

export default LoginForm
import LoginFormModel from "../models/LoginForm.model";
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useFirebaseAuth } from "../services/firebase.service";
import { IFormStatus } from "../models/FormStatus.model";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { formStatusProps } from "../utils/formStatus";

const LoginForm = () => {
  const { login } = useFirebaseAuth();

  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: 'loading',
  })

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const handleLogin = async (values: LoginFormModel) => {
    const { email, password, } = values;
    try {
      await login(email, password);
    } catch (error) {
      const errorMessage = (error as FirebaseError).message;
      if (errorMessage.includes("(auth/wrong-password)")) {
        setFormStatus(formStatusProps.wrongPassword);
      }
      else if (errorMessage.includes("(auth/user-not-found)")) {
        setFormStatus(formStatusProps.userNotFound);
      }
      else {
        setFormStatus(formStatusProps.error);
      }
    }
  };

  return (
    <>
      <div className={`${formStatus.type == 'error' ? 'text-red-500' : 'text-green-600'} text-center font-bold p-4 rounded mb-4`}>
        {formStatus.message}
      </div>
      <Formik
        initialValues={{ email: 'testfavorites@test.fr', password: 'password' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        <Form>
          <div className="mb-3">
            <label className="inline-block mb-2" htmlFor="email">Email</label>
            <Field className="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" type="email" name="email" id="email" value="testfavorites@test.fr"/>
            <ErrorMessage className="text-red-500" name="email" component="div" />
          </div>

          <div className="mb-3">
            <label className="inline-block mb-2" htmlFor="password">Password</label>
            <Field className="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" type="password" name="password" id="password" value="password" />
            <ErrorMessage className="text-red-500" name="password" component="div" />
          </div>

          <button className="block w-full mt-5 bg-blue-400 text-white py-1.5 px-3 rounded transition hover:bg-blue-500" type="submit">Login</button>
        </Form>
      </Formik>
    </>
  )
}

export default LoginForm
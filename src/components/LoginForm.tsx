import LoginFormModel from "../models/LoginForm.model";
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useFirebaseAuth} from "../services/firebase.service";

const LoginForm = () => {
  const { login } = useFirebaseAuth();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const handleLogin = async (values: LoginFormModel) => {
    const { email, password, } = values;
    try {
      await login(email, password);
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
        <div className="mb-3">
          <label className="inline-block mb-2" htmlFor="email">Email</label>
          <Field className="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" type="email" name="email" id="email" />
          <ErrorMessage className="text-red-500" name="email" component="div" />
        </div>

        <div className="mb-3">
          <label className="inline-block mb-2" htmlFor="password">Password</label>
          <Field className="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" type="password" name="password" id="password" />
          <ErrorMessage className="text-red-500" name="password" component="div" />
        </div>

        <button className="block w-full mt-5 bg-blue-400 text-white py-1.5 px-3 rounded transition hover:bg-blue-500" type="submit">Login</button>
      </Form>
    </Formik>
  )
}

export default LoginForm
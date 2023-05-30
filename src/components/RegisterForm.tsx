import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import RegisterFormModel from '../models/RegisterForm.model'
import { useContext } from 'react';
import AuthFirebaseContext from '../context/AuthFirebaseContext';
import AuthModalContext from '../context/AuthModalContext';

const RegisterForm = () => {

  const { register } = useContext(AuthFirebaseContext);
  const { setModalVisibility } = useContext(AuthModalContext);

  const handleRegister = async (values: RegisterFormModel) => {
    const { email, password, confirmPassword } = values;
    try {
      await register(email, password || confirmPassword);
      setModalVisibility("hidden");
    } catch (error) {
      console.log(error);
    }
  };

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required')
  })

  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={RegisterSchema}
      onSubmit={handleRegister}
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

        <div className="mb-3">
          <label className="inline-block mb-2" htmlFor="confirmPassword">Confirm Password</label>
          <Field className="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" type="password" name="confirmPassword" id="confirmPassword" />
          <ErrorMessage className="text-red-500" name="confirmPassword" component="div" />
        </div>

        <button className="block w-full mt-5 bg-blue-400 text-white py-1.5 px-3 rounded transition hover:bg-blue-500" type="submit">Register</button>
      </Form>
    </Formik>
  )



}

export default RegisterForm
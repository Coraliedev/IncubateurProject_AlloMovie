import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import RegisterFormModel from '../models/RegisterForm.model'
import { useFirebaseAuth } from '../services/firebase.service';
import { IFormStatus } from '../models/FormStatus.model';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { formStatusProps } from '../utils/formStatus';


const RegisterForm = () => {

  const { register } = useFirebaseAuth();

  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: 'loading',
  })

  const handleRegister = async (values: RegisterFormModel) => {
    const { email, password, confirmPassword } = values;
    try {
      await register(email, password || confirmPassword);
    } catch (error) {
      const errorMessage = (error as FirebaseError).message;
      if (errorMessage.includes("(auth/email-already-in-use)")) {
        setFormStatus(formStatusProps.duplicate);
      }
      else {
        setFormStatus(formStatusProps.error);
      }
    }
  }

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required')
  })

  return (
    <>
      <div className={`${formStatus.type == 'error' ? 'text-red-500' : 'text-green-600'} text-center font-bold p-4 rounded mb-4`}>
        {formStatus.message}
      </div>
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
    </>
  )
}

export default RegisterForm

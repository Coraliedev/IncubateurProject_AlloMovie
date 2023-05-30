import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import RegisterFormModel from '../models/RegisterForm.model'
import { useContext } from 'react';
import AuthFirebaseContext from '../context/AuthFirebaseContext';
import AuthModalContext from '../context/AuthModalContext';

const RegisterForm = () => {

  const { register } = useContext(AuthFirebaseContext);
   const {setModalVisibility } = useContext(AuthModalContext);

  const handleRegister = async (values: RegisterFormModel) => {
    const { email, password, confirmPassword } = values;
    try {
      await register(email, password||confirmPassword);
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
      onSubmit={ handleRegister}
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

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Field type="password" name="confirmPassword" />
          <ErrorMessage name="confirmPassword" component="div" />
        </div>

        <button type="submit">Register</button>
      </Form>
    </Formik>
  )



}

export default RegisterForm
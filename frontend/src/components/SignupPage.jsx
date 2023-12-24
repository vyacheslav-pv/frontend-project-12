import {
  Form, Row, Col, Card, Container, Button,
} from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import routes from '../routes.js';
import { useAuth } from '../hooks/index.jsx';
import signup from '../images/signup.jpg';

const SignupPage = () => {
  const inputRef = useRef();
  const { t } = useTranslation();

  const navigate = useNavigate();

  const auth = useAuth();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignupSchema = Yup.object().shape({
    username: Yup
      .string()
      .trim()
      .min(3, t('signupPage.schemaValidation.minUser'))
      .max(20, t('signupPage.schemaValidation.maxUser'))
      .notOneOf([Yup.ref('busyName'), null], t('signupPage.schemaValidation.userExists'))
      .required(t('signupPage.schemaValidation.required')),
    password: Yup
      .string()
      .trim()
      .required(t('signupPage.schemaValidation.required'))
      .min(6, t('signupPage.schemaValidation.minPassword')),
    confirmPassword: Yup
      .string()
      .oneOf([Yup.ref('password'), null], t('signupPage.schemaValidation.PasMustMatch')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      busyName: null,
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.signupPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          formik.setFieldValue('busyName', values.username);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="card shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={signup}
                  className="rounded-circle"
                  alt="Регистрация"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signupPage.h1text')}</h1>
                <Form.Floating
                  className="mb-3"
                >
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    type="text"
                    ref={inputRef}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={t('signupPage.userPlaceholder')}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.username && formik.errors.username}
                  />
                  <Form.Label htmlFor="username">{t('signupPage.userLabel')}</Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating
                  className="mb-3"
                >
                  <Form.Control
                    name="password"
                    required
                    autoComplete="new-password"
                    placeholder={t('signupPage.passPlaceholder')}
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.password && formik.errors.password)}
                  />
                  <Form.Label htmlFor="password">{t('signupPage.passLabel')}</Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Form.Floating
                  className="mb-4"
                >
                  <Form.Control
                    name="confirmPassword"
                    autoComplete="new-password"
                    type="password"
                    required
                    onBlur={formik.handleBlur}
                    placeholder={t('signupPage.confPassPlaceholder')}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    isInvalid={(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                  />
                  <Form.Label htmlFor="confirmPassword">{t('signupPage.confPassLabel')}</Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Floating>
                <Button variant="outline-primary" type="submit" className="w-100">
                  {t('signupPage.signButton')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;

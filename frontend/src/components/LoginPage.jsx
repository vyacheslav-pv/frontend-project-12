import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
  Form, Row, Col, Card, Container,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import login from '../images/login.jpg';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const SignInSchema = Yup.object().shape({
    username: Yup
      .string(),
    password: Yup
      .string()
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        return navigate('/');
      } catch (error) {
        if (error.isAxiosError) {
          if (error.response?.status === 401) {
            inputRef.current.select();
            return setAuthFailed(true);
          }
          return toast.error(t('loginPage.toastError'));
        }
        throw error;
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-content-center">
        <Col xs={12} md={8} xxl={6}>
          <Card className="card shadow-sm">
            <Card.Body className="card-body row p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={login}
                  className="rounded-circle"
                  alt="Войти"
                />
              </Col>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('loginPage.h1text')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('loginPage.username')}
                    type="text"
                    id="username"
                    onChange={formik.handleChange}
                    isInvalid={formik.errors.username || authFailed}
                    ref={inputRef}
                    value={formik.values.username}
                  />
                  <div>{formik.errors.username}</div>
                  <Form.Label htmlFor="username">{t('loginPage.username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder={t('loginPage.password')}
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    isInvalid={(formik.touched.password && formik.errors.password) || authFailed}
                    value={formik.values.password}
                  />
                  <Form.Label
                    className="form-label"
                    htmlFor="password"
                  >
                    {t('loginPage.password')}
                  </Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{t('loginPage.invalid')}</Form.Control.Feedback>
                </Form.Group>
                <button
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary"
                >
                  {t('loginPage.h1text')}
                </button>
              </Form>
            </Card.Body>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('loginPage.textFooter')}</span>
                <Link to={routes.signUpPage()}>{t('loginPage.linkFooter')}</Link>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;

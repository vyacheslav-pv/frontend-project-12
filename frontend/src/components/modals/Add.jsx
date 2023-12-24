import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import { setCurrentChannelId, selectors } from '../../slices/channelsSlice';
import { useSocket } from '../../hooks/index.jsx';

const Add = ({ hideModal }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const { socketApi } = useSocket();
  const { t } = useTranslation();

  const channelsNames = useSelector(selectors.selectAll).map((channel) => channel.name);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object({
    channelName: Yup.string().required().trim()
      .min(3, t('modals.add.schemaValidation.min'))
      .max(20, t('modals.add.schemaValidation.min'))
      .notOneOf(channelsNames, t('modals.add.schemaValidation.uniqueName'))
      .required(t('modals.add.schemaValidation.uniqueName')),
  });

  const formik = useFormik({
    initialValues: { channelName: '' },
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await socketApi.addChannel({ name: values.channelName });
        if (response.status === 'ok') {
          dispatch(setCurrentChannelId(response.data.id));
        }
        toast.success(t('modals.add.succesAddChannel'));
        console.log(hideModal());
        hideModal();
      } catch (err) {
        inputRef.current.select();
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title className="h4">{t('modals.add.modalChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Form.Group>
            <Form.Control
              required
              className="mb-2"
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channelName}
              id="channelName"
              name="channelName"
              disabled={formik.isSubmitting}
              isInvalid={formik.submitCount && formik.errors.channelName}
            />
            <Form.Label className="visually-hidden" htmlFor="channelName">{t('modals.add.labelChannelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.channelName}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" type="button" onClick={hideModal} className="me-2">{t('modals.add.buttonCanсel')}</Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('modals.add.buttonSubmit')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;

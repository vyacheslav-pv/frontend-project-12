import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { selectors } from '../../slices/channelsSlice';
import { useSocket } from '../../hooks/index.jsx';

const Rename = ({ modalInfo, hideModal }) => {
  const inputRef = useRef();
  const { socketApi } = useSocket();
  const { channel } = modalInfo;
  const { t } = useTranslation();

  const channelsNames = useSelector(selectors.selectAll).map((c) => c.name);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required().trim()
      .min(3, t('modals.rename.schemaValidation.min'))
      .max(20, t('modals.rename.schemaValidation.max'))
      .notOneOf(channelsNames, t('modals.rename.schemaValidation.uniqueName')),
  });

  const formik = useFormik({
    initialValues: { name: channel.name },
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const modifiedChannel = { id: channel.id, name: values.name.trim() };
        await socketApi.renameChannel(modifiedChannel);
        toast.success(t('modals.rename.succesRenameChannel'));
        hideModal();
      } catch (err) {
        toast.error(t('modals.rename.succesErrorChannel'));
        inputRef.current.select();
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title className="h4">{t('modals.rename.modalTitle')}</Modal.Title>
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
              value={formik.values.name}
              id="name"
              name="name"
              disabled={formik.isSubmitting}
              isInvalid={formik.submitCount && formik.errors.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('modals.rename.labelChannelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" type="button" onClick={hideModal} className="me-2">{t('modals.rename.buttonCanсel')}</Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {t('modals.rename.buttonSubmit')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;

import {
  Modal, FormGroup, Button,
} from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSocket } from '../../hooks/index.jsx';

const Remove = ({ modalInfo, hideModal }) => {
  const { channel } = modalInfo;
  const { socketApi } = useSocket();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  return (
    <Modal show centered onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title className="h4">{t('modals.remove.modalTitle')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setLoading(true);
              await socketApi.removeChannel(channel);
              toast.success(t('modals.remove.succesDelChannel'));
              hideModal();
            } catch (error) {
              setLoading(false);
            }
          }}
        >
          <p className="lead">{t('modals.remove.confDelete')}</p>
          <FormGroup>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" disabled={loading} type="button" onClick={hideModal} className="me-2">
                {t('modals.remove.buttonCanсel')}
              </Button>
              <Button variant="danger" disabled={loading} type="submit">
                {t('modals.remove.buttonSubmit')}
              </Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;

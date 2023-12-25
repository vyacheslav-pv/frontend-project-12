/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Form, Row, Col, Container, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import fetchData from '../slices/fetchDataSlice.js';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import MessagesBox from './chat/MessagesBox.jsx';
import { useSocket } from '../hooks/index.jsx';
import Channels from './chat/Channels.jsx';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import useFilter from '../hooks/useFilter.jsx';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { socketApi } = useSocket();
  const filter = useFilter();

  const [chatMessage, setChatMessage] = useState('');
  const messages = useSelector(messagesSelectors.selectAll);
  const { username } = JSON.parse(localStorage.getItem('userId'));
  const channels = useSelector(channelsSelectors.selectAll);
  const currentMessages = messages.filter(({ idMessage }) => idMessage === currentChannelId);

  console.log(chatMessage);

  const channelActive = channels
    .filter(({ id }) => id === currentChannelId)
    .map((c) => filter.clean(c.name)).join();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  useEffect(() => {
    setChatMessage('');
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filterMessage = filter.clean(chatMessage);
    console.log(filterMessage);
    await socketApi.sendMessage(
      { newMessage: filterMessage, idMessage: currentChannelId, username },
    );
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Col className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  {`# ${channelActive}`}
                </b>
              </p>
              <span className="text-muted">{t('chatPage.messages', { count: currentMessages.length })}</span>
            </div>
            <MessagesBox />
            <div className="mt-auto px-5 py-3">
              <Form onSubmit={handleSubmit} noValidate="" className="py-1 border rounded-2">
                <Form.Group className="input-group has-validation">
                  <Form.Control
                    name="body"
                    aria-label={t('chatPage.ariaLabel')}
                    placeholder={t('chatPage.placeholder')}
                    className="border-0 p-0 ps-2 form-control"
                    type="text"
                    onChange={(e) => setChatMessage(e.target.value)}
                    value={chatMessage}
                  />
                  <Button type="submit" id="button-message" variant="outline-white" className="btn-group-vertical" disabled={!chatMessage.trim()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                    </svg>
                    <span className="visually-hidden">{t('chatPage.send')}</span>
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;

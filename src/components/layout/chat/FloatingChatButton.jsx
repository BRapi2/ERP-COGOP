import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, CloseButton, InputGroup } from 'react-bootstrap';
import { BsChatDotsFill, BsCheckCircleFill } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import TypingIndicator from './TypingIndicator';
import styles from './FloatingChatButton.module.css';

const initialMessage = {
  id: 1,
  from: 'bot',
  type: 'menu',
  text: `¡Hola! ¿Cómo podemos ayudarte hoy?`,
  options: ['Consultar estado de mensaje', 'Seguimiento de producto', 'Escribir un comentario'],
  timestamp: new Date(),
};

function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const currentUser = { name: localStorage.getItem('email') || 'Invitado' };
  const navigate = useNavigate();
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const resetChat = () => {
    setConversation([{...initialMessage, timestamp: new Date()}]);
    setIsLoading(false);
    setInputValue('');
  };

  const handleToggle = () => {
    if (isOpen) resetChat();
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    const userMessage = { id: Date.now(), from: 'user', type: 'text', text: option, timestamp: new Date() };
    let botResponse;
    const botTimestamp = new Date();
    botTimestamp.setSeconds(botTimestamp.getSeconds() + 1); // Pequeño delay para la respuesta

    switch (option) {
      case 'Consultar estado de mensaje':
        botResponse = { id: Date.now() + 1, from: 'bot', type: 'form', inputType: 'message_tracking', text: 'Claro, por favor ingresa el número de seguimiento de tu mensaje.', timestamp: botTimestamp };
        break;
      case 'Seguimiento de producto':
        botResponse = { id: Date.now() + 1, from: 'bot', type: 'form', inputType: 'product_tracking', text: 'Entendido, por favor ingresa el código de seguimiento de tu producto.', timestamp: botTimestamp };
        break;
      case 'Escribir un comentario':
        botResponse = { id: Date.now() + 1, from: 'bot', type: 'form', inputType: 'comment', text: 'Por supuesto, déjanos tu pregunta o sugerencia a continuación.', timestamp: botTimestamp };
        break;
      default:
        return;
    }
    setConversation(prev => [...prev, userMessage, botResponse]);
  };

  const handleFormSubmit = (e, formType) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage = { id: Date.now(), from: 'user', type: 'text', text: inputValue, timestamp: new Date() };
    setConversation(prev => [...prev, userMessage]);
    setIsLoading(true);
    const currentValue = inputValue;
    setInputValue('');

    setTimeout(() => {
      let botResponse;
      if (formType === 'comment') {
        botResponse = { id: Date.now() + 1, from: 'bot', type: 'success', text: '¡Mensaje Enviado! Gracias por escribir. Te contestaremos a la brevedad.', timestamp: new Date() };
      } else {
        if (currentValue.toLowerCase().includes('error')) {
          botResponse = { id: Date.now() + 1, from: 'bot', type: 'error', text: `Lo sentimos, no encontramos información para "${currentValue}". Verifica el código.`, timestamp: new Date() };
        } else {
          botResponse = { id: Date.now() + 1, from: 'bot', type: 'result', text: `El ítem con código "${currentValue}" fue despachado el ${new Date().toLocaleDateString('es-ES')}. Se espera su llegada en 3 días.`, timestamp: new Date() };
        }
      }
      setIsLoading(false);
      setConversation(prev => [...prev, botResponse, { ...initialMessage, id: Date.now() + 2, timestamp: new Date() }]);
    }, 2000);
  };

  const renderActionArea = () => {
    if (isLoading) return null; // No muestra nada en el footer mientras carga
    const lastBotMessage = [...conversation].reverse().find(m => m.from === 'bot');
    if (!lastBotMessage || lastBotMessage.type !== 'form') return null;

    const placeholderText = lastBotMessage.inputType === 'comment' ? "Escribe tu comentario..." : "Ej: A-12345";
    const buttonText = lastBotMessage.inputType === 'comment' ? <FiSend /> : "Buscar";
    
    return (
      <Form onSubmit={(e) => handleFormSubmit(e, lastBotMessage.inputType)} className={styles.actionForm}>
        <InputGroup>
          <Form.Control as={lastBotMessage.inputType === 'comment' ? "textarea" : "input"} rows={1} placeholder={placeholderText} value={inputValue} onChange={e => setInputValue(e.target.value)} className={styles.actionInput} autoFocus />
          <Button variant="primary" type="submit">{buttonText}</Button>
        </InputGroup>
      </Form>
    );
  };

  return (
    <>
      {isOpen && (
        <Card className={styles.chatWindow}>
          <Card.Header as="h5" className={styles.chatHeader}>
            <span>Soporte y Dudas</span>
            <CloseButton onClick={handleToggle} />
          </Card.Header>
          <Card.Body className={styles.chatTranscript}>
            {conversation.map(msg => (
              <div key={msg.id} className={`${styles.messageWrapper} ${msg.from === 'user' ? styles.userWrapper : styles.botWrapper}`}>
                <div className={`${styles.message} ${msg.from === 'user' ? styles.userMessage : styles.botMessage}`}>
                  {msg.type === 'menu' ? (
                    <>
                      <p className="mb-2">{msg.text}</p>
                      <div className="d-grid gap-1">{msg.options.map(opt => <Button key={opt} variant="outline-primary" size="sm" className={styles.optionButton} onClick={() => handleOptionSelect(opt)}>{opt}</Button>)}</div>
                    </>
                  ) : msg.type === 'success' ? (
                    <div className="text-center"><BsCheckCircleFill className={styles.successIcon} /><p className="mb-0 mt-2">{msg.text}</p></div>
                  ) : ( <p className="mb-0">{msg.text}</p> )}
                </div>
                <span className={styles.timestamp}>{msg.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}
            {isLoading && <div className={styles.botWrapper}><TypingIndicator /></div>}
            <div ref={chatEndRef} />
          </Card.Body>
          <div className={styles.actionArea}>
            {renderActionArea()}
          </div>
        </Card>
      )}
      {!isOpen && <Button onClick={handleToggle} className={styles.fab}><BsChatDotsFill size={24} /></Button>}
    </>
  );
}

export default FloatingChatButton;
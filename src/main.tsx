import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import App from './components/App';
import 'modern-normalize';
import './index.css';

Modal.setAppElement('#root');

const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}

import { useState } from 'react';
import Modal from './components/Modal';

const App = () => {
  const [isOpen, setIsOpen] = useState(null);

  const close = () => {
    setIsOpen(null);
  };

  return (
    <div className="d-flex flex-column gap-5">
      <h1>Main</h1>

      <h1>Categories</h1>

      <a href="/"> Elektronics </a>
      <a href="/"> Clothing </a>
      <a href="/"> Technology </a>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing.
        Pariatur id iste corrupti. Consectetur, corporis dolorem.
        Praesentium velit et necessitatibus, adipisci nobis assumenda?
        Eum veniam rerum similique sequi totam natus!
        Accusamus ducimus, dicta voluptate iusto facilis quas.
        Et autem dolores voluptatem sit inventore vero!
        Debitis unde iusto, voluptates reprehenderit libero numquam.
      </p>

      <button
        onClick={() => setIsOpen('login')}
        className="btn btn-dark"
      >
        Sign in
      </button>
      <button
        onClick={() => setIsOpen('mode')}
        className="btn btn-dark"
      >
        Dark Mod
      </button>
      <button
        onClick={() => setIsOpen('warn')}
        className="btn btn-dark"
      >
        Warning
      </button>

      {isOpen === 'login' ? (
        <Modal close={close}>
          <input type="text" />
          <input type="text" />
        </Modal>
      ) : isOpen === 'warn' ? (
        <Modal close={close}>
          <h3>Are you sure you want to delete?</h3>
        </Modal>
      ) : isOpen === 'mode' ? (
        <Modal close={close}>
          <label>DARK MOD</label>
          <input type="checkbox" />
        </Modal>
      ) : (
        ''
      )}
    </div>
  );
};

export default App;

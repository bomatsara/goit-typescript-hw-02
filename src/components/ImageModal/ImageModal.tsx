import Modal from 'react-modal';
import { PhotoType } from '../../ts/types';

type ImageModalProps = {
  photo: PhotoType | null;
  isOpen: boolean;
  closeModal: () => void;
}

export default function ImageModal({ photo, isOpen, closeModal }: ImageModalProps) {
  const customStyles: object = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },

    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      backgroundColor: 'transparent',
      border: 0,
    },
  };

  Modal.setAppElement('#root');

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={closeModal}
    >
      {photo && (
        <div>
          <img src={photo.urls.regular} alt={photo.alt_description} />
        </div>
      )}
    </Modal>
  );
};
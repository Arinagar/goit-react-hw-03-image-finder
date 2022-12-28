import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

state = { showModal: false };

toggleModal = () => {
  this.setState(prev => ({ showModal: !prev.showModal }));
};

export const ImageGallery = ({ data }) => {
  console.log(data);
  return (
    <ul className={css.imageGallery}>
      {data.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <li className={css.imageGalleryItem} key={id}>
            <img
              src={webformatURL}
              alt={tags}
              className={css.ImageGalleryItem_image}
            />
            <Modal />
          </li>
        );
      })}
    </ul>
  );
};

import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard.js';
import { MutableRefObject } from 'react';
import { PhotoType } from '../../ts/types';

type ImageGalleryProps = {
  photos: PhotoType[];
  onPhotoClick: (photo: PhotoType) => void;
  firstNewPhotoIndex: MutableRefObject<number>;
  firstNewPhotoRef: MutableRefObject<HTMLLIElement | null>;
}

export default function ImageGallery({
                                       photos,
                                       onPhotoClick,
                                       firstNewPhotoIndex,
                                       firstNewPhotoRef,
                                     }: ImageGalleryProps) {
  return (
    <>
      <ul className={css['gallery']}>
        {photos.map((photo, index) => {
          const isFirstNewPhoto = index === firstNewPhotoIndex.current;
          return (
            <li className={css['gallery-item']} key={photo.id} ref={isFirstNewPhoto ? firstNewPhotoRef : null}>
              <ImageCard photo={photo} onPhotoClick={onPhotoClick} />
            </li>
          );
        })}
      </ul>
    </>
  );
};
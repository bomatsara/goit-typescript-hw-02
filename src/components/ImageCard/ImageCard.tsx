import css from './ImageCard.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import React from 'react';
import { PhotoType } from '../../ts/types';

type ImageCardProps = {
  photo: PhotoType;
  onPhotoClick: (photo: PhotoType) => void;
}

export default function ImageCard({ photo, onPhotoClick }: ImageCardProps) {
  const imageUrl: string = photo.urls.small ?? photo.urls.regular;
  const alt: string = photo.alt_description;

  return (
    <>
      <div onClick={() => {
        onPhotoClick(photo);
      }} className={css['image-card']}>
        <img src={imageUrl} alt={alt} />

        <div className={css['image-card-overlay']}>
          <FaMagnifyingGlass className={css['icon']} />
        </div>
      </div>
    </>
  );
};
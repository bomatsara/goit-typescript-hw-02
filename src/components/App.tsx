import Section from './layout/Section/Section';
import SearchBar from './SearchBar/SearchBar';
import { useEffect, useRef, useState } from 'react';
import getPhotos from '../ts/unsplash-api';
import Loader from './Loader/Loader.js';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';
import errorMessages from '../data/error_messages.json';
import { PhotoType } from '../ts/types';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [totalPhotos, setTotalPhotos] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null);
  const firstNewPhotoRef = useRef<HTMLLIElement | null>(null);
  const firstNewPhotoIndex = useRef<number>(0);

  useEffect(() => {
    if (!query) return;

    async function fetchPhotos() {
      try {
        setLoading(true);
        setError(false);
        setErrorMessage('');
        const response = await getPhotos(query, page);

        if (response.data.results.length === 0) {
          setError(true);
          setErrorMessage(errorMessages.no_data);
        }

        setPhotos(prevPhotos => {
          firstNewPhotoIndex.current = prevPhotos.length;
          return [...prevPhotos, ...response.data.results];
        });
        setTotalPhotos(response.data.total);
      } catch (e) {
        setError(true);
        setErrorMessage(errorMessages.error);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();
  }, [query, page]);

  useEffect(() => {
    if (firstNewPhotoRef.current) {
      const offset = 10;
      const elementPosition = firstNewPhotoRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, [photos]);

  useEffect(() => {
    if (!errorMessage) return;

    toast.error(errorMessage);
  }, [errorMessage]);

  const handleSearch = (query: string) => {
    setQuery(query);
    setPhotos([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (photo: PhotoType) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <Section className="section-search" container={false} gap={false}>
        <SearchBar onSubmit={handleSearch} />
      </Section>

      <Section style={{
        textAlign: 'center',
      }} className="section-content">
        {photos.length > 0 && <ImageGallery
          photos={photos}
          onPhotoClick={openModal}
          firstNewPhotoRef={firstNewPhotoRef}
          firstNewPhotoIndex={firstNewPhotoIndex}
        />}
        {loading && <Loader />}
        {error && <ErrorMessage text={errorMessage} />}
        {photos.length < totalPhotos && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      </Section>

      <ImageModal photo={selectedPhoto} isOpen={!!selectedPhoto} closeModal={closeModal} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
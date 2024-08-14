import css from './LoadMoreBtn.module.css';

type LoadMoreBtnProps = {
  onClick: () => void;
}

export default function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return (
    <button className={css['btn-load-more']} onClick={onClick}>
      Load More
    </button>
  );
}
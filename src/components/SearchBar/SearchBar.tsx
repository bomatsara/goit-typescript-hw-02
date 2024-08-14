import css from './SearchBar.module.css';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import errorMessages from '../../data/error_messages.json';
import toast from 'react-hot-toast';
import React, { FormEvent } from 'react';

type SearchBarProps = {
  onSubmit: (query: string) => void;
  query?: string;
  errorHandle?: (errorMessage: string) => void;
}

export default function SearchBar({ onSubmit, query, errorHandle }: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const value = (form.elements.namedItem('search') as HTMLInputElement)?.value;

    if (!value || value.trim() === '') {
      toast.error(errorMessages.empty_query);
      if (errorHandle) {
        errorHandle(errorMessages.empty_query);
      }
      return;
    }

    onSubmit(value);
    form.reset();
  };

  return (
    <header className={css['header']}>
      <form onSubmit={handleSubmit} className={css['form']}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          className={css['form-input']}
        />
        <button className={css['form-btn']} type="submit" title="search">
          <FaMagnifyingGlass />
        </button>
      </form>
    </header>
  );
}
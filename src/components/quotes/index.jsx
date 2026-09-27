import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuote } from '../../features/quote/quoteSlice';
import styles from './styles.module.css';

function Quote () {
  const dispatch = useDispatch();
  const { quote, author, status, error } = useSelector((state) => state.quote);

  useEffect(() => {
    dispatch(fetchQuote());
  }, [dispatch]);

  const handleNewQuote = () => {
    dispatch(fetchQuote());
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Random Quote Generator</h1>

      <div className={styles.quoteBox}>
        {status === 'loading' && <p className={styles.text}>Загрузка...</p>}

        {status === 'failed' && (
          <p className={styles.error}>Ошибка: {error}</p>
        )}

        {/* Если статус успешен ИЛИ если цитата просто есть в сторе */}
        {quote && (
          <>
            <p className={styles.text}>"{quote}"</p>
            <p className={styles.author}>- {author}</p>
          </>
        )}
      </div>

      <button
        className={styles.button}
        onClick={handleNewQuote}
        disabled={status === 'loading'}
      >
        New Quote
      </button>
    </div>
  );
};

export default Quote;
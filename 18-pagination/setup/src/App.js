import React, { useState, useEffect } from 'react';
import { useFetch } from './useFetch';
import Follower from './Follower';
import Message from './Message';

function App() {
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [cardsPerPage, setCardsPerPage] = useState(10);
  const [showMessage, setShowMessage] = useState(false);
  const [isError, setIsError] = useState(false);

  const { loading, data } = useFetch(cardsPerPage);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page, data]);

  const handlePage = (id) => {
    setPage(id);
  };

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) nextPage = 0;
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage - 1;
      if (nextPage < 0) nextPage = data.length - 1;
      return nextPage;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal < 1 || inputVal > 100) {
      setShowMessage(true);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
        setShowMessage(false);
      }, 2000);
      return;
    }
    setShowMessage(true);
    setCardsPerPage(inputVal);
    setTimeout(() => {
      setIsError(false);
      setShowMessage(false);
    }, 2000);
  };
  return (
    <main>
      <div className="section-title">
        <h1>{loading ? 'loading...' : 'Dynamic pagination'}</h1>
        <div className="underline"></div>
        <form onSubmit={handleSubmit} className="section-form">
          <input
            type="number"
            placeholder="number of cards"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <button type="submit" className="btn-submit">
            paginate
          </button>
          {showMessage && <Message isError={isError} cardsPerPage={cardsPerPage} />}
        </form>
      </div>
      <section className="followers">
        <div className="container">
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>
        {!loading && (
          <div className="btn-container">
            <button className="prev-btn" onClick={prevPage}>
              Prev
            </button>

            {data.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`page-btn ${index === page ? 'active-btn' : null}`}
                  onClick={() => handlePage(index)}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className="next-btn" onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;

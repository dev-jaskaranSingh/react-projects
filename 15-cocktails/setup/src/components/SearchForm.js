import React from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
  const { setSerchTerm } = useGlobalContext();
  const searchValue = React.useRef('');

  React.useEffect(() => {
    searchValue.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const searchCocktail = () => {
    setSerchTerm(searchValue.current.value);
  };
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">serch your favorite cocktail</label>
          <input type="text" id="name" ref={searchValue} onChange={searchCocktail} />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;

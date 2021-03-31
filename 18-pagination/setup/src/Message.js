import React from 'react';

const Message = ({ isError, cardsPerPage }) => {
  return (
    <div className="error-msg">
      {isError ? (
        <p className="err">Ooops. Number of users should be in range 1-100 </p>
      ) : (
        <p>Contrats! You successfully paginated {cardsPerPage} cards per page</p>
      )}
    </div>
  );
};

export default Message;

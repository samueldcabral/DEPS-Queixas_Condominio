import React, { useState } from 'react';

const QueixaContext = React.createContext([{}, () => {}]);

const QueixaProvider = (props) => {
  const [state, setState] = useState({
    id: 22,
    email: "sdsad@gmail.com",
    token: "32321$5fdfsfsd"
  });
  return (
    <QueixaContext.Provider value={[state, setState]}>
      {props.children}
    </QueixaContext.Provider>
  );
}

export { QueixaContext, QueixaProvider };
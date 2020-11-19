import React, { useState } from 'react';

const QueixaContext = React.createContext({}, () => {return 1});

const QueixaProvider = (props) => { 
  const [user, setUser] = useState({
    id: 22,
    email: "sdsad@gmail.com",
    token: "32321$5fdfsfsd"
  });
  return (
    <QueixaContext.Provider value={{user, setUser}}>
      {props.children}
    </QueixaContext.Provider>
  );
}

export { QueixaContext, QueixaProvider };
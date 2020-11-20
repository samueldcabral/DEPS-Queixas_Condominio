import React, { useState } from 'react';

const QueixaContext = React.createContext({}, () => {return 1});

const QueixaProvider = (props) => { 
  const [user, setUser] = useState({
    id: -1,
    email: "teste@teste.com",
    token: "naoéumtoken"
  });
  return (
    <QueixaContext.Provider value={{user, setUser}}>
      {props.children}
    </QueixaContext.Provider>
  );
}

export { QueixaContext, QueixaProvider };
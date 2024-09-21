import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let CounterContext = createContext(0);

export function CounterContextProvider(props) {
    let headers = {
        token: localStorage.getItem('userToken'),
      } 
// const [counter, setCounter] = useState(0);
// const [userName, setUserName] = useState('');

function getCounter() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` ,{
         headers: headers
     })
     .then((apiResponse) => apiResponse)  //return response
     .catch((error) => error)  //return error        
     }
  
     useEffect(()=> {
        getCounter()
    },[])

    return<>
    <CounterContext.Provider value={{getCounter}}>
            {props.children}
    </CounterContext.Provider>
    </>
}
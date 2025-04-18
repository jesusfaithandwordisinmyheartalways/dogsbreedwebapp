









// to store code (like state logic) that can be reused by both the client and admin folders.


import React, { createContext , useState} from 'react'


export const SharedContext = createContext(null)



const AppContextProvider = ({ children }) => {
    const [ userOrders, setUserOrders ] = useState([])



    const SharedContextStateValue = { userOrders, setUserOrders }



  return (
   <>

        <SharedContext.Provider value={SharedContextStateValue}>
                {children}
            </SharedContext.Provider>

   </>
  )
}




export default AppContextProvider


import React, { createContext, useState } from 'react'
// creating context
export const addResponseContext = createContext()
export const updateResponseContext = createContext()

function Contextshare({children}) {
  // profile
    const [addResponse,setAddResponse] = useState("")
    // edit project
    const [editResponse,setEditResponse] = useState("")
  return (
    <>
    <addResponseContext.Provider value={{addResponse,setAddResponse}} >
       <updateResponseContext.Provider value={{editResponse,setEditResponse}}>
        {children}
       </updateResponseContext.Provider>
    </addResponseContext.Provider>
    </>
  )
}

export default Contextshare
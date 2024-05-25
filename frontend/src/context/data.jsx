import { createContext, useState } from "react";

export const TodoContext = createContext(null)

export const DataProvider = (props)=>{
    const [data,setData] = useState([])
    return (
        <TodoContext.Provider value={{data,setData}}>
            {props.children}
        </TodoContext.Provider>
    )
}
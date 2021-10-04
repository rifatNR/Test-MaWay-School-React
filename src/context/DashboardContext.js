import axios from 'axios';
import React, { createContext, useReducer } from 'react';
// import setDefaultHeader from '../Utility/SetAxiosDefaultHeader';
import { dashboardReducer } from './DashboardReducer';
export const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
    const initianState = {
        user: null
    }
    const [state, dispatch] = useReducer(dashboardReducer, initianState)

    return (
        <DashboardContext.Provider 
            value={{
                
            }}>
            { props.children }
        </DashboardContext.Provider>
    )
}

export default DashboardContextProvider;
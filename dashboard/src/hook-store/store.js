import {useState, useEffect} from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () =>{
    console.log("RENDERED")
    const setState = useState(globalState)[1];

    const dispatch = (actionIdentifier, payload) =>{
        const newState = actions[actionIdentifier](globalState,payload);
        globalState = {...globalState, ...newState};

        for(const listener of listeners){
            listeners(globalState);
        }
    }

    useEffect(()=>{
        listeners.push(setState);

        return ()=>{
            listeners.filter(li => li !== setState)
        };

    },[setState])
    
    return [globalState, dispatch]
}

export const initStore = (userAction, initialState) =>{
    if(initialState){
        globalState = {...globalState, ...initialState};
    }

    actions = {...actions, ...userAction};
}


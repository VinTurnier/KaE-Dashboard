import {initStore, useStore} from './store';

export const configureAuthStore = () =>{

    const actions = {
        AUTHENTICATE: (curState, auth)=>{
            let updatedAuth = {
                ...curState.auth,
                isAuthenticated: auth.isAuthenticated,
            }
            return {auth: updatedAuth}
        },
        

    };

    initStore(actions,{auth: {
        isAuthenticated: false,
    }});
};
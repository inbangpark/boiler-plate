import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'


export default function(SpecificComponent, option, adminRoute = null) {

    
    
    function AuthentificationCheck(props) {

        const dispatch = useDispatch();
        useEffect(() => {
            
            dispatch(auth()).then(response => {
                
                // before login
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                } else {
                    // after login
                    if (adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    } else {
                        if (option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })
        },[])

        return (
            <SpecificComponent />
        )
    }



    return AuthentificationCheck
}
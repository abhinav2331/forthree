import React, { useEffect } from "react";
import History from '../../history.js';

export default function Logout() {
    
    useEffect(() => {
        sessionStorage.clear();
        History.push('/login');
    }, []);

    return (
        <div>
            
        </div>
        )
}
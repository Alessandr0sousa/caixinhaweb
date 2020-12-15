import React, { useState, useEffect } from 'react';
import './styles.css';

function Loader() {
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{

    });

    const timer = ()=>{
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }
    return(
        <div className="fundo">
            <div id="square"></div>
        </div>
    )

}

export default Loader;
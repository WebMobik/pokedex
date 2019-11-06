import React from 'react'
import './error-indicator.css'
import icon from './pokeball_PNG24.webp'

const ErrorIndicator = () => {
    return (
        <div className="error-text">
            <div className="error-title">
                <img src={ icon } alt="error icon"/>
                <h2>BOOM!</h2>
            </div>
            <div className="error-pretitle">
                <p>Something has gone tembily</p>
                <p>(but we already sent pokemons to fix it)</p>
            </div>
        </div>
    )
}

export default ErrorIndicator
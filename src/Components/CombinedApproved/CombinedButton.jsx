import React from 'react'
import { TbSum } from "react-icons/tb";
import { Link } from 'react-router-dom';

export const CombinedButton = () => {
    return (
        <>
            <Link to="/combinedView">
                <div className='combined-button-bottom'>
                    <p><TbSum /></p>
                </div>
            </Link>

        </>
    )
}
import React from 'react'
import { Spinner } from 'react-bootstrap'
import "./LoaderComponent.css"

export default function LoaderComponent() {
    return (
        <div className='spinnerComponent'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}
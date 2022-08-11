import React from 'react'
// import image
import image from '../images/Vector.png'

const Loader = () => {
  return (
    <div className="loader">
        <div className="loader__inner">
            <div className="loader__inner__text">
                <img src={image} alt="loading" />
            </div>
        </div>
    </div>
  )
}

export default Loader
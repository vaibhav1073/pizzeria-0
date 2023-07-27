import React from 'react'
import { imgLinks } from '../utilities/carousel'
import "./CarouselPizza.css"

function CarouselPizza() {
  return (
    <div id="carouselExampleSlidesOnly" className="carousel slide w-100" data-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img className="d-block img-fluid w-100 carousel-img"  src={imgLinks.first} alt="First slide" />
      </div>
      <div className="carousel-item">
        <img className="d-block w-100  carousel-img" src={imgLinks.second} alt="Second slide" />
      </div>
      <div className="carousel-item">
        <img className="d-block w-100 carousel-img" src={imgLinks.third} alt="Third slide" />
        
      </div>
    </div>
  </div>
  )
}

export default CarouselPizza
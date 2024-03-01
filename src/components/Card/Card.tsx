import React, { useEffect, useState } from 'react';
import { IProduct } from '../../types/types';

export default function Card() {
  const tovari = [
    {
      id: 1,
      image: "https://m.media-amazon.com/images/I/815eN0AS-CL._AC_UF1000,1000_QL80_.jpg",
      name: "Apple iPhone 15 Pro Max (256 GB)",
      price: "1.336$",
    },
    {
      id: 2,
      image: "https://cdn.mos.cms.futurecdn.net/HkdMToxijoHfz4JwUgfh3G-1200-80.jpg",
      name: "PlayStation 5 Slim 1TB CFI-2000A",
      price: "610$",
    },
  ]

  return (
      <ul className='card__list'>
        {tovari.map((product: IProduct) => (
          <li key={product.id} className="card">
            <img className="image" src={product.image} alt={product.name} />
            <div className="column__content">
              <strong className="product__title">{product.price}</strong>
              <span className="product__description">{product.name}</span>
            </div>
          </li>
        ))}
      </ul>
  )
}
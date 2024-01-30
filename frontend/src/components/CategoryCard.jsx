import React from 'react'
import '../styles/card.css'
import { Link } from 'react-router-dom'

const categoryCard = ({category, onAddTransaction}) => {

  return (
    <>
    <Link to={`/category/${category._id}`} className='link'>
      <div key={category._id} className='card' style={{borderColor: `rgb(${category.color})`, backgroundColor: `rgba(${category.color},.4)`}}>
        <div>
          <h3>{category.name}</h3>
          <button type='button' onClick={(e) => onAddTransaction(e, category._id)} className='invisable-btn'>+</button>      
        </div>
        <h4>${Number(category.total).toLocaleString('en', {useGrouping:true})}</h4>
      </div>
    </Link>
    
    </>
  )
}

export default categoryCard
import React from 'react'
import '../styles/card.css'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

const categoryCard = ({category, onAddTransaction}) => {

  return (
    <>
    <Link to={`/category/${category._id}`} className='link'>
      <div key={category._id} className='card' style={{borderColor: `${category.color}`, backgroundColor: `${category.color}40`}}>
        <div>
          <h3>{category.name}</h3>
          <button type='button' onClick={(e) => onAddTransaction(e, category._id)} className='clear-btn'><FiPlus /></button>      
        </div>
        <h4>${Number(category.total).toLocaleString('en', {useGrouping:true})}</h4>
      </div>
    </Link>
    
    </>
  )
}

export default categoryCard
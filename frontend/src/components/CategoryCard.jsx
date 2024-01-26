import React from 'react'
import '../styles/card.css'
import { Link } from 'react-router-dom'

const categoryCard = ({category}) => {
  return (
    <Link to={`/category/${category._id}`} className='link'>
      <div key={category._id} className='card' style={{borderColor: `rgb(${category.color})`, backgroundColor: `rgba(${category.color},.4)`}}>
        <h3>{category.name}</h3>
        <h4>${Number(category.total).toLocaleString('en', {useGrouping:true})}</h4>
      </div>
    </Link>
  )
}

export default categoryCard
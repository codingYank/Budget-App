import React from 'react'
import '../styles/card.css'

const categoryCard = ({category}) => {
  return (
    <div key={category._id} className='card' style={{borderColor: `rgb(${category.color})`, backgroundColor: `rgba(${category.color},.3)`}}>
      <h3>{category.name}</h3>
      <h4>${Number(category.total).toLocaleString('en', {useGrouping:true})}</h4>
    </div>
  )
}

export default categoryCard
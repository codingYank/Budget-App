import React from 'react'

const categoryCard = ({category}) => {
  console.log(category)
  return (
    <div key={category._id}>
      <h3>{category.name}</h3>
      <h4>${category.total}</h4>
    </div>
  )
}

export default categoryCard
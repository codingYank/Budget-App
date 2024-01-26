import React from 'react'
import '../styles/modal.css'

const AddCategory = ({show}) => {
  const close = () => {
    show(false)
  }
  return (
    <div className='modal-screen'>
      <div className='modal-content'>
        <button type='button' onClick={close}>X</button>
        <h1>New category</h1>
      </div>
    </div>
  )
}

export default AddCategory
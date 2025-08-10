import React from 'react'
import "./Title.css"
const Title = ({title,parg}) => {
  return (
    <div className='main_title'>
      <h1>{title}</h1>
      <h5>{parg}</h5>
    </div>
  )
}

export default Title

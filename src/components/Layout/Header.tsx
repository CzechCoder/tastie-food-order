import React from 'react'
import mealsPic from '../../assets/food.jpg'
import classes from './Header.module.css'
import HeaderCartBtn from './HeaderCartBtn'
import { ShowCart } from '../../types'

const Header = (props: ShowCart) => {
  return (
    <>
    <header className={classes.header}>
        <h1>Tastie</h1>
        <HeaderCartBtn showCart={props.showCart}/>
    </header>
      <div className={classes['main-image']}>
        <img src={mealsPic} alt="meals" />
      </div>
    </>
  )
}

export default Header

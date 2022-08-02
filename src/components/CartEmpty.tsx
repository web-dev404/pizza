"use strict";

import {Link} from "react-router-dom";
import cartEmptyImg from '../assets/img/empty-cart.png'
import React from 'react';

const CartEmpty: React.FC = () => {
    return (
        <>
            <div className="cart cart--empty">
                <h2>Корзина пустая <span>😐</span></h2>

                <p>Вы не добавили пиццу в корзину
                <br/>
                Для того чтобы заказать пиццу перейдите на главную страницу</p>
                <img src={cartEmptyImg} alt=""/>
                <Link to={'/'} className={'button button--black'}><span>вернуться наазд</span></Link>
            </div>
        </>
    )
}

export default CartEmpty;
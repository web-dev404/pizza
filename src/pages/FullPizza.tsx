"use strict";
import {useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from "react";
import axios from "axios";
import React from 'react';

const FullPizza: React.FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string,
        title: string,
        price: number
    }>();
    const {id} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const {data} = await axios.get(`https://62b80cc9f4cb8d63df57e196.mockapi.io/items/${id}`)
                setPizza(data);
            } catch (error) {
                alert('Ошибка при получении пиццы')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return <>Загрузка...</>
    }

    return (
        <div className="container full-pizza__wrapper">
            <img src={pizza.imageUrl} alt=""/>
            <p className={'full-pizza__title'}>{pizza.title}</p>
            <p className={'full-pizza__price'}>{pizza.price} рублей</p>
        </div>
    )
}

export default FullPizza;
"use strict";
import React from 'react';

type CategoriesProps = {
    value: number,
    onChangeCategory: (index: number) => void
}

const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые'
];

const Categories: React.FC<CategoriesProps> = ({value, onChangeCategory}) => {
    return (
        <div className="categories">
            <ul>
                {
                    categories.map((categoryName, index) => (
                        <li onClick={() => onChangeCategory(index)} key={index} className={value === index ? "active" : ""}>{categoryName}</li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Categories;
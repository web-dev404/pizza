"use strict";

import Categories from "../components/Categories";
import Sort, {list} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import * as React from "react";
import {useEffect, useRef} from "react";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import qs from 'qs';
import {Link, useNavigate} from "react-router-dom";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzasSlice";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const {categoryId, sort, currentPage} = useSelector(selectFilter)
    const {items, status} = useSelector(selectPizzaData)
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const {searchValue} = useSelector(selectFilter)

    const onChangeCategory = (id: number) => {
        dispatch(setCategoryId(id));
    }

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            // @ts-ignore
            fetchPizzas({
            category,
            sortBy,
            order,
            search,
            currentPage
        }))

        window.scrollTo(0, 0);
    }

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    }

    // Если изменили параматры и был первый рендер
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            });

            navigate(`?${queryString}`)
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage])

    // Если при загрузке страницы в адресной строке есть доп. параметры то преобразовываем их в объект и перекидываем в redux через setFilter
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = list.find(obj => obj.sortProperty === params.sortProperty) // Ищем нужный параметр и берём объект в котором этот параметр находится

            dispatch(setFilters({
                ...params,
                sort
            }));

            isSearch.current = true;
        }
    }, [])

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i}/>);
    const pizzas = items.map((obj: any) => (<Link key={obj.id} to={`/pizza/${obj.id}`}><PizzaBlock {...obj} /></Link>));

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? <div className="cart cart--empty">
                <h2>Произошла ошибка <span>😐</span></h2>

                <p>К сожалению не удалось получить пиццы. Попробуйте повторить попытку позже</p>
            </div> : <>
                <div className="content__items">
                    {/*Если грузится то показываем скелетон, иначе отображаем загруженные пиццы*/}
                    {status === 'loading' ? skeletons : pizzas}
                </div>

                <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
            </>}
        </div>
    )
}

export default Home;
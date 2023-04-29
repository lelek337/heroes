import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import store from "../../store";

import { filtersChanged, fetchFilters, selectAll } from './filterSlice';
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);

  const filters = selectAll(store.getState())
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilters());
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner/>;
  } else if (filtersLoadingStatus === "error") {
    return <h4 className="text-center mt-5">Ошибка загрузки</h4>
  }

  const renderFilters = (arr) => {
    if (arr.length === 0) {
        return <h4 className="text-cener mt-5">Филтры не найдены</h4>
    }
    return arr.map(({name, className, label}) => {

        const btnClass = classNames('btn', className, {
            'active': name === activeFilter
        });
        return <button
                  key={name}
                  id={name}
                  className={btnClass}
                  onClick={() => dispatch(filtersChanged(name))}
                  >{label}</button>
    })
  }

  const elements = renderFilters(filters)

  return (
      <div className="card shadow-lg mt-4">
          <div className="card-body">
              <p className="card-text">Отфильтруйте героев по элементам</p>
              <div className="btn-group">
                {elements}
              </div>
          </div>
      </div>
  )
}

export default HeroesFilters;

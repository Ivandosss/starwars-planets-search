import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import DataContext from './DataContext';

function DataProvider({ children }) {
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  });
  const [data, setData] = useState([]);
  const fetchData = () => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json()).then(({ results }) => {
        const filtro = results.map(({ residents, ...planetInfo }) => planetInfo);
        setData(filtro);
      });
  };
  useEffect(() => fetchData(), []);
  return (
    <DataContext.Provider value={ { data, setData, filters, setFilters } }>
      { children }
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default DataProvider;

import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Button,
  Label,
  Collapse
} from 'reactstrap';
import Continent from './components/Continent';
import Country from './components/Country';
import NotFound from './components/NotFound';

const propTypes = {
  styles: PropTypes.object.isRequired,
  continents: PropTypes.array.isRequired,
  selectedCount: PropTypes.object.isRequired,
  selected: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  activeItems: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onContinentChange: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired
};

const ContinentCountries = ({
  styles,
  continents,
  selectedCount,
  selected,
  query,
  activeItems,
  onSelect,
  onContinentChange,
  onSelectAll
}) => {
  const searchQuery = query.trim().toLowerCase();
  const shouldFilter = searchQuery.length >= 3 && searchQuery.length <= 20;

  const renderCountry = (country, shouldFilter, searchQuery, shouldRender) => {
    // Check if component should render
    if (!shouldRender) return null;

    if (shouldFilter) {
      const countryName = country.name.toLowerCase();

      if (countryName.indexOf(searchQuery) === -1) return null;
    }

    return (
      <Country
        styles={styles}
        country={country}
        isChecked={!!selected[country.code]}
        onSelect={onSelect}
      />
    );
  };

  const renderContinentCountries = () => {
    const continentCountries = [];

    // Outer loop to create parent
    continents.forEach(continent => {
      const shouldRenderCountry = activeItems[continent.code];
      const countriesCount = continent.countries.length;

      const countries = [];
      let selectedCountries = 0;

      continent.countries.forEach(country => {
        // Count selected countries
        if (selected[country.code]) selectedCountries += 1;

        const countryComponent = renderCountry(
          country,
          shouldFilter,
          searchQuery,
          shouldRenderCountry
        );

        if (countryComponent) {
          countries.push(<div key={country.code}>{countryComponent}</div>);
        }
      });

      // Check if continent component should be rendered
      const shouldRenderContinent = !shouldFilter || countries.length;
      // Select all counties check
      const selectedState = selectedCountries !== countriesCount;

      if (shouldRenderContinent) {
        continentCountries.push(
          <Continent
            key={continent.code}
            styles={styles}
            continent={continent}
            filtering={shouldFilter}
            selectedState={selectedState}
            selectedCountries={selectedCountries}
            countriesCount={countriesCount}
            shouldRenderCountry={shouldRenderCountry}
            countries={countries}
            onSelectAll={onSelectAll}
            onContinentChange={onContinentChange}
          />
        );
      }
    });

    // Check if there are any continents/countries after filtering
    if (continentCountries.length) return continentCountries;

    return <NotFound styles={styles} message="No countries found." />;
  };

  return <div>{renderContinentCountries()}</div>;
};

ContinentCountries.propTypes = propTypes;
export default ContinentCountries;

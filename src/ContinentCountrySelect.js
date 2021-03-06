import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, Input } from 'reactstrap';
import styles from './styles.module.css';
import ContinentCountries from './ContinentCountries';

const propTypes = {
  continents: PropTypes.array.isRequired,
  selected: PropTypes.object,
  toggleContinent: PropTypes.object,
  options: PropTypes.object,
  translations: PropTypes.object,
  customComponent: PropTypes.func,
  onChange: PropTypes.func.isRequired
};

const defaultProps = {
  selected: {},
  toggleContinent: {
    AF: false,
    AN: false,
    AS: false,
    OC: false,
    EU: false,
    NA: false,
    SA: false
  },
  translations: {
    toggleText: 'Toggle',
    notFoundText: 'No countries found.'
  },
  customComponent: null
};

const ContinentCountrySelect = ({
  continents,
  selected,
  toggleContinent,
  translations,
  customComponent,
  onChange
}) => {
  const [query, setQueryState] = useState('');
  const [activeItems, setActiveItemState] = useState({ ...toggleContinent });

  const onContinentChange = item => {
    setActiveItemState(prevState => ({
      ...prevState,
      [item]: !prevState[item]
    }));
  };

  const onSearch = event => {
    const keys = Object.keys(activeItems);

    const target = event.target;
    const value = target.value;
    const openMenu = value.trim().length >= 3;
    keys.forEach(key => {
      activeItems[key] = openMenu;
    });

    setActiveItemState({ ...activeItems });
    setQueryState(value);
  };

  const onClear = () => {
    const keys = Object.keys(activeItems);

    keys.forEach(key => {
      activeItems[key] = false;
    });

    setActiveItemState({ ...activeItems });
    setQueryState('');
  };

  const onSelect = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    selected[name] = value;

    onChange(selected);
  };

  const onSelectAll = (item, selectedState) => {
    const continent = continents.find(c => c.code === item);

    continent.countries.forEach(c => {
      selected[c.code] = selectedState;
    });

    onChange(selected);
  };

  return (
    <div>
      <FormGroup>
        <InputGroup>
          <Input
            type="text"
            className="form-control"
            name="query"
            value={query}
            placeholder="Search..."
            onChange={onSearch}
          />
          {query && (
            <button
              type="button"
              className="btn"
              style={{ marginLeft: '-40px', zIndex: '100' }}
              onClick={onClear}
            >
              &times;
            </button>
          )}
        </InputGroup>
      </FormGroup>
      <ContinentCountries
        styles={styles}
        continents={continents}
        selectedCount={{}}
        selected={selected}
        query={query}
        activeItems={activeItems}
        translations={translations}
        customComponent={customComponent}
        onSelect={onSelect}
        onContinentChange={onContinentChange}
        onSelectAll={onSelectAll}
      />
    </div>
  );
};

ContinentCountrySelect.propTypes = propTypes;
ContinentCountrySelect.defaultProps = defaultProps;
export default ContinentCountrySelect;

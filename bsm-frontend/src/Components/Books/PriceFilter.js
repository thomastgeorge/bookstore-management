import React from 'react';
import PropTypes from 'prop-types';

export function PriceFilter({
  priceRange: { min: minPrice, max: maxPrice },
  currentFilters,
  updateFilter,
  setting: { storeLanguage: language, storeCurrency: currency }
}) {
  const firstRender = React.useRef(true);
  const [from, setFrom] = React.useState(() => {
    const minPriceFilter = currentFilters.find((f) => f.key === 'min_price');
    return minPriceFilter ? minPriceFilter.value : minPrice;
  });

  const [to, setTo] = React.useState(() => {
    const maxPriceFilter = currentFilters.find((f) => f.key === 'max_price');
    return maxPriceFilter ? maxPriceFilter.value : maxPrice;
  });

  React.useEffect(() => {
    firstRender.current = true;
    setFrom(() => {
      const minPriceFilter = currentFilters.find((f) => f.key === 'min_price');
      return minPriceFilter ? minPriceFilter.value : minPrice;
    });
    setTo(() => {
      const maxPriceFilter = currentFilters.find((f) => f.key === 'max_price');
      return maxPriceFilter ? maxPriceFilter.value : maxPrice;
    });
  }, [currentFilters]);

  React.useLayoutEffect(() => {
    const timeoutID = setTimeout(() => {
      if (!firstRender.current) {
        let minValue;
        let maxValue;
        if (from >= minPrice) minValue = from;
        if (to <= maxPrice) maxValue = to;

        const newFilters = currentFilters.map((f) => {
          if (f.key === 'min_price' && minValue) {
            return { ...f, value: minValue };
          }
          if (f.key === 'max_price' && maxValue) {
            return { ...f, value: maxValue };
          }
          return f;
        });

        if (minValue && !currentFilters.find(f => f.key === 'min_price')) {
          newFilters.push({ key: 'min_price', operation: 'eq', value: minValue });
        }
        if (maxValue && !currentFilters.find(f => f.key === 'max_price')) {
          newFilters.push({ key: 'max_price', operation: 'eq', value: maxValue });
        }

        updateFilter(newFilters);
      }
    }, 800);

    return () => clearTimeout(timeoutID);
  }, [from, to]);

  const onChange = (e, direction) => {
    e.persist();
    firstRender.current = false;
    const { value } = e.target;
    if (direction === 'min') {
      setFrom(Math.min(value, to - 5));
    }
    if (direction === 'max') {
      setTo(Math.max(value, from + 5));
    }
  };

  const formatPrice = (price) => {
    if (price > 999999) {
      return `${(price / 1000000).toFixed(1)}M`;
    }
    if (price > 999) {
      return `${(price / 1000).toFixed(1)}K`;
    }
    return price;
  };

  return (
    <div className="price-filter">
      <div className="filter-item-title">
        <span className="font-medium">Price Range</span>
      </div>
      <div className="price-range">
        <div className="flex items-center">
          <span className="mr-2">{formatPrice(from)}</span>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={from}
            onChange={(e) => onChange(e, 'min')}
          />
          <span className="ml-2">{formatPrice(to)}</span>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={to}
            onChange={(e) => onChange(e, 'max')}
          />
        </div>
        <div className="range-labels flex justify-between">
          <span>{formatPrice(minPrice)}</span>
          <span>{formatPrice(maxPrice)}</span>
        </div>
      </div>
    </div>
  );
}

PriceFilter.propTypes = {
  priceRange: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  }).isRequired,
  currentFilters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired,
  updateFilter: PropTypes.func.isRequired,
  setting: PropTypes.shape({
    storeLanguage: PropTypes.string,
    storeCurrency: PropTypes.string
  }).isRequired
};

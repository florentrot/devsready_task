import React from "react";

interface Props {
  onFilter: (filters: { name?: string; minPrice?: number; maxPrice?: number }) => void;
}

const ProductFilters: React.FC<Props> = ({ onFilter }) => {
  const [name, setName] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");

  const applyFilters = () => {
    onFilter({
      name: name || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        placeholder="Search name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Min price"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        placeholder="Max price"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button onClick={applyFilters}>Apply</button>
    </div>
  );
};

export default ProductFilters;

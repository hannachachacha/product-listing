interface Props {
  category: string;
  sort: string;
  search: string;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

export default function ProductFilters({ category, sort, search, onCategoryChange, onSortChange, onSearchChange }: Props) {
  return (
    <div className="mb-4 is-flex is-justify-content-space-between is-align-items-center is-flex-wrap-wrap">
      <div className="is-flex is-align-items-center">
        <div className="mr-3">
          <label className="mr-2">Category:</label>
          <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
            <option value="">All</option>
            <option value="men's clothing">Men's</option>
            <option value="women's clothing">Women</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>

        <div>
          <label className="mr-2">Sort by price:</label>
          <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
            <option value="">Default</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mr-2">Search:</label>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name..."
        />
      </div>
    </div>
  );
}

interface SearchFilterProps {
  onSearch: (value: string) => void;
  searchTerm: string;
}
const SearchFilter = ({ onSearch, searchTerm }: SearchFilterProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full rounded-lg border-slate-400 text-slate-300 border px-4 py-2 outline-none focus:ring-1 placeholder:text-slate-500"
      />
    </div>
  );
};

export default SearchFilter;

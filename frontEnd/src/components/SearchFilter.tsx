interface SearchFilterProps {
  onSearch: (value: string) => void;
}
const SearchFilter = ({ onSearch }: SearchFilterProps) => {
  return (
    <div>
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="🔍"
        className="w-full bg-slate-800 text-slate-100 py-2 px-3 border border-slate-500 transition outline-0 focus:border-indigo-400 rounded-xl placeholder:opacity-80 "
      />
    </div>
  );
};

export default SearchFilter;

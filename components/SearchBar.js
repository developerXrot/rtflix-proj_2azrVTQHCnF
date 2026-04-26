function SearchBar({ searchTerm, onSearch }) {
  try {
    return (
      <div className="max-w-xl mx-auto mb-12" data-name="search-bar" data-file="components/SearchBar.js">
        <div className="relative">
          <div className="icon-search text-xl text-[var(--text-secondary)] absolute right-4 top-1/2 -translate-y-1/2"></div>
          <input
            type="text"
            placeholder="ابحث عن سكريبت..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-4 pr-12 pl-4 text-white placeholder-[var(--text-secondary)] focus:border-white/50 outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => onSearch('')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-white transition-colors"
            >
              <div className="icon-x text-lg"></div>
            </button>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('SearchBar error:', error);
    return null;
  }
}
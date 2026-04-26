class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('ErrorBoundary:', error, info.componentStack); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">حدث خطأ</h1>
            <button onClick={() => window.location.reload()} className="bg-white text-black px-6 py-3 rounded-lg font-bold">إعادة تحميل</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const [scripts, setScripts] = React.useState([]);
    const [stats, setStats] = React.useState({ visitors: 0, downloads: 0 });
    const [searchTerm, setSearchTerm] = React.useState('');
    const [showAll, setShowAll] = React.useState(false);
    const SCRIPTS_PER_PAGE = 5;

    React.useEffect(() => { 
      loadScripts(); 
      trackVisit(); 
      const interval = setInterval(loadStats, 5000);
      return () => clearInterval(interval);
    }, []);

    const loadStats = async () => {
      try {
        const newStats = await StatsManager.getStats();
        setStats(newStats);
      } catch (e) { console.error(e); }
    };

    const filteredScripts = scripts.filter(script => {
      const data = script.objectData;
      const term = searchTerm.toLowerCase();
      return data.title?.toLowerCase().includes(term) || data.description?.toLowerCase().includes(term);
    });

    const displayedScripts = showAll ? filteredScripts : filteredScripts.slice(0, SCRIPTS_PER_PAGE);
    const hasMore = filteredScripts.length > SCRIPTS_PER_PAGE;

    const loadScripts = async () => {
      try {
        const result = await trickleListObjects('script', 100, true);
        setScripts(result.items || []);
      } catch (e) { console.error(e); }
    };

    const trackVisit = async () => {
      try { await StatsManager.incrementVisitors(); loadStats(); } catch (e) { console.error(e); }
    };

    return (
      <div className="min-h-screen bg-black" data-name="app" data-file="app.js">
        <Header />
        <Hero stats={stats} />
        <main className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-black text-center mb-8 tracking-tight">أحدث السكريبتات</h2>
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedScripts.map(script => <ScriptCard key={script.objectId} script={script} />)}
          </div>
          {hasMore && !showAll && (
            <div className="text-center mt-10">
              <button onClick={() => setShowAll(true)} className="btn-primary px-8 py-4 rounded-xl font-bold">إظهار المزيد ({filteredScripts.length - SCRIPTS_PER_PAGE} سكريبت)</button>
            </div>
          )}
          {filteredScripts.length === 0 && scripts.length > 0 && <p className="text-center text-[var(--text-secondary)] py-20">لا توجد نتائج للبحث "{searchTerm}"</p>}
          {scripts.length === 0 && <p className="text-center text-[var(--text-secondary)] py-20">لا توجد سكريبتات حالياً</p>}
        </main>
        <Footer />
      </div>
    );
  } catch (error) { console.error('App error:', error); return null; }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ErrorBoundary><App /></ErrorBoundary>);
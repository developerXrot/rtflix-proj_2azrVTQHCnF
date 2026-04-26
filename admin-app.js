class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('Error:', error, info); }
  render() {
    if (this.state.hasError) return <div className="min-h-screen flex items-center justify-center bg-black"><p className="text-white">حدث خطأ</p></div>;
    return this.props.children;
  }
}

function AdminApp() {
  try {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [scripts, setScripts] = React.useState([]);
    const [stats, setStats] = React.useState({ visitors: 0, downloads: 0 });
    const [showForm, setShowForm] = React.useState(false);
    const [editingScript, setEditingScript] = React.useState(null);

    React.useEffect(() => { 
      if (isAuthenticated) {
        loadData(); 
        const interval = setInterval(loadStats, 3000);
        return () => clearInterval(interval);
      }
    }, [isAuthenticated]);

    const loadStats = async () => {
      try {
        const newStats = await StatsManager.getStats();
        setStats(newStats);
      } catch (e) { console.error(e); }
    };

    const loadData = async () => {
      try {
        const scriptsResult = await trickleListObjects('script', 100, true);
        setScripts(scriptsResult.items || []);
        loadStats();
      } catch (e) { console.error(e); }
    };

    const handleSave = async (data) => {
      try {
        if (editingScript) await trickleUpdateObject('script', editingScript.objectId, data);
        else await trickleCreateObject('script', data);
        setShowForm(false); setEditingScript(null); loadData();
      } catch (e) { console.error(e); }
    };

    const handleDelete = async (id) => {
      if (confirm('هل أنت متأكد من الحذف؟')) { await trickleDeleteObject('script', id); loadData(); }
    };

    if (!isAuthenticated) return <AdminLogin onLogin={setIsAuthenticated} />;

    return (
      <div className="min-h-screen bg-black" data-name="admin-app" data-file="admin-app.js">
        <AdminHeader />
        <main className="max-w-6xl mx-auto px-6 py-8">
          <AdminStats stats={stats} scriptsCount={scripts.length} />
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">السكريبتات المنشورة</h2>
            <button onClick={() => { setEditingScript(null); setShowForm(true); }} className="btn-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2">
              <div className="icon-plus text-lg"></div>
              إضافة سكريبت
            </button>
          </div>
          {showForm && <ScriptForm onSave={handleSave} onCancel={() => { setShowForm(false); setEditingScript(null); }} initialData={editingScript?.objectData} />}
          <ScriptList scripts={scripts} onEdit={(s) => { setEditingScript(s); setShowForm(true); }} onDelete={handleDelete} />
        </main>
      </div>
    );
  } catch (error) { console.error('AdminApp error:', error); return null; }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ErrorBoundary><AdminApp /></ErrorBoundary>);
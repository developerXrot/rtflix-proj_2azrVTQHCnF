function AdminStats({ stats, scriptsCount }) {
  try {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" data-name="admin-stats" data-file="components/AdminStats.js">
        <div className="bg-[var(--card-bg)] glow-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <div className="icon-users text-2xl text-blue-400"></div>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats?.visitors || 0}</p>
              <p className="text-sm text-[var(--text-secondary)]">إجمالي الزوار</p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--card-bg)] glow-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center">
              <div className="icon-download text-2xl text-green-400"></div>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats?.downloads || 0}</p>
              <p className="text-sm text-[var(--text-secondary)]">إجمالي التحميلات</p>
            </div>
          </div>
        </div>
        <div className="bg-[var(--card-bg)] glow-border rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <div className="icon-file-code text-2xl text-purple-400"></div>
            </div>
            <div>
              <p className="text-3xl font-bold">{scriptsCount || 0}</p>
              <p className="text-sm text-[var(--text-secondary)]">السكريبتات المنشورة</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) { console.error('AdminStats error:', error); return null; }
}
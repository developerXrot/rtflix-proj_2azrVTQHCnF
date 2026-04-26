function ScriptList({ scripts, onEdit, onDelete }) {
  try {
    const getYoutubeThumbnail = (url) => {
      const match = url?.match(/(?:v=|\/)([\w-]{11})/);
      return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : '';
    };

    if (scripts.length === 0) {
      return (
        <div className="bg-[var(--card-bg)] rounded-xl p-12 text-center" data-name="script-list" data-file="components/ScriptList.js">
          <div className="icon-folder-open text-5xl text-[var(--text-secondary)] mb-4"></div>
          <p className="text-[var(--text-secondary)]">لا توجد سكريبتات حالياً</p>
          <p className="text-sm text-[var(--text-secondary)]">اضغط على "إضافة سكريبت" للبدء</p>
        </div>
      );
    }

    return (
      <div className="space-y-4" data-name="script-list" data-file="components/ScriptList.js">
        {scripts.map((script) => {
          const data = script.objectData;
          return (
            <div key={script.objectId} className="bg-[var(--card-bg)] rounded-xl p-4 flex gap-4 items-center glow-border">
              <img src={getYoutubeThumbnail(data.youtubeLink)} alt={data.title} className="w-32 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h4 className="font-bold text-white mb-1">{data.title}</h4>
                {data.description && <p className="text-sm text-[var(--text-secondary)] line-clamp-1">{data.description}</p>}
                <p className="text-xs text-[var(--text-secondary)] mt-1">{new Date(script.createdAt).toLocaleDateString('ar')}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onEdit(script)} className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center hover:bg-blue-500/40 transition-colors">
                  <div className="icon-pencil text-lg text-blue-400"></div>
                </button>
                <button onClick={() => onDelete(script.objectId)} className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center hover:bg-red-500/40 transition-colors">
                  <div className="icon-trash-2 text-lg text-red-400"></div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  } catch (error) { console.error('ScriptList error:', error); return null; }
}
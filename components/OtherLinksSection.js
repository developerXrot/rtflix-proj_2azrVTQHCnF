function OtherLinksSection({ form, addLink, removeLink, updateLink }) {
  try {
    return (
      <div data-name="other-links-section" data-file="components/OtherLinksSection.js">
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm">روابط أخرى</label>
          <button type="button" onClick={addLink} className="text-white text-sm flex items-center gap-1 hover:text-green-400 transition-colors">
            <div className="icon-plus text-sm"></div>
            إضافة رابط
          </button>
        </div>
        {form.otherLinks.length === 0 && (
          <p className="text-xs text-[var(--text-secondary)] mb-2">يمكنك إضافة روابط إضافية مثل روابط التيليجرام أو الديسكورد</p>
        )}
        {form.otherLinks.map((link, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input type="text" placeholder="اسم الرابط" value={link.name} onChange={(e) => updateLink(i, 'name', e.target.value)} className="flex-1 bg-black rounded-lg px-3 py-2 text-white border border-[var(--border-color)] text-sm" />
            <input type="url" placeholder="الرابط" value={link.url} onChange={(e) => updateLink(i, 'url', e.target.value)} className="flex-1 bg-black rounded-lg px-3 py-2 text-white border border-[var(--border-color)] text-sm" />
            <button type="button" onClick={() => removeLink(i)} className="text-red-500 px-2 hover:text-red-400 transition-colors">
              <div className="icon-trash-2 text-lg"></div>
            </button>
          </div>
        ))}
      </div>
    );
  } catch (error) { console.error('OtherLinksSection error:', error); return null; }
}
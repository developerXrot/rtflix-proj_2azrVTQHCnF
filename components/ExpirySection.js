function ExpirySection({ form, setForm }) {
  try {
    return (
      <div className="border border-[var(--border-color)] rounded-xl p-5" data-name="expiry-section" data-file="components/ExpirySection.js">
        <p className="text-sm text-[var(--text-secondary)] mb-4">حدد مدة صلاحية السكريبت - هل هو دائم أم مؤقت؟</p>
        
        <button
          type="button"
          onClick={() => setForm({ ...form, isPermanent: !form.isPermanent, expiryDays: '' })}
          className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between mb-4 ${form.isPermanent ? 'border-green-500 bg-green-500/10' : 'border-[var(--border-color)] hover:border-white/30'}`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${form.isPermanent ? 'bg-green-500' : 'bg-[var(--border-color)]'}`}>
              <div className={`icon-infinity text-2xl ${form.isPermanent ? 'text-black' : 'text-[var(--text-secondary)]'}`}></div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">سكريبت دائم</p>
              <p className="text-xs text-[var(--text-secondary)]">السكريبت لن ينتهي أبداً ويبقى متاحاً للجميع</p>
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${form.isPermanent ? 'border-green-500 bg-green-500' : 'border-[var(--text-secondary)]'}`}>
            {form.isPermanent && <div className="icon-check text-sm text-black"></div>}
          </div>
        </button>

        {!form.isPermanent && (
          <div className="bg-black/50 rounded-xl p-4">
            <label className="block text-sm mb-2 flex items-center gap-2">
              <div className="icon-clock text-yellow-500"></div>
              السكريبت سينتهي بعد كم يوم؟
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                value={form.expiryDays}
                onChange={(e) => setForm({ ...form, expiryDays: e.target.value })}
                placeholder="مثال: 7"
                className="flex-1 bg-black rounded-lg px-4 py-3 text-white border border-[var(--border-color)] focus:border-white/50 outline-none text-center text-xl"
              />
              <span className="text-[var(--text-secondary)]">يوم</span>
            </div>
            {form.expiryDays && (
              <p className="text-xs text-yellow-500 mt-2 flex items-center gap-1">
                <div className="icon-info text-sm"></div>
                سينتهي السكريبت بعد {form.expiryDays} يوم من الآن
              </p>
            )}
          </div>
        )}
      </div>
    );
  } catch (error) { console.error('ExpirySection error:', error); return null; }
}
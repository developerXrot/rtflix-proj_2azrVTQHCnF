function Hero({ stats }) {
  try {
    return (
      <section className="pt-32 pb-20 relative overflow-hidden" data-name="hero" data-file="components/Hero.js">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-black opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="text-[var(--text-secondary)] text-sm uppercase tracking-[0.3em] mb-4">أقوى محتوى سكريبتات</p>
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-gradient">RTFLIX XITERS</h2>
          <p className="text-[var(--text-secondary)] text-lg mb-12 max-w-xl mx-auto">أقوى شخص في محتوى سكريبتات Android و iOS</p>
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <p className="text-4xl font-black mb-1">{stats?.visitors || 0}</p>
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">زائر</p>
            </div>
            <div className="w-px bg-[var(--border-color)]"></div>
            <div className="text-center">
              <p className="text-4xl font-black mb-1">{stats?.downloads || 0}</p>
              <p className="text-xs text-[var(--text-secondary)] uppercase tracking-widest">تحميل</p>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) { console.error('Hero error:', error); return null; }
}
function Header() {
  try {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-[var(--border-color)]" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="index.html" className="flex items-center gap-3">
            <img src="https://pps.whatsapp.net/m1/v/t24/An8i16Y27DJg-P4bdPot8gYg-r-uvoIcOec-Pijh6W660_tR-hUmtbG8t7qw1BcqO9JOIHxzHNOWblmMLIr-_oLNuGlqcKyvRHOR1iCYrCW1ktPUpko7bmR6fMW_qeKYlqIffTwDlS7y-qlIXyc?stp=dst-jpg_tt6&ccb=10-5&oh=01_Q5Aa3QFETy6xozKB4UKlbwTpTuBKeXj88U4BFe0uNBMpGXciKw&oe=694C59CD&_nc_sid=5e03e0&_nc_cat=103" alt="Rtflix Xiters" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h1 className="text-lg font-black tracking-tight">RTFLIX XITERS</h1>
              <p className="text-[10px] text-[var(--text-secondary)] uppercase tracking-widest">Scripts Hub</p>
            </div>
          </a>
          <a href="https://www.youtube.com/@rtflixkkking" target="_blank" className="btn-outline px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <div className="icon-youtube text-base"></div>
            <span className="hidden sm:inline">YouTube</span>
          </a>
        </div>
      </header>
    );
  } catch (error) { console.error('Header error:', error); return null; }
}
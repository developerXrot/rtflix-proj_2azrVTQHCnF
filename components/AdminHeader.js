function AdminHeader() {
  try {
    return (
      <header className="bg-black border-b border-[var(--border-color)] py-4" data-name="admin-header" data-file="components/AdminHeader.js">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://pps.whatsapp.net/m1/v/t24/An8i16Y27DJg-P4bdPot8gYg-r-uvoIcOec-Pijh6W660_tR-hUmtbG8t7qw1BcqO9JOIHxzHNOWblmMLIr-_oLNuGlqcKyvRHOR1iCYrCW1ktPUpko7bmR6fMW_qeKYlqIffTwDlS7y-qlIXyc?stp=dst-jpg_tt6&ccb=10-5&oh=01_Q5Aa3QFETy6xozKB4UKlbwTpTuBKeXj88U4BFe0uNBMpGXciKw&oe=694C59CD&_nc_sid=5e03e0&_nc_cat=103" alt="Rtflix Xiters" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h1 className="text-lg font-bold">لوحة التحكم</h1>
              <p className="text-xs text-[var(--text-secondary)]">Rtflix Xiters Admin</p>
            </div>
          </div>
          <a href="index.html" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors">
            <div className="icon-external-link text-lg"></div>
            <span>عرض الموقع</span>
          </a>
        </div>
      </header>
    );
  } catch (error) { console.error('AdminHeader error:', error); return null; }
}
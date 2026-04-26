function Footer() {
  try {
    return (
      <footer className="border-t border-[var(--border-color)] py-12" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="https://pps.whatsapp.net/m1/v/t24/An8i16Y27DJg-P4bdPot8gYg-r-uvoIcOec-Pijh6W660_tR-hUmtbG8t7qw1BcqO9JOIHxzHNOWblmMLIr-_oLNuGlqcKyvRHOR1iCYrCW1ktPUpko7bmR6fMW_qeKYlqIffTwDlS7y-qlIXyc?stp=dst-jpg_tt6&ccb=10-5&oh=01_Q5Aa3QFETy6xozKB4UKlbwTpTuBKeXj88U4BFe0uNBMpGXciKw&oe=694C59CD&_nc_sid=5e03e0&_nc_cat=103" alt="Rtflix Xiters" className="w-8 h-8 rounded-full object-cover" />
              <span className="font-bold">RTFLIX XITERS</span>
            </div>
            <a href="https://www.youtube.com/@rtflixkkking" target="_blank" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors">
              <div className="icon-youtube text-lg"></div>
              <span className="text-sm">YouTube Channel</span>
            </a>
            <p className="text-sm text-[var(--text-secondary)]">© 2025 Rtflix Xiters</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) { console.error('Footer error:', error); return null; }
}
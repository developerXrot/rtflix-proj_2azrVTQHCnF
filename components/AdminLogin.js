function AdminLogin({ onLogin }) {
  try {
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const ADMIN_PASSWORD = '8896';

    const handleSubmit = (e) => {
      e.preventDefault();
      if (password === ADMIN_PASSWORD) {
        onLogin(true);
      } else {
        setError('كلمة المرور غير صحيحة');
        setPassword('');
      }
    };

    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4" data-name="admin-login" data-file="components/AdminLogin.js">
        <div className="bg-[var(--bg-card)] rounded-2xl p-8 w-full max-w-md border border-[var(--border-color)]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-lock text-3xl text-white"></div>
            </div>
            <h1 className="text-2xl font-bold">لوحة التحكم</h1>
            <p className="text-[var(--text-secondary)] text-sm mt-2">أدخل كلمة المرور للمتابعة</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(''); }} placeholder="كلمة المرور" className="w-full bg-black border border-[var(--border-color)] rounded-xl px-4 py-4 text-white text-center text-xl tracking-widest mb-4 focus:border-white/50 outline-none" autoFocus />
            {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
            <button type="submit" className="w-full btn-primary py-4 rounded-xl font-bold">دخول</button>
          </form>
        </div>
      </div>
    );
  } catch (error) { console.error('AdminLogin error:', error); return null; }
}
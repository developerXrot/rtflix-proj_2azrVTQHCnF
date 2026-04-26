import React, { useState } from 'react';

// --- مكون إدارة الروابط الإضافية ---
function OtherLinksSection({ otherLinks, onAdd, onRemove, onUpdate }) {
  return (
    <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
          الروابط والقنوات
        </h3>
        <div className="flex gap-2">
          {/* زر إضافة قناة واتساب سريع */}
          <button 
            onClick={() => onAdd({ name: 'قناة واتساب جديدة', url: 'https://whatsapp.com/channel/' })}
            className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-2 rounded-xl hover:bg-green-500/20 transition-all"
          >
            + إضافة واتساب
          </button>
          <button 
            onClick={() => onAdd()}
            className="text-xs bg-gray-800 text-gray-300 px-3 py-2 rounded-xl hover:bg-gray-700 transition-all"
          >
            + رابط مخصص
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {otherLinks.map((link, index) => (
          <div key={link.id} className="flex gap-2 group animate-in fade-in zoom-in-95 duration-300">
            <input 
              type="text" 
              placeholder="اسم المنصة" 
              value={link.name} 
              onChange={(e) => onUpdate(index, 'name', e.target.value)} 
              className="flex-1 bg-black text-white border border-gray-800 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none"
            />
            <input 
              type="url" 
              placeholder="الرابط" 
              value={link.url} 
              onChange={(e) => onUpdate(index, 'url', e.target.value)} 
              className="flex-[2] bg-black text-white border border-gray-800 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none"
            />
            <button 
              onClick={() => onRemove(link.id)} 
              className="w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- المكون الرئيسي للتطبيق ---
export default function ScriptDashboard() {
  // الحالة الابتدائية مع قنواتك التي أرسلتها
  const [form, setForm] = useState({
    otherLinks: [
      { id: 1, name: "قناة R4TFLIX XERZIN", url: "https://whatsapp.com/channel/0029VbC5vj8JENxvo3XWji26" },
      { id: 2, name: "قناة NegroX777", url: "https://whatsapp.com/channel/0029VbCndTdHVvTbQ7rCZj0j" }
    ]
  });

  // دوال التحكم
  const addLink = (defaults = { name: '', url: '' }) => {
    setForm({
      ...form,
      otherLinks: [...form.otherLinks, { id: Date.now(), ...defaults }]
    });
  };

  const removeLink = (id) => {
    setForm({
      ...form,
      otherLinks: form.otherLinks.filter(l => l.id !== id)
    });
  };

  const updateLink = (index, field, value) => {
    const updated = [...form.otherLinks];
    updated[index][field] = value;
    setForm({ ...form, otherLinks: updated });
  };

  return (
    <div className="min-h-screen bg-black text-right p-4 md:p-8" dir="rtl">
      <div className="max-w-3xl mx-auto">
        
        {/* رأس الصفحة */}
        <header className="mb-10">
          <h1 className="text-3xl font-black text-white mb-2">لوحة التحكم 🚀</h1>
          <p className="text-gray-400">قم بإدارة سكريبتاتك وقنوات الواتساب الخاصة بك</p>
        </header>

        {/* قسم إدارة الروابط */}
        <OtherLinksSection 
          otherLinks={form.otherLinks}
          onAdd={addLink}
          onRemove={removeLink}
          onUpdate={updateLink}
        />

        {/* عرض المعاينة النهائية (بما سيظهر للمستخدم) */}
        <div className="mt-10">
          <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-widest">معاينة الروابط الحالية</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {form.otherLinks.map(link => (
              <a 
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-2xl border border-gray-800 hover:border-green-500 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${link.url.includes('whatsapp') ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}>
                    {link.url.includes('whatsapp') ? 'W' : 'L'}
                  </div>
                  <span className="text-white font-medium">{link.name || "رابط بدون اسم"}</span>
                </div>
                <span className="text-gray-600 group-hover:translate-x-[-5px] transition-transform">←</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

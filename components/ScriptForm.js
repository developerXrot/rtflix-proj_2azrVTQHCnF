function ScriptForm({ onSave, onCancel, initialData }) {
  try {
    const [form, setForm] = React.useState({
      youtubeLink: initialData?.youtubeLink || '',
      images: initialData?.images || [],
      title: initialData?.title || '',
      description: initialData?.description || '',
      downloadLink: initialData?.downloadLink || '',
      isPermanent: initialData?.isPermanent || false,
      expiryDays: initialData?.expiryDays || '',
      otherLinks: initialData?.otherLinks || []
    });

    const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      const remaining = 5 - form.images.length;
      const toUpload = files.slice(0, remaining);
      
      toUpload.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm(prev => ({ ...prev, images: [...prev.images, reader.result].slice(0, 5) }));
        };
        reader.readAsDataURL(file);
      });
      e.target.value = '';
    };

    const removeImage = (index) => {
      setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    };

    const addLink = () => setForm({ ...form, otherLinks: [...form.otherLinks, { name: '', url: '' }] });
    const removeLink = (i) => setForm({ ...form, otherLinks: form.otherLinks.filter((_, idx) => idx !== i) });
    const updateLink = (i, field, value) => {
      const links = [...form.otherLinks];
      links[i][field] = value;
      setForm({ ...form, otherLinks: links });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const dataToSave = { ...form };
      if (!form.isPermanent && form.expiryDays) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + parseInt(form.expiryDays));
        dataToSave.expiryDate = expiryDate.toISOString();
      }
      onSave(dataToSave);
    };

    return (
      <div className="bg-[var(--bg-card)] rounded-xl p-6 mb-6 border border-[var(--border-color)]" data-name="script-form" data-file="components/ScriptForm.js">
        <h3 className="text-xl font-bold mb-4">{initialData ? 'تعديل السكريبت' : 'إضافة سكريبت جديد'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="رابط فيديو يوتيوب (اختياري)" type="url" value={form.youtubeLink} onChange={(v) => setForm({ ...form, youtubeLink: v })} placeholder="https://youtube.com/watch?v=..." />
          <MultiImageUpload images={form.images} onUpload={handleImageUpload} onRemove={removeImage} />
          <InputField label="اسم السكريبت *" type="text" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
          <TextAreaField label="الوصف (اختياري)" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
          <InputField label="رابط التحميل *" type="url" value={form.downloadLink} onChange={(v) => setForm({ ...form, downloadLink: v })} required />
          <ExpirySection form={form} setForm={setForm} />
          <OtherLinksSection form={form} addLink={addLink} removeLink={removeLink} updateLink={updateLink} />
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 btn-primary py-3 rounded-xl font-bold">حفظ</button>
            <button type="button" onClick={onCancel} className="flex-1 bg-[var(--border-color)] py-3 rounded-xl font-bold hover:bg-gray-700 transition-colors">إلغاء</button>
          </div>
        </form>
      </div>
    );
  } catch (error) { console.error('ScriptForm error:', error); return null; }
}

function InputField({ label, type, value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="block text-sm mb-2">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full bg-black rounded-lg px-4 py-3 text-white border border-[var(--border-color)] focus:border-white/50 outline-none" required={required} />
    </div>
  );
}

function TextAreaField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm mb-2">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-black rounded-lg px-4 py-3 text-white border border-[var(--border-color)] focus:border-white/50 outline-none h-20 resize-none" />
    </div>
  );
}

function MultiImageUpload({ images, onUpload, onRemove }) {
  return (
    <div>
      <label className="block text-sm mb-2">صور السكريبت (حتى 5 صور)</label>
      <div className="grid grid-cols-5 gap-2 mb-2">
        {images.map((img, i) => (
          <div key={i} className="relative aspect-square">
            <img src={img} alt={`صورة ${i + 1}`} className="w-full h-full object-cover rounded-lg" />
            <button type="button" onClick={() => onRemove(i)} className="absolute -top-1 -left-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"><div className="icon-x"></div></button>
          </div>
        ))}
        {images.length < 5 && (
          <label className="aspect-square border-2 border-dashed border-[var(--border-color)] rounded-lg cursor-pointer hover:border-white/50 transition-colors flex flex-col items-center justify-center">
            <div className="icon-plus text-xl text-[var(--text-secondary)]"></div>
            <span className="text-[10px] text-[var(--text-secondary)]">{images.length}/5</span>
            <input type="file" accept="image/*" multiple onChange={onUpload} className="hidden" />
          </label>
        )}
      </div>
    </div>
  );
}

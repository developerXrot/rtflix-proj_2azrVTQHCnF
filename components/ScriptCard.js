function ScriptCard({ script }) {
  try {
    const data = script.objectData;
    
    const getImage = () => {
      if (data.images?.length > 0) return data.images[0];
      if (data.customImage) return data.customImage;
      if (data.youtubeLink) {
        const match = data.youtubeLink.match(/(?:v=|\/)([\w-]{11})/);
        return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : '';
      }
      return 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800';
    };

    const isExpired = () => {
      if (data.isPermanent) return false;
      if (!data.expiryDate) return false;
      return new Date(data.expiryDate) < new Date();
    };

    const getRemainingDays = () => {
      if (data.isPermanent || !data.expiryDate) return null;
      const diff = new Date(data.expiryDate) - new Date();
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    const remainingDays = getRemainingDays();

    const expired = isExpired();

    const handleClick = () => {
      if (!expired) window.location.href = `script.html?id=${script.objectId}`;
    };

    return (
      <div onClick={handleClick} className={`bg-[var(--bg-card)] rounded-2xl overflow-hidden card-hover border border-[var(--border-color)] ${expired ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} data-name="script-card" data-file="components/ScriptCard.js">
        <div className="relative aspect-video overflow-hidden">
          <img src={getImage()} alt={data.title} className="w-full h-full object-cover card-image" />
          {expired && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
              <span className="text-red-500 font-bold text-lg">مدة السكريبت انتهت</span>
            </div>
          )}
          {!expired && (
            <div className="card-overlay absolute inset-0 bg-black/60 flex items-center justify-center opacity-0">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                <div className="icon-circle-play text-3xl text-black"></div>
              </div>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-base font-bold mb-2 line-clamp-1">{data.title}</h3>
          {data.description && <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">{data.description}</p>}
          <div className="flex items-center justify-between">
            {data.isPermanent ? (
              <span className="text-xs text-green-500 flex items-center gap-1"><div className="icon-infinity text-sm"></div> دائم</span>
            ) : remainingDays !== null ? (
              <span className={`text-xs ${expired ? 'text-red-500' : remainingDays <= 3 ? 'text-orange-500' : 'text-yellow-500'}`}>
                {expired ? 'منتهي' : `متبقي ${remainingDays} يوم`}
              </span>
            ) : null}
            <div className="icon-arrow-left text-sm text-[var(--text-secondary)]"></div>
          </div>
        </div>
      </div>
    );
  } catch (error) { console.error('ScriptCard error:', error); return null; }
}

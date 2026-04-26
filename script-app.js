class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('Error:', error, info); }
  render() {
    if (this.state.hasError) return <div className="min-h-screen flex items-center justify-center bg-black"><p className="text-white">حدث خطأ</p></div>;
    return this.props.children;
  }
}

function ScriptDetailApp() {
  try {
    const [script, setScript] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [viewMode, setViewMode] = React.useState('video');
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    React.useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      if (id) loadScript(id);
      else setLoading(false);
    }, []);

    const loadScript = async (id) => {
      try {
        const result = await trickleGetObject('script', id);
        setScript(result);
        document.title = `${result.objectData.title} - Rtflix Xiters`;
        if (!result.objectData.youtubeLink && result.objectData.customImage) setViewMode('image');
      } catch (e) { console.error(e); }
      setLoading(false);
    };

    const handleDownload = async () => {
      try { await StatsManager.incrementDownloads(); window.open(script.objectData.downloadLink, '_blank'); } catch (e) { console.error(e); }
    };

    const getYoutubeId = (url) => { const match = url?.match(/(?:v=|\/)([\w-]{11})/); return match ? match[1] : ''; };
    const getImages = (data) => {
      const imgs = [];
      if (data.images?.length > 0) imgs.push(...data.images);
      else if (data.customImage) imgs.push(data.customImage);
      if (data.youtubeLink) imgs.push(`https://img.youtube.com/vi/${getYoutubeId(data.youtubeLink)}/maxresdefault.jpg`);
      return imgs.length > 0 ? imgs : ['https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800'];
    };

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div></div>;
    if (!script) return <div className="min-h-screen bg-black"><Header /><div className="pt-32 text-center"><p className="text-[var(--text-secondary)]">السكريبت غير موجود</p><a href="index.html" className="text-white underline mt-4 inline-block">العودة للرئيسية</a></div></div>;

    const data = script.objectData;
    const hasVideo = !!data.youtubeLink;
    const images = getImages(data);
    const hasImages = images.length > 0;

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
      <div className="min-h-screen bg-black" data-name="script-detail" data-file="script-app.js">
        <Header />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <a href="index.html" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-white mb-6 transition-colors">
              <div className="icon-arrow-right text-sm"></div>
              <span className="text-sm">العودة للرئيسية</span>
            </a>
            {(hasVideo || hasImages) && (
              <div className="flex gap-2 mb-4">
                {hasVideo && <button onClick={() => setViewMode('video')} className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${viewMode === 'video' ? 'bg-white text-black' : 'bg-[var(--bg-card)] text-white border border-[var(--border-color)]'}`}><div className="icon-circle-play text-lg"></div>فيديو</button>}
                {hasImages && <button onClick={() => { setViewMode('image'); setCurrentImageIndex(0); }} className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${viewMode === 'image' ? 'bg-white text-black' : 'bg-[var(--bg-card)] text-white border border-[var(--border-color)]'}`}><div className="icon-image text-lg"></div>صور ({images.length})</button>}
              </div>
            )}
            <div className="aspect-video rounded-2xl overflow-hidden mb-8 bg-[var(--bg-card)] relative">
              {viewMode === 'video' && hasVideo ? (
                <iframe src={`https://www.youtube.com/embed/${getYoutubeId(data.youtubeLink)}`} className="w-full h-full" frameBorder="0" allowFullScreen></iframe>
              ) : (
                <div className="relative w-full h-full">
                  <img src={images[currentImageIndex]} alt={data.title} className="w-full h-full object-cover" />
                  {images.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <button onClick={prevImage} className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/80 transition-colors"><div className="icon-chevron-right text-xl text-white"></div></button>
                      <button onClick={nextImage} className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/80 transition-colors"><div className="icon-chevron-left text-xl text-white"></div></button>
                    </div>
                  )}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, i) => <div key={i} onClick={() => setCurrentImageIndex(i)} className={`w-2 h-2 rounded-full cursor-pointer transition-all ${i === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'}`}></div>)}
                    </div>
                  )}
                </div>
              )}
            </div>
            <h1 className="text-3xl font-black mb-4">{data.title}</h1>
            {data.description && <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">{data.description}</p>}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button onClick={handleDownload} className="btn-primary px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3"><div className="icon-download text-lg"></div>تحميل السكريبت</button>
              {data.youtubeLink && <a href={data.youtubeLink} target="_blank" className="btn-outline px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3"><div className="icon-youtube text-lg"></div>مشاهدة على يوتيوب</a>}
            </div>
            {data.otherLinks?.length > 0 && (
              <div className="border-t border-[var(--border-color)] pt-8">
                <h3 className="text-lg font-bold mb-4">روابط إضافية</h3>
                <div className="flex flex-wrap gap-3">{data.otherLinks.map((link, i) => <a key={i} href={link.url} target="_blank" className="btn-outline px-5 py-2 rounded-full text-sm">{link.name}</a>)}</div>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) { console.error('ScriptDetailApp error:', error); return null; }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ErrorBoundary><ScriptDetailApp /></ErrorBoundary>);
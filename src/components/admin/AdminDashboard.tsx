import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addProduct, updateProduct, deleteProduct, toggleAvailability, saveStoreContent } from '../../redux/productsSlice';
import { logoutAdmin } from '../../redux/authSlice';
import { DEFAULT_CATEGORIES, type Product, type Category, type MediaItem, type StoreContent } from '../../redux/types';
import { Plus, Pencil, Trash2, LogOut, Upload, X, Eye, EyeOff, Video, Image as ImageIcon, Package, LayoutDashboard, Tag, Info, Sparkles, Save, Users, Menu } from 'lucide-react';
import { useT } from '../../i18n/useT';
import LangThemeBar from '../shared/LangThemeBar';
import { fetchUsers } from '../../redux/usersSlice';
import { registerAdmin, setup2FA, verify2FA } from '../../redux/adminUsersSlice';
import { uploadFilesToSupabase, type UploadedMedia } from '../../supabase';

const CATEGORY_META: Record<string, { label: string; emoji: string }> = {
  rings: { label: 'Rings', emoji: '💍' },
  bracelets: { label: 'Bracelets', emoji: '📿' },
  chains: { label: 'Chains', emoji: '⛓️' },
  dollars: { label: 'Dollars', emoji: '🪙' },
  necklaces: { label: 'Necklaces', emoji: '📿' },
  bangles: { label: 'Bangles', emoji: '🟡' },
  earrings: { label: 'Earrings', emoji: '✨' },
  pendants: { label: 'Pendants', emoji: '🔮' },
  'pooja-items': { label: 'Pooja Items', emoji: '🪔' },
  mallas: { label: 'Mallas', emoji: '📿' },
  'gem-stones': { label: 'Gem Stones', emoji: '💎' },
};

const CAT_IMAGES: Partial<Record<string, string>> = {
  bracelets: '/category/bracelets.png',
  chains: '/category/chains.png',
  pendants: '/category/pendants.png',
  necklaces: '/category/necklaces.png',
  earrings: '/category/earrings.png',
  yantras: '/category/yantras.png',
};

const CAT_VAR_MAP: Record<string, {
  bg: string; border: string;
  activeBg: string; activeBorder: string; glow: string;
}> = {
  rings: { bg: 'var(--cat-rings-bg)', border: 'var(--cat-rings-border)', activeBg: 'var(--cat-rings-active-bg)', activeBorder: 'var(--cat-rings-active-border)', glow: 'var(--cat-rings-glow)' },
  bracelets: { bg: 'var(--cat-bracelets-bg)', border: 'var(--cat-bracelets-border)', activeBg: 'var(--cat-bracelets-active-bg)', activeBorder: 'var(--cat-bracelets-active-border)', glow: 'var(--cat-bracelets-glow)' },
  chains: { bg: 'var(--cat-chains-bg)', border: 'var(--cat-chains-border)', activeBg: 'var(--cat-chains-active-bg)', activeBorder: 'var(--cat-chains-active-border)', glow: 'var(--cat-chains-glow)' },
  dollars: { bg: 'var(--cat-dollars-bg)', border: 'var(--cat-dollars-border)', activeBg: 'var(--cat-dollars-active-bg)', activeBorder: 'var(--cat-dollars-active-border)', glow: 'var(--cat-dollars-glow)' },
  necklaces: { bg: 'var(--cat-necklaces-bg)', border: 'var(--cat-necklaces-border)', activeBg: 'var(--cat-necklaces-active-bg)', activeBorder: 'var(--cat-necklaces-active-border)', glow: 'var(--cat-necklaces-glow)' },
  bangles: { bg: 'var(--cat-bangles-bg)', border: 'var(--cat-bangles-border)', activeBg: 'var(--cat-bangles-active-bg)', activeBorder: 'var(--cat-bangles-active-border)', glow: 'var(--cat-bangles-glow)' },
  earrings: { bg: 'var(--cat-earrings-bg)', border: 'var(--cat-earrings-border)', activeBg: 'var(--cat-earrings-active-bg)', activeBorder: 'var(--cat-earrings-active-border)', glow: 'var(--cat-earrings-glow)' },
  pendants: { bg: 'var(--cat-pendants-bg)', border: 'var(--cat-pendants-border)', activeBg: 'var(--cat-pendants-active-bg)', activeBorder: 'var(--cat-pendants-active-border)', glow: 'var(--cat-pendants-glow)' },
  'pooja-items': { bg: 'var(--cat-pooja-bg)', border: 'var(--cat-pooja-border)', activeBg: 'var(--cat-pooja-active-bg)', activeBorder: 'var(--cat-pooja-active-border)', glow: 'var(--cat-pooja-glow)' },
  mallas: { bg: 'var(--cat-mallas-bg)', border: 'var(--cat-mallas-border)', activeBg: 'var(--cat-mallas-active-bg)', activeBorder: 'var(--cat-mallas-active-border)', glow: 'var(--cat-mallas-glow)' },
  'gem-stones': { bg: 'var(--cat-gemstones-bg)', border: 'var(--cat-gemstones-border)', activeBg: 'var(--cat-gemstones-active-bg)', activeBorder: 'var(--cat-gemstones-active-border)', glow: 'var(--cat-gemstones-glow)' },
};
const DEFAULT_CAT_VARS = {
  bg: 'var(--cat-default-bg)', border: 'var(--cat-default-border)',
  activeBg: 'var(--cat-default-active-bg)', activeBorder: 'var(--cat-default-active-border)',
  glow: 'var(--cat-default-glow)',
};

type FormMediaItem = MediaItem & {
  file?: File;
  uploaded?: boolean;
};

type ProductFormState = {
  title: string;
  price: string;
  originalPrice: string;
  discountPercent: string;
  description: string;
  category: Category;
  available: boolean;
  // quantity: string;
  media: FormMediaItem[];
};

const emptyForm: ProductFormState = {
  title: '',
  price: '',
  originalPrice: '',
  discountPercent: '',
  description: '',
  category: 'rings',
  available: true,
  // quantity: '0', 
  media: []
};
type TabType = 'products' | 'about' | 'users';

function formatCategoryLabel(category: string) {
  return CATEGORY_META[category]?.label ?? category.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

function parseMultiline(value: string) {
  return value
    .split('\n')
    .map(item => item.trim())
    .filter(Boolean);
}

function MediaCarousel({ media }: { media: Product['media'] }) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [idx]);

  if (media.length === 0)
    return (
      <div className="flex items-center justify-center h-full">
        <ImageIcon className="w-10 h-10" style={{ color: 'var(--border)' }} />
      </div>
    );

  const current = media[idx];
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + media.length) % media.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % media.length); };

  function togglePlay(e: React.MouseEvent) {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <div className="relative w-full h-full group/carousel">
      {current.type === 'image' ? (
        <img
          src={current.url}
          alt={current.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <>
          <video
            ref={videoRef}
            src={current.url}
            className="w-full h-full object-cover"
            loop
            onEnded={() => setPlaying(false)}
          />
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center transition-opacity"
            style={{ background: playing ? 'transparent' : 'rgba(0,0,0,0.35)' }}
          >
            {!playing ? (
              <div className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.92)' }}>
                <div style={{
                  width: 0, height: 0,
                  borderTop: '8px solid transparent',
                  borderBottom: '8px solid transparent',
                  borderLeft: '14px solid #1a1a1a',
                  marginLeft: 3
                }} />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity"
                style={{ background: 'rgba(0,0,0,0.45)' }}>
                <div className="flex gap-1">
                  <div style={{ width: 4, height: 16, background: '#fff', borderRadius: 2 }} />
                  <div style={{ width: 4, height: 16, background: '#fff', borderRadius: 2 }} />
                </div>
              </div>
            )}
          </button>
        </>
      )}

      {media.length > 1 && (<>
        <button onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-opacity"
          style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 14, zIndex: 10 }}>‹</button>
        <button onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-opacity"
          style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 14, zIndex: 10 }}>›</button>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1" style={{ zIndex: 10 }}>
          {media.map((_, i) => (
            <span key={i}
              className="rounded-full transition-all"
              style={{
                width: i === idx ? 14 : 5,
                height: 5,
                background: i === idx ? 'var(--gold)' : 'rgba(255,255,255,0.55)',
                display: 'block'
              }} />
          ))}
        </div>
      </>)}
    </div>
  );
}

export default function AdminDashboard() {
  const dispatch = useAppDispatch();
  const t = useT();
  const { items: products, storeContent, contentStatus } = useAppSelector(s => s.products);

  const categoryOptions = Array.from(new Set([
    ...DEFAULT_CATEGORIES,
    ...products.map(product => product.category),
  ])).map(category => ({
    value: category,
    label: formatCategoryLabel(category),
    emoji: CATEGORY_META[category]?.emoji ?? '💎',
  }));
  const [tab, setTab] = useState<TabType>('products');
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [contentForm, setContentForm] = useState<StoreContent>(storeContent);
  const [aboutSaved, setAboutSaved] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [uploadingContentMedia, setUploadingContentMedia] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aboutImagesInputRef = useRef<HTMLInputElement>(null);
  const footerLogoInputRef = useRef<HTMLInputElement>(null);
  const filtered = products.filter(p => activeCategory === 'all' || p.category === activeCategory);

  const { items: users, status } = useAppSelector((s) => s.users);

  useEffect(() => {
    if (tab === "users") {
      dispatch(fetchUsers());
    }
  }, [tab, dispatch]);

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [adminForm, setAdminForm] = useState({ username: "", email: "" });
  const [qrData, setQrData] = useState<{ qrCode: string; secret: string } | null>(null);
  const [token, setToken] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    registerLoading,
    setupLoading,
    verifyLoading,
    registerData,
    setupData,
    verifyData,
  } = useAppSelector((s) => s.adminUsers);

  useEffect(() => {
    if (registerData) {
      dispatch(setup2FA({ email: adminForm.email }));
      setStep(2);
    }
  }, [registerData]);

  useEffect(() => {
    if (setupData?.qrCode) {
      setQrData({
        qrCode: setupData.qrCode,
        secret: setupData.secret,
      });
    }
  }, [setupData]);

  useEffect(() => {
    if (verifyData) {
      setIsUserModalOpen(false);
      setStep(1);
      setAdminForm({ username: "", email: "" });
      setToken("");
      dispatch(fetchUsers());
    }
  }, [verifyData]);

  const handleRegisterAdmin = () => {
    if (!adminForm.username || !adminForm.email) {
      alert("Fill all fields");
      return;
    }

    dispatch(registerAdmin({
      username: adminForm.username,
      email: adminForm.email,
      role: "admin",
    }));
  };

  const handleVerifyAdmin = () => {
    if (!token) {
      alert("Enter token");
      return;
    }

    dispatch(verify2FA({
      email: adminForm.email,
      token,
    }));
  };

  function openAdd() { setEditingProduct(null); setForm(emptyForm); setShowForm(true); }
  function openEdit(p: Product) {
    setEditingProduct(p);
    setForm({
      title: p.title,
      price: String(p.price),
      originalPrice: String(p.originalPrice ?? p.price),
      discountPercent: String(p.discountPercent ?? ''),
      description: p.description,
      category: p.category,
      available: p.available,
      // quantity: String(p.quantity ?? 0),
      media: p.media.map(item => ({ ...item, uploaded: true })),
    });
    setShowForm(true);
  }
  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    const selectedMedia = Array.from(files).map((file): FormMediaItem => ({
      type: file.type.startsWith('video') ? 'video' : 'image',
      url: URL.createObjectURL(file),
      name: file.name,
      file,
      uploaded: false,
    }));

    setForm(f => ({ ...f, media: [...f.media, ...selectedMedia] }));

    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function uploadPendingMedia(mediaItems: FormMediaItem[]) {
    const pendingMedia = mediaItems.filter(item => item.file);

    if (pendingMedia.length === 0) {
      return mediaItems.map(({ file, uploaded, ...item }): MediaItem => ({
        type: item.type,
        url: item.url,
        name: item.name,
      }));
    }

    const uploadedMedia = await uploadFilesToSupabase(
      pendingMedia
        .map(item => item.file)
        .filter((file): file is File => Boolean(file))
    );
    let uploadIndex = 0;

    return mediaItems.map((item): MediaItem => {
      if (!item.file) {
        return {
          type: item.type,
          url: item.url,
          name: item.name,
        };
      }

      const uploaded = uploadedMedia[uploadIndex++];
      return {
        type: (uploaded?.resourceType === 'video' ? 'video' : 'image') as MediaItem['type'],
        url: uploaded?.url ?? item.url,
        name: uploaded?.originalName ?? item.name,
      };
    });
  }

  async function uploadContentFiles(files: FileList | File[]) {
    const list = Array.from(files);

    if (list.length === 0) {
      return [] as UploadedMedia[];
    }

    return uploadFilesToSupabase(list);
  }

  async function handleAboutImagesUpload(files: FileList | null) {
    if (!files || files.length === 0) return;

    try {
      setUploadingContentMedia(true);
      const uploaded = await uploadContentFiles(files);
      setContentForm(current => ({
        ...current,
        aboutUs: {
          ...current.aboutUs,
          images: [
            ...current.aboutUs.images,
            ...uploaded
              .filter(item => item.resourceType === 'image')
              .map((item, index) => ({
                id: `about-image-${Date.now()}-${index + 1}`,
                url: item.url,
                alt: `${current.aboutUs.title} image ${current.aboutUs.images.length + index + 1}`,
              })),
          ],
        },
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'About image upload failed';
      alert(message);
    } finally {
      setUploadingContentMedia(false);
      if (aboutImagesInputRef.current) aboutImagesInputRef.current.value = '';
    }
  }

  async function handleFooterLogoUpload(files: FileList | null) {
    if (!files || files.length === 0) return;

    try {
      setUploadingContentMedia(true);
      const uploaded = await uploadContentFiles([files[0]]);
      const firstImage = uploaded.find(item => item.resourceType === 'image');

      if (!firstImage) {
        throw new Error('Please upload an image for the footer logo');
      }

      setContentForm(current => ({
        ...current,
        footer: {
          ...current.footer,
          logoUrl: firstImage.url,
        },
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Footer logo upload failed';
      alert(message);
    } finally {
      setUploadingContentMedia(false);
      if (footerLogoInputRef.current) footerLogoInputRef.current.value = '';
    }
  }

  function calcDiscount(origOverride?: string, discOverride?: string) {
    const orig = Number(origOverride ?? form.originalPrice);
    const disc = Number(discOverride ?? form.discountPercent);
    if (orig > 0 && disc > 0)
      setForm(f => ({ ...f, price: String(Math.round(orig * (1 - disc / 100))) }));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setUploadingMedia(true);

      const uploadedMedia = await uploadPendingMedia(form.media);
      const discPct = Number(form.discountPercent) || undefined;
      const data = {
        title: form.title,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice) || Number(form.price),
        discountPercent: discPct,
        description: form.description,
        category: form.category,
        available: form.available,
        // quantity: isNaN(Number(form.quantity)) ? 0 : Number(form.quantity),
        media: uploadedMedia,
      };

      if (editingProduct) await dispatch(updateProduct({ ...editingProduct, ...data })).unwrap();
      else await dispatch(addProduct(data)).unwrap();

      setShowForm(false);
      setForm(emptyForm);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'Media upload failed';
      alert(message);
    } finally {
      setUploadingMedia(false);
    }
  }
  useEffect(() => {
    setContentForm(storeContent);
  }, [storeContent]);

  async function saveContent() {
    await dispatch(saveStoreContent(contentForm)).unwrap();
    setAboutSaved(true);
    setTimeout(() => setAboutSaved(false), 2500);
  }

  // Replace the stats array definition with:
  // const STAT_COLORS = [
  //   { bg: 'linear-gradient(135deg,var(--gold-dark),var(--gold))', text: '#fff' },
  //   { bg: 'linear-gradient(135deg,#15803d,#22c55e)', text: '#fff' },
  //   { bg: 'linear-gradient(135deg,#b91c1c,#ef4444)', text: '#fff' },
  // ];

  // const stats = [
  //   { label: t.admin_total, value: products.length, colorIdx: 0 },
  //   { label: t.admin_live, value: products.filter(p => p.available).length, colorIdx: 1 },
  //   { label: t.admin_discounted, value: products.filter(p => !!p.discountPercent).length, colorIdx: 2 },
  //   ...categoryOptions.slice(0).map((c, i) => ({
  //     label: `${c.emoji} ${c.label}`,
  //     value: products.filter(p => p.category === c.value).length,
  //     colorIdx: -1 as number,
  //     catKey: c.value,
  //   })),
  // ];


  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg-base)' }}>
      {/* Navbar — matches UserStore nav styling via CSS vars */}
      <header
        className="sticky top-0 z-30 shadow-sm overflow-visible"
        style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--nav-border)' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,var(--gold-dark),var(--gold))' }}>
              <span className="text-lg">💎</span>
            </div>
            <span className="font-display text-xl font-bold tracking-widest" style={{ color: 'var(--nav-logo-color)' }}>KUBERA RATNA</span>
            <span className="font-accent text-[10px] tracking-widest uppercase px-3 py-1 rounded-full hidden sm:block"
              style={{ background: 'var(--bg-muted)', color: 'var(--gold-dark)', border: '1px solid var(--border)' }}>
              {t.nav_admin}
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            <LangThemeBar dark compact />
            <div className="w-px h-5 flex-shrink-0" style={{ background: 'var(--border)' }} />
            <button onClick={() => setTab('products')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
              style={tab === 'products'
                ? { background: 'var(--bg-muted)', color: 'var(--gold-dark)', border: '1px solid var(--border)' }
                : { color: 'var(--nav-text)', border: '1px solid transparent' }}>
              <LayoutDashboard className="w-4 h-4" /> <span className="hidden sm:block">{t.admin_products}</span>
            </button>
            <button onClick={() => setTab('about')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
              style={tab === 'about'
                ? { background: 'var(--bg-muted)', color: 'var(--gold-dark)', border: '1px solid var(--border)' }
                : { color: 'var(--nav-text)', border: '1px solid transparent' }}>
              <Info className="w-4 h-4" /> <span className="hidden sm:block">{t.admin_about}</span>
            </button>
            <button onClick={() => setTab('users')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all"
              style={tab === 'users'
                ? { background: 'var(--bg-muted)', color: 'var(--gold-dark)', border: '1px solid var(--border)' }
                : { color: 'var(--nav-text)', border: '1px solid transparent' }}>
              <Users className="w-4 h-4" /> <span className="hidden sm:block">Admins</span>
            </button>
            <button onClick={() => dispatch(logoutAdmin())} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all border border-transparent"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-muted)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <LogOut className="w-4 h-4" /> <span className="hidden sm:block">{t.admin_logout}</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(o => !o)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all"
            style={{ border: '1px solid var(--border)', background: 'var(--bg-subtle)', color: 'var(--nav-text)' }}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 pt-2 space-y-1"
            style={{ borderTop: '1px solid var(--nav-border)', background: 'var(--nav-bg)' }}>
            {/* Lang + Theme row */}
            <div className="py-2">
              <LangThemeBar dark compact />
            </div>
            <div className="h-px" style={{ background: 'var(--border-light)' }} />
            {[
              { label: t.admin_products, icon: <LayoutDashboard className="w-4 h-4" />, action: () => { setTab('products'); setMobileMenuOpen(false); }, tabKey: 'products' },
              { label: t.admin_about, icon: <Info className="w-4 h-4" />, action: () => { setTab('about'); setMobileMenuOpen(false); }, tabKey: 'about' },
              { label: 'Admins', icon: <Users className="w-4 h-4" />, action: () => { setTab('users'); setMobileMenuOpen(false); }, tabKey: 'users' },
            ].map(item => (
              <button key={item.tabKey} onClick={item.action}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={tab === item.tabKey
                  ? { background: 'var(--bg-muted)', color: 'var(--gold-dark)' }
                  : { color: 'var(--nav-text)' }}>
                {item.icon} {item.label}
              </button>
            ))}
            <div className="h-px" style={{ background: 'var(--border-light)' }} />
            <button onClick={() => dispatch(logoutAdmin())}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-red-500">
              <LogOut className="w-4 h-4" /> {t.admin_logout}
            </button>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── Products Tab ─────────────────────── */}
        {tab === 'products' && (<>
          {/* Stats */}
          {/* <div className="grid grid-cols-4 md:grid-cols-8 gap-3 mb-8">
            {stats.map((s, i) => {
              const catKey = (s as any).catKey;
              const catVars = catKey ? (CAT_VAR_MAP[catKey] ?? DEFAULT_CAT_VARS) : null;
              const bgStyle = catVars
                ? `linear-gradient(135deg, ${catVars.border}, ${catVars.activeBorder})`
                : STAT_COLORS[s.colorIdx]?.bg ?? 'var(--bg-surface)';
              const textColor = (catVars || s.colorIdx >= 0) ? '#fff' : 'var(--text-primary)';
              return (
                <div key={s.label} className="rounded-xl p-3 text-center shadow-sm"
                  style={{ background: bgStyle, boxShadow: catVars ? `0 4px 16px ${catVars.glow}` : undefined }}>
                  <p className="font-body text-[10px] uppercase tracking-widest opacity-85" style={{ color: textColor }}>{s.label}</p>
                  <p className="font-display text-3xl font-bold mt-0.5" style={{ color: textColor }}>{s.value}</p>
                </div>
              );
            })}
          </div> */}

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-3xl font-bold" style={{ color: 'var(--maroon)' }}>{t.admin_catalogue}</h2>
              <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{filtered.length} {t.admin_shown}</p>
            </div>
            <button onClick={openAdd}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--cat-rings-active-border), var(--cat-rings-border))', boxShadow: `0 4px 16px var(--cat-rings-glow)` }}>
              <Plus className="w-4 h-4" /> {t.admin_add_product}
            </button>
          </div>

          {/* Category filter pills with matching user-store colors */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setActiveCategory('all')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border-2"
              style={activeCategory === 'all'
                ? { background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', color: 'white', borderColor: 'transparent', boxShadow: '0 4px 16px rgba(160,104,0,0.4)' }
                : { background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }
              }>
              ✨ All
            </button>

            {categoryOptions.map(c => {
              const vars = CAT_VAR_MAP[c.value] ?? DEFAULT_CAT_VARS;
              const isActive = activeCategory === c.value;
              const count = products.filter(p => p.category === c.value).length;
              const catImage = CAT_IMAGES[c.value];   // ← new

              return (
                <button
                  key={c.value}
                  onClick={() => setActiveCategory(c.value as Category)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border-2"
                  style={isActive
                    ? { background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', color: 'white', borderColor: 'transparent', boxShadow: '0 4px 16px rgba(160,104,0,0.4)' }
                    : { background: vars.bg, borderColor: vars.border, color: 'var(--maroon)' }
                  }
                >
                  {catImage ? (                        // ← new
                    <img
                      src={catImage}
                      alt={c.label}
                      className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <span>{c.emoji}</span>
                  )}
                  {c.label}
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                    style={isActive
                      ? { background: 'rgba(255,255,255,0.25)', color: 'white' }
                      : { background: 'var(--bg-surface)', color: 'var(--text-muted)', border: '1px solid var(--border-light)' }
                    }
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24" style={{ color: 'var(--text-muted)' }}>
              <Package className="w-14 h-14 mx-auto mb-4 opacity-30" />
              <p className="font-display text-2xl">{t.admin_no_products}</p>
              <p className="text-sm mt-1">{t.admin_no_products_sub}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(product => (
                <div key={product.id} className="card-product group">
                  <div className="relative overflow-hidden" style={{ height: '200px', background: 'var(--bg-subtle)' }}>
                    <MediaCarousel media={product.media} />
                    {product.discountPercent && <div className="discount-badge">{product.discountPercent}% OFF</div>}
                    <div className="absolute top-3 right-3">
                      <span className={product.available ? 'badge-green' : 'badge-red'}>{product.available ? t.admin_live : 'Hidden'}</span>
                    </div>
                    <div className="absolute bottom-2 left-2"><span className="badge-gold capitalize">{product.category}</span></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold leading-tight mb-1" style={{ color: 'var(--maroon)' }}>{product.title}</h3>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold" style={{ color: 'var(--gold-dark)' }}>₹{product.price.toLocaleString('en-IN')}</p>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <p className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>₹{product.originalPrice.toLocaleString('en-IN')}</p>
                      )}
                    </div>
                    <p className="text-xs line-clamp-2 mb-4" style={{ color: 'var(--text-muted)' }}>{product.description}</p>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(product)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded text-xs font-medium transition-all border"
                        style={{ borderColor: 'var(--gold)', color: 'var(--gold-dark)' }}
                        onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--gold-bg)'; }}
                        onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; }}>
                        <Pencil className="w-3 h-3" /> {t.admin_edit}
                      </button>
                      <button onClick={() => dispatch(toggleAvailability(product.id))}
                        className="p-2 rounded border transition-all"
                        style={{ borderColor: 'var(--border-light)', color: 'var(--text-muted)' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                        {product.available ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => dispatch(deleteProduct(product.id))}
                        className="p-2 rounded border border-red-200 hover:bg-red-50 text-red-400 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>)}

        {/* ── About Tab ────────────────────────── */}
        {tab === 'about' && (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,var(--gold-dark),var(--gold))' }}>
                <Info className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold" style={{ color: 'var(--maroon)' }}>{t.admin_about_title}</h2>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{t.admin_about_sub}</p>
              </div>
            </div>
            <div className="rounded-xl p-6 shadow-sm space-y-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}>
              <div>
                <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>About Eyebrow</label>
                <input value={contentForm.aboutUs.eyebrow} onChange={e => setContentForm(f => ({ ...f, aboutUs: { ...f.aboutUs, eyebrow: e.target.value } }))} className="input-field" />
              </div>
              <div>
                <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>{t.admin_brand_title}</label>
                <input value={contentForm.aboutUs.title} onChange={e => setContentForm(f => ({ ...f, aboutUs: { ...f.aboutUs, title: e.target.value } }))} className="input-field" />
              </div>
              <div>
                <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>{t.admin_founded}</label>
                <input value={contentForm.aboutUs.since} onChange={e => setContentForm(f => ({ ...f, aboutUs: { ...f.aboutUs, since: e.target.value } }))} className="input-field" />
              </div>
              <div>
                <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>{t.admin_story}</label>
                <textarea value={contentForm.aboutUs.description} onChange={e => setContentForm(f => ({ ...f, aboutUs: { ...f.aboutUs, description: e.target.value } }))} className="input-field resize-none" rows={4} />
              </div>
              <div>
                <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>{t.admin_mission}</label>
                <textarea value={contentForm.aboutUs.mission} onChange={e => setContentForm(f => ({ ...f, aboutUs: { ...f.aboutUs, mission: e.target.value } }))} className="input-field resize-none" rows={3} />
              </div>
              <div>
                <div className="flex items-center justify-between gap-3 mb-1.5">
                  <label className="block font-accent text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>About Images</label>
                  <button
                    type="button"
                    onClick={() => !uploadingContentMedia && aboutImagesInputRef.current?.click()}
                    className="btn-outline-gold text-xs py-2 px-3"
                  >
                    {uploadingContentMedia ? 'Uploading...' : 'Upload About Images'}
                  </button>
                </div>
                <input
                  ref={aboutImagesInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={e => handleAboutImagesUpload(e.target.files)}
                />
                {contentForm.aboutUs.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {contentForm.aboutUs.images.map((image, index) => (
                      <div key={image.id} className="relative group">
                        <img src={image.url} alt={image.alt} className="w-full h-32 object-cover rounded-lg" />
                        <button
                          type="button"
                          onClick={() => setContentForm(f => ({
                            ...f,
                            aboutUs: {
                              ...f.aboutUs,
                              images: f.aboutUs.images.filter((_, imageIndex) => imageIndex !== index),
                            },
                          }))}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity bg-red-500"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>About Highlights</label>
                <textarea
                  value={contentForm.aboutUs.highlights.map(item => `${item.title} | ${item.description}`).join('\n')}
                  onChange={e => setContentForm(f => ({
                    ...f,
                    aboutUs: {
                      ...f.aboutUs,
                      highlights: parseMultiline(e.target.value).map((line, index) => {
                        const [title, ...descriptionParts] = line.split('|');
                        return {
                          id: `about-highlight-${index + 1}`,
                          title: title?.trim() || `Highlight ${index + 1}`,
                          description: descriptionParts.join('|').trim(),
                        };
                      }),
                    },
                  }))}
                  className="input-field resize-none"
                  rows={4}
                  placeholder={'Handcrafted Detail | Explain the craftsmanship\nTrusted Experience | Explain why customers trust the brand'}
                />
              </div>
              <div className="rounded-xl p-4 space-y-4" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <p className="font-accent text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Footer Content</p>
                <div>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <label className="block font-accent text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Footer Logo</label>
                    <button
                      type="button"
                      onClick={() => !uploadingContentMedia && footerLogoInputRef.current?.click()}
                      className="btn-outline-gold text-xs py-2 px-3"
                    >
                      {uploadingContentMedia ? 'Uploading...' : 'Upload Footer Logo'}
                    </button>
                  </div>
                  <input
                    ref={footerLogoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => handleFooterLogoUpload(e.target.files)}
                  />
                  {contentForm.footer.logoUrl && (
                    <div className="relative group w-28">
                      <img src={contentForm.footer.logoUrl} alt={contentForm.footer.brandName} className="w-28 h-28 object-cover rounded-lg border" style={{ borderColor: 'var(--border-light)' }} />
                      <button
                        type="button"
                        onClick={() => setContentForm(f => ({
                          ...f,
                          footer: {
                            ...f.footer,
                            logoUrl: '',
                          },
                        }))}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity bg-red-500"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>Brand Name</label>
                  <input value={contentForm.footer.brandName} onChange={e => setContentForm(f => ({ ...f, footer: { ...f.footer, brandName: e.target.value } }))} className="input-field" />
                </div>
                <div>
                  <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>Footer Tagline</label>
                  <textarea value={contentForm.footer.tagline} onChange={e => setContentForm(f => ({ ...f, footer: { ...f.footer, tagline: e.target.value } }))} className="input-field resize-none" rows={2} />
                </div>
                <div>
                  <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>Rights Text</label>
                  <input value={contentForm.footer.rightsText} onChange={e => setContentForm(f => ({ ...f, footer: { ...f.footer, rightsText: e.target.value } }))} className="input-field" />
                </div>
                <div>
                  <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>Made In Label</label>
                  <input value={contentForm.footer.madeInLabel} onChange={e => setContentForm(f => ({ ...f, footer: { ...f.footer, madeInLabel: e.target.value } }))} className="input-field" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>Footer CTA Label</label>
                    <input value={contentForm.footer.ctaLabel} onChange={e => setContentForm(f => ({ ...f, footer: { ...f.footer, ctaLabel: e.target.value } }))} className="input-field" />
                  </div>
                  <div>
                    <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>Footer CTA Link</label>
                    <input value={contentForm.footer.ctaHref} onChange={e => setContentForm(f => ({ ...f, footer: { ...f.footer, ctaHref: e.target.value } }))} className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>Footer Link Groups</label>
                  <textarea
                    value={contentForm.footer.linkGroups.flatMap(group => group.links.map(link => `${group.title} | ${link.label} | ${link.href}`)).join('\n')}
                    onChange={e => setContentForm(f => ({
                      ...f,
                      footer: {
                        ...f.footer,
                        linkGroups: parseMultiline(e.target.value).reduce<StoreContent['footer']['linkGroups']>((groups, line, index) => {
                          const [groupTitle, linkLabel, href] = line.split('|').map(part => part.trim());
                          if (!groupTitle || !linkLabel || !href) return groups;
                          const existingGroup = groups.find(group => group.title === groupTitle);
                          const nextLink = { id: `footer-link-${index + 1}`, label: linkLabel, href };
                          if (existingGroup) {
                            existingGroup.links.push(nextLink);
                          } else {
                            groups.push({ id: `footer-group-${groups.length + 1}`, title: groupTitle, links: [nextLink] });
                          }
                          return groups;
                        }, []),
                      },
                    }))}
                    className="input-field resize-none"
                    rows={6}
                    placeholder={'Collections | Rings | /rings\nHelp | FAQ | /faq'}
                  />
                </div>
                <div>
                  <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>Footer Contacts</label>
                  <textarea
                    value={contentForm.footer.contacts.map(item => `${item.type} | ${item.label} | ${item.value.replace(/\n/g, '<br>')} | ${item.href ?? ''}`).join('\n')}
                    onChange={e => setContentForm(f => ({
                      ...f,
                      footer: {
                        ...f.footer,
                        contacts: parseMultiline(e.target.value).map((line, index) => {
                          const [type, label, value, href] = line.split('|').map(part => part.trim());
                          return {
                            id: `footer-contact-${index + 1}`,
                            type: (type as StoreContent['footer']['contacts'][number]['type']) || 'phone',
                            label: label || `Contact ${index + 1}`,
                            value: (value || '').replace(/<br>/g, '\n'),
                            href: href || undefined,
                          };
                        }),
                      },
                    }))}
                    className="input-field resize-none"
                    rows={5}
                    placeholder={'whatsapp | WhatsApp | +91 7032716188 | https://wa.me/917032716188\naddress | Address | Hyderabad, Telangana<br>India - 500001 | '}
                  />
                </div>
                <div>
                  <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>Footer Social Links</label>
                  <textarea
                    value={contentForm.footer.socials.map(item => `${item.platform} | ${item.label} | ${item.href}`).join('\n')}
                    onChange={e => setContentForm(f => ({
                      ...f,
                      footer: {
                        ...f.footer,
                        socials: parseMultiline(e.target.value).map((line, index) => {
                          const [platform, label, href] = line.split('|').map(part => part.trim());
                          return {
                            id: `footer-social-${index + 1}`,
                            platform: (platform as StoreContent['footer']['socials'][number]['platform']) || 'custom',
                            label: label || `Social ${index + 1}`,
                            href: href || '#',
                          };
                        }),
                      },
                    }))}
                    className="input-field resize-none"
                    rows={4}
                    placeholder={'instagram | Instagram | https://instagram.com/yourpage\nfacebook | Facebook | https://facebook.com/yourpage'}
                  />
                </div>
              </div>
              <button onClick={saveContent} disabled={contentStatus === 'loading'} className="btn-gold flex items-center gap-2 w-full justify-center py-3 rounded disabled:opacity-70">
                <Save className="w-4 h-4" /> {contentStatus === 'loading' ? 'Saving...' : aboutSaved ? t.admin_saved_about : t.admin_save_about}
              </button>
            </div>
          </div>
        )}

        {/* ── Users Tab ────────────────────────── */}
        {tab === 'users' && (
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))' }}>
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-3xl font-bold" style={{ color: 'var(--maroon)' }}>Admin Users</h2>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {users.length} admin{users.length !== 1 ? 's' : ''} registered
                  </p>
                </div>
              </div>
              <button
                onClick={() => { setIsUserModalOpen(true); setStep(1); }}
                className="btn-gold flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Admin
              </button>
            </div>

            {status === 'loading' && (
              <div className="text-center py-24" style={{ color: 'var(--text-muted)' }}>
                <div className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-4"
                  style={{ borderColor: 'var(--gold)', borderTopColor: 'transparent' }} />
                <p className="text-sm">Loading users...</p>
              </div>
            )}

            {status === 'failed' && (
              <div className="text-center py-24" style={{ color: 'var(--text-muted)' }}>
                <p className="font-display text-2xl">Failed to load users</p>
              </div>
            )}

            {status === 'succeeded' && users.length === 0 && (
              <div className="text-center py-24" style={{ color: 'var(--text-muted)' }}>
                <Users className="w-14 h-14 mx-auto mb-4 opacity-30" />
                <p className="font-display text-2xl">No admins yet</p>
                <p className="text-sm mt-1">Add your first admin to get started</p>
              </div>
            )}

            {status === 'succeeded' && users.length > 0 && (
              <div className="rounded-xl shadow-sm overflow-hidden"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}>
                <div className="grid grid-cols-5 px-5 py-3"
                  style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)' }}>
                  {['Username', 'Email', 'Role', '2FA Status', 'Joined'].map(col => (
                    <p key={col} className="font-accent text-[10px] tracking-widest uppercase"
                      style={{ color: 'var(--text-muted)' }}>{col}</p>
                  ))}
                </div>

                {users.map((user, i) => (
                  <div
                    key={user.id}
                    className="grid grid-cols-5 px-5 py-4 items-center transition-colors"
                    style={{
                      borderBottom: i < users.length - 1 ? '1px solid var(--border-light)' : 'none',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-display text-sm font-bold"
                        style={{
                          background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))',
                          color: '#fff',
                        }}>
                        {user.username?.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-sm truncate" style={{ color: 'var(--maroon)' }}>
                        {user.username}
                      </span>
                    </div>

                    <p className="text-sm truncate pr-4" style={{ color: 'var(--text-secondary)' }}>
                      {user.email}
                    </p>

                    <div>
                      <span className="badge-gold capitalize text-xs">{user.role}</span>
                    </div>

                    <div>
                      <span className={user.twoFactorEnabled ? 'badge-green' : 'badge-red'}>
                        {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>

                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {new Date(user.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Add Admin Modal ─────────────────────── */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}>

            <div className="px-6 py-5 flex items-center justify-between"
              style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))' }}>
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold" style={{ color: 'var(--maroon)' }}>
                    {step === 1 ? 'Register Admin' : step === 2 ? 'Scan QR Code' : 'Verify Token'}
                  </h2>
                  <p className="font-accent text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                    Step {step} of 3
                  </p>
                </div>
              </div>
              <button onClick={() => setIsUserModalOpen(false)}
                className="p-1 transition-colors" style={{ color: 'var(--text-muted)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-1.5 px-6 pt-5">
              {[1, 2, 3].map(s => (
                <div key={s} className="h-1 flex-1 rounded-full transition-all duration-300"
                  style={{ background: s <= step ? 'var(--gold)' : 'var(--border)' }} />
              ))}
            </div>

            <div className="px-6 py-5 space-y-4">

              {step === 1 && (
                <>
                  <div>
                    <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5"
                      style={{ color: 'var(--text-muted)' }}>Username</label>
                    <input
                      placeholder="e.g. john_doe"
                      value={adminForm.username}
                      onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5"
                      style={{ color: 'var(--text-muted)' }}>Email</label>
                    <input
                      placeholder="e.g. john@example.com"
                      value={adminForm.email}
                      onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <button onClick={handleRegisterAdmin} disabled={registerLoading}
                    className="btn-gold w-full py-3 rounded justify-center disabled:opacity-70">
                    {registerLoading ? 'Registering...' : 'Register Admin'}
                  </button>
                </>
              )}

              {step === 2 && qrData && (
                <>
                  <div className="text-center space-y-3">
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      Scan this QR code with your authenticator app to set up 2FA.
                    </p>
                    <div className="inline-block p-3 rounded-xl"
                      style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)' }}>
                      <img src={qrData.qrCode} alt="2FA QR Code" className="w-40 h-40 mx-auto" />
                    </div>
                    <div className="rounded-lg px-3 py-2"
                      style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                      <p className="font-accent text-[10px] tracking-widest uppercase mb-1"
                        style={{ color: 'var(--text-muted)' }}>Manual entry key</p>
                      <p className="font-mono text-xs break-all" style={{ color: 'var(--maroon)' }}>
                        {qrData.secret}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(3)}
                    disabled={setupLoading}
                    className="btn-gold w-full py-3 rounded justify-center"
                  >
                    Continue
                  </button>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5"
                      style={{ color: 'var(--text-muted)' }}>6-digit Token</label>
                    <input
                      placeholder="Enter token from authenticator"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      className="input-field"
                      maxLength={6}
                    />
                  </div>
                  <button onClick={handleVerifyAdmin} disabled={verifyLoading}
                    className="btn-gold w-full py-3 rounded justify-center disabled:opacity-70">
                    {verifyLoading ? 'Verifying...' : 'Verify & Activate'}
                  </button>
                </>
              )}

              <button onClick={() => setIsUserModalOpen(false)}
                className="w-full py-2.5 rounded text-sm font-medium transition-colors border"
                style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                Cancel
              </button>

            </div>
          </div>
        </div>
      )}

      {/* ── Product Form Modal ──────────────────── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}>
            <div className="sticky top-0 px-6 py-5 flex items-center justify-between rounded-t-2xl"
              style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-light)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,var(--gold-dark),var(--gold))' }}>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-display text-2xl font-bold" style={{ color: 'var(--maroon)' }}>
                  {editingProduct ? t.admin_save_btn.replace('Save ', 'Edit ') : t.admin_add_product}
                </h2>
              </div>
              <button onClick={() => setShowForm(false)} className="p-1 transition-colors" style={{ color: 'var(--text-muted)' }}><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>{t.admin_product_title}</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="input-field" required />
              </div>
              <div>
                <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>{t.admin_category}</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))} className="input-field cursor-pointer">
                  {categoryOptions.map(c => <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>)}
                </select>
              </div>

              {/* Pricing */}
              <div className="rounded-xl p-4 space-y-4" style={{ background: 'var(--bg-subtle)', border: '1.5px solid var(--border)' }}>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" style={{ color: 'var(--gold)' }} />
                  <p className="font-accent text-xs tracking-widest uppercase font-medium" style={{ color: 'var(--gold-dark)' }}>{t.admin_pricing}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>{t.admin_orig_price}</label>
                    <input type="number" value={form.originalPrice}
                      onChange={e => {
                        const val = e.target.value;
                        setForm(f => ({ ...f, originalPrice: val }));
                        calcDiscount(val, form.discountPercent);
                      }}
                      className="input-field" min="0" required />
                  </div>
                  <div>
                    <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>{t.admin_discount_pct}</label>
                    <input type="number" value={form.discountPercent}
                      onChange={e => {
                        const val = e.target.value;
                        setForm(f => ({ ...f, discountPercent: val }));
                        calcDiscount(form.originalPrice, val);
                      }}
                      className="input-field" min="0" max="99" />
                  </div>
                </div>
                <div>
                  <label className="block font-accent text-[10px] tracking-widets uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>
                    {t.admin_final_price} {form.discountPercent ? t.admin_auto_calc : ''}
                  </label>
                  <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="input-field" min="0" required />
                </div>
                {form.discountPercent && form.originalPrice && form.price && (
                  <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
                    <Tag className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--maroon)' }} />
                    <p className="text-sm font-medium" style={{ color: 'var(--maroon)' }}>
                      {t.admin_saving_msg} ₹{(Number(form.originalPrice) - Number(form.price)).toLocaleString('en-IN')} ({form.discountPercent}% off)
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-accent text-[10px] tracking-widets uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>{t.admin_description}</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="input-field resize-none" rows={3} />
              </div>

              <div>
                <label className="block font-accent text-[10px] tracking-widest uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>{t.admin_media}</label>
                <div onClick={() => !uploadingMedia && fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all"
                  style={{ borderColor: 'var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--gold)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {uploadingMedia ? 'Uploading to Supabase...' : 'Select multiple images/videos. They upload when you click Add Product.'}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-placeholder)' }}>{t.admin_media_formats}</p>
                </div>
                <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={e => handleFiles(e.target.files)} />
                {form.media.length > 0 && (
                  <div className="grid grid-cols-5 gap-2 mt-3">
                    {form.media.map((m, i) => (
                      <div key={i} className="relative group rounded-lg overflow-hidden aspect-square border" style={{ borderColor: 'var(--border-light)' }}>
                        {m.type === 'image' ? <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--bg-subtle)' }}><Video className="w-6 h-6" style={{ color: 'var(--gold)' }} /></div>}
                        <button type="button" onClick={() => setForm(f => ({ ...f, media: f.media.filter((_, j) => j !== i) }))}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity bg-red-500">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={form.available} onChange={e => setForm(f => ({ ...f, available: e.target.checked }))} className="sr-only peer" />
                  <div className="w-11 h-6 rounded-full transition-all peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform"
                    style={{ background: form.available ? 'var(--gold)' : 'var(--border)' }} />
                </label>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{t.admin_visibility}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{form.available ? t.admin_visible : t.admin_hidden}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded text-sm font-medium transition-colors border"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                  {t.admin_cancel}
                </button>
                <button type="submit" disabled={uploadingMedia} className="btn-gold flex-1 py-3 rounded disabled:opacity-70">
                  {uploadingMedia ? 'Uploading...' : editingProduct ? t.admin_save_btn : t.admin_add_btn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

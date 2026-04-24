import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addToCart, updateQty, toggleCart, clearCart } from '../../redux/cartSlice';
import { type Product } from '../../redux/types';
import { useT } from '../../i18n/useT';
import LangThemeBar from '../shared/LangThemeBar';
import {
  ChevronLeft, ChevronRight, ShoppingCart, MessageCircle,
  Star, Tag, CheckCircle, Share2, Heart, Plus, Minus, ZoomIn
} from 'lucide-react';
import { buildWhatsappMsgFull, CartSidebar, CheckoutModal, OrderConfirmedPopup } from './UserStore';
import { type CustomerDetails } from '../../redux/types';

const WHATSAPP = '7032716188';

function buildWhatsappMsg(product: Product) {
  return encodeURIComponent(
    `🪙 *Enquiry — KUBERA RATNA Fine Jewellery*\n\n` +
    `I'm interested in:\n*${product.title}*\nPrice: ₹${product.price.toLocaleString('en-IN')}\n` +
    `${product.discountPercent ? `Discount: ${product.discountPercent}% off\n` : ''}` +
    `\nPlease confirm availability. Thank you! 🙏`
  );
}

// ── Zoom overlay ──────────────────────────────────────────────────────────────
function ZoomOverlay({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <img src={url} alt="" className="max-w-full max-h-full object-contain rounded-xl" />
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white"
        style={{ background: 'rgba(255,255,255,0.15)' }}
      >
        ✕
      </button>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const t = useT();

  const product = useAppSelector(s => s.products.items.find(p => p.id === id));
  const inCart = useAppSelector(s => s.cart.items.some(i => i.product.id === id));
  const cartQty = useAppSelector(s => s.cart.items.find(i => i.product.id === id)?.qty ?? 0);
  const totalCartCount = useAppSelector(s => s.cart.items.reduce((n, i) => n + i.qty, 0));

  const [activeIdx, setActiveIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const cartItems = useAppSelector(s => s.cart.items);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfirmed, setShowConfirmed] = useState(false);

  function handleConfirmOrder(customer: CustomerDetails) {
    const msg = buildWhatsappMsgFull(cartItems, customer);
    window.open(`https://wa.me/91${WHATSAPP}?text=${msg}`, '_blank');
    dispatch(clearCart());
    setShowCheckout(false);
    setShowConfirmed(true);
  }

  useEffect(() => {
    setPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [activeIdx]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
        <div className="text-center">
          <p className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--maroon)' }}>Product not found</p>
          <button onClick={() => navigate(-1)} className="btn-gold mt-4">Go Back</button>
        </div>
      </div>
    );
  }

  const media = product.media;
  const current = media[activeIdx];
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  function handleAdd() {
    if (!product) return;
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    if (!product) return;
    const msg = buildWhatsappMsg(product);
    window.open(`https://wa.me/91${WHATSAPP}?text=${msg}`, '_blank');
  }

  function scrollThumb(dir: 'prev' | 'next') {
    const newIdx = dir === 'prev'
      ? (activeIdx - 1 + media.length) % media.length
      : (activeIdx + 1) % media.length;
    setActiveIdx(newIdx);
    // scroll thumbnail into view
    const container = thumbsRef.current;
    if (container) {
      const thumb = container.children[newIdx] as HTMLElement;
      thumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg-base)' }}>

      {/* ── Navbar ─────────────────────────────────────────────── */}
      {/* <nav
        className="sticky top-0 z-40 shadow-sm"
        style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--nav-border)' }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
              style={{ border: '1px solid var(--border)', background: 'var(--bg-subtle)', color: 'var(--nav-text)' }}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,var(--gold-dark),var(--gold))' }}>
                <span className="text-xs">💎</span>
              </div>
              <span
                className="font-display text-xl font-bold tracking-widest cursor-pointer"
                style={{ color: 'var(--nav-logo-color)' }}
                onClick={() => navigate('/')}
              >
                KUBERA RATNA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <LangThemeBar compact />
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ border: '1px solid var(--border)', background: 'var(--bg-subtle)' }}
            >
              <ShoppingCart className="w-4 h-4" style={{ color: 'var(--nav-icon-color)' }} />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                  style={{ background: 'var(--gold)' }}>{totalCartCount}</span>
              )}
            </button>
          </div>
        </div>
      </nav> */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 shadow-sm"
        style={{ background: 'var(--nav-bg)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--nav-border)' }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 flex items-center justify-between gap-2">

          {/* Logo */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 flex-shrink-0 w-full">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,var(--gold-dark),var(--gold))' }}>
                <span className="text-xs sm:text-sm">💎</span>
              </div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-widest" style={{ color: 'var(--nav-logo-color)' }}>
                KUBERA RATNA
              </span>
              <span className="hidden lg:block font-accent text-[10px] tracking-[0.3em] uppercase mt-0.5" style={{ color: 'var(--nav-text-muted)' }}>
                Fine Jewellery
              </span>
            </div>

            {/* Desktop category links */}
            {/* <div className="hidden xl:flex items-center gap-5">
            {allCategories.slice(0, 5).map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                className="font-accent text-xs tracking-[0.15em] uppercase transition-colors duration-200 whitespace-nowrap"
                style={{ color: activeCategory === c ? 'var(--gold-dark)' : 'var(--nav-text)' }}>
                {(t as any)[`cat_${c}`] || formatCategoryLabel(c)}
              </button>
            ))}
          </div> */}

            {/* Right controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <LangThemeBar compact />

              <button
                onClick={() => dispatch(toggleCart())}
                className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all flex-shrink-0"
                style={{ border: '1px solid var(--border)', background: 'var(--bg-subtle)' }}
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--nav-icon-color)' }} />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-white text-[9px] sm:text-[10px] font-bold rounded-full min-w-[16px] sm:min-w-[18px] h-[16px] sm:h-[18px] flex items-center justify-center px-1"
                    style={{ background: 'var(--gold)' }}>{totalCartCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>

      </nav>

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 pt-32 sm:pt-36">
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
          <button onClick={() => navigate('/')} className="hover:opacity-80 transition-opacity">Home</button>
          <span>/</span>
          <button
            onClick={() => navigate('/')}
            className="capitalize hover:opacity-80 transition-opacity"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="truncate max-w-[200px]" style={{ color: 'var(--text-primary)' }}>{product.title}</span>
        </div>
      </div>

      {/* ── Main Content ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">

          {/* ── LEFT: Media Panel ─────────────────────────────── */}
          <div className="lg:sticky lg:top-20 lg:self-start">

            {/* Main media viewer */}
            <div
              className="relative rounded-2xl overflow-hidden mb-3 group"
              style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                aspectRatio: '1 / 1',
                maxHeight: '480px',
              }}
            >
              {media.length === 0 ? (
                <div className="w-full h-full flex items-center justify-center text-6xl">💎</div>
              ) : current.type === 'image' ? (
                <>
                  <img
                    src={current.url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Zoom button */}
                  <button
                    onClick={() => setZoomed(true)}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </>
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
                    onClick={() => {
                      if (!videoRef.current) return;
                      if (playing) { videoRef.current.pause(); setPlaying(false); }
                      else { videoRef.current.play(); setPlaying(true); }
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: playing ? 'transparent' : 'rgba(0,0,0,0.35)' }}
                  >
                    {!playing && (
                      <div className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.92)' }}>
                        <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '18px solid #1a1a1a', marginLeft: 4 }} />
                      </div>
                    )}
                  </button>
                </>
              )}

              {/* Discount badge */}
              {product.discountPercent && (
                <div className="absolute top-3 left-3 discount-badge">{product.discountPercent}% OFF</div>
              )}

              {/* Nav arrows */}
              {media.length > 1 && (
                <>
                  <button
                    onClick={() => scrollThumb('prev')}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
                    style={{ background: 'rgba(255,255,255,0.92)', color: 'var(--gold-dark)' }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollThumb('next')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all opacity-0 group-hover:opacity-100"
                    style={{ background: 'rgba(255,255,255,0.92)', color: 'var(--gold-dark)' }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {media.length > 1 && (
              <div
                ref={thumbsRef}
                className="flex gap-2 overflow-x-auto pb-1"
                style={{ scrollbarWidth: 'none' }}
              >
                {media.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className="flex-shrink-0 rounded-xl overflow-hidden transition-all"
                    style={{
                      width: '72px',
                      height: '72px',
                      border: `2px solid ${i === activeIdx ? 'var(--gold)' : 'var(--border-light)'}`,
                      background: 'var(--bg-subtle)',
                      boxShadow: i === activeIdx ? '0 0 0 3px rgba(201,151,28,0.15)' : 'none',
                    }}
                  >
                    {m.type === 'image' ? (
                      <img src={m.url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"
                        style={{ background: 'var(--bg-subtle)' }}>
                        <div style={{ width: 0, height: 0, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderLeft: '12px solid var(--gold-dark)' }} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Dot indicator */}
            {media.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-3">
                {media.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className="rounded-full transition-all"
                    style={{
                      width: i === activeIdx ? 20 : 6,
                      height: 6,
                      background: i === activeIdx ? 'var(--gold)' : 'var(--border)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Product Info ───────────────────────────── */}
          <div className="flex flex-col gap-4">

            {/* Category + actions */}
            <div className="flex items-center justify-between">
              <span className="badge-gold capitalize">{product.category}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setWishlisted(w => !w)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                  style={{ border: '1px solid var(--border-light)', background: 'var(--bg-subtle)' }}
                >
                  <Heart
                    className="w-4 h-4"
                    style={{ color: wishlisted ? '#e11d48' : 'var(--text-muted)', fill: wishlisted ? '#e11d48' : 'none' }}
                  />
                </button>
                <button
                  onClick={() => navigator.share?.({ title: product.title, url: window.location.href })}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                  style={{ border: '1px solid var(--border-light)', background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'var(--maroon)' }}>
                {product.title}
              </h1>
              {/* Stars */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5" style={{ fill: 'var(--gold)', color: 'var(--gold)' }} />
                  ))}
                </div>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>({t.prod_premium_quality})</span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: 'var(--border-light)' }} />

            {/* Price block */}
            <div className="rounded-2xl p-4 sm:p-5" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)' }}>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl sm:text-4xl font-bold text-gradient-gold" style={{ color: 'var(--text-muted)' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="badge-red text-sm">{product.discountPercent}% off</span>
                )}
              </div>
              {savings > 0 && (
                <div className="flex items-center gap-2 mt-3 p-3 rounded-xl"
                  style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.2)' }}>
                  <Tag className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-700 font-medium">
                    {t.prod_you_save} ₹{savings.toLocaleString('en-IN')}
                  </p>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {inCart ? (
                <div className="flex-1 flex items-center justify-between rounded-xl border-2 overflow-hidden"
                  style={{ borderColor: 'var(--gold)', minHeight: '48px' }}>
                  <button
                    onClick={() => dispatch(updateQty({ id: product.id, delta: -1 }))}
                    className="flex items-center justify-center w-12 h-full hover:opacity-80 transition-opacity flex-shrink-0"
                    style={{ background: 'var(--gold)', color: 'white' }}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-display text-base font-bold flex-1 text-center" style={{ color: 'var(--gold-dark)' }}>
                    {cartQty} in cart
                  </span>
                  <button
                    onClick={() => dispatch(updateQty({ id: product.id, delta: +1 }))}
                    className="flex items-center justify-center w-12 h-full hover:opacity-80 transition-opacity flex-shrink-0"
                    style={{ background: 'var(--gold)', color: 'white' }}>
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium border-2 uppercase tracking-wide transition-all"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--gold)', color: 'var(--gold-dark)' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'var(--gold)'; el.style.color = 'white'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'var(--bg-surface)'; el.style.color = 'var(--gold-dark)'; }}
                >
                  {added
                    ? <><CheckCircle className="w-4 h-4" /> Added!</>
                    : <><ShoppingCart className="w-4 h-4" /> {t.prod_add_cart}</>}
                </button>
              )}

              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-medium text-white uppercase tracking-wide transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#16a34a,#22c55e)', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}
              >
                <MessageCircle className="w-4 h-4" /> {t.prod_buy_whatsapp}
              </button>
            </div>

            {/* WhatsApp note */}
            <div className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.2)' }}>
              <MessageCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <p className="text-xs text-green-700">{t.checkout_whatsapp_note}</p>
            </div>

            {/* Divider */}
            <div className="h-px" style={{ background: 'var(--border-light)' }} />

            {/* Product Details section */}
            <div>
              <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--maroon)' }}>
                <span className="w-1 h-5 rounded-full inline-block" style={{ background: 'var(--gold)' }} />
                Product Details
              </h2>
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-light)' }}>
                {[
                  { label: 'Category', value: product.category },
                  { label: 'Price', value: `₹${product.price.toLocaleString('en-IN')}` },
                  ...(product.originalPrice && product.originalPrice > product.price
                    ? [{ label: 'Original Price', value: `₹${product.originalPrice.toLocaleString('en-IN')}` }]
                    : []),
                  ...(product.discountPercent
                    ? [{ label: 'Discount', value: `${product.discountPercent}% off` }]
                    : []),
                  { label: 'Availability', value: product.available ? 'In Stock' : 'Out of Stock' },
                ].map((row, i) => (
                  <div
                    key={row.label}
                    className="flex items-center px-4 py-3 text-sm"
                    style={{
                      background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-subtle)',
                      borderBottom: '1px solid var(--border-light)',
                    }}
                  >
                    <span className="w-36 flex-shrink-0 font-accent text-[10px] tracking-widest uppercase"
                      style={{ color: 'var(--text-muted)' }}>
                      {row.label}
                    </span>
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h2 className="font-display text-xl font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--maroon)' }}>
                  <span className="w-1 h-5 rounded-full inline-block" style={{ background: 'var(--gold)' }} />
                  Description
                </h2>
                <div className="rounded-xl p-4 sm:p-5"
                  style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)' }}>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {product.description}
                  </p>
                </div>
              </div>
            )}

            {/* Quality badge */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '✨', label: 'Handcrafted', sub: 'Premium quality' },
                { icon: '🔐', label: 'Secure', sub: 'Safe checkout' },
                { icon: '🚚', label: 'Fast Delivery', sub: 'Pan India' },
              ].map(item => (
                <div key={item.label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)' }}>
                  <span className="text-xl block mb-1">{item.icon}</span>
                  <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{item.sub}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Cart sidebar — needed so cart opens on this page too */}
      <CartSidebar onCheckout={() => { setShowCheckout(true); }} />

      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} onConfirm={handleConfirmOrder} prefillProduct={null} />
      )}

      {showConfirmed && (
        <OrderConfirmedPopup onClose={() => setShowConfirmed(false)} />
      )}

      {/* Zoom overlay */}
      {zoomed && current?.type === 'image' && (
        <ZoomOverlay url={current.url} onClose={() => setZoomed(false)} />
      )}
    </div>
  );
}
import { useState, useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addToCart, updateQty, removeFromCart, clearCart, toggleCart, closeCart } from '../../redux/cartSlice';
import { DEFAULT_CATEGORIES, type Product, type Category, type CustomerDetails, type FooterContactItem, type FooterSocialLink } from '../../redux/types';
import { useT } from '../../i18n/useT';
import LangThemeBar from '../shared/LangThemeBar';
import {
  Search, ShoppingCart, X,
  MessageCircle, Plus, Minus, Trash2, CheckCircle,
  MapPin, User, Phone, Mail, FileText, Home, ArrowRight, Tag,
  Facebook, Instagram, Youtube, Twitter, Heart,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WHATSAPP = '7032716188';
type CatKey = Category | 'all';

const CAT_EMOJIS: Record<string, string> = {
  rings: '💍', bracelets: '📿', chains: '⛓️', dollars: '🪙',
  necklaces: '📿', bangles: '🟡', earrings: '✨', pendants: '🔮',
  'pooja-items': '🪔', mallas: '📿', 'gem-stones': '💎',
};

const CAT_IMAGES: Partial<Record<string, string>> = {
  bracelets: 'category/bracelets.png',
  chains: '/category/chains.png',
  pendants: '/category/pendants.png',
  // mallas: '/category/mallas.jpg',
  necklaces: '/category/necklaces.png',
  earrings: '/category/earrings.png',
  yantras: '/category/yantras.png',
};

// ── Category card CSS-variable style map ──────────────────────────────────────
// Each entry references CSS variables defined in index.css so dark-mode works
// automatically without any JS logic.
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

const emptyCustomer: CustomerDetails = { name: '', phone: '', email: '', address: '', city: '', pincode: '', notes: '' };

function formatCategoryLabel(category: string) {
  return category.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

export function buildWhatsappMsgFull(items: { product: Product; qty: number }[], customer: CustomerDetails) {
  const lines = items.map(({ product, qty }) =>
    `• *${product.title}* × ${qty} — ₹${(product.price * qty).toLocaleString('en-IN')}${product.discountPercent ? ` _(${product.discountPercent}% off)_` : ''}`
  );
  const total = items.reduce((s, { product, qty }) => s + product.price * qty, 0);
  const savings = items.reduce((s, { product, qty }) => s + ((product.originalPrice ?? product.price) - product.price) * qty, 0);
  return encodeURIComponent(
    `🪙 *New Order — KUBERA RATNA Fine Jewellery*\n\n👤 *Customer:*\nName: ${customer.name}\nPhone: ${customer.phone}\nEmail: ${customer.email || 'N/A'}\nAddress: ${customer.address}, ${customer.city} — ${customer.pincode}\n${customer.notes ? `Notes: ${customer.notes}\n` : ''}\n🛍️ *Items:*\n${lines.join('\n')}\n\n💰 *Total: ₹${total.toLocaleString('en-IN')}*${savings > 0 ? `\n✅ Savings: ₹${savings.toLocaleString('en-IN')}` : ''}\n\nPlease confirm availability. Thank you! 🙏`
  );
}

function getSocialIcon(platform: FooterSocialLink['platform']) {
  switch (platform) {
    case 'facebook': return Facebook;
    case 'instagram': return Instagram;
    case 'youtube': return Youtube;
    case 'twitter': return Twitter;
    default: return Heart;
  }
}

function getContactIcon(type: FooterContactItem['type']) {
  switch (type) {
    case 'whatsapp': return MessageCircle;
    case 'address': return MapPin;
    case 'email': return Mail;
    case 'phone':
    default: return Phone;
  }
}

function getPrimaryMedia(media: Product['media']) {
  return media.find(item => item.type === 'image') ?? media[0] ?? null;
}

// ─── Order Confirmed Popup ─────────────────────────────────────────────────────
export function OrderConfirmedPopup({ onClose }: { onClose: () => void }) {
  const t = useT();
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div
        className="rounded-2xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl animate-scale-in"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: 'linear-gradient(135deg,#16a34a,#22c55e)', boxShadow: '0 8px 24px rgba(22,163,74,0.3)' }}
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--maroon)' }}>
          {t.order_confirmed_title}
        </h2>
        <div className="divider-gold" />
        <p className="text-sm leading-relaxed mb-2 mt-3" style={{ color: 'var(--text-secondary)' }}>
          {t.order_confirmed_msg}
        </p>
        <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>{t.order_confirmed_sub}</p>
        <div
          className="flex items-center justify-center gap-2 mb-5 p-3 rounded-xl"
          style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.25)' }}
        >
          <MessageCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
            {t.order_confirmed_wa} +91 {WHATSAPP}
          </span>
        </div>
        <button onClick={onClose} className="btn-gold w-full py-3 rounded-xl">{t.order_continue}</button>
      </div>
    </div>
  );
}

function Field({ label, placeholder, type = 'text', icon, value, onChange, error }: any) {
  return (
    <div>
      <label className="block text-xs mb-1">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="input-field pl-9" />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Checkout Modal ────────────────────────────────────────────────────────────
export function CheckoutModal({
  onClose, onConfirm, prefillProduct,
}: {
  onClose: () => void;
  onConfirm: (c: CustomerDetails) => void;
  prefillProduct?: Product | null;
}) {
  const t = useT();
  const cartItems = useAppSelector(s => s.cart.items);
  const [customer, setCustomer] = useState<CustomerDetails>(emptyCustomer);
  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});

  const orderItems = prefillProduct ? [{ product: prefillProduct, qty: 1 }] : cartItems;
  const total = orderItems.reduce((s, { product, qty }) => s + product.price * qty, 0);
  const savings = orderItems.reduce((s, { product, qty }) => s + ((product.originalPrice ?? product.price) - product.price) * qty, 0);

  function validate() {
    const e: Partial<CustomerDetails> = {};
    if (!customer.name.trim()) e.name = t.checkout_err_name;
    if (!/^\d{10}$/.test(customer.phone)) e.phone = t.checkout_err_phone;
    if (!customer.address.trim()) e.address = t.checkout_err_address;
    if (!customer.city.trim()) e.city = t.checkout_err_city;
    if (!/^\d{6}$/.test(customer.pincode)) e.pincode = t.checkout_err_pincode;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const handleChange = (field: keyof CustomerDetails) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setCustomer(prev => ({ ...prev, [field]: e.target.value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onConfirm(customer);
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', borderRadius: '1rem 1rem 0 0' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full" style={{ background: 'var(--border)' }} />
        </div>

        <div
          className="sticky top-0 px-4 sm:px-6 py-4 flex items-center justify-between"
          style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-light)' }}
        >
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold" style={{ color: 'var(--maroon)' }}>{t.checkout_title}</h2>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{t.checkout_sub}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-5 space-y-5">
          {/* Order summary */}
          <div className="rounded-xl p-3 sm:p-4 space-y-2" style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
            <p className="font-accent text-[10px] tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
              {t.checkout_order_summary}
            </p>
            {orderItems.map(({ product, qty }) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--border-light)' }}>
                  {getPrimaryMedia(product.media)?.type === 'image'
                    ? <img src={getPrimaryMedia(product.media)!.url} className="w-full h-full object-cover" alt="" />
                    : <div className="w-full h-full flex items-center justify-center text-lg" style={{ background: 'var(--bg-muted)' }}>💎</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{product.title}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Qty: {qty}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold" style={{ color: 'var(--gold-dark)' }}>₹{(product.price * qty).toLocaleString('en-IN')}</p>
                  {product.discountPercent && <p className="text-[10px] text-red-500">{product.discountPercent}% off</p>}
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '8px', marginTop: '8px' }}>
              <div className="flex justify-between items-center">
                <span className="font-display text-base sm:text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{t.cart_total}</span>
                <span className="font-display text-lg sm:text-xl font-bold text-gradient-gold">₹{total.toLocaleString('en-IN')}</span>
              </div>
              {savings > 0 && <p className="text-xs text-green-600 text-right mt-0.5">{t.cart_savings}: ₹{savings.toLocaleString('en-IN')}!</p>}
            </div>
          </div>

          {/* Customer details */}
          <div>
            <p className="font-accent text-[10px] tracking-widest uppercase mb-4 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <User className="w-3.5 h-3.5" style={{ color: 'var(--gold)' }} /> {t.checkout_your_details}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Field label={t.checkout_name} field="name" placeholder={t.checkout_name_ph} icon={<User className="w-3.5 h-3.5" />} value={customer.name} onChange={handleChange('name')} error={errors.name} />
              <Field label={t.checkout_phone} field="phone" placeholder={t.checkout_phone_ph} type="tel" icon={<Phone className="w-3.5 h-3.5" />} value={customer.phone} onChange={handleChange('phone')} error={errors.phone} />
              <Field label={t.checkout_email} field="email" placeholder={t.checkout_email_ph} type="email" icon={<Mail className="w-3.5 h-3.5" />} value={customer.email} onChange={handleChange('email')} error={errors.email} />
              <Field label={t.checkout_city} field="city" placeholder={t.checkout_city_ph} icon={<MapPin className="w-3.5 h-3.5" />} value={customer.city} onChange={handleChange('city')} error={errors.city} />
              <div className="sm:col-span-2">
                <Field label={t.checkout_address} field="address" placeholder={t.checkout_address_ph} icon={<Home className="w-3.5 h-3.5" />} value={customer.address} onChange={handleChange('address')} error={errors.address} />
              </div>
              <Field label={t.checkout_pincode} field="pincode" placeholder={t.checkout_pincode_ph} icon={<MapPin className="w-3.5 h-3.5" />} value={customer.pincode} onChange={handleChange('pincode')} error={errors.pincode} />
              <Field label={t.checkout_notes} field="notes" placeholder={t.checkout_notes_ph} icon={<FileText className="w-3.5 h-3.5" />} value={customer.notes} onChange={handleChange('notes')} error={errors.notes} />
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.25)' }}>
            <MessageCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <p className="text-xs text-green-700">{t.checkout_whatsapp_note}</p>
          </div>

          <div className="flex gap-3 pb-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-medium transition-colors border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
              {t.checkout_cancel}
            </button>
            <button type="submit" className="btn-gold flex-1 py-3 rounded-xl flex items-center justify-center gap-2 text-sm">
              <MessageCircle className="w-4 h-4" /> {t.checkout_confirm_btn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Cart Sidebar ──────────────────────────────────────────────────────────────
export function CartSidebar({ onCheckout }: { onCheckout: () => void }) {
  const dispatch = useAppDispatch();
  const t = useT();
  const { items, isOpen } = useAppSelector(s => s.cart);
  const total = items.reduce((s, { product, qty }) => s + product.price * qty, 0);
  const savings = items.reduce((s, { product, qty }) => s + ((product.originalPrice ?? product.price) - product.price) * qty, 0);
  const count = items.reduce((s, { qty }) => s + qty, 0);
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => dispatch(closeCart())} />
      <div
        className="fixed top-0 right-0 h-full w-full max-w-sm sm:max-w-md z-50 flex flex-col shadow-2xl animate-slide-in-right"
        style={{ background: 'var(--bg-surface)' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 flex-shrink-0"
          style={{ borderBottom: '1px solid var(--border-light)', background: 'var(--bg-subtle)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,var(--gold-dark),var(--gold))' }}>
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold" style={{ color: 'var(--maroon)' }}>{t.cart_title}</h2>
            {count > 0 && (
              <span className="text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                style={{ background: 'var(--gold)' }}>{count}</span>
            )}
          </div>
          <button onClick={() => dispatch(closeCart())} className="p-2 rounded-lg transition-colors hover:opacity-70" style={{ color: 'var(--text-muted)' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-3" style={{ background: 'var(--bg-base)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 text-3xl animate-float" style={{ background: 'var(--bg-subtle)' }}>🛒</div>
              <p className="font-display text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--maroon)' }}>{t.cart_empty}</p>
              <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>{t.cart_empty_sub}</p>
              <button onClick={() => dispatch(closeCart())} className="btn-gold">{t.cart_browse}</button>
            </div>
          ) : (
            items.map(({ product, qty }) => (
              <div key={product.id} className="rounded-xl p-3 sm:p-4 flex gap-3 shadow-sm"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0" style={{ border: '1px solid var(--border-light)' }}>
                  {getPrimaryMedia(product.media)?.type === 'image'
                    ? <img src={getPrimaryMedia(product.media)!.url} alt={product.title} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-xl" style={{ background: 'var(--bg-subtle)' }}>💎</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-accent text-[9px] uppercase tracking-widest mb-0.5" style={{ color: 'var(--gold)' }}>{product.category}</p>
                  <h4 className="font-display text-sm sm:text-base font-semibold truncate" style={{ color: 'var(--maroon)' }}>{product.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <p className="text-sm font-bold" style={{ color: 'var(--gold-dark)' }}>₹{product.price.toLocaleString('en-IN')}</p>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <p className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>₹{product.originalPrice.toLocaleString('en-IN')}</p>
                    )}
                    {product.discountPercent && <span className="badge-red">{product.discountPercent}% off</span>}
                  </div>
                  <div className="flex items-center justify-between mt-2 sm:mt-3">
                    <div className="flex items-center gap-1.5 sm:gap-2 rounded-full px-2 py-1"
                      style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                      <button onClick={() => dispatch(updateQty({ id: product.id, delta: -1 }))}
                        className="w-5 h-5 flex items-center justify-center transition-colors hover:opacity-70" style={{ color: 'var(--text-muted)' }}>
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center" style={{ color: 'var(--text-primary)' }}>{qty}</span>
                      <button onClick={() => dispatch(updateQty({ id: product.id, delta: +1 }))}
                        className="w-5 h-5 flex items-center justify-center transition-colors hover:opacity-70" style={{ color: 'var(--text-muted)' }}>
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs hidden sm:block" style={{ color: 'var(--text-muted)' }}>₹{(product.price * qty).toLocaleString('en-IN')}</span>
                      <button onClick={() => dispatch(removeFromCart(product.id))}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-3 flex-shrink-0"
            style={{ borderTop: '1px solid var(--border-light)', background: 'var(--bg-surface)' }}>
            <div className="space-y-2">
              <div className="flex justify-between text-sm" style={{ color: 'var(--text-muted)' }}>
                <span>{count} {count !== 1 ? t.cart_items : t.cart_item}</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 flex items-center gap-1"><Tag className="w-3 h-3" /> {t.cart_savings}</span>
                  <span className="text-green-600 font-semibold">−₹{savings.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="h-px" style={{ background: 'var(--border-light)' }} />
              <div className="flex justify-between items-center">
                <span className="font-display text-base sm:text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{t.cart_total}</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-gradient-gold">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button onClick={() => { dispatch(closeCart()); onCheckout(); }}
              className="btn-gold w-full py-3 sm:py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm">
              <ArrowRight className="w-4 h-4" /> {t.cart_confirm_order}
            </button>
            <button onClick={() => dispatch(clearCart())}
              className="w-full text-xs transition-colors text-center hover:text-red-500 py-1" style={{ color: 'var(--text-muted)' }}>
              {t.cart_clear}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function CartQtyControl({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const qty = useAppSelector(s => s.cart.items.find(i => i.product.id === product.id)?.qty ?? 0);
  // const canIncrease = qty < (product.quantity ?? 0);
  const canIncrease = true; // unlimited qty

  return (
    <div className="flex-1 flex items-center justify-between rounded-lg border-2 overflow-hidden"
      style={{ borderColor: 'var(--gold)', minHeight: '36px' }}>
      <button
        onClick={e => { e.stopPropagation(); dispatch(updateQty({ id: product.id, delta: -1 })); }}
        className="flex items-center justify-center w-9 h-full transition-colors hover:opacity-80 flex-shrink-0"
        style={{ background: 'var(--gold)', color: 'white' }}>
        <Minus className="w-3.5 h-3.5" />
      </button>
      <span className="text-sm font-bold flex-1 text-center" style={{ color: 'var(--gold-dark)' }}>{qty}</span>
      <button
        onClick={e => { e.stopPropagation(); if (canIncrease) dispatch(updateQty({ id: product.id, delta: +1 })); }}
        // disabled={!canIncrease}
        className="flex items-center justify-center w-9 h-full transition-colors flex-shrink-0 disabled:opacity-35 disabled:cursor-not-allowed hover:opacity-80"
        style={{ background: 'var(--gold)', color: 'white' }}>
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function MediaCarousel({ media, onClick }: { media: Product['media']; onClick?: () => void }) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setPlaying(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  }, [idx]);

  if (media.length === 0)
    return <div className="w-full h-full flex items-center justify-center text-4xl" onClick={onClick}>💎</div>;

  const current = media[idx];
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + media.length) % media.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % media.length); };

  function togglePlay(e: React.MouseEvent) {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play(); setPlaying(true); }
  }

  return (
    <div className="relative w-full h-full group/carousel">
      {current.type === 'image' ? (
        <img src={current.url} alt={current.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onClick={onClick} />
      ) : (
        <>
          <video ref={videoRef} src={current.url} className="w-full h-full object-cover" loop onEnded={() => setPlaying(false)} />
          <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center transition-opacity"
            style={{ background: playing ? 'transparent' : 'rgba(0,0,0,0.38)' }}>
            {!playing ? (
              <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.92)' }}>
                <div style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '14px solid #1a1a1a', marginLeft: 3 }} />
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
          style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 16, zIndex: 10 }}>‹</button>
        <button onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center sm:opacity-0 sm:group-hover/carousel:opacity-100 transition-opacity"
          style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: 16, zIndex: 10 }}>›</button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1" style={{ zIndex: 10 }}>
          {media.map((_, i) => (
            <span key={i} className="rounded-full transition-all block"
              style={{ width: i === idx ? 14 : 5, height: 5, background: i === idx ? 'var(--gold)' : 'rgba(255,255,255,0.55)' }} />
          ))}
        </div>
      </>)}
    </div>
  );
}

// ─── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product, onClick, onBuyNow }: { product: Product; onClick: () => void; onBuyNow: (p: Product) => void }) {
  const dispatch = useAppDispatch();
  const t = useT();
  const inCart = useAppSelector(s => s.cart.items.some(i => i.product.id === product.id));
  const [adding, setAdding] = useState(false);
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  // const outOfStock = (product.quantity ?? 0) === 0;
  const outOfStock = false; // quantity restriction disabled

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    // if (outOfStock) return;
    dispatch(addToCart(product));
    setAdding(true);
    setTimeout(() => setAdding(false), 1500);
  }

  return (
    <div className="card-product group cursor-pointer flex flex-col">
      <div className="relative overflow-hidden" style={{ height: '200px', background: 'var(--bg-subtle)' }}>
        <MediaCarousel media={product.media} onClick={onClick} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: 'linear-gradient(to top,rgba(122,31,64,0.45),transparent)', zIndex: 5 }} />
        {product.discountPercent && <div className="discount-badge" style={{ zIndex: 7 }}>{product.discountPercent}% OFF</div>}
        {/* {outOfStock && (
          <div className="absolute top-3 right-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(220,38,38,0.85)', zIndex: 7 }}>Out of stock</div>
        )} */}
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <p className="font-accent text-[9px] sm:text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--gold)' }}>{product.category}</p>
        <h3 className="font-display text-base sm:text-lg font-bold mb-1 leading-tight cursor-pointer" style={{ color: 'var(--maroon)' }} onClick={onClick}>{product.title}</h3>
        <p className="text-xs mb-2 sm:mb-3 line-clamp-2 flex-1" style={{ color: 'var(--text-muted)' }}>{product.description}</p>

        {/* View Details button — safe zone, no video conflicts */}
        <button
          onClick={onClick}
          className="w-full text-xs font-medium py-1.5 rounded-lg mb-2 transition-all"
          style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border-light)', color: 'var(--maroon)' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold-dark)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.color = 'var(--maroon)'; }}
        >
          {t.prod_view_details} →
        </button>

        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="font-display text-lg sm:text-xl font-bold text-gradient-gold">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
        {savings > 0 && <p className="text-xs text-green-600 font-medium">{t.prod_save} ₹{savings.toLocaleString('en-IN')}</p>}

        {/* <div className="mt-1 mb-2">
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{
              background: outOfStock ? 'rgba(220,38,38,0.1)' : (product.quantity ?? 0) <= 3 ? 'rgba(234,179,8,0.12)' : 'rgba(22,163,74,0.1)',
              color: outOfStock ? '#dc2626' : (product.quantity ?? 0) <= 3 ? '#a16207' : '#16a34a',
              border: `1px solid ${outOfStock ? 'rgba(220,38,38,0.25)' : (product.quantity ?? 0) <= 3 ? 'rgba(234,179,8,0.3)' : 'rgba(22,163,74,0.25)'}`,
            }}>
            {outOfStock ? 'Out of stock' : (product.quantity ?? 0) <= 3 ? `Only ${product.quantity} left!` : `${product.quantity} in stock`}
          </span>
        </div> */}

        <div className="flex gap-2 mt-auto">
          {inCart ? (
            <CartQtyControl product={product} />
          ) : (
            <button onClick={handleAdd}
              // disabled={outOfStock}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-lg text-xs font-medium transition-all border-2 uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--gold)', color: 'var(--gold-dark)' }}
              onMouseEnter={e => { if (!outOfStock) { const el = e.currentTarget; el.style.background = 'var(--gold)'; el.style.color = 'white'; } }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'var(--bg-surface)'; el.style.color = 'var(--gold-dark)'; }}>
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{adding ? t.prod_added : t.prod_add_cart}</span>
            </button>
          )}
          <button
            onClick={e => { e.stopPropagation(); onBuyNow(product); }}
            disabled={outOfStock}
            className="flex items-center justify-center gap-1 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs font-medium border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ borderColor: '#16a34a', color: '#16a34a' }}
            onMouseEnter={e => { if (!outOfStock) { const el = e.currentTarget; el.style.background = '#16a34a'; el.style.color = 'white'; } }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = '#16a34a'; }}>
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── About Section — uses CSS variables for every colour ──────────────────────
function AboutSection() {
  const { storeContent } = useAppSelector(s => s.products);
  const { aboutUs } = storeContent;
  return (
    <section
      className="py-16 sm:py-20 px-4 sm:px-6 noise mt-14"
      style={{
        background: 'linear-gradient(135deg, var(--about-from) 0%, var(--about-mid1) 40%, var(--about-mid2) 70%, var(--about-to) 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-12 items-center">
          <div>
            <p className="section-eyebrow" style={{ color: 'var(--about-eyebrow)' }}>
              {aboutUs.eyebrow} · Since {aboutUs.since}
            </p>
            <h2 className="section-title mb-4" style={{ color: 'var(--about-title)' }}>
              {aboutUs.title}
            </h2>
            <div className="divider-gold" style={{ marginLeft: 0 }} />
            <p className="leading-relaxed mb-5 text-sm mt-4" style={{ color: 'var(--about-body)' }}>
              {aboutUs.description}
            </p>
            <p className="leading-relaxed text-sm italic"
              style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '16px', color: 'var(--about-mission)' }}>
              {aboutUs.mission}
            </p>
            {aboutUs.highlights.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {aboutUs.highlights.map(item => (
                  <div key={item.id} className="rounded-xl p-4"
                    style={{ background: 'var(--about-card-bg)', border: '1px solid var(--about-card-border)', backdropFilter: 'blur(4px)' }}>
                    <p className="font-display text-base mb-1" style={{ color: 'var(--about-title)' }}>{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--about-mission)' }}>{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {aboutUs.images.length > 0 && (
            <div className="relative mt-6 md:mt-0">
              <div className="grid grid-cols-2 gap-4">
                {aboutUs.images.map((image, index) => (
                  <div key={image.id} className={index === 0 ? 'col-span-2 relative' : 'relative'}>
                    <div className="absolute inset-3 sm:inset-4 rounded-lg border opacity-20" style={{ borderColor: 'var(--gold)' }} />
                    <img src={image.url} alt={image.alt}
                      className={index === 0
                        ? 'w-full h-56 sm:h-72 object-cover rounded-lg shadow-2xl relative z-10'
                        : 'w-full h-40 object-cover rounded-lg shadow-2xl relative z-10'} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Footer — matches About Us pink, all CSS variables ────────────────────────
function Footer() {
  const { storeContent } = useAppSelector(s => s.products);
  const { footer } = storeContent;
  return (
    <footer
      className="relative overflow-hidden noise"
      style={{
        background: 'linear-gradient(135deg, var(--footer-from) 0%, var(--footer-mid) 50%, var(--footer-to) 100%)',
      }}
    >
      {/* Top decorative line */}
      <div className="h-[2px]"
        style={{ background: 'linear-gradient(90deg, var(--footer-top-line-from), var(--footer-top-line-mid), var(--footer-top-line-to))' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--footer-icon-bg)', border: '1px solid var(--footer-icon-border)' }}>
                {footer.logoUrl
                  ? <img src={footer.logoUrl} alt={footer.brandName} className="w-full h-full object-cover" />
                  : <span className="text-base">💎</span>}
              </div>
              <span className="font-display text-2xl font-bold tracking-widest" style={{ color: 'var(--footer-brand)' }}>
                {footer.brandName}
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-4 sm:mb-5" style={{ color: 'var(--footer-tagline)' }}>
              {footer.tagline}
            </p>
            <div className="flex items-center gap-3">
              {footer.socials.map(item => {
                const Icon = getSocialIcon(item.platform);
                return (
                  <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer" title={item.label}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:opacity-80"
                    style={{ background: 'var(--footer-icon-bg)', border: '1px solid var(--footer-icon-border)', color: 'var(--footer-icon-color)' }}>
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link groups */}
          {footer.linkGroups.map(group => (
            <div key={group.id}>
              <h4 className="font-display text-sm font-semibold mb-4" style={{ color: 'var(--footer-heading)' }}>{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map(item => (
                  <li key={item.id}>
                    <a href={item.href} className="text-xs transition-colors hover:opacity-80" style={{ color: 'var(--footer-link)' }}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 className="font-display text-sm font-semibold mb-4" style={{ color: 'var(--footer-heading)' }}>Contact Us</h4>
            <div className="space-y-3">
              {footer.contacts.map(item => {
                const Icon = getContactIcon(item.type);
                const content = (
                  <>
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${item.type === 'whatsapp' ? 'text-green-500' : ''}`}
                      style={item.type === 'whatsapp' ? undefined : { color: 'var(--footer-icon-color)' }}
                    />
                    <span style={{ whiteSpace: 'pre-line' }}>{item.value}</span>
                  </>
                );

                return item.href ? (
                  <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-2.5 text-xs transition-colors hover:opacity-80"
                    style={{ color: item.type === 'whatsapp' ? 'var(--footer-heading)' : 'var(--footer-link)' }}>
                    {content}
                  </a>
                ) : (
                  <div key={item.id} className="flex items-start gap-2.5 text-xs" style={{ color: 'var(--footer-link)' }}>
                    {content}
                  </div>
                );
              })}
            </div>

            <a href={footer.ctaHref} target="_blank" rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-white transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#16a34a,#22c55e)', boxShadow: '0 4px 12px rgba(34,197,94,0.3)' }}>
              <MessageCircle className="w-4 h-4" /> {footer.ctaLabel}
            </a>
          </div>
        </div>

        <div className="h-px mb-8" style={{ background: 'var(--footer-divider)' }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-center sm:text-left" style={{ color: 'var(--footer-rights)' }}>{footer.rightsText}</p>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--footer-made-in)' }}>
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            <span>{footer.madeInLabel}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main UserStore ────────────────────────────────────────────────────────────
export default function UserStore() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const t = useT();
  const products = useAppSelector(s => s.products.items);

  const allCategories = Array.from(new Set([
    ...DEFAULT_CATEGORIES,
  ]));

  const cartCount = useAppSelector(s => s.cart.items.reduce((n, i) => n + i.qty, 0));
  const cartItems = useAppSelector(s => s.cart.items);

  const [activeCategory, setActiveCategory] = useState<CatKey>('all');
  const [search, setSearch] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [showConfirmed, setShowConfirmed] = useState(false);
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const visibleProducts = products.filter(p => p.available);
  const filtered = visibleProducts.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const handleBuyNow = useCallback((product: Product) => {
    setCheckoutProduct(product);
    setShowCheckout(true);
  }, []);

  function handleConfirmOrder(customer: CustomerDetails) {
    const orderItems = checkoutProduct ? [{ product: checkoutProduct, qty: 1 }] : cartItems;
    const msg = buildWhatsappMsgFull(orderItems, customer);
    window.open(`https://wa.me/91${WHATSAPP}?text=${msg}`, '_blank');
    if (!checkoutProduct) dispatch(clearCart());
    setCheckoutProduct(null);
    setShowCheckout(false);
    setShowConfirmed(true);
  }

  function closeCheckout() { setShowCheckout(false); setCheckoutProduct(null); }

  const catLabel = (cat: CatKey) => cat === 'all' ? t.prod_all : ((t as any)[`cat_${cat}`] || formatCategoryLabel(cat));

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg-base)' }}>

      {/* ── Navbar — pink/blush theme via CSS vars ───────────────────── */}
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
              <div className="relative hidden md:block">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--gold)' }} />
                <input
                  value={search} onChange={e => setSearch(e.target.value)} placeholder={t.nav_search_placeholder}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-full focus:outline-none w-36 lg:w-44 transition-all"
                  style={{ border: '1.5px solid var(--border)', background: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,151,28,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <LangThemeBar compact />

              <button
                onClick={() => dispatch(toggleCart())}
                className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all flex-shrink-0"
                style={{ border: '1px solid var(--border)', background: 'var(--bg-subtle)' }}
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--nav-icon-color)' }} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 text-white text-[9px] sm:text-[10px] font-bold rounded-full min-w-[16px] sm:min-w-[18px] h-[16px] sm:h-[18px] flex items-center justify-center px-1"
                    style={{ background: 'var(--gold)' }}>{cartCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden px-3 pb-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--gold)' }} />
            <input
              value={search} onChange={e => setSearch(e.target.value)} placeholder={t.nav_search_placeholder}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-full focus:outline-none placeholder-gray-600"
              style={{ border: '1.5px solid var(--border)', background: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
            />
          </div>
        </div>

      </nav>

      {/* ── About ─────────────────────────────────── */}
      <AboutSection />

      {/* ── Categories ────────────────────────────── */}
      {/* <section className="py-10 sm:py-14 px-4 sm:px-6" style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <p className="section-eyebrow">{t.cat_section_eyebrow}</p>
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl">{t.cat_section_title}</h2>
            <div className="divider-gold" />
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>{t.cat_section_sub}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {allCategories.map(c => {
              const vars = CAT_VAR_MAP[c] ?? DEFAULT_CAT_VARS;
              const isActive = activeCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(prev => prev === c ? 'all' : c)}
                  className="cat-card group p-4 sm:p-5 rounded-xl text-left border-2"
                  style={{
                    borderColor: isActive ? vars.activeBorder : vars.border,
                    background: isActive ? vars.activeBg : vars.bg,
                    boxShadow: isActive
                      ? `0 8px 28px ${vars.glow}, 0 2px 8px rgba(0,0,0,0.06)`
                      : '0 1px 4px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 32px ${vars.glow}, 0 3px 10px rgba(0,0,0,0.07)`;
                      (e.currentTarget as HTMLElement).style.borderColor = vars.activeBorder;
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                      (e.currentTarget as HTMLElement).style.borderColor = vars.border;
                    }
                  }}
                >
                  <span className="cat-emoji text-2xl sm:text-3xl block mb-2 sm:mb-3">{CAT_EMOJIS[c] || '💎'}</span>
                  <p className="font-display text-base sm:text-lg font-bold mb-0.5 leading-tight" style={{ color: 'var(--maroon)' }}>
                    {(t as any)[`cat_${c}`] || formatCategoryLabel(c)}
                  </p>
                  <p className="text-xs hidden sm:block" style={{ color: 'var(--text-muted)' }}>{(t as any)[`cat_desc_${c}`] || ''}</p>
                  <p className="text-xs font-medium mt-1 sm:mt-2" style={{ color: 'var(--gold)' }}>
                    {visibleProducts.filter(p => p.category === c).length} {t.cat_pieces}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* ── Products ──────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <p className="section-eyebrow">{activeCategory === 'all' ? t.prod_section_eyebrow : ((t as any)[`cat_desc_${activeCategory}`] || '')}</p>
            <h2 className="section-title text-3xl sm:text-4xl">{catLabel(activeCategory)}</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{filtered.length} {t.prod_available}</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {cartCount > 0 && (
              <button onClick={() => dispatch(toggleCart())} className="btn-gold flex items-center gap-2 text-xs sm:text-sm py-2 sm:py-3">
                <ShoppingCart className="w-4 h-4" /> ({cartCount})
              </button>
            )}
            {activeCategory !== 'all' && (
              <button onClick={() => setActiveCategory('all')} className="btn-outline-gold text-xs sm:text-sm py-2 sm:py-3">
                {t.prod_view_all}
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { value: 'all' as CatKey, label: t.prod_all, emoji: '✨' },
            ...allCategories.map(c => ({
              value: c as CatKey,
              label: (t as any)[`cat_${c}`] || formatCategoryLabel(c),
              emoji: CAT_EMOJIS[c] || '💎',
            })),
          ].map(c => {
            const isAll = c.value === 'all';
            const vars = !isAll ? (CAT_VAR_MAP[c.value as string] ?? DEFAULT_CAT_VARS) : null;
            const isActive = activeCategory === c.value;
            const catImage = !isAll ? CAT_IMAGES[c.value as string] : undefined;

            return (
              <button
                key={c.value}
                onClick={() => setActiveCategory(c.value)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2"
                style={
                  isActive
                    ? { background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', color: 'white', borderColor: 'transparent', boxShadow: '0 4px 16px rgba(160,104,0,0.4)' }
                    : vars
                      ? { background: vars.bg, borderColor: vars.border, color: 'var(--maroon)' }
                      : { background: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }
                }
              >
                {catImage ? (
                  <img
                    src={catImage}
                    alt={c.label}
                    className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                  // style={{ border: isActive ? '1px solid rgba(255,255,255,0.5)' : '1px solid var(--border-light)' }}
                  />
                ) : (
                  <span>{c.emoji}</span>
                )}
                {c.label}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 sm:py-24">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl sm:text-4xl"
              style={{ background: 'var(--bg-subtle)' }}>💍</div>
            <p className="font-display text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--maroon)' }}>
              {search ? t.prod_no_results : t.prod_coming_soon}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {search ? t.prod_no_results_sub : t.prod_coming_soon_sub}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product}
                onClick={() => navigate(`/product/${product.id}`)}
                onBuyNow={handleBuyNow} />
            ))}
          </div>
        )}
      </section>

      <Footer />

      {/* ── Modals ────────────────────────────────── */}
      <CartSidebar onCheckout={() => { setCheckoutProduct(null); setShowCheckout(true); }} />

      {showCheckout && (
        <CheckoutModal onClose={closeCheckout} onConfirm={handleConfirmOrder} prefillProduct={checkoutProduct} />
      )}

      {showConfirmed && (
        <OrderConfirmedPopup onClose={() => setShowConfirmed(false)} />
      )}
    </div>
  );
}
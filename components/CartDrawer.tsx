'use client';

import { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Lock, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Zap,
  DollarSign,
  Coins,
  Smartphone,
  AlertCircle,
  Check,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart, SHIPPING_OPTIONS, PAYMENT_OPTIONS, PaymentMethod } from '@/context/CartContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    minOrderAmount,
    isMinOrderMet,
    remainingForMinOrder,
    shippingMethod,
    setShippingMethod,
    shippingCost,
  } = useCart();

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');

  // Billing & Delivery details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('zelle');
  const [orderNotes, setOrderNotes] = useState('');
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const grandTotal = subtotal + (cart.length > 0 ? shippingCost : 0);

  const handleProceedToCheckout = () => {
    if (cart.length === 0 || !isMinOrderMet) return;
    setStep('checkout');
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !address) return;

    setIsSubmitting(true);
    const generatedId = `JKD-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: generatedId,
          fullName,
          email,
          phone,
          address,
          city,
          state,
          zip,
          paymentMethod,
          shippingMethod,
          cart,
          subtotal,
          shippingCost,
          grandTotal,
          orderNotes,
        }),
      });
    } catch (err) {
      console.error('Failed to dispatch order email', err);
    } finally {
      setOrderId(generatedId);
      setIsSubmitting(false);
      setStep('success');
    }
  };

  const handleFinish = () => {
    clearCart();
    setStep('cart');
    onClose();
  };

  const renderPaymentIcon = (id: PaymentMethod) => {
    switch (id) {
      case 'apple-pay':
        return <Smartphone className="w-4 h-4 text-neutral-900" />;
      case 'bitcoin':
        return <Coins className="w-4 h-4 text-amber-500" />;
      case 'cash-app':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'chime':
        return <CreditCard className="w-4 h-4 text-green-600" />;
      case 'zelle':
        return <Zap className="w-4 h-4 text-purple-600" />;
      default:
        return <CreditCard className="w-4 h-4 text-neutral-700" />;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
            onClick={onClose}
          />

          {/* WooCommerce Style Slide Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="fixed inset-y-0 right-0 w-full max-w-lg bg-white z-50 flex flex-col shadow-2xl border-l border-neutral-200"
          >
            {/* Header Bar */}
            <div className="px-5 py-4 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-3">
                {step === 'checkout' && (
                  <button
                    onClick={() => setStep('cart')}
                    className="p-1 hover:bg-neutral-800 rounded-lg text-neutral-300 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <span className="font-black text-base tracking-wider uppercase flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-red-500" />
                  {step === 'cart' && 'Shopping Cart'}
                  {step === 'checkout' && 'Checkout'}
                  {step === 'success' && 'Order Complete'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* STEP 1: WOOCOMMERCE CART VIEW */}
            {step === 'cart' && (
              <div className="flex-grow flex flex-col overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="flex-grow p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4 text-neutral-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">Your cart is currently empty.</h3>
                    <p className="text-neutral-500 text-xs mb-6 max-w-xs font-medium">
                      Minimum order threshold is $150.00.
                    </p>
                    <Link
                      href="/shop"
                      onClick={onClose}
                      className="bg-red-600 text-white px-6 py-3 font-bold uppercase tracking-wider hover:bg-red-700 transition-colors rounded-lg text-xs"
                    >
                      Return to Shop
                    </Link>
                  </div>
                ) : (
                  <>
                    {/* WooCommerce Standard Notice Banner for Minimum Order */}
                    <div className="p-4 bg-neutral-50 border-b border-neutral-200">
                      {!isMinOrderMet ? (
                        <div className="p-3.5 bg-amber-50 border-l-4 border-amber-500 text-amber-900 rounded-r-lg text-xs font-medium space-y-2">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-amber-950">
                                Minimum order amount is ${minOrderAmount}.00
                              </p>
                              <p className="text-[11px] text-amber-800 mt-0.5">
                                Current subtotal: <span className="font-mono font-bold">${subtotal.toFixed(2)}</span>. Add <span className="font-bold text-red-700">${remainingForMinOrder.toFixed(2)}</span> more to enable checkout.
                              </p>
                            </div>
                          </div>

                          {/* Simple Progress Bar */}
                          <div className="w-full bg-amber-200/80 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-amber-600 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(100, (subtotal / minOrderAmount) * 100)}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900 rounded-r-lg text-xs font-medium flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            <strong>Minimum order met!</strong> You are eligible for checkout.
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Cart Items Table / List */}
                    <div className="p-4 divide-y divide-neutral-200 flex-grow overflow-y-auto">
                      {cart.map((item) => (
                        <div
                          key={`${item.id}-${item.variantTitle || ''}`}
                          className="py-3.5 flex items-center gap-3 group"
                        >
                          {/* Remove button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-neutral-400 hover:text-red-600 transition-colors shrink-0"
                            title="Remove item"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          {/* Thumbnail */}
                          <div className="w-14 h-14 relative rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Title & Variant */}
                          <div className="flex-grow min-w-0">
                            <h4 className="font-bold text-neutral-900 text-xs leading-snug truncate">
                              {item.title}
                            </h4>
                            {item.variantTitle && (
                              <p className="text-[10px] text-neutral-500 font-medium">
                                Option: {item.variantTitle}
                              </p>
                            )}
                            <p className="text-neutral-600 font-mono text-xs mt-0.5">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>

                          {/* Quantity Selector */}
                          <div className="flex items-center border border-neutral-300 rounded bg-white overflow-hidden shrink-0">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold font-mono text-neutral-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Item Subtotal */}
                          <div className="text-right shrink-0 min-w-[55px]">
                            <span className="font-mono font-bold text-xs text-neutral-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* WooCommerce Cart Totals Box */}
                    <div className="p-4 bg-neutral-50 border-t border-neutral-200 space-y-3">
                      <h4 className="text-xs font-black uppercase text-neutral-900 border-b border-neutral-200 pb-1.5 tracking-wider">
                        Cart Totals
                      </h4>

                      <div className="space-y-2 text-xs text-neutral-700 font-medium">
                        <div className="flex justify-between py-1 border-b border-neutral-200/60">
                          <span>Subtotal</span>
                          <span className="font-mono font-bold text-neutral-900">${subtotal.toFixed(2)}</span>
                        </div>

                        {/* Shipping Modes */}
                        <div className="py-1">
                          <span className="block font-bold text-neutral-900 mb-1.5 uppercase text-[11px]">
                            Shipping Method
                          </span>
                          <div className="space-y-1.5">
                            {SHIPPING_OPTIONS.map((opt) => (
                              <label
                                key={opt.id}
                                className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer text-xs transition-all ${
                                  shippingMethod === opt.id
                                    ? 'border-red-600 bg-white font-bold text-neutral-900 shadow-xs'
                                    : 'border-neutral-200 bg-neutral-100/50 text-neutral-600 hover:bg-white'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name="shipping"
                                    checked={shippingMethod === opt.id}
                                    onChange={() => setShippingMethod(opt.id)}
                                    className="accent-red-600"
                                  />
                                  <span>{opt.name} ({opt.duration})</span>
                                </div>
                                <span className="font-mono">${opt.price.toFixed(2)}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between pt-2 border-t border-neutral-200 font-black text-sm text-neutral-900">
                          <span className="uppercase">Total</span>
                          <span className="font-mono text-red-600 text-base">${grandTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* WooCommerce Action Button */}
                      <button
                        onClick={handleProceedToCheckout}
                        disabled={!isMinOrderMet}
                        className={`w-full py-3.5 font-black uppercase tracking-wider text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2 ${
                          isMinOrderMet
                            ? 'bg-red-600 text-white hover:bg-red-700 active:scale-[0.99]'
                            : 'bg-neutral-300 text-neutral-500 cursor-not-allowed shadow-none'
                        }`}
                      >
                        {isMinOrderMet ? (
                          <>
                            Proceed to Checkout <ChevronRight className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Add ${remainingForMinOrder.toFixed(2)} To Checkout
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* STEP 2: WOOCOMMERCE CHECKOUT VIEW */}
            {step === 'checkout' && (
              <form onSubmit={handlePlaceOrder} className="flex-grow flex flex-col overflow-y-auto">
                <div className="p-5 space-y-6 flex-grow overflow-y-auto">
                  
                  {/* Billing & Shipping Form */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase text-neutral-900 border-b border-neutral-200 pb-1.5 tracking-wider">
                      Billing & Shipping Details
                    </h3>

                    <div className="space-y-2.5 text-xs">
                      <div>
                        <label className="block font-bold text-neutral-800 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded text-neutral-900 font-medium focus:outline-none focus:border-red-600"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-bold text-neutral-800 mb-1">Email *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded text-neutral-900 font-medium focus:outline-none focus:border-red-600"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-neutral-800 mb-1">Phone *</label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="(555) 000-0000"
                            className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded text-neutral-900 font-medium focus:outline-none focus:border-red-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-neutral-800 mb-1">Street Address *</label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="House number and street name"
                          className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded text-neutral-900 font-medium focus:outline-none focus:border-red-600"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block font-bold text-neutral-800 mb-1">City *</label>
                          <input
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                            className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded text-neutral-900 font-medium focus:outline-none focus:border-red-600"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-neutral-800 mb-1">State *</label>
                          <input
                            type="text"
                            required
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="State"
                            className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded text-neutral-900 font-medium focus:outline-none focus:border-red-600"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-neutral-800 mb-1">Zip *</label>
                          <input
                            type="text"
                            required
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            placeholder="ZIP"
                            className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded text-neutral-900 font-medium focus:outline-none focus:border-red-600"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-neutral-800 mb-1">Order Notes (Optional)</label>
                        <textarea
                          rows={2}
                          value={orderNotes}
                          onChange={(e) => setOrderNotes(e.target.value)}
                          placeholder="Notes about your order, e.g. special delivery instructions."
                          className="w-full p-2.5 bg-neutral-50 border border-neutral-300 rounded text-neutral-900 font-medium focus:outline-none focus:border-red-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Methods Section */}
                  <div className="space-y-3 pt-2 border-t border-neutral-200">
                    <h3 className="text-xs font-black uppercase text-neutral-900 border-b border-neutral-200 pb-1.5 tracking-wider">
                      Payment Options
                    </h3>

                    <div className="space-y-2">
                      {PAYMENT_OPTIONS.map((opt) => {
                        const isSelected = paymentMethod === opt.id;
                        return (
                          <label
                            key={opt.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                              isSelected
                                ? 'border-red-600 bg-red-50/50 text-neutral-900 font-bold'
                                : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="payment"
                              checked={isSelected}
                              onChange={() => setPaymentMethod(opt.id)}
                              className="accent-red-600 mt-1"
                            />
                            <div className="flex-grow text-xs">
                              <div className="flex items-center gap-1.5 font-black uppercase text-neutral-900">
                                {renderPaymentIcon(opt.id)}
                                <span>{opt.name}</span>
                              </div>
                              {isSelected && (
                                <p className="text-[11px] font-normal text-neutral-600 mt-1 leading-snug">
                                  {opt.description}
                                </p>
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    {/* WooCommerce Style Payment Information Banner */}
                    <div className="p-3 bg-neutral-100 border border-neutral-200 rounded-lg text-xs text-neutral-700 leading-relaxed font-medium flex items-start gap-2">
                      <Info className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                      <div>
                        <strong>Payment Processing Notice:</strong> Our sales team will email/text you your specific payment address, handle, or tag once this order is submitted.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Order Bar */}
                <div className="p-4 bg-neutral-50 border-t border-neutral-200 space-y-2">
                  <div className="flex justify-between items-center text-xs font-black text-neutral-900">
                    <span className="uppercase">Grand Total</span>
                    <span className="font-mono text-red-600 text-base">${grandTotal.toFixed(2)}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 text-white py-3.5 font-black uppercase tracking-wider text-xs rounded-lg hover:bg-red-700 transition-colors shadow-md disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting Order...' : 'Place Order'}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: ORDER RECEIVED */}
            {step === 'success' && (
              <div className="flex-grow p-6 flex flex-col items-center justify-center text-center overflow-y-auto">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8" />
                </div>

                <span className="px-3 py-0.5 bg-neutral-100 text-neutral-700 font-mono font-bold text-xs rounded border border-neutral-200 mb-2">
                  Order #{orderId}
                </span>

                <h3 className="text-xl font-black text-neutral-900 mb-2 uppercase tracking-tight">
                  Thank You. Your Order Has Been Received.
                </h3>

                <p className="text-neutral-600 text-xs mb-6 max-w-sm font-medium leading-relaxed">
                  A sales representative has been assigned to order <strong className="text-neutral-900">#{orderId}</strong> and will reach out to <span className="font-bold text-neutral-900">{email}</span> shortly.
                </p>

                <div className="w-full bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-left text-xs space-y-2.5 mb-6">
                  <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                    <span className="text-neutral-500 font-bold uppercase">Date:</span>
                    <span className="font-bold text-neutral-900">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                    <span className="text-neutral-500 font-bold uppercase">Total:</span>
                    <span className="font-mono font-bold text-red-600">${grandTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200 pb-1.5">
                    <span className="text-neutral-500 font-bold uppercase">Payment Method:</span>
                    <span className="font-bold text-neutral-900 uppercase">
                      {PAYMENT_OPTIONS.find((p) => p.id === paymentMethod)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500 font-bold uppercase">Shipping Tier:</span>
                    <span className="font-bold text-neutral-900 uppercase">
                      {SHIPPING_OPTIONS.find((s) => s.id === shippingMethod)?.name} (${shippingCost})
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full bg-neutral-900 text-white py-3.5 font-black uppercase tracking-wider text-xs hover:bg-red-600 transition-colors rounded-lg shadow-md"
                >
                  Return to Shop
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

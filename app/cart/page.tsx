'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Truck, 
  ShieldCheck,
  Lock,
  Zap,
  CreditCard,
  Smartphone,
  Coins,
  DollarSign
} from 'lucide-react';
import { useCart, SHIPPING_OPTIONS, PAYMENT_OPTIONS, PaymentMethod } from '@/context/CartContext';

export default function CartPage() {
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

  const [checkoutMode, setCheckoutMode] = useState(false);

  // Form State
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
  const [orderComplete, setOrderComplete] = useState(false);

  const grandTotal = subtotal + (cart.length > 0 ? shippingCost : 0);

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
      setOrderComplete(true);
    }
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

  if (orderComplete) {
    return (
      <div className="bg-neutral-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200 shadow-xl text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="px-3 py-1 bg-neutral-100 text-neutral-800 font-mono font-bold text-xs rounded border border-neutral-200 inline-block mb-3">
            Order #{orderId}
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 uppercase tracking-tight mb-2">
            Thank you. Your order has been received.
          </h1>

          <p className="text-neutral-600 text-sm mb-8 font-medium leading-relaxed">
            A dedicated sales representative will reach out to <span className="font-bold text-neutral-900">{email}</span> and <span className="font-bold text-neutral-900">{phone}</span> shortly with your direct payment handles.
          </p>

          <div className="bg-neutral-50 p-5 rounded-xl border border-neutral-200 text-left text-xs space-y-3 mb-8">
            <div className="flex justify-between border-b border-neutral-200 pb-2">
              <span className="text-neutral-500 font-bold uppercase">Order Number:</span>
              <span className="font-mono font-bold text-neutral-900">#{orderId}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-200 pb-2">
              <span className="text-neutral-500 font-bold uppercase">Date:</span>
              <span className="font-bold text-neutral-900">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-200 pb-2">
              <span className="text-neutral-500 font-bold uppercase">Total:</span>
              <span className="font-mono font-bold text-red-600">${grandTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-200 pb-2">
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

          <Link
            href="/shop"
            onClick={() => clearCart()}
            className="inline-block bg-neutral-900 text-white px-8 py-3.5 font-black uppercase tracking-wider text-xs rounded-lg hover:bg-red-600 transition-colors shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="mb-8">
          <nav className="text-xs text-neutral-500 font-medium mb-2 flex items-center gap-1">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <span>/</span>
            <span className="text-neutral-900 font-bold">{checkoutMode ? 'Checkout' : 'Shopping Cart'}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 uppercase tracking-tight">
            {checkoutMode ? 'Checkout' : 'Shopping Cart'}
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-neutral-50 border border-neutral-200 p-12 rounded-2xl text-center max-w-lg mx-auto">
            <div className="w-16 h-16 bg-neutral-200 text-neutral-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">Your cart is currently empty.</h2>
            <p className="text-xs text-neutral-500 mb-6 font-medium">
              Minimum order requirement for checkout is $150.00.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-red-600 text-white px-8 py-3.5 font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-red-700 transition-colors shadow-md"
            >
              Return to Shop
            </Link>
          </div>
        ) : (
          <div>
            {/* WooCommerce Minimum Order Notice Box */}
            <div className="mb-8">
              {!isMinOrderMet ? (
                <div className="p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-950 rounded-r-xl text-xs font-medium space-y-2">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm text-amber-950">
                        Minimum order amount is ${minOrderAmount}.00.
                      </p>
                      <p className="text-neutral-700 mt-0.5">
                        Your current subtotal is <span className="font-mono font-bold text-neutral-900">${subtotal.toFixed(2)}</span>. Please add <span className="font-bold text-red-700">${remainingForMinOrder.toFixed(2)}</span> more to your cart to proceed to checkout.
                      </p>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-amber-600 transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / minOrderAmount) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-950 rounded-r-xl text-xs font-medium flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-emerald-950">Minimum order met!</p>
                    <p className="text-emerald-800">Your order total satisfies the $150 requirement. You can proceed to checkout.</p>
                  </div>
                </div>
              )}
            </div>

            {!checkoutMode ? (
              /* CART TABLE VIEW */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Cart Table (Left 2 cols) */}
                <div className="lg:col-span-2 overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-neutral-200 text-neutral-500 text-[11px] font-black uppercase tracking-wider">
                        <th className="pb-3 w-10"></th>
                        <th className="pb-3 w-16"></th>
                        <th className="pb-3">Product</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">Quantity</th>
                        <th className="pb-3 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {cart.map((item) => (
                        <tr key={`${item.id}-${item.variantTitle || ''}`} className="align-middle">
                          <td className="py-4 pr-2">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                          <td className="py-4 pr-4">
                            <div className="w-14 h-14 relative rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          </td>
                          <td className="py-4 pr-4">
                            <h3 className="font-bold text-xs text-neutral-900">{item.title}</h3>
                            {item.variantTitle && (
                              <span className="text-[10px] text-neutral-500 font-medium">Option: {item.variantTitle}</span>
                            )}
                          </td>
                          <td className="py-4 pr-4 font-mono text-xs font-bold text-neutral-800">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="py-4 pr-4">
                            <div className="flex items-center border border-neutral-300 rounded bg-white w-24">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-100"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="flex-grow text-center text-xs font-bold font-mono">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:bg-neutral-100"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 text-right font-mono text-xs font-black text-neutral-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cart Totals Sidebar (Right 1 col) */}
                <div className="lg:col-span-1 bg-neutral-50 border border-neutral-200 p-6 rounded-2xl h-fit space-y-4">
                  <h2 className="text-sm font-black uppercase text-neutral-900 border-b border-neutral-200 pb-2 tracking-wider">
                    Cart Totals
                  </h2>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-neutral-200/80">
                      <span className="font-bold text-neutral-600">Subtotal</span>
                      <span className="font-mono font-bold text-neutral-900">${subtotal.toFixed(2)}</span>
                    </div>

                    <div>
                      <span className="block font-bold text-neutral-900 mb-2 uppercase text-[11px]">
                        Shipping
                      </span>
                      <div className="space-y-2">
                        {SHIPPING_OPTIONS.map((opt) => (
                          <label
                            key={opt.id}
                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                              shippingMethod === opt.id
                                ? 'border-red-600 bg-white font-bold text-neutral-900 shadow-xs'
                                : 'border-neutral-200 bg-white/60 text-neutral-600 hover:bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="cart_shipping"
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

                    <div className="flex justify-between pt-3 border-t border-neutral-200 font-black text-sm text-neutral-900">
                      <span className="uppercase">Total</span>
                      <span className="font-mono text-red-600 text-lg">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutMode(true)}
                    disabled={!isMinOrderMet}
                    className={`w-full py-4 font-black uppercase tracking-wider text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2 ${
                      isMinOrderMet
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-neutral-300 text-neutral-500 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {isMinOrderMet ? (
                      <>
                        Proceed to Checkout <ChevronRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Add ${remainingForMinOrder.toFixed(2)} More To Checkout
                      </>
                    )}
                  </button>
                </div>

              </div>
            ) : (
              /* CHECKOUT FORM VIEW */
              <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Billing Details (Left 2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutMode(false)}
                      className="text-xs text-neutral-500 hover:text-red-600 font-bold flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back to Cart
                    </button>
                  </div>

                  <div className="bg-white border border-neutral-200 p-6 rounded-2xl space-y-4">
                    <h2 className="text-sm font-black uppercase text-neutral-900 border-b border-neutral-200 pb-2 tracking-wider">
                      1. Billing & Shipping Address
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="sm:col-span-2">
                        <label className="block font-bold text-neutral-800 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-lg font-medium text-neutral-900 focus:outline-none focus:border-red-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-neutral-800 mb-1">Email *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-lg font-medium text-neutral-900 focus:outline-none focus:border-red-600"
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
                          className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-lg font-medium text-neutral-900 focus:outline-none focus:border-red-600"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-neutral-800 mb-1">Street Address *</label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="House number and street name"
                          className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-lg font-medium text-neutral-900 focus:outline-none focus:border-red-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-neutral-800 mb-1">Town / City *</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                          className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-lg font-medium text-neutral-900 focus:outline-none focus:border-red-600"
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
                          className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-lg font-medium text-neutral-900 focus:outline-none focus:border-red-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-neutral-800 mb-1">ZIP Code *</label>
                        <input
                          type="text"
                          required
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          placeholder="ZIP"
                          className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-lg font-medium text-neutral-900 focus:outline-none focus:border-red-600"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-bold text-neutral-800 mb-1">Order Notes (Optional)</label>
                        <textarea
                          rows={3}
                          value={orderNotes}
                          onChange={(e) => setOrderNotes(e.target.value)}
                          placeholder="Notes about your order, e.g. special instructions for delivery."
                          className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-lg font-medium text-neutral-900 focus:outline-none focus:border-red-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary & Payment (Right 1 col) */}
                <div className="lg:col-span-1 space-y-6">
                  
                  {/* Summary Box */}
                  <div className="bg-neutral-50 border border-neutral-200 p-6 rounded-2xl space-y-4">
                    <h2 className="text-sm font-black uppercase text-neutral-900 border-b border-neutral-200 pb-2 tracking-wider">
                      2. Your Order
                    </h2>

                    <div className="space-y-2 text-xs divide-y divide-neutral-200">
                      {cart.map((item) => (
                        <div key={`${item.id}-${item.variantTitle}`} className="pt-2 flex justify-between">
                          <span>{item.title} x {item.quantity}</span>
                          <span className="font-mono font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}

                      <div className="pt-2 flex justify-between font-bold">
                        <span>Subtotal</span>
                        <span className="font-mono">${subtotal.toFixed(2)}</span>
                      </div>

                      <div className="pt-2 flex justify-between font-bold">
                        <span>Shipping ({SHIPPING_OPTIONS.find(s=>s.id===shippingMethod)?.name})</span>
                        <span className="font-mono">${shippingCost.toFixed(2)}</span>
                      </div>

                      <div className="pt-3 flex justify-between font-black text-sm text-neutral-900">
                        <span>TOTAL</span>
                        <span className="font-mono text-red-600 text-lg">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Payment Options */}
                    <div className="pt-4 border-t border-neutral-200 space-y-3">
                      <h3 className="text-xs font-black uppercase text-neutral-900 tracking-wider">
                        3. Payment Options
                      </h3>

                      <div className="space-y-2">
                        {PAYMENT_OPTIONS.map((opt) => (
                          <label
                            key={opt.id}
                            className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-all ${
                              paymentMethod === opt.id
                                ? 'border-red-600 bg-white font-bold text-neutral-900 shadow-xs'
                                : 'border-neutral-200 bg-neutral-100/60 text-neutral-700 hover:bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="checkout_payment"
                              checked={paymentMethod === opt.id}
                              onChange={() => setPaymentMethod(opt.id)}
                              className="accent-red-600 mt-1"
                            />
                            <div className="text-xs flex-grow">
                              <div className="flex items-center gap-1.5 font-bold uppercase text-neutral-900">
                                {renderPaymentIcon(opt.id)}
                                <span>{opt.name}</span>
                              </div>
                              {paymentMethod === opt.id && (
                                <p className="text-[11px] font-normal text-neutral-600 mt-1 leading-relaxed">
                                  {opt.description}
                                </p>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-wider text-xs rounded-lg hover:bg-red-700 transition-colors shadow-md disabled:opacity-50"
                      >
                        {isSubmitting ? 'Placing Order...' : 'Place Order'}
                      </button>
                    </div>

                  </div>
                </div>

              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 10000 ? 0 : 250;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-8">Your Cart is Empty</h1>
        <Link
          to="/shop"
          className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <motion.div
              // key={`${item._id}-${item.selectedSize}`}
              key={`${item._id}-${item.selectedSize}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex gap-6 p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{item.name}</h3>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-black"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mt-2 text-sm text-gray-600">
                  <p>Size: {item.selectedSize}</p>
                  {/*<p>Color: {item.selectedColor}</p>*/}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="p-1 border rounded-full hover:bg-gray-100"
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 border rounded-full hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="font-semibold">LKR {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>LKR {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `LKR ${shipping.toFixed(2)}`}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>LKR {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Link
            to="/checkout"
            className="block w-full bg-black text-white text-center py-3 rounded-full mt-6 hover:bg-gray-900 transition-colors"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/shop"
            className="block w-full text-center py-3 mt-4 hover:text-gray-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
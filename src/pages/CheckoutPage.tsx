import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import {saveLogin} from "../api/Auth.ts";
import {saveOrder} from "../api/Order.ts";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
;

  const [email, setEmail] = useState('');
  const [firstName, setFirstAame] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCOde] = useState('');
  const [city, setCIty] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 10000 ? 0 : 250;
  const total = subtotal + shipping;



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let totalPrice=total;

    let products = cartItems.map(item => ({
      productId: item.productId,
      size: item.selectedSize,
      quantity: item.quantity
    }));
    let isSaved = await saveOrder({email,firstName,lastName,address,city,postalCode,products,totalPrice});


    // toast.success('Order placed successfully!');
    // clearCart();
    // navigate('/');

  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstAame(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e) => setCIty(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCOde(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/*<div className="border-t pt-6">*/}
            {/*  <h2 className="text-2xl font-bold mb-6">Payment Information</h2>*/}
            {/*  <div className="space-y-4">*/}
            {/*    <div>*/}
            {/*      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">*/}
            {/*        Card Number*/}
            {/*      </label>*/}
            {/*      <input*/}
            {/*        type="text"*/}
            {/*        id="cardNumber"*/}
            {/*        name="cardNumber"*/}
            {/*        value={formData.cardNumber}*/}
            {/*        onChange={handleInputChange}*/}
            {/*        required*/}
            {/*        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"*/}
            {/*      />*/}
            {/*    </div>*/}

            {/*    <div className="grid grid-cols-2 gap-4">*/}
            {/*      <div>*/}
            {/*        <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">*/}
            {/*          Expiry Date*/}
            {/*        </label>*/}
            {/*        <input*/}
            {/*          type="text"*/}
            {/*          id="cardExpiry"*/}
            {/*          name="cardExpiry"*/}
            {/*          placeholder="MM/YY"*/}
            {/*          value={formData.cardExpiry}*/}
            {/*          onChange={handleInputChange}*/}
            {/*          required*/}
            {/*          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*      <div>*/}
            {/*        <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">*/}
            {/*          CVC*/}
            {/*        </label>*/}
            {/*        <input*/}
            {/*          type="text"*/}
            {/*          id="cardCvc"*/}
            {/*          name="cardCvc"*/}
            {/*          value={formData.cardCvc}*/}
            {/*          onChange={handleInputChange}*/}
            {/*          required*/}
            {/*          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-900 transition-colors"
            >
              Place Order
            </button>
          </form>
        </motion.div>

        <div>
          <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              {cartItems.map(item => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        {item.selectedSize} / Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
              ))}

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>LKR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `LKR ${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>LKR {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { IconCrown, IconCheck } from '@tabler/icons-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SubandPay = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Subscription Details */}
          <div className="bg-rose-50 p-8 rounded-lg">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-4">Subscribe to Premium</h1>
              <div className="text-3xl font-bold mb-2">
                $3.00 <span className="text-lg font-normal text-gray-600">per month</span>
              </div>
              <a href="/subandpay_y" className="text-rose-600 underline font-medium hover:text-rose-700 transition-colors">Save 25% with yearly billing</a>
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="font-semibold text-lg">Premium features include:</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Advanced search and filter functionality</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Dark mode</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Expanded research information</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Interventions effectiveness score</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck className="w-5 h-5 text-green-500" />
                  <span>Bias analysis using Cochrane tools</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="bg-white p-8 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Contact information</h2>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Payment Method</h3>
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className="w-full bg-[#ffc439] text-[#003087] py-3 rounded-md font-bold flex items-center justify-center"
                  >
                    <span>Pay with PayPal</span>
                  </button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card number
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiration
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                Place Order
              </button>

              <p className="text-sm text-gray-500 text-center">
                By clicking Place Order you agree to the Terms & Conditions.
                All payments for Paid Services are final and non-refundable.
              </p>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubandPay;
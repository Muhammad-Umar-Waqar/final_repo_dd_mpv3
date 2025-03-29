// pages/pirsch-test.js
import { useState } from 'react';
import Head from 'next/head';
import { trackEvent } from '../lib/analytics';

export default function PirschTest() {
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eventName, setEventName] = useState('test_event');
  const [eventDuration, setEventDuration] = useState(0);
  const [eventMeta, setEventMeta] = useState('{"test":"data"}');

  const runServerTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analytics/test-pirsch');
      const data = await response.json();
      setTestResults(data);
    } catch (error) {
      setTestResults({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const trackCustomEvent = async () => {
    try {
      let meta = {};
      try {
        meta = JSON.parse(eventMeta);
      } catch (e) {
        alert('Invalid JSON for metadata. Using empty object.');
      }
      
      await trackEvent(eventName, Number(eventDuration), meta);
      alert('Event tracked! Check server logs for details.');
    } catch (error) {
      alert(`Error tracking event: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Pirsch Analytics Test</title>
      </Head>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Pirsch Analytics Test</h1>
        
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Server-side Integration Test</h2>
          <p className="mb-4">
            This will test the server-side integration with Pirsch, including authentication, 
            page view tracking, and event tracking.
          </p>
          
          <button
            onClick={runServerTest}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            {loading ? 'Running Tests...' : 'Run Server Tests'}
          </button>
          
          {testResults && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Test Results:</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
                {JSON.stringify(testResults, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Client-side Event Tracking Test</h2>
          <p className="mb-4">
            This will test client-side event tracking using the trackEvent function.
          </p>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Name
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (seconds)
              </label>
              <input
                type="number"
                value={eventDuration}
                onChange={(e) => setEventDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Metadata (JSON)
              </label>
              <textarea
                value={eventMeta}
                onChange={(e) => setEventMeta(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>
          </div>
          
          <button
            onClick={trackCustomEvent}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          >
            Track Event
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Note: Page views are tracked automatically by the middleware.
            Simply visiting this page should trigger a page view in Pirsch.
          </p>
        </div>
      </div>
    </div>
  );
}

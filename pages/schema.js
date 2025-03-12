import { useState, useEffect } from 'react';
import { IconDatabase, IconTable, IconKey } from '@tabler/icons-react';

export default function SchemaPage() {
  const [schema, setSchema] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docSchema, setDocSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/schema')
      .then(res => res.json())
      .then(data => {
        setSchema(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedDoc) {
      setLoading(true);
      fetch(`/api/schema?documentId=${selectedDoc}`)
        .then(res => res.json())
        .then(data => {
          setDocSchema(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setDocSchema(null);
    }
  }, [selectedDoc]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-pulse text-gray-500">Loading schema...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center text-red-600">
          Error loading schema: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <IconDatabase className="inline-block mr-2 mb-1" />
            Database Schema
          </h1>
          {schema && (
            <p className="text-gray-600">
              Collection: {schema.collection} ({schema.documentCount} documents)
            </p>
          )}
        </div>

        {/* Document Selection */}
        {schema && schema.documents && (
          <div className="bg-white shadow rounded-lg mb-8 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <IconTable className="mr-2" />
              Select Document
            </h2>
            <select
              className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedDoc || ''}
              onChange={(e) => setSelectedDoc(e.target.value || null)}
            >
              <option value="">Select a document...</option>
              {schema.documents.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.type} - {doc.uid || doc.id}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Document Schema */}
        {docSchema && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <IconTable className="mr-2" />
              Document Schema
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Field Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.entries(docSchema.fields).map(([field, info], i) => (
                    <tr key={field} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {field}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {info.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(info.value, null, 2)}
                        </pre>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Indexes Section */}
        {schema && schema.indexes && (
          <div className="bg-white shadow rounded-lg mt-8 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <IconKey className="mr-2" />
              Collection Indexes
            </h2>
            <div className="space-y-4">
              {schema.indexes.map((index, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm text-gray-700 overflow-x-auto">
                    {JSON.stringify(index, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

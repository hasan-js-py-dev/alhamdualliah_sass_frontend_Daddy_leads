import { Helmet } from 'react-helmet-async';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Download, Linkedin, Settings } from 'lucide-react';

const DashboardPage = () => {
  const exports = [
    {
      status: 'Export done',
      name: 'export-oct-22-08-04-am',
      leads: 721,
      date: '10/22/25',
      time: '8:07 am',
    },
    {
      status: 'Export done',
      name: 'ds',
      leads: 721,
      date: '10/22/25',
      time: '8:07 am',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Sales Navigator Export - Daddy Leads Dashboard</title>
        <meta name="description" content="Manage your LinkedIn Sales Navigator exports and B2B lead generation data" />
      </Helmet>

      <DashboardLayout>
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#e0d4f7' }}>
                <Linkedin size={24} style={{ color: '#6366f1' }} />
              </div>
              <h1 className="text-3xl font-bold" style={{ color: '#1f2937' }}>
                Sales Navigator Export
              </h1>
            </div>
            <Button 
              className="h-12 px-6 text-base font-semibold"
              style={{ backgroundColor: '#6366f1' }}
            >
              <Plus size={20} className="mr-2" />
              New Export
            </Button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 max-w-sm">
              <select 
                className="w-full h-12 px-4 rounded-lg border-2 bg-white text-gray-700"
                style={{ borderColor: '#d1d5db' }}
              >
                <option>All exports</option>
                <option>Completed</option>
                <option>In Progress</option>
              </select>
            </div>
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Search by name..."
                  className="h-12 pl-12 pr-4 border-2 bg-white"
                  style={{ borderColor: '#d1d5db' }}
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: '#6366f1' }}>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">File</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Leads</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Emails</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">URL</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Date</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white"></th>
                </tr>
              </thead>
              <tbody>
                {exports.map((item, index) => (
                  <tr 
                    key={index}
                    className="border-b border-l-4"
                    style={{ 
                      borderBottomColor: '#e5e7eb',
                      borderLeftColor: '#22c55e'
                    }}
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium" style={{ color: '#22c55e' }}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{item.name}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        className="w-8 h-8 rounded flex items-center justify-center mx-auto"
                        style={{ backgroundColor: '#6366f1' }}
                      >
                        <Download size={16} className="text-white" />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-900">{item.leads}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button 
                        size="sm"
                        style={{ backgroundColor: '#6366f1' }}
                      >
                        Find emails
                      </Button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        className="w-8 h-8 rounded flex items-center justify-center mx-auto"
                        style={{ backgroundColor: '#6366f1' }}
                      >
                        <Linkedin size={16} className="text-white" />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm text-gray-900">
                        <div>{item.date}</div>
                        <div className="text-gray-500">{item.time}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        className="w-8 h-8 rounded flex items-center justify-center mx-auto hover:bg-gray-100"
                      >
                        <Settings size={16} className="text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default DashboardPage;

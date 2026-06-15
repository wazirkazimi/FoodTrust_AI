import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Camera, Leaf, Beef, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useScan } from '../hooks/useScan';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

const Home = () => {
  const { user } = useAuth();
  const { getScanHistory } = useScan();
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vegFilter, setVegFilter] = useState(user?.vegFilter || false);

  useEffect(() => {
    const loadRecentScans = async () => {
      try {
        const scans = await getScanHistory();
        setRecentScans(scans.slice(0, 3)); // Get last 3 scans
      } catch (error) {
        console.error('Failed to load recent scans:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentScans();
  }, []);

  const categories = [
    { name: 'Biscuits', icon: '🍪' },
    { name: 'Breakfast', icon: '🥞' },
    { name: 'Cold Drinks', icon: '🥤' },
    { name: 'Chocolates', icon: '🍫' },
    { name: 'Snacks', icon: '🥨' },
    { name: 'Dairy', icon: '🥛' }
  ];

  const healthyPicks = [
    { name: 'Organic Oats', grade: 'A', image: '/api/placeholder/100/100' },
    { name: 'Greek Yogurt', grade: 'A', image: '/api/placeholder/100/100' },
    { name: 'Almonds', grade: 'B', image: '/api/placeholder/100/100' }
  ];

  return (
    <PageWrapper>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6 rounded-3xl mx-4 mt-4 mb-6 shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-xl font-bold mb-2">
            Hi {user?.name?.split(' ')[0] || 'there'} 👋
          </h1>
          <p className="text-primary-100 mb-4">
            Ready to make a smart choice?
          </p>

          {/* Search Bar */}
          <Link to="/search">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 flex items-center space-x-3 hover:bg-opacity-30 transition-all duration-200">
              <Search size={20} className="text-primary-200" />
              <span className="text-primary-100">Search for products...</span>
            </div>
          </Link>
        </motion.div>
      </div>

      <div className="px-4 space-y-6">
        {/* VEG Toggle */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between"
        >
          <span className="text-sm font-medium text-gray-700">VEG Only</span>
          <button
            onClick={() => setVegFilter(!vegFilter)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              vegFilter ? 'bg-success' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                vegFilter ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </motion.div>

        {/* Quick Scan CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/scan">
            <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quick Scan</h3>
                <p className="text-primary-100 mb-4">
                  Upload or scan a product to get instant health grades
                </p>
                <Button className="bg-white text-primary-600 hover:bg-gray-50">
                  <Sparkles size={16} className="mr-2" />
                  Start Scanning
                </Button>
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* Top Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Categories</h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <Card hover className="text-center py-4">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <p className="text-sm font-medium text-gray-700">{category.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Healthy Picks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Healthy Picks</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {healthyPicks.map((pick, index) => (
              <motion.div
                key={pick.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="flex-shrink-0 w-32"
              >
                <Card hover className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl mx-auto mb-2 flex items-center justify-center">
                    <span className="text-2xl">🥗</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">{pick.name}</p>
                  <span className="inline-block px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                    Grade {pick.grade}
                  </span>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Scans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Scans</h2>
            <Link to="/log" className="text-primary-600 text-sm font-medium">
              View all
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <div className="flex items-center space-x-3">
                    <LoadingSkeleton className="w-12 h-12 rounded-xl" />
                    <div className="flex-1">
                      <LoadingSkeleton width="w-3/4" />
                      <LoadingSkeleton width="w-1/2" className="mt-2" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : recentScans.length > 0 ? (
            <div className="space-y-3">
              {recentScans.map((scan, index) => (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                >
                  <Link to={`/results/${scan.id}`}>
                    <Card hover>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                          <span className="text-lg">📦</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{scan.productName}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {new Date(scan.createdAt).toLocaleDateString()}
                            </span>
                            <span className={`inline-block w-2 h-2 rounded-full ${
                              scan.vegStatus === 'veg' ? 'bg-success' : 'bg-danger'
                            }`} />
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-700">
                            {scan.scores?.customScore}/10
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">No scans yet</p>
                <p className="text-sm text-gray-500">Start scanning products to see them here</p>
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Home;
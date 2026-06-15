import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Filter, Trash2, BookOpen } from 'lucide-react';
import { useScan } from '../hooks/useScan';
import { getVegIndicator } from '../utils/gradingAlgorithms';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

const FoodLog = () => {
  const { getScanHistory } = useScan();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, week, month
  const [healthModeFilter, setHealthModeFilter] = useState('all');

  useEffect(() => {
    const loadScans = async () => {
      try {
        const scanData = await getScanHistory();
        setScans(scanData);
      } catch (error) {
        console.error('Failed to load food log:', error);
      } finally {
        setLoading(false);
      }
    };

    loadScans();
  }, []);

  const filteredScans = scans.filter(scan => {
    const scanDate = new Date(scan.createdAt);
    const now = new Date();
    const diffTime = now - scanDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    // Date filter
    if (filter === 'week' && diffDays > 7) return false;
    if (filter === 'month' && diffDays > 30) return false;

    // Health mode filter
    if (healthModeFilter !== 'all' && scan.healthMode !== healthModeFilter) return false;

    return true;
  });

  const handleDelete = (scanId) => {
    // This would call an API to delete the scan
    setScans(scans.filter(scan => scan.id !== scanId));
  };

  const healthModes = ['all', 'default', 'weightLoss', 'diabetic', 'gym'];

  if (loading) {
    return (
      <PageWrapper title="Food Log">
        <div className="p-4 space-y-4">
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
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title="Food Log">
      <div className="p-4">
        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Your Scans</h2>
            <Filter size={20} className="text-gray-500" />
          </div>

          <div className="space-y-3">
            {/* Date Filter */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Time Period</p>
              <div className="flex space-x-2">
                {[
                  { value: 'all', label: 'All Time' },
                  { value: 'week', label: 'This Week' },
                  { value: 'month', label: 'This Month' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFilter(option.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      filter === option.value
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Health Mode Filter */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Health Mode</p>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {healthModes.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setHealthModeFilter(mode)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      healthModeFilter === mode
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {mode === 'all' ? 'All Modes' : mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scan List */}
        {filteredScans.length > 0 ? (
          <div className="space-y-4">
            {filteredScans.map((scan, index) => {
              const vegIndicator = getVegIndicator(scan.vegStatus);
              return (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card hover>
                    <Link to={`/results/${scan.id}`}>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                          <span className="text-lg">📦</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {scan.productName}
                          </h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <Calendar size={14} className="text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {new Date(scan.createdAt).toLocaleDateString()}
                            </span>
                            <span className={`inline-block w-2 h-2 rounded-full ${vegIndicator.dot}`} />
                            <span className={`text-xs ${vegIndicator.text}`}>
                              {vegIndicator.label}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="grade" size="sm">
                              {scan.scores.customScore}/10
                            </Badge>
                            <Badge variant="grade" size="sm">
                              {scan.scores.nutriScore}
                            </Badge>
                            <Badge variant="grade" size="sm">
                              {scan.scores.nutriGrade}
                            </Badge>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(scan.id);
                          }}
                          className="p-2 text-gray-400 hover:text-danger transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </Link>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">No scans found</p>
            <p className="text-sm text-gray-500 mb-6">
              {filter !== 'all' || healthModeFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Start scanning products to build your food log'
              }
            </p>
            <Link to="/scan">
              <Button>Start Scanning</Button>
            </Link>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default FoodLog;
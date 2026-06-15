import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Leaf, Beef } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getVegIndicator } from '../utils/gradingAlgorithms';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

const Search = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vegFilter, setVegFilter] = useState(user?.vegFilter || false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    'All', 'Biscuits', 'Breakfast & Spreads', 'Cold Drinks',
    'Chocolates', 'Snacks', 'Dairy', 'Ready-to-eat', 'Cereals'
  ];

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      // This would call the search API
      // For now, we'll simulate search results
      const mockResults = [
        {
          id: '1',
          name: 'Organic Oats',
          imageUrl: '',
          scores: { customScore: 8, nutriScore: 'A', nutriGrade: 'A', japaneseGrade: 'Excellent' },
          vegStatus: 'veg'
        },
        {
          id: '2',
          name: 'Dark Chocolate',
          imageUrl: '',
          scores: { customScore: 6, nutriScore: 'C', nutriGrade: 'B', japaneseGrade: 'Good' },
          vegStatus: 'veg'
        }
      ];
      setResults(mockResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, vegFilter, selectedCategory]);

  return (
    <PageWrapper>
      <div className="p-4">
        {/* Search Header */}
        <div className="mb-6">
          <div className="relative mb-4">
            <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products..."
              className="input-field pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">VEG</span>
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
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  (category === 'All' && !selectedCategory) || selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <div className="flex items-center space-x-3">
                  <LoadingSkeleton className="w-16 h-16 rounded-xl" />
                  <div className="flex-1">
                    <LoadingSkeleton width="w-3/4" />
                    <LoadingSkeleton width="w-1/2" className="mt-2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : results.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {results.map((product, index) => {
              const vegIndicator = getVegIndicator(product.vegStatus);
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link to={`/results/${product.id}`}>
                    <Card hover>
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                          <span className="text-2xl">🥗</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`inline-block w-2 h-2 rounded-full ${vegIndicator.dot}`} />
                            <span className={`text-xs ${vegIndicator.text}`}>
                              {vegIndicator.label}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="grade" size="sm">
                              {product.scores.customScore}/10
                            </Badge>
                            <Badge variant="grade" size="sm">
                              {product.scores.nutriScore}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ) : query ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">No products found</p>
            <p className="text-sm text-gray-500">
              Try searching with different keywords
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">Search for products</p>
            <p className="text-sm text-gray-500">
              Enter a product name to get health grades and nutrition info
            </p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Search;
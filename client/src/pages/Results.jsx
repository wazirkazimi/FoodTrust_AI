import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Flag, Share2, Bookmark, BookmarkCheck } from 'lucide-react';
import { useScan } from '../hooks/useScan';
import { getVegIndicator } from '../utils/gradingAlgorithms';
import PageWrapper from '../components/layout/PageWrapper';
import Navbar from '../components/layout/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import HealthScoreCard from '../components/dashboard/HealthScoreCard';
import GradingPanel from '../components/dashboard/GradingPanel';
import FSSAIStatusBadge from '../components/dashboard/FSSAIStatusBadge';
import NutritionBreakdown from '../components/dashboard/NutritionBreakdown';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import toast from 'react-hot-toast';

const Results = () => {
  const { scanId } = useParams();
  const navigate = useNavigate();
  const { getScanById } = useScan();
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const loadScan = async () => {
      try {
        const scanData = await getScanById(scanId);
        setScan(scanData);
      } catch (error) {
        toast.error('Failed to load scan results');
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    loadScan();
  }, [scanId]);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleReport = () => {
    // This would open a modal or navigate to report page
    toast.success('Report submitted successfully');
  };

  const handleSaveToLog = () => {
    toast.success('Saved to food log');
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="p-4 space-y-6">
          <LoadingSkeleton height="h-48" />
          <LoadingSkeleton height="h-32" />
          <LoadingSkeleton height="h-64" />
        </div>
      </PageWrapper>
    );
  }

  if (!scan) {
    return (
      <PageWrapper>
        <div className="p-4 text-center">
          <p className="text-gray-600">Scan not found</p>
          <Button onClick={() => navigate('/home')} className="mt-4">
            Go Home
          </Button>
        </div>
      </PageWrapper>
    );
  }

  const vegIndicator = getVegIndicator(scan.vegStatus);

  return (
    <PageWrapper showBottomNav={false}>
      <Navbar
        title="Scan Results"
        showBack
        backTo="/home"
        rightElement={
          <div className="flex space-x-2">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full ${
                bookmarked ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {bookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
            </button>
            <button className="p-2 bg-gray-100 text-gray-600 rounded-full">
              <Share2 size={20} />
            </button>
          </div>
        }
      />

      <div className="p-4 space-y-6">
        {/* Product Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {scan.imageUrl ? (
                <img
                  src={scan.imageUrl}
                  alt={scan.productName}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <span className="text-3xl">📦</span>
              )}
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              {scan.productName}
            </h1>
            <div className="flex items-center justify-center space-x-2">
              <span className={`inline-block w-3 h-3 rounded-full ${vegIndicator.dot}`} />
              <span className={`text-sm font-medium ${vegIndicator.text}`}>
                {vegIndicator.label}
              </span>
            </div>
          </Card>
        </motion.div>

        {/* FSSAI Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <FSSAIStatusBadge
            status={scan.fssaiStatus}
            fssaiNumber={scan.fssaiNumber}
          />
        </motion.div>

        {/* Health Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HealthScoreCard
            score={scan.scores.customScore}
            grade={`${scan.scores.customScore}/10`}
            title="Custom Health Score"
            subtitle={`Based on your ${scan.healthMode} preferences`}
          />
        </motion.div>

        {/* Grading Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GradingPanel scores={scan.scores} />
        </motion.div>

        {/* Nutrition Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <NutritionBreakdown nutrition={scan.nutritionData} />
        </motion.div>

        {/* Health Mode Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Mode Impact</h3>
            <div className="bg-primary-50 rounded-xl p-4">
              <p className="text-primary-700">
                <span className="font-medium">Active Mode:</span> {scan.healthMode}
              </p>
              <p className="text-sm text-primary-600 mt-2">
                This score has been adjusted based on your {scan.healthMode} goals.
                {scan.healthMode === 'diabetic' && ' Sugar content has been heavily penalized.'}
                {scan.healthMode === 'weightLoss' && ' Calories and fat content have been considered.'}
                {scan.healthMode === 'gym' && ' Protein content has been rewarded.'}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-3"
        >
          <Button onClick={handleSaveToLog} className="w-full">
            <Heart size={16} className="mr-2" />
            Save to Food Log
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleBookmark}>
              {bookmarked ? <BookmarkCheck size={16} className="mr-2" /> : <Bookmark size={16} className="mr-2" />}
              {bookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>

            <Button variant="outline" onClick={handleReport} className="border-danger text-danger hover:bg-danger hover:text-white">
              <Flag size={16} className="mr-2" />
              Report
            </Button>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Results;
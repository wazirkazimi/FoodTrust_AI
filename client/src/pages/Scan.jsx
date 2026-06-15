import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, Camera, Zap } from 'lucide-react';
import { useScan } from '../hooks/useScan';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ImageUploader from '../components/scanner/ImageUploader';
import BarcodeScanner from '../components/scanner/BarcodeScanner';
import toast from 'react-hot-toast';

const Scan = () => {
  const [activeTab, setActiveTab] = useState('image');
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectedBarcode, setDetectedBarcode] = useState('');
  const { scanImage, scanBarcode, loading } = useScan();
  const navigate = useNavigate();

  const handleImageSelect = (file) => {
    setSelectedImage(file);
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  const handleBarcodeDetected = (barcode) => {
    setDetectedBarcode(barcode);
    toast.success(`Barcode detected: ${barcode}`);
  };

  const handleImageScan = async () => {
    if (!selectedImage) return;

    try {
      const result = await scanImage(selectedImage);
      toast.success('Product scanned successfully!');
      navigate(`/results/${result.scan.id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to scan product');
    }
  };

  const handleBarcodeScan = async () => {
    if (!detectedBarcode) {
      toast.error('Please enter or scan a barcode first');
      return;
    }

    try {
      const result = await scanBarcode(detectedBarcode);
      toast.success('Barcode scanned successfully!');
      navigate(`/results/${result.scan.id}`);
    } catch (error) {
      toast.error(error.message || 'Failed to scan barcode');
    }
  };

  const tabs = [
    { id: 'image', label: '📷 Upload Image', icon: Upload },
    { id: 'barcode', label: '📊 Scan Barcode', icon: Camera }
  ];

  return (
    <PageWrapper title="Scan Product">
      <div className="p-4">
        {/* Tab Navigation */}
        <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{tab.label.split(' ')[1]}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'image' ? (
            <div className="space-y-6">
              <ImageUploader
                onImageSelect={handleImageSelect}
                selectedImage={selectedImage}
                onRemove={handleImageRemove}
              />

              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button
                    onClick={handleImageScan}
                    className="w-full py-4 text-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Analyzing Product...
                      </>
                    ) : (
                      <>
                        <Zap size={20} className="mr-2" />
                        Analyze Product
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <BarcodeScanner onBarcodeDetected={handleBarcodeDetected} />

              {detectedBarcode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-primary-50 border-primary-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Detected Barcode:</p>
                      <p className="font-mono text-lg font-semibold text-primary-700">
                        {detectedBarcode}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )}

              <Button
                onClick={handleBarcodeScan}
                className="w-full py-4 text-lg"
                disabled={loading || !detectedBarcode}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Scanning Barcode...
                  </>
                ) : (
                  <>
                    <Zap size={20} className="mr-2" />
                    Scan Barcode
                  </>
                )}
              </Button>
            </div>
          )}
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8"
        >
          <Card className="bg-blue-50 border-blue-200">
            <div className="text-center">
              <h3 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Ensure good lighting for better OCR accuracy</li>
                <li>• Hold camera steady when scanning barcodes</li>
                <li>• Make sure the product label is clearly visible</li>
                <li>• Supported formats: JPG, PNG, WebP (max 5MB)</li>
              </ul>
            </div>
          </Card>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Scan;
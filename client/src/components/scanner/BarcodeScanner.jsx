import React, { useState, useRef, useEffect } from 'react';
import Quagga from 'quagga';
import { Camera, CameraOff, Zap } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const BarcodeScanner = ({ onBarcodeDetected }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    // Check if camera is available
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setHasCamera(true))
      .catch(() => setHasCamera(false));

    return () => {
      if (isScanning) {
        Quagga.stop();
      }
    };
  }, []);

  const startScanning = () => {
    setError(null);

    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: scannerRef.current,
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment' // Use back camera on mobile
          }
        },
        locator: {
          patchSize: 'medium',
          halfSample: true
        },
        numOfWorkers: 2,
        decoder: {
          readers: ['ean_reader', 'ean_8_reader', 'code_128_reader', 'code_39_reader', 'upc_reader']
        },
        locate: true
      },
      (err) => {
        if (err) {
          setError('Failed to initialize camera');
          return;
        }
        Quagga.start();
        setIsScanning(true);
      }
    );

    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      onBarcodeDetected(code);
      stopScanning();
    });
  };

  const stopScanning = () => {
    Quagga.stop();
    setIsScanning(false);
  };

  const handleManualInput = (e) => {
    e.preventDefault();
    const barcode = e.target.barcode.value.trim();
    if (barcode) {
      onBarcodeDetected(barcode);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Scan Product Barcode
          </h3>
          <p className="text-sm text-gray-600">
            Point your camera at the barcode on the product packaging
          </p>
        </div>

        {!hasCamera ? (
          <div className="text-center py-8">
            <CameraOff size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">Camera not available</p>
            <p className="text-sm text-gray-500">
              Please use manual barcode entry below
            </p>
          </div>
        ) : (
          <div className="relative">
            <div
              ref={scannerRef}
              className="w-full h-64 bg-gray-100 rounded-xl overflow-hidden"
            />
            {!isScanning && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                <Button onClick={startScanning} className="bg-white text-gray-800 hover:bg-gray-50">
                  <Camera size={20} className="mr-2" />
                  Start Scanning
                </Button>
              </div>
            )}
            {isScanning && (
              <div className="absolute top-4 right-4">
                <Button
                  onClick={stopScanning}
                  variant="secondary"
                  size="sm"
                  className="bg-white bg-opacity-90"
                >
                  <CameraOff size={16} className="mr-2" />
                  Stop
                </Button>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
      </Card>

      <Card>
        <div className="text-center mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Manual Entry</h4>
          <p className="text-sm text-gray-600">
            Can't scan? Enter the barcode number manually
          </p>
        </div>

        <form onSubmit={handleManualInput} className="space-y-4">
          <input
            type="text"
            name="barcode"
            placeholder="Enter barcode number"
            className="input-field"
            pattern="[0-9]+"
            title="Barcode should contain only numbers"
          />
          <Button type="submit" className="w-full">
            <Zap size={16} className="mr-2" />
            Submit Barcode
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default BarcodeScanner;
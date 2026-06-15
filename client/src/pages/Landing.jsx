import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scan, Shield, Award, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Landing = () => {
  const features = [
    {
      icon: Scan,
      title: 'OCR Scan',
      description: 'Upload product images to extract nutrition data automatically'
    },
    {
      icon: Shield,
      title: 'FSSAI Verify',
      description: 'Check if your product license is valid and registered'
    },
    {
      icon: Award,
      title: 'Health Grade',
      description: 'Get scores from 4 international grading systems'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-primary-300 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-primary-400 rounded-full"></div>
        </div>

        <div className="relative max-w-md mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8">
              <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Scan size={32} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                FoodTrust
                <span className="text-primary-600"> AI</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Scan. Verify. Trust.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="backdrop-blur-sm bg-white/80 border-white/20 shadow-xl mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Make informed food choices with AI-powered analysis of nutrition labels and compliance verification.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link to="/register">
                <Button className="w-full text-lg py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200">
                  Get Started Free
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-md mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600">
            Three simple steps to smarter food choices
          </p>
        </motion.div>

        <div className="space-y-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card hover className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Icon size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Already have an account?
          </p>
          <Link to="/login">
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
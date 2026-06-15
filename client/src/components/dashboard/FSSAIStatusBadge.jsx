import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';

const FSSAIStatusBadge = ({ status, fssaiNumber }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'valid':
        return {
          icon: CheckCircle,
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          title: 'FSSAI Verified',
          message: 'This product license is valid and registered',
          emoji: '✅'
        };
      case 'invalid':
        return {
          icon: XCircle,
          color: 'text-danger',
          bgColor: 'bg-danger/10',
          borderColor: 'border-danger/20',
          title: 'FSSAI Invalid',
          message: 'This license number could not be verified',
          emoji: '❌'
        };
      default:
        return {
          icon: AlertCircle,
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          title: 'Verification Pending',
          message: 'Could not verify this license at this time',
          emoji: '⚠️'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${config.bgColor}`}>
          <Icon size={24} className={config.color} />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-lg">{config.emoji}</span>
            <h3 className={`font-semibold ${config.color}`}>
              {config.title}
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            {config.message}
          </p>
          {fssaiNumber && (
            <p className="text-xs font-mono bg-white bg-opacity-50 px-2 py-1 rounded">
              FSSAI: {fssaiNumber}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FSSAIStatusBadge;
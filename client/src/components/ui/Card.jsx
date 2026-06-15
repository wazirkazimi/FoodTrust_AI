import React from 'react';

const Card = ({
  children,
  className = '',
  padding = 'normal',
  hover = false,
  ...props
}) => {
  const baseClasses = 'bg-white rounded-2xl shadow-lg transition-all duration-200';

  const paddings = {
    none: '',
    small: 'p-4',
    normal: 'p-6',
    large: 'p-8'
  };

  const hoverClass = hover ? 'hover:shadow-purple hover:-translate-y-1' : '';

  const classes = `${baseClasses} ${paddings[padding]} ${hoverClass} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
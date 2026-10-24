import React from 'react';
import Badge from './Badge';
import Button from './Button';

/**
 * Reusable Card Component with Composition
 */
const Card = ({
  title,
  subtitle,
  badgeText,
  badgeType = 'info',
  imageUrl,
  children,
  actionText = 'Learn More',
  onActionClick
}) => {
  return (
    <div className="card">
      {imageUrl && (
        <div className="card-image-wrapper">
          <img src={imageUrl} alt={title} className="card-image" />
        </div>
      )}
      <div className="card-header">
        <div>
          <h3 className="card-title">{title}</h3>
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
        {badgeText && <Badge text={badgeText} type={badgeType} />}
      </div>
      <div className="card-body">
        {children}
      </div>
      <div className="card-footer">
        <Button variant="primary" size="sm" onClick={onActionClick}>
          {actionText}
        </Button>
        <Button variant="outline" size="sm" onClick={() => alert(`Details for ${title}`)}>
          Quick view
        </Button>
      </div>
    </div>
  );
};

export default Card;
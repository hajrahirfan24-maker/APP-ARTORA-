import React, { useState } from 'react';
import { renderDefaultFallbackImage } from '../data/artVisuals';

interface ArtImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  fallbackTitle?: string;
}

export const ArtImage: React.FC<ArtImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);

  // Sync if prop changes
  React.useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(renderDefaultFallbackImage(fallbackTitle || alt || 'ARTORA Original'));
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
      {...props}
    />
  );
};

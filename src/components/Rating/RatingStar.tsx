// StarRating.tsx
import React, {FC} from 'react';
import Star from './Star';
import HalfStar from './HalfStar';
import InActiveStar from './InActiveStar';

interface StarRatingProps {
  averageRating: number;
}

const StarRating: FC<StarRatingProps> = ({averageRating}) => {
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 !== 0;
  const remainingStars = hasHalfStar ? 5 - fullStars - 1 : 5 - fullStars;

  return (
    <React.Fragment>
      {[...Array(fullStars)].map((_, index) => (
        <Star key={index} />
      ))}
      {hasHalfStar && <HalfStar />}
      {[...Array(remainingStars)].map((_, index) => (
        <InActiveStar key={index} />
      ))}
    </React.Fragment>
  );
};

export default StarRating;

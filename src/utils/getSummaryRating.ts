import {RatingT} from '../models/Model';

export const getRatingSummary = (ratings: RatingT[]) => {
  const totalRatings = ratings.length;

  const ratingCounts = Array.from({length: 5}, (_, i) => {
    const starRating = i + 1;
    const count = ratings.reduce(
      (acc, rating) => acc + (rating.rating === starRating ? 1 : 0), // Assuming 'rating' is the property to compare
      0,
    );
    return {star: `${starRating} Star`, count}; // Use backticks for template literals
  });

  const ratingSummary = ratingCounts.map(({star, count}) => {
    const progress = parseInt(((count / totalRatings) * 100).toFixed(0));
    return {star, progress, totalRating: count};
  });

  return ratingSummary.reverse();
};

import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RatingSummary, RatingT } from '../../models/Model';
import { calculateAverage } from '../../utils/calculateAverage';
import { getRatingSummary } from '../../utils/getSummaryRating';
import { PercentageBar } from './PercentageBar';
import StarRating from './RatingStar';

interface Props {
  totalRating: RatingT[];
}

export const AverageRating: FC<Props> = ({totalRating}) => {
  const [averageRating, setAverageRating] = useState(0);
  const [ratingSummary, setRatingSummary] = useState<RatingSummary[]>([]);

  useEffect(() => {
    if (!totalRating.length) return;
    const getAverageRating = calculateAverage(totalRating, 'rating');
    setAverageRating(getAverageRating);

    const summary = getRatingSummary(totalRating);
    setRatingSummary(summary);
  }, [totalRating]);

  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <Text style={styles.title}>Average Reviews</Text>
        <View style={styles.totalWrap}>
          <StarRating averageRating={averageRating} />
          <Text style={styles.ratingText}>
            {averageRating.toFixed(2)} out of 5
          </Text>
        </View>
        <Text style={styles.amountText}>{totalRating.length} ratings</Text>
        <View style={{marginTop: 40}}>
          {ratingSummary.map((rating, index) => (
            <PercentageBar
              key={index}
              starText={rating.star}
              totalRating={rating.totalRating}
              percentage={rating.progress}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewContainer: {
    backgroundColor: '#FFFFFF',
    minWidth: '90%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#323357',
    textAlign: 'center',
  },
  totalWrap: {
    marginTop: 20,
    marginBottom: 5,
    backgroundColor: '#F5F8FF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  ratingText: {
    marginLeft: 10,
    fontWeight: '600',
  },
  amountText: {
    fontSize: 16,
    color: '#595B71',
    textAlign: 'center',
  },
});

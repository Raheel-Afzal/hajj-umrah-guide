import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
  starText: string;
  percentage: number;
  totalRating: number;
}
export const PercentageBar: FC<Props> = ({
  starText,
  percentage,
  totalRating,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Text style={styles.progressText}>{starText}</Text>
      <Text style={styles.totalRating}>({totalRating})</Text>
      <View style={styles.progressMiddle}>
        <View style={styles.progressWrap}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${percentage}%`,
              },
            ]}
          />
        </View>
      </View>
      <Text style={styles.progressPercentText}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  progressText: {
    width: 50,
    fontSize: 14,
    color: '#2A5BDA',
  },
  progressPercentText: {width: 40, fontSize: 14, color: '#323357'},
  progressMiddle: {
    height: 15,
    flex: 1,
    marginHorizontal: 10,
  },
  progressWrap: {
    backgroundColor: '#F5F8FF',
    borderRadius: 18,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 2,
  },
  progressBar: {
    flex: 1,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#ffcc48',
    shadowOpacity: 1.0,
    shadowRadius: 4,
    backgroundColor: '#FFCC48',
    borderRadius: 18,
    minWidth: 5,
  },
  totalRating: {
    width: 30,
  },
});

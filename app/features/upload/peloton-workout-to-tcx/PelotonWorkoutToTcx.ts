import { create } from 'xmlbuilder2';
import { PelotonPerformaceData } from '../../external-api/peloton/peloton-performance-data/PelotonPerformaceData';

export function PelotonWorkoutToTcx(
  workoutJson: PelotonPerformaceData,
  startTime: Date
): string {
  const root = create({ encoding: 'UTF-8' })
    .ele('TrainingCenterDatabase', {
      'xmlns:ns2': 'http://www.garmin.com/xmlschemas/UserProfile/v2',
      'xmlns:ns3': 'http://www.garmin.com/xmlschemas/ActivityExtension/v2',
      'xmlns:ns5': 'http://www.garmin.com/xmlschemas/ActivityGoals/v1',
      'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      // xmlns: 'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2',
      'xsi:schemaLocation':
        'http://www.garmin.com/xmlschemas/TrainingCenterDatabase/v2 http://www.garmin.com/xmlschemas/TrainingCenterDatabasev2.xsd',
    })
    .ele('Activities')
    .ele('Activity', { Sport: 'Biking' })
    .ele('Id')
    .txt(startTime.toISOString())
    .up()
    .ele('Lap', { StartTime: startTime.toISOString() })
    .ele('TotalTimeSeconds')
    .txt(workoutJson.duration.toString())
    .up()
    .ele('DistanceMeters')
    .txt(
      Math.round(
        (workoutJson.summaries.find((summary) => summary.slug === 'distance')
          ?.value || 0) * 1000
      ).toString()
    )
    .up()
    .ele('MaximumSpeed')
    .txt(
      (
        Math.round(
          ((workoutJson.metrics.find((segment) => segment.slug === 'speed')
            ?.max_value || 0) /
            3.6) *
            10
        ) / 10
      ).toString()
    )
    .up()
    .ele('AverageHeartRateBpm')
    .ele('Value')
    .txt(
      (
        workoutJson.metrics.find((segment) => segment.slug === 'heart_rate')
          ?.average_value || 0
      ).toString()
    )
    .up()
    .up()
    .ele('MaximumHeartRateBpm')
    .ele('Value')
    .txt(
      (
        workoutJson.metrics.find((segment) => segment.slug === 'heart_rate')
          ?.max_value || 0
      ).toString()
    )
    .up()
    .up()
    .ele('Calories')
    .txt(
      (
        workoutJson.summaries.find((summary) => summary.slug === 'calories')
          ?.value || 0
      ).toString()
    )
    .up()
    .ele('Cadence')
    .txt(
      (
        workoutJson.metrics.find((segment) => segment.slug === 'cadence')
          ?.average_value || 0
      ).toString()
    )
    .up()
    .ele('Intensity')
    .txt('Active')
    .up()
    .ele('TriggerMethod')
    .txt('Manual')
    .up()
    .ele('Extensions')
    .ele('TPX', {
      xmlns: 'http://www.garmin.com/xmlschemas/ActivityExtension/v2',
    })
    .ele('TotalPower')
    .txt(
      Math.round(
        (workoutJson.summaries.find(
          (segment) => segment.slug === 'total_output'
        )?.value || 0) * 1000
      ).toString()
    )
    .up()
    .ele('AverageCadence')
    .txt('81')
    .up()
    .ele('MaximumCadence')
    .txt('126')
    .up()
    .ele('AverageResistance')
    .txt('40')
    .up()
    .ele('MaximumResistance')
    .txt('55')
    .up()
    .ele('AverageWatts')
    .txt('107')
    .up()
    .ele('MaximumWatts')
    .txt('228')
    .up()
    .up()
    .up()
    .ele('Track');

  let totalDistanceMeters = 0;
  workoutJson.seconds_since_pedaling_start.forEach((value, index) => {
    // for (const i of workoutJson.seconds_since_pedaling_start) {
    const speedMetersPerSecond =
      Math.round(
        ((workoutJson.metrics.find((metric) => metric.slug === 'speed')?.values[
          index
        ] || 0) /
          3.6) *
          10
      ) / 10;
    totalDistanceMeters += speedMetersPerSecond;
    root
      .ele('TrackPoint')
      .ele('Time')
      .txt(new Date(startTime.getTime() + value * 1000).toISOString())
      .up()
      .ele('DistanceMeters')
      .txt((Math.round(totalDistanceMeters * 10) / 10).toString())
      .up()
      .ele('HeartRateBpm')
      .ele('Value')
      .txt(
        (
          workoutJson.metrics.find((metric) => metric.slug === 'heart rate')
            ?.values[index] || 0
        ).toString()
      )
      .up()
      .up()
      .ele('Cadence')
      .txt(
        (
          workoutJson.metrics.find((metric) => metric.slug === 'cadence')
            ?.values[index] || 0
        ).toString()
      )
      .up()
      .ele('Extensions')
      .ele('TPX', {
        xmlns: 'http://www.garmin.com/xmlschemas/ActivityExtension/v2',
      })
      .ele('Speed')
      .txt((Math.round(speedMetersPerSecond * 10) / 10).toString())
      .up()
      .ele('Watts')
      .txt(
        (
          workoutJson.metrics.find((metric) => metric.slug === 'output')
            ?.values[index] || 0
        ).toString()
      )
      .up()
      .ele('Resistance')
      .txt(
        (
          workoutJson.metrics.find((metric) => metric.slug === 'resistance')
            ?.values[index] || 0
        ).toString()
      )
      .up()
      .up()
      .up()
      .up();
  });

  const xml = root.end({ prettyPrint: true });

  // console.log('xml', xml);

  return xml;
}

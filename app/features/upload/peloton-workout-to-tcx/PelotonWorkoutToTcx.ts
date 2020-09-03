import { create } from 'xmlbuilder2';
import { PelotonPerformaceData } from '../../external-api/peloton/peloton-performance-data/PelotonPerformaceData';

export function PelotonWorkoutToTcx(
  workoutJson: PelotonPerformaceData
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
    .txt('2020-07-30T17:25:10Z')
    .up()
    .ele('Lap', { StartTime: '2020-07-30T17:25:10Z' })
    .ele('TotalTimeSeconds')
    .txt(workoutJson.duration.toString())
    .up()
    .ele('DistanceMeters')
    .txt(
      (
        (workoutJson.summaries.find((summary) => summary.slug === 'distance')
          ?.value || 0) * 1000
      ).toString()
    )
    .up()
    .ele('MaximumSpeed')
    .txt(
      (
        workoutJson.metrics.find((segment) => segment.slug === 'speed')
          ?.max_value || 0
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
    .(
      (
        (workoutJson.summaries.find((segment) => segment.slug === 'total_output')
          ?.value || 0) * 1000
      ).toString()
    )
    .up()
    .ele('AverageCadence')
    .txt('84.94')
    .up()
    .ele('MaximumCadence')
    .txt('164')
    .up()
    .ele('AverageResistance')
    .txt('40.22')
    .up()
    .ele('MaximumResistance')
    .txt('48.83')
    .up()
    .ele('AverageWatts')
    .txt('125.61')
    .up()
    .ele('MaximumWatts')
    .txt('534.5')
    .up()
    .up()
    .up()
    .ele('Track');

  for (const i of workoutJson.seconds_since_pedaling_start) {
    root
      .ele('TrackPoint')
      .ele('Time')
      .txt('2020-07-30T17:25:11Z')
      .up()
      .ele('DistanceMeters')
      .txt('0')
      .up()
      .ele('HeartRateBpm')
      .ele('Value')
      .txt('0')
      .up()
      .up()
      .ele('Cadence')
      .txt('68')
      .up()
      .ele('Extensions')
      .ele('TPX', {
        xmlns: 'http://www.garmin.com/xmlschemas/ActivityExtension/v2',
      })
      .ele('Speed')
      .txt('4.82')
      .up()
      .ele('Watts')
      .txt('40')
      .up()
      .ele('Resistance')
      .txt('40.1')
      .up()
      .up()
      .up()
      .up();
  }

  const xml = root.end({ prettyPrint: true });

  console.log(xml);

  return xml;
}

import { create } from 'xmlbuilder2';

export function PelotonWorkoutToTcx(workoutJson: any): string {
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
    .txt('1800')
    .up()
    .ele('DistanceMeters')
    .txt('13952.98')
    .up()
    .ele('MaximumSpeed')
    .txt('13.74')
    .up()
    .ele('AverageHeartRateBpm')
    .ele('Value')
    .txt('180')
    .up()
    .up()
    .ele('MaximumHeartRateBpm')
    .ele('Value')
    .up()
    .up()
    .ele('Calories')
    .txt('537')
    .up()
    .ele('Cadence')
    .txt('84')
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
    .txt('225710.1')
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

  for (const i of [1, 2, 3, 4]) {
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

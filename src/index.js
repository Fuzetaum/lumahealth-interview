if (process.argv.length <= 2) {
  console.log("Usage: <patients file> <number of patients>");
  console.log(`Arguments list: [${process.argv.slice(2)}]`);
  process.exit(-1);
}

const { readPatientsData } = require('./readFileData');
const { filterPatientsByDistance } = require('./distanceFilter');
const { getTop10PatientsByRank } = require('./ranker');

const getBestPatientOptions = async (inputFile, facilityLocation) => {
  const patientList = await readPatientsData(inputFile, facilityLocation);
  const patientTaggedList = filterPatientsByDistance(facilityLocation,
    patientList.reduce((acc, patient) => ({
      ...acc,
      [patient.id]: {
        name: patient.name,
        location: patient.location,
        age: patient.age,
        acceptedOffers: patient.acceptedOffers,
        canceledOffers: patient.canceledOffers,
        averageReplyTime: patient.averageReplyTime,
      },
    }), {})
  );
  const top10Patients = getTop10PatientsByRank(patientTaggedList);
  console.log(top10Patients);
}

const location = {
  latitude: 35.2083,
  longitude: -28.7860,
};
getBestPatientOptions(process.argv[2], location);
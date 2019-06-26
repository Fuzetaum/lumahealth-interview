if (process.argv.length <= 2) {
  console.log("Usage: <patients file> <number of patients>");
  console.log(`Arguments list: [${process.argv.slice(2)}]`);
  process.exit(-1);
}

const readFileData = require('./readFileData');

const getBestPatientOptions = async (inputFile) => {
  const patientList = await readFileData.readPatientsData(inputFile);
  const patientTaggedList = patientList.reduce((acc, patient) => ({
    ...acc,
    [patient.id]: {
      name: patient.name,
      location: patient.location,
      age: patient.age,
      acceptedOffers: patient.acceptedOffers,
      canceledOffers: patient.canceledOffers,
      averageReplyTime: patient.averageReplyTime,
    },
  }), {});
  console.log(patientTaggedList);
}

getBestPatientOptions(process.argv[2]);
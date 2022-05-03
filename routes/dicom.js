var express = require('express');
var router = express.Router();
var { storeScu } = require('dicom-dimse-native');

const options = {
  source: {
    aet: "DIMSE",
    ip: "127.0.0.1",
    port: 9999
  },
  target: {
    aet: "DIMSE",
    ip: "127.0.0.1",
    port: 4242
  },
  netTransferPropose: "1.2.840.10008.1.2.4.80", // proposed network transfer syntax (for outgoing associations - additional to default ts)
  sourcePath: "./dicom", // This currently uploads all dicoms in this directory. I cannot find a way to set only one dicom to upload.
  verbose: true
};

/* Send Dicom image */
router.get('/', function (req, res, next) {
  storeScu(options, (result) => {
    console.log(JSON.parse(result));
  });
  res.status(200).send("Passed");
});

module.exports = router;

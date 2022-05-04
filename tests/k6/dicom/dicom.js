import http from 'k6/http';

function getconfig() {
  try {
    return JSON.parse(open(__ENV.CONFIG));
  }
  catch (err) {
    throw new Error("Please set a config file using -e CONFIG=config/{appropriate-config-file}");
  }
}

let config = getconfig();

export const options = {
  discardResponseBodies: true,
  scenarios: {
    ct: {
      executor: 'per-vu-iterations',
      exec: 'ct',
      vus: config.ct.vus,
      iterations: config.ct.iterations,
      startTime: config.ct.startTime,
      maxDuration: config.ct.maxDuration,
    },
    mri: {
      executor: 'per-vu-iterations',
      exec: 'mri',
      vus: config.mri.vus,
      iterations: config.mri.iterations,
      startTime: config.mri.startTime,
      maxDuration: config.mri.maxDuration,
    },
    ultrasound: {
      executor: 'per-vu-iterations',
      exec: 'ultrasound',
      vus: config.ultrasound.vus,
      iterations: config.ultrasound.iterations,
      startTime: config.ultrasound.startTime,
      maxDuration: config.ultrasound.maxDuration,
    },
    xray: {
      executor: 'per-vu-iterations',
      exec: 'xray',
      vus: config.xray.vus,
      iterations: config.xray.iterations,
      startTime: config.xray.startTime,
      maxDuration: config.xray.maxDuration,
    },
  },
};

export function ct() {
  http.get('http://localhost:3000/dicom/ct', { tags: { my_custom_tag: 'ct' } });
}

export function mri() {
  http.get('http://localhost:3000/dicom/mri', { tags: { my_custom_tag: 'mri' } });
}

export function ultrasound() {
  http.get('http://localhost:3000/dicom/ultrasound', { tags: { my_custom_tag: 'ultrasound' } });
}

export function xray() {
  http.get('http://localhost:3000/dicom/xray', { tags: { my_custom_tag: 'xray' } });
}
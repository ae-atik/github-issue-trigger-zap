
const authentication = require('./authentication');
const newIssueTrigger = require('./triggers/new_issue');

const includeBearerToken = (request, z, bundle) => {
  if (bundle.authData.access_token) {
    request.headers.Authorization = `Bearer ${bundle.authData.access_token}`;
  }
  return request;
};

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication,

  beforeRequest: [includeBearerToken],

  triggers: {
    [newIssueTrigger.key]: newIssueTrigger,
  },

};

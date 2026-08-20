const { db, FieldValue } = require('../config/firebase');
const { sendNewUserWebhook } = require('./discordWebhookService');
const { createUserRegistrationService } = require('./userRegistrationCore');

const registerUserProfile = createUserRegistrationService({
  db,
  FieldValue,
  sendNewUserWebhook,
});

module.exports = {
  registerUserProfile,
};

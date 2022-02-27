import { Meteor } from "meteor/meteor";


Meteor.startup(function () {
  let emailObject = {};

  emailObject.smtp = {
    username: Meteor.settings.private.EmailSetup.username,
    password: Meteor.settings.private.EmailSetup.password,
    server: Meteor.settings.private.EmailSetup.smtpServer,
    port: Meteor.settings.private.EmailSetup.smtpPort,
  };

  process.env.MAIL_URL =
    "smtp://" +
    encodeURIComponent(emailObject.smtp.username) +
    ":" +
    encodeURIComponent(emailObject.smtp.password) +
    "@" +
    encodeURIComponent(emailObject.smtp.server) +
    ":" +
    emailObject.smtp.port;
});

const StorxMailer = require('storx-service-mailer');

module.exports = () => {
  const mailInstance = () => {
    const mailConfig = {
      host: process.env.INXT_MAILER_HOST,
      port: process.env.INXT_MAILER_PORT,
      secure: process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production',
      auth: {
        user: process.env.INXT_MAILER_USERNAME,
        pass: process.env.INXT_MAILER_PASSWORD
      },
      from: 'support@storx.tech'
    };

    if (process.env.SENDGRID_API_KEY) {
      mailConfig.sendgrid = {
        api_key: process.env.SENDGRID_API_KEY
      };
    }
    return new StorxMailer(mailConfig);
  };

  const sendInvitationMail = (emailTo, user) => {
    const mailer = mailInstance();

    return new Promise((resolve, reject) => {
      mailer.dispatchSendGrid(emailTo,
        'referral',
        {
          template: 'referral',
          go: { in: 'here' },
          senderUser: user.name,
          url: `https://storx.io/new?ref=${user.uuid}`
        },
        (err) => {
          if (!err) {
            resolve();
          } else {
            reject(err);
          }
        });
    });
  };

  const sendEmailTeamsMember = (name, member, cryptedToken, teamName) => {
    const mailer = mailInstance();
    return new Promise((resolve, reject) => {
      mailer.dispatchSendGrid(member,
        'join-team',
        {
          template: 'join-team',
          go: { in: 'here' },
          memberName: name,
          teamName,
          urlAcceptInvitation: `${process.env.HOST_DRIVE_WEB}/teams/join/${cryptedToken}`

        }, (err) => {
          if (!err) {
            resolve(`Mail team's invitation send to ${member}!`);
          } else {
            reject(Error(`Error sending mail team's invitation to ${member}`));
          }
        });
    });
  };

  return {
    Name: 'Mail',
    sendInvitationMail,
    sendEmailTeamsMember

  };
};

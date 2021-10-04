// import Mailchimp from 'mailchimp-api-v3';
//
// import keys from './keys';
//
// const { key, listKey } = keys.mailchimp;
// const mailchimp = new Mailchimp(key);
//
// exports.subscribeToNewsletter = email => {
//   return new Promise((resolve, reject) => {
//     mailchimp
//       .post(`lists/${listKey}/members`, {
//         email_address: email,
//         status: 'subscribed'
//       })
//       .then(result => {
//         resolve(result);
//       })
//       .catch(error => {
//         reject(error);
//       });
//   });
// };

const { processContacts } = require('./vcf');

let contacts = [];
(async () => {
    contacts = await processContacts();
    console.log('inside', contacts)
})();

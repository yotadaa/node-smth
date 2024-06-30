const { processContacts } = require('./vcf');

let contacts = []
async function main() {
    contacts = await processContacts();
    console.log('inside', contacts)
}

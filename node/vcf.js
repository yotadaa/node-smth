const fs = require('fs');
const vCardParser = require('vcard-parser');

// Function to read and parse the VCF file
async function readVCF(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const parsedContacts = vCardParser.parse(data);
        // console.log("Parsed Contacts:", JSON.stringify(parsedContacts, null, 2));
        // console.log(parsedContacts) // Log parsed contacts
        return parsedContacts;
    } catch (error) {
        console.error("Error reading the VCF file:", error);
    }
}

// Function to extract phone numbers from the parsed contacts
function extractPhoneNumbers(contacts) {
    return contacts.tel.map(o => o.value);
}

// Example usage
const filePath = './test_1_70 (1).vcf';

function processContacts() {
    readVCF(filePath).then(contacts => {
        const phoneNumbers = extractPhoneNumbers(contacts);
        console.log(phoneNumbers);
    }).catch(error => {
        console.error("Error:", error);
    });
}

module.exports = { processContacts };

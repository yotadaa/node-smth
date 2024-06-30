const fs = require('fs');
const vCardParser = require('vcard-parser');

// Function to read and parse the VCF file
async function readVCF(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const parsedContacts = vCardParser.parse(data);
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

async function processContacts() {
    try {
        const contacts = await readVCF(filePath);
        const phoneNumbers = extractPhoneNumbers(contacts);
        return phoneNumbers;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

module.exports = { processContacts };

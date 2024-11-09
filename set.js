const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUd3ZWFhL1NBVWNtS2hFRXdjaVY4bnZTSlk3MGZjOWFxWitpZHNTWFQwcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFhzTFl6VDlFa2FVOGVyUTF6YnRlUytXQ0JtS25lVXlrYmxtblE1L0RrQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVTk5NeDJQZnZheENCNVFWTFd0cmFNNkREQ0t5WmpLeHk5dmVjWlR3TjA4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvU3pKL2ZCVUxxVW1lcStUazcybFZhTVdOaWoxZTN6TWJ0SjZUZVYvT1IwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFFWnlZTEtnakdsU0hsZEd0ZDVZbnhEei90M3FWWDQ2MXN1N2o2RS9YM009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhMWUlteTJkVlJHcGZBaGxTN0M0WlV4RE8vaEtCeVc5NjZseTZ4MW1wMDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUtjVi9pR2haNGt6c3NXWkVacitCekNBZjQxSXVYOVRqT1pOMXBJOUZIWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaDd0NUl1TUlDcGpaL3pYSldiVlNuQnIvMVFrVFZuR01ScXRvODQrYXNpMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNCVFBuZ3FsNVg3UXIvVEFycUZGbVl6U1pNc21nSVQ3NE52SWhQTGswdlNRN1BEV2hic2lXWnBneklTQmpVWjlQZk1LcHF4VkN5a2tnbHF5c3djR2dBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgyLCJhZHZTZWNyZXRLZXkiOiIyU3pGSlJrYXIwSUo1emNYdzlaTjc3YUxmSEJLemlRRFlrL0ZPRmk1M2w4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJDS2JqTmZydFF1eWQxTGQxU2wyMjJ3IiwicGhvbmVJZCI6ImE1MThiY2IzLWY0OWItNDA3MS05MGQ2LTgyYzE5Mzg0MmM5ZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4SzRnVXR4NHlLWnAzaDFua3hnc01YMGdMVjA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRkNHdFJKTExRVzlndDVlalB5RGFGTlZQTytZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlpFOE1UVkRLIiwibWUiOnsiaWQiOiIyNjM3MTQ3NTc4NTc6NDFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01uMW5xRUZFTEtadnJrR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im1jL0tqNzBGanlJcnBsdkVUeEswQStrc3pxLzR4NmQ4MC80ajRmSGVLMkE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkpPNHoya0VlY1pJKzRBbXNtU1NlRmZQVHh4cUJCLzNOSFVmeGkxK2tUZmUvN1dmQ0VaRXBFbHBRdGlFYUp2blJNS3dxMmowZlhKZ0JXeDZQLzA1cUJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJucG1yVDRQMC8rTFpML2U1emwrRVU5QWEvSkhpQUxSK3p5dFM5di9rYlgwVXFlM1hCYkVwMlI2V0pmZUdWRHlHOHJ0NURVOWkrMHV6VjlnaFlpRDZpUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNDc1Nzg1Nzo0MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJablB5bys5Qlk4aUs2WmJ4RThTdEFQcExNNnYrTWVuZk5QK0krSHgzaXRnIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMxMTY5NDcxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUtUQyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Malvin King",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263......",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Queen_Miku-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://c.top4top.io/p_3235wgt8w1.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

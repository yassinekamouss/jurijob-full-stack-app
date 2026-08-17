const fs = require('fs');

function updateLangFile(filePath, exactExperienceObj) {
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);
    
    if (json.recruiter && json.recruiter.profiles) {
        json.recruiter.profiles.exact_experience = exactExperienceObj;
    }
    
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
}

const frExperience = {
    "no_experience": "Sans expérience",
    "years_one": "{{count}} an",
    "years_other": "{{count}} ans",
    "months_one": "{{count}} mois",
    "months_other": "{{count}} mois",
    "and": " et "
};

const enExperience = {
    "no_experience": "No experience",
    "years_one": "{{count}} year",
    "years_other": "{{count}} years",
    "months_one": "{{count}} month",
    "months_other": "{{count}} months",
    "and": " and "
};

updateLangFile('lang/fr.json', frExperience);
updateLangFile('lang/en.json', enExperience);
console.log("Language files updated.");

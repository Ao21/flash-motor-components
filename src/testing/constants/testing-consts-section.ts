export const DEFAULT_TEST_SECTION = [{
    "type": "default",
    "fields": [{
        "key": "firstName",
        "label": "First Name",
        "type": "text",
        "required": true,
        "placeholder": "John",
        "order": 0
    }, {
        "key": "lastName",
        "label": "Last Name",
        "placeholder": "Snow",
        "type": "text",
        "required": true,
        "order": 1
    }, {
        "key": "dateOfBirth",
        "label": "Date Of Birth",
        "type": "date",
        "required": true,
        "disabled": false,
        "order": 2,
        "validators": ["validDateValidate", "validOverEighteenValidate"]
    }, {
        "key": "phoneNumber",
        "label": "Phone Number",
        "type": "tel",
        "required": true,
        "disabled": true,
        "order": 2,
        "validators": ["validPhoneNumberValidate"]
    }, {
        "key": "typeOfEmployment",
        "label": "Type of Employment",
        "type": "dropdown",
        "options": ["Employed", "Household Duties", "Retired", "Self Employed", "Unemployed"],
        "required": true,
        "order": 2,
        "validators": []
    }, {
        "key": "occupation",
        "label": "Occupation",
        "type": "autocomplete",
        "placeholder": "Select an Occupation",
        "serviceUrl": "motor/occupation/",
        "autoCompleteType": "search",
        "options": [{
            "id": "Employed",
            "text": "Employed"
        }, {
            "id": "Household Duties",
            "text": "Household Duties"
        }, {
            "id": "Retired",
            "text": "Retired"
        }, {
            "id": "Self Employed",
            "text": "Self Employed"
        }, {
            "id": "Unemployed",
            "text": "Unemployed"
        }, {
            "id": "Very Employed",
            "text": "Very Employed"
        }, {
            "id": "Very Household Duties",
            "text": "Very Household Duties"
        }, {
            "id": "Very Retired",
            "text": "Very Retired"
        }, {
            "id": "Very Self Employed",
            "text": "Very Self Employed"
        }],
        "required": true,
        "disabled": false,
        "order": 2,
        "validators": []
    }, {
        "key": "business",
        "label": "Type of Business",
        "type": "autocomplete",
        "placeholder": "Select an Area of Business",
        "trigger": {
            "key": "occupation",
            "name": "occupation"
        },
        "serviceUrl": "motor/occupation/",
        "autoCompleteType": "search",
        "options": [{
            "id": "Employed",
            "text": "Employed"
        }, {
            "id": "Household Duties",
            "text": "Household Duties"
        }, {
            "id": "Retired",
            "text": "Retired"
        }, {
            "id": "Self Employed",
            "text": "Self Employed"
        }, {
            "id": "Unemployed",
            "text": "Unemployed"
        }, {
            "id": "Very Employed",
            "text": "Very Employed"
        }, {
            "id": "Very Household Duties",
            "text": "Very Household Duties"
        }, {
            "id": "Very Retired",
            "text": "Very Retired"
        }, {
            "id": "Very Self Employed",
            "text": "Very Self Employed"
        }],
        "required": true,
        "order": 2,
        "validators": []
    }, {
        "key": "livedOutsideIreland",
        "label": "Have you lived outside the Republic of Ireland or the UK in the last 12 months?",
        "type": "radio",
        "options": ["Yes", "No"],
        "required": true,
        "order": 2,
        "validators": []
    }, {
        "key": "amountOfDrivers",
        "label": "How many drivers?",
        "type": "slider",
        "required": true,
        "disabled": false,
        "order": 10,
        "value": 2,
        "min": 0,
        "max": 7
    }, {
        "key": "occupation3",
        "label": "Occupation",
        "type": "autocomplete",
        "placeholder": "Select an Occupation",
        "serviceUrl": "motor/occupation/",
        "autoCompleteType": "search",
        "options": [{
            "id": "Employed",
            "text": "Employed"
        }, {
            "id": "Household Duties",
            "text": "Household Duties"
        }, {
            "id": "Retired",
            "text": "Retired"
        }, {
            "id": "Self Employed",
            "text": "Self Employed"
        }, {
            "id": "Unemployed",
            "text": "Unemployed"
        }, {
            "id": "Very Employed",
            "text": "Very Employed"
        }, {
            "id": "Very Household Duties",
            "text": "Very Household Duties"
        }, {
            "id": "Very Retired",
            "text": "Very Retired"
        }, {
            "id": "Very Self Employed",
            "text": "Very Self Employed"
        }],
        "required": true,
        "disabled": false,
        "order": 99992,
        "validators": []
    }],
    "questions": [{
        "key": "firstName",
        "label": "First Name",
        "order": 0,
        "required": true,
        "validators": [],
        "controlType": "textbox",
        "timeline": true,
        "disabled": false,
        "rows": null,
        "cols": null,
        "wrap": null,
        "type": "text",
        "autocapitalize": "sentences",
        "autocorrect": "",
        "autocomplete": "",
        "placeholder": "John"
    }, {
        "key": "lastName",
        "label": "Last Name",
        "order": 1,
        "required": true,
        "validators": [],
        "controlType": "textbox",
        "timeline": true,
        "disabled": false,
        "rows": null,
        "cols": null,
        "wrap": null,
        "type": "text",
        "autocapitalize": "sentences",
        "autocorrect": "",
        "autocomplete": "",
        "placeholder": "Snow"
    }, {
        "key": "dateOfBirth",
        "label": "Date Of Birth",
        "order": 2,
        "required": true,
        "validators": [null, null],
        "controlType": "date",
        "timeline": true,
        "disabled": false
    }, {
        "key": "phoneNumber",
        "label": "Phone Number",
        "order": 2,
        "required": true,
        "validators": [null],
        "controlType": "textbox",
        "timeline": true,
        "disabled": true,
        "rows": null,
        "cols": null,
        "wrap": null,
        "type": "tel",
        "autocapitalize": "sentences",
        "autocorrect": "",
        "autocomplete": "",
        "placeholder": ""
    }, {
        "key": "typeOfEmployment",
        "label": "Type of Employment",
        "order": 2,
        "required": true,
        "validators": [],
        "controlType": "dropdown",
        "timeline": true,
        "disabled": false,
        "options": ["Employed", "Household Duties", "Retired", "Self Employed", "Unemployed"],
        "placeholder": "Select Here"
    }, {
        "key": "occupation",
        "label": "Occupation",
        "order": 2,
        "required": true,
        "validators": [],
        "controlType": "autocomplete",
        "timeline": true,
        "disabled": false,
        "options": [{
            "id": "Employed",
            "text": "Employed"
        }, {
            "id": "Household Duties",
            "text": "Household Duties"
        }, {
            "id": "Retired",
            "text": "Retired"
        }, {
            "id": "Self Employed",
            "text": "Self Employed"
        }, {
            "id": "Unemployed",
            "text": "Unemployed"
        }, {
            "id": "Very Employed",
            "text": "Very Employed"
        }, {
            "id": "Very Household Duties",
            "text": "Very Household Duties"
        }, {
            "id": "Very Retired",
            "text": "Very Retired"
        }, {
            "id": "Very Self Employed",
            "text": "Very Self Employed"
        }],
        "type": "search",
        "serviceUrl": "motor/occupation/",
        "placeholder": "Select an Occupation"
    }, {
        "key": "business",
        "label": "Type of Business",
        "order": 2,
        "required": true,
        "validators": [],
        "controlType": "autocomplete",
        "timeline": true,
        "disabled": false,
        "trigger": {
            "key": "occupation",
            "name": "occupation"
        },
        "options": [{
            "id": "Employed",
            "text": "Employed"
        }, {
            "id": "Household Duties",
            "text": "Household Duties"
        }, {
            "id": "Retired",
            "text": "Retired"
        }, {
            "id": "Self Employed",
            "text": "Self Employed"
        }, {
            "id": "Unemployed",
            "text": "Unemployed"
        }, {
            "id": "Very Employed",
            "text": "Very Employed"
        }, {
            "id": "Very Household Duties",
            "text": "Very Household Duties"
        }, {
            "id": "Very Retired",
            "text": "Very Retired"
        }, {
            "id": "Very Self Employed",
            "text": "Very Self Employed"
        }],
        "type": "search",
        "serviceUrl": "motor/occupation/",
        "placeholder": "Select an Area of Business"
    }, {
        "key": "livedOutsideIreland",
        "label": "Have you lived outside the Republic of Ireland or the UK in the last 12 months?",
        "order": 2,
        "required": true,
        "validators": [],
        "controlType": "radio",
        "timeline": true,
        "disabled": false,
        "options": ["Yes", "No"]
    }, {
        "value": 2,
        "key": "amountOfDrivers",
        "label": "How many drivers?",
        "order": 10,
        "required": true,
        "validators": [],
        "controlType": "slider",
        "timeline": true,
        "disabled": false,
        "min": 0,
        "max": 7
    }, {
        "key": "occupation3",
        "label": "Occupation",
        "order": 99992,
        "required": true,
        "validators": [],
        "controlType": "autocomplete",
        "timeline": true,
        "disabled": false,
        "options": [{
            "id": "Employed",
            "text": "Employed"
        }, {
            "id": "Household Duties",
            "text": "Household Duties"
        }, {
            "id": "Retired",
            "text": "Retired"
        }, {
            "id": "Self Employed",
            "text": "Self Employed"
        }, {
            "id": "Unemployed",
            "text": "Unemployed"
        }, {
            "id": "Very Employed",
            "text": "Very Employed"
        }, {
            "id": "Very Household Duties",
            "text": "Very Household Duties"
        }, {
            "id": "Very Retired",
            "text": "Very Retired"
        }, {
            "id": "Very Self Employed",
            "text": "Very Self Employed"
        }],
        "type": "search",
        "serviceUrl": "motor/occupation/",
        "placeholder": "Select an Occupation"
    }]
}]
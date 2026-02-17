/**
 * @file translations.ts
 * @description Central translation file for the New Lead Form.
 * Contains dictionary objects for English ('en') and Marathi ('mr').
 * 
 * Usage:
 * Imported in Step components.
 * const t = translations[language].sectionName;
 */

export type Language = 'en' | 'mr';

export const translations = {
    en: {
        common: {
            customerEnquiryForm: "Customer Enquiry Form",
            personalInfo: "Personal Info",
            contactWorkInfo: "Contact & Work Info",
            propertyDetails: "Property Details",
            feedback: "Feedback",
            shareRequirements: "Share your requirements in just a few simple steps 🚀",
            followSteps: "Follow these three steps to find your perfect home effortlessly.",
            back: "← Back",
            continue: "Continue →",
            verify: "Verify",
            cancel: "Cancel",
            save: "Save",
            clear: "Clear",
        },
        personalInfo: {
            dob: "Date of Birth",
            photo: "Photo",
            takePhoto: "Take a photo",
            title: "Preffix",
            firstName: "First Name",
            middle: "Middle",
            lastName: "Last Name",
            gender: "Gender",
            age: "Age",
            nationality: "Nationality",
            aadhar: "Aadhar Card Number",
            email: "Email Address",
            phone: "Phone Number",
            addAlternateInfo: "+ Add alternate number",
            maritalStatus: "Marital Status",
            spouseName: "Spouse Name",
            ifApplicable: "If applicable",
            select: "Select",
            selectStatus: "Select Status",
            options: {
                title: {
                    mr: "Mr",
                    mrs: "Mrs",
                    ms: "Ms",
                    dr: "Dr"
                },
                gender: {
                    male: "Male",
                    female: "Female",
                    other: "Other"
                },
                nationality: {
                    indian: "Indian",
                    american: "American",
                    british: "British",
                    canadian: "Canadian",
                    other: "Other"
                },
                maritalStatus: {
                    single: "Single",
                    married: "Married",
                    divorced: "Divorced",
                    widowed: "Widowed"
                }
            }
        },
        contactWork: {
            currentResidenceType: "What is your current residence type?",
            ownedHouse: "Owned House",
            rentedHouse: "Rented House",
            shareAddress: "Share Your Current Address",
            enterAddress: "Enter street address",
            location: "Location",
            city: "City",
            subLocation: "Sub Location",
            pinCode: "Pin Code",
            describeWorkType: "Describe Your Work Type",
            workTypes: {
                salaried: "Salaried",
                government: "Government",
                selfEmployed: "Self-employed",
                freelancer: "Freelancer",
                retired: "Retired"
            },
            detailsSuffix: "Details",
            fields: {
                jobTitle: "Job Title",
                orgName: "Organization Name",
                companyType: "Company Type",
                businessType: "Business Type",
                yearsInBusiness: "Years in Business",
                fieldOfWork: "Field of Work",
                yearsOfExperience: "Years of Experience",
                prevOccupation: "Previous Occupation",
                yearsSinceRetirement: "Years Since Retirement",
                department: "Department",
                designation: "Designation",
                yearsOfService: "Years of Service"
            }
        },
        propertyDetails: {
            purpose: "What is your purpose of buying?",
            options: {
                primaryResidence: "Primary Residence",
                investment: "Investment",
                secondHome: "Second Home"
            },
            configuration: "Which configuration suits you best?",
            budget: "How much would you like to invest?",
            possession: "What is your target possession date?",
            floor: "What is your preferred floor level?",
            floorOptions: {
                lower: "Lower level",
                middle: "Middle level",
                upper: "Upper level"
            },
            view: "What view are you interested in?",
            viewOptions: {
                city: "City view",
                mangrove: "Mangrove view",
                both: "Both"
            }
        },
        feedback: {
            whereDidYouFind: "Where did you find out about us?",
            online: "Online",
            offline: "Offline",
            reference: "Reference",
            nameOfReference: "Name of Reference",
            contact: "Contact",
            broker: "Broker/Channel Partner",
            cpFirm: "CP Firm",
            execName: "Exec. Name",
            addFirm: "+ Add Firm (Office Use)",
            consent: "By proceeding, you consent to being contacted using the details provided and to receive relevant marketing communications.",
            signature: "Signature",
            tapToSign: "Tap to sign",
            saveSignature: "Save Signature"
        },
        thankYou: {
            title: "Thank You",
            subtitle: "You're one step closer to your new home!",
            message: "We've received your inquiry and our team is reviewing the details you shared about your housing needs. One of our property specialists will be in touch shortly to help you explore the best options for your ideal home."
        }
    },
    mr: {
        common: {
            customerEnquiryForm: "ग्राहक चौकशी फॉर्म",
            personalInfo: "वैयक्तिक माहिती",
            contactWorkInfo: "संपर्क आणि कामाची माहिती",
            propertyDetails: "मालमत्ता तपशील",
            feedback: "अभिप्राय",
            shareRequirements: "तुमच्या गरजा थोड्या सोप्या चरणांमध्ये सांगा 🚀",
            followSteps: "तुमचे स्वप्नातील घर मिळवण्यासाठी या तीन चरणांचे अनुसरण करा.",
            back: "← मागे",
            continue: "पुढे जा →",
            verify: "पडताळणी करा",
            cancel: "रद्द करा",
            save: "जतन करा",
            clear: "साफ करा",
        },
        personalInfo: {
            dob: "जन्म तारीख",
            photo: "फोटो",
            takePhoto: "फोटो घ्या",
            title: "शीर्षक",
            firstName: "नाव (First Name)",
            middle: "मधले नाव (Middle Name)",
            lastName: "आडनाव (Last Name)",
            gender: "लिंग",
            age: "वय",
            nationality: "राष्ट्रीयत्व",
            aadhar: "आधार कार्ड क्रमांक",
            email: "ईमेल पत्ता",
            phone: "फोन नंबर",
            addAlternateInfo: "+ पर्यायी नंबर जोडा",
            maritalStatus: "वैवाहिक स्थिती",
            spouseName: "जोडीदाराचे नाव",
            ifApplicable: "लागू असल्यास",
            select: "निवडा",
            selectStatus: "स्थिती निवडा",
            options: {
                title: {
                    mr: "श्री",
                    mrs: "श्रीमती",
                    ms: "कुमारी",
                    dr: "डॉ."
                },
                gender: {
                    male: "पुरुष",
                    female: "स्त्री",
                    other: "इतर"
                },
                nationality: {
                    indian: "भारतीय",
                    american: "अमेरिकन",
                    british: "ब्रिटीश",
                    canadian: "कॅनेडियन",
                    other: "इतर"
                },
                maritalStatus: {
                    single: "अविवाहित",
                    married: "विवाहित",
                    divorced: "घटस्फोटित",
                    widowed: "विधवा/विदुर"
                }
            }
        },
        contactWork: {
            currentResidenceType: "तुमच्या सध्याच्या निवसाचा प्रकार काय आहे?",
            ownedHouse: "स्वतःचे घर",
            rentedHouse: "भाड्याचे घर",
            shareAddress: "तुमचा सध्याचा पत्ता सांगा",
            enterAddress: "रस्त्याचा पत्ता प्रविष्ट करा",
            location: "ठिकाण (Location)",
            city: "शहर (City)",
            subLocation: "उप-ठिकाण (Sub Location)",
            pinCode: "पिन कोड",
            describeWorkType: "तुमच्या कामाचे स्वरूप सांगा",
            workTypes: {
                salaried: "पगारदार",
                government: "सरकारी नोकरी",
                selfEmployed: "स्वयंरोजगार",
                freelancer: "फ्रीलांसर",
                retired: "निवृत्त"
            },
            detailsSuffix: "तपशील",
            fields: {
                jobTitle: "पद",
                orgName: "संस्थेचे नाव",
                companyType: "कंपनीचा प्रकार",
                businessType: "व्यवसायाचा प्रकार",
                yearsInBusiness: "व्यवसायातील वर्षे",
                fieldOfWork: "कामाचे क्षेत्र",
                yearsOfExperience: "अनुभव (वर्षे)",
                prevOccupation: "मागील व्यवसाय",
                yearsSinceRetirement: "निवृत्तीनंतरची वर्षे",
                department: "विभाग",
                designation: "पदनाम",
                yearsOfService: "सेवेची वर्षे"
            }
        },
        propertyDetails: {
            purpose: "खरेदीचे कारण काय आहे?",
            options: {
                primaryResidence: "मूळ निवासस्थान",
                investment: "गुंतवणूक",
                secondHome: "दुसरे घर"
            },
            configuration: "तुम्हाला कोणती रचना (Configuration) योग्य वाटते?",
            budget: "तुम्ही किती गुंतवणूक करू इच्छिता?",
            possession: "तुमची अपेक्षित ताबा तारीख (Possession Date) काय आहे?",
            floor: "तुम्हाला कोणता मजला आवडेल?",
            floorOptions: {
                lower: "खालचा स्तर",
                middle: "मधला स्तर",
                upper: "वरचा स्तर"
            },
            view: "तुम्हाला कोणते दृश्य (View) आवडेल?",
            viewOptions: {
                city: "शहर दृश्य",
                mangrove: "मॅन्ग्रोव्ह दृश्य",
                both: "दोन्ही"
            }
        },
        feedback: {
            whereDidYouFind: "तुम्हाला आमच्याबद्दल कोठून माहिती मिळाली?",
            online: "ऑनलाइन",
            offline: "ऑफलाइन",
            reference: "संदर्भ (Reference)",
            nameOfReference: "संदर्भाचे नाव",
            contact: "संपर्क",
            broker: "ब्रोकर/चॅनेल पार्टनर",
            cpFirm: "CP फर्म",
            execName: "कार्यकारी नाव",
            addFirm: "+ फर्म जोडा (कार्यालयीन वापर)",
            consent: "पुढे जाऊन, तुम्ही दिलेल्या तपशीलांचा वापर करून संपर्क साधण्यास आणि संबंधित मार्केटिंग माहिती प्राप्त करण्यास संमती देता.",
            signature: "स्वाक्षरी",
            tapToSign: "स्वाक्षरी करण्यासाठी टॅप करा",
            saveSignature: "स्वाक्षरी जतन करा"
        },
        thankYou: {
            title: "धन्यवाद",
            subtitle: "तुम्ही तुमच्या नवीन घराच्या अगदी जवळ आहात!",
            message: "आम्हाला तुमची चौकशी प्राप्त झाली आहे आणि आमची टीम तुम्ही दिलेल्या तुमच्या घराच्या गरजांच्या तपशीलांचे पुनरावलोकन करत आहे. तुमच्या आदर्श घरासाठी सर्वोत्तम पर्याय शोधण्यात मदत करण्यासाठी आमचा एक प्रॉपर्टी स्पेशलिस्ट लवकरच तुमच्याशी संपर्क साधेल."
        }
    }
};

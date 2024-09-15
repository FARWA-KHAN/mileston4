document.addEventListener('DOMContentLoaded', function () {
    var resumeForm = document.getElementById('Resumeform');
    var resumeOutput = document.getElementById('resumeOutput');
    var editButton = document.createElement('button');
    var saveButton = document.createElement('button');
    // Add Edit and Save Buttons
    editButton.textContent = 'Edit Resume';
    saveButton.textContent = 'Save as PDF';
    saveButton.style.display = 'none'; // Hide save button initially
    resumeOutput === null || resumeOutput === void 0 ? void 0 : resumeOutput.appendChild(editButton);
    resumeOutput === null || resumeOutput === void 0 ? void 0 : resumeOutput.appendChild(saveButton);
    function generateResume(profilePictureURL, name, email, phone, education, skills, experience) {
        var resumeContent = "\n            <h2>Generated Resume</h2>\n            ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\" style=\"width: 150px; height: 150px; border-radius: 50%;\">") : '', "\n            <p><strong>Full Name:</strong> ").concat(name, "</p>\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n            <h3>Education</h3>\n            <p>").concat(education, "</p>\n            <h3>Skills</h3>\n            <p>").concat(skills, "</p>\n            <h3>Experience</h3>\n            <p>").concat(experience, "</p>\n        ");
        if (resumeOutput) {
            resumeOutput.innerHTML = resumeContent;
            resumeOutput.appendChild(editButton);
            resumeOutput.appendChild(saveButton);
            saveButton.style.display = 'inline-block'; // Show save button after resume generation
        }
    }
    resumeForm.addEventListener('submit', function (event) {
        var _a;
        event.preventDefault();
        var profilePictureInput = document.getElementById('profilePicture');
        var nameElement = document.getElementById('name');
        var emailElement = document.getElementById('email');
        var phoneElement = document.getElementById('phone');
        var educationElement = document.getElementById('education');
        var skillsElement = document.getElementById('skills');
        var experienceElement = document.getElementById('experience');
        var name = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var skills = skillsElement.value;
        var experience = experienceElement.value;
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            var profilePictureURL = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            generateResume(profilePictureURL, name, email, phone, education, skills, experience);
        };
        if (profilePictureFile) {
            reader.readAsDataURL(profilePictureFile);
        }
        else {
            generateResume(null, name, email, phone, education, skills, experience);
        }
    });
    editButton.addEventListener('click', function () {
        var nameElement = document.getElementById('name');
        var emailElement = document.getElementById('email');
        var phoneElement = document.getElementById('phone');
        var educationElement = document.getElementById('education');
        var skillsElement = document.getElementById('skills');
        var experienceElement = document.getElementById('experience');
        // Make form fields editable again
        nameElement.disabled = false;
        emailElement.disabled = false;
        phoneElement.disabled = false;
        educationElement.disabled = false;
        skillsElement.disabled = false;
        experienceElement.disabled = false;
        saveButton.style.display = 'none'; // Hide save button during editing
    });
    saveButton.addEventListener('click', function () {
        var resumeContent = resumeOutput.innerHTML;
        var printWindow = window.open('', '', 'height=650,width=900');
        printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write('<html><head><title>Resume</title></head><body>');
        printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write(resumeContent);
        printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write('</body></html>');
        printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.close();
        printWindow === null || printWindow === void 0 ? void 0 : printWindow.print();
    });
});

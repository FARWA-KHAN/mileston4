document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('Resumeform') as HTMLFormElement;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;
    const editButton = document.createElement('button');
    const saveButton = document.createElement('button');

    // Add Edit and Save Buttons
    editButton.textContent = 'Edit Resume';
    saveButton.textContent = 'Save as PDF';
    saveButton.style.display = 'none'; // Hide save button initially
    resumeOutput?.appendChild(editButton);
    resumeOutput?.appendChild(saveButton);

    function generateResume(profilePictureURL: string | ArrayBuffer | null, name: string, email: string, phone: string, education: string, skills: string, experience: string) {
        const resumeContent = `
            <h2>Generated Resume</h2>
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture" style="width: 150px; height: 150px; border-radius: 50%;">` : ''}
            <p><strong>Full Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Skills</h3>
            <p>${skills}</p>
            <h3>Experience</h3>
            <p>${experience}</p>
        `;
        if (resumeOutput) {
            resumeOutput.innerHTML = resumeContent;
            resumeOutput.appendChild(editButton);
            resumeOutput.appendChild(saveButton);
            saveButton.style.display = 'inline-block'; // Show save button after resume generation
        }
    }

    resumeForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
        const nameElement = document.getElementById('name') as HTMLInputElement;
        const emailElement = document.getElementById('email') as HTMLInputElement;
        const phoneElement = document.getElementById('phone') as HTMLInputElement;
        const educationElement = document.getElementById('education') as HTMLTextAreaElement;
        const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
        const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;

        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const skills = skillsElement.value;
        const experience = experienceElement.value;

        const profilePictureFile = profilePictureInput.files?.[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const profilePictureURL = e.target?.result;

            generateResume(profilePictureURL, name, email, phone, education, skills, experience);
        };

        if (profilePictureFile) {
            reader.readAsDataURL(profilePictureFile);
        } else {
            generateResume(null, name, email, phone, education, skills, experience);
        }
    });

    editButton.addEventListener('click', () => {
        const nameElement = document.getElementById('name') as HTMLInputElement;
        const emailElement = document.getElementById('email') as HTMLInputElement;
        const phoneElement = document.getElementById('phone') as HTMLInputElement;
        const educationElement = document.getElementById('education') as HTMLTextAreaElement;
        const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
        const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;

        // Make form fields editable again
        nameElement.disabled = false;
        emailElement.disabled = false;
        phoneElement.disabled = false;
        educationElement.disabled = false;
        skillsElement.disabled = false;
        experienceElement.disabled = false;

        saveButton.style.display = 'none'; // Hide save button during editing
    });

    saveButton.addEventListener('click', () => {
        const resumeContent = resumeOutput.innerHTML;
        const printWindow = window.open('', '', 'height=650,width=900');
        printWindow?.document.write('<html><head><title>Resume</title></head><body>');
        printWindow?.document.write(resumeContent);
        printWindow?.document.write('</body></html>');
        printWindow?.document.close();
        printWindow?.print();
    });
});

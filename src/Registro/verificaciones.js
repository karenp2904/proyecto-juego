document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.register-form');
    const nameInput = form.querySelector('input[placeholder="Nombre"]');
    const surnameInput = form.querySelector('input[placeholder="Apellido"]');
    const nicknameInput = form.querySelector('input[placeholder="Apodo"]');
    const emailInput = form.querySelector('input[placeholder="Correo Electrónico"]');
    const passwordInput = form.querySelector('input[placeholder="Contraseña"]:nth-of-type(1)');
    const confirmPasswordInput = form.querySelector('input[placeholder="Contraseña"]:nth-of-type(2)');
    const securityQuestionInputs = form.querySelectorAll('.questions input');

    const existingNicknames = ['coolguy', 'techmaster', 'codewizard', 'quicklearner', 'designguru', 'smartcookie', 'creativebee', 'logichacker', 'brightmind', 'sharpthinker'];

    form.addEventListener('submit', (event) => {
        let valid = true;
        let errorMessage = '';

        // Validar que todos los campos estén llenos
        if (!nameInput.value || !surnameInput.value || !nicknameInput.value || !emailInput.value || !passwordInput.value || !confirmPasswordInput.value || !Array.from(securityQuestionInputs).every(input => input.value)) {
            valid = false;
            errorMessage += 'Por favor, complete todos los campos.\n';
        }

        // Validar que nombre y apellido solo contengan texto
        const nameSurnameRegex = /^[A-Za-z]+$/;
        if (!nameSurnameRegex.test(nameInput.value) || !nameSurnameRegex.test(surnameInput.value)) {
            valid = false;
            errorMessage += 'El nombre y el apellido solo pueden contener letras.\n';
        }

        // Validar que las contraseñas coincidan
        if (passwordInput.value !== confirmPasswordInput.value) {
            valid = false;
            errorMessage += 'Las contraseñas no coinciden.\n';
        }

        // Validar que el apodo sea diferente a los existentes
        if (existingNicknames.includes(nicknameInput.value.toLowerCase())) {
            valid = false;
            errorMessage += 'El apodo ya existe. Por favor, elija un apodo diferente.\n';
        }

        if (!valid) {
            event.preventDefault();
            alert(errorMessage);
        }
    });
});

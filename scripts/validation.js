const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);

    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass); // Corrected 'clastList' to 'classList'
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);

    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass); // Corrected 'clastList' to 'classList'
}

function checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
        return showInputError(formEl, inputEl, options);
    } 
    hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (hasInvalidInput(inputEls)) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true; // Corrected 'disable' to 'disabled'
        return;
    }

    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false; // Corrected 'disable' to 'disabled'
}

function setEventListeners(formEl, options) {
    const { inputSelector } = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector(options.submitButtonSelector); // Corrected to select the submit button

    inputEls.forEach((inputEl) => {
        inputEl.addEventListener("input", (event) => {
            checkInputValidity(formEl, inputEl, options);
            toggleButtonState(inputEls, submitButton, options);
        });
    });
};

function enableValidation(options) {
    const formEls = [...document.querySelectorAll(options.formSelector)];

    formEls.forEach((formEl) => {
        formEl.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent form submission
        });
        setEventListeners(formEl, options);
    });
};

enableValidation(config);
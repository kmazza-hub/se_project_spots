const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Display error message for invalid input
const showInputError = (formEl, inputEl, errorMsg, config = settings) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  if (!errorMsgEl) return; // Skip if error element doesn't exist
  errorMsgEl.textContent = errorMsg;
  inputEl.classList.add(config.inputErrorClass);
};

// Hide error message for valid input
const hideInputError = (formEl, inputEl, config = settings) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  if (!errorMsgEl) return; // Skip if error element doesn't exist
  errorMsgEl.textContent = "";
  inputEl.classList.remove(config.inputErrorClass);
};

// Validate individual input
const checkInputValidity = (formEl, inputEl, config = settings) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

// Check if form contains any invalid inputs
const hasInvalidInput = (inputList) =>
  inputList.some((input) => !input.validity.valid);

// Enable or disable form button based on input validity
const toggleButtonState = (inputList, buttonEl, config = settings) => {
  const isFormInvalid = hasInvalidInput(inputList);
  buttonEl.disabled = isFormInvalid;
  buttonEl.classList.toggle(config.inactiveButtonClass, isFormInvalid);
};

// Disable a button (utility function)
const disableButton = (buttonEl, config = settings) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass);
};

// Reset validation for all inputs in a form
const resetValidation = (formEl, config = settings) => {
  const inputs = formEl.querySelectorAll(config.inputSelector);
  inputs.forEach((inputEl) => hideInputError(formEl, inputEl, config));

  const buttonEl = formEl.querySelector(config.submitButtonSelector);
  disableButton(buttonEl, config);
};

// Attach validation event listeners to form inputs
const setEventListeners = (formEl, config = settings) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config); // Initial button state

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formEl, inputElement, config); // Validate input
      toggleButtonState(inputList, buttonElement, config); // Update button state
    });
  });
};

// Enable validation for all forms on the page
const enableValidation = (config = settings) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => setEventListeners(formEl, config));
};

// Initialize validation
enableValidation(settings);


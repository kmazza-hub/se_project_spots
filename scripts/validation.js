
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (formEl, inputEl, errorMsg, config) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  if (errorMsgEl) {
    errorMsgEl.textContent = errorMsg;
    inputEl.classList.add(settings.inputErrorClass);
  }
};

const hideInputError = (formEl, inputEl, config) => {
  const errorMsgEl = document.querySelector(`#${inputEl.id}-error`);
  if (errorMsgEl) {
    errorMsgEl.textContent = "";
    inputEl.classList.remove(settings.inputErrorClass);
  }
};


const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl,config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const resetValidation = (formEl) => {
  const inputs = formEl.querySelectorAll(settings.inputSelector);
  inputs.forEach((inputEl) => {
    hideInputError(formEl, inputEl);
    inputEl.removeAttribute("aria-describedby");
  });

  const buttonEl = formEl.querySelector(settings.submitButtonSelector);
  disableButton(buttonEl);
};

const toggleButtonState = (inputList, buttonEl) => {
  const isFormInvalid = hasInvalidInput(inputList);
  buttonEl.disabled = isFormInvalid;
  buttonEl.classList.toggle(settings.inactiveButtonClass, isFormInvalid);
};

const disableButton = (buttonEl) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(settings.inactiveButtonClass);
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonElement = formEl.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });

  toggleButtonState(inputList, buttonElement);
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);
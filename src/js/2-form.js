const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const formElement = document.querySelector('.feedback-form');

formElement.addEventListener('input', handleInput);
formElement.addEventListener('submit', handleSubmit);

fillValueFromStorage();

function handleInput(event) {
  const field = event.target;

  formData[field.name] = field.value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  try {
    const { email, message } = formData;
    if (email === '' || message === '') {
      throw new Error('Fill please all fields');
    }
    console.log(formData);
    form.reset();
    localStorage.removeItem(STORAGE_KEY);

    Object.keys(formData).forEach(key => {
      formData[key] = '';
    });
  } catch (error) {
    alert(error.message);
  }
}

function fillValueFromStorage() {
  try {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!savedData) return;

    for (const key in savedData) {
      if (savedData.hasOwnProperty(key)) {
        formData[key] = savedData[key];
        if (formElement.elements[key]) {
          formElement.elements[key].value = savedData[key];
        }
      }
    }
  } catch (error) {
    error.message;
  }
}

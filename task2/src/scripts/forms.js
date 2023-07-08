const forms = document.getElementById("forms");

const formsObject = {
  stateNumberInput: document.getElementById("state-number"),
  transportTypeInput: document.getElementById("transport-type"),
  arrivalDateInput: document.getElementById("arrival-date"),
  fullNameInput: document.getElementById("full-name"),
  passportSeriesInput: document.getElementById("passport-series"),
  passportNumberInput: document.getElementById("passport-number"),
  passportIssuedByInput: document.getElementById("passport-issued-by"),
  passportIssuedWhenInput: document.getElementById("passport-issued-when"),
};

const inputsAndRegexes = {
  stateNumber: {
    inputNode: formsObject.stateNumberInput,
    regex: /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}$/iu,
  },
  passportSeries: {
    inputNode: formsObject.passportSeriesInput,
    regex: /^(\d{4})$/u,
  },
  passportNumber: {
    inputNode: formsObject.passportNumberInput,
    regex: /^(\d{6})$/u,
  },
};

function validate(input, regex) {
  if (regex.test(input.value.trim())) {
    // console.log(input, "valid");
    input.classList.remove("form-invalid");
    input.classList.add("form-valid");
    return true;
  }

  // console.log(input, "invalid");
  input.classList.remove("form-valid");
  input.classList.add("form-invalid");
  return false;
}

function saveFormData(formsObject) {
  for (let input in formsObject) {
    localStorage.setItem(
      formsObject[input].getAttribute("name"),
      formsObject[input].value
    );
  }
  localStorage.setItem("formsFilled", "true");
}

function setInputValues(formsObject) {
  if (localStorage.getItem("formsFilled") === "true") {
    for (let input in formsObject) {
      formsObject[input].value = localStorage.getItem(
        formsObject[input].getAttribute("name")
      );
    }
  }
}

setInputValues(formsObject);

forms.addEventListener("submit", (event) => {
  for (let item in inputsAndRegexes) {
    if (
      !validate(inputsAndRegexes[item].inputNode, inputsAndRegexes[item].regex)
    ) {
      event.preventDefault();
    }
  }
  saveFormData(formsObject);
});

/**
 * Summary: This file contains all the logic that makes the calculator work as it suppose to.
 *
 * Description: I'm using a Class because it allows me to organize all the functionalities in methods that will be encapsulated inside *              the class, and is easier to make them private, as well as any other variables.
 *
 * @file   This file defines the Calculator class.
 * @author Jose Furtado.
 */

class Calculator {
  #calculatorMainDisplay = document.querySelector('.main-screen');
  #calculatorSmallDisplay = document.querySelector('.small-display');
  #calculatorKeys = document.querySelector('.calculator-keys');

  #state = {
    firstInput: [],
    secondInput: [],
    operator: '',
    newOperator: '',
  };

  // Does convert the operator name in text format and return the operator in sign/symbol format
  #convertOperator(operator) {
    let display;
    switch (operator) {
      case 'plus':
        display = '+';
        break;
      case 'minus':
        display = '-';
        break;
      case 'division':
        display = '/';
        break;
      case 'times':
        display = '*';
        break;
    }
    return display;
  }

  // Does format the calculation result to a more user-friendly number format
  #formatNumber(number) {
    const result = number.toLocaleString(undefined, { maximumFractionDigits: 12 });

    return result;
  }

  // Handles a click event on the Delete button.
  #handleDelete(input) {
    if (input.dataset.type !== 'delete') return;

    const mainDisplay = this.#calculatorMainDisplay;
    const smallDisplay = this.#calculatorSmallDisplay;

    if (this.#state.firstInput.length > 0 && !this.#state.operator) {
      if (this.#state.firstInput.length === 1) {
        this.#state.firstInput = [];

        return (mainDisplay.textContent = 0);
      }
      if (this.#state.firstInput.length > 1) {
        // Removes the last element in the firstInput array
        this.#state.firstInput.pop();

        // Updates the mainDisplay
        return (mainDisplay.textContent = this.#state.firstInput.join(''));
      }
    }

    if (this.#state.secondInput.length > 0) {
      // Removes the last element in the secondInput array
      this.#state.secondInput.pop();

      // Updates the smallDisplay
      this.#renderSmallDisplay();
    }

    // If there are no second inputs, there is no need to show the smallDisplay
    if (this.#state.secondInput.length === 0) {
      this.#state.operator = '';
      return (smallDisplay.textContent = '');
    }
  }

  // Renders the First Inputs, the Operator, and the Second Inputs on the Small Display.
  #renderSmallDisplay() {
    const smallDisplay = this.#calculatorSmallDisplay;

    smallDisplay.textContent = `
      ${this.#state.firstInput.join('') || ''}
      ${
        this.#state.secondInput.length > 0
          ? this.#convertOperator(this.#state.operator)
          : ''
      }
      ${this.#state.secondInput.join('') || ''}
      `;
  }

  // Handles a click event on the Clear button.
  #handleClear(input) {
    if (input.dataset.type !== 'clear') return;

    this.#state.firstInput = [];
    this.#state.secondInput = [];
    this.#state.operator = '';
    this.#state.newOperator = '';
    this.#calculatorMainDisplay.textContent = 0;
    this.#calculatorSmallDisplay.textContent = '';
  }

  // Handles a click event on any Operator button.
  #handleOperator(input) {
    if (input.dataset.type !== 'operator' || this.#state.firstInput.length === 0)
      return;

    // Saving the operator in state
    !this.#state.operator || this.#state.secondInput.length === 0
      ? (this.#state.operator = input.dataset.operator)
      : // This operator will be used to perform multiple operations when a new operator is clicked
        (this.#state.newOperator = input.dataset.operator);
  }

  // Renders the Inputs and the calculation result on Display.
  #handleDisplayRender(input, showResult) {
    const mainDisplay = this.#calculatorMainDisplay;

    const { type } = input.dataset;
    let { firstInput, secondInput } = this.#state;

    // Renders the calculation result on the mainDisplay
    if (showResult) {
      mainDisplay.textContent = this.#formatNumber(showResult);
    }

    // Display content on screen when any number or decimal sign is clicked
    if (type === 'number' || type === 'decimal') {
      // Saves the first inputs in the state object
      if (!this.#state.operator) {
        if (firstInput.includes('.') && type === 'decimal') return;

        firstInput.push(input.textContent);
      }
      // Saves the second inputs in the state object
      if (this.#state.operator) {
        if (secondInput.includes('.') && type === 'decimal') return;

        secondInput.push(input.textContent);
      }

      // Renders the first inputs
      if (firstInput.length === 1) {
        mainDisplay.textContent = firstInput[0];
      }
      if (firstInput.length > 1) {
        mainDisplay.textContent = firstInput.join('');
      }

      // Renders the firstInputs, the operator, and the secondInputs to the smallDisplay
      if (secondInput.length > 0) {
        this.#renderSmallDisplay();
      }
    }
  }

  // Perform calculation and return the result.
  #calculate() {
    const firstNumber = Number(this.#state.firstInput.join(''));
    const secondNumber = Number(this.#state.secondInput.join(''));
    const operator = this.#state.operator;

    let result;
    switch (operator) {
      case 'plus':
        result = firstNumber + secondNumber;
        break;
      case 'minus':
        result = firstNumber - secondNumber;
        break;
      case 'division':
        result = firstNumber / secondNumber;
        break;
      case 'times':
        result = firstNumber * secondNumber;
        break;
    }

    return result;
  }

  // Handles a click event on Equal or Operator button to perform calculation.
  #handleOperations(input) {
    if (this.#state.secondInput.length === 0) return;

    // Calculate when equals sign is clicked
    if (input.dataset.type === 'equals') {
      const result = this.#calculate();

      this.#state.firstInput = [result];
      this.#state.secondInput = [];
      this.#state.operator = '';
      this.#state.newOperator = '';

      this.#handleDisplayRender(input, result);
    }

    // Performs Multiple Operations when a new operator is clicked
    if (input.dataset.type === 'operator') {
      const result = this.#calculate();

      this.#state.operator = this.#state.newOperator;
      this.#state.firstInput = [];
      this.#state.secondInput = [];
      this.#state.firstInput.push(result);

      this.#handleDisplayRender(input, result);
    }
  }

  // Listens to the click event and calls the proper method to perform his logic.
  displayContent(e) {
    const input = e.target;
    if (!input.classList.contains('key')) return;

    this.#handleDisplayRender(input);
    this.#handleOperator(input);
    this.#handleDelete(input);
    this.#handleClear(input);
    this.#handleOperations(input);
  }

  // Attaches the event listener to the calculator buttons.
  start() {
    this.#calculatorKeys.addEventListener('click', this.displayContent.bind(this));
  }
}

export default new Calculator();

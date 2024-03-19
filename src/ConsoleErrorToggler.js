class ConsoleErrorToggler {
  constructor() {
    this.originalConsoleError = console.error;
    this.consoleErrorEnabled = true;
  }

  disable() {
    if (this.consoleErrorEnabled) {
      console.error = () => {};
      this.consoleErrorEnabled = false;
    }
  }

  enable() {
    if (!this.consoleErrorEnabled) {
      console.error = this.originalConsoleError;
      this.consoleErrorEnabled = true;
    }
  }
}

module.exports = ConsoleErrorToggler;

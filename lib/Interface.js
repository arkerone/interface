class Interface {
  constructor(name, ...methods) {
    if (typeof name !== 'string' || name.length === 0) {
      throw new Error('The "name" argument must be a non-empty string');
    }
    if (!Array.isArray(methods) || methods.length === 0) {
      throw new Error('The "methods" argument must be a non-empty array of string');
    }

    this.name = name;
    this.methods = [];

    for (const method of methods) {
      if (typeof method !== 'string') {
        throw new Error('The "methods" argument must contains only string');
      }

      this.methods.push(method);
    }
  }

  isImplementedBy(obj) {
    if (!obj) {
      return false;
    }

    return this.methods.every(method => obj[method] && typeof obj[method] === 'function');
  }
}

module.exports = Interface;

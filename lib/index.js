/* eslint-disable no-param-reassign */
/* eslint-disable max-classes-per-file */

const Interface = require('./Interface');

module.exports = {
  create(name, ...methods) {
    return new Interface(name, ...methods);
  },
  base(superclass) {
    return {
      implements(...interfaces) {
        interfaces = interfaces.map(itf => {
          if (!(itf instanceof Interface)) {
            throw new Error('The parameters must be instances of "Interface"');
          }
          return base =>
            class extends base {
              constructor(...args) {
                super(...args);

                const unimplementedMethods = [];

                for (const method of itf.methods) {
                  if (!this[method] || typeof this[method] !== 'function') {
                    unimplementedMethods.push(method);
                  }
                }

                if (unimplementedMethods.length > 0) {
                  throw new Error(
                    `The class "${this.constructor.name}" doesn't implements the "${
                      itf.name
                    }" interface. Methods not found : ${unimplementedMethods.join(', ')}`
                  );
                }
              }
            };
        });

        return interfaces.reduce((c, itf) => itf(c), superclass || class {});
      }
    };
  }
};

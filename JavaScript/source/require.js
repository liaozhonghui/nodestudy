const require = (moduleName) => {
    const id = require.resolve(moduleName);
    if (require.cache(id)) {
        return require.cache[id].exports;
    }
    
}

require.resolve = (moduleName) => {
    /**
     * resolve a full module id from the module name
     */
}
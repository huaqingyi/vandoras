"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpService = exports.useService = void 0;
require("reflect-metadata");
function useService(Service) {
    return new Service();
}
exports.useService = useService;
function HttpService(target, key) {
    var Service = Reflect.getMetadata('design:type', target, key);
    target[key] = new Service();
    return target[key];
}
exports.HttpService = HttpService;

//# sourceMappingURL=sourcemaps/composition.js.map

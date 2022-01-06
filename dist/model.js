"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VuexModule = exports.Action = exports.ActionMutationKey = exports.Module = void 0;
require("reflect-metadata");
__exportStar(require("vuex-module-decorators"), exports);
var vuex_module_decorators_1 = require("vuex-module-decorators");
var lodash_1 = require("lodash");
function Module(options) {
    if (options.store) {
        return function (module) {
            if (!module.id)
                module.id = Number(Math.random().toString().substring(3, 10) + Date.now()).toString(36);
            if (options.dynamic) {
                if (!options.name)
                    options.name = module.id;
                return vuex_module_decorators_1.Module(__assign({}, options))(module);
            }
            module.keys = {};
            var muts = Reflect.getMetadata(exports.ActionMutationKey, module.prototype);
            lodash_1.map(muts, function (mut) {
                if (module.mutations[mut])
                    return mut;
                module.mutations[mut] = (function (state, data) {
                    state[mut.slice(1)] = data;
                    return state;
                }).bind(module.prototype);
            });
            module.mutations._save = (function (state, data) {
                lodash_1.map(data, function (o, k) { return state[k] = o; });
                return state;
            }).bind(module.prototype);
            lodash_1.map(lodash_1.merge({}, module.actions, module.mutations, module.getters), function (o, i) {
                module.keys[i] = i;
            });
            Object.defineProperty(module, 'store', { get: function () { return options.store; } });
            options.store.registerModule(module.id, vuex_module_decorators_1.Module({ namespaced: true })(module));
        };
    }
    else {
        if (!options.id) {
            options.id = Number(Math.random().toString().substring(3, 10) + Date.now()).toString(36);
        }
        options.keys = {};
        lodash_1.map(lodash_1.merge({}, options.actions, options.mutations, options.getters), function (o, i) {
            options.keys[i] = i;
        });
        vuex_module_decorators_1.Module({ namespaced: true })(options);
    }
}
exports.Module = Module;
exports.ActionMutationKey = Symbol('#ActionMutationKey');
function Action() {
    var props = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        props[_i] = arguments[_i];
    }
    if (props.length === 1) {
        return function (target, key, descriptor) {
            var commit = props[0].commit;
            if (commit) {
                var muts = Reflect.getMetadata(exports.ActionMutationKey, target) || [];
                muts.push(commit);
                Reflect.defineMetadata(exports.ActionMutationKey, muts, target);
            }
            vuex_module_decorators_1.Action(props[0])(target, key, descriptor);
        };
    }
    return vuex_module_decorators_1.Action({})(props[0], props[1], props[2]);
}
exports.Action = Action;
var VuexModule = /** @class */ (function (_super) {
    __extends(VuexModule, _super);
    function VuexModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // tslint:disable-next-line:ban-types
    VuexModule.action = function (callback) {
        return this.id + "/" + callback(this.keys);
    };
    return VuexModule;
}(vuex_module_decorators_1.VuexModule));
exports.VuexModule = VuexModule;

//# sourceMappingURL=sourcemaps/model.js.map

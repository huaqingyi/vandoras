import 'reflect-metadata';
export * from 'vuex-module-decorators';
import { VuexModule as VxModule, Module as VModule, Action as A } from 'vuex-module-decorators';
import { Module as Mod, Store } from 'vuex';
import { map, merge } from 'lodash';
import { DynamicModuleOptions } from 'vuex-module-decorators/dist/types/moduleoptions';
import { ActionDecoratorParams } from 'vuex-module-decorators/dist/types/action';

// tslint:disable-next-line:ban-types
export function Module<S>(options: { store: Store<any> }): ClassDecorator;
export function Module<S>(options: { [x: string]: any, dynamic: boolean, store: Store<any> }): ClassDecorator;
export function Module<S>(options: any & Mod<S, any>): any {
    if (options.store) {
        return (module: any) => {
            if (!module.id) module.id = Number(Math.random().toString().substring(3, 10) + Date.now()).toString(36);

            if (options.dynamic) {
                if (!options.name) options.name = module.id;
                return VModule({ ...options } as DynamicModuleOptions)(module)
            }
            (module as any).keys = {};
            const muts = Reflect.getMetadata(ActionMutationKey, module.prototype);
            map(muts, mut => {
                if (module.mutations[mut]) return mut;
                module.mutations[mut] = (function (this: any, state: any, data: any) {
                    state[mut.slice(1)] = data;
                    return state;
                }).bind(module.prototype);
            });
            module.mutations._save = (function (this: any, state: any, data: any) {
                map(data, (o, k) => state[k] = o);
                return state;
            }).bind(module.prototype);
            map(merge({}, module.actions, module.mutations, module.getters), (o, i) => {
                (module as any).keys[i] = i;
            });

            Object.defineProperty(module, 'store', { get: () => options.store });

            options.store.registerModule(module.id, VModule({ namespaced: true })(module));
        };
    } else {
        if (!(options as any).id) {
            (options as any).id = Number(Math.random().toString().substring(3, 10) + Date.now()).toString(36);
        }

        (options as any).keys = {};
        map(merge({}, options.actions, options.mutations, options.getters), (o, i) => {
            (options as any).keys[i] = i;
        });
        VModule({ namespaced: true })(options);
    }
}

export const ActionMutationKey = Symbol('#ActionMutationKey');

export function Action<T, R>(target: T, key: string | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => R>): void;
export function Action<T>(params: ActionDecoratorParams): MethodDecorator;
export function Action(...props: any[]) {
    if (props.length === 1) {
        return function (target: any, key: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
            const { commit } = props[0];
            if (commit) {
                const muts = Reflect.getMetadata(ActionMutationKey, target) || [];
                muts.push(commit);
                Reflect.defineMetadata(ActionMutationKey, muts, target);
            }
            A(props[0])(target, key, descriptor);
        }
    }
    return A({})(props[0], props[1], props[2]);
}

export class VuexModule<S = ThisType<any>, R = any> extends VxModule {
    public static id: string;
    public static keys: { [x: string]: string };
    // tslint:disable-next-line:ban-types
    public static action(callback: (model: any & VuexModule) => Function) {
        return `${this.id}/${callback(this.keys)}`;
    }
}

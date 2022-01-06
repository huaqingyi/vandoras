import 'reflect-metadata';
export * from 'vuex-module-decorators';
import { VuexModule as VxModule } from 'vuex-module-decorators';
import { Store } from 'vuex';
import { ActionDecoratorParams } from 'vuex-module-decorators/dist/types/action';
export declare function Module<S>(options: {
    store: Store<any>;
}): ClassDecorator;
export declare function Module<S>(options: {
    [x: string]: any;
    dynamic: boolean;
    store: Store<any>;
}): ClassDecorator;
export declare const ActionMutationKey: unique symbol;
export declare function Action<T, R>(target: T, key: string | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => R>): void;
export declare function Action<T>(params: ActionDecoratorParams): MethodDecorator;
export declare class VuexModule<S = ThisType<any>, R = any> extends VxModule {
    static id: string;
    static keys: {
        [x: string]: string;
    };
    static action(callback: (model: any & VuexModule) => Function): string;
}

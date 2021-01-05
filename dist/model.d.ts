export * from 'vuex-module-decorators';
import { VuexModule as VxModule } from 'vuex-module-decorators';
import { Store } from 'vuex';
import { Service } from './service';
export declare type ServiceClass<V> = (new (...args: any[]) => V & Service) & typeof Service;
export declare function Module<S>(options: {
    [x: string]: any;
    store: Store<any>;
}): ClassDecorator;
export declare class VuexModule<S = ThisType<any>, R = any> extends VxModule {
    static id: string;
    static keys: {
        [x: string]: string;
    };
    static action(callback: (model: any & VuexModule) => Function): string;
}

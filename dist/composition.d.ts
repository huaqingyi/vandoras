import 'reflect-metadata';
import { VuexModule } from 'vuex-module-decorators';
import { Service } from './service';
export declare type ServiceClass<S> = {
    new (...args: any[]): S & Service;
} & typeof Service;
export declare type VuexModuleClass<V> = (new (...args: any[]) => V & VuexModule) & typeof VuexModule;
export declare function useService<S>(Service: ServiceClass<S>): S;
export declare function HttpService(target: any, key: string): any;

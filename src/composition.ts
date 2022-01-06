import 'reflect-metadata';
import { VuexModule } from 'vuex-module-decorators';
import { Service } from './service';

export type ServiceClass<S> = { new(...args: any[]): S & Service; } & typeof Service;
export type VuexModuleClass<V> = (new (...args: any[]) => V & VuexModule) & typeof VuexModule;

export function useService<S>(Service: ServiceClass<S>): S {
    return new Service();
}

export function HttpService(target: any, key: string) {
    const Service = Reflect.getMetadata('design:type', target, key);
    target[key] = new Service();
    return target[key];
}

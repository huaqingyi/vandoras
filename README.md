```
// @/store/app.ts
import { VuexModule, Module, Mutation, Action, getModule } from 'vandoras';
import store from '@/store';

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
    public size: string;

    constructor(module: App) {
        super(module);
        this.size = 'medium';
    }

    @Mutation
    private SET_SIZE(size: string) {
        this.size = size;
        setSize(this.size);
    }

    @Action
    public setSize(size: string) {
        this.SET_SIZE(size);
    }
}

export const AppModule = getModule(App);
```typescript

```
// @/store/index.ts
import Vuex from 'vuex';
export default new Vuex.Store<IRootState>({});
```typescript

```
import { AppModule } from '@/store/app';

AppModule.setSize('aaaa');
```typescript

```
import { AppModule } from '@/store/app';

AppModule.setSize('aaaa');
```typescript

```
// @/xxx/xxx/store.ts
import { Action, Mutation, VuexModule, Module } from '@/core';
import { ContainerService, InitDataResponse } from './service';
import store from '@/store';
import { User } from '@/core';

@Module({ store })
export class ContainerStore extends VuexModule {

    public service: ContainerService;
    public accessToken: string;
    public initData: InitDataResponse;

    constructor(state: ContainerStore) {
        super(state);
        this.service = new ContainerService();
        this.accessToken = '';
        this.initData = new InitDataResponse();
    }

    @Action({ commit: 'initSuccess' })
    public async init() {
        return await this.service.init();
    }

    @Mutation
    public async initSuccess(data: InitDataResponse) {
        if (!data.err) {
            this.initData = data;
        }
    }

    @Action({ commit: '_accessToken' })
    public async test(a: string) {
        console.log('atest', a);
        return a;
    }

    @Action({ commit: '_save' })
    public async testa(accessToken: string) {
        console.log('atesta', accessToken);
        return { accessToken };
    }
}
```typescript

```
// @/xxx/xxx/index.vue
import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { xxxStore } from '@/xxx/xxx/store';

@Component
export default class extends Vue {

    @State(state => state[xxxStore.id].accessToken)
    public accessToken!: string;

    @Action(xxxStore.action((props: xxxStore) => props.test))
    public test!: Function;

    @Action(xxxStore.action((props: xxxStore) => props.testa))
    public testa!: Function;

    public async created() {
        // await this.init();
        console.log(11111, this.accessToken);
        await this.test('aaaa');
        console.log(22222, this.accessToken);
        await this.testa('asdasde');
        console.log(33333, this.accessToken);
    }
}
```typescript
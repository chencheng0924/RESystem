//定義Storage Key
class StorageKeys {
    public recently_agents: string = 'RecentlyAgents' // login access token
}

enum StorageType {
    l = 'localStorage',
    s = 'sessionStorage'
}

class MaasStorage {
    public storage: Storage
    constructor(type: StorageType) {
        this.storage = type === StorageType.l ? window.localStorage : window.sessionStorage
    }
    public set(key: string, value: any) {
        const data = JSON.stringify(value)
        this.storage.setItem(key, data)
    }
    public get(key: string) {
        const value = this.storage.getItem(key)
        if (value) {
            return JSON.parse(value)
        }
    }
    public delete(key: string) {
        this.storage.removeItem(key)
    }
    public clear() {
        this.storage.clear()
    }
}

class RecentlyAgentsLS {
    public recentlyAgents: Array<any[]>
    constructor() {
        this.recentlyAgents = LStorage.get(GetStorageKeys.recently_agents) || []
    }
    public setData(item?: any) {
        if (this.recentlyAgents.length < 3) {
            this.recentlyAgents.unshift(item)
        } else {
            this.recentlyAgents.pop()
            this.recentlyAgents.unshift(item)
        }

        this.recentlyAgents = this.recentlyAgents.groupBy(x => x['id']).map(x => x.members.firstOrDefault());

        LStorage.set(GetStorageKeys.recently_agents, this.recentlyAgents)
        return this
    }
}

const LStorage = new MaasStorage(StorageType.l)
const SStorage = new MaasStorage(StorageType.s)
const GetStorageKeys = new StorageKeys()
export { LStorage, SStorage, GetStorageKeys, RecentlyAgentsLS }
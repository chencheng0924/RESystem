import { defineStore } from "pinia";

export const UPPreferenceStore = defineStore('UserProfilePreferenceStore', {
    persist: true,
    state: () => (
        {
            TenantEntity: { id: '30261659951063040', name: '鴻海' },
            PageRowLimit: 100,
            UserEntity: {}
        }),
    getters: {
    },
    actions: {
        getTenant() {
            return this.TenantEntity;
        },
        setUserEntity(user) {

            this.UserEntity = user;
        },
        getUserEntity() {
            return this.UserEntity;
        }
    },
});

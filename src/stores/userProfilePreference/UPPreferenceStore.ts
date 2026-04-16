import { defineStore } from "pinia";
import { UPPreference } from "./UPPreferenceStore.moel";
import { TenantEntity } from "@/model/entity/TenantEntity";

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
        getTenant(): TenantEntity {
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

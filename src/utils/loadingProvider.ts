import { ref, provide, inject, Ref } from 'vue'

export class LoadingManager {
    // 保存 LoadingManager 的單一實例
    private static instance: LoadingManager
    // 用於 provide/inject 的唯一 key
    private static readonly loadingKey = Symbol('loading')

    // 內部的 loading 狀態，使用 Vue 的 ref 來使其具有響應性
    private _isLoading: Ref<boolean>

    // 私有構造函數，防止直接實例化
    private constructor() {
        this._isLoading = ref(false)
    }

    // 獲取 LoadingManager 實例的靜態方法（單例模式）
    public static getInstance(): LoadingManager {
        if (!LoadingManager.instance) {
            LoadingManager.instance = new LoadingManager()
        }
        return LoadingManager.instance
    }

    // 提供 LoadingManager 實例給 Vue 的依賴注入系統
    public provide(): void {
        provide(LoadingManager.loadingKey, this)
    }

    // 從 Vue 的依賴注入系統中獲取 LoadingManager 實例
    public static inject(): LoadingManager {
        const loading = inject(LoadingManager.loadingKey)
        if (!loading) {
            throw new Error('LoadingManager must be provided before it can be injected')
        }
        return loading as LoadingManager
    }

    // 開始 loading
    public startLoading(): void {
        this._isLoading.value = true
    }

    // 停止 loading
    public stopLoading(): void {
        this._isLoading.value = false
    }

    // 獲取當前 loading 狀態的 getter
    public get isLoading(): Ref<boolean> {
        return this._isLoading
    }
}
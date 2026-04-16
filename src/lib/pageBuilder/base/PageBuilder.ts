

import { onMounted, onUnmounted, ref, Ref } from 'vue';
import { PageMapClass } from '../Page.mapclass';
import { ComponentConvert, PageSectionFactory } from '../adapter/primevue.adapter';
import { PageSection } from '../core/PageSection';
import { PageView } from '../core/PageView';

import { DateExtension } from '@/utils/dateExtension';
import { PageSecurityFactory } from './PageSecurityFactory';
import { PageSecurityItemBase } from '../core/PageSecurityItem';
import { PageRouter } from '../core/PageBase';
import { UPPreferenceStore } from '@/stores/userProfilePreference/UPPreferenceStore';

import { PageTitleStore } from '@/stores/PageTitle/PageTitleStore';

import { emitter } from '@/composables/mitt/mitt'
import { PageLayoutEnum } from '../enum/PageLayoutEnum';

export class PageBuilder {

    userStore = UPPreferenceStore();
    pageTitleStore = PageTitleStore();
    public secs?: Ref<Array<PageSection>>;
    public visibleRight?: Ref<boolean>;
    public pageView?: Ref<PageView>;
    private mapping?: PageMapClass;
    private security?: PageSecurityFactory;

    private locale?: any;
    private $t?: any;
    private $route?: any;//url 參數
    private $router?: any;//路由
    constructor(t, locale, route, router, isAutoMap: boolean = true) {
        this.locale = locale;
        this.$t = t;
        this.$route = route;
        this.$router = router;
        //this.layout = ref(new PageViewLayout());
        this.pageView = ref(new PageView());
        this.secs = ref([]);
        this.visibleRight = ref(false);
        this.security = new PageSecurityFactory();

        this.mapping = new PageMapClass();

        if (isAutoMap)
            this.convertClassNameAndPkid();

    }

    async convertClassNameAndPkid() {
        const className = this.$route.name;
        const paras: string = this.$route.params?.data;
        const path = this.$route.path;
        let type = '';
        let pkid = '';
        if (paras != undefined && paras != null && paras.length > 0) {
            const datas = paras[0];
            pkid = datas;
        }
        let lastName = className;
        if (lastName == "")
            return;

        await this.getInit(lastName, pkid);
    }

    async getInit(className: string, pkid?: string) {
        this.security.getSecurityDatas();

        let self = this;
        this.pageView.value = this.mapping.getPageView(className);
        let view = this.pageView;
        view.value.setLocalize(this.$t, this.locale)
        await view.value.SetInitData(pkid, className);
        this.pageTitleStore.pageTitleItem.Title = view.value.Title;
        this.pageTitleStore.pageTitleItem.IsBack = view.value.IsBack;



        let userBase = new PageSecurityItemBase()
        let pageParameter = new PageRouter().setRouteParams(pkid)
        let entityType = pageParameter.getParamSource();
        entityType = entityType == '' ? className : entityType;
        // 記錄
        let ritem = view.value.getPageRecentItem();
        if (ritem != null) {
            const path = this.$route.path;
            ritem.setUrl(path.substring(1).toUrl());
            ritem.setDate(DateExtension.getDateFormat(new Date()));//當前時間

            userBase.setStatus(ritem.StatusId);
        }

        //let userEntity: UsrEntity = new UsrEntity(this.userStore.getUserEntity());

        // userBase.convertToPageSecurityType(view.value.PageType)
        //     .setEntityType(entityType)
        //     .setDepartment(userEntity?.getDepartmentsByOne());

        this.security.setUserBase(userBase);

        // 從 Page Data to 元件資料
        this.convertComp(view.value);
        // 轉換彈窗
        this.updateDrawerSection();
        this.updateDialogSection();

    }
    convertComp(view) {

        let self = this;
        view.PageSections.forEach(x => {
            x = self.security.setSecurityBySection(x);
            x = PageSectionFactory.toPrimVueComp(self, view, x);

        });
        view.EntitySections.forEach(x => {
            x = self.security.setSecurityBySection(x);
            x = PageSectionFactory.toPrimVueComp(self, view, x);
        });
    }

    updateDrawerSection() {
        let self = this;
        let view = this.pageView;
        view.value.DrawerView.DrawerSection = PageSectionFactory.toPrimVueComp(self, view.value, view.value.DrawerView.DrawerSection);
    }
    updateDialogSection() {
        let self = this;
        let view = this.pageView;
        view.value.DialogView.DialogSection = PageSectionFactory.toPrimVueComp(self, view.value, view.value.DialogView.DialogSection);
    }
    updateView(view) {

        this.convertComp(view);
        this.pageView.value = view;
    }
    updateEntitySection(view, path) {
        let self = this;
        view.EntitySections.forEach(x => {
            if (path == x.Path) {
                x = self.security.setSecurityBySection(x);
                x = PageSectionFactory.toPrimVueComp(self, view, x);
            }

        });
    }
    updatePageSection(view, path) {
        let self = this;
        view.PageSections.forEach(x => {
            if (path == x.Path) {
                x = self.security.setSecurityBySection(x);
                x = PageSectionFactory.toPrimVueComp(self, view, x);
            }

        });
    }
    updateEntitySectionByOther(view, path) {
        let self = this;
        view.EntitySections.forEach(x => {
            if (path != x.Path) {
                x = self.security.setSecurityBySection(x);
                x = PageSectionFactory.toPrimVueComp(self, view, x);
            }

        });
    }

    updateViewByEntity(view) {
        let self = this;
        view.EntitySections.forEach(x => {
            x = self.security.setSecurityBySection(x);
            x = PageSectionFactory.toPrimVueComp(self, view, x);
        });
        this.pageView.value = view;
    }
    async saveEntitySection(sec) {
        let self = this;
        await self.pageView.value.SetEvent_SaveAction(sec);
        // this.convertComp(self.pageView.value);
        this.updateView(self.pageView.value)
    }

    getComponent(sec: PageSection) {
        return ComponentConvert.getComponent(sec)
    }

    getEntitySectionByLeft() {
        if (this.pageView.value == null)
            return [];
        if (this.pageView.value.EntitySections == null || this.pageView.value.EntitySections.length == 0)
            return []
        return this.pageView.value.EntitySections.filter(x => x.LayoutType == PageLayoutEnum.LEFT)
    }
    getEntitySectionByRight() {
        if (this.pageView.value == null)
            return [];
        if (this.pageView.value.EntitySections == null || this.pageView.value.EntitySections.length == 0)
            return []
        return this.pageView.value.EntitySections.filter(x => x.LayoutType == PageLayoutEnum.RIGHT)
    }
    getEntitySectionByMiddle() {
        if (this.pageView.value == null)
            return [];
        if (this.pageView.value.EntitySections == null || this.pageView.value.EntitySections.length == 0)
            return []
        return this.pageView.value.EntitySections.filter(x => x.LayoutType == PageLayoutEnum.MIDDLE)
    }

    isMiddleEntitySection() {
        let secs = this.getEntitySectionByMiddle();
        if (secs.length == 0)
            return false;


        return true;
    }
    isRightEntitySection() {
        let secs = this.getEntitySectionByRight();
        if (secs.length == 0)
            return false;


        return true;
    }

    //----------------------------------------------------------------------------------------


    // =================================================================
    // Mitt 設置
    // =================================================================

    setMittUpdateViewEvent(view) {
        // 預設開啟監聽default:updateView
        // 設定之後, 在onUnmounted也會全部自動銷毀
        onMounted(() => {
            emitter.on('default:updateView', () => {
                this.updateView(view)
            })
            emitter.on('default:updateEntitySection', (path) => {
                this.updateEntitySection(view, path)
            })
        })

        onUnmounted(() => {
            emitter.all.clear()
        })
    }
}


export class DrawerControllerViewStore {
    static controllerViewKey = 'DrawerControllerViewStore';
    static setControllrt(controller: any) {
        window[DrawerControllerViewStore.controllerViewKey] = controller
    }
    static getController() {
        return window[DrawerControllerViewStore.controllerViewKey];
    }
}
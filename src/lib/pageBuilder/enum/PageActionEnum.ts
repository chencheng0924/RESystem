export enum PageActionEnum {
    EntitySave,
    EntityDelete,
    EntityStartFlow,
    EntityApprovalFlow,
    EntityInvalid,

}
export enum PageTableActionEnum {
    TableRowEdit,
    TableRowDelete,
    TableRowAdd,
    TableDeletes,// 批次删
    TableRowEditRestraint,
    TableClone,
    TableOk,
    TableCancel,
    TableRowView,
    TableRowDownload,
    TableRowFileOpen,
    TableImport,
    TableExport,
    TableDownload,
    TableRowAddImage,
    TableStopUse,

    PageLink,//
    PageAction,//

    TreeNodeAction,
    SignOut,
    SignIn,
    TableRowEnable,
    TableRowScore,
    TableCustom,
    TableRowResetPassword,
    Divider

}

export enum PageWFActionEnum {
    WFSave,//保存
    WFReset,//重新定位
    WFToggleDark,//切換 dark or light

}
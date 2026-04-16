export interface IEntityPKID {
    id?: string
}


export interface IEntityDomian {
    domain?: string
    entityType?: string
}

export interface IEntityBasic extends IEntityPKID, IEntityDomian {

} 
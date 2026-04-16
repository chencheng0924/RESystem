export class PageVersionProps {
    data?: VersionRecord[];
    constructor(init?: Partial<PageVersionProps>) {
        Object.assign(this, init);
    }
}

export class VersionUser {
    name: string;
    avatar?: string;
    userId?: string;
    constructor(init?: Partial<VersionUser>) {
        Object.assign(this, init);
    }
}

export class VersionRecord {
    id: string;
    timestamp: Date | string;
    users: VersionUser[];
    description?: string;
    isCurrent?: boolean;
    constructor(init?: Partial<VersionRecord>) {
        Object.assign(this, init);
    }
}
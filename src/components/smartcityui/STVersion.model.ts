export class STVersionProps {
    data?: VersionRecord[];
    constructor(init?: Partial<STVersionProps>) {
        Object.assign(this, init);
    }
}

export class VersionUser {
    name: string;
    avatar?: string;
    userId?: string;
}

export class VersionRecord {
    id: string;
    timestamp: Date | string;
    users: VersionUser[];
    description?: string;
    isCurrent?: boolean;
}

export class GroupedVersionRecord {
    timeLabel: string;
    timestamp: Date | string;
    users: VersionUser[];
    isCurrent?: boolean;
}
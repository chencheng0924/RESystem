

export class PageSchedulingGantt {
    Id?: string;
    Name?: string;
    IsExpanded?: Boolean = true;
    Routes?: Array<PageRoute>;

    constructor(init?: Partial<PageSchedulingGantt>) {
        Object.assign(this, init)
    }
}

export class PageRoute {
    Driver?: PageDriverInfo;
    Schedule?: Array<PageBusSchedule>
    constructor(init?: Partial<PageRoute>) {
        Object.assign(this, init)
    }

    setDriverData(direction: string, data: any, entity: any) {
        this.Driver = new PageDriverInfo().setDriverData(direction, data, entity)
        return this
    }

    setScheduleData(direction: string, data: any, entity: any) {
        this.Schedule = [new PageBusSchedule().setScheduleData(direction, data, entity)]
        return this
    }

    compareTabIDAndWeek(dataList: Array<any>, tabID: string, week: number) {
        if(
            (tabID === 'monday' && week === 1 ) ||
            (tabID === 'tuesday' && week === 2) ||
            (tabID === 'wednesday' && week === 3) ||
            (tabID === 'thursday' && week === 4) ||
            (tabID === 'friday' && week === 5) ||
            (tabID === 'saturday' && week === 6) ||
            (tabID === 'sunday' && week === 7)
        ) {
                dataList.push(this)
        }
        return this
    }
}

export class PageDriverInfo {
    Id?: string;
    Name?: string;
    Avator?: string;
    Hours?: string;
    constructor(init?: Partial<PageDriverInfo>) {
        Object.assign(this, init)
    }

    setDriverData(direction: string, data: any, entity: any) {
        this.Id = `${direction}-${data.sequence} | ${data.startTime}`
        this.Name = entity.subRouteName
        return this
    }
}


export class PageBusSchedule {
    Route?: string;
    EstimatedDeparture?: string;  //預計出發
    EstimatedArrival?: string;
    ActualDeparture?: string;    //實際抵達
    ActualArrival?: string;
    Station?: string;
    Status?: string;
    Direction?: string;
    ChargingStation?: string;
    ChargingTime?: string;
    Remark?: string; //備註
    constructor(init?: Partial<PageBusSchedule>) {
        Object.assign(this, init)
    }

    setScheduleData(direction: string, data: any, entity: any) {
        this.Route = entity.subRouteName
        this.EstimatedDeparture = data.startTime
        this.EstimatedArrival = data.endTime
        this.Status = direction
        this.Direction = direction
        return this
    }
}
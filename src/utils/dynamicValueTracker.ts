import { Ref, ref } from 'vue'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)


export enum UNIT {
    UNIT,
    SECOND,
    MINUTE,
    HOUR
}

export enum VALUE_TYPE {
    NUMBER,
    TIME
}

export class TrackerManager {
    private trackers: DynamicValueTracker[] = []

    addTracker(tracker: DynamicValueTracker) {
        this.trackers.push(tracker)
        return tracker
    }

    pauseAll() {
        this.trackers.forEach(tracker => tracker.pause())
    }

    startAll() {
        this.trackers.forEach(tracker => tracker.start())
    }

    resetAll() {
        this.trackers.forEach(tracker => tracker.reset())
    }
}

export class DynamicValueTracker {
    private defaultValue: number
    private currentValue: number
    private interval: ReturnType<typeof setInterval> | null
    private incrementUnit: UNIT
    private incrementValue: number
    private updateFrequency: number
    private decimalPlaces: number
    private timeFormat: string
    private valueType: VALUE_TYPE
    public formattedValue: Ref<string>

    constructor() {
        this.defaultValue = 0
        this.currentValue = 0
        this.interval = null
        this.incrementUnit = UNIT.UNIT
        this.incrementValue = 1
        this.updateFrequency = 1000
        this.decimalPlaces = 0
        this.timeFormat = 'HH:mm:ss'
        this.valueType = VALUE_TYPE.NUMBER,
        this.formattedValue = ref('')
    }

    createNumberTracker(
        initialValue: number,
        decimalPlaces: number = 0,
        incrementUnit: UNIT = UNIT.UNIT,
        incrementValue: number = 1,
        updateFrequency: number = 1000
    ): DynamicValueTracker {
        this.init(initialValue, VALUE_TYPE.NUMBER, incrementUnit, incrementValue, updateFrequency)
        this.decimalPlaces = decimalPlaces
        return this
    }

    createTimeTracker(
        initialValueInSeconds: number,
        timeFormat: string = 'HH:mm:ss',
        incrementUnit: UNIT = UNIT.SECOND,
        incrementValue: number = 1,
        updateFrequency: number = 1000
    ): DynamicValueTracker {
        this.init(initialValueInSeconds, VALUE_TYPE.TIME, incrementUnit, incrementValue, updateFrequency)
        this.timeFormat = timeFormat
        return this
    }

    static toSeconds(hours: number, minutes: number, seconds: number = 0): number {
        return hours * 3600 + minutes * 60 + seconds
    }

    private init(
        initialValue: number,
        valueType: VALUE_TYPE,
        incrementUnit: UNIT,
        incrementValue: number,
        updateFrequency: number
    ) {
        this.defaultValue = initialValue
        this.currentValue = initialValue
        this.valueType = valueType
        this.incrementUnit = incrementUnit
        this.incrementValue = incrementValue
        this.updateFrequency = updateFrequency
        this.formattedValue.value = this.formatValue(this.currentValue)
    }

    private formatValue(value: number): string {
        if (this.valueType === VALUE_TYPE.NUMBER) {
            return value.toFixed(this.decimalPlaces)
        } else {
            return dayjs.duration(value, 'second').format(this.timeFormat)
        }
    }

    private getIncrement(): number {
        switch (this.incrementUnit) {
            case UNIT.UNIT: return this.incrementValue
            case UNIT.SECOND: return this.incrementValue
            case UNIT.MINUTE: return this.incrementValue * 60
            case UNIT.HOUR: return this.incrementValue * 3600
        }
    }

    start(): DynamicValueTracker {
        if (!this.interval) {
            const increment = this.getIncrement()
            this.interval = setInterval(() => {
                this.currentValue += increment
                this.formattedValue.value = this.formatValue(this.currentValue)
            }, this.updateFrequency)
        }
        return this
    }

    pause(): DynamicValueTracker {
        if (this.interval) {
            clearInterval(this.interval)
            this.interval = null
        }
        return this
    }

    reset(): DynamicValueTracker {
        this.pause()
        this.currentValue = this.defaultValue
        this.formattedValue.value = this.formatValue(this.currentValue)
        return this
    }

    setConfig(incrementUnit: UNIT, incrementValue: number, updateFrequency: number): DynamicValueTracker {
        if (this.valueType === VALUE_TYPE.NUMBER && incrementUnit !== UNIT.UNIT) {
            incrementUnit = UNIT.UNIT
        }
        this.incrementUnit = incrementUnit
        this.incrementValue = incrementValue
        this.updateFrequency = updateFrequency
        this.reset()
        if (this.interval) {
            this.start() // 如果之前在運行，則重新啟動以應用新的配置
        }
        return this
    }

    setDecimalPlaces(places: number): DynamicValueTracker {
        if (this.valueType !== VALUE_TYPE.NUMBER) {
            throw new Error('setDecimalPlaces can only be used with number trackers')
        }
        this.decimalPlaces = places
        this.formattedValue.value = this.formatValue(this.currentValue)
        return this
    }

    setTimeFormat(format: string): DynamicValueTracker {
        if (this.valueType !== VALUE_TYPE.TIME) {
            throw new Error('setTimeFormat can only be used with time trackers')
        }
        this.timeFormat = format
        this.formattedValue.value = this.formatValue(this.currentValue)
        return this
    }

    getCurrentValue(): number {
        return this.currentValue
    }

    setDefaultValue(newDefault: number): DynamicValueTracker {
        this.defaultValue = newDefault
        this.reset()
        return this
    }
}
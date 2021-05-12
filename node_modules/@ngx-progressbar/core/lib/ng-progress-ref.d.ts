import { NgProgressState, NgProgressConfig } from './ng-progress.interface';
import { Observable } from 'rxjs';
export declare class NgProgressRef {
    private _onDestroyCallback;
    /** Stream that emits when progress state is changed */
    private readonly _state;
    state: Observable<NgProgressState>;
    /** Stream that emits when config is changed */
    private readonly _config;
    config: Observable<NgProgressState>;
    /** Stream that increments and updates progress state */
    private readonly _trickling;
    /** Stream that combines "_trickling" and "config" streams */
    private readonly _worker;
    /** Get current progress state */
    private readonly currState;
    /** Check if progress has started */
    readonly isStarted: boolean;
    /** Progress start event */
    readonly started: Observable<boolean>;
    /** Progress ended event */
    readonly completed: Observable<boolean>;
    constructor(customConfig: NgProgressConfig, _onDestroyCallback: Function);
    /**
     * Start the progress
     */
    start(): void;
    /**
     * Complete the progress
     */
    complete(): void;
    /**
     * Increment the progress
     * @param amount
     */
    inc(amount?: number): void;
    /**
     * Set the progress
     * @param n
     */
    set(n: number): void;
    /**
     * Set config
     * @param config
     */
    setConfig(config: NgProgressConfig): void;
    /**
     * Destroy progress reference
     */
    destroy(): void;
    /**
     * Set progress state
     * @param state
     */
    private setState;
    /**
     * Clamps a value to be between min and max
     * @param n
     */
    private clamp;
    /**
     * Keeps incrementing the progress
     * @param config
     */
    private onTrickling;
    /**
     * Completes then resets the progress
     * @param config
     */
    private onComplete;
}

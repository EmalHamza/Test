import { CommonModule } from '@angular/common';
import { Subject, BehaviorSubject, timer, of, combineLatest, Subscription } from 'rxjs';
import { tap, map, skip, delay, filter, debounce, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { InjectionToken, Injectable, Inject, Optional, NgModule, Component, Input, Output, ChangeDetectionStrategy, EventEmitter, ViewEncapsulation, defineInjectable, inject } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgProgressRef {
    /**
     * @param {?} customConfig
     * @param {?} _onDestroyCallback
     */
    constructor(customConfig, _onDestroyCallback) {
        this._onDestroyCallback = _onDestroyCallback;
        /**
         * Stream that increments and updates progress state
         */
        this._trickling = new Subject();
        /**
         * Stream that combines "_trickling" and "config" streams
         */
        this._worker = Subscription.EMPTY;
        this._state = new BehaviorSubject({ active: false, value: 0 });
        this._config = new BehaviorSubject(customConfig);
        this.state = this._state.asObservable();
        this.config = this._state.asObservable();
        this._worker = combineLatest(this._trickling, this._config).pipe(debounce((/**
         * @param {?} __0
         * @return {?}
         */
        ([start, config]) => timer(start ? config.debounceTime : 0))), switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([start, config]) => start ? this.onTrickling(config) : this.onComplete(config)))).subscribe();
    }
    /**
     * Get current progress state
     * @private
     * @return {?}
     */
    get currState() {
        return this._state.value;
    }
    /**
     * Check if progress has started
     * @return {?}
     */
    get isStarted() {
        return this.currState.active;
    }
    /**
     * Progress start event
     * @return {?}
     */
    get started() {
        return this._state.pipe(map((/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.active)), distinctUntilChanged(), filter((/**
         * @param {?} active
         * @return {?}
         */
        active => active)));
    }
    /**
     * Progress ended event
     * @return {?}
     */
    get completed() {
        return this._state.pipe(map((/**
         * @param {?} state
         * @return {?}
         */
        (state) => state.active)), distinctUntilChanged(), filter((/**
         * @param {?} active
         * @return {?}
         */
        active => !active)), skip(1));
    }
    /**
     * Start the progress
     * @return {?}
     */
    start() {
        this._trickling.next(true);
    }
    /**
     * Complete the progress
     * @return {?}
     */
    complete() {
        this._trickling.next(false);
    }
    /**
     * Increment the progress
     * @param {?=} amount
     * @return {?}
     */
    inc(amount) {
        /** @type {?} */
        const n = this.currState.value;
        if (!this.isStarted) {
            this.start();
        }
        else {
            if (typeof amount !== 'number') {
                amount = this._config.value.trickleFunc(n);
            }
            this.set(n + amount);
        }
    }
    /**
     * Set the progress
     * @param {?} n
     * @return {?}
     */
    set(n) {
        this.setState({ value: this.clamp(n), active: true });
    }
    /**
     * Set config
     * @param {?} config
     * @return {?}
     */
    setConfig(config) {
        this._config.next(Object.assign({}, this._config.value, config));
    }
    /**
     * Destroy progress reference
     * @return {?}
     */
    destroy() {
        this._worker.unsubscribe();
        this._trickling.complete();
        this._state.complete();
        this._config.complete();
        this._onDestroyCallback();
    }
    /**
     * Set progress state
     * @private
     * @param {?} state
     * @return {?}
     */
    setState(state) {
        this._state.next(Object.assign({}, this.currState, state));
    }
    /**
     * Clamps a value to be between min and max
     * @private
     * @param {?} n
     * @return {?}
     */
    clamp(n) {
        return Math.max(this._config.value.min, Math.min(this._config.value.max, n));
    }
    /**
     * Keeps incrementing the progress
     * @private
     * @param {?} config
     * @return {?}
     */
    onTrickling(config) {
        if (!this.isStarted) {
            this.set(this._config.value.min);
        }
        return timer(0, config.trickleSpeed).pipe(tap((/**
         * @return {?}
         */
        () => this.inc())));
    }
    /**
     * Completes then resets the progress
     * @private
     * @param {?} config
     * @return {?}
     */
    onComplete(config) {
        return !this.isStarted ? of({}) : of({}).pipe(
        // Completes the progress
        tap((/**
         * @return {?}
         */
        () => this.setState({ value: 100 }))), 
        // Hides the progress bar after a tiny delay
        delay(config.speed * 1.7), tap((/**
         * @return {?}
         */
        () => this.setState({ active: false }))), 
        // Resets the progress state
        delay(config.speed), tap((/**
         * @return {?}
         */
        () => this.setState({ value: 0 }))));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const NG_PROGRESS_CONFIG = new InjectionToken('ngProgressConfig');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
const ɵ0 = /**
 * @param {?} n
 * @return {?}
 */
(n) => {
    if (n >= 0 && n < 20)
        return 10;
    if (n >= 20 && n < 50)
        return 4;
    if (n >= 50 && n < 80)
        return 2;
    if (n >= 80 && n < 99)
        return 0.5;
    return 0;
};
/** @type {?} */
const defaultConfig = {
    min: 8,
    max: 100,
    speed: 200,
    debounceTime: 0,
    trickleSpeed: 300,
    fixed: true,
    meteor: true,
    thick: false,
    spinner: true,
    ease: 'linear',
    color: '#1B95E0',
    direction: 'ltr+',
    spinnerPosition: 'right',
    trickleFunc: (ɵ0)
};
class NgProgress {
    /**
     * @param {?} config
     */
    constructor(config) {
        /**
         * Store progress bar instances
         */
        this._instances = new Map();
        this.config = config ? Object.assign({}, defaultConfig, config) : defaultConfig;
    }
    /**
     * Get or Create progress bar by ID
     * @param {?=} id
     * @param {?=} config
     * @return {?}
     */
    ref(id = 'root', config) {
        if (this._instances.has(id)) {
            // Get ProgressRef instance
            /** @type {?} */
            const progressRef = this._instances.get(id);
            if (config) {
                progressRef.setConfig(Object.assign({}, this.config, config));
            }
            return progressRef;
        }
        else {
            // Create new ProgressRef instance
            /** @type {?} */
            const progressRef = new NgProgressRef(Object.assign({}, this.config, config), this.deleteInstance(id));
            return this._instances.set(id, progressRef).get(id);
        }
    }
    /**
     * Destroy all progress bar instances
     * @return {?}
     */
    destroyAll() {
        this._instances.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        (ref) => ref.destroy()));
    }
    /**
     * A destroyer function for each progress bar instance
     * @private
     * @param {?} id
     * @return {?}
     */
    deleteInstance(id) {
        return (/**
         * @return {?}
         */
        () => {
            this._instances.delete(id);
        });
    }
}
NgProgress.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgProgress.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NG_PROGRESS_CONFIG,] }] }
];
/** @nocollapse */ NgProgress.ngInjectableDef = defineInjectable({ factory: function NgProgress_Factory() { return new NgProgress(inject(NG_PROGRESS_CONFIG, 8)); }, token: NgProgress, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgProgressComponent {
    /**
     * @param {?} _ngProgress
     */
    constructor(_ngProgress) {
        this._ngProgress = _ngProgress;
        this._started = Subscription.EMPTY;
        this._completed = Subscription.EMPTY;
        /**
         * Creates a new instance if id is not already exists
         */
        this.id = 'root';
        /**
         * Initializes inputs from the global config
         */
        this.min = this._ngProgress.config.min;
        this.max = this._ngProgress.config.max;
        this.ease = this._ngProgress.config.ease;
        this.color = this._ngProgress.config.color;
        this.speed = this._ngProgress.config.speed;
        this.thick = this._ngProgress.config.thick;
        this.fixed = this._ngProgress.config.fixed;
        this.meteor = this._ngProgress.config.meteor;
        this.spinner = this._ngProgress.config.spinner;
        this.trickleSpeed = this._ngProgress.config.trickleSpeed;
        this.debounceTime = this._ngProgress.config.debounceTime;
        this.trickleFunc = this._ngProgress.config.trickleFunc;
        this.spinnerPosition = this._ngProgress.config.spinnerPosition;
        this.direction = this._ngProgress.config.direction;
        this.started = new EventEmitter();
        this.completed = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get isStarted() {
        return this.progressRef.isStarted;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.progressRef instanceof NgProgressRef) {
            // Update progress bar config when inputs change
            this.progressRef.setConfig({
                max: (this.max > 0 && this.max <= 100) ? this.max : 100,
                min: (this.min < 100 && this.min >= 0) ? this.min : 0,
                speed: this.speed,
                trickleSpeed: this.trickleSpeed,
                trickleFunc: this.trickleFunc,
                debounceTime: this.debounceTime
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Get progress bar service instance
        this.progressRef = this._ngProgress.ref(this.id, {
            max: this.max,
            min: this.min,
            speed: this.speed,
            trickleSpeed: this.trickleSpeed,
            debounceTime: this.debounceTime
        });
        // Subscribe to progress state
        this.state$ = this.progressRef.state.pipe(map((/**
         * @param {?} state
         * @return {?}
         */
        (state) => ({
            active: state.active,
            transform: `translate3d(${state.value}%,0,0)`
        }))));
        // Subscribes to started and completed events on deman
        if (this.started.observers.length) {
            this._started = this.progressRef.started.subscribe((/**
             * @return {?}
             */
            () => this.started.emit()));
        }
        if (this.completed.observers.length) {
            this._completed = this.progressRef.completed.subscribe((/**
             * @return {?}
             */
            () => this.completed.emit()));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._started.unsubscribe();
        this._completed.unsubscribe();
        if (this.progressRef instanceof NgProgressRef) {
            this.progressRef.destroy();
        }
    }
    /**
     * @return {?}
     */
    start() {
        this.progressRef.start();
    }
    /**
     * @return {?}
     */
    complete() {
        this.progressRef.complete();
    }
    /**
     * @param {?=} n
     * @return {?}
     */
    inc(n) {
        this.progressRef.inc(n);
    }
    /**
     * @param {?} n
     * @return {?}
     */
    set(n) {
        this.progressRef.set(n);
    }
}
NgProgressComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-progress',
                host: {
                    'role': 'progressbar',
                    '[attr.spinnerPosition]': 'spinnerPosition',
                    '[attr.dir]': 'direction',
                    '[attr.thick]': 'thick',
                    '[attr.fixed]': 'fixed'
                },
                template: `
    <ng-container *ngIf="state$ | async; let state">
      <div class="ng-progress-bar"
            [class.-active]="state.active"
            [style.transition]="'opacity ' + speed + 'ms ' + ease">
        <div class="ng-bar-placeholder">
          <div class="ng-bar"
                [style.transform]="state.transform"
                [style.backgroundColor]="color"
                [style.transition]="state.active ? 'all ' + speed + 'ms ' + ease : 'none'">
            <div *ngIf="meteor" class="ng-meteor" [style.boxShadow]="'0 0 10px '+ color + ', 0 0 5px ' + color"></div>
          </div>
        </div>
        <div *ngIf="spinner" class="ng-spinner">
          <div class="ng-spinner-icon"
                [style.borderTopColor]="color"
                [style.borderLeftColor]="color"></div>
        </div>
      </div>
    </ng-container>
  `,
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                styles: ["ng-progress{z-index:999999;pointer-events:none}ng-progress[fixed=true] .ng-progress-bar,ng-progress[fixed=true] .ng-spinner{position:fixed}ng-progress[fixed=true] .ng-spinner{top:15px}ng-progress[fixed=true][spinnerPosition=left] .ng-spinner{left:15px}ng-progress[fixed=true][spinnerPosition=right] .ng-spinner{right:15px}ng-progress[thick=true] .ng-spinner-icon{width:24px;height:24px;border-width:3px}ng-progress[thick=true] .ng-bar-placeholder{height:3px!important}ng-progress[dir='ltr+'] .ng-meteor,ng-progress[dir=ltr-] .ng-meteor{-webkit-transform:rotate(3deg);transform:rotate(3deg)}ng-progress[dir='ltr+'][thick=true] .ng-meteor,ng-progress[dir=ltr-][thick=true] .ng-meteor{-webkit-transform:rotate(4deg);transform:rotate(4deg)}ng-progress[dir='ltr+'] .ng-bar,ng-progress[dir='rtl+'] .ng-bar{margin-left:-100%}ng-progress[dir='ltr+'] .ng-meteor,ng-progress[dir='rtl+'] .ng-meteor{right:0}ng-progress[dir='ltr+'] .ng-meteor,ng-progress[dir=rtl-] .ng-meteor{top:-3px}ng-progress[dir='ltr+'][thick=true] .ng-meteor,ng-progress[dir=rtl-][thick=true] .ng-meteor{top:-4px}ng-progress[dir='rtl+'] .ng-meteor,ng-progress[dir=ltr-] .ng-meteor{bottom:-3px}ng-progress[dir='rtl+'][thick=true] .ng-meteor,ng-progress[dir=ltr-][thick=true] .ng-meteor{bottom:-4px}ng-progress[dir='rtl+'] .ng-bar-placeholder,ng-progress[dir=ltr-] .ng-bar-placeholder{-webkit-transform:rotate(180deg);transform:rotate(180deg)}ng-progress[dir='rtl+'] .ng-spinner-icon,ng-progress[dir=ltr-] .ng-spinner-icon{animation-direction:reverse}ng-progress[dir='rtl+'] .ng-meteor,ng-progress[dir=rtl-] .ng-meteor{-webkit-transform:rotate(-3deg);transform:rotate(-3deg)}ng-progress[dir='rtl+'][thick=true] .ng-meteor,ng-progress[dir=rtl-][thick=true] .ng-meteor{-webkit-transform:rotate(-4deg);transform:rotate(-4deg)}ng-progress[spinnerPosition=left] .ng-spinner{left:10px}ng-progress[spinnerPosition=right] .ng-spinner{right:10px}.ng-progress-bar{position:relative;z-index:999999;top:0;left:0;width:100%;zoom:1;opacity:0}.ng-progress-bar.-active{opacity:1;transition:none}.ng-bar-placeholder{position:absolute;height:2px;width:100%}.ng-bar{width:100%;height:100%;-webkit-transform:translate(-100%,0,0);transform:translate(-100%,0,0)}.ng-meteor{display:block;position:absolute;width:100px;height:100%;opacity:1}.ng-spinner{position:absolute;display:block;z-index:1031;top:10px}.ng-spinner-icon{width:18px;height:18px;box-sizing:border-box;-webkit-animation:250ms linear infinite spinner-animation;animation:250ms linear infinite spinner-animation;border:2px solid transparent;border-radius:50%}@-webkit-keyframes spinner-animation{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-animation{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}"]
            }] }
];
/** @nocollapse */
NgProgressComponent.ctorParameters = () => [
    { type: NgProgress }
];
NgProgressComponent.propDecorators = {
    id: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    ease: [{ type: Input }],
    color: [{ type: Input }],
    speed: [{ type: Input }],
    thick: [{ type: Input }],
    fixed: [{ type: Input }],
    meteor: [{ type: Input }],
    spinner: [{ type: Input }],
    trickleSpeed: [{ type: Input }],
    debounceTime: [{ type: Input }],
    trickleFunc: [{ type: Input }],
    spinnerPosition: [{ type: Input }],
    direction: [{ type: Input }],
    started: [{ type: Output }],
    completed: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgProgressModule {
    /**
     * @param {?} config
     * @return {?}
     */
    static withConfig(config) {
        return {
            ngModule: NgProgressModule,
            providers: [
                { provide: NG_PROGRESS_CONFIG, useValue: config }
            ]
        };
    }
}
NgProgressModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgProgressComponent],
                exports: [NgProgressComponent],
                imports: [CommonModule]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NgProgressModule, NgProgressComponent, NgProgressRef, NgProgress, NG_PROGRESS_CONFIG };

//# sourceMappingURL=ngx-progressbar-core.js.map
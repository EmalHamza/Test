import { CommonModule } from '@angular/common';
import { __assign, __read } from 'tslib';
import { Subject, BehaviorSubject, timer, of, combineLatest, Subscription } from 'rxjs';
import { tap, map, skip, delay, filter, debounce, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { InjectionToken, Injectable, Inject, Optional, NgModule, Component, Input, Output, ChangeDetectionStrategy, EventEmitter, ViewEncapsulation, defineInjectable, inject } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgProgressRef = /** @class */ (function () {
    function NgProgressRef(customConfig, _onDestroyCallback) {
        var _this = this;
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
        function (_a) {
            var _b = __read(_a, 2), start = _b[0], config = _b[1];
            return timer(start ? config.debounceTime : 0);
        })), switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = __read(_a, 2), start = _b[0], config = _b[1];
            return start ? _this.onTrickling(config) : _this.onComplete(config);
        }))).subscribe();
    }
    Object.defineProperty(NgProgressRef.prototype, "currState", {
        /** Get current progress state */
        get: /**
         * Get current progress state
         * @private
         * @return {?}
         */
        function () {
            return this._state.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgProgressRef.prototype, "isStarted", {
        /** Check if progress has started */
        get: /**
         * Check if progress has started
         * @return {?}
         */
        function () {
            return this.currState.active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgProgressRef.prototype, "started", {
        /** Progress start event */
        get: /**
         * Progress start event
         * @return {?}
         */
        function () {
            return this._state.pipe(map((/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.active; })), distinctUntilChanged(), filter((/**
             * @param {?} active
             * @return {?}
             */
            function (active) { return active; })));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgProgressRef.prototype, "completed", {
        /** Progress ended event */
        get: /**
         * Progress ended event
         * @return {?}
         */
        function () {
            return this._state.pipe(map((/**
             * @param {?} state
             * @return {?}
             */
            function (state) { return state.active; })), distinctUntilChanged(), filter((/**
             * @param {?} active
             * @return {?}
             */
            function (active) { return !active; })), skip(1));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Start the progress
     */
    /**
     * Start the progress
     * @return {?}
     */
    NgProgressRef.prototype.start = /**
     * Start the progress
     * @return {?}
     */
    function () {
        this._trickling.next(true);
    };
    /**
     * Complete the progress
     */
    /**
     * Complete the progress
     * @return {?}
     */
    NgProgressRef.prototype.complete = /**
     * Complete the progress
     * @return {?}
     */
    function () {
        this._trickling.next(false);
    };
    /**
     * Increment the progress
     * @param amount
     */
    /**
     * Increment the progress
     * @param {?=} amount
     * @return {?}
     */
    NgProgressRef.prototype.inc = /**
     * Increment the progress
     * @param {?=} amount
     * @return {?}
     */
    function (amount) {
        /** @type {?} */
        var n = this.currState.value;
        if (!this.isStarted) {
            this.start();
        }
        else {
            if (typeof amount !== 'number') {
                amount = this._config.value.trickleFunc(n);
            }
            this.set(n + amount);
        }
    };
    /**
     * Set the progress
     * @param n
     */
    /**
     * Set the progress
     * @param {?} n
     * @return {?}
     */
    NgProgressRef.prototype.set = /**
     * Set the progress
     * @param {?} n
     * @return {?}
     */
    function (n) {
        this.setState({ value: this.clamp(n), active: true });
    };
    /**
     * Set config
     * @param config
     */
    /**
     * Set config
     * @param {?} config
     * @return {?}
     */
    NgProgressRef.prototype.setConfig = /**
     * Set config
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this._config.next(__assign({}, this._config.value, config));
    };
    /**
     * Destroy progress reference
     */
    /**
     * Destroy progress reference
     * @return {?}
     */
    NgProgressRef.prototype.destroy = /**
     * Destroy progress reference
     * @return {?}
     */
    function () {
        this._worker.unsubscribe();
        this._trickling.complete();
        this._state.complete();
        this._config.complete();
        this._onDestroyCallback();
    };
    /**
     * Set progress state
     * @param state
     */
    /**
     * Set progress state
     * @private
     * @param {?} state
     * @return {?}
     */
    NgProgressRef.prototype.setState = /**
     * Set progress state
     * @private
     * @param {?} state
     * @return {?}
     */
    function (state) {
        this._state.next(__assign({}, this.currState, state));
    };
    /**
     * Clamps a value to be between min and max
     * @param n
     */
    /**
     * Clamps a value to be between min and max
     * @private
     * @param {?} n
     * @return {?}
     */
    NgProgressRef.prototype.clamp = /**
     * Clamps a value to be between min and max
     * @private
     * @param {?} n
     * @return {?}
     */
    function (n) {
        return Math.max(this._config.value.min, Math.min(this._config.value.max, n));
    };
    /**
     * Keeps incrementing the progress
     * @param config
     */
    /**
     * Keeps incrementing the progress
     * @private
     * @param {?} config
     * @return {?}
     */
    NgProgressRef.prototype.onTrickling = /**
     * Keeps incrementing the progress
     * @private
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        if (!this.isStarted) {
            this.set(this._config.value.min);
        }
        return timer(0, config.trickleSpeed).pipe(tap((/**
         * @return {?}
         */
        function () { return _this.inc(); })));
    };
    /**
     * Completes then resets the progress
     * @param config
     */
    /**
     * Completes then resets the progress
     * @private
     * @param {?} config
     * @return {?}
     */
    NgProgressRef.prototype.onComplete = /**
     * Completes then resets the progress
     * @private
     * @param {?} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        return !this.isStarted ? of({}) : of({}).pipe(
        // Completes the progress
        tap((/**
         * @return {?}
         */
        function () { return _this.setState({ value: 100 }); })), 
        // Hides the progress bar after a tiny delay
        delay(config.speed * 1.7), tap((/**
         * @return {?}
         */
        function () { return _this.setState({ active: false }); })), 
        // Resets the progress state
        delay(config.speed), tap((/**
         * @return {?}
         */
        function () { return _this.setState({ value: 0 }); })));
    };
    return NgProgressRef;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var NG_PROGRESS_CONFIG = new InjectionToken('ngProgressConfig');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ɵ0 = /**
 * @param {?} n
 * @return {?}
 */
function (n) {
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
var defaultConfig = {
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
var NgProgress = /** @class */ (function () {
    function NgProgress(config) {
        /**
         * Store progress bar instances
         */
        this._instances = new Map();
        this.config = config ? __assign({}, defaultConfig, config) : defaultConfig;
    }
    /**
     * Get or Create progress bar by ID
     * @param id
     * @param config
     */
    /**
     * Get or Create progress bar by ID
     * @param {?=} id
     * @param {?=} config
     * @return {?}
     */
    NgProgress.prototype.ref = /**
     * Get or Create progress bar by ID
     * @param {?=} id
     * @param {?=} config
     * @return {?}
     */
    function (id, config) {
        if (id === void 0) { id = 'root'; }
        if (this._instances.has(id)) {
            // Get ProgressRef instance
            /** @type {?} */
            var progressRef = this._instances.get(id);
            if (config) {
                progressRef.setConfig(__assign({}, this.config, config));
            }
            return progressRef;
        }
        else {
            // Create new ProgressRef instance
            /** @type {?} */
            var progressRef = new NgProgressRef(__assign({}, this.config, config), this.deleteInstance(id));
            return this._instances.set(id, progressRef).get(id);
        }
    };
    /**
     * Destroy all progress bar instances
     */
    /**
     * Destroy all progress bar instances
     * @return {?}
     */
    NgProgress.prototype.destroyAll = /**
     * Destroy all progress bar instances
     * @return {?}
     */
    function () {
        this._instances.forEach((/**
         * @param {?} ref
         * @return {?}
         */
        function (ref) { return ref.destroy(); }));
    };
    /**
     * A destroyer function for each progress bar instance
     */
    /**
     * A destroyer function for each progress bar instance
     * @private
     * @param {?} id
     * @return {?}
     */
    NgProgress.prototype.deleteInstance = /**
     * A destroyer function for each progress bar instance
     * @private
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        return (/**
         * @return {?}
         */
        function () {
            _this._instances.delete(id);
        });
    };
    NgProgress.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgProgress.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NG_PROGRESS_CONFIG,] }] }
    ]; };
    /** @nocollapse */ NgProgress.ngInjectableDef = defineInjectable({ factory: function NgProgress_Factory() { return new NgProgress(inject(NG_PROGRESS_CONFIG, 8)); }, token: NgProgress, providedIn: "root" });
    return NgProgress;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgProgressComponent = /** @class */ (function () {
    function NgProgressComponent(_ngProgress) {
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
    Object.defineProperty(NgProgressComponent.prototype, "isStarted", {
        get: /**
         * @return {?}
         */
        function () {
            return this.progressRef.isStarted;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgProgressComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    NgProgressComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
        function (state) { return ({
            active: state.active,
            transform: "translate3d(" + state.value + "%,0,0)"
        }); })));
        // Subscribes to started and completed events on deman
        if (this.started.observers.length) {
            this._started = this.progressRef.started.subscribe((/**
             * @return {?}
             */
            function () { return _this.started.emit(); }));
        }
        if (this.completed.observers.length) {
            this._completed = this.progressRef.completed.subscribe((/**
             * @return {?}
             */
            function () { return _this.completed.emit(); }));
        }
    };
    /**
     * @return {?}
     */
    NgProgressComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._started.unsubscribe();
        this._completed.unsubscribe();
        if (this.progressRef instanceof NgProgressRef) {
            this.progressRef.destroy();
        }
    };
    /**
     * @return {?}
     */
    NgProgressComponent.prototype.start = /**
     * @return {?}
     */
    function () {
        this.progressRef.start();
    };
    /**
     * @return {?}
     */
    NgProgressComponent.prototype.complete = /**
     * @return {?}
     */
    function () {
        this.progressRef.complete();
    };
    /**
     * @param {?=} n
     * @return {?}
     */
    NgProgressComponent.prototype.inc = /**
     * @param {?=} n
     * @return {?}
     */
    function (n) {
        this.progressRef.inc(n);
    };
    /**
     * @param {?} n
     * @return {?}
     */
    NgProgressComponent.prototype.set = /**
     * @param {?} n
     * @return {?}
     */
    function (n) {
        this.progressRef.set(n);
    };
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
                    template: "\n    <ng-container *ngIf=\"state$ | async; let state\">\n      <div class=\"ng-progress-bar\"\n            [class.-active]=\"state.active\"\n            [style.transition]=\"'opacity ' + speed + 'ms ' + ease\">\n        <div class=\"ng-bar-placeholder\">\n          <div class=\"ng-bar\"\n                [style.transform]=\"state.transform\"\n                [style.backgroundColor]=\"color\"\n                [style.transition]=\"state.active ? 'all ' + speed + 'ms ' + ease : 'none'\">\n            <div *ngIf=\"meteor\" class=\"ng-meteor\" [style.boxShadow]=\"'0 0 10px '+ color + ', 0 0 5px ' + color\"></div>\n          </div>\n        </div>\n        <div *ngIf=\"spinner\" class=\"ng-spinner\">\n          <div class=\"ng-spinner-icon\"\n                [style.borderTopColor]=\"color\"\n                [style.borderLeftColor]=\"color\"></div>\n        </div>\n      </div>\n    </ng-container>\n  ",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    styles: ["ng-progress{z-index:999999;pointer-events:none}ng-progress[fixed=true] .ng-progress-bar,ng-progress[fixed=true] .ng-spinner{position:fixed}ng-progress[fixed=true] .ng-spinner{top:15px}ng-progress[fixed=true][spinnerPosition=left] .ng-spinner{left:15px}ng-progress[fixed=true][spinnerPosition=right] .ng-spinner{right:15px}ng-progress[thick=true] .ng-spinner-icon{width:24px;height:24px;border-width:3px}ng-progress[thick=true] .ng-bar-placeholder{height:3px!important}ng-progress[dir='ltr+'] .ng-meteor,ng-progress[dir=ltr-] .ng-meteor{-webkit-transform:rotate(3deg);transform:rotate(3deg)}ng-progress[dir='ltr+'][thick=true] .ng-meteor,ng-progress[dir=ltr-][thick=true] .ng-meteor{-webkit-transform:rotate(4deg);transform:rotate(4deg)}ng-progress[dir='ltr+'] .ng-bar,ng-progress[dir='rtl+'] .ng-bar{margin-left:-100%}ng-progress[dir='ltr+'] .ng-meteor,ng-progress[dir='rtl+'] .ng-meteor{right:0}ng-progress[dir='ltr+'] .ng-meteor,ng-progress[dir=rtl-] .ng-meteor{top:-3px}ng-progress[dir='ltr+'][thick=true] .ng-meteor,ng-progress[dir=rtl-][thick=true] .ng-meteor{top:-4px}ng-progress[dir='rtl+'] .ng-meteor,ng-progress[dir=ltr-] .ng-meteor{bottom:-3px}ng-progress[dir='rtl+'][thick=true] .ng-meteor,ng-progress[dir=ltr-][thick=true] .ng-meteor{bottom:-4px}ng-progress[dir='rtl+'] .ng-bar-placeholder,ng-progress[dir=ltr-] .ng-bar-placeholder{-webkit-transform:rotate(180deg);transform:rotate(180deg)}ng-progress[dir='rtl+'] .ng-spinner-icon,ng-progress[dir=ltr-] .ng-spinner-icon{animation-direction:reverse}ng-progress[dir='rtl+'] .ng-meteor,ng-progress[dir=rtl-] .ng-meteor{-webkit-transform:rotate(-3deg);transform:rotate(-3deg)}ng-progress[dir='rtl+'][thick=true] .ng-meteor,ng-progress[dir=rtl-][thick=true] .ng-meteor{-webkit-transform:rotate(-4deg);transform:rotate(-4deg)}ng-progress[spinnerPosition=left] .ng-spinner{left:10px}ng-progress[spinnerPosition=right] .ng-spinner{right:10px}.ng-progress-bar{position:relative;z-index:999999;top:0;left:0;width:100%;zoom:1;opacity:0}.ng-progress-bar.-active{opacity:1;transition:none}.ng-bar-placeholder{position:absolute;height:2px;width:100%}.ng-bar{width:100%;height:100%;-webkit-transform:translate(-100%,0,0);transform:translate(-100%,0,0)}.ng-meteor{display:block;position:absolute;width:100px;height:100%;opacity:1}.ng-spinner{position:absolute;display:block;z-index:1031;top:10px}.ng-spinner-icon{width:18px;height:18px;box-sizing:border-box;-webkit-animation:250ms linear infinite spinner-animation;animation:250ms linear infinite spinner-animation;border:2px solid transparent;border-radius:50%}@-webkit-keyframes spinner-animation{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-animation{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}"]
                }] }
    ];
    /** @nocollapse */
    NgProgressComponent.ctorParameters = function () { return [
        { type: NgProgress }
    ]; };
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
    return NgProgressComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgProgressModule = /** @class */ (function () {
    function NgProgressModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    NgProgressModule.withConfig = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: NgProgressModule,
            providers: [
                { provide: NG_PROGRESS_CONFIG, useValue: config }
            ]
        };
    };
    NgProgressModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgProgressComponent],
                    exports: [NgProgressComponent],
                    imports: [CommonModule]
                },] }
    ];
    return NgProgressModule;
}());

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
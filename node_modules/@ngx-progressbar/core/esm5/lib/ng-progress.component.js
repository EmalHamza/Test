/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgProgress } from './ng-progress.service';
import { NgProgressRef } from './ng-progress-ref';
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
export { NgProgressComponent };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgProgressComponent.prototype._started;
    /**
     * @type {?}
     * @private
     */
    NgProgressComponent.prototype._completed;
    /**
     * Progress bar worker
     * @type {?}
     */
    NgProgressComponent.prototype.progressRef;
    /**
     * Stream that emits progress state
     * @type {?}
     */
    NgProgressComponent.prototype.state$;
    /**
     * Creates a new instance if id is not already exists
     * @type {?}
     */
    NgProgressComponent.prototype.id;
    /**
     * Initializes inputs from the global config
     * @type {?}
     */
    NgProgressComponent.prototype.min;
    /** @type {?} */
    NgProgressComponent.prototype.max;
    /** @type {?} */
    NgProgressComponent.prototype.ease;
    /** @type {?} */
    NgProgressComponent.prototype.color;
    /** @type {?} */
    NgProgressComponent.prototype.speed;
    /** @type {?} */
    NgProgressComponent.prototype.thick;
    /** @type {?} */
    NgProgressComponent.prototype.fixed;
    /** @type {?} */
    NgProgressComponent.prototype.meteor;
    /** @type {?} */
    NgProgressComponent.prototype.spinner;
    /** @type {?} */
    NgProgressComponent.prototype.trickleSpeed;
    /** @type {?} */
    NgProgressComponent.prototype.debounceTime;
    /** @type {?} */
    NgProgressComponent.prototype.trickleFunc;
    /** @type {?} */
    NgProgressComponent.prototype.spinnerPosition;
    /** @type {?} */
    NgProgressComponent.prototype.direction;
    /** @type {?} */
    NgProgressComponent.prototype.started;
    /** @type {?} */
    NgProgressComponent.prototype.completed;
    /**
     * @type {?}
     * @private
     */
    NgProgressComponent.prototype._ngProgress;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcHJvZ3Jlc3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1wcm9ncmVzc2Jhci9jb3JlLyIsInNvdXJjZXMiOlsibGliL25nLXByb2dyZXNzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBSUwsTUFBTSxFQUNOLHVCQUF1QixFQUN2QixZQUFZLEVBQ1osaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxZQUFZLEVBQW1CLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR2xEO0lBd0VFLDZCQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQWxDbkMsYUFBUSxHQUFxQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ2hELGVBQVUsR0FBcUIsWUFBWSxDQUFDLEtBQUssQ0FBQzs7OztRQVNqRCxPQUFFLEdBQUcsTUFBTSxDQUFDOzs7O1FBR1osUUFBRyxHQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUMxQyxRQUFHLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQzFDLFNBQUksR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDNUMsVUFBSyxHQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM5QyxVQUFLLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzlDLFVBQUssR0FBWSxJQUFJLENBQUMsV0FBVyxDQUFD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QkFDckIsd0JBQXdCLEVBQUUsaUJBQWlCO3dCQUMzQyxZQUFZLEVBQUUsV0FBVzt3QkFDekIsY0FBYyxFQUFFLE9BQU87d0JBQ3ZCLGNBQWMsRUFBRSxPQUFPO3FCQUN4QjtvQkFDRCxRQUFRLEVBQUUsODRCQW9CVDtvQkFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7O2lCQUMzQjs7OztnQkF0Q1EsVUFBVTs7O3FCQW9EaEIsS0FBSztzQkFHTCxLQUFLO3NCQUNMLEtBQUs7dUJBQ0wsS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSzt3QkFDTCxLQUFLO3lCQUNMLEtBQUs7MEJBQ0wsS0FBSzsrQkFDTCxLQUFLOytCQUNMLEtBQUs7OEJBQ0wsS0FBSztrQ0FDTCxLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsTUFBTTs0QkFDTixNQUFNOztJQXlFVCwwQkFBQztDQUFBLEFBM0lELElBMklDO1NBdkdZLG1CQUFtQjs7Ozs7O0lBRTlCLHVDQUF3RDs7Ozs7SUFDeEQseUNBQTBEOzs7OztJQUcxRCwwQ0FBMkI7Ozs7O0lBRzNCLHFDQUEyRDs7Ozs7SUFHM0QsaUNBQXFCOzs7OztJQUdyQixrQ0FBbUQ7O0lBQ25ELGtDQUFtRDs7SUFDbkQsbUNBQXFEOztJQUNyRCxvQ0FBdUQ7O0lBQ3ZELG9DQUF1RDs7SUFDdkQsb0NBQXdEOztJQUN4RCxvQ0FBd0Q7O0lBQ3hELHFDQUEwRDs7SUFDMUQsc0NBQTREOztJQUM1RCwyQ0FBcUU7O0lBQ3JFLDJDQUFxRTs7SUFDckUsMENBQWtGOztJQUNsRiw4Q0FBcUY7O0lBQ3JGLHdDQUEwRjs7SUFDMUYsc0NBQXVDOztJQUN2Qyx3Q0FBeUM7Ozs7O0lBTTdCLDBDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBTdWJzY3JpcHRpb25MaWtlfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOZ1Byb2dyZXNzIH0gZnJvbSAnLi9uZy1wcm9ncmVzcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmdQcm9ncmVzc1JlZiB9IGZyb20gJy4vbmctcHJvZ3Jlc3MtcmVmJztcclxuaW1wb3J0IHsgTmdQcm9ncmVzc1N0YXRlIH0gZnJvbSAnLi9uZy1wcm9ncmVzcy5pbnRlcmZhY2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICduZy1wcm9ncmVzcycsXHJcbiAgaG9zdDoge1xyXG4gICAgJ3JvbGUnOiAncHJvZ3Jlc3NiYXInLFxyXG4gICAgJ1thdHRyLnNwaW5uZXJQb3NpdGlvbl0nOiAnc3Bpbm5lclBvc2l0aW9uJyxcclxuICAgICdbYXR0ci5kaXJdJzogJ2RpcmVjdGlvbicsXHJcbiAgICAnW2F0dHIudGhpY2tdJzogJ3RoaWNrJyxcclxuICAgICdbYXR0ci5maXhlZF0nOiAnZml4ZWQnXHJcbiAgfSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInN0YXRlJCB8IGFzeW5jOyBsZXQgc3RhdGVcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5nLXByb2dyZXNzLWJhclwiXHJcbiAgICAgICAgICAgIFtjbGFzcy4tYWN0aXZlXT1cInN0YXRlLmFjdGl2ZVwiXHJcbiAgICAgICAgICAgIFtzdHlsZS50cmFuc2l0aW9uXT1cIidvcGFjaXR5ICcgKyBzcGVlZCArICdtcyAnICsgZWFzZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZy1iYXItcGxhY2Vob2xkZXJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZy1iYXJcIlxyXG4gICAgICAgICAgICAgICAgW3N0eWxlLnRyYW5zZm9ybV09XCJzdGF0ZS50cmFuc2Zvcm1cIlxyXG4gICAgICAgICAgICAgICAgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJjb2xvclwiXHJcbiAgICAgICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvbl09XCJzdGF0ZS5hY3RpdmUgPyAnYWxsICcgKyBzcGVlZCArICdtcyAnICsgZWFzZSA6ICdub25lJ1wiPlxyXG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwibWV0ZW9yXCIgY2xhc3M9XCJuZy1tZXRlb3JcIiBbc3R5bGUuYm94U2hhZG93XT1cIicwIDAgMTBweCAnKyBjb2xvciArICcsIDAgMCA1cHggJyArIGNvbG9yXCI+PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwic3Bpbm5lclwiIGNsYXNzPVwibmctc3Bpbm5lclwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cIm5nLXNwaW5uZXItaWNvblwiXHJcbiAgICAgICAgICAgICAgICBbc3R5bGUuYm9yZGVyVG9wQ29sb3JdPVwiY29sb3JcIlxyXG4gICAgICAgICAgICAgICAgW3N0eWxlLmJvcmRlckxlZnRDb2xvcl09XCJjb2xvclwiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIGAsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbmctcHJvZ3Jlc3MuY29tcG9uZW50LnNjc3MnXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTmdQcm9ncmVzc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG5cclxuICBwcml2YXRlIF9zdGFydGVkOiBTdWJzY3JpcHRpb25MaWtlID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xyXG4gIHByaXZhdGUgX2NvbXBsZXRlZDogU3Vic2NyaXB0aW9uTGlrZSA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuXHJcbiAgLyoqIFByb2dyZXNzIGJhciB3b3JrZXIgKi9cclxuICBwcm9ncmVzc1JlZjogTmdQcm9ncmVzc1JlZjtcclxuXHJcbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHByb2dyZXNzIHN0YXRlICovXHJcbiAgc3RhdGUkOiBPYnNlcnZhYmxlPHsgYWN0aXZlOiBib29sZWFuLCB0cmFuc2Zvcm06IHN0cmluZyB9PjtcclxuXHJcbiAgLyoqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgaWYgaWQgaXMgbm90IGFscmVhZHkgZXhpc3RzICovXHJcbiAgQElucHV0KCkgaWQgPSAncm9vdCc7XHJcblxyXG4gIC8qKiBJbml0aWFsaXplcyBpbnB1dHMgZnJvbSB0aGUgZ2xvYmFsIGNvbmZpZyAqL1xyXG4gIEBJbnB1dCgpIG1pbjogbnVtYmVyID0gdGhpcy5fbmdQcm9ncmVzcy5jb25maWcubWluO1xyXG4gIEBJbnB1dCgpIG1heDogbnVtYmVyID0gdGhpcy5fbmdQcm9ncmVzcy5jb25maWcubWF4O1xyXG4gIEBJbnB1dCgpIGVhc2U6IHN0cmluZyA9IHRoaXMuX25nUHJvZ3Jlc3MuY29uZmlnLmVhc2U7XHJcbiAgQElucHV0KCkgY29sb3I6IHN0cmluZyA9IHRoaXMuX25nUHJvZ3Jlc3MuY29uZmlnLmNvbG9yO1xyXG4gIEBJbnB1dCgpIHNwZWVkOiBudW1iZXIgPSB0aGlzLl9uZ1Byb2dyZXNzLmNvbmZpZy5zcGVlZDtcclxuICBASW5wdXQoKSB0aGljazogYm9vbGVhbiA9IHRoaXMuX25nUHJvZ3Jlc3MuY29uZmlnLnRoaWNrO1xyXG4gIEBJbnB1dCgpIGZpeGVkOiBib29sZWFuID0gdGhpcy5fbmdQcm9ncmVzcy5jb25maWcuZml4ZWQ7XHJcbiAgQElucHV0KCkgbWV0ZW9yOiBib29sZWFuID0gdGhpcy5fbmdQcm9ncmVzcy5jb25maWcubWV0ZW9yO1xyXG4gIEBJbnB1dCgpIHNwaW5uZXI6IGJvb2xlYW4gPSB0aGlzLl9uZ1Byb2dyZXNzLmNvbmZpZy5zcGlubmVyO1xyXG4gIEBJbnB1dCgpIHRyaWNrbGVTcGVlZDogbnVtYmVyID0gdGhpcy5fbmdQcm9ncmVzcy5jb25maWcudHJpY2tsZVNwZWVkO1xyXG4gIEBJbnB1dCgpIGRlYm91bmNlVGltZTogbnVtYmVyID0gdGhpcy5fbmdQcm9ncmVzcy5jb25maWcuZGVib3VuY2VUaW1lO1xyXG4gIEBJbnB1dCgpIHRyaWNrbGVGdW5jOiAobjogbnVtYmVyKSA9PiBudW1iZXIgPSB0aGlzLl9uZ1Byb2dyZXNzLmNvbmZpZy50cmlja2xlRnVuYztcclxuICBASW5wdXQoKSBzcGlubmVyUG9zaXRpb246ICdsZWZ0JyB8ICdyaWdodCcgPSB0aGlzLl9uZ1Byb2dyZXNzLmNvbmZpZy5zcGlubmVyUG9zaXRpb247XHJcbiAgQElucHV0KCkgZGlyZWN0aW9uOiAnbHRyKycgfCAnbHRyLScgfCAncnRsKycgfCAncnRsLScgPSB0aGlzLl9uZ1Byb2dyZXNzLmNvbmZpZy5kaXJlY3Rpb247XHJcbiAgQE91dHB1dCgpIHN0YXJ0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGNvbXBsZXRlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgZ2V0IGlzU3RhcnRlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLnByb2dyZXNzUmVmLmlzU3RhcnRlZDtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nUHJvZ3Jlc3M6IE5nUHJvZ3Jlc3MpIHtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgaWYgKHRoaXMucHJvZ3Jlc3NSZWYgaW5zdGFuY2VvZiBOZ1Byb2dyZXNzUmVmKSB7XHJcbiAgICAgIC8vIFVwZGF0ZSBwcm9ncmVzcyBiYXIgY29uZmlnIHdoZW4gaW5wdXRzIGNoYW5nZVxyXG4gICAgICB0aGlzLnByb2dyZXNzUmVmLnNldENvbmZpZyh7XHJcbiAgICAgICAgbWF4OiAodGhpcy5tYXggPiAwICYmIHRoaXMubWF4IDw9IDEwMCkgPyB0aGlzLm1heCA6IDEwMCxcclxuICAgICAgICBtaW46ICh0aGlzLm1pbiA8IDEwMCAmJiB0aGlzLm1pbiA+PSAwKSA/IHRoaXMubWluIDogMCxcclxuICAgICAgICBzcGVlZDogdGhpcy5zcGVlZCxcclxuICAgICAgICB0cmlja2xlU3BlZWQ6IHRoaXMudHJpY2tsZVNwZWVkLFxyXG4gICAgICAgIHRyaWNrbGVGdW5jOiB0aGlzLnRyaWNrbGVGdW5jLFxyXG4gICAgICAgIGRlYm91bmNlVGltZTogdGhpcy5kZWJvdW5jZVRpbWVcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vIEdldCBwcm9ncmVzcyBiYXIgc2VydmljZSBpbnN0YW5jZVxyXG4gICAgdGhpcy5wcm9ncmVzc1JlZiA9IHRoaXMuX25nUHJvZ3Jlc3MucmVmKHRoaXMuaWQsIHtcclxuICAgICAgbWF4OiB0aGlzLm1heCxcclxuICAgICAgbWluOiB0aGlzLm1pbixcclxuICAgICAgc3BlZWQ6IHRoaXMuc3BlZWQsXHJcbiAgICAgIHRyaWNrbGVTcGVlZDogdGhpcy50cmlja2xlU3BlZWQsXHJcbiAgICAgIGRlYm91bmNlVGltZTogdGhpcy5kZWJvdW5jZVRpbWVcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFN1YnNjcmliZSB0byBwcm9ncmVzcyBzdGF0ZVxyXG4gICAgdGhpcy5zdGF0ZSQgPSB0aGlzLnByb2dyZXNzUmVmLnN0YXRlLnBpcGUoXHJcbiAgICAgIG1hcCgoc3RhdGU6IE5nUHJvZ3Jlc3NTdGF0ZSkgPT4gKHtcclxuICAgICAgICBhY3RpdmU6IHN0YXRlLmFjdGl2ZSxcclxuICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgke3N0YXRlLnZhbHVlfSUsMCwwKWBcclxuICAgICAgfSkpXHJcbiAgICApO1xyXG5cclxuICAgIC8vIFN1YnNjcmliZXMgdG8gc3RhcnRlZCBhbmQgY29tcGxldGVkIGV2ZW50cyBvbiBkZW1hblxyXG4gICAgaWYgKHRoaXMuc3RhcnRlZC5vYnNlcnZlcnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuX3N0YXJ0ZWQgPSB0aGlzLnByb2dyZXNzUmVmLnN0YXJ0ZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuc3RhcnRlZC5lbWl0KCkpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuY29tcGxldGVkLm9ic2VydmVycy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5fY29tcGxldGVkID0gdGhpcy5wcm9ncmVzc1JlZi5jb21wbGV0ZWQuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29tcGxldGVkLmVtaXQoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX3N0YXJ0ZWQudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuX2NvbXBsZXRlZC51bnN1YnNjcmliZSgpO1xyXG4gICAgaWYgKHRoaXMucHJvZ3Jlc3NSZWYgaW5zdGFuY2VvZiBOZ1Byb2dyZXNzUmVmKSB7XHJcbiAgICAgIHRoaXMucHJvZ3Jlc3NSZWYuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc3RhcnQoKSB7XHJcbiAgICB0aGlzLnByb2dyZXNzUmVmLnN0YXJ0KCk7XHJcbiAgfVxyXG5cclxuICBjb21wbGV0ZSgpIHtcclxuICAgIHRoaXMucHJvZ3Jlc3NSZWYuY29tcGxldGUoKTtcclxuICB9XHJcblxyXG4gIGluYyhuPzogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnByb2dyZXNzUmVmLmluYyhuKTtcclxuICB9XHJcblxyXG4gIHNldChuOiBudW1iZXIpIHtcclxuICAgIHRoaXMucHJvZ3Jlc3NSZWYuc2V0KG4pO1xyXG4gIH1cclxufVxyXG4iXX0=
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgProgress } from './ng-progress.service';
import { NgProgressRef } from './ng-progress-ref';
export class NgProgressComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcHJvZ3Jlc3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1wcm9ncmVzc2Jhci9jb3JlLyIsInNvdXJjZXMiOlsibGliL25nLXByb2dyZXNzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBSUwsTUFBTSxFQUNOLHVCQUF1QixFQUN2QixZQUFZLEVBQ1osaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBYyxZQUFZLEVBQW1CLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBdUNsRCxNQUFNLE9BQU8sbUJBQW1COzs7O0lBb0M5QixZQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQWxDbkMsYUFBUSxHQUFxQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ2hELGVBQVUsR0FBcUIsWUFBWSxDQUFDLEtBQUssQ0FBQzs7OztRQVNqRCxPQUFFLEdBQUcsTUFBTSxDQUFDOzs7O1FBR1osUUFBRyxHQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUMxQyxRQUFHLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQzFDLFNBQUksR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDNUMsVUFBSyxHQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM5QyxVQUFLLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzlDLFVBQUssR0FB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T0FBTztpQkFDeEI7Z0JBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CVDtnQkFFRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLG1CQUFtQixFQUFFLEtBQUs7O2FBQzNCOzs7O1lBdENRLFVBQVU7OztpQkFvRGhCLEtBQUs7a0JBR0wsS0FBSztrQkFDTCxLQUFLO21CQUNMLEtBQUs7b0JBQ0wsS0FBSztvQkFDTCxLQUFLO29CQUNMLEtBQUs7b0JBQ0wsS0FBSztxQkFDTCxLQUFLO3NCQUNMLEtBQUs7MkJBQ0wsS0FBSzsyQkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBQ0wsS0FBSzt3QkFDTCxLQUFLO3NCQUNMLE1BQU07d0JBQ04sTUFBTTs7Ozs7OztJQTVCUCx1Q0FBd0Q7Ozs7O0lBQ3hELHlDQUEwRDs7Ozs7SUFHMUQsMENBQTJCOzs7OztJQUczQixxQ0FBMkQ7Ozs7O0lBRzNELGlDQUFxQjs7Ozs7SUFHckIsa0NBQW1EOztJQUNuRCxrQ0FBbUQ7O0lBQ25ELG1DQUFxRDs7SUFDckQsb0NBQXVEOztJQUN2RCxvQ0FBdUQ7O0lBQ3ZELG9DQUF3RDs7SUFDeEQsb0NBQXdEOztJQUN4RCxxQ0FBMEQ7O0lBQzFELHNDQUE0RDs7SUFDNUQsMkNBQXFFOztJQUNyRSwyQ0FBcUU7O0lBQ3JFLDBDQUFrRjs7SUFDbEYsOENBQXFGOztJQUNyRix3Q0FBMEY7O0lBQzFGLHNDQUF1Qzs7SUFDdkMsd0NBQXlDOzs7OztJQU03QiwwQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIFZpZXdFbmNhcHN1bGF0aW9uXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgU3Vic2NyaXB0aW9uTGlrZX0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmdQcm9ncmVzcyB9IGZyb20gJy4vbmctcHJvZ3Jlc3Muc2VydmljZSc7XHJcbmltcG9ydCB7IE5nUHJvZ3Jlc3NSZWYgfSBmcm9tICcuL25nLXByb2dyZXNzLXJlZic7XHJcbmltcG9ydCB7IE5nUHJvZ3Jlc3NTdGF0ZSB9IGZyb20gJy4vbmctcHJvZ3Jlc3MuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmctcHJvZ3Jlc3MnLFxyXG4gIGhvc3Q6IHtcclxuICAgICdyb2xlJzogJ3Byb2dyZXNzYmFyJyxcclxuICAgICdbYXR0ci5zcGlubmVyUG9zaXRpb25dJzogJ3NwaW5uZXJQb3NpdGlvbicsXHJcbiAgICAnW2F0dHIuZGlyXSc6ICdkaXJlY3Rpb24nLFxyXG4gICAgJ1thdHRyLnRoaWNrXSc6ICd0aGljaycsXHJcbiAgICAnW2F0dHIuZml4ZWRdJzogJ2ZpeGVkJ1xyXG4gIH0sXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJzdGF0ZSQgfCBhc3luYzsgbGV0IHN0YXRlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZy1wcm9ncmVzcy1iYXJcIlxyXG4gICAgICAgICAgICBbY2xhc3MuLWFjdGl2ZV09XCJzdGF0ZS5hY3RpdmVcIlxyXG4gICAgICAgICAgICBbc3R5bGUudHJhbnNpdGlvbl09XCInb3BhY2l0eSAnICsgc3BlZWQgKyAnbXMgJyArIGVhc2VcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmctYmFyLXBsYWNlaG9sZGVyXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibmctYmFyXCJcclxuICAgICAgICAgICAgICAgIFtzdHlsZS50cmFuc2Zvcm1dPVwic3RhdGUudHJhbnNmb3JtXCJcclxuICAgICAgICAgICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiY29sb3JcIlxyXG4gICAgICAgICAgICAgICAgW3N0eWxlLnRyYW5zaXRpb25dPVwic3RhdGUuYWN0aXZlID8gJ2FsbCAnICsgc3BlZWQgKyAnbXMgJyArIGVhc2UgOiAnbm9uZSdcIj5cclxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cIm1ldGVvclwiIGNsYXNzPVwibmctbWV0ZW9yXCIgW3N0eWxlLmJveFNoYWRvd109XCInMCAwIDEwcHggJysgY29sb3IgKyAnLCAwIDAgNXB4ICcgKyBjb2xvclwiPjwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiAqbmdJZj1cInNwaW5uZXJcIiBjbGFzcz1cIm5nLXNwaW5uZXJcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZy1zcGlubmVyLWljb25cIlxyXG4gICAgICAgICAgICAgICAgW3N0eWxlLmJvcmRlclRvcENvbG9yXT1cImNvbG9yXCJcclxuICAgICAgICAgICAgICAgIFtzdHlsZS5ib3JkZXJMZWZ0Q29sb3JdPVwiY29sb3JcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICBgLFxyXG4gIHN0eWxlVXJsczogWycuL25nLXByb2dyZXNzLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIE5nUHJvZ3Jlc3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHJcbiAgcHJpdmF0ZSBfc3RhcnRlZDogU3Vic2NyaXB0aW9uTGlrZSA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuICBwcml2YXRlIF9jb21wbGV0ZWQ6IFN1YnNjcmlwdGlvbkxpa2UgPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcblxyXG4gIC8qKiBQcm9ncmVzcyBiYXIgd29ya2VyICovXHJcbiAgcHJvZ3Jlc3NSZWY6IE5nUHJvZ3Jlc3NSZWY7XHJcblxyXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyBwcm9ncmVzcyBzdGF0ZSAqL1xyXG4gIHN0YXRlJDogT2JzZXJ2YWJsZTx7IGFjdGl2ZTogYm9vbGVhbiwgdHJhbnNmb3JtOiBzdHJpbmcgfT47XHJcblxyXG4gIC8qKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIGlmIGlkIGlzIG5vdCBhbHJlYWR5IGV4aXN0cyAqL1xyXG4gIEBJbnB1dCgpIGlkID0gJ3Jvb3QnO1xyXG5cclxuICAvKiogSW5pdGlhbGl6ZXMgaW5wdXRzIGZyb20gdGhlIGdsb2JhbCBjb25maWcgKi9cclxuICBASW5wdXQoKSBtaW46IG51bWJlciA9IHRoaXMuX25nUHJvZ3Jlc3MuY29uZmlnLm1pbjtcclxuICBASW5wdXQoKSBtYXg6IG51bWJlciA9IHRoaXMuX25nUHJvZ3Jlc3MuY29uZmlnLm1heDtcclxuICBASW5wdXQoKSBlYXNlOiBzdHJpbmcgPSB0aGlzLl9uZ1Byb2dyZXNzLmNvbmZpZy5lYXNlO1xyXG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmcgPSB0aGlzLl9uZ1Byb2dyZXNzLmNvbmZpZy5jb2xvcjtcclxuICBASW5wdXQoKSBzcGVlZDogbnVtYmVyID0gdGhpcy5fbmdQcm9ncmVzcy5jb25maWcuc3BlZWQ7XHJcbiAgQElucHV0KCkgdGhpY2s6IGJvb2xlYW4gPSB0aGlzLl9uZ1Byb2dyZXNzLmNvbmZpZy50aGljaztcclxuICBASW5wdXQoKSBmaXhlZDogYm9vbGVhbiA9IHRoaXMuX25nUHJvZ3Jlc3MuY29uZmlnLmZpeGVkO1xyXG4gIEBJbnB1dCgpIG1ldGVvcjogYm9vbGVhbiA9IHRoaXMuX25nUHJvZ3Jlc3MuY29uZmlnLm1ldGVvcjtcclxuICBASW5wdXQoKSBzcGlubmVyOiBib29sZWFuID0gdGhpcy5fbmdQcm9ncmVzcy5jb25maWcuc3Bpbm5lcjtcclxuICBASW5wdXQoKSB0cmlja2xlU3BlZWQ6IG51bWJlciA9IHRoaXMuX25nUHJvZ3Jlc3MuY29uZmlnLnRyaWNrbGVTcGVlZDtcclxuICBASW5wdXQoKSBkZWJvdW5jZVRpbWU6IG51bWJlciA9IHRoaXMuX25nUHJvZ3Jlc3MuY29uZmlnLmRlYm91bmNlVGltZTtcclxuICBASW5wdXQoKSB0cmlja2xlRnVuYzogKG46IG51bWJlcikgPT4gbnVtYmVyID0gdGhpcy5fbmdQcm9ncmVzcy5jb25maWcudHJpY2tsZUZ1bmM7XHJcbiAgQElucHV0KCkgc3Bpbm5lclBvc2l0aW9uOiAnbGVmdCcgfCAncmlnaHQnID0gdGhpcy5fbmdQcm9ncmVzcy5jb25maWcuc3Bpbm5lclBvc2l0aW9uO1xyXG4gIEBJbnB1dCgpIGRpcmVjdGlvbjogJ2x0cisnIHwgJ2x0ci0nIHwgJ3J0bCsnIHwgJ3J0bC0nID0gdGhpcy5fbmdQcm9ncmVzcy5jb25maWcuZGlyZWN0aW9uO1xyXG4gIEBPdXRwdXQoKSBzdGFydGVkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBjb21wbGV0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGdldCBpc1N0YXJ0ZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9ncmVzc1JlZi5pc1N0YXJ0ZWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uZ1Byb2dyZXNzOiBOZ1Byb2dyZXNzKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcygpIHtcclxuICAgIGlmICh0aGlzLnByb2dyZXNzUmVmIGluc3RhbmNlb2YgTmdQcm9ncmVzc1JlZikge1xyXG4gICAgICAvLyBVcGRhdGUgcHJvZ3Jlc3MgYmFyIGNvbmZpZyB3aGVuIGlucHV0cyBjaGFuZ2VcclxuICAgICAgdGhpcy5wcm9ncmVzc1JlZi5zZXRDb25maWcoe1xyXG4gICAgICAgIG1heDogKHRoaXMubWF4ID4gMCAmJiB0aGlzLm1heCA8PSAxMDApID8gdGhpcy5tYXggOiAxMDAsXHJcbiAgICAgICAgbWluOiAodGhpcy5taW4gPCAxMDAgJiYgdGhpcy5taW4gPj0gMCkgPyB0aGlzLm1pbiA6IDAsXHJcbiAgICAgICAgc3BlZWQ6IHRoaXMuc3BlZWQsXHJcbiAgICAgICAgdHJpY2tsZVNwZWVkOiB0aGlzLnRyaWNrbGVTcGVlZCxcclxuICAgICAgICB0cmlja2xlRnVuYzogdGhpcy50cmlja2xlRnVuYyxcclxuICAgICAgICBkZWJvdW5jZVRpbWU6IHRoaXMuZGVib3VuY2VUaW1lXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvLyBHZXQgcHJvZ3Jlc3MgYmFyIHNlcnZpY2UgaW5zdGFuY2VcclxuICAgIHRoaXMucHJvZ3Jlc3NSZWYgPSB0aGlzLl9uZ1Byb2dyZXNzLnJlZih0aGlzLmlkLCB7XHJcbiAgICAgIG1heDogdGhpcy5tYXgsXHJcbiAgICAgIG1pbjogdGhpcy5taW4sXHJcbiAgICAgIHNwZWVkOiB0aGlzLnNwZWVkLFxyXG4gICAgICB0cmlja2xlU3BlZWQ6IHRoaXMudHJpY2tsZVNwZWVkLFxyXG4gICAgICBkZWJvdW5jZVRpbWU6IHRoaXMuZGVib3VuY2VUaW1lXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTdWJzY3JpYmUgdG8gcHJvZ3Jlc3Mgc3RhdGVcclxuICAgIHRoaXMuc3RhdGUkID0gdGhpcy5wcm9ncmVzc1JlZi5zdGF0ZS5waXBlKFxyXG4gICAgICBtYXAoKHN0YXRlOiBOZ1Byb2dyZXNzU3RhdGUpID0+ICh7XHJcbiAgICAgICAgYWN0aXZlOiBzdGF0ZS5hY3RpdmUsXHJcbiAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHtzdGF0ZS52YWx1ZX0lLDAsMClgXHJcbiAgICAgIH0pKVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBTdWJzY3JpYmVzIHRvIHN0YXJ0ZWQgYW5kIGNvbXBsZXRlZCBldmVudHMgb24gZGVtYW5cclxuICAgIGlmICh0aGlzLnN0YXJ0ZWQub2JzZXJ2ZXJzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLl9zdGFydGVkID0gdGhpcy5wcm9ncmVzc1JlZi5zdGFydGVkLnN1YnNjcmliZSgoKSA9PiB0aGlzLnN0YXJ0ZWQuZW1pdCgpKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmNvbXBsZXRlZC5vYnNlcnZlcnMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuX2NvbXBsZXRlZCA9IHRoaXMucHJvZ3Jlc3NSZWYuY29tcGxldGVkLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNvbXBsZXRlZC5lbWl0KCkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9zdGFydGVkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLl9jb21wbGV0ZWQudW5zdWJzY3JpYmUoKTtcclxuICAgIGlmICh0aGlzLnByb2dyZXNzUmVmIGluc3RhbmNlb2YgTmdQcm9ncmVzc1JlZikge1xyXG4gICAgICB0aGlzLnByb2dyZXNzUmVmLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5wcm9ncmVzc1JlZi5zdGFydCgpO1xyXG4gIH1cclxuXHJcbiAgY29tcGxldGUoKSB7XHJcbiAgICB0aGlzLnByb2dyZXNzUmVmLmNvbXBsZXRlKCk7XHJcbiAgfVxyXG5cclxuICBpbmMobj86IG51bWJlcikge1xyXG4gICAgdGhpcy5wcm9ncmVzc1JlZi5pbmMobik7XHJcbiAgfVxyXG5cclxuICBzZXQobjogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnByb2dyZXNzUmVmLnNldChuKTtcclxuICB9XHJcbn1cclxuIl19
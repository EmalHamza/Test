/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject, BehaviorSubject, timer, of, combineLatest, Subscription } from 'rxjs';
import { tap, map, skip, delay, filter, debounce, switchMap, distinctUntilChanged } from 'rxjs/operators';
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
            var _b = tslib_1.__read(_a, 2), start = _b[0], config = _b[1];
            return timer(start ? config.debounceTime : 0);
        })), switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), start = _b[0], config = _b[1];
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
        this._config.next(tslib_1.__assign({}, this._config.value, config));
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
        this._state.next(tslib_1.__assign({}, this.currState, state));
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
export { NgProgressRef };
if (false) {
    /**
     * Stream that emits when progress state is changed
     * @type {?}
     * @private
     */
    NgProgressRef.prototype._state;
    /** @type {?} */
    NgProgressRef.prototype.state;
    /**
     * Stream that emits when config is changed
     * @type {?}
     * @private
     */
    NgProgressRef.prototype._config;
    /** @type {?} */
    NgProgressRef.prototype.config;
    /**
     * Stream that increments and updates progress state
     * @type {?}
     * @private
     */
    NgProgressRef.prototype._trickling;
    /**
     * Stream that combines "_trickling" and "config" streams
     * @type {?}
     * @private
     */
    NgProgressRef.prototype._worker;
    /**
     * @type {?}
     * @private
     */
    NgProgressRef.prototype._onDestroyCallback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcHJvZ3Jlc3MtcmVmLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1wcm9ncmVzc2Jhci9jb3JlLyIsInNvdXJjZXMiOlsibGliL25nLXByb2dyZXNzLXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBYyxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwRyxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUc7SUE2Q0UsdUJBQVksWUFBOEIsRUFBVSxrQkFBNEI7UUFBaEYsaUJBVUM7UUFWbUQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFVOzs7O1FBbEMvRCxlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7OztRQUczQixZQUFPLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQWdDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBa0IsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQW1CLFlBQVksQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM5RCxRQUFROzs7O1FBQUMsVUFBQyxFQUE0QztnQkFBNUMsMEJBQTRDLEVBQTNDLGFBQUssRUFBRSxjQUFNO1lBQW1DLE9BQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQXRDLENBQXNDLEVBQUMsRUFDbEcsU0FBUzs7OztRQUFDLFVBQUMsRUFBNEM7Z0JBQTVDLDBCQUE0QyxFQUEzQyxhQUFLLEVBQUUsY0FBTTtZQUFtQyxPQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFBMUQsQ0FBMEQsRUFBQyxDQUN4SCxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUF0Q0Qsc0JBQVksb0NBQVM7UUFEckIsaUNBQWlDOzs7Ozs7UUFDakM7WUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBR0Qsc0JBQUksb0NBQVM7UUFEYixvQ0FBb0M7Ozs7O1FBQ3BDO1lBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUMvQixDQUFDOzs7T0FBQTtJQUdELHNCQUFJLGtDQUFPO1FBRFgsMkJBQTJCOzs7OztRQUMzQjtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ3JCLEdBQUc7Ozs7WUFBQyxVQUFDLEtBQXNCLElBQUssT0FBQSxLQUFLLENBQUMsTUFBTSxFQUFaLENBQVksRUFBQyxFQUM3QyxvQkFBb0IsRUFBRSxFQUN0QixNQUFNOzs7O1lBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLEVBQU4sQ0FBTSxFQUFDLENBQ3pCLENBQUM7UUFDSixDQUFDOzs7T0FBQTtJQUdELHNCQUFJLG9DQUFTO1FBRGIsMkJBQTJCOzs7OztRQUMzQjtZQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ3JCLEdBQUc7Ozs7WUFBQyxVQUFDLEtBQXNCLElBQUssT0FBQSxLQUFLLENBQUMsTUFBTSxFQUFaLENBQVksRUFBQyxFQUM3QyxvQkFBb0IsRUFBRSxFQUN0QixNQUFNOzs7O1lBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxDQUFDLE1BQU0sRUFBUCxDQUFPLEVBQUMsRUFDekIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSLENBQUM7UUFDSixDQUFDOzs7T0FBQTtJQWNEOztPQUVHOzs7OztJQUNILDZCQUFLOzs7O0lBQUw7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsZ0NBQVE7Ozs7SUFBUjtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILDJCQUFHOzs7OztJQUFILFVBQUksTUFBZTs7WUFDWCxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNkO2FBQU07WUFDTCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtnQkFDOUIsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM1QztZQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsMkJBQUc7Ozs7O0lBQUgsVUFBSSxDQUFTO1FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILGlDQUFTOzs7OztJQUFULFVBQVUsTUFBd0I7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHNCQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFLLE1BQU0sRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCwrQkFBTzs7OztJQUFQO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0ssZ0NBQVE7Ozs7OztJQUFoQixVQUFpQixLQUFzQjtRQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksc0JBQUssSUFBSSxDQUFDLFNBQVMsRUFBSyxLQUFLLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0ssNkJBQUs7Ozs7OztJQUFiLFVBQWMsQ0FBUztRQUNyQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNLLG1DQUFXOzs7Ozs7SUFBbkIsVUFBb0IsTUFBd0I7UUFBNUMsaUJBS0M7UUFKQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRzs7O1FBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxHQUFHLEVBQUUsRUFBVixDQUFVLEVBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7O09BR0c7Ozs7Ozs7SUFDSyxrQ0FBVTs7Ozs7O0lBQWxCLFVBQW1CLE1BQXdCO1FBQTNDLGlCQWFDO1FBWkMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUk7UUFDM0MseUJBQXlCO1FBQ3pCLEdBQUc7OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsS0FBSyxFQUFFLEdBQUcsRUFBQyxDQUFDLEVBQTNCLENBQTJCLEVBQUM7UUFFdEMsNENBQTRDO1FBQzVDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUN6QixHQUFHOzs7UUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUE5QixDQUE4QixFQUFDO1FBRXpDLDRCQUE0QjtRQUM1QixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUNuQixHQUFHOzs7UUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUF6QixDQUF5QixFQUFDLENBQ3JDLENBQUM7SUFDSixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBL0pELElBK0pDOzs7Ozs7OztJQTVKQywrQkFBMEQ7O0lBQzFELDhCQUFtQzs7Ozs7O0lBR25DLGdDQUE0RDs7SUFDNUQsK0JBQW9DOzs7Ozs7SUFHcEMsbUNBQTRDOzs7Ozs7SUFHNUMsZ0NBQThDOzs7OztJQStCRiwyQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1Byb2dyZXNzU3RhdGUsIE5nUHJvZ3Jlc3NDb25maWcgfSBmcm9tICcuL25nLXByb2dyZXNzLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdCwgdGltZXIsIG9mLCBjb21iaW5lTGF0ZXN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgdGFwLCBtYXAsIHNraXAsIGRlbGF5LCBmaWx0ZXIsIGRlYm91bmNlLCBzd2l0Y2hNYXAsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5nUHJvZ3Jlc3NSZWYge1xyXG5cclxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBwcm9ncmVzcyBzdGF0ZSBpcyBjaGFuZ2VkICovXHJcbiAgcHJpdmF0ZSByZWFkb25seSBfc3RhdGU6IEJlaGF2aW9yU3ViamVjdDxOZ1Byb2dyZXNzU3RhdGU+O1xyXG4gIHN0YXRlOiBPYnNlcnZhYmxlPE5nUHJvZ3Jlc3NTdGF0ZT47XHJcblxyXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIGNvbmZpZyBpcyBjaGFuZ2VkICovXHJcbiAgcHJpdmF0ZSByZWFkb25seSBfY29uZmlnOiBCZWhhdmlvclN1YmplY3Q8TmdQcm9ncmVzc0NvbmZpZz47XHJcbiAgY29uZmlnOiBPYnNlcnZhYmxlPE5nUHJvZ3Jlc3NTdGF0ZT47XHJcblxyXG4gIC8qKiBTdHJlYW0gdGhhdCBpbmNyZW1lbnRzIGFuZCB1cGRhdGVzIHByb2dyZXNzIHN0YXRlICovXHJcbiAgcHJpdmF0ZSByZWFkb25seSBfdHJpY2tsaW5nID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgLyoqIFN0cmVhbSB0aGF0IGNvbWJpbmVzIFwiX3RyaWNrbGluZ1wiIGFuZCBcImNvbmZpZ1wiIHN0cmVhbXMgKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IF93b3JrZXIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcblxyXG4gIC8qKiBHZXQgY3VycmVudCBwcm9ncmVzcyBzdGF0ZSAqL1xyXG4gIHByaXZhdGUgZ2V0IGN1cnJTdGF0ZSgpOiBOZ1Byb2dyZXNzU3RhdGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlLnZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqIENoZWNrIGlmIHByb2dyZXNzIGhhcyBzdGFydGVkICovXHJcbiAgZ2V0IGlzU3RhcnRlZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmN1cnJTdGF0ZS5hY3RpdmU7XHJcbiAgfVxyXG5cclxuICAvKiogUHJvZ3Jlc3Mgc3RhcnQgZXZlbnQgKi9cclxuICBnZXQgc3RhcnRlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiB0aGlzLl9zdGF0ZS5waXBlKFxyXG4gICAgICBtYXAoKHN0YXRlOiBOZ1Byb2dyZXNzU3RhdGUpID0+IHN0YXRlLmFjdGl2ZSksXHJcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgICAgIGZpbHRlcihhY3RpdmUgPT4gYWN0aXZlKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIC8qKiBQcm9ncmVzcyBlbmRlZCBldmVudCAqL1xyXG4gIGdldCBjb21wbGV0ZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhdGUucGlwZShcclxuICAgICAgbWFwKChzdGF0ZTogTmdQcm9ncmVzc1N0YXRlKSA9PiBzdGF0ZS5hY3RpdmUpLFxyXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICAgICBmaWx0ZXIoYWN0aXZlID0+ICFhY3RpdmUpLFxyXG4gICAgICBza2lwKDEpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoY3VzdG9tQ29uZmlnOiBOZ1Byb2dyZXNzQ29uZmlnLCBwcml2YXRlIF9vbkRlc3Ryb3lDYWxsYmFjazogRnVuY3Rpb24pIHtcclxuICAgIHRoaXMuX3N0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOZ1Byb2dyZXNzU3RhdGU+KHthY3RpdmU6IGZhbHNlLCB2YWx1ZTogMH0pO1xyXG4gICAgdGhpcy5fY29uZmlnID0gbmV3IEJlaGF2aW9yU3ViamVjdDxOZ1Byb2dyZXNzQ29uZmlnPihjdXN0b21Db25maWcpO1xyXG4gICAgdGhpcy5zdGF0ZSA9IHRoaXMuX3N0YXRlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gICAgdGhpcy5jb25maWcgPSB0aGlzLl9zdGF0ZS5hc09ic2VydmFibGUoKTtcclxuXHJcbiAgICB0aGlzLl93b3JrZXIgPSBjb21iaW5lTGF0ZXN0KHRoaXMuX3RyaWNrbGluZywgdGhpcy5fY29uZmlnKS5waXBlKFxyXG4gICAgICBkZWJvdW5jZSgoW3N0YXJ0LCBjb25maWddOiBbYm9vbGVhbiwgTmdQcm9ncmVzc0NvbmZpZ10pID0+IHRpbWVyKHN0YXJ0ID8gY29uZmlnLmRlYm91bmNlVGltZSA6IDApKSxcclxuICAgICAgc3dpdGNoTWFwKChbc3RhcnQsIGNvbmZpZ106IFtib29sZWFuLCBOZ1Byb2dyZXNzQ29uZmlnXSkgPT4gc3RhcnQgPyB0aGlzLm9uVHJpY2tsaW5nKGNvbmZpZykgOiB0aGlzLm9uQ29tcGxldGUoY29uZmlnKSlcclxuICAgICkuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydCB0aGUgcHJvZ3Jlc3NcclxuICAgKi9cclxuICBzdGFydCgpIHtcclxuICAgIHRoaXMuX3RyaWNrbGluZy5uZXh0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcGxldGUgdGhlIHByb2dyZXNzXHJcbiAgICovXHJcbiAgY29tcGxldGUoKSB7XHJcbiAgICB0aGlzLl90cmlja2xpbmcubmV4dChmYWxzZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJbmNyZW1lbnQgdGhlIHByb2dyZXNzXHJcbiAgICogQHBhcmFtIGFtb3VudFxyXG4gICAqL1xyXG4gIGluYyhhbW91bnQ/OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IG4gPSB0aGlzLmN1cnJTdGF0ZS52YWx1ZTtcclxuICAgIGlmICghdGhpcy5pc1N0YXJ0ZWQpIHtcclxuICAgICAgdGhpcy5zdGFydCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGVvZiBhbW91bnQgIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgYW1vdW50ID0gdGhpcy5fY29uZmlnLnZhbHVlLnRyaWNrbGVGdW5jKG4pO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0KG4gKyBhbW91bnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBwcm9ncmVzc1xyXG4gICAqIEBwYXJhbSBuXHJcbiAgICovXHJcbiAgc2V0KG46IG51bWJlcikge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IHRoaXMuY2xhbXAobiksIGFjdGl2ZTogdHJ1ZX0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGNvbmZpZ1xyXG4gICAqIEBwYXJhbSBjb25maWdcclxuICAgKi9cclxuICBzZXRDb25maWcoY29uZmlnOiBOZ1Byb2dyZXNzQ29uZmlnKSB7XHJcbiAgICB0aGlzLl9jb25maWcubmV4dCh7Li4udGhpcy5fY29uZmlnLnZhbHVlLCAuLi5jb25maWd9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc3Ryb3kgcHJvZ3Jlc3MgcmVmZXJlbmNlXHJcbiAgICovXHJcbiAgZGVzdHJveSgpIHtcclxuICAgIHRoaXMuX3dvcmtlci51bnN1YnNjcmliZSgpO1xyXG4gICAgdGhpcy5fdHJpY2tsaW5nLmNvbXBsZXRlKCk7XHJcbiAgICB0aGlzLl9zdGF0ZS5jb21wbGV0ZSgpO1xyXG4gICAgdGhpcy5fY29uZmlnLmNvbXBsZXRlKCk7XHJcbiAgICB0aGlzLl9vbkRlc3Ryb3lDYWxsYmFjaygpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHByb2dyZXNzIHN0YXRlXHJcbiAgICogQHBhcmFtIHN0YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBzZXRTdGF0ZShzdGF0ZTogTmdQcm9ncmVzc1N0YXRlKSB7XHJcbiAgICB0aGlzLl9zdGF0ZS5uZXh0KHsuLi50aGlzLmN1cnJTdGF0ZSwgLi4uc3RhdGV9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENsYW1wcyBhIHZhbHVlIHRvIGJlIGJldHdlZW4gbWluIGFuZCBtYXhcclxuICAgKiBAcGFyYW0gblxyXG4gICAqL1xyXG4gIHByaXZhdGUgY2xhbXAobjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLm1heCh0aGlzLl9jb25maWcudmFsdWUubWluLCBNYXRoLm1pbih0aGlzLl9jb25maWcudmFsdWUubWF4LCBuKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBLZWVwcyBpbmNyZW1lbnRpbmcgdGhlIHByb2dyZXNzXHJcbiAgICogQHBhcmFtIGNvbmZpZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Ucmlja2xpbmcoY29uZmlnOiBOZ1Byb2dyZXNzQ29uZmlnKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcclxuICAgIGlmICghdGhpcy5pc1N0YXJ0ZWQpIHtcclxuICAgICAgdGhpcy5zZXQodGhpcy5fY29uZmlnLnZhbHVlLm1pbik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGltZXIoMCwgY29uZmlnLnRyaWNrbGVTcGVlZCkucGlwZSh0YXAoKCkgPT4gdGhpcy5pbmMoKSkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcGxldGVzIHRoZW4gcmVzZXRzIHRoZSBwcm9ncmVzc1xyXG4gICAqIEBwYXJhbSBjb25maWdcclxuICAgKi9cclxuICBwcml2YXRlIG9uQ29tcGxldGUoY29uZmlnOiBOZ1Byb2dyZXNzQ29uZmlnKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiAhdGhpcy5pc1N0YXJ0ZWQgPyBvZih7fSkgOiBvZih7fSkucGlwZShcclxuICAgICAgLy8gQ29tcGxldGVzIHRoZSBwcm9ncmVzc1xyXG4gICAgICB0YXAoKCkgPT4gdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IDEwMH0pKSxcclxuXHJcbiAgICAgIC8vIEhpZGVzIHRoZSBwcm9ncmVzcyBiYXIgYWZ0ZXIgYSB0aW55IGRlbGF5XHJcbiAgICAgIGRlbGF5KGNvbmZpZy5zcGVlZCAqIDEuNyksXHJcbiAgICAgIHRhcCgoKSA9PiB0aGlzLnNldFN0YXRlKHthY3RpdmU6IGZhbHNlfSkpLFxyXG5cclxuICAgICAgLy8gUmVzZXRzIHRoZSBwcm9ncmVzcyBzdGF0ZVxyXG4gICAgICBkZWxheShjb25maWcuc3BlZWQpLFxyXG4gICAgICB0YXAoKCkgPT4gdGhpcy5zZXRTdGF0ZSh7dmFsdWU6IDB9KSlcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
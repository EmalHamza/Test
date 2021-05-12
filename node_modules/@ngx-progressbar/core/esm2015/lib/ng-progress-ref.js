/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject, BehaviorSubject, timer, of, combineLatest, Subscription } from 'rxjs';
import { tap, map, skip, delay, filter, debounce, switchMap, distinctUntilChanged } from 'rxjs/operators';
export class NgProgressRef {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcHJvZ3Jlc3MtcmVmLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG5neC1wcm9ncmVzc2Jhci9jb3JlLyIsInNvdXJjZXMiOlsibGliL25nLXByb2dyZXNzLXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFjLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxRyxNQUFNLE9BQU8sYUFBYTs7Ozs7SUE2Q3hCLFlBQVksWUFBOEIsRUFBVSxrQkFBNEI7UUFBNUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFVOzs7O1FBbEMvRCxlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQzs7OztRQUczQixZQUFPLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQWdDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBa0IsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxlQUFlLENBQW1CLFlBQVksQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM5RCxRQUFROzs7O1FBQUMs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QUssQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUN6QixHQUFHOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUM7UUFFekMsNEJBQTRCO1FBQzVCLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQ25CLEdBQUc7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUNyQyxDQUFDO0lBQ0osQ0FBQztDQUNGOzs7Ozs7O0lBNUpDLCtCQUEwRDs7SUFDMUQsOEJBQW1DOzs7Ozs7SUFHbkMsZ0NBQTREOztJQUM1RCwrQkFBb0M7Ozs7OztJQUdwQyxtQ0FBNEM7Ozs7OztJQUc1QyxnQ0FBOEM7Ozs7O0lBK0JGLDJDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUHJvZ3Jlc3NTdGF0ZSwgTmdQcm9ncmVzc0NvbmZpZyB9IGZyb20gJy4vbmctcHJvZ3Jlc3MuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN0LCB0aW1lciwgb2YsIGNvbWJpbmVMYXRlc3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyB0YXAsIG1hcCwgc2tpcCwgZGVsYXksIGZpbHRlciwgZGVib3VuY2UsIHN3aXRjaE1hcCwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTmdQcm9ncmVzc1JlZiB7XHJcblxyXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIHByb2dyZXNzIHN0YXRlIGlzIGNoYW5nZWQgKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IF9zdGF0ZTogQmVoYXZpb3JTdWJqZWN0PE5nUHJvZ3Jlc3NTdGF0ZT47XHJcbiAgc3RhdGU6IE9ic2VydmFibGU8TmdQcm9ncmVzc1N0YXRlPjtcclxuXHJcbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gY29uZmlnIGlzIGNoYW5nZWQgKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IF9jb25maWc6IEJlaGF2aW9yU3ViamVjdDxOZ1Byb2dyZXNzQ29uZmlnPjtcclxuICBjb25maWc6IE9ic2VydmFibGU8TmdQcm9ncmVzc1N0YXRlPjtcclxuXHJcbiAgLyoqIFN0cmVhbSB0aGF0IGluY3JlbWVudHMgYW5kIHVwZGF0ZXMgcHJvZ3Jlc3Mgc3RhdGUgKi9cclxuICBwcml2YXRlIHJlYWRvbmx5IF90cmlja2xpbmcgPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICAvKiogU3RyZWFtIHRoYXQgY29tYmluZXMgXCJfdHJpY2tsaW5nXCIgYW5kIFwiY29uZmlnXCIgc3RyZWFtcyAqL1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgX3dvcmtlciA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuXHJcbiAgLyoqIEdldCBjdXJyZW50IHByb2dyZXNzIHN0YXRlICovXHJcbiAgcHJpdmF0ZSBnZXQgY3VyclN0YXRlKCk6IE5nUHJvZ3Jlc3NTdGF0ZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RhdGUudmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKiogQ2hlY2sgaWYgcHJvZ3Jlc3MgaGFzIHN0YXJ0ZWQgKi9cclxuICBnZXQgaXNTdGFydGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuY3VyclN0YXRlLmFjdGl2ZTtcclxuICB9XHJcblxyXG4gIC8qKiBQcm9ncmVzcyBzdGFydCBldmVudCAqL1xyXG4gIGdldCBzdGFydGVkKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0YXRlLnBpcGUoXHJcbiAgICAgIG1hcCgoc3RhdGU6IE5nUHJvZ3Jlc3NTdGF0ZSkgPT4gc3RhdGUuYWN0aXZlKSxcclxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcclxuICAgICAgZmlsdGVyKGFjdGl2ZSA9PiBhY3RpdmUpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLyoqIFByb2dyZXNzIGVuZGVkIGV2ZW50ICovXHJcbiAgZ2V0IGNvbXBsZXRlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcclxuICAgIHJldHVybiB0aGlzLl9zdGF0ZS5waXBlKFxyXG4gICAgICBtYXAoKHN0YXRlOiBOZ1Byb2dyZXNzU3RhdGUpID0+IHN0YXRlLmFjdGl2ZSksXHJcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgICAgIGZpbHRlcihhY3RpdmUgPT4gIWFjdGl2ZSksXHJcbiAgICAgIHNraXAoMSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihjdXN0b21Db25maWc6IE5nUHJvZ3Jlc3NDb25maWcsIHByaXZhdGUgX29uRGVzdHJveUNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5fc3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE5nUHJvZ3Jlc3NTdGF0ZT4oe2FjdGl2ZTogZmFsc2UsIHZhbHVlOiAwfSk7XHJcbiAgICB0aGlzLl9jb25maWcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PE5nUHJvZ3Jlc3NDb25maWc+KGN1c3RvbUNvbmZpZyk7XHJcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5fc3RhdGUuYXNPYnNlcnZhYmxlKCk7XHJcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuX3N0YXRlLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICAgIHRoaXMuX3dvcmtlciA9IGNvbWJpbmVMYXRlc3QodGhpcy5fdHJpY2tsaW5nLCB0aGlzLl9jb25maWcpLnBpcGUoXHJcbiAgICAgIGRlYm91bmNlKChbc3RhcnQsIGNvbmZpZ106IFtib29sZWFuLCBOZ1Byb2dyZXNzQ29uZmlnXSkgPT4gdGltZXIoc3RhcnQgPyBjb25maWcuZGVib3VuY2VUaW1lIDogMCkpLFxyXG4gICAgICBzd2l0Y2hNYXAoKFtzdGFydCwgY29uZmlnXTogW2Jvb2xlYW4sIE5nUHJvZ3Jlc3NDb25maWddKSA9PiBzdGFydCA/IHRoaXMub25Ucmlja2xpbmcoY29uZmlnKSA6IHRoaXMub25Db21wbGV0ZShjb25maWcpKVxyXG4gICAgKS5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IHRoZSBwcm9ncmVzc1xyXG4gICAqL1xyXG4gIHN0YXJ0KCkge1xyXG4gICAgdGhpcy5fdHJpY2tsaW5nLm5leHQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wbGV0ZSB0aGUgcHJvZ3Jlc3NcclxuICAgKi9cclxuICBjb21wbGV0ZSgpIHtcclxuICAgIHRoaXMuX3RyaWNrbGluZy5uZXh0KGZhbHNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEluY3JlbWVudCB0aGUgcHJvZ3Jlc3NcclxuICAgKiBAcGFyYW0gYW1vdW50XHJcbiAgICovXHJcbiAgaW5jKGFtb3VudD86IG51bWJlcikge1xyXG4gICAgY29uc3QgbiA9IHRoaXMuY3VyclN0YXRlLnZhbHVlO1xyXG4gICAgaWYgKCF0aGlzLmlzU3RhcnRlZCkge1xyXG4gICAgICB0aGlzLnN0YXJ0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodHlwZW9mIGFtb3VudCAhPT0gJ251bWJlcicpIHtcclxuICAgICAgICBhbW91bnQgPSB0aGlzLl9jb25maWcudmFsdWUudHJpY2tsZUZ1bmMobik7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXQobiArIGFtb3VudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHByb2dyZXNzXHJcbiAgICogQHBhcmFtIG5cclxuICAgKi9cclxuICBzZXQobjogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdGhpcy5jbGFtcChuKSwgYWN0aXZlOiB0cnVlfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgY29uZmlnXHJcbiAgICogQHBhcmFtIGNvbmZpZ1xyXG4gICAqL1xyXG4gIHNldENvbmZpZyhjb25maWc6IE5nUHJvZ3Jlc3NDb25maWcpIHtcclxuICAgIHRoaXMuX2NvbmZpZy5uZXh0KHsuLi50aGlzLl9jb25maWcudmFsdWUsIC4uLmNvbmZpZ30pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdHJveSBwcm9ncmVzcyByZWZlcmVuY2VcclxuICAgKi9cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5fd29ya2VyLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLl90cmlja2xpbmcuY29tcGxldGUoKTtcclxuICAgIHRoaXMuX3N0YXRlLmNvbXBsZXRlKCk7XHJcbiAgICB0aGlzLl9jb25maWcuY29tcGxldGUoKTtcclxuICAgIHRoaXMuX29uRGVzdHJveUNhbGxiYWNrKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgcHJvZ3Jlc3Mgc3RhdGVcclxuICAgKiBAcGFyYW0gc3RhdGVcclxuICAgKi9cclxuICBwcml2YXRlIHNldFN0YXRlKHN0YXRlOiBOZ1Byb2dyZXNzU3RhdGUpIHtcclxuICAgIHRoaXMuX3N0YXRlLm5leHQoey4uLnRoaXMuY3VyclN0YXRlLCAuLi5zdGF0ZX0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xhbXBzIGEgdmFsdWUgdG8gYmUgYmV0d2VlbiBtaW4gYW5kIG1heFxyXG4gICAqIEBwYXJhbSBuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBjbGFtcChuOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KHRoaXMuX2NvbmZpZy52YWx1ZS5taW4sIE1hdGgubWluKHRoaXMuX2NvbmZpZy52YWx1ZS5tYXgsIG4pKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEtlZXBzIGluY3JlbWVudGluZyB0aGUgcHJvZ3Jlc3NcclxuICAgKiBAcGFyYW0gY29uZmlnXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBvblRyaWNrbGluZyhjb25maWc6IE5nUHJvZ3Jlc3NDb25maWcpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xyXG4gICAgaWYgKCF0aGlzLmlzU3RhcnRlZCkge1xyXG4gICAgICB0aGlzLnNldCh0aGlzLl9jb25maWcudmFsdWUubWluKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aW1lcigwLCBjb25maWcudHJpY2tsZVNwZWVkKS5waXBlKHRhcCgoKSA9PiB0aGlzLmluYygpKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wbGV0ZXMgdGhlbiByZXNldHMgdGhlIHByb2dyZXNzXHJcbiAgICogQHBhcmFtIGNvbmZpZ1xyXG4gICAqL1xyXG4gIHByaXZhdGUgb25Db21wbGV0ZShjb25maWc6IE5nUHJvZ3Jlc3NDb25maWcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuICF0aGlzLmlzU3RhcnRlZCA/IG9mKHt9KSA6IG9mKHt9KS5waXBlKFxyXG4gICAgICAvLyBDb21wbGV0ZXMgdGhlIHByb2dyZXNzXHJcbiAgICAgIHRhcCgoKSA9PiB0aGlzLnNldFN0YXRlKHt2YWx1ZTogMTAwfSkpLFxyXG5cclxuICAgICAgLy8gSGlkZXMgdGhlIHByb2dyZXNzIGJhciBhZnRlciBhIHRpbnkgZGVsYXlcclxuICAgICAgZGVsYXkoY29uZmlnLnNwZWVkICogMS43KSxcclxuICAgICAgdGFwKCgpID0+IHRoaXMuc2V0U3RhdGUoe2FjdGl2ZTogZmFsc2V9KSksXHJcblxyXG4gICAgICAvLyBSZXNldHMgdGhlIHByb2dyZXNzIHN0YXRlXHJcbiAgICAgIGRlbGF5KGNvbmZpZy5zcGVlZCksXHJcbiAgICAgIHRhcCgoKSA9PiB0aGlzLnNldFN0YXRlKHt2YWx1ZTogMH0pKVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19
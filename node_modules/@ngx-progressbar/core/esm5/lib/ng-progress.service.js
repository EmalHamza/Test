/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject, Optional } from '@angular/core';
import { NgProgressRef } from './ng-progress-ref';
import { NG_PROGRESS_CONFIG } from './ng-progress.interface';
import * as i0 from "@angular/core";
import * as i1 from "./ng-progress.interface";
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
        this.config = config ? tslib_1.__assign({}, defaultConfig, config) : defaultConfig;
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
                progressRef.setConfig(tslib_1.__assign({}, this.config, config));
            }
            return progressRef;
        }
        else {
            // Create new ProgressRef instance
            /** @type {?} */
            var progressRef = new NgProgressRef(tslib_1.__assign({}, this.config, config), this.deleteInstance(id));
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
    /** @nocollapse */ NgProgress.ngInjectableDef = i0.defineInjectable({ factory: function NgProgress_Factory() { return new NgProgress(i0.inject(i1.NG_PROGRESS_CONFIG, 8)); }, token: NgProgress, providedIn: "root" });
    return NgProgress;
}());
export { NgProgress };
if (false) {
    /**
     * Store progress bar instances
     * @type {?}
     * @private
     */
    NgProgress.prototype._instances;
    /**
     * Global config
     * @type {?}
     */
    NgProgress.prototype.config;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcHJvZ3Jlc3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BuZ3gtcHJvZ3Jlc3NiYXIvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9uZy1wcm9ncmVzcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQW9CLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7Ozs7QUFnQmhFLFVBQUMsQ0FBUztJQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUNoQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFBRSxPQUFPLEdBQUcsQ0FBQztJQUNsQyxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7O0lBcEJHLGFBQWEsR0FBcUI7SUFDdEMsR0FBRyxFQUFFLENBQUM7SUFDTixHQUFHLEVBQUUsR0FBRztJQUNSLEtBQUssRUFBRSxHQUFHO0lBQ1YsWUFBWSxFQUFFLENBQUM7SUFDZixZQUFZLEVBQUUsR0FBRztJQUNqQixLQUFLLEVBQUUsSUFBSTtJQUNYLE1BQU0sRUFBRSxJQUFJO0lBQ1osS0FBSyxFQUFFLEtBQUs7SUFDWixPQUFPLEVBQUUsSUFBSTtJQUNiLElBQUksRUFBRSxRQUFRO0lBQ2QsS0FBSyxFQUFFLFNBQVM7SUFDaEIsU0FBUyxFQUFFLE1BQU07SUFDakIsZUFBZSxFQUFFLE9BQU87SUFDeEIsV0FBVyxNQU1WO0NBQ0Y7QUFFRDtJQVdFLG9CQUFvRCxNQUF3Qjs7OztRQUwzRCxlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQXlCLENBQUM7UUFNN0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxzQkFBSyxhQUFhLEVBQUssTUFBTSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDdkUsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7SUFDSCx3QkFBRzs7Ozs7O0lBQUgsVUFBSSxFQUFXLEVBQUUsTUFBeUI7UUFBdEMsbUJBQUEsRUFBQSxXQUFXO1FBQ2IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTs7O2dCQUVyQixXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzNDLElBQUksTUFBTSxFQUFFO2dCQUNWLFdBQVcsQ0FBQyxTQUFTLHNCQUFLLElBQUksQ0FBQyxNQUFNLEVBQUssTUFBTSxFQUFFLENBQUM7YUFDcEQ7WUFDRCxPQUFPLFdBQVcsQ0FBQztTQUNwQjthQUFNOzs7Z0JBRUMsV0FBVyxHQUFHLElBQUksYUFBYSxzQkFBSyxJQUFJLENBQUMsTUFBTSxFQUFLLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNGLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNyRDtJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCwrQkFBVTs7OztJQUFWO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPOzs7O1FBQUMsVUFBQyxHQUFrQixJQUFLLE9BQUEsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFiLENBQWEsRUFBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7T0FFRzs7Ozs7OztJQUNLLG1DQUFjOzs7Ozs7SUFBdEIsVUFBdUIsRUFBVTtRQUFqQyxpQkFJQztRQUhDOzs7UUFBTztZQUNMLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdCLENBQUMsRUFBQztJQUNKLENBQUM7O2dCQWpERixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dEQVNjLFFBQVEsWUFBSSxNQUFNLFNBQUMsa0JBQWtCOzs7cUJBdENwRDtDQTZFQyxBQWxERCxJQWtEQztTQS9DWSxVQUFVOzs7Ozs7O0lBR3JCLGdDQUErRDs7Ozs7SUFHL0QsNEJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ1Byb2dyZXNzUmVmIH0gZnJvbSAnLi9uZy1wcm9ncmVzcy1yZWYnO1xyXG5pbXBvcnQgeyBOZ1Byb2dyZXNzQ29uZmlnLCBOR19QUk9HUkVTU19DT05GSUcgfSBmcm9tICcuL25nLXByb2dyZXNzLmludGVyZmFjZSc7XHJcblxyXG5jb25zdCBkZWZhdWx0Q29uZmlnOiBOZ1Byb2dyZXNzQ29uZmlnID0ge1xyXG4gIG1pbjogOCxcclxuICBtYXg6IDEwMCxcclxuICBzcGVlZDogMjAwLFxyXG4gIGRlYm91bmNlVGltZTogMCxcclxuICB0cmlja2xlU3BlZWQ6IDMwMCxcclxuICBmaXhlZDogdHJ1ZSxcclxuICBtZXRlb3I6IHRydWUsXHJcbiAgdGhpY2s6IGZhbHNlLFxyXG4gIHNwaW5uZXI6IHRydWUsXHJcbiAgZWFzZTogJ2xpbmVhcicsXHJcbiAgY29sb3I6ICcjMUI5NUUwJyxcclxuICBkaXJlY3Rpb246ICdsdHIrJyxcclxuICBzcGlubmVyUG9zaXRpb246ICdyaWdodCcsXHJcbiAgdHJpY2tsZUZ1bmM6IChuOiBudW1iZXIpOiBudW1iZXIgPT4ge1xyXG4gICAgaWYgKG4gPj0gMCAmJiBuIDwgMjApIHJldHVybiAxMDtcclxuICAgIGlmIChuID49IDIwICYmIG4gPCA1MCkgcmV0dXJuIDQ7XHJcbiAgICBpZiAobiA+PSA1MCAmJiBuIDwgODApIHJldHVybiAyO1xyXG4gICAgaWYgKG4gPj0gODAgJiYgbiA8IDk5KSByZXR1cm4gMC41O1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfVxyXG59O1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdQcm9ncmVzcyB7XHJcblxyXG4gIC8qKiBTdG9yZSBwcm9ncmVzcyBiYXIgaW5zdGFuY2VzICovXHJcbiAgcHJpdmF0ZSByZWFkb25seSBfaW5zdGFuY2VzID0gbmV3IE1hcDxzdHJpbmcsIE5nUHJvZ3Jlc3NSZWY+KCk7XHJcblxyXG4gIC8qKiBHbG9iYWwgY29uZmlnICovXHJcbiAgY29uZmlnOiBOZ1Byb2dyZXNzQ29uZmlnO1xyXG5cclxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KE5HX1BST0dSRVNTX0NPTkZJRykgY29uZmlnOiBOZ1Byb2dyZXNzQ29uZmlnKSB7XHJcbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZyA/IHsuLi5kZWZhdWx0Q29uZmlnLCAuLi5jb25maWd9IDogZGVmYXVsdENvbmZpZztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBvciBDcmVhdGUgcHJvZ3Jlc3MgYmFyIGJ5IElEXHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICogQHBhcmFtIGNvbmZpZ1xyXG4gICAqL1xyXG4gIHJlZihpZCA9ICdyb290JywgY29uZmlnPzogTmdQcm9ncmVzc0NvbmZpZykge1xyXG4gICAgaWYgKHRoaXMuX2luc3RhbmNlcy5oYXMoaWQpKSB7XHJcbiAgICAgIC8vIEdldCBQcm9ncmVzc1JlZiBpbnN0YW5jZVxyXG4gICAgICBjb25zdCBwcm9ncmVzc1JlZiA9IHRoaXMuX2luc3RhbmNlcy5nZXQoaWQpO1xyXG4gICAgICBpZiAoY29uZmlnKSB7XHJcbiAgICAgICAgcHJvZ3Jlc3NSZWYuc2V0Q29uZmlnKHsuLi50aGlzLmNvbmZpZywgLi4uY29uZmlnfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHByb2dyZXNzUmVmO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gQ3JlYXRlIG5ldyBQcm9ncmVzc1JlZiBpbnN0YW5jZVxyXG4gICAgICBjb25zdCBwcm9ncmVzc1JlZiA9IG5ldyBOZ1Byb2dyZXNzUmVmKHsuLi50aGlzLmNvbmZpZywgLi4uY29uZmlnfSwgdGhpcy5kZWxldGVJbnN0YW5jZShpZCkpO1xyXG4gICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2VzLnNldChpZCwgcHJvZ3Jlc3NSZWYpLmdldChpZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95IGFsbCBwcm9ncmVzcyBiYXIgaW5zdGFuY2VzXHJcbiAgICovXHJcbiAgZGVzdHJveUFsbCgpIHtcclxuICAgIHRoaXMuX2luc3RhbmNlcy5mb3JFYWNoKChyZWY6IE5nUHJvZ3Jlc3NSZWYpID0+IHJlZi5kZXN0cm95KCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQSBkZXN0cm95ZXIgZnVuY3Rpb24gZm9yIGVhY2ggcHJvZ3Jlc3MgYmFyIGluc3RhbmNlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBkZWxldGVJbnN0YW5jZShpZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB0aGlzLl9pbnN0YW5jZXMuZGVsZXRlKGlkKTtcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==
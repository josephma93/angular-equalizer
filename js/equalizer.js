(function(angular) {
    'use strict';
    angular.module('equalizer', []);

    function uiEqualizerCtrl ($interval) {
        var childs = [],
            intervalPromise,
            STR_FIRST_HEIGHT = 'firstHeight',
            TICK = 250;

        var reflow = function() {
            console.log("reflow fn called");
            var heights = childs.map(function (value) {
                return value[0].offsetHeight;
            });
            var max = Math.max.apply(null, heights);
            for (var i = childs.length - 1; i >= 0; i--) {
                childs[i].css('height', max + 'px');
            }
        };

        var testForReflow = function() {
            var noNeedReflow = true;
            for (var i = childs.length - 1; i >= 0; i--) {
                if ( childs[i].data(STR_FIRST_HEIGHT) !== childs[i][0].offsetHeight ) {
                    childs[i].data(STR_FIRST_HEIGHT, childs[i][0].offsetHeight);
                    noNeedReflow = false;
                }
            }
            if (!noNeedReflow) {
                reflow();
            }
        };

        var startWatching = function() {
            intervalPromise = $interval(function() {
                testForReflow();
            },TICK);
        };

        var stopWatching = function() {
            $interval.cancel(intervalPromise);
        };

        this.addChild = function(pChild) {
            pChild.data(STR_FIRST_HEIGHT, pChild[0].offsetHeight);
            childs.push(pChild);
            if (childs.length === 1) {
                startWatching();
            }
            reflow();
        };

        this.removeChild = function(pChild) {
            childs.splice(childs.indexOf(pChild), 1);
            if (childs.length) {
                reflow();
            } else {
                stopWatching();
            }
        };
    }

    function uiEqualizer() {
        return {
            controller: [
                '$interval',
                uiEqualizerCtrl
            ],
            restrict: 'A',
            scope: {},
        };
    }

    //========================================

    function uiEqualizerWatchLinkFn () {
        // arguments order:
        // $scope [0], $element [1], $attrs [2], uiEqualizerCtrl [3]
        var uiEqualizerCtrl = arguments[3],
            $element = arguments[1];

        uiEqualizerCtrl.addChild($element);
        $element.on('$destroy', function() {
            uiEqualizerCtrl.removeChild();
        });
    }

    function uiEqualizerWatch() {
        return {
            link: uiEqualizerWatchLinkFn,
            require: '^uiEqualizer',
            restrict: 'A',
        };
    }

    angular.module('equalizer')
        .directive('uiEqualizer', [uiEqualizer])
        .directive('uiEqualizerWatch', [uiEqualizerWatch]);

})(window.angular);
(function(global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        global.DisableDevtool = factory();
    }
}(this, function() {
    'use strict';

    // Function to check the type of variable
    function getType(variable) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            return function(variable) { return typeof variable; };
        } else {
            return function(variable) {
                return variable && typeof Symbol === "function" && variable.constructor === Symbol && variable !== Symbol.prototype ? "symbol" : typeof variable;
            };
        }
    }

    // Function to copy properties
    function extend(target, props) {
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];
            prop.enumerable = prop.enumerable || false;
            prop.configurable = true;
            if ("value" in prop) prop.writable = true;
            Object.defineProperty(target, prop.key, prop);
        }
    }

    // ... (rest of the code)

    var defaultSettings = {
        md5: "",
        ondevtoolopen: function() {
            // Default behavior when dev tools are opened
            if (defaultSettings.url) {
                window.location.href = defaultSettings.url;
            } else if (defaultSettings.rewriteHTML) {
                try {
                    document.documentElement.innerHTML = defaultSettings.rewriteHTML;
                } catch (error) {
                    document.documentElement.innerText = defaultSettings.rewriteHTML;
                }
            } else {
                try {
                    window.opener = null;
                    window.open("", "_self");
                    window.close();
                    window.history.back();
                } catch (error) {
                    console.log(error);
                }
                setTimeout(function() {
                    window.location.href = defaultSettings.timeOutUrl || "https://theajack.github.io/disable-devtool/404.html?h=" + encodeURIComponent(location.host);
                }, 500);
            }
        },
        ondevtoolclose: null,
        url: "",
        timeOutUrl: "",
        tkName: "ddtk",
        interval: 500,
        disableMenu: true,
        stopIntervalTime: 5000,
        clearIntervalWhenDevOpenTrigger: false,
        detectors: [0, 1, 3, 4, 5, 6, 7],
        clearLog: true,
        disableSelect: false,
        disableCopy: false,
        disableCut: false,
        disablePaste: false,
        ignore: null,
        disableIframeParents: true,
        seo: true,
        rewriteHTML: ""
    };

    // Function to merge user settings with default settings
    function mergeSettings(userSettings) {
        var settings = userSettings || {};
        for (var key in defaultSettings) {
            if (settings[key] === undefined || getType(defaultSettings[key]) !== getType(settings[key]) && !['detectors', 'ondevtoolclose', 'ignore'].includes(key)) {
                settings[key] = defaultSettings[key];
            }
        }
        if (typeof settings.ondevtoolclose === 'function' && settings.clearIntervalWhenDevOpenTrigger) {
            settings.clearIntervalWhenDevOpenTrigger = false;
            console.warn("【DISABLE-DEVTOOL】clearIntervalWhenDevOpenTrigger is invalid when using ondevtoolclose");
        }
        return settings;
    }

    // ... (rest of the code)
}));

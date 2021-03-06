/**
 *
 * Get viewport size of the current browser window.
 *
 * <example>
    :getSource.js
    client
        .url('http://webdriver.io')
        .getViewportSize().then(function(size) {
            console.log(size); // outputs: {width: 1024, height: 768}
        })
        .getViewportSize('width').then(function(size) {
            console.log(size); // outputs: 1024
        })
        .getViewportSize('height').then(function(size) {
            console.log(size); // outputs: 768
        });
 * </example>
 *
 * @param {String} property  if "width" or "height" is set it returns only that property
 * @returns {Object}  viewport width and height of the browser
 * @uses protocol/execute
 * @type window
 *
 */

var getViewportSizeHelper = require('../helpers/_getViewportSize');

module.exports = function getViewportSize (prop) {

    return this.execute(getViewportSizeHelper).then(function(res) {

        if(typeof prop === 'string' && prop.match(/(width|height)/)) {
            prop = 'screen' + prop.slice(0,1).toUpperCase() + prop.slice(1);
            return res.value[prop];
        }

        return {
            width: res.value.screenWidth || 0,
            height: res.value.screenHeight || 0
        };

    });

};
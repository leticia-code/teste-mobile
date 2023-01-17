const {join} = require('path')
const allure = require('allure-commandline')
const video = require('wdio-video-reporter');

exports.config = {
    //hostname: 'localhost',
    //port: 4723,
    //path: '/wd/hub',
    user: "leticia_vr1d25",
    key: "3LTzGFYBUS9x9VeZcdwU",
    //services: ['appium'],
    services: ['browserstack'],
    specs: [
        './test/specs/**/*.spec.js'
    ],
    framework: 'mocha',
    capabilities: [{
        "platformName": "Android",
        //"platformVersion": "12.0",
        //"deviceName": "ebac-qe",
        //"automationName": "UiAutomator2",
        //"app": join(process.cwd(), './app/android/loja-ebac.apk'),
        //"appWaitActivity": "com.woocommerce.android/.ui.login.LoginActivity"

        project: "Meu primeiro projeto em Device Farm",
        build: "1",
        name: "test_login",
        device: "Samsung Galaxy S8 Plus",
        os_version: "9.0",
        app: 'bs://506de1b85c7f926d5c7eaa7e6fda09ca81211d44',
    }],
    waitForTimeout: 20000,
    mochaOpts:{
        timeout:300000
    },
    reporters: ['spec',
    ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]
    [video, {
        saveAllVideos: true,       // If true, also saves videos for successful test cases
        videoSlowdownMultiplier: 50, // Higher to get slower videos, lower for faster videos [Value 1-100]
      }],
    ],
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
    afterStep: async function (step, scenario, { error, duration, passed }, context) {
        driver.takeScreenshot();
    }
}
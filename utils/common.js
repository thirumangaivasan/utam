

require('module-alias/register');
const assert = require('assert');
const path = require('path');
const fs = require('fs');   
const { exec } = require('child_process');

async function switchToNextWindow(){
    await new Promise(resolve => setTimeout(resolve, 3000)); // waits for 3 seconds
    // Get all window handles and switch to the newest one      
    const currentHandle = await browser.getWindowHandle();

    const handles = await browser.getWindowHandles();
    const nextHandle = handles.find(handle => handle !== currentHandle);
    if (nextHandle) {
        await browser.switchToWindow(nextHandle);
        return;
    }
    else {
        throw new Error('No new window found');
    }
    await browser.switchToWindow(handles[handles.length - 1]);
}  

async function checkWindowTitle(expectedTitle) {
    const title = await browser.getTitle();
    assert.ok(title.includes(expectedTitle), `Expected title to be "${expectedTitle}" but found "${title}"`);
}

async function takeScreenshot(filename) {
    const screenshotDir = path.join(process.cwd(), 'screenshots');
     if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }
    const screenshotPath = path.join(screenshotDir, filename);
    await browser.saveScreenshot(screenshotPath);
    console.log(`Screenshot saved to ${screenshotPath}`);
}   

async function mainFrame() {
    await utam.enterFrame(framedetails)
    
}

async function selectDropdownOption(dropdownOptions, optionValue) {
    let indexToSelect = -1;
    for(let i=0; i< dropdownOptions.length; i++) {
        const optionText = await dropdownOptions[i].getText();
        console.log(`Option ${i}: ${optionText}`);
        if(optionText.toLowerCase() === optionValue.toLowerCase()) {
            indexToSelect = i;
            break;
        }   
    }
    if(indexToSelect !== -1) {
        console.log(`selecting option ${indexToSelect} with value ${optionValue}`);
        await dropdownOptions[indexToSelect].click();}
    else {
        console.log(`Option with value ${optionValue} not found in dropdown`);
        throw new Error(`Option with value ${optionValue} not found in dropdown`);
    }
}


async function handleAlert(action = 'accept', inputText = '') {
    console.log(`Handling alert with action: ${action}`);
    try {
        console.log('Waiting for alert to be present...');
        const alert = await browser.getAlertText(); // Check if alert is present
        console.log(`Alert text: ${alert}`);

        if (inputText) {
            console.log(`Sending text to alert: ${inputText}`);
            await browser.sendAlertText(inputText); // For prompt alerts
            console.log('Text sent to alert successfully');
        }

        if (action === 'accept') {
            console.log('Accepting alert...');
            await browser.acceptAlert();
            console.log('Alert accepted successfully');
        } else if (action === 'dismiss') {
            console.log('Dismissing alert...');
            await browser.dismissAlert();
            console.log('Alert dismissed successfully');
        } else {
            console.log(`Unknown action: ${action}`);
            throw new Error(`Unknown alert action: ${action}`);
        }

        console.log(`Alert ${action}ed successfully`);
    } catch (err) {
        console.error('No alert present or error handling alert:', err.message);
    }
}

module.exports = {
    switchToNextWindow,
    checkWindowTitle,
    takeScreenshot,
    mainFrame,
    selectDropdownOption, handleAlert
};
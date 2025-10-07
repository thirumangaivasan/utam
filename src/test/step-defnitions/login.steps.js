//const {Given, When, Then} = require('@cucumber/cucumber');
const {Given, When, Then} = require('@wdio/cucumber-framework');
const assert = require('assert');
const field = require('../../../pageobjects/test');
const { selectDropdownOption, takeScreenshot, handleAlert , switchToNextWindow, checkWindowTitle} = require('../../../utils/common');

Given('get the url', async () => {  
    await browser.url('https://practice-automation.com/form-fields/');
    const title = await browser.getTitle();
    console.log('Title is: ' + title);
  //  assert.strictEqual(title, 'Learn and Practice Automation | automateNow');
    //need to add hard wait
    await new Promise(resolve => setTimeout(resolve, 15000));
console.log('waited for 10 seconds');

});

When('I test fields radio buttons dropdowns', async () => {
    console.log('Inside automation step');
    await new Promise(resolve => setTimeout(resolve, 3000)); // waits for 3 seconds
    console.log('clicked on form fields link');
    const fieldsSection1 = await utam.load(field);
    console.log('Loaded form fields page');
    const name = await fieldsSection1.getName();
    console.log('Got name field');
    await name.setText('TestUser');
    console.log('Set name field');
    await takeScreenshot('nameField.png');
    const drink = await fieldsSection1.getFavDrink();
    console.log('Got fav drink field');
    await drink[0].click();
    console.log('Clicked on fav drink field');
    await takeScreenshot('favDrink.png');
    const color = await fieldsSection1.getFavColor();
    await color[2].click();
    await takeScreenshot('favColor.png');
    const ddtest = await fieldsSection1.getDropDownTest();
    await selectDropdownOption(ddtest, 'No');
    await takeScreenshot('dropdown.png');
    const email = await fieldsSection1.getEmail();
    await email.setText('testUser@gmail.com');
    await takeScreenshot('email.png');
    const message = await fieldsSection1.getMessage();
    await message.setText('This is test message');
    await message.element.scrollIntoView();
    await takeScreenshot('message.png');
    const submit = await fieldsSection1.getSubmit(); 
    await submit.element.scrollIntoView({ block: 'center' });   
    await submit.click();
    await takeScreenshot('submit.png');
    console.log('Clicked on submit button'); 
});

// When('I test popups', async () => {
//     await browser.url('https://practice-automation.com/popups/');
//     const title = await browser.getTitle();
//     console.log('Title is: ' + title);
//    // assert.strictEqual(title, 'Learn and Practice Automation | automateNow');
//     console.log('Inside popup step');
//     await new Promise(resolve => setTimeout(resolve, 3000)); // waits for 3 seconds
    
//     const popupSection = await utam.load(field); 
//     console.log('Loaded popup page');
// //     const alertButton = await popupSection.getAlertPopup();
// //     await alertButton.click();
// //     console.log('Clicked on alert button');
   
// // try {
// //     const alertText = await browser.getAlertText();
// //     console.log(`Alert says: ${alertText}`);
// //     await browser.acceptAlert();
// //     console.log('Alert accepted successfully');
// // } catch (err) {
// //     console.error('Alert not present or already dismissed:', err.message);
// // }
// //     await takeScreenshot('alertPopup.png');
// //     console.log('Took screenshot of alert popup');

// const confirmButton = await popupSection.getConfirmPopup();
//     await confirmButton.click();
//     console.log('Clicked on confirm button');
//     //await new Promise(resolve => setTimeout(resolve, 3000)); // waits for 3 seconds
//     const alertText = await browser.getAlertText();
//    console.log(`Alert says: ${alertText}`);
//     await browser.acceptAlert();
//     console.log('Alert accepted successfully');
//     await takeScreenshot('confirmPopup.png');
//     console.log('Took screenshot of confirm popup');
//     await new Promise(resolve => setTimeout(resolve, 3000)); // waits for 3 seconds


//        // await new Promise(resolve => setTimeout(resolve, 10000)); // waits for 3 seconds
//     // await handleAlert('accept');
//     // console.log('Accepted the alert1');
//     // await new Promise(resolve => setTimeout(resolve, 3000)); // waits for 3 seconds
//     // const confirmButton = await popupSection.getConfirmButton();
//     // await confirmButton.click();
//     // console.log('Clicked on confirm button');
//     // await new Promise(resolve => setTimeout(resolve, 3000)); // waits for 3 seconds
//     // await handleAlert('dismiss');
//     // console.log('Dismissed the confirm alert');
//     // await new Promise(resolve => setTimeout(resolve, 3000)); // waits for 3 seconds
//     // const promptButton = await popupSection.getPromptButton();
//     // await promptButton.click();
//     // console.log('Clicked on prompt button');
//     // await new Promise(resolve => setTimeout(resolve, 3000));
//     // await handleAlert('accept', 'TestUser');
//     // console.log('Accepted the prompt alert with text');
//     // await new Promise(resolve => setTimeout(resolve, 3000));
//     // await takeScreenshot('popup.png');
//     // console.log('Took screenshot of popup section');
//     // await new Promise(resolve => setTimeout(resolve, 3000)); // waits for 3 seconds
// });


When('I test popups', async () => {
    await browser.url(' http://localhost:3000');
    const title = await browser.getTitle();
    console.log('Title is: ' + title);

    // assert.strictEqual(title, 'Learn and Practice Automation | automateNow');
    console.log('Inside popup step');
    await new Promise(resolve => setTimeout(resolve, 3000)); // waits for 3 seconds
    const section = await utam.load(field); 
    console.log('Loaded popup page');
    const first = await section.getFirstName()
    await first.setText('TestUser');
    const clear = await section.getClear()
    await takeScreenshot('beforeAlert.png');
    await clear.click();

    const alertText = await browser.getAlertText();
    console.log(`Alert says: ${alertText}`);
   await browser.acceptAlert();
   console.log('Alert accepted successfully');

});

When('I open new window', async () => {
    await browser.url('https://practice-automation.com/window-operations/');
    const title = await browser.getTitle();
    console.log('Title is: ' + title);  
    const multiWindowSection = await utam.load(field); 
    console.log('Loaded multiple window page');
    const newWindowButton = await multiWindowSection.getNewWindow();    
    await newWindowButton.click();
    console.log('Clicked on new window button');
    await new Promise(resolve => setTimeout(resolve, 5000)); // waits for 5 seconds
    //call switch window function
    const handles = await browser.getWindowHandles();
    console.log('Window handles: ' + handles);  
    await switchToNextWindow();
    console.log('Switched to new window');  
    await new Promise(resolve => setTimeout(resolve, 5000));
     // waits for 5 seconds  
    await checkWindowTitle('automateNow | The Best FREE Software Online Training Platform');
    console.log('Checked window title');  
    await takeScreenshot('newWindow.png');
    console.log('Took screenshot of new window');  
 const newWindowButton1 = await utam.load(field); 
 const searchlink= await newWindowButton1.getSearchToggle()
    await searchlink.click();
    console.log('Clicked on search link');
    await takeScreenshot('searchlink.png');
    await new Promise(resolve => setTimeout(resolve, 5000));
});

When('I test frames', async () => {
    await browser.url('https://practice-automation.com/iframes/');
    const title = await browser.getTitle(); 
    console.log('Title is: ' + title);

    const frameSection = await utam.load(field); 
    console.log('Loaded frames page');
    const frame1 = await frameSection.getFrameone();
    await utam.enterFrame(frame1);
    console.log('Entered into frame 1');
     const frameSection1 = await utam.load(field); 
     
    const search = await frameSection1.getSearchButton();
    console.log('Got get started link in frame 1');
    await search[1].click();
    console.log('Clicked on get started link in frame 1');
    await takeScreenshot('frame1.png');
    console.log('Took screenshot of frame 1');
    //add wait
    await new Promise(resolve => setTimeout(resolve, 5000)); // waits for 5 seconds
});



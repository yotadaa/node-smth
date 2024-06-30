const puppeteer = require('puppeteer');

const groupName = "Kaldu Basi";

const { processContacts } = require('./vcf');

// _9vcv _advm -> join group button id
// search button = _ai0b._ai08
// search field = selectable-text.copyable-text.x15bjb6t.x1n2onr6
const listItem = ".x10l6tqk.xh8yej3.x1g42fcv"; // at 1
const messageFIeld = "x1hx0egp.x6ikm8r.x1odjw0f.x1k6rcq7.x6prxxf" // at index 1
const groupHeader = "._amie";
const popper = "._aigv._aig-._aohg"; //wait for this before adding member
const addMember = "._ak72._ak73._ak76._ak77"; // at [0]
const memberPopper = ".x104kibb.x1iyjqo2.x4osyxg.x6ikm8r.x10wlt62.xlm9qay.x1vczkso.x1mzt3pk.xo442l1.x1ua5tub.xk50ysn.x1rdy4ex" // wait for this
const searchMember = ".selectable-text.copyable-text.x15bjb6t.x1n2onr6" // at 0
const target = ".x10l6tqk.xh8yej3.x1g42fcv";
const targetCheckbox = ".x10l6tqk.x8zc4e7.x11uqc5h.x78zum5.x6s0dn4.x5yr21d.x47corl" // at 0
const confirmMember = ".x10l6tqk.x1a87ojn.x3h4tne.xg01cxk.x1f85oc2" // wait for this and click
const extraConfirm = ".x889kno.x1a8lsjc.xbbxn1n.xxbr6pl.x1n2onr6.x1rg5ohu.xk50ysn.x1f6kntn.xyesn5m.x1z11no5.xjy5m1g.x1mnwbp6.x4pb5v6.x178xt8z.xm81vs4.xso031l.xy80clv.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x1v8p93f.xogb00i.x16stqrj.x1ftr3km.x1hl8ikr.xfagghw.x9dyr19.x9lcvmn.xbtce8p.x14v0smp.xo8ufso.xcjl5na.x1k3x3db.xuxw1ft.xv52azi"; // wait and click
const timeout = 120000;
const contacts = processContacts();

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // Set headless to false to see the browser actions
    const page = await browser.newPage();
    await page.goto('https://web.whatsapp.com/', { waitUntil: 'networkidle2' });
    await page.waitForSelector('#app');

    // Wait for the span element and ensure it is clickable
    await page.waitForSelector('span._akav', { visible: true });
    await page.evaluate(() => {
        const linkWithNumber = document.querySelector('span._akav');
        linkWithNumber.click();
    });

    const inputSelector = '.selectable-text.x1n2onr6.xy9n6vp.x1n327nk.xh8yej3.x972fbf.xcfux6l.x1qhh985.xm0m39n.xjbqb8w.x1uvtmcs.x1jchvi3.xss6m8b.xexx8yu.x4uap5.x18d9i69.xkhd6sd';
    await page.waitForSelector(inputSelector, { visible: true });
    await page.focus(inputSelector);

    // Select all text and delete it
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');

    // Type the new phone number
    await page.keyboard.type('+62 895703051945');

    // Wait for the login button and click it
    await page.waitForSelector('.x889kno.x1a8lsjc.xbbxn1n.xxbr6pl.x1n2onr6.x1rg5ohu.xk50ysn.x1f6kntn.xyesn5m.x1z11no5.xjy5m1g.x1mnwbp6.x4pb5v6.x178xt8z.xm81vs4.xso031l.xy80clv.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x1v8p93f.xogb00i.x16stqrj.x1ftr3km.x1hl8ikr.xfagghw.x9dyr19.x9lcvmn.xbtce8p.x14v0smp.xo8ufso.xcjl5na.x1k3x3db.xuxw1ft.xv52azi', { visible: true });
    await page.evaluate(() => {
        const loginByNumberButton = document.querySelector('.x889kno.x1a8lsjc.xbbxn1n.xxbr6pl.x1n2onr6.x1rg5ohu.xk50ysn.x1f6kntn.xyesn5m.x1z11no5.xjy5m1g.x1mnwbp6.x4pb5v6.x178xt8z.xm81vs4.xso031l.xy80clv.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x1v8p93f.xogb00i.x16stqrj.x1ftr3km.x1hl8ikr.xfagghw.x9dyr19.x9lcvmn.xbtce8p.x14v0smp.xo8ufso.xcjl5na.x1k3x3db.xuxw1ft.xv52azi');
        loginByNumberButton.click();
    });

    // Wait for the login id and print it
    await page.waitForSelector('.x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.x78zum5.xozqiw3.x1oa3qoh.x12fk4p8.xeuugli.x2lwn1j.xl56j7k.x1q0g3np.x6s0dn4.light', { visible: true, timeout: 120000 });
    await page.evaluate(() => {
        const idElements = document.querySelectorAll('.x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.x78zum5.xozqiw3.x1oa3qoh.x12fk4p8.xeuugli.x2lwn1j.xl56j7k.x1q0g3np.x6s0dn4.light');
        console.log(idElements)
    });

    await page.waitForSelector('._ai0b._ai08', { visible: true, timeout: 120000 });
    await page.click("._ai0b._ai08");
    await page.click(".selectable-text.copyable-text.x15bjb6t.x1n2onr6");
    await page.keyboard.type(groupName);

    await page.waitForSelector(listItem, { visible: true, timeout });
    await page.click(listItem);

    await page.waitForSelector(groupHeader, { visible: true, timeout });
    await page.click(groupHeader);

    await page.waitForSelector(popper, { visible: true, timeout });
    await page.evaluate((addMember) => {
        const addBtnMbr = document.querySelectorAll(addMember)[0];
        addBtnMbr.click();
    }, addMember)

    await page.waitForSelector(memberPopper);
    for (const contact of contacts) {
        await page.click(searchMember);
        await page.type(searchMember, contact);
        await page.waitForSelector(targetCheckbox);
        const checkbox = await page.$(targetCheckbox);
        await checkbox.click();
        await page.click(searchMember);
        await page.keyboard.down('Control');
        await page.keyboard.press('A');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace');
    }

    await page.waitForSelector(confirmMember);
    await page.click(confirmMember);
    await page.waitForSelector(extraConfirm);
    await page.click(extraConfirm);


    // await page.waitForSelector('.selectable-text.copyable-text.x15bjb6t.x1n2onr6', { visible: true });
    // await page.click(".selectable-text.copyable-text.x15bjb6t.x1n2onr6");

    // await page.keyboard.type('Tes 123');
    // await page.keyboard.down('Enter');



    // await browser.close();
})();

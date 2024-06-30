import asyncio
from pyppeteer import launch
# from vcf import process_contacts

group_name = "Kaldu Basi"
list_item = ".x10l6tqk.xh8yej3.x1g42fcv"
message_field = ".x1hx0egp.x6ikm8r.x1odjw0f.x1k6rcq7.x6prxxf"
group_header = "._amie"
popper = "._aigv._aig-._aohg"
add_member = "._ak72._ak73._ak76._ak77"
member_popper = ".x104kibb.x1iyjqo2.x4osyxg.x6ikm8r.x10wlt62.xlm9qay.x1vczkso.x1mzt3pk.xo442l1.x1ua5tub.xk50ysn.x1rdy4ex"
search_member = ".selectable-text.copyable-text.x15bjb6t.x1n2onr6"
target_checkbox = ".x10l6tqk.x8zc4e7.x11uqc5h.x78zum5.x6s0dn4.x5yr21d.x47corl"
confirm_member = ".x10l6tqk.x1a87ojn.x3h4tne.xg01cxk.x1f85oc2"
extra_confirm = ".x889kno.x1a8lsjc.xbbxn1n.xxbr6pl.x1n2onr6.x1rg5ohu.xk50ysn.x1f6kntn.xyesn5m.x1z11no5.xjy5m1g.x1mnwbp6.x4pb5v6.x178xt8z.xm81vs4.xso031l.xy80clv.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x1v8p93f.xogb00i.x16stqrj.x1ftr3km.x1hl8ikr.xfagghw.x9dyr19.x9lcvmn.xbtce8p.x14v0smp.xo8ufso.xcjl5na.x1k3x3db.xuxw1ft.xv52azi"
timeout = 120000

async def main():
    browser = await launch(headless=False)
    page = await browser.newPage()
    await page.goto('https://web.whatsapp.com/', {'waitUntil': 'networkidle2'})
    await page.waitForSelector('#app')
    contacts = ['6281276972525', '62895339975091']

    await page.waitForSelector('._ai0b._ai08', {'visible': True, 'timeout': timeout})
    await page.click('._ai0b._ai08')
    await page.waitForSelector('.selectable-text.copyable-text.x15bjb6t.x1n2onr6', {'visible': True, 'timeout': timeout})
    await page.click('.selectable-text.copyable-text.x15bjb6t.x1n2onr6')
    await page.keyboard.type(group_name)

    await page.waitForSelector(list_item, {'visible': True, 'timeout': timeout})
    await page.click(list_item)

    await page.waitForSelector(group_header, {'visible': True, 'timeout': timeout})
    await page.click(group_header)

    await page.waitForSelector(popper, {'visible': True, 'timeout': timeout})
    await page.evaluate(f'''() => {{
        const addBtnMbr = document.querySelectorAll('{add_member}')[0];
        addBtnMbr.click();
    }}''')

    await page.waitForSelector(member_popper, {'visible': True, 'timeout': timeout})
    for contact in contacts:
        await page.waitForSelector(search_member, {'visible': True, 'timeout': timeout})
        await page.click(search_member)
        await page.type(search_member, contact)
        await page.waitForSelector(target_checkbox, {'visible': True, 'timeout': timeout})
        checkbox = await page.querySelector(target_checkbox)
        await checkbox.click()
        await page.click(search_member)
        await page.keyboard.down('Control')
        await page.keyboard.press('A')
        await page.keyboard.up('Control')
        await page.keyboard.press('Backspace')

    await page.waitForSelector(confirm_member, {'visible': True, 'timeout': timeout})
    await page.click(confirm_member)
    await page.waitForSelector(extra_confirm, {'visible': True, 'timeout': timeout})
    await page.click(extra_confirm)

    # Uncomment to close the browser after execution
    # await browser.close()

asyncio.get_event_loop().run_until_complete(main())

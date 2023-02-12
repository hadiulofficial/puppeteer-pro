import puppeteer from 'puppeteer';
import fs from 'fs';

async function main() {
    const browser = await puppeteer.launch();
    const page  = await browser.newPage()

    await page.goto('https://www.traversymedia.com/')

    //*for capture full page image
    // await page.screenshot({path: './assets/images/test.png', fullPage: 'true'})

    //*for get pdf file
    // await page.pdf({path: './assets/files/test.pdf', format: 'A4'})


    //*get html content
    // const html = await page.content()


    //*get documents
    // const title = await page.evaluate(()=> document.body.innerText)

    //*get all link in page
    // const links = await page.evaluate(()=> Array.from(document.querySelectorAll('a'), (e)=> e.href))

    //*get all courses from this site
    const courses = await page.evaluate(()=> Array.from(document.querySelectorAll('.cscourse-grid .card'), (e)=> ({
        title: e.querySelector('.card-body h3').innerHTML
    })))

    console.log(courses);
    fs.writeFile('test.json', JSON.stringify(courses), (err)=> {
        if(err) throw err;
        console.log('file saved');
    })


    await browser.close()
}

main();
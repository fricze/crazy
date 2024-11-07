import { launch } from "puppeteer";

// await page.setViewport({
//   width: 640,
//   height: 480,
//   deviceScaleFactor: 1,
// });
// await page.goto("http://127.0.0.1:8080/preview.html");
// await page.screenshot({ path: "image1.png" });

// await page.setViewport({
//   width: 640,
//   height: 480,
//   deviceScaleFactor: 2,
// });
// await page.goto("http://127.0.0.1:8080/preview.html");
// await page.screenshot({ path: "image2.png" });

export const makeScreenshot = async () => {
  const browser = await launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 640,
    height: 480,
    deviceScaleFactor: 3,
  });
  await page.goto("http://127.0.0.1:8080/prev.html");
  const img = await page.screenshot({ path: "image_page.png" });
  const pdf = await page.pdf({
    path: "doc.pdf",
    width: 640,
    height: 480,
    printBackground: true,
  });

  await browser.close();

  return img;
};

// await page.setViewport({
//   width: 640,
//   height: 480,
//   deviceScaleFactor: 4,
// });
// await page.goto("http://127.0.0.1:8080/preview.html");
// await page.screenshot({ path: "image4.png" });

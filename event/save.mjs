import { launch } from "puppeteer";

export const makeScreenshot = async () => {
  const browser = await launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 660,
    height: 660,
    deviceScaleFactor: 3,
  });
  await page.goto("http://127.0.0.1:8080/speaker_prev.html");
  const img = await page.screenshot({ path: "speaker.png" });

  await browser.close();

  return img;
};

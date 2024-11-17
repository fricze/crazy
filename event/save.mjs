import { launch } from "puppeteer";

export const makeScreenshot = async (filename = "speaker.png") => {
  const browser = await launch({
    args: ["--enableFeatures=TextBoxTrim"],
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 660,
    height: 660,
    deviceScaleFactor: 3,
  });
  await page.goto("http://127.0.0.1:8080/speaker_prev.html", {
    waitUntil: "load",
  });
  await page.waitForNetworkIdle({ idleTime: 250 });

  const img = await page.screenshot({ path: filename });

  await browser.close();

  return img;
};

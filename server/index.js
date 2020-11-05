const Koa = require("koa");
const cors = require("@koa/cors");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const puppeteer = require("puppeteer");

const app = new Koa();

app.use(cors());

app.use(bodyParser());

const router = new Router();

router.post("/scripts", async (ctx, next) => {
  console.log(ctx.request.body);

  const domain = ctx.request.body.site;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(domain).catch((err) => console.log(err));

  const scripts = await page.evaluate(() => {
    let result = [];
    let scripts = document.getElementsByTagName("script");
    for (let script of scripts) {
      if (script.getAttribute("src")) {
        let src = script.getAttribute("src");
        result.push(src);
      }
    }
    let links = document.getElementsByTagName("link");
    for (let link of links) {
      if (
        link.getAttribute("type") == "text/css" ||
        link.getAttribute("as") == "style"
      ) {
        result.push(link.getAttribute("href"));
      }
    }
    return result;
  });

  browser.close();
  ctx.body = scripts;
  await next();
});

app.use(router.routes());

app.listen(3000, () => {
  console.log("App is running on http://localhost:3000");
});

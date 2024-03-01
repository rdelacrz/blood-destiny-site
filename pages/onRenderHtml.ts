// https://vike.dev/onRenderHtml
export { onRenderHtml }
import { App } from "vue";
import { renderToNodeStream, renderToString } from "vue/server-renderer";
import { dangerouslySkipEscape, escapeInject, version } from "vike/server";
import type { OnRenderHtmlAsync, PageContext } from "vike/types";
import { dom } from "@fortawesome/fontawesome-svg-core";
import { isCallable } from "@/utilities";
import { createVueApp } from "./app";

checkVikeVersion();

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  const title = getHeadSetting("title", pageContext);
  const favicon = getHeadSetting("favicon", pageContext);
  const lang = getHeadSetting("lang", pageContext) || "en";

  const titleTag = !title ? "" : escapeInject`<title>${title}</title>`;
  const faviconTag = !favicon ? "" : escapeInject`<link rel="icon" href="${favicon}" />`;

  let pageView: ReturnType<typeof dangerouslySkipEscape> | ReturnType<typeof renderToNodeStream> | string = "";
  let fromHtmlRenderer = undefined;

  if (!!pageContext.Page) {
    // SSR is enabled
    const ctxWithApp = await createVueApp(pageContext);
    const { app } = ctxWithApp;
    pageView = !pageContext.config.stream
      ? dangerouslySkipEscape(await renderToStringWithErrorHandling(app))
      : renderToNodeStreamWithErrorHandling(app);

    fromHtmlRenderer = await pageContext.config.onAfterRenderSSRApp?.(ctxWithApp);
  }

  let headHtml: ReturnType<typeof dangerouslySkipEscape> | string = "";
  if (!!pageContext.config.Head) {
    const { app } = await createVueApp(pageContext, /*ssrApp*/ true, /*renderHead*/ true);
    headHtml = dangerouslySkipEscape(await renderToStringWithErrorHandling(app));
  }

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="${lang}">
      <head>
        <meta charset="UTF-8" />
        ${titleTag}
        ${headHtml}
        ${faviconTag}
        <style type="text/css">${dangerouslySkipEscape(dom.css())}</style>
      </head>
      <body>
        <div id="page-view">${pageView}</div>
      </body>
      <!-- built with https://github.com/vikejs/vike-vue -->
    </html>`;

  return {
    documentHtml,
    pageContext: {
      enableEagerStreaming: true,
      fromHtmlRenderer
    }
  }
}

async function renderToStringWithErrorHandling(app: App) {
  let returned = false;
  let err: unknown;
  // Workaround: renderToString_() swallows errors in production, see https://github.com/vuejs/core/issues/7876
  app.config.errorHandler = (err_) => {
    if (returned) {
      console.error(err_);
    } else {
      err = err_;
    }
  }
  const appHtml = await renderToString(app);
  returned = true;
  if (err) throw err;
  return appHtml;
}

function renderToNodeStreamWithErrorHandling(app: App) {
  let returned = false;
  let err: unknown;
  app.config.errorHandler = (err_) => {
    if (returned) {
      console.error(err_);
    } else {
      err = err_;
    }
  }
  const appHtml = renderToNodeStream(app);
  returned = true;
  if (err) throw err;
  return appHtml;
}

function checkVikeVersion() {
  if (version) {
    const versionParts = version.split(".").map((s) => parseInt(s, 10)) as [number, number, number];
    if (versionParts[0] > 0) return;
    if (versionParts[1] > 4) return;
    if (versionParts[2] >= 147) return;
  }
  throw new Error("Update Vike to 0.4.147 or above");
}

function getHeadSetting(
  headSetting: 'title' | 'favicon' | 'lang',
  pageContext: PageContext
): undefined | null | string {
  const config = pageContext.configEntries[headSetting]?.[0];
  if (!config) return undefined;
  const val = config.configValue;
  if (typeof val === 'string') return val;
  if (!val) return null;
  if (isCallable(val)) {
    const valStr = val(pageContext);
    if (typeof valStr! !== 'string') {
      throw new Error(config.configDefinedAt + ' should return a string');
    }
    return valStr;
  } else {
    throw new Error(config.configDefinedAt + ' should be a string or a function returning a string');
  }
}
// https://vike.dev/onRenderHtml
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";
import { dom } from "@fortawesome/fontawesome-svg-core";
import { getPageTitle } from "@/utilities";
import favicon from "./favicon.ico";

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  const { htmlStream } = pageContext;
  const title = getPageTitle(pageContext);

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title}</title>
        <link rel="icon" href="${favicon}">
        <style type="text/css">${dangerouslySkipEscape(dom.css())}</style>
      </head>
      <body>
        <div id="app">${htmlStream}</div>
      </body>
    </html>`;

  // Waits until the stream has ended in order for onServerPrefetch to finish collecting data
  // https://vike.dev/streaming#initial-data-after-stream-end
  const pageContextPromise = async () => {
    return {
      // https://vike.dev/stream
      enableEagerStreaming: true
    }
  }

  return {
    documentHtml,
    pageContext: {
      // https://vike.dev/stream
      enableEagerStreaming: true
    },
  }
}

export { onRenderHtml }
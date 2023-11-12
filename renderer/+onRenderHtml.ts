// https://vike.dev/onRenderHtml
import { escapeInject } from 'vike/server';
import type { OnRenderHtmlAsync } from 'vike/types';
import { getPageTitle } from './getPageTitle';

const onRenderHtml: OnRenderHtmlAsync = async (pageContext): ReturnType<OnRenderHtmlAsync> => {
  const { htmlStream } = pageContext;
  const title = getPageTitle(pageContext);

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${htmlStream}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // https://vike.dev/stream
      enableEagerStreaming: true
    }
  }
}

export { onRenderHtml }
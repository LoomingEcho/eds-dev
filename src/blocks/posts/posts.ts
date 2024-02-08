import { html, render } from 'lit';
import { createOptimizedPicture } from '../../utils/createOptimizedPicture';
import { fetchText } from '../../utils/fetch.ts';
import { SheetService } from '../../services/sheet.service.ts';

interface PostArgs {
  postUrl: string;
  headline?: string;
  text?: string;
  picture: HTMLPictureElement;
}

const postTemplate = (args: PostArgs) => {
  const { postUrl, headline, text, picture } = args;
  return html`
    <article>
      <a href="${postUrl}" class="image">${picture}</a>
      <h3>${headline}</h3>
      <p>${text?.slice(0, 200)}</p>
      <ul class="actions">
        <li><a href="${postUrl}" class="button">More</a></li>
      </ul>
    </article>
  `;
};

const template = (posts: PostArgs[]) => {
  return posts.map((post) => postTemplate(post));
};

export default async function (block: HTMLElement) {
  block.innerHTML = '';

  const sheetService = new SheetService();
  const parser = new DOMParser();

  const siteMap = await sheetService.getSiteMap();
  const siteMapPostEntries = siteMap.filter((item) => item.path.includes('/posts'));

  const postsPreview = await Promise.all(
    siteMapPostEntries.map(async (post) => await fetchText(`${post.path}.plain.html`))
  );

  const postsPreviewHtml = postsPreview.map((res) => parser.parseFromString(res, 'text/html'));

  const posts = postsPreviewHtml.map((doc, index) => {
    return {
      postUrl: `${window.hlx.codeBasePath}${siteMapPostEntries[index].path}`,
      headline: doc.querySelector('h1')?.innerText || doc.querySelector('h2')?.innerText,
      text: doc.querySelector('p')?.innerText?.trim(),
      picture: createOptimizedPicture({
        src: siteMapPostEntries[index].image,
        alt: siteMapPostEntries[index].imagealt,
      }),
    };
  });

  block.style.removeProperty('display');
  render(template(posts), block);
}

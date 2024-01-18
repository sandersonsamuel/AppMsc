const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// Lista de suas rotas
const routes = [
  '/',
  '/pesquisa/',
  '/my',
  '/login',
  '/criarconta',
  '/album/',
  '/artista/',
  '/user/',
  '/esqueceu/'
];

const sitemap = new SitemapStream({ hostname: 'https://melodymingler.vercel.app/' });

routes.forEach(route => {
  sitemap.write({ url: route, changefreq: 'daily', priority: 0.7 });
});

sitemap.end();

// Gera o sitemap e escreve no arquivo sitemap.xml
streamToPromise(sitemap)
  .then(sitemap => {
    createWriteStream('public/sitemap.xml').write(sitemap.toString());
  })

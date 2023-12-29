import cheerio from 'cheerio';

const url = "";

const fetchSetLinksHTML = async (url: string) => {
    const page = await fetch(url);
    const html = page.body;

    return html;
};

const findSetLinkFromHTML = async (html: string) => {
    const $ = cheerio.load(html);

    
};
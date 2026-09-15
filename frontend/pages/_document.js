import { Head, Html, Main, NextScript } from 'next/document';

const themeScript = `(function(){try{var s=localStorage.getItem('rikka-theme');var t=s==='dark'||s==='light'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==='dark'?'#131b2b':'#eefbfc'}catch(e){document.documentElement.dataset.theme='light'}})()`;

export default function Document({ locale }) {
  return <Html lang={locale} data-theme="light"><Head><meta name="theme-color" content={locale === 'en' ? '#eefbfc' : '#eefbfc'} /><script dangerouslySetInnerHTML={{ __html: themeScript }} /></Head><body><Main /><NextScript /></body></Html>;
}

Document.getInitialProps = async (ctx) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);
  const locale = ctx.pathname === '/ja' || ctx.pathname.startsWith('/ja/') ? 'ja'
    : ctx.pathname === '/en' || ctx.pathname.startsWith('/en/') ? 'en' : 'pt-BR';
  return { ...initialProps, locale };
};

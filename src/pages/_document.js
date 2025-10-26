import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
          rel='stylesheet'
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />

        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap'
          rel='stylesheet'
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${
                process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MCHV6ZPK'
              }');
            `,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Meta Pixel Code */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=true;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${
                process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '730930632906788'
              }');
              fbq('track', 'PageView');
            `,
          }}
        /> */}
        {/* End Meta Pixel Code */}
      </Head>
      <body className='antialiased'>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe https://www.googletagmanager.com/ns.html?id=${
                process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MCHV6ZPK'
              }
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />

        {/* End Google Tag Manager (noscript) */}
        {/* Meta Pixel (noscript) */}
        {/* <noscript>
          <img
            height='1'
            width='1'
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${
              process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '1158770882724996'
            }&ev=PageView&noscript=1`}
          />
        </noscript> */}
        {/* End Meta Pixel (noscript) */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

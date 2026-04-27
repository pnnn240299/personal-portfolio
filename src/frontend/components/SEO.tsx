'use client'

import Head from 'next/head';

const SEO = ({ title, description, path }) => {
  const baseUrl = 'https://www.google.com/';
  
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${baseUrl}${path}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${baseUrl}${path}`} />
    </Head>
  );
};

export default SEO;
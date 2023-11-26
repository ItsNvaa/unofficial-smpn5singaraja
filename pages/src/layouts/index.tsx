import Head from "next/head";
import React from "react";
import { CLIENT_URL } from "@/const/config";
import Navbar from "@/pages/components/Navbar";

function Layout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/icons/smpn5singaraja.png" />
        <meta property="og:url" content={CLIENT_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/images/icons/smpn5singaraja.png" />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={CLIENT_URL} />
        <meta property="twitter:url" content={CLIENT_URL} />
        <meta name="twitter:site" content="@Devify" />
        <meta name="language" content="English" />
        <link rel="canonical" href={CLIENT_URL} />
        <meta name="author" content="Nova" />
        <meta
          name="keywords"
          content="SMP NEGERI 5 SINGARAJA, Indonesia, Bali, Singaraja, Sekolah"
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/images/icons/devify.svg" />
      </Head>
      <div>
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  );
}

export default Layout;

import { parseCookies, setCookie } from "nookies";
import Head from "next/head";
import React from "react";

function Home({ experiment }) {
  let color = "coral";
  if (experiment === "B") color = "palevioletred";

  return (
    <div style={{ margin: "20px auto", textAlign: "center", maxWidth: 600 }}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap-reboot.min.css"
          integrity="sha256-pTFzHsh1e+rz97pjNUpygMbwPzZM3iI3jPd9k4PBTko="
          crossorigin="anonymous"
        />
      </Head>

      <h1>
        You're in the {experiment} group, your button should be{" "}
        <code style={{ color }}>{color}</code>!
      </h1>

      <p style={{ fontSize: 40 }}>
        👉
        <button
          style={{
            backgroundColor: color,
            border: 0,
            borderRadius: 10,
            color: "white",
            fontFamily:
              'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
            fontSize: 25,
            margin: 40,
            padding: 10
          }}
        >
          Super Snazzy Button!
        </button>
        👈
      </p>

      <p>
        This button will stay <code style={{ color }}>{color}</code> every time
        you visit this site until you clear your cookies, and then you'll have a
        50/50 chance of getting the other color.
      </p>
    </div>
  );
}

Home.getInitialProps = async ctx => {
  let { experiment } = parseCookies(ctx);

  if (!experiment) {
    if (Math.random() < 0.5) {
      experiment = "A";
    } else {
      experiment = "B";
    }
    setCookie(ctx, "experiment", experiment);
  }
  return { experiment };
};

export default Home;

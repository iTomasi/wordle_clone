import {
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  MetaFunction,
  LinksFunction,
  Links
} from "remix";

// Components
import Header from "./components/header/Header";
import Layout from "./components/Layout";
import { links as linksButton } from "./components/Button"
import { links as linksInput } from "./components/form/Input";
import { Toaster } from "react-hot-toast";

// Context State
import UserState from "./context/user/UserState";

// Css
import variablesCss from "./css/variables.css";
import tailwindCss from "./css/tailwind.css";
import appCss from "./css/App.css";

export const meta: MetaFunction = () => {
  return { title: "New Remix App", description: "Wordle clone" };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: variablesCss },
    { rel: "stylesheet", href: tailwindCss },
    { rel: "stylesheet", href: appCss },
    ...linksButton(),
    ...linksInput(),
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <UserState>
          <Toaster/>
          <Header/>
          <Layout>
            <Outlet />
            <ScrollRestoration />
          </Layout>
        </UserState>
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { MantineProvider, AppShell, Footer } from "@mantine/core";
import { FooterSimple } from "./FooterSimple.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          "theme-blue-green": ["#2b6777"],
          "theme-light-blue": ["#c8d8e4"],
          "theme-light-grey": ["#f2f2f2"],
          "theme-green": ["#52ab98"],
        },
        defaultGradient: {
          from: "#52ab98",
          to: "#2b6777",
        },
        components: {
          Slider: {
            defaultProps: {
              color: "theme-green.0",
            },
          },
          Checkbox: {
            defaultProps: {
              color: "theme-green.0",
            },
          },
          Text: {
            defaultProps: {
              color: "theme-blue-green.0",
            },
          },
        },
      }}
    >
      <AppShell
        padding="md"
        footer={
          <Footer height={50}>
            <FooterSimple />
          </Footer>
        }
      >
        <App />
      </AppShell>
    </MantineProvider>
  </React.StrictMode>
);

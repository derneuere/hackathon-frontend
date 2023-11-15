import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { MantineProvider, AppShell, Footer } from "@mantine/core";
import { FooterSimple } from "./FooterSimple.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          "theme-blue-green": ["#2b6777"],
          "theme-light-blue": ["#c8d8e4", "#a0adb6", "#788289", "#3c4144"],
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
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AppShell>
    </MantineProvider>
  </React.StrictMode>
);

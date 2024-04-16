import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import { App } from "./App.tsx";
import "./global.css";

import { ThemeProvider } from "./providers/theme-provider.tsx";
import { ModalProvider } from "./providers/modal-provider.tsx";

import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="HDMovie-ui-theme">
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <Toaster position="top-right" duration={1500} />
          <ModalProvider />
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </ThemeProvider>,
);

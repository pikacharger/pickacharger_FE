import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import ToastProvider from "@/components/common/toast/provider/ToastProvider.tsx";
import GlobalStyles from "./styles/global.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import theme from "./styles/theme.ts";
import router from "./routes/routing.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;

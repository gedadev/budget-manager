import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import Router from "./Router";

function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster position="top-center" theme="dark" richColors />
    </AuthProvider>
  );
}

export default App;

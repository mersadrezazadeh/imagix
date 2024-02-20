import { ClerkProvider } from "@clerk/nextjs";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#624cf5" } }}>
      {children}
    </ClerkProvider>
  );
}

export default Providers;

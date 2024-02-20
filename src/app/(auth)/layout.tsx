function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen justify-center items-center bg-brand-100">
      {children}
    </main>
  );
}

export default Layout;

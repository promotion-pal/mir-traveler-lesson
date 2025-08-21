export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen items-center justify-center bg-gray-light px-5">
      <div className="w-[28rem] rounded-3xl bg-white px-10 py-12 shadow-lg">
        {children}
      </div>
    </main>
  );
}

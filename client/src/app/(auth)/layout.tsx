export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col justify-center items-center h-lvh overflow-hidden">
      <div className="w-full m-auto lg:max-w-lg">{children}</div>
    </div>
  );
}
 
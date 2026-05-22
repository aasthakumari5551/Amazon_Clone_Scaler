import Navbar from "@/components/layout/Navbar";
import CategoryBar from "@/components/layout/CategoryBar";
import Footer from "@/components/layout/Footer";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <CategoryBar />
      <main className="flex-1 bg-[var(--amazon-light)]">
        <div className="w-full">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

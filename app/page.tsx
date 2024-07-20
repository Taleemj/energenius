// import { SideNav, Navbar, Content } from "@/components";
import Background from "@/components/Background";
import SideNav from "@/components/SideNav";
import Content from "@/components/Content";
import Navbar from "@/components/NavBar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <SideNav />
      <Background />
      <Content />
    </main>
  );
}

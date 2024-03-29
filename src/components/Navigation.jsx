/* ----- Third Party Imports ----- */
import Link from "next/link";

/* ----- Project Imports ----- */
import "@/styles/navigation.css";

export default function Navigation () {
  return (
    <nav className="siteNavigation"> 
      <Link href="/">Home</Link>
    </nav>
  );
}
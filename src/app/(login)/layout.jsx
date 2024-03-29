/* ----- Third Party Imports ----- */

/* ----- Project Imports ----- */
import Navigation from "@/components/Navigation";
import "@/styles/login.css"

export default async function RootLayout({ children }) {
  return (
    <>
        <Navigation />
        <main className="loginMainElement">
        {children}
        </main>
    </>
  );
}
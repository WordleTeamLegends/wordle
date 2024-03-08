/* ----- Third Party Imports ----- */
import Link from "next/link";

/* ----- Project Imports ----- */
import GameContextProvider from "@/context/game-context";
import LoginManager from "@/components/LoginManager";

export default async function RootLayout({ children }) {
  return (
    <>
      <GameContextProvider>
        <LoginManager />
        <nav>
          <Link href="/">Home</Link>
        </nav>
        {children}
      </GameContextProvider>
    </>
  );
}

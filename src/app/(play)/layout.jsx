/* ----- Third Party Imports ----- */

/* ----- Project Imports ----- */
import GameContextProvider from "@/context/game-context";
import LoginManager from "@/components/LoginManager";
import Navigation from "@/components/Navigation";
import "@/styles/play.css";

export default async function RootLayout({ children }) {
  return (
    <>
      <GameContextProvider>
        <header>
        <LoginManager />
        <Navigation />
        </header>
        <main className="playPageMainElement">
        {children}
        </main>
      </GameContextProvider>
    </>
  );
}

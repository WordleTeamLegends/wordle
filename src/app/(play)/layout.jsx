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
        <header className="playPageHeader">
        <div className="alignLoginButton">
          <LoginManager />
        </div>
        <div className="centreNavLink">
          <Navigation />
        </div>
        </header>
        <main className="playPageMainElement">
        {children}
        </main>
      </GameContextProvider>
    </>
  );
}

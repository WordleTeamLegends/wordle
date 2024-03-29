/* ----- Third Party Imports ----- */
import { auth } from "@clerk/nextjs";
/* ----- Project Imports ----- */
import GameContextProvider from "@/context/game-context";
import LoginManager from "@/components/LoginManager";
import "@/styles/home.css"

export default async function RootLayout({ children }) {
  const { userId } = auth();
  return (
    <GameContextProvider>
      <header className="homePageHeader">
        <LoginManager />
      <section className={userId ? "homePageTitle centreHomePageTitle" : "homePageTitle"}>
        <h1>Embark on a Journey with Wordly Game</h1>
        <p>Where Words Come to Life!</p>
      </section>
      </header>
      <main className="homepageMainElement">
      {children}
      </main>
    </GameContextProvider>
  );
}

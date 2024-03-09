/* ----- Third Party Imports ----- */
/* ----- Project Imports ----- */
import GameContextProvider from "@/context/game-context";
import LoginManager from "@/components/LoginManager";

export default async function RootLayout({ children }) {
  return (
    <GameContextProvider>
      <LoginManager />
      {children}
    </GameContextProvider>
  );
}

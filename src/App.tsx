import "./styles/main.css";
import logoImg from "./assets/Logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useEffect, useState } from "react";
import { Modal } from "./components/Modal";
import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { Input } from "./components/Form/Input";
import { CreateAdModal } from "./components/CreateAdModal";
export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    Ads: number;
  };
}
function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    async function action() {
      const response = await fetch("http://localhost:3333/games");
      const data = await response.json();
      console.log(data);

      setGames(data);
    }
    action();
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <img src={logoImg} alt="logo-galaxy" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlwgradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        esta aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.Ads}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;

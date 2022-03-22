import { v4 as uuidv4 } from "uuid";

let chillHop = () => {
  return [
    {
      name: "LA BOHÈME",
      cover:
        "https://chillhop.com/wp-content/uploads/2022/03/2ac741e8e52e0008d1fb9cbfcdacd2cf9eaef2db-300x300.jpg",
      artist: "C Y G N",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=31589",
      color: ["#2A2720", "#2D9132"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Seagulls",
      cover:
        "https://chillhop.com/wp-content/uploads/2022/01/5753da482a6839b31e4905b22a2f8d65913e7eb4-300x300.jpg",
      artist: "Misha, Zmeyev, Viktor Minsky",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=28936",
      color: ["#5F95AD", "#FFE1C7"],
      id: uuidv4(),
      active: true,
    },
    {
      name: "Ending",
      cover: "https://i.scdn.co/image/ab67616d0000b273eaed420428f4881b7c6db265",
      artist: "sadtoi, Relyae",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=28969",
      color: ["#473C74", "#70588B"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Everyday",
      cover: "https://i.scdn.co/image/ab67616d0000b27353b09005b0ac07d102b91b51",
      artist: "chromonicci",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=9222",
      color: ["#D6B617", "#DBD1BA"],
      id: uuidv4(),
      active: false,
    },
    {
      name: "Dawn",
      cover: "https://i.scdn.co/image/ab67616d0000b2733b77898252400f064b789102",
      artist: "Hanz",
      audio: "https://mp3.chillhop.com/serve.php/?mp3=24708",
      color: ["#392E4C", "#D54948"],
      id: uuidv4(),
      active: false,
    },
  ];
};

export default chillHop;

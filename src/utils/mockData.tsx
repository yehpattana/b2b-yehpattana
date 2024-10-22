import {
  ItalianFlag,
  GermanyFlag,
  FrenchFlag,
  AmericanFlag,
  SpanishFlag,
} from "../img/flagIcon";

export const data = {
  languages: [
    { id: 1, text: "English", url: "/", icon: <AmericanFlag /> },
    { id: 2, text: "Italian", url: "/", icon: <ItalianFlag /> },
    { id: 3, text: "Germany", url: "/", icon: <GermanyFlag /> },
    { id: 4, text: "French", url: "/", icon: <FrenchFlag /> },
    { id: 5, text: "Spanish", url: "/", icon: <SpanishFlag /> },
  ],
  navBarTitle: {
    mainTitle: ["SPORT", "TEAMWEAR", "ARTIMARZIALI", "SPORTSTYLE"],
    subTitle: [
      "FOOT WEAR",
      " RUNNING APPAREL",
      "ARTI ACCESSORIES",
      "MULTITRAINING APPAREL",
    ],
  },
  products: [{}],
  mainImgUrl: [
    "https://b2b.mizuno.it/media/w270/h300/app/media/uploads/banners/17/image/it/RUNNING.jpg?cache=1",
    "https://b2b.mizuno.it/media/w270/h300/app/media/uploads/banners/18/image/it/TENNIS.jpg?cache=1",
    "https://b2b.mizuno.it/media/app/media/uploads/banners/19/image/it/COLLECTION_AW23.jpg?cache=1",
    "https://b2b.mizuno.it/media/w270/h300/app/media/uploads/banners/20/image/it/SOCCER.jpg?cache=1",
    "https://b2b.mizuno.it/media/w270/h300/app/media/uploads/banners/21/image/it/VOLLEY.jpg?cache=1",
  ],
};

export const mainLogo =
  "data:image/png;base64,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";

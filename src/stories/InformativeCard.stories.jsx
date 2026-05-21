import { InformativeCard } from "../components/InformativeCard";

export default {
  title: "Components/InformativeCard",
  component: InformativeCard,
};

export const Default = {
  args: {
    showClose: true,

    slides: [
      {
        title: "Descubre lo nuevo en Strateggie",

        description:
          "Ahora en Strateggie encontrarás nuevas novedades novedosas. Ingresa a tu cuenta y empieza a disfrutar de beneficios.",

        image:
          "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif",
      },
    ],
  },
};

export const Carousel = {
  args: {
    showClose: false,

    slides: [
      {
        title: "Explora funcionalidades",

        description:
          "Navega entre las nuevas funcionalidades y descubre herramientas útiles.",

        image:
          "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif",
      },

      {
        title: "Automatiza procesos",

        description:
          "Ahorra tiempo con herramientas inteligentes.",

        image:
          "https://media.giphy.com/media/l0HlNaQ6gWfllcjDO/giphy.gif",
      },

      {
        title: "Todo listo",

        description:
          "Empieza a disfrutar de la experiencia.",

        image:
          "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
      },
    ],
  },
};

export const CarouselWithClose = {
  args: {
    showClose: true,

    slides: [
      {
        title: "Nuevas actualizaciones",

        description:
          "Consulta las últimas novedades disponibles dentro de la plataforma.",

        image:
          "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif",
      
        tagText: "Centro de tareas",

        tagLink: "www.strateggie.com"
        },

      {
        title: "Personaliza tu experiencia",

        description:
          "Configura herramientas según tus necesidades.",

        image:
          "https://media.giphy.com/media/l0HlNaQ6gWfllcjDO/giphy.gif",
       
        tagText: "Centro de tareas",

        tagLink: "www.strateggie.com"
      },

      {
        title: "Todo configurado",

        description:
          "Ya puedes comenzar a utilizar Strateggie.",

        image:
          "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
              tagText: "Centro de tareas",

        tagText: "Sección 1",
        
        tagLink: "www.strateggie.com",
      },
    ],
  },
};
import {
    mdiMenu,
    mdiClockOutline,
    mdiCloud,
    mdiCrop,
    mdiAccount,
    mdiLogout,
    mdiThemeLightDark,
    mdiHome
  } from "@mdi/js";
  
  export default [
    /* 
    {
      icon: mdiMenu,
      label: "Funciones adicionales",
      menu: [
        {
          icon: mdiClockOutline,
          label: "Item One",
        },
        {
          icon: mdiCloud,
          label: "Item Two",
        },
        {
          isDivider: true,
        },
        {
          icon: mdiCrop,
          label: "Item Last",
        },
      ],
    },*/
    {
      isCurrentUser: true,
      menu: [
        {
          icon: mdiAccount,
          label: "Mi Perfil",
          to: "/perfil",
        },
        {
          isDivider: true,
        },
        {
          icon: mdiLogout,
          label: "Cerrar Sesión",
          isLogout: true,
        },
      ],
    },
    {
      icon: mdiThemeLightDark,
      label: "Light/Dark",
      isDesktopNoLabel: true,
      isToggleLightDark: true,
    },
    {
      icon: mdiHome ,
      label: "Pagina Principal",
      isDesktopNoLabel: true,
      href: "/",
      
    },
  ];
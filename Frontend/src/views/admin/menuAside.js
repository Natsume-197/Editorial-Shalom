import {
    mdiAccountCircle,
    mdiMonitor,
    mdiBookOpenPageVariant ,
    mdiLock,
    mdiCogs,
    mdiSquareEditOutline,
    mdiTable,
    mdiBookPlus,
    mdiCartOutline,
    mdiAccountPlus,
  } from "@mdi/js";
  
  export default [
    {
      to: "/dashboard/inicio",
      icon: mdiMonitor,
      label: "Inicio",
    },
    {
      icon: mdiCartOutline,
      label: "Ventas",
    },
    {
      label: "Registro",
      icon: mdiSquareEditOutline,
      menu: [
        {
          label: "Libros",
          icon: mdiBookPlus
        },
        {
          label: "Usuarios",
          icon: mdiAccountPlus
        },
      ],
    },
    {
      label: "Tablas",
      icon: mdiTable,
      menu: [
        {
          label: "Libros",
          icon: mdiBookPlus
        },
        {
          to: "/dashboard/tables",
          label: "Usuarios",
          icon: mdiAccountPlus
        },
      ],
    },
    {
      isDivider: true,
    },
    {
      href: "https://github.com/justboil/admin-one-vue-tailwind",
      label: "Manual",
      icon: mdiBookOpenPageVariant ,
      target: "_blank",
    },
    {
      to: "/error",
      label: "Ajustes",
      icon: mdiCogs,
    },
  ];
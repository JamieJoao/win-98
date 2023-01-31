import { IContextMenuItem } from 'types'

export const contextMenuItems: IContextMenuItem[] = [
  {
    id: 1,
    name: 'Ver',
    underlineLetter: 'V',
    subitems: [
      {
        id: 1,
        name: 'Iconos grandes',
        underlineLetter: 'G',
      },
      {
        id: 2,
        name: 'Iconos medianos',
        underlineLetter: 'M',
      },
      {
        id: 3,
        name: 'Iconos pequeños',
        underlineLetter: 'P',
      },
    ]
  },
  {
    id: 2,
    name: 'Actualizar',
    underlineLetter: 'A'
  },
  {
    id: 3,
    name: 'Nuevo',
    underlineLetter: 'N',
    subitems: [
      {
        id: 1,
        name: 'Carpeta',
        underlineLetter: 'C',
      },
      {
        id: 3,
        name: 'Documento de texto',
        underlineLetter: 'D',
      },
    ]
  },
  {
    id: 4,
    separator: true,
  }
]
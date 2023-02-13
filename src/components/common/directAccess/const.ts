import { IContextMenuItem } from 'types/interfaces'
import { programsInstalledModel } from 'models'

/*
export const directAccessContextMenu: IContextMenuItem[] = [
  {
    id: 1,
    name: 'Abrir',
    underlineLetter: 'A',
  },
  {
    id: 2 ,
    name: 'Cambiar nombre',
    underlineLetter: 'M',
  },
  {
    id: 3,
    name: 'Eliminar',
    underlineLetter: 'R',
  },
  {
    id: 4,
    separator: true,
  },
  {
    id: 5,
    name: 'Propiedades',
    underlineLetter: 'P',
  },
]
*/

export const getProgramForUID = (programUID: string) => {
  return programsInstalledModel.find(obj => obj.uid === programUID)
}

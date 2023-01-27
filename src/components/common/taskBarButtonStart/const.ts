import ProgramsIcon from 'assets/icons/shell_window6-1.png'
import DocumentsIcon from 'assets/icons/my-documents.png'
import SettingsIcon from 'assets/icons/settings_gear_cool-5.png'
import FindIcon from 'assets/icons/search_file-1.png'
import HelpIcon from 'assets/icons/help_book_cool-4.png'
import RunIcon from 'assets/icons/application_hourglass_small_cool-5.png'

export interface IMenuItem {
  id: number
  iconUrl: string
  name: string
  sublist?: IMenuItem[]
}

export const programsList: IMenuItem[] = [
  {
    id: 1,
    iconUrl: ProgramsIcon,
    name: 'Programas',
    sublist: [
      {
        id: 1,
        iconUrl: ProgramsIcon,
        name: 'Accesorios'
      },
      {
        id: 2,
        iconUrl: ProgramsIcon,
        name: 'StartUp',
        sublist: [
          {
            id: 1,
            iconUrl: ProgramsIcon,
            name: 'Accesorios'
          },
          {
            id: 2,
            iconUrl: ProgramsIcon,
            name: 'StartUp'
          },
        ]
      },
      {
        id: 3,
        iconUrl: ProgramsIcon,
        name: 'Exchange'
      },
      {
        id: 4,
        iconUrl: ProgramsIcon,
        name: 'Explorador'
      },
    ]
  },
  {
    id: 2,
    iconUrl: DocumentsIcon,
    name: 'Documentos',
  },
  {
    id: 3,
    iconUrl: SettingsIcon,
    name: 'Configuraciones',
  },
  {
    id: 4,
    iconUrl: FindIcon,
    name: 'Buscar',
  },
  {
    id: 5,
    iconUrl: HelpIcon,
    name: 'Ayuda',
  },
  {
    id: 6,
    iconUrl: RunIcon,
    name: 'Ejecutar',
  },
]
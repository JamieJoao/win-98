import ProgramsIcon from 'assets/icons/shell_window6-1.png'
import DocumentsIcon from 'assets/icons/my-documents.png'
import SettingsIcon from 'assets/icons/settings_gear_cool-5.png'
import FindIcon from 'assets/icons/search_file-1.png'
import HelpIcon from 'assets/icons/help_book_cool-4.png'
import RunIcon from 'assets/icons/application_hourglass_small_cool-5.png'
import InternetExplorerIcon from 'assets/icons/internet-explorer.png'
import WindowsExplorerIcon from 'assets/icons/directory_explorer-5.png'
import CalculatorIcon from 'assets/icons/calculator-0.png'
import NotepadIcon from 'assets/icons/notepad-5.png'
import AddressBookIcon from 'assets/icons/address_book-0.png'
import WordPadIcon from 'assets/icons/write_wordpad-1.png'
import PaintIcon from 'assets/icons/paint_file-4.png'
import FreeCellIcon from 'assets/icons/game_freecell-1.png'
import GameMineIcon from 'assets/icons/game_mine_1-0.png'
import SolitarieIcon from 'assets/icons/game_solitaire-0.png'
import FavoritesIcon from 'assets/icons/directory_favorites-2.png'

export interface IMenuItem {
  id: number
  iconUrl: string
  name: string
  sublist?: IMenuItem[]
  showed?: boolean
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
        name: 'Accesorios',
        sublist: [
          {
            id: 1,
            iconUrl: ProgramsIcon,
            name: 'Accesibilidad'
          },
          {
            id: 2,
            iconUrl: ProgramsIcon,
            name: 'Juegos',
            sublist: [
              {
                id: 1,
                iconUrl: FreeCellIcon,
                name: 'Celda Libre'
              },
              {
                id: 2,
                iconUrl: GameMineIcon,
                name: 'Buscaminas'
              },
              {
                id: 3,
                iconUrl: SolitarieIcon,
                name: 'Solitario'
              },
            ]
          },
          {
            id: 3,
            iconUrl: CalculatorIcon,
            name: 'Calculadora'
          },
          {
            id: 4,
            iconUrl: NotepadIcon,
            name: 'Block de Notas'
          },
          {
            id: 5,
            iconUrl: AddressBookIcon,
            name: 'Libro de Direcciones'
          },
          {
            id: 6,
            iconUrl: WordPadIcon,
            name: 'WordPad'
          },
          {
            id: 7,
            iconUrl: PaintIcon,
            name: 'Paint'
          },
        ]
      },
      {
        id: 2,
        iconUrl: ProgramsIcon,
        name: 'StartUp'
      },
      {
        id: 3,
        iconUrl: InternetExplorerIcon,
        name: 'Internet Explorer'
      },
      {
        id: 4,
        iconUrl: WindowsExplorerIcon,
        name: 'Windows Explorer'
      },
    ]
  },
  {
    id: 7,
    iconUrl: FavoritesIcon,
    name: 'Favoritos'
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
    name: 'Buscar'
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
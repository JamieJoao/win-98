import {
  NotepadTemplate,
  FileExplorer,
} from "components/templates"

export const templateMap: { [key: string]: () => JSX.Element } = {
  'notepad': NotepadTemplate,
  'file-explorer': FileExplorer
}
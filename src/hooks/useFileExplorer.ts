import { useAppSelector } from 'redux-tk/store'
import { getFromPath } from 'utils'

export const useFileExplorer = () => {
  const hardDisk = useAppSelector(state => state.hardDisk)

  const searchFile = (path: string) => {
    return getFromPath(path, hardDisk)
  }

  return {
    searchFile,
  }
}
import { useLocalStorage } from 'hooks'
import { useMemo } from 'react'

import { IFile, IDirectAccess, IFileProgram } from 'types/interfaces'
// import { getFileFromPath } from 'utils'
import { KEY_HARD_DISK } from 'utils/const'

type IFileMix = IFile & IFileProgram

export const useDesktop = (data: IFile) => {
  const { files } = data
  const { storage } = useLocalStorage(KEY_HARD_DISK)

  // const directAccessMemo = useMemo<IDirectAccess[]>(() => {
  //   if (files) {
  //     const filesAux: IFileMix[] = files as IFileMix[]

  //     return (
  //       filesAux
  //         .filter(obj => 'programUID' in obj)
  //         .map(obj => {
  //           const programLinked = getFileFromPath(obj.path, storage)
            
  //           return {
  //             name: programLinked?.name ?? obj.programUID,
  //             programLink: programLinked,
  //           }
  //         })
  //     )
  //   }

  //   return []
  // }, [data])

  // console.log(directAccessMemo)

  return {
    // directAccessMemo,
  }
}

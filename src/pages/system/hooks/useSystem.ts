import { useEffect, useMemo, useState } from 'react'

import { useLocalStorage } from 'hooks'
import { hardDiskModel } from 'models'
import { getFileFromPath } from 'utils'
import { KEY_HARD_DISK } from 'utils/const'

const PATH = 'C\\Windows\\Desktop'

export const useSystem = () => {
  const { storage, setValue } = useLocalStorage(KEY_HARD_DISK, hardDiskModel)

  /**
   * 1. ARRANCAMOS EL SISTEMA [SE MONTA EL COMPONENT SYSTEM]
   * 2. CARGAMOS EL DISCO DURO [EJECUTAMOS SETVALUE]
   * 3. TRAEMOS EL DESKTOP
   * 4. CARGAMOS EL DEKSTOP
   * 
   * EN CASO DE HABER ALGÚN ERROR EN LA LECTURA O ESCRITURA DEL DISCO DURO
   * 1. MOSTRAMOS PANTALLA AZUL
   */

  const desktopFolder = useMemo(() => {
    getFileFromPath(PATH, storage)
  }, [storage])

  useEffect(() => {
    setValue(hardDiskModel)
  }, [])

  return {
    desktopFolder,
  }
}

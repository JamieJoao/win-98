import { useEffect } from 'react'

import { DiskModel } from 'types'
import { hardDiskModel } from 'models'
import { useLocalStorage } from 'hooks'
import { parseHardDiskModel } from 'utils'
import { KEY_HARD_DISK } from 'utils/const'
import { useAppDispatch } from 'redux-tk/store'
import { setKeyValue } from 'redux-tk/slice'

export const useSystem = () => {
  const { storage } = useLocalStorage(KEY_HARD_DISK, hardDiskModel)
  const dispatch = useAppDispatch()

  /**
   * 1. LUEGO DE ENCENDER LA PC
   * 2. CARGO EL DISCO DURO EN EL REDUX
   * 3. PROCEDO A MOSTRAR EL DESKTOP
   */
  useEffect(() => {
    localStorage.clear()

    const disk = parseHardDiskModel<DiskModel>(storage)
    dispatch(setKeyValue({ key: 'hardDisk', value: disk }))
  }, [])
}

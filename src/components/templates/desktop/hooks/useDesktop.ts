import { useLocalStorage } from 'hooks'
import { KEY_HARD_DISK } from 'utils/const'

export const useDesktop = () => {
  const { storage } = useLocalStorage(KEY_HARD_DISK)

  console.log(2, storage)
}

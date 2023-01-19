import { Button } from 'components'
import StartIcon from 'assets/icons/windows-start.svg'

import './styles.scss'

interface Props {

}

export const TaskBar = ({ }: Props) => {
  return (
    <div className="w98-taskbar">
      <div className="w98-taskbar__container">

        <Button label='Start' iconUrl={StartIcon} bold />

      </div>
    </div>
  )
}

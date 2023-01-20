import { Button } from "./Button"
import { IPropsButton } from "./types"

import IconClose from 'assets/icons/icon-close.svg'

export const ButtonClose = (props: IPropsButton) => {
  return (
    <Button className='w98-button-close' { ...props }>
      <div className="w98-button-close__icon">
        <img src={IconClose} draggable={false} />
      </div>
    </Button>
  )
}

import { Button } from "./Button"
import { IPropsButton } from "./types"

import IconMinimize from 'assets/icons/icon-minimize.svg'

export const ButtonMinimize = (props: IPropsButton) => {
  return (
    <Button className="w98-button-minimize" { ...props }>
      <div className="w98-button-minimize__icon">
        <img src={IconMinimize} draggable={false} />
      </div>
    </Button>
  )
}

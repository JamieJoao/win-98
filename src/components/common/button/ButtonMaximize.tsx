import { Button } from "./Button"
import { IPropsButton } from "./types"

import IconMaximize from 'assets/icons/icon-maximize.svg'

export const ButtonMaximize = (props: IPropsButton) => {
  return (
    <Button className="w98-button-maximize" { ...props }>
      <div className="w98-button-maximize__icon">
        <img src={IconMaximize} draggable={false} />
      </div>
    </Button>
  )
}

import { Button } from "components"
import { IPropsButton } from "components/common/button/types"

import {ReactComponent as IconMaximize} from 'assets/icons/icon-maximize.svg'

export const ButtonMaximize = (props: IPropsButton) => {
  return (
    <Button className="w98-button-maximize" { ...props }>
      <div className="w98-button-maximize__icon">
        <IconMaximize />
      </div>
    </Button>
  )
}

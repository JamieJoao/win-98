import { Button } from "components"
import { IPropsButton } from "components/common/button/types"

import { ReactComponent as IconMinimize} from 'assets/icons/icon-minimize.svg'

export const ButtonMinimize = (props: IPropsButton) => {
  return (
    <Button className="w98-button-minimize" { ...props }>
      <div className="w98-button-minimize__icon">
        <IconMinimize />
      </div>
    </Button>
  )
}

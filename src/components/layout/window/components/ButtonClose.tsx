import { Button } from "components"
import { IPropsButton } from "components/common/button/types"

import { ReactComponent as IconClose } from 'assets/icons/icon-close.svg'

export const ButtonClose = (props: IPropsButton) => {
  return (
    <Button className='w98-button-close' { ...props }>
      <div className="w98-button-close__icon">
        <IconClose />
      </div>
    </Button>
  )
}

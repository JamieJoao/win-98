import cn from 'classnames'

import { useOverflowDropdown } from './useOverflowDropdown'

import ChevronRight from 'assets/icons/explorer/chevron-right.png'
import { ActionItem, ControlItem } from '../../const'
import { SplitName } from '../split-name/SplitName'

interface OverflowDrodownProps {
  list: (ControlItem & ActionItem)[]
  className?: string
}

export const OverflowDrodown = (props: OverflowDrodownProps): JSX.Element => {
  const { list, className } = props

  const {
    dropdownRef
    , open
    , boxStyles
    , handleToggleOpen } = useOverflowDropdown()

  return (
    <div
      className={cn('w98-list__item-container', className)}
      ref={dropdownRef}>
      <button className="w98-list__item --arrow" onClick={handleToggleOpen}>
        <img src={ChevronRight} />
      </button>
      <div
        className={cn('w98-list-dropdown', open && '--open')}
        style={boxStyles}>
        {list.map(({ iconKey, name, hotKey }, index) => (
          <button
            key={index}
            className={cn('w98-list-dropdown__item', iconKey && `--icon-${iconKey}`, `--${Boolean(iconKey) ? 'big' : 'small'}-dropdown`)}>
            {
              Boolean(iconKey)
                ? <span>{name}</span> 
                : <SplitName name={name} hotKey={hotKey} />
            }
          </button>
        ))}
      </div>
    </div>
  )
}

import cn from 'classnames'

import './styles.scss'

type TType = 'window' | 'button'

interface IProps {
  className?: string
  type: TType
  children: JSX.Element
}

export const BordererPanel = (props: IProps) => {
  const { children, className, type } = props

  return (
    <div className={cn('w98-borderer-panel', className, `--${type}`)}>
      <div className="w98-borderer-panel__content">
        {children}
      </div>
    </div>
  )
}

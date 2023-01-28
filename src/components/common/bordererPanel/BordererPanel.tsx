import cn from 'classnames'

import './styles.scss'

interface IProps {
  className?: string
  children: JSX.Element
}

export const BordererPanel = (props: IProps) => {
  const { children, className } = props

  return (
    <div className={cn('w98-borderer-panel', className)}>
      <div className="w98-borderer-panel__content">
        {children}
      </div>
    </div>
  )
}

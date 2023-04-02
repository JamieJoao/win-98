import cn from 'classnames'

import './styles.scss'

type TType = 'window' | 'button'

interface IProps {
  className?: string
  classNameContent?: string
  type: TType
  children: JSX.Element
}

export const BordererPanel = (props: IProps) => {
  const { children, className, classNameContent, type } = props

  return (
    <div className={cn('w98-borderer-panel', className, `--${type}`)}>
      <div className={cn('w98-borderer-panel__content', classNameContent)}>
        {children}
      </div>
    </div>
  )
}

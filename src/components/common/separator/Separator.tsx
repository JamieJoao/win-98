import cn from 'classnames'

import './styles.scss'

type TAlignment = 'vertical' | 'horizontal'

interface IProps {
  className?: string
  aligment: TAlignment
  style?: React.HTMLAttributes<HTMLDivElement>
  width?: number
  height?: number
}

export const Separator = (props: IProps) => {
  const { aligment = 'horizontal', width, height, style, className } = props

  return (
    <div
      className={cn('w98-separator', `--${aligment}`, className)}
      style={{ width, height, ...style }} />
  )
}
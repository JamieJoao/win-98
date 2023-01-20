import cn from 'classnames'

import { IPropsButton } from './types'

import './styles.scss'

export const Button = ({
  label,
  disabled,
  iconUrl,
  bold,
  className,
  children,
  classNameContent,
  onClick,
}: IPropsButton) => {
  return (
    <button
      className={cn('w98-button', bold && '--bold', className)}
      disabled={disabled}
      onClick={onClick}>
      <div
        className={cn('w98-button__content', classNameContent)}>
        {iconUrl && <img src={iconUrl} draggable={false} />}

        {!children && (
          <span className='w98-button__label'>
            { label }
          </span>
        )}

        { children }
      </div>
    </button>
  )
}

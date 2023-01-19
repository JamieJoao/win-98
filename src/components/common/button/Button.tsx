import classnames from 'classnames'

import './styles.scss'

interface Props {
  label?: string
  iconUrl?: string
  bold?: boolean
  disabled?: boolean
}

export const Button = ({ label, disabled, iconUrl, bold }: Props) => {
  return (
    <button
      className={classnames('w98-button', bold && '--bold')}
      disabled={disabled}>
      <div className="w98-button__content">
        {iconUrl && <img src={iconUrl} />}

        <span className='w98-button__label'>
          { label }
        </span>
      </div>
    </button>
  )
}

import AudioOnIcon from 'assets/icons/loudspeaker_rays-0.png'

import './styles.scss'

export const NotificationArea = () => {
  return (
    <div className="w98-narea">
      <div className="w98-narea__notifications">
        <div className="w98-narea__icon-container">
          <img src={AudioOnIcon} draggable={false} />
        </div>
      </div>
      <span className='w98-narea__date'>9:00 am</span>
    </div>
  )
}
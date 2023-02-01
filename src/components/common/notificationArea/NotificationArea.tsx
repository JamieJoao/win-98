import AudioOnIcon from 'assets/icons/loudspeaker_rays-1.png'
import AddressIcon from 'assets/icons/address_book-1.png'

import './styles.scss'

export const NotificationArea = () => {
  return (
    <div className="w98-narea">
      <div className="w98-narea__notifications">
        <div className="w98-narea__icon-container">
          <img src={AddressIcon} draggable={false} />
          <img src={AudioOnIcon} draggable={false} />
        </div>
      </div>
      <span className='w98-narea__date'>9:00 am</span>
    </div>
  )
}
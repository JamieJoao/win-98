import './ExplorerHeader.styles.scss'
import ConsoleIcon from 'assets/icons/search_web-0.png'
import ArrowLeft from 'assets/icons/explorer/arrow-left.png'
import ArrowRight from 'assets/icons/explorer/arrow-right.png'
import Up from 'assets/icons/explorer/up.png'
import Cut from 'assets/icons/explorer/cut.png'
import Copy from 'assets/icons/explorer/copy.png'
import Paste from 'assets/icons/explorer/paste.png'
import Undo from 'assets/icons/explorer/undo.png'
import Delete from 'assets/icons/explorer/delete.png'
import Properties from 'assets/icons/explorer/properties.png'
import Views from 'assets/icons/explorer/views.png'
import ChevronRight from 'assets/icons/explorer/chevron-right.png'

export const ExplorerHeader = (): JSX.Element => {
  return (
    <div className="w98-explorer-header">
      <div className="w98-explorer-controls">
        <div className="w98-explorer-controls__side-left w98-list">
          <div className='w98-list__item --handler' />
          <button className='w98-list__item'>
            <span className='--underline'>F</span>
            <span>ile</span>
          </button>
          <button className='w98-list__item'>
            <span className='--underline'>E</span>
            <span>dit</span>
          </button>
          <button className='w98-list__item'>
            <span className='--underline'>V</span>
            <span>iew</span>
          </button>
          <button className='w98-list__item'>
            <span className='--underline'>G</span>
            <span>o</span>
          </button>
          <button className='w98-list__item'>
            <span>F</span>
            <span className='--underline'>a</span>
            <span>vorites</span>
          </button>
          <button className='w98-list__item'>
            <span className='--underline'>H</span>
            <span>elp</span>
          </button>
        </div>
        <div className="w98-explorer-controls__side-right w98-list">
          <div className="w98-list__item-container">
            <div className="w98-list__item --arrow">
              <img src={ChevronRight} />
            </div>
          </div>

          <div className="w98-list__icon">
            <img src={ConsoleIcon} alt="console-icon" />
          </div>
        </div>
      </div>

      <div className="w98-explorer-separator"></div>

      <div className="w98-explorer-actions">
        <div className="w98-explorer-actions__side-left w98-list">
          <div className='w98-list__item --handler' />
          <button className='w98-list__item --big'>
            <img src={ArrowLeft} />
            <span>Back</span>
          </button>
          <button className='w98-list__item --big'>
            <img src={ArrowRight} />
            <span>Forward</span>
          </button>
          <button className='w98-list__item --big'>
            <img src={Up} />
            <span>Up</span>
          </button>
          <div className="w98-list__item --separator"></div>
          <button className='w98-list__item --big'>
            <img src={Cut} />
            <span>Cut</span>
          </button>
          <button className='w98-list__item --big'>
            <img src={Copy} />
            <span>Copy</span>
          </button>
          <button className='w98-list__item --big'>
            <img src={Paste} />
            <span>Paste</span>
          </button>
          <div className="w98-list__item --separator"></div>
          <button className='w98-list__item --big'>
            <img src={Undo} />
            <span>Undo</span>
          </button>
          <button className='w98-list__item --big'>
            <img src={Delete} />
            <span>Delete</span>
          </button>
          <button className='w98-list__item --big'>
            <img src={Properties} />
            <span>Properties</span>
          </button>
          <div className="w98-list__item --separator"></div>
          <button className='w98-list__item --big'>
            <img src={Views} />
            <span>View</span>
          </button>
        </div>
        <div className="w98-explorer-actions__side-right w98-list">
          <div className="w98-list__item-container">
            <div className="w98-list__item --arrow">
              <img src={ChevronRight} />
            </div>
          </div>
        </div>
      </div>

      <div className="w98-explorer-separator"></div>

      <div className="w98-explorer-address">
        <div className='w98-list__item --handler' />
        
      </div>
    </div>
  )
}

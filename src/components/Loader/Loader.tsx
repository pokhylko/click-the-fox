import { FC } from 'react'

import './Loader.scss'

export const Loader: FC = () => (
  <div className="loader">
    <span className="loader__spiner"></span>

    <h4 className="loader__title">Loading new images, please wait</h4>
  </div>
)

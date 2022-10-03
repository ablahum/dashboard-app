import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab'

import useStyles from './style'

const Map = ({ coordinates, setCoordinates, setBounds }) => {
  const classes = useStyles()
  const isMobile = useMediaQuery('(min-width: 600px')

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        defaultZoom={14}
        center={coordinates}
        margin={[50, 50, 50, 50]}
        // options={''}
        onChange={(e) => {
          console.log('e', e)

          setCoordinates({ lat: e.center.lat, lng: e.center.lng })
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}
        // onChildClick={''}
      ></GoogleMapReact>
    </div>
  )
}

export default Map

import { CssBaseline, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'

import { getPlacesData } from './apis'
import { Header, List, Map, Details } from './components'

function App() {
  const [places, setPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    getPlacesData(bounds.sw, bounds.ne).then((data) => {
      // console.log(data)
      setPlaces(data)
    })
  }, [coordinates, bounds])

  console.log(coordinates)

  return (
    <>
      <CssBaseline />
      <Header />

      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>

        <Grid item xs={12} md={8}>
          <Map coordinates={coordinates} setCoordinates={setCoordinates} setBounds={setBounds} />
        </Grid>
      </Grid>
    </>
  )
}

export default App

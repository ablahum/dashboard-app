import { CssBaseline, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'

import { getPlacesData } from './apis'
import { Header, List, Map, Details } from './components'

function App() {
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('')

  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState(null)

  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [places, setPlaces] = useState([])

  const [autocomplete, setAutocomplete] = useState(null)
  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating)

    setFilteredPlaces(filtered)
  }, [rating])

  useEffect(() => {
    if (bounds) {
      setIsLoading(true)

      // getWeatherData(coords.lat, coords.lng).then((data) => setWeatherData(data))

      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setRating('')
        setIsLoading(false)
      })
    }
  }, [bounds, type])

  const onLoad = (autoC) => setAutocomplete(autoC)

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()

    setCoordinates({ lat, lng })
  }

  return (
    <>
      <CssBaseline />
      <Header />

      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>

        <Grid item xs={12} md={8}>
          <Map coordinates={coordinates} setCoordinates={setCoordinates} setBounds={setBounds} />
        </Grid>
      </Grid>
    </>
  )
}

export default App

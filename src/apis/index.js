import axios from 'axios'

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async (sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lng,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'X-RapidAPI-Key': '97754c5d38msh353e1df8719b9f8p105376jsnebac6906d644',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      },
    })

    return data
  } catch (err) {
    console.log(err)
  }
}

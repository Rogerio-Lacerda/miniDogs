import createAsyncSlice from './helper/createAsyncSlice';

const photos = createAsyncSlice({
  name: 'photos',
  fetchConfig: (total = 3) => ({
    url: `https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=${total}&_user=0`,
    options: {
      method: 'GET',
      cache: 'no-store',
    },
  }),
});

const fetchPhotos = photos.asyncFetch;

export const showPhotos = (body) => async (dispatch) => {
  try {
    const payload = await dispatch(fetchPhotos(body));
  } catch {
    console.log('error');
  }
};

export const logoutPhotos = photos.logout;

export default photos;

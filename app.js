const clientID = 'f6b4d257c21a49e1a062e8a50a002f00';
const clientSecret = '2ff370dfb7ee4cdab5ed91f875c65785';
const tokenEndPoint = 'https://accounts.spotify.com/api/token';

const getToken = async () => {
  
  const response = await fetch(tokenEndPoint, {
    method: 'POST',
    headers: {
      'Content-type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic ' + btoa(clientID + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
  })

  const token = await response.json();
  // console.log(token.access_token);
  return token.access_token;
}

getToken()
  .then(token => getTrack(token))


const getTrack = async (token) => {

  // let trackID = '3n3Ppam7vgaVa1iaRUc9Lp';
  // let trackID = '1HgMHYL1Z1SvlnMkYLK8F0'
  let trackID = '1ax4iDskzlJgsD8bEBLo1p'

  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackID}`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + token }
  })

  const track = await response.json();

  return track;
}

getTrack()
  .then((track) => {
    console.log(track);
      // console.log('Cover Art: ', track.album.images[1].url);
      // console.log('Track Name:', track.name);
      // console.log('Artist:', track.artists[0].name);
      // console.log('Duration:', track.duration_ms);
})

const msConversion = (millis) => {

  let sec = Math.floor(millis / 1000);
  let hrs = Math.floor(sec / 3600);

  sec -= hrs * 3600;

  let min = Math.floor(sec / 60);

  sec -= min * 60;
  sec = '' + sec;
  sec = ('00' + sec).substring(sec.length);

  if (hrs > 0) {

    min = '' + min;
    min = ('00' + min).substring(min.length);

    return hrs + ":" + min + ":" + sec;
  } else {
    return min + ":" + sec;
  }
}

const random = (length) => {
  let base = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  let array = new Uint8Array(length);

  window.crypto.getRandomValues(array);
  let str = '';
  for (let i = 0; i < array.length; i++) {
    str += base[array[i]%base.length];
  };
  return str;
}

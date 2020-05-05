const placeForm = document.getElementById('place-form');
const placeId = document.getElementById('place-id');
const placeAddress = document.getElementById('place-address');
const userId = document.getElementById('user-id');

async function addPlace(e) {
  e.preventDefault();

  if (placeId.value === '' || placeAddress.value === '') return

  const sendBody = {
    placeId: placeId.value,
    address: placeAddress.value,
    user: userId.value
  };

  try {
    const res = await fetch('/places', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    if (res.status === 400) {
      throw Error('place already exists!');
    }

    window.location.href = '/';
  } catch (err) {
    console.error(err);
    return;
  }
}

placeForm.addEventListener('submit', addPlace);

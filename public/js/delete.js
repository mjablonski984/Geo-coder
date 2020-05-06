async function deleteById(e) {
    if (e.target.classList.contains('delete')) {
        const id = e.target.getAttribute("data-id");

        const sendId = {
            id: id
        }

        try {
            await fetch('/places', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendId)
            });

            window.location.href = '/';
        } catch (err) {
            console.error(err);
            return;
        }
    }
}

document.addEventListener('click', deleteById);

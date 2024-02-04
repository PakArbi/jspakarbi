const getTokenFromCookies = (cookieName) => {
    const cookies = document.cookie.split(';')
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=')
        if (name === cookieName) {
            return value
        }
    }
    return null
}

const getAllParkiran = async () => {
    const token = getTokenFromCookies('Login')

    if (!token) {
        Swal.fire({
            icon: 'warning',
            title: 'Authentication Error',
            text: 'You are not logged in.',
        }).then(() => {
            window.location.href = 'https://pakarbi.vaidiq.cloud/pages/login.html'
        })
        return
    }

    const targetURL = 'https://asia-southeast2-pakarbi.cloudfunctions.net/getallparkiran'

    const myHeaders = new Headers()
    myHeaders.append('Login', token)

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    }

    try {
        const response = await fetch(targetURL, requestOptions)
        const data = await response.json()

        if (data.status === true) {
            displayParkiranData(data.data, 'parkiranDataBody')
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message,
            })
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

const deleteParkiran = async (parkiranId) => {
    const token = getTokenFromCookies('Login')

    if (!token) {
        showAlert('Header Login Not Found', 'error')
        return
    }

    const targetURL = 'https://asia-southeast2-pakarbi.cloudfunctions.net/deletedataparkiran'

    const myHeaders = new Headers()
    myHeaders.append('Login', token)
    myHeaders.append('Content-Type', 'application/json')

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: JSON.stringify({
            parkiranid: parkiranId
        }),
        redirect: 'follow',
    }

    try {
        const response = await fetch(targetURL, requestOptions)
        const data = await response.json()

        if (data.status) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'parkiran deleted successfully!',
            }).then(() => {
                getAllParkiran()
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: data.message,
            })
        }
    } catch (error) {
        console.error('Error:', error)
    }
}

// Function to handle the delete confirmation
const deleteParkiranHandler = (parkiranId) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
        if (result.isConfirmed) {
            deleteParkiran(parkiranId)
        }
    })
}

const editParkiran = (_id) => {
    window.location.href = `editprofilparkiran.html?_id=${_id}`
}
// Event listener to handle clicks on the table
document.getElementById('parkiranDataBody').addEventListener('click', (event) => {
    const target = event.target
    if (target.classList.contains('edit-link')) {
        const _id = parseInt(target.getAttribute('data-_id'))
        editParkiran(_id)
    } else if (target.classList.contains('delete-link')) {
        const parkiranId = target.getAttribute('data-parkiranid')
        deleteParkiranHandler(parkiranId)
    }
})

const displayParkiranData = (parkiranData, tableBodyId) => {
    const parkirdatabody = document.getElementById(tableBodyId)

    parkirdatabody.innerHTML = ''

    if (parkiranData && parkiranData.length > 0) {
        parkiranData.forEach((item) => {
            const newRow = document.createElement('tr')
            newRow.innerHTML = `
        <td>${item.parkiranid}</td>
        <td>${item.nama}</td>
        <td>${item.npm}</td>
        <td>${item.prodi}</td>
        <td>${item.namakendaraan}</td>
        <td>${item.nomorkendaraan}</td>
        <td>${item.jeniskendaraan}</td>
        <td>${item.status ? 'Mahasiswa Aktif' : 'Mahasiswa Tidak Aktif'}</td>
        <td>${item.jammasuk}</td>
        <td>${item.jamkeluar}</td>
        <td>${item.base64image}</td>
        <td>
            <a href="#" class="delete-link" data-parkiranid="${item.parkiranid}">Delete</a>
        </td>
        `
            parkirdatabody.appendChild(newRow)
        })
    } else {
        parkirdatabody.innerHTML = `<tr><td colspan="6">No parkiran data found.</td></tr>`
    }
}

// Initial fetch of all catalogs
getAllParkiran()
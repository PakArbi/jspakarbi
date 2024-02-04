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

const getAllUser = async () => {
    const token = getTokenFromCookies('Login')

    if (!token) {
        Swal.fire({
            icon: 'warning',
            title: 'Authentication Error',
            text: 'You are not logged in.',
        }).then(() => {
            window.location.href = 'https://pakarbi.vaidiq.cloud/pages/loginadmin.html'
        })
        return
    }

    const targetURL = 'https://asia-southeast2-pakarbi.cloudfunctions.net/getalluser'

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
            displayUserData(data.data, 'userDataBody')
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

const displayUserData = (userData) => {

    const userdatabody = document.getElementById('userDataBody');

    userdatabody.innerHTML = ''

    if (userData && userData.length > 0) {
        userData.forEach((item) => {
            const newRow = document.createElement('tr')
            newRow.innerHTML = `
            <td>${item.usernameid}</td>
            <td>${item.username}</td>
            <td>${item.npm}</td>
            <td>${item.password}</td>
            <td>${item.passwordhash}</td>
            <td>${item.email}</td>
            <td>${item.role}</td>
        `
            userdatabody.appendChild(newRow)
        })
    } else {
        userdatabody.innerHTML = `<tr><td colspan="6">No parkiran data found.</td></tr>`
    }
}

// Initial fetch of all catalogs
getAllUser()
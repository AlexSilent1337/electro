document.addEventListener('DOMContentLoaded', () => {
  M.Dropdown.init(document.querySelector('.dropdown-trigger'))
})

const username = localStorage.getItem('username')

if (!username) window.location = '/login'

document.querySelector('#username').textContent = username

const logout = () => {
  localStorage.removeItem('username')

  window.location = '/login'
}

document
  .querySelector('#search')
  .addEventListener('keypress', function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === 'Enter') {
      // Cancel the default action, if needed
      event.preventDefault()
      // Trigger the button element with a click
      // document.getElementById('myBtn').click()

      search()
    }
  })

const search = () => {
  const text = document.querySelector('#search').value

  if (text === '') return

  window.location = `/search?q=${encodeURI(text)}`
}

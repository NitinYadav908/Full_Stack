import { jwtDecode } from 'jwt-decode'

function Dashboard({ token, onLogout }) {
  let user = {}

  try {
    user = jwtDecode(token)
  } catch {
    user = { username: 'Unknown' }
  }

  return (
    <div className='card'>
      <h2>Welcome {user.username}</h2>
      <p>Role: {user.role}</p>

      <h3>JWT Token</h3>

      <textarea value={token} readOnly rows='5' />

      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
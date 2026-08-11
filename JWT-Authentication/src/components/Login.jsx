import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const generateMockJWT = (user) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({
        username: user,
        role: 'student',
        exp: Date.now() + 3600000,
      })
    );
    const signature = btoa('mock-signature');
    return `${header}.${payload}.${signature}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      const token = generateMockJWT(username);
      onLogin(token);
      setError('');
    } else {
      setError('Invalid Username or Password');
    }
  };

  return (
    <div className='card'>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type='submit'>Login</button>

        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
import { useState } from 'react';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { username, password };
    localStorage.setItem('user', JSON.stringify(user));

    alert('Account created successfully!');
    onRegister();
  };

  return (
    <div className='card'>
      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Create Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type='password'
          placeholder='Create Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default Register;
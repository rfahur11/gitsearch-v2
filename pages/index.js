import { useState } from 'react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`https://api.github.com/search/users?q=${searchTerm}`);
    const data = await res.json();
    setUsers(data.items);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50%', margin: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub logo" style={{ width: '50px', height: '50px' }} />
        </div>
        <h1 style={{ textAlign: 'center' }}>GitHub User Search</h1>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '300px', marginTop: '20px' }} />
          <button onClick={handleSearch} style={{ marginLeft: '10px', marginTop: '20px' }}>Search</button>
        </div>
        {users.length > 0 ? (
          <table style={{ margin: '20px auto', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Username</th>
                <th>Profile URL</th>
                <th>Avatar</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td><a href={user.html_url}>{user.login}</a></td>
                  <td><a href={user.html_url}>{user.html_url}</a></td>
                  <td><img src={user.avatar_url} alt="User avatar" style={{ width: '50px', height: '50px' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data.</p>
        )}
      </div>
    </div>
  );
}

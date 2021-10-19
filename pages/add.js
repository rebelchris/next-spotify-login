import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const [list, setList] = useState([]);

  const getMyPlaylists = async () => {
    const res = await fetch('/api/playlists');
    const { items } = await res.json();
    setList(items);
  };

  const saveToDatabase = async (item) => {
    const res = await fetch('api/playlists', {
      method: 'POST',
      body: JSON.stringify(item),
    });
    const data = await res.json();
  };

  if (session) {
    return (
      <>
        Signed in as {session?.token?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <hr />
        <button onClick={() => getMyPlaylists()}>Get all my playlists</button>
        {list.map((item) => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <img src={item.images[0]?.url} width='100' />
            <br />
            <button onClick={() => saveToDatabase(item)}>
              Save in database
            </button>
          </div>
        ))}
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

import React, { useEffect, useState } from 'react';

const Books = () => {
  const [showbooks, setShowbooks] = useState([]);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  // Fetch book data from local db.json or your API
  useEffect(() => {
    fetch('http://localhost:5173/db.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch books.');
        return res.json();
      })
      .then((data) => setShowbooks(data.books))
      .catch((err) => {
        setError(err.message);
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
      });
  }, []);

  // Handle View Button Click
  const handleViewClick = (title) => {
    setError(`Feature not implemented for "${title}".`);
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  // Inline styles
  const styles = {
    container: {
      padding: '20px',
      backgroundColor: '#0e1626',
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      width:"70%",
      margin:"auto"
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
    },
    card: {
      background: '#1c2333',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    },
    badge: {
      backgroundColor: '#5d5fef',
      color: '#fff',
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      marginBottom: '10px',
      display: 'inline-block',
    },
    title: {
      fontSize: '18px',
      margin: '10px 0 4px',
    },
    meta: {
      fontSize: '14px',
      color: '#aaa',
    },
    rent: {
      marginTop: '15px',
      fontWeight: 'bold',
    },
    button: {
      marginTop: '10px',
      padding: '8px 16px',
      backgroundColor: '#5d5fef',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    errorToast: {
      backgroundColor: '#f44336',
      color: '#fff',
      padding: '12px 16px',
      borderRadius: '5px',
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      minWidth: '260px',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
    },
    closeBtn: {
      background: 'transparent',
      border: 'none',
      color: 'white',
      fontSize: '16px',
      marginLeft: '10px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Library Books</h1>
      </header>

<<<<<<< HEAD
      {/* Error Toast */}
      {showError && (
        <div style={styles.errorToast}>
          <span>❗ {error}</span>
          <button style={styles.closeBtn} onClick={() => setShowError(false)}>
            ✕
          </button>
=======
            <div className="books-grid">
                {showbooks.map((data) => (
                    <article key={data?.id} className="book-card">

                        <div className="book-body">
                            <span className="badge-genre">{data.genre}</span>
                            <h2 className="book-title">{data.title}</h2>

                            <div className="book-meta">
                                <span className="book-author">by {data.author}</span>
                                <span className="book-isbn">ISBN: {data.isbn}</span>
                            </div>

                            <div className="book-footer">
                                <div className="rent">
                                    <span>Rent</span>
                                    <strong>{data.rent}</strong>
                                </div>
                                <Button className="btn-view" variant="primary">View</Button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
>>>>>>> a021539f50a8b508d767fddb8bef88c06bf9d18f
        </div>
      )}

      <div style={styles.grid}>
        {showbooks.map((data) => (
          <article key={data.id} style={styles.card}>
            <div>
              <span style={styles.badge}>{data.genre}</span>
              <h2 style={styles.title}>{data.title}</h2>
              <div style={styles.meta}>
                <span>by {data.author}</span>
                <br />
                <span>ISBN: {data.isbn}</span>
              </div>
              <div style={styles.rent}>Rent: ₹{data.rent}</div>
              <button
                style={styles.button}
                onClick={() => handleViewClick(data.title)}
              >
                View
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Books;

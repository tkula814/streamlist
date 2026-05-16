import { useState } from "react";

function StreamList() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Movie");

  const handleSubmit = (event) => {
    event.preventDefault();

    const streamItem = {
      title: title,
      category: category,
    };

    console.log(`StreamList Item Added: ${title} - ${category}`);
    
    setTitle("");
    setCategory("Movie");
  };

  return (
    <section className="hero">
      <div className="card">
        <h1>Build Your Personal StreamList</h1>
        <p>
          Add movies or programs you want to watch later. This early version
          collects user input and displays it in the browser console.
        </p>

        <form onSubmit={handleSubmit} className="stream-form">
          <label htmlFor="title">Movie or Program Title</label>
          <input
            id="title"
            type="text"
            placeholder="Example: The Mandalorian"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="Movie">Movie</option>
            <option value="TV Show">TV Show</option>
            <option value="Documentary">Documentary</option>
            <option value="Series">Series</option>
          </select>

          <button type="submit">Add to Console</button>
        </form>
      </div>
    </section>
  );
}

export default StreamList;

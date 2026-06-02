import { useEffect, useState } from "react";
import { PlusCircle, Trash2, Edit, CheckCircle, Save } from "lucide-react";

function StreamList() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Movie");
  const [streamItems, setStreamItems] = useState(() => {
  const savedItems = localStorage.getItem("streamItems");
  return savedItems ? JSON.parse(savedItems) : [];
});
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("Movie");
  useEffect(() => {
  localStorage.setItem("streamItems", JSON.stringify(streamItems));
}, [streamItems]);
  const handleSubmit = (event) => {
    event.preventDefault();

    const newItem = {
      id: Date.now(),
      title: title,
      category: category,
      completed: false,
    };

    setStreamItems([...streamItems, newItem]);

    console.log(`StreamList Item Added: ${title} - ${category}`);

    setTitle("");
    setCategory("Movie");
  };

  const handleDelete = (id) => {
    const updatedItems = streamItems.filter((item) => item.id !== id);
    setStreamItems(updatedItems);
  };

  const handleComplete = (id) => {
    const updatedItems = streamItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );

    setStreamItems(updatedItems);
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditTitle(item.title);
    setEditCategory(item.category);
  };

  const handleSaveEdit = (id) => {
    const updatedItems = streamItems.map((item) =>
      item.id === id
        ? { ...item, title: editTitle, category: editCategory }
        : item
    );

    setStreamItems(updatedItems);
    setEditId(null);
    setEditTitle("");
    setEditCategory("Movie");
  };

  return (
    <section className="hero">
      <div className="card">
        <h1>Build Your Personal StreamList</h1>
        <p>
          Add movies or programs you want to watch later. This version displays
          the user inputs on the page and allows users to edit, delete, or mark
          items as complete.
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

          <button type="submit">
            <PlusCircle size={18} />
            Add to StreamList
          </button>
        </form>

        <div className="list-section">
          <h2>Your Streaming List</h2>

          {streamItems.length === 0 ? (
            <p className="empty-message">
              No items have been added yet. Add a movie or program above.
            </p>
          ) : (
            <ul className="stream-list">
              {streamItems.map((item) => (
                <li
                  key={item.id}
                  className={item.completed ? "stream-item completed" : "stream-item"}
                >
                  {editId === item.id ? (
                    <div className="edit-area">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(event) => setEditTitle(event.target.value)}
                      />

                      <select
                        value={editCategory}
                        onChange={(event) => setEditCategory(event.target.value)}
                      >
                        <option value="Movie">Movie</option>
                        <option value="TV Show">TV Show</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Series">Series</option>
                      </select>

                      <button
                        type="button"
                        className="save-btn"
                        onClick={() => handleSaveEdit(item.id)}
                      >
                        <Save size={16} />
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="item-info">
                        <span className="item-title">{item.title}</span>
                        <span className="item-category">{item.category}</span>
                      </div>

                      <div className="item-actions">
                        <button
                          type="button"
                          className="complete-btn"
                          onClick={() => handleComplete(item.id)}
                        >
                          <CheckCircle size={16} />
                          {item.completed ? "Undo" : "Complete"}
                        </button>

                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit size={16} />
                          Edit
                        </button>

                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default StreamList;

import React from 'react';

const EditBookForm = ({
  formData,
  handleInputChange,
  submitEditHandler,
  cancelEditHandler
}) => {
  return (
    <form onSubmit={submitEditHandler} className="mt-4">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Author</label> {/* New Author Field */}
        <input
          type="text"
          name="author"
          className="form-control"
          value={formData.author}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mr-2">Save</button>
      <button
        type="button"
        className="btn btn-secondary ms-2"
        onClick={cancelEditHandler}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditBookForm;

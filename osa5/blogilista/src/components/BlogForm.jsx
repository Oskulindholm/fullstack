const BlogForm = ({handleSubmit, title, author, url,
    handleTitle, handleAuthor, handleUrl}) => {
    
    return (
        <div>
            <h2> Add a new blog </h2>
            <form onSubmit={handleSubmit}>
                <div>
                Title: <input type="text" value={title} name="Title"
                onChange={handleTitle} />
            </div>
            <div>
                Author: <input type="text" value={author} name="Author"
                onChange={handleAuthor} />
            </div>
            <div>
                URL: <input type="text" value={url} name="url"
                onChange={handleUrl} />
            </div>
            <button type="submit" onClick={handleSubmit}>Add</button>
            </form>
        </div>
    )
}

export default BlogForm
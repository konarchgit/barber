import React from 'react';

const BlogList = ({ onBlogPostClick }) => {
    const blogPosts = [
        {
            id: 1,
            title: 'Fusce nec ex tellus',
            date: '21',
            month: 'MAR',
            author: 'Sad-Wu',
            excerpt: 'Ut quis lorem eu est auctor ultricies. Aliquam quis feugiat urna. Nunc a lobortis odio. Vivamus mollis dolor...',
            image: require('./hero-haircut.png')
        },
        {
            id: 2,
            title: 'Ut quis lorem eu est auctor ultricies',
            date: '21',
            month: 'MAR',
            author: 'Sad-Wu',
            excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            image: require('./hero-shave.png')
        },
        {
            id: 3,
            title: 'Fusce nec ex tellus. Pellentesque lobortis',
            date: '20',
            month: 'MAR',
            author: 'Sad-Wu',
            excerpt: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            image: require('./hero-man.png')
        }
    ];

    const categories = [
        'Design', 'Ecommerce', 'Fashion week', 'Hair Care', 'Hair color', 'Hair color trends', 'Hairstyling'
    ];

    return (
        <div className="blog-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">BLOG</h1>
                    <div className="breadcrumbs">
                        <span>Home</span> / <span>Blog</span>
                    </div>
                </div>
            </div>

            <div className="container blog-container">
                <div className="blog-main">
                    <div className="blog-grid-list">
                        {blogPosts.map(post => (
                            <div key={post.id} className="blog-card-item" onClick={() => onBlogPostClick(post)}>
                                <div className="blog-card-img-wrapper">
                                    <img src={post.image} alt={post.title} />
                                    <div className="blog-date-badge">
                                        <span className="day">{post.date}</span>
                                        <span className="month">{post.month}</span>
                                    </div>
                                </div>
                                <div className="blog-card-content">
                                    <div className="blog-meta">
                                        <span className="author">By {post.author}</span>
                                    </div>
                                    <h3 className="blog-card-title">{post.title}</h3>
                                    <p className="blog-card-excerpt">{post.excerpt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <aside className="blog-sidebar">
                    <div className="sidebar-widget">
                        <h3 className="widget-title">SEARCH</h3>
                        <div className="search-box">
                            <input type="text" placeholder="Blog Search..." />
                            <button>🔍</button>
                        </div>
                    </div>

                    <div className="sidebar-widget">
                        <h3 className="widget-title">CATEGORIES</h3>
                        <ul className="category-list">
                            {categories.map((cat, idx) => (
                                <li key={idx}><a href="#">{cat}</a></li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default BlogList;

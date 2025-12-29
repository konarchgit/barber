import React from 'react';

const BlogDetail = ({ post }) => {
    if (!post) return null;

    const categories = [
        'Design', 'Ecommerce', 'Fashion week', 'Hair Care', 'Hair color', 'Hair color trends', 'Hairstyling'
    ];

    return (
        <div className="blog-detail-page">
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">{post.title.toUpperCase()}</h1>
                    <div className="breadcrumbs">
                        <span>Home</span> / <span>Blog</span> / <span>Tattoo</span> / <span>{post.title}</span>
                    </div>
                </div>
            </div>

            <div className="container blog-container">
                <div className="blog-main">
                    <article className="blog-post-full">
                        <div className="blog-post-img-wrapper">
                            <img src={post.image} alt={post.title} />
                            <div className="blog-date-badge">
                                <span className="day">{post.date}</span>
                                <span className="month">{post.month}</span>
                            </div>
                        </div>

                        <div className="blog-post-content-full">
                            <div className="blog-meta">
                                <span className="author">By {post.author}</span>
                                <span className="comments">Comments Off</span>
                            </div>

                            <h2 className="blog-post-title-large">{post.title}</h2>

                            <div className="blog-post-body-text">
                                <p>
                                    Ut quis lorem eu est auctor ultricies. Aliquam quis feugiat urna. Nunc a lobortis odio.
                                    Vivamus mollis dolor quis lobortis odio. Vivamus mollis dolor quis lobortis odio.
                                    Donec imperdiet tincidunt interdum. Phasellus ultrices tincidunt dolor, eu laoreet
                                    risus faucibus sit amet. Phasellus congue, eros vitae ultrices condimentum, nunc
                                    lacus tristique augue, in tempus magna et est.
                                </p>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                    has been the industry's standard dummy text ever since the 1500s.
                                </p>
                            </div>
                        </div>
                    </article>
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
                                <li key={idx}><a href="#" className={cat === 'Fashion week' ? 'active' : ''}>{cat}</a></li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default BlogDetail;

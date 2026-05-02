import React, { FC } from 'react';
import { IPost } from './posts.types';
import { styles } from './post-item.styles';

interface PostItemProps {
    post: IPost;
}

export const PostItem: FC<PostItemProps> = ({ post }) => {
    return (
        <article style={styles.postContainer}>
            <header style={styles.header}>
                <img 
                    style={styles.avatar} 
                    src={post.userAvatar || '/default-avatar.png'} 
                    alt={post.userName} 
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={styles.userName}>{post.userName}</span>
                    <span style={styles.date}>{post.publishDate}</span>
                </div>
            </header>
            
            <p style={styles.postContent}>{post.content}</p>
            
            {post.postImage && (
                <img 
                    style={styles.postImage} 
                    src={post.postImage} 
                    alt="Post media" 
                />
            )}
            
            <footer style={styles.footer}>
                <span>❤️ {post.likesCount}</span>
                <span>💬 {post.commentsCount}</span>
            </footer>
        </article>
    );
};
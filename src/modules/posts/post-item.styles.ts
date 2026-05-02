import {  StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    avatar: {
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    userName: {
        fontWeight: 600,
        fontSize: '16px',
        color: '#1a1a1a',
    },
    date: {
        fontSize: '12px',
        color: '#888888',
    },
    postContent: {
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#2d2d2d',
        margin: 0,
    },
    postImage: {
        width: '100%',
        borderRadius: '10px',
    },
    footer: {
        display: 'flex',
        gap: '20px',
        fontSize: '14px',
        color: '#555',
        borderTop: '1px solid #f0f0f0',
        paddingTop: '10px',
    }
};)
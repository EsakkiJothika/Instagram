import { create } from 'zustand';

const usePostStore = create((set) => ({
    posts: [],
    createposts: (post) => set((state) => ({posts:[post,...state.posts]})),
    deleteposts: (id) => set((state) => ({posts: state.posts.filter(post => post.id !== id)})),
    setposts: (posts) => set({ posts }),
    addcomment: (postID, comment) => set((state) => ({
        posts: state.posts.map((post) => {
            if (post.id === postID) {
                return {
                    ...post,
                    comment: [...(post.comment || []), comment] // Ensure it's always an array
                };
            }
            return post; // Return unchanged post
        })
    })),
    
    addlike: (postID, userID) => set((state) => ({
        posts: state.posts.map((post) => {
            if (post.id === postID) {
                const alreadyLiked = post.likes?.includes(userID);
                const updatedLikes = alreadyLiked
                    ? post.likes.filter((id) => id !== userID) // remove like
                    : [...(post.likes || []), userID];         // add like
    
                return {
                    ...post,
                    likes: updatedLikes,
                };
            }
            return post;
        })
    }))
    
    

}))

export default usePostStore;
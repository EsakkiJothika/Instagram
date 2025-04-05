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
    }))
    
    

}))

export default usePostStore;
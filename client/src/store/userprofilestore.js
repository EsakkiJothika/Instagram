import { create } from "zustand";

const useUserProfileStore = create((set) => ({
    userProfile : null,
    setUserProfile : (userProfile) => set({userProfile:userProfile}),
    //this is to update the number of post in the userprofile
    addPost: (post) => set((state) => ({
        userProfile: {
            ...state.userProfile, // Spread existing user profile data
            posts: [post.id, ...state.userProfile.posts] // Add new post ID to the beginning
        }
    })),

    deletePost : (postID) => set((state) => ({
        userProfile: {
            ...state.userProfile,
            posts: state.userProfile.filter((id) => id !== postID)
        }
    }))

    
}))

export default useUserProfileStore;
import {
	Button,
	Flex,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/react";
import Comment from "../Profile/Comment";
import usePostComment from "../../hooks/usePostComment";
import { useEffect, useRef } from "react";

const Commentsmodal = ({ isOpen, onClose, post }) => {

    const {iscommenting, handlePostComment} = usePostComment();
    const commentRef = useRef(null);
    const commentsContainerRef = useRef(null);
    const handleSubmitComment = async (e) => {
        e.preventDefault();  //do not refresh the page
        await handlePostComment(post.id,commentRef.current.value);
        commentRef.current.value = "";
    }

    useEffect(() => {

        const scrollBottom = () => {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        };
        if (isOpen) {
            setTimeout(() => {
				scrollBottom();
			}, 100);
        }

    }, [isOpen, post.comment.length]);

	return (
		<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
			<ModalOverlay />
			<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
				<ModalHeader>Comments</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Flex mb={4} gap={4} flexDir={"column"} maxH={"250px"} overflowY={"auto"} ref={commentsContainerRef} >
                        {post?.comment.map((comment, idx) => (
                            <Comment key={idx} comment={comment} />
                        ))}
                    </Flex>
					<form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
						<Input placeholder='Comment' size={"sm"} ref={commentRef} />
						<Flex w={"full"} justifyContent={"flex-end"}>
							<Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={iscommenting} >
								Post
							</Button>
						</Flex>
					</form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default Commentsmodal;
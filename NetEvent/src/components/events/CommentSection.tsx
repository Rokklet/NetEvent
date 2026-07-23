
import { useState, useEffect} from "react";
import { Card, Divider, Flex, Button, Space, Input, Avatar, Row, Col, Typography, message} from "antd";
import { cargarComentarios, crearComment } from "../../services/CommentService";
//import { SpaceCompactItemContext } from "antd/es/space/Compact";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface CommentAuthor {
  _id: string;
  nombre: string;
  foto?: string;
}
interface EventComment {
  _id: string;
  evento: string;
  autor: CommentAuthor;
  texto: string;
  createdAt: string;
  updatedAt: string;
}

const { Text } = Typography;


const CommentSection = () => {
    const [comments, setComments] = useState<EventComment[]>([]);
    const [commentBody, setCommentBody] = useState('');
    const { id } = useParams();
    const { user } = useAuth();

    const fetchComments = async () => {
        try{
            const data = await cargarComentarios(id!);
            setComments(data.reverse());
            
        } catch (err) {
            message.error("Error al cargar los comentarios")
        }
    };

    useEffect(() => {
        if (!id) return;
        fetchComments();
    }, [id]);

    const onComment = () => {

        if (!id) return;

        const newComment: EventComment = {
            _id: 'temp-id',
            evento: id,
            autor: {
                _id: 'temp-author-id',
                nombre: user?.nombre!,
                foto: user?.foto
            },
            texto: commentBody,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        
        setComments((prev) => [newComment, ...prev]);

        crearComment( id , commentBody)

        setCommentBody("");
    };

    return(
        <Card>   


            {user?.role === "participant" && (
                <>
                <Space.Compact style={{width:"100%"}}>
                    <Input
                        value={commentBody}
                        onChange={(event) => setCommentBody(event.target.value)}
                        placeholder="¿Que opinion tíenes?"
                        style={{width: "100%"}}
                    />
                    <Button type="primary"  
                    onClick={() => onComment()}>
                        Submit
                    </Button>
                </Space.Compact>

                <Divider />
                </>
            )}
            

            <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
                <Flex gap="small" vertical>
                    {comments.map(comment => (
                    <Card type="inner" 
                    bodyStyle={{ backgroundColor: '#e9e9e9' }}
                    style={{ borderRadius: '16px', overflow: 'hidden' }}>
                        <Row>
                            <Col span={1} push={50}>
                                <Avatar 
                                size={40}
                                src={comment.autor.foto}
                                />
                            </Col>
                            <Col span={20} push={50}>
                                <Flex gap="small">
                                    <Text underline style={{ fontSize: '14px' }}>
                                        {comment.autor.nombre} 
                                    </Text>
                                    <Text type="secondary" style={{ fontSize: '10px'}}>
                                        {comment.createdAt.split('T')[0]}
                                    </Text>
                                </Flex>
                                <p>{comment.texto}</p>
                            </Col>
                        </Row>
                    </Card>
                    ))}
                </Flex>
            </div>


        </Card>
    );
};

export default CommentSection;

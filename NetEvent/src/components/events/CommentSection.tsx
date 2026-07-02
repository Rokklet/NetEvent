import React from "react";
import { Card, Avatar, Tag } from "antd";

interface CommentProp {
    id: string;
    //user: string;
    //fecha: string;
    //avatar?: string;
    body: string
}

const mockmock: Array<CommentProp> = [
    {
        id: '1',
        body: 'Primer comentario',
    },
    {
        id: '2',
        body: 'segundo comentario',
    },
    {
        id: '3',
        body: '3er comentario'
    },
];

const CommentSection: React.FC<CommentProp> = ({
    id,
    //user,
    //fecha,
    //avatar,
    body,
}) => {

    return(
        <Card>
            <div className="Comentarios">

            </div>
        </Card>
    );
};

export default CommentSection;

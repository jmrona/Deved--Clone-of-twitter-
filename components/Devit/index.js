import { Avatar } from "components/Avatar";
import useTimeAgo from "hooks/useTimeAgo";
import Link from "next/link";
import React, { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "styles/components/Devit/Devit.module.css";

import { useRouter } from "next/router";
import { Like } from "components/Icons/Like";
import { Comment } from "components/Icons/Comment";
import { Redevit } from "components/Icons/Redevit";
import { Share } from "components/Icons/Share";
import { likeDevit } from "firebase/client";
import { ModalContext } from "contexts/ModalContext";
import { ModalSocialMedia } from "components/Modal/ModalSocialMedia";

export const Devit = ({
    avatar,
    userName,
    content,
    img,
    id,
    createdAt,
    likesCount,
}) => {
    const timeago = useTimeAgo(createdAt);
    const router = useRouter();
    const { handleModal } = useContext(ModalContext);

    const handleOpenDevit = (e) => {
        e.preventDefault();
        router.push(`/status/${id}`);
    };

    const handleLike = () => {
        likeDevit(id);
    };
    const handleComment = () => {
        console.log("comment");
    };
    const handleRedevit = () => {
        console.log("redevit");
    };
    const handleShare = () => {
        const url = `https://deved.vercel.app/status/${id}`;

        handleModal(<ModalSocialMedia url={url} handleModal={handleModal} />);
    };

    return (
        <>
            <article className={styles.article} key={id}>
                <div className={styles.div}>
                    <Avatar alt={userName} src={avatar} />
                </div>
                <section className={styles.section}>
                    <div onClick={handleOpenDevit}>
                        <strong>{userName}</strong>
                        <span> · </span>
                        <Link href={`/status/${id}`}>
                            <a>
                                <small className={styles.date}>{timeago}</small>
                            </a>
                        </Link>
                        <p className={styles.p}>{content}</p>
                        {img && <img src={img} className={styles.img} />}
                    </div>
                    <div className={styles.footer}>
                        <div onClick={handleLike}>
                            <Like
                                className={styles.icon}
                                width="25px"
                                height="25px"
                            />
                            {likesCount !== 0 && (
                                <span className={styles.counter}>
                                    {likesCount}
                                </span>
                            )}
                        </div>
                        <div onClick={handleComment}>
                            <Comment
                                className={styles.icon}
                                width="25px"
                                height="25px"
                            />
                        </div>
                        <div onClick={handleRedevit}>
                            <Redevit
                                className={styles.icon}
                                width="25px"
                                height="25px"
                            />
                        </div>
                        <div onClick={handleShare}>
                            <Share
                                className={styles.icon}
                                width="25px"
                                height="25px"
                            />
                        </div>
                    </div>
                </section>
            </article>
        </>
    );
};

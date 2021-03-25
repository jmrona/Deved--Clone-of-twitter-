import { Avatar } from "components/Avatar";
import useTimeAgo from "hooks/useTimeAgo";
import Link from "next/link";
import React from "react";
import styles from "styles/components/Devit/Devit.module.css";

import { useRouter } from "next/router";

export const Devit = ({ avatar, userName, content, img, id, createdAt }) => {
    const timeago = useTimeAgo(createdAt);
    const router = useRouter();

    const handleArticleClick = (e) => {
        e.preventDefault();
        router.push(`/status/${id}`);
    };

    return (
        <>
            <article
                className={styles.article}
                key={id}
                onClick={handleArticleClick}
            >
                <div className={styles.div}>
                    <Avatar alt={userName} src={avatar} />
                </div>
                <section>
                    <strong>{userName}</strong>
                    <span> · </span>
                    <Link href={`/status/${id}`}>
                        <a>
                            <small className={styles.date}>{timeago}</small>
                        </a>
                    </Link>
                    <p className={styles.p}>{content}</p>
                    {img && <img src={img} className={styles.img} />}
                </section>
            </article>
        </>
    );
};

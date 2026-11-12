import React from 'react';
import Image from 'next/image';
import { teamMembers } from '@/data/team';
import styles from './TeamGrid.module.css';

export default function TeamGrid() {
  return (
    <div className={styles.team}>
      {teamMembers.map((member) => (
        <div key={member.name} className={`${styles.tm} ar`}>
          <div className={styles.tph}>
            <Image
              src={member.image}
              alt={member.alt}
              width={640}
              height={800}
              priority={false}
            />
          </div>
          <div className={styles.tbody}>
            <b>{member.name}</b>
            <span className={styles.role}>{member.role}</span>
            <div className="tags">
              {member.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


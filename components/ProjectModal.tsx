'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ProjectItem } from '@/data/projects';
import ProjectArt from './ProjectArt';
import styles from './ProjectModal.module.css';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    // Focus close button on open
    closeBtnRef.current?.focus();
    document.body.classList.add('pm-open');

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('pm-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleTryChatbot = () => {
    onClose();
    if (typeof window !== 'undefined') {
      const w = window as unknown as { openChat?: () => void };
      w.openChat?.();
    }
  };

  return (
    <div
      className={styles.pmodal}
      id="pmodal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pm-title"
    >
      <div className={styles.pmBack} onClick={onClose} />
      <div className={styles.pmBox}>
        <button
          ref={closeBtnRef}
          type="button"
          className={styles.pmX}
          aria-label="Close project"
          onClick={onClose}
        >
          ✕
        </button>

        <div className={`pthumb ${styles.pmArt} ${project.tone}`}>
          <ProjectArt artType={project.artType} />
        </div>

        <div className={styles.pmBody}>
          <small id="pm-cat">{project.cat.toUpperCase()}</small>
          <h3 id="pm-title">{project.title}</h3>
          <p className={styles.pmLine} id="pm-line">
            {project.line}
          </p>

          <div className={styles.pmCols}>
            <div>
              <h4>The problem</h4>
              <p id="pm-prob">{project.prob}</p>
            </div>
            <div>
              <h4>What we did</h4>
              <p id="pm-sol">{project.sol}</p>
            </div>
          </div>

          <div className="tags" id="pm-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className={styles.pmActs}>
            {project.url && (
              <a
                className="btn btn-ghost hov"
                id="pm-visit"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live site ↗
              </a>
            )}
            {project.live && (
              <button
                type="button"
                className="btn btn-ghost hov"
                id="pm-try"
                onClick={handleTryChatbot}
              >
                Try the chatbot
              </button>
            )}
            <Link
              href="/contact"
              className="btn btn-gold hov"
              id="pm-cta"
              onClick={onClose}
            >
              Start a similar project →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


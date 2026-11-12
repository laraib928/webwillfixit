'use client';

import React, { useState } from 'react';
import { projects, ProjectItem } from '@/data/projects';
import ProjectArt from './ProjectArt';
import ProjectModal from './ProjectModal';
import styles from './PortfolioGrid.module.css';

const CATEGORIES = [
  'All',
  'AI Automation',
  'Web Development',
  'E-commerce',
  'Web Apps',
  'AI Chatbots',
];

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.cat === activeCategory);

  return (
    <div>
      <div className={styles.ftabs} role="toolbar" aria-label="Filter projects">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`${styles.ftab} ${activeCategory === cat ? styles.on : ''}`}
            aria-pressed={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProjects.length > 0 ? (
        <div className={styles.pgrid} id="pgrid">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              className={`${styles.pcard} ar ${project.isBig ? styles.big : ''}`}
              data-cat={project.cat}
              onClick={() => setSelectedProject(project)}
            >
              <div className={`pthumb ${styles.pthumb} ${project.tone}`}>
                <ProjectArt artType={project.artType} />
                <span className={styles.pview}>View project ↗</span>
              </div>
              <div className={styles.pinfo}>
                <small>{project.cat.toUpperCase()}</small>
                <h3>{project.title}</h3>
                <p>{project.line}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <p className={styles.pempty} id="pempty">
          No projects in this category yet.
        </p>
      )}

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}


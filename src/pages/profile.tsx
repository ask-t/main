import React, { JSX } from 'react';
import Layout from '@theme/Layout';
import Button from '@site/src/components/ui/Button';
import { Card } from '@site/src/components/ui/Card';
import profileData from '@site/src/data/profile.json';

export default function Profile(): JSX.Element {
  const { name, title, bio, initials, email, github, linkedin, skills, experience, profileProjects } = profileData;

  return (
    <Layout title="Profile | ask-t" description="Professional profile and experience">
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-600 dark:text-gray-300">{initials}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {name}
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300 mb-4 font-semibold">
              {title}
            </p>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`mailto:${email}`}>
                <Button variant="primary" className="px-8 py-3">
                  Get in Touch
                </Button>
              </a>
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="px-8 py-3">
                  View GitHub
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="container py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                      {skill.level}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="container py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Professional Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
                        {exp.company}
                      </p>
                      {exp.location && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          📍 {exp.location}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full self-start mt-2 md:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {exp.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="container py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profileProjects.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow group">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="ghost" className="w-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800">
                      View Project →
                    </Button>
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
              I'm always interested in new opportunities and exciting projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`mailto:${email}`}>
                <Button variant="primary" className="px-8 py-3">
                  Send Message
                </Button>
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="px-8 py-3">
                  LinkedIn Profile
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
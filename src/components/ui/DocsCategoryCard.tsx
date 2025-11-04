import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

interface DocsCategoryCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  tags?: string[];
  itemCount?: number;
  className?: string;
}

export default function DocsCategoryCard({
  title,
  description,
  icon,
  link,
  tags,
  itemCount,
  className,
}: DocsCategoryCardProps) {
  return (
    <Link
      to={link}
      className={clsx('docs-category-card group', className)}
      style={{ textDecoration: 'none' }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl mb-4">{icon}</div>
          {itemCount !== undefined && (
            <span className="text-sm text-[var(--muted)] bg-[var(--card-bg)] px-3 py-1 rounded-full">
              {itemCount} {itemCount === 1 ? 'doc' : 'docs'}
            </span>
          )}
        </div>

        <h3 className="text-2xl font-semibold text-[var(--fg)] mb-3 group-hover:text-[var(--accent)] transition-colors">
          {title}
        </h3>

        <p className="text-[var(--muted)] mb-4 leading-relaxed">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span key={index} className="tag text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center text-[var(--accent)] mt-4 group-hover:translate-x-1 transition-transform">
          <span className="text-sm font-medium">詳細を見る</span>
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}


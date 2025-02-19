'use client';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

export function MeetingContent({ filePath }: { filePath: string }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch(`/api/meetings/content?path=${filePath}`);
        const data = await response.json();
        if (data.content) {
          setContent(data.content);
        }
      } catch (error) {
        console.error('Error fetching meeting content:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [filePath]);

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="prose max-w-none">
      <Markdown>{content}</Markdown>
    </div>
  );
} 
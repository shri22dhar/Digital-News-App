import { PostProps } from '@/sections/Posts'
import React from 'react'
import Link from 'next/link';

export default function SidePostItem({item}:{item:PostProps}) {
  return (
    <div className="post-entry-1 border-buttom">
        <div className="podt-meta">
            <span className="date">{item.category}</span>
            <span className="mx-1">
                <i className="bi bi-dot"></i>
                </span>
                <span>{new Date(item.date).toLocaleDateString('en-US')}</span>
        </div>
        <h2 className='mb-2'>
            <Link href={`/post/items/${item._id}`}>{item.title}</Link>
        </h2>
        {item.author && (<span className='author mb-3 d-block'>{item.author}</span>)}
    </div>
  );
}

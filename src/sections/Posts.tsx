"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './posts.css';
import PostItemOne from '@/components/PostItemOne';
import TrendingtPost from '@/components/TrendingtPost';
import Preloader from '@/components/Preloader';

interface PostItem {
  _id: string;
  img: string;
  category: string;
  date: string;
  title: string;
  brief: string;
  avatar: string;
  author: string;
  trending?: boolean;
  top?: boolean;
}

export default function Posts() {
  const router = useRouter();
  const [items, setItems] = useState<PostItem[]>([]);
  const [item, setItem] = useState<PostItem | null>(null);
  const [loading, setLoading] = useState(true);

  const getItemsData = () => {
    fetch(`/api/postitems`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((e) => console.log(e.message));
  };

  const getSinglePostData = (id: string) => {
    fetch(`/api/postitems/${id}`)
      .then((res) => {
        if (res.status === 404) {
          router.push('/not-found');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setItem(data);
      })
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    Promise.all([getItemsData(), getSinglePostData('671caa66bece1a105e9d081e')])
      .finally(() => setLoading(false));
  }, []);
  if (loading) {
    return <Preloader />;
  }
  return (
    <section id="posts" className="posts">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-4">
            {item && <PostItemOne large={true} item={item} />}
          </div>
          <div className="col-lg-8">
            <div className="row g-5">
              <div className="col-lg-4 border-start custom-border">
                {items.length > 0 &&
                  items
                    .filter((post) => !post.trending && !post.top)
                    .slice(0, 3)
                    .map((post) => <PostItemOne key={post._id} large={false} item={post} />)}
              </div>
              <div className="col-lg-4 border-start custom-border">
                {items.length > 0 &&
                  items
                    .filter((post) => !post.trending && !post.top)
                    .slice(3, 6)
                    .map((post) => <PostItemOne key={post._id} large={false} item={post} />)}
              </div>
              <div className="col-lg-4">
                <div className="trending">
                  <h3>Trending</h3>
                  <ul className="trending-post">
                    {items.length > 0 &&
                      items
                        .filter((post) => post.trending)
                        .map((post, index) => (
                          <TrendingtPost key={post._id} index={index} item={post} />
                        ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

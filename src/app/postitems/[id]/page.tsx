"use client";
import { initialPost, PostProps } from '@/sections/Posts';
import React,{useState,useEffect} from 'react';
import './style.css';
import Preloader from '@/components/Preloader';
import { useParams } from 'next/navigation';
import SidePostItem from '@/components/SidePostItem';
import Image from 'next/image';
export default function PostItem() {
    // const id :string = params.id;
    const {id} = useParams<{ id: string }>()

    const[item,setItem] = useState(initialPost);

    const[items,setItems] = useState([]);
    const tabsData=[
        {id:1,name:'Popular',active:true},
        {id:2,name:'Trending',active:false},
    ];
    const [tabs,setTabs] = useState(tabsData);


    const handleTabActive = (id:number):void=>{
       setTabs(tabsData.map(tab=>{
            tab.active=false;
            if(tab.id===id) tab.active=true;
            return tab;
        }));
    };

    const getSinglePostData=()=>{
        fetch(`/api/postitems/${id}`)
        .then(res=>res.json())
        .then(data=>setItem(data))
        .catch(e=>console.log(e.message));
    };

    const getItemsData = () => {
        fetch(`/api/postitems`)
          .then((res) => res.json())
          .then((data) => setItems(data))
          .catch((e) => console.log(e.message));
      };

    useEffect   (()=>{
        getSinglePostData();
        getItemsData();
    },[]);


  return (
    <main id="main">
        <section className="single-post-content">
            <div className="container">
                <div className="row">
                    <div className="col-md-9 post-content">
                        {item && item.category !== '' ? ( 
                            <div className="single-post">
                                <div className="post-meta">
                                    <span className="date">{item.category}</span>
                                    <span className="mx-1"><i className="bi bi-dot"></i></span>
                                    <span>{new Date(item.date).toLocaleDateString('en-US')}</span>
                                </div>
                                <h1 className='mb-5'>{item.title}</h1>
                                <p>
                                    <span className="firstcharacter">
                                        {item.brief && item.brief.charAt(0)}
                                    </span>
                                    {item.brief &&item.brief.substring(1)}
                                </p>
                                <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, 
                                inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus 
                                eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo,
                                eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
                                </p>
                                <figure className="my-4">
                                    <div className="w-100 h-25 overflow-hidden position-realtive">
                                    <Image 
                                        src={`/${item.img}`}
                                        alt=""
                                        // className="img-fluid"
                                        width={100}
                                        height={100}
                                        // layout="responsive"
                                    />
                                    </div>
                                    {/* <img src={`/${item.img}`} alt=""className="imd-fluid" /> */}
                                    <figcaption>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, 
                                    inventore pariatur?
                                    </figcaption>
                                </figure>
                                <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, 
                                inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus 
                                eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo,
                                eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
                                </p>
                                <p>
                                amet consectetur adipisicing elit. Vero temporibus repudiandae, 
                                inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus 
                                eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo,
                                eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
                                </p>
                                <p>
                                Vero temporibus repudiandae, 
                                inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus 
                                eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo,
                                eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
                                </p>
                                <p> 
                                inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus 
                                eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo,
                                eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
                                </p>
                            </div>
                            ):(
                                <Preloader />
                              )}

                        </div>
                        <div className="div col-md-3">
                            <div className="aside-block">
                                <ul className='nav nav-pills custom-tab-nav mb-4'>
                                {tabs.map(tab =>(
                                        <li className="nav-item" key={tab.id}>
                                            <button className={`nav-link ${
                                                tab.active ? 'active':undefined
                                                }`}
                                                onClick={()=>handleTabActive(tab.id)}
                                                >
                                                    {tab.name}
                                                 </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="tab-content">
                                    <div className={`tab-pane fade ${tabs[0].active  ? 'show active': ''

                                    }`}
                                    >
                                        {items.slice(0,6)
                                        .map((item:PostProps)=>(
                                            <SidePostItem key={item._id} item={item}/>
                                        ))}

                                    </div>
                                    <div className={`tab-pane fade ${tabs[1].active ? 'show active': ''
                                        }`}
                                        >
                                            {items.slice(6,12)
                                            .map((item:PostProps)=>(
                                                <SidePostItem key={item._id} item={item}/>
                                            ))}

                                        </div>
                                </div>
                            </div>
                            <div className="aside-block">
                                <h3 className="aside-title">Video</h3>
                                <div className="video-post">
                                    <a 
                                        target="_blank"
                                        href="http://www.youtube.com/watch?v=uHNS_ZhI62c"
                                        className="link-video"
                                    >
                                            <span className="bi-paly-fill"></span>
                                            <img
                                                src="/assets/img/post-landscape-3.jpg"
                                                alt=""
                                                className="img-fluid"
                                             />   

                                        </a>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    
  );
}

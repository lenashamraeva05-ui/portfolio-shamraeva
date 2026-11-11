"use client";
import { useEffect, useRef, type ReactNode } from "react";

export function StudyCanvas({children,className,label}:{children:ReactNode;className:string;label:string}) {
 const stage=useRef<HTMLDivElement>(null);
 useEffect(()=>{ const el=stage.current; if(!el)return; const resize=()=>{ const scale=String(el.clientWidth/1320); el.style.setProperty("--study-scale",scale); el.style.setProperty("--crm-scale",scale); }; resize(); const observer=new ResizeObserver(resize); observer.observe(el); return()=>observer.disconnect(); },[]);
 return <div ref={stage} className={className} role="img" aria-label={label}>{children}</div>;
}
export function StudyStack({children}:{children:ReactNode}) {
 const stack=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const cards=Array.from(stack.current?.querySelectorAll<HTMLElement>(".style-showcase-card")??[]);
  const observer=new ResizeObserver(entries=>{ for(const entry of entries)(entry.target as HTMLElement).style.setProperty("--screen-height",`${entry.target.getBoundingClientRect().height}px`); });
  cards.forEach(card=>observer.observe(card));
  const visible=new IntersectionObserver(([entry])=>document.documentElement.classList.toggle("interface-study-in-view",entry.isIntersecting),{threshold:0});
  if(stack.current)visible.observe(stack.current);
  return()=>{observer.disconnect();visible.disconnect();document.documentElement.classList.remove("interface-study-in-view");};
 },[]);
 return <div ref={stack} className="style-showcase-stack">{children}</div>;
}

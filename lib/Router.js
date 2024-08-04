import{jsx as _jsx}from"react/jsx-runtime";import{Children,createContext,useEffect,useState,isValidElement}from"react";import{EVENTS}from"./consts";import{match}from"path-to-regexp";import{getCurrentPath}from"./utils";export const RouterContext=createContext({});export function Router({routes=[],defaultComponent:DefaultComponent=()=>_jsx("h1",{children:"404"}),children}){const[pathname,setPathname]=useState(getCurrentPath());const[params,setParams]=useState({});const routesFromChildren=Children.map(children,child=>{if(isValidElement(child)){const{type,props}=child;let isRoute=false;if(typeof type==="function")isRoute=type.name==="Route";return isRoute?props:null}return null})||[];const routesToUse=routes.concat(routesFromChildren).filter(Boolean);useEffect(()=>{const onLocationChange=()=>{setPathname(getCurrentPath())};window.addEventListener(EVENTS.PUSHSTATE,onLocationChange);window.addEventListener(EVENTS.POPSTATE,onLocationChange);return()=>{window.removeEventListener(EVENTS.PUSHSTATE,onLocationChange);window.removeEventListener(EVENTS.POPSTATE,onLocationChange)}},[]);useEffect(()=>{const route=routesToUse.find(({path})=>{if(path===pathname){setParams({});return true}const matchedURL=match(path,{decode:decodeURIComponent});const matched=matchedURL(pathname);if(!matched)return false;setParams(matched.params);return true});if(!route){setParams({})}},[pathname,routesToUse]);const Page=routesToUse.find(({path})=>{if(path===pathname){return true}const matchedURL=match(path,{decode:decodeURIComponent});const matched=matchedURL(pathname);return!!matched})?.Component||DefaultComponent;return _jsx(RouterContext.Provider,{value:{pathname,params},children:_jsx(Page,{})})}
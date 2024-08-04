import{jsx as _jsx}from"react/jsx-runtime";import{EVENTS}from"./consts";function navigate(href){window.history.pushState({},"",href);const navigationEvent=new Event(EVENTS.PUSHSTATE);window.dispatchEvent(navigationEvent)}export function Link({target,href,children,...props}){const handleClick=e=>{const isMainEvent=e.button===0;const isModifiedEvent=e.metaKey||e.altKey||e.ctrlKey||e.shiftKey;const isManageableEvent=target===undefined||target==="_self";if(isMainEvent&&isManageableEvent&&!isModifiedEvent){e.preventDefault();navigate(href)}};return _jsx("a",{onClick:handleClick,href:href,target:target,...props,children:children})}